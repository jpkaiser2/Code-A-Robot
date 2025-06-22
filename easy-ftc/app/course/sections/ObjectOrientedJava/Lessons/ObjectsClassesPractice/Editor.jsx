'use client';

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";

export default function ScopeEditor() {
  const [files, setFiles] = useState([
    {
      id: '1',
      name: 'Main.java',
      content: `public class Main {
  public static void main(String[] args) {
    // TODO: Create your Car objects here and call printDetails() on each
  }
}

// Expected Output (example):
// 2020 Toyota Camry
// 2024 Tesla Model 3
// 2015 Honda Accord`
    },
    {
      id: '2',
      name: 'Car.java',
      content: `public class Car {
  // TODO: Complete the Car class here
}`
    }
  ]);

  const handleFileChange = (fileId, newContent) => {
    setFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === fileId 
          ? { ...file, content: newContent }
          : file
      )
    );
  };

  return (
    <CodeEditor
      files={files}
      onFileChange={handleFileChange}
      onFileSelect={() => {}}
      stdin=""
      onStdinChange={() => {}}
    />
  );
} 