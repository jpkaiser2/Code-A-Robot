'use client';

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";

export default function ArraysEditor() {
  const [files, setFiles] = useState([
    {
      id: '1',
      name: 'Main.java',
      content: `import java.util.ArrayList;

public class Main {
  public static void main(String[] args) {
    // TODO 1: Create an ArrayList of Strings called fruits and add "Strawberry", "Banana", and "Blueberry"
    
    // TODO 2: Print all elements using a for loop with index
    // Output:
    // Strawberry
    // Banana
    // Blueberry

    // TODO 3: Print all elements using a for-each loop
    // Output should be the same as above

    // TODO 4: Create an ArrayList of Integers called numbers and add 5, 10, 15
    
    // TODO 5: Use a for-each loop to sum all values in numbers and print the result
    // Output:
    // Sum: 30

    
  }
}

/*
Expected Output (if you complete all TODOs):
Apple
Banana
Cherry
Apple
Banana
Cherry
Sum: 30
*/`
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