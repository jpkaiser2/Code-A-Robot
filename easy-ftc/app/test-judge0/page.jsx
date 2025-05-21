'use client';

import { useState } from 'react';
import CodeEditor from '@/components/CodeEditor';

export default function TestJudge0() {
  const [files, setFiles] = useState([
    {
      id: '1',
      name: 'Main.java',
      content: `public class Main {
    public static void main(String[] args) {
        Helper helper = new Helper();
        System.out.println(helper.getMessage());
    }
}`
    },
    {
      id: '2',
      name: 'Helper.java',
      content: `public class Helper {
    public String getMessage() {
        return "Hello from Helper class!";
   }
}`
    }
  ]);
  const [stdin, setStdin] = useState('');

  const handleFileChange = (fileId, newContent) => {
    setFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === fileId 
          ? { ...file, content: newContent }
          : file
      )
    );
  };

  const handleFileSelect = (fileId) => {
    // Optional: Handle file selection if needed
    console.log('Selected file:', fileId);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Test Judge0</h1>
      <div className="h-[800px]">
        <CodeEditor
          files={files}
          onFileChange={handleFileChange}
          onFileSelect={handleFileSelect}
          stdin={stdin}
          onStdinChange={setStdin}
        />
      </div>
    </div>
  );
} 