'use client';

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";

export default function StaticInstanceMethodsEditor() {
  const [files, setFiles] = useState([
    {
      id: '1',
      name: 'Main.java',
      content: `public class Main {
  public static void main(String[] args) {
    // TODO: Call the static method from MathHelper
    // TODO: Create a Dog object and call its bark method
  }
}

// Expected Output (example):
// 25
// Rex says woof!`
    },
    {
      id: '2',
      name: 'MathHelper.java',
      content: `public class MathHelper {
  // TODO: Write a static method called square that returns the square of an int
}`
    },
    {
      id: '3',
      name: 'Dog.java',
      content: `public class Dog {
  String name;

  public Dog(String dogName) {
    name = dogName;
  }

  // TODO: Write an instance method called bark that prints: <name> says woof!
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