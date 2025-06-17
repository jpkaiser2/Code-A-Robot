'use client';

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";

export default function ReturnValuesEditor() {
  const [files, setFiles] = useState([
    {
      id: '1',
      name: 'Main.java',
      content: `public class Greeting {
  // 1. Write a greet method with no parameters
  // It should print: "Hello!"
  // 2. Write a greet method that takes a String name
  // It should print: "Hello, [name]!"
  // 3. Write a greet method that takes a String name and an int age
  // It should print: "Hello, [name]! You are [age] years old."
  public static void main(String[] args) {
    greet();
    greet("Oliver");
    greet("Roxy", 2);
  }
}

/*
Expected Output:
Hello!
Hello, Oliver!
Hello, Roxy! You are 2 years old.
*/
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