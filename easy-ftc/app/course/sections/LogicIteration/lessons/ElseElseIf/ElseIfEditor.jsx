'use client';

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";

export default function ElseIfEditor() {
  const [files, setFiles] = useState([
    {
      id: '1',
      name: 'Main.java',
      content: `public class Main {
    public static void main(String[] args) {
        /*
        The robot needs to choose an arm extension based on object distance:
        - If distance <= 10 cm, use short arm
        - If distance <= 20 cm, use medium arm
        - Otherwise, use long arm
        Fix the code below so that only one assignment occurs.
        */
        int distance = 18; // distance measured by sensor in inches
        String armLength = "";

        if (distance <= 10) {
            armLength = "SHORT";
        }
        if (distance <= 20) {
            armLength = "MEDIUM";
        }
        if (distance > 20) {
            armLength = "LONG";
        }

        System.out.println("Selected arm: " + armLength);  // Expected output: Selected arm: MEDIUM
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