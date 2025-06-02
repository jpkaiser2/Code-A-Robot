'use client';

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";

export default function CastingEditor() {
  const [files, setFiles] = useState([
    {
      id: '1',
      name: 'Apples.java',
      content: `public class Apples {
    public static void main(String[] args) {
        // Task:
        // 1. Declare an int named "apples" and set it to 7.
        // 2. Declare a double named "pricePerApple" and set it to 1.25.
        // 3. Declare a variable with the appropriate type named "totalCost" and assign it apples * pricePerApple.
        
        // Start writing on line 9
       
        
        System.out.println("Total cost is: " + totalCost);
        // → You should see "Total cost is: 8.75"
    }
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