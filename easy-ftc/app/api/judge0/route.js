import { NextResponse } from 'next/server';

const JUDGE0_URL = process.env.JUDGE0_URL;
const JUDGE0_TOKEN = process.env.JUDGE0_TOKEN;

const b64 = (s) => Buffer.from(s).toString('base64');
const decode = (s) => (s ? Buffer.from(s, 'base64').toString() : '');
console.log('[Judge0 route] URL from env =>', process.env.JUDGE0_URL);
export async function POST(request) {
  if (!JUDGE0_URL || !JUDGE0_TOKEN) {
    return NextResponse.json(
      { error: 'Judge0 configuration missing. Please check environment variables.' },
      { status: 500 }
    );
  }

  const body = await request.json();
  const { source_code: source = '', stdin = '', language_id: languageId = 62 } = body;
  
  if (!source) {
    return NextResponse.json({ error: 'source required' }, { status: 400 });
  }

  try {
    // 1. Create submission
    console.log('Attempting to connect to Judge0 at:', JUDGE0_URL);
    const createResponse = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=true&wait=false`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': JUDGE0_TOKEN,
      },
      body: JSON.stringify({
        source_code: b64(source),
        stdin: b64(stdin),
        language_id: languageId,
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

    const { token } = await createResponse.json();
    if (!token) {
      return NextResponse.json({ error: 'no token from Judge0' }, { status: 502 });
    }

    // 2. Poll for results
    let result;
    while (true) {
      const pollResponse = await fetch(`${JUDGE0_URL}/submissions/${token}?base64_encoded=true`, {
        headers: { 'X-Auth-Token': JUDGE0_TOKEN },
      }).catch(error => {
        console.error('Failed to poll Judge0:', error);
        throw new Error(`Failed to poll Judge0: ${error.message}`);
      });

      if (!pollResponse.ok) {
        const errorText = await pollResponse.text();
        console.error('Judge0 poll failed:', errorText);
        throw new Error(`Judge0 poll failed: ${errorText}`);
      }

      result = await pollResponse.json();
      
      if (result.status?.id > 2) break; // 1 = queued, 2 = processing
      await new Promise(r => setTimeout(r, 750));
    }

    // 3. Return formatted response
    return NextResponse.json({
      stdout: decode(result.stdout),
      stderr: decode(result.stderr),
      compile: decode(result.compile_output),
      message: result.status?.description,
      exitCode: result.exit_code,
      time: result.time,
      memory: result.memory,
    });
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
  const path = searchParams.get('path') || 'languages';

  try {
    const apiRes = await fetch(`${JUDGE0_URL}/${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': JUDGE0_TOKEN,
      },
    }).catch(error => {
      console.error('Failed to connect to Judge0:', error);
      throw new Error(`Failed to connect to Judge0: ${error.message}`);
    });

    if (!apiRes.ok) {
      const errorText = await apiRes.text();
      console.error('Judge0 request failed:', errorText);
      throw new Error(`Judge0 request failed: ${errorText}`);
    }

    const text = await apiRes.text();
    return new NextResponse(text, { status: apiRes.status });
  } catch (error) {
    console.error('Judge0 error:', error);
    return NextResponse.json(
      { error: `Judge0 error: ${error.message}` },
      { status: 500 }
    );
  }
} 