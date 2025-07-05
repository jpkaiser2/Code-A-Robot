'use client';

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";

export default function ArraysEditor() {
  const [files, setFiles] = useState([
    {
      id: '1',
      name: 'Main.java',
      content: `public class Main {
  public static void main(String[] args) {
    // TODO: Create an array of 3 integers called 'numbers'
    // Initialize it with values: 10, 20, 30
    
    
    // TODO: Print the first number (index 0)
    System.out.println("First number: " + /* your code here */);
    
    // TODO: Print the second number (index 1)
    System.out.println("Second number: " + /* your code here */);
    
    // TODO: Print the third number (index 2)
    System.out.println("Third number: " + /* your code here */);
    
    // TODO: Change the second number to 25
    /* your code here */
    
    // TODO: Print the second number after changing it
    System.out.println("Second number after change: " + /* your code here */);
    
    // TODO: Print the array length
    System.out.println("Array length: " + /* your code here */);
  }
}

/*
Expected Output:
First number: 10
Second number: 20
Third number: 30
Second number after change: 25
Array length: 3
*/`
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