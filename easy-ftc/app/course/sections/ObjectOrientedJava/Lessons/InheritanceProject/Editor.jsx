'use client';

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";

export default function InheritanceProjectEditor() {
  const [files, setFiles] = useState([
    {
      id: '1',
      name: 'Main.java',
      content: `public class Main {
    public static void main(String[] args) {
        Lion leo = new Lion("Leo", 5);
        Elephant ella = new Elephant("Ella", 8);
        Monkey george = new Monkey("George", 3);

        leo.getInfo();
        leo.makeSound();

        ella.getInfo();
        ella.makeSound();

        george.getInfo();
        george.makeSound();
    }
}

// Expected Output:
// Name: Leo | Age: 5
// Roar!
// Name: Ella | Age: 8
// Trumpet!
// Name: George | Age: 3
// Ooh ooh aah aah!`
    },
    {
      id: '2',
      name: 'Animal.java',
      content: `// Base class
class Animal {
    String name;
    int age;

    public Animal(String name, int age) {
        // Set the fields
    }

    public void makeSound() {
        System.out.println("Some generic animal sound");
    }

    public void getInfo() {
        System.out.println("Name: " + name + " | Age: " + age);
    }
}`
    },
    {
      id: '3',
      name: 'Lion.java',
      content: `// Subclass: Lion
class Lion extends Animal {
    public Lion(String name, int age) {
        // Call the Animal constructor
    }

    @Override
    public void makeSound() {
        // Print: "Roar!"
    }
}`
    },
    {
      id: '4',
      name: 'Elephant.java',
      content: `// Subclass: Elephant
class Elephant extends Animal {
    public Elephant(String name, int age) {
        // Call the Animal constructor
    }

    @Override
    public void makeSound() {
        // Print: "Trumpet!"
    }
}`
    },
    {
      id: '5',
      name: 'Monkey.java',
      content: `// Subclass: Monkey
class Monkey extends Animal {
    public Monkey(String name, int age) {
        // Call the Animal constructor
    }

    @Override
    public void makeSound() {
        // Print: "Ooh ooh aah aah!"
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