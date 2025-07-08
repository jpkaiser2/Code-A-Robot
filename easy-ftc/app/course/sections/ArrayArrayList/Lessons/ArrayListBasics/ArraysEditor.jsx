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
    // TODO: Create an ArrayList of Strings called 'names'
    
    
    // TODO: Add "Maya", "Leo", and "Sophie" to the list

    // TODO: Print the size of the list
    System.out.println("Size: " + /* your code here */);

    // TODO: Print the first name in the list
    System.out.println("First name: " + /* your code here */);

    // TODO: Change the second name to "Leon"
    /* your code here */

    // TODO: Remove "Sophie" from the list
    /* your code here */

    // TODO: Print the final list
    System.out.println("Final list: " + names);
  }
}

/*
Expected Output:
Size: 3
First name: Maya
Final list: [Maya, Leon]
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