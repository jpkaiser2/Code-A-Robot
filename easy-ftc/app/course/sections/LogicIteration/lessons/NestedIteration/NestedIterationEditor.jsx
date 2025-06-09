'use client';

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";

export default function NestedIterationEditor() {
  const [files, setFiles] = useState([
    {
      id: '1',
      name: 'Main.java',
      content: `public class Main {
  public static void main(String[] args) {
    // TODO: Use nested for loops to print an upside-down triangle
    // The triangle should start with 5 stars on the first line,
    // then 4 on the next, then 3, and so on until there is 1 star on the last line.
    // Expected Output:
    // *****
    // ****
    // ***
    // **
    // *
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