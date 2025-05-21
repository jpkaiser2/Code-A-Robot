'use client';

import { useState } from 'react';
import CodeEditor from '@/components/CodeEditor';

export default function TestJudge0() {
  const [code, setCode] = useState(`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`);
  const [stdin, setStdin] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/judge0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_code: code,
          stdin: stdin,
          language_id: 62, // Java
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Judge0 error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Judge0 Test Page</h1>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 transition-colors"
        >
          {loading ? 'Running...' : 'Run Code'}
        </button>
      </div>

      <CodeEditor
        initialCode={code}
        onChange={setCode}
        height="700px"
        fontSize={16}
        stdin={stdin}
        onStdinChange={setStdin}
        stdout={result?.stdout}
        stderr={result?.stderr}
        compileOutput={result?.compile}
        exitCode={result?.exitCode}
        executionTime={result?.time}
        memory={result?.memory}
      />

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  );
} 