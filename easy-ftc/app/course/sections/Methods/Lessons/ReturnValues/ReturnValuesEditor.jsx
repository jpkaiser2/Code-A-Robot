'use client';

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";

export default function ReturnValuesEditor() {
  const [files, setFiles] = useState([
    {
      id: '1',
      name: 'Main.java',
      content: `// Directions:
// 1. Complete the method below so it returns triple the number passed in.
// 2. In the main method, call tripleNumber with the number 6.
// 3. Store the result in a variable called result.
// 4. Print the result with a message like: "Result: 18"

// Expected Output: "Result: 18"

public class Main {
  public static int tripleNumber(int number) {
    // TODO: return triple the number
  }
  public static void main(String[] args) {
    // TODO: call tripleNumber with 6 and store result in variable called result
    // TODO: print the result
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