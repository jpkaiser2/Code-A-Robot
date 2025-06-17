'use client';

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";

export default function ScopeEditor() {
  const [files, setFiles] = useState([
    {
      id: '1',
      name: 'Main.java',
      content: `// This program has several scope-related errors.
// Your task is to fix the errors so that the program runs correctly and prints the expected output.
// Do not add new variables unless absolutely necessary. Try to understand why the current ones aren’t working.

public class Main {
  public static void main(String[] args) {
    setUp();
    printDetails();
    updateDetails();
    printDetails();
  }
  
  public static void setUp() {
    String name = "Tina";
    int age = 15;
  }
  
  public static void printDetails() {
    // TODO: Fix the scope issue so this method can access name and age
    System.out.println("Name: " + name);
    System.out.println("Age: " + age);
  }
  
  public static void updateDetails() {
    // TODO: Fix the scope issue so this method can update the same name and age
    name = "David";
    age = 18;
  }
}

/*
Expected Output:

Name: Tina
Age: 15
Name: David
Age: 18
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