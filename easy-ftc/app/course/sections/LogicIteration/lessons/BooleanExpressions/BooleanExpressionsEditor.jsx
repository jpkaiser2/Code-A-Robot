'use client';

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";

export default function BooleanExpressionsEditor() {
  const [files, setFiles] = useState([
    {
      id: '1',
      name: 'Main.java',
      content: `public class Main {
    public static void main(String[] args) {
        // Two example boolean values
        boolean a = true;
        boolean b = false;

        // --- Example 1 ---
        boolean original1 = !(a && b);
        //TODO: Use De Morgan’s law to simplify:
        boolean deMorgan1 = 

        System.out.println("original1 = " + original1);
        System.out.println("deMorgan1  = " + deMorgan1);

        // --- Example 2 ---
        boolean original2 = !(a || b);
        //TODO: Use De Morgan’s law to simplify:
        boolean deMorgan2 = 

        System.out.println("original2 = " + original2);
        System.out.println("deMorgan2  = " + deMorgan2);
    }
}

/*
Expected output:

original1 = true
deMorgan1  = true
original2 = false
deMorgan2  = false
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