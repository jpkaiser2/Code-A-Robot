'use client';

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";

export default function VarsEditor() {
  const [files, setFiles] = useState([
    {
      id: '1',
      name: 'Main.java',
      content: `public class Main {
  public static void main(String[] args) {
    // TODO: Create a Dog object
    // TODO: Set the dog's name and age
    // TODO: Call bark() on the Dog object
  }
}

/*
Expected Output:

Buddy says woof!
Buddy is 3 years old.
Barked 1 times.
*/`
    },
    {
      id: '2',
      name: 'Dog.java',
      content: `// TODO: Define the Dog class with two instance variables: name (String) and age (int)
// Add a method bark() that prints the dog's name, age, and uses a local variable to count barks

public class Dog {
  // instance variables
  String name;
  int age;

  public void bark() {
    // TODO: Add a local variable to count barks
    // Print the dog's name and age
    // Print how many times the dog has barked
  }
}
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