'use client';

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";

export default function ConstructorsEditor() {
  const [files, setFiles] = useState([
    {
      id: '1',
      name: 'Main.java',
      content: `public class Main {
  public static void main(String[] args) {
    // TODO: Create three Student objects using different constructors
    // 1. Create a student with name "Bob", age 19, major "Cinematography"
    // 2. Create a student with name "Judy", age 18, major "Screenwriting"
    
    // TODO: Call displayInfo() on each student
  }
}

/*
Expected Output:

Name: Bob
Age: 19
Major: Cinematography

Name: Judy
Age: 18
Major: Screenwriting

*/`
    },
    {
      id: '2',
      name: 'Student.java',
      content: `// TODO: Complete the Student class by adding constructors
// The program should create students using constructors and print their information

public class Student {
  String name;
  int age;
  String major;
    
  // TODO: Add a constructor that takes name, age, and major
  // This constructor should initialize all three instance variables
    
    
  // TODO: Add a constructor that takes only name and age
  // This constructor should set major to "Undeclared"
    
    
  // TODO: Add a constructor that takes only name
  // This constructor should set age to 18 and major to "Undeclared"
  
  
  
    
  public void displayInfo() {
    System.out.println("Name: " + name);
    System.out.println("Age: " + age);
    System.out.println("Major: " + major);
    System.out.println();
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