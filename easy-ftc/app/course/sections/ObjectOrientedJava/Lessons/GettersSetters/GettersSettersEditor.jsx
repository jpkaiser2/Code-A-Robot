'use client';

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";

export default function GettersSettersEditor() {
  const [files, setFiles] = useState([
    {
      id: '1',
      name: 'Main.java',
      content: `public class Main {
  public static void main(String[] args) {
    // TODO: Create a Person object
    // TODO: Set the name to your own using the setter
    // TODO: Print the name using the getter
  }
}
`
    },
    {
      id: '2',
      name: 'Person.java',
      content: `public class Person {
  // TODO: Make a private String variable called name
  
  // TODO: Write a setter method for name
  
  // TODO: Write a getter method for name
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