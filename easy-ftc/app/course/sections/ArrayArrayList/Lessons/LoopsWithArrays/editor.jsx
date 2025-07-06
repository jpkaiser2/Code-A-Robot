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
    // TODO: 1. Print all elements in the array using a for loop
    int[] scores = {85, 92, 78, 90};
    // Print: Score 0: 85, Score 1: 92, ...
    
    // Your code here
    
    
    
    // TODO: 2. Sum all values in the array and print the total
    int[] values = {3, 5, 2, 8};
    int sum = 0;
    
    // Your code here (use a loop)
    
    
    System.out.println("Total sum: " + sum);



    // TODO: 3. Find the maximum value in the array and print it
    int[] temps = {67, 72, 90, 85};
    int max = temps[0];
    // Your code here (use a loop)
    
    
    System.out.println("Hottest temperature: " + max);

    
  }
}

/*
Expected Output (if you complete all TODOs):
Score 0: 85
Score 1: 92
Score 2: 78
Score 3: 90
Total sum: 18
Hottest temperature: 90
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