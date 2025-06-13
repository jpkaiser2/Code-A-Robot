'use client';

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";

export default function ParamCallingMethodsEditor() {
  const [files, setFiles] = useState([
    {
      id: '1',
      name: 'Main.java',
      content: `// DIRECTIONS:
// 1. Write a method named chooseSnack that takes two parameters:
//    - a String for the snack name
//    - a double for the snack price
// 2. Inside the method, print: "You chose [snack], which costs $[price]"
// 3. In the main method, call chooseSnack several times with different snacks and prices

public class Main {
  public static void main(String[] args) {
    // Call your chooseSnack method here with at least 3 different snacks
    // Example: chooseSnack("Chips", 1.50);
  }
  // Write your chooseSnack method below
}

// Example expected output (once the code is complete):
// You chose Chips, which costs $1.5
// You chose Gummy Bears, which costs $2.25
// You chose Water, which costs $1.0`
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