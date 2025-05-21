import { NextResponse } from 'next/server';
import JSZip from 'jszip';

const JUDGE0_URL = process.env.JUDGE0_URL;
const JUDGE0_TOKEN = process.env.JUDGE0_TOKEN;

const b64 = (s) => Buffer.from(s).toString('base64');
const decode = (s) => (s ? Buffer.from(s, 'base64').toString() : '');
console.log('[Judge0 route] URL from env =>', process.env.JUDGE0_URL);

function removePublicModifier(javaCode, className) {
  // Remove 'public' from class declarations except for the main class
  const classRegex = new RegExp(`public\\s+class\\s+${className}`, 'g');
  // Replace 'public class ClassName' with 'class ClassName'
  return javaCode.replace(classRegex, `class ${className}`);
}

export async function POST(request) {
  if (!JUDGE0_URL || !JUDGE0_TOKEN) {
    return NextResponse.json(
      { error: 'Judge0 configuration missing. Please check environment variables.' },
      { status: 500 }
    );
  }

  const body = await request.json();
  const { source_code: source = '', stdin = '', language_id: languageId = 62, token, action, is_zip } = body;
  
  // Handle cancellation
  if (token && action === 'cancel') {
    try {
      const response = await fetch(`${JUDGE0_URL}/submissions/${token}`, {
        method: 'DELETE',
        headers: { 'X-Auth-Token': JUDGE0_TOKEN },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to cancel submission: ${response.status}`);
      }
      
      return NextResponse.json({ message: 'Submission cancelled' });
    } catch (error) {
      return NextResponse.json(
        { error: `Failed to cancel submission: ${error.message}` },
        { status: 500 }
      );
    }
  }
  
  if (!source) {
    return NextResponse.json({ error: 'source required' }, { status: 400 });
  }

  try {
    let submissionSource = source;
    
    if (is_zip) {
      // Extract all Java files from the zip
      const zip = await JSZip.loadAsync(source, { base64: true });
      const javaFiles = Object.values(zip.files).filter(file => file.name.endsWith('.java'));
      if (javaFiles.length === 0) {
        throw new Error('No Java files found in zip');
      }
      // Sort files to ensure Main.java is first
      javaFiles.sort((a, b) => {
        if (a.name === 'Main.java') return -1;
        if (b.name === 'Main.java') return 1;
        return a.name.localeCompare(b.name);
      });
      // Extract contents
      const fileContents = await Promise.all(
        javaFiles.map(async file => {
          const content = await file.async('string');
          const className = file.name.replace(/\.java$/, '');
          return { className, content };
        })
      );
      // Make only Main public, others package-private
      const combined = fileContents.map(({ className, content }) => {
        if (className === 'Main') {
          return content;
        } else {
          // Remove 'public' from class declaration
          return removePublicModifier(content, className);
        }
      }).join('\n\n');
      submissionSource = combined;
    }

    // 1. Create submission
    console.log('Attempting to connect to Judge0 at:', JUDGE0_URL);
    const createResponse = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=true&wait=false`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': JUDGE0_TOKEN,
      },
      body: JSON.stringify({
        source_code: b64(submissionSource),
        stdin: b64(stdin),
        language_id: languageId,
        base64_encoded: true,
      }),
    }).catch(error => {
      console.error('Failed to connect to Judge0:', error);
      throw new Error(`Failed to connect to Judge0: ${error.message}`);
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      console.error('Judge0 create submission failed:', errorText);
      throw new Error(`Judge0 create submission failed: ${errorText}`);
    }

    const { token: judgeToken } = await createResponse.json();
    if (!judgeToken) {
      return NextResponse.json({ error: 'no token from Judge0' }, { status: 502 });
    }

    return NextResponse.json({ token: judgeToken });
  } catch (error) {
    console.error('Judge0 error:', error);
    return NextResponse.json(
      { error: `Judge0 error: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  if (!JUDGE0_URL || !JUDGE0_TOKEN) {
    return NextResponse.json(
      { error: 'Judge0 configuration missing. Please check environment variables.' },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'token required' }, { status: 400 });
  }

  try {
    const response = await fetch(`${JUDGE0_URL}/submissions/${token}?base64_encoded=true`, {
      headers: { 'X-Auth-Token': JUDGE0_TOKEN },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Judge0 request failed: ${errorText}`);
    }

    const data = await response.json();
    
    // Return formatted response
    return NextResponse.json({
      status: data.status,
      stdout: decode(data.stdout),
      stderr: decode(data.stderr),
      compile: decode(data.compile_output),
      message: data.status?.description,
      exitCode: data.exit_code,
      time: data.time,
      memory: data.memory,
    });
  } catch (error) {
    console.error('Judge0 error:', error);
    return NextResponse.json(
      { error: `Judge0 error: ${error.message}` },
      { status: 500 }
    );
  }
} 