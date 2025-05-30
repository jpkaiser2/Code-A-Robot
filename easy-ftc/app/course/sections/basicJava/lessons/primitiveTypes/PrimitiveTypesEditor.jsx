'use client';

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";

export default function PrimitiveTypesEditor() {
  const [files, setFiles] = useState([
    {
      id: '1',
      name: 'Main.java',
      content: `public class Main {
    public static void main(String[] args) {
        // Declare a variable of type integer on line 4
        
        // On line 6, store the value 8 in the integer variable 
        
        // Initialize a variable of type double on line 8 with a value of 9.2
        
        // Initialize a variable of type boolean on line 10 that stores true
        
        // Create a string with the name of your team on line 12
        
        
        // Print out each one of the variables you created
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