'use client';

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";

export default function ForLoopsEditor() {
  const [files, setFiles] = useState([
    {
      id: '1',
      name: 'Main.java',
      content: `public class Main {
  public static void main(String[] args) {
    // TODO:
    // Write a for loop header that repeats exactly 6 times.
    // It should print: "Running loop!" each time it runs.
    // Fill in the for loop parentheses below.
    for (/* your code here */) {
      System.out.println("Running loop!");
    }
  }
}
`
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