'use client';

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";

export default function IntroMethodsEditor() {
  const [files, setFiles] = useState([
    {
      id: '1',
      name: 'Main.java',
      content: `public class Main {
  // DIRECTIONS:
  // 1. Write a method called printLine that prints a decorative divider line, like: "==--==--==--=="
  // 2. In the main method, call your printLine method three times.
  // 3. The output should be three lines of the same divider.
  // 4. Make sure your method is written above the main method.
  // 5. Don’t change the main method except to call your printLine method.
  
  public static void main(String[] args) {
    // Call your method here three times
  }
}

/*
Sample Output:
==--==--==--==
==--==--==--==
==--==--==--==
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