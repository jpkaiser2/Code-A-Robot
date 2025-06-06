'use client';

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";

export default function WhileLoopsEditor() {
  const [files, setFiles] = useState([
    {
      id: '1',
      name: 'Main.java',
      content: `// Practice: Complete the following code to use a while loop correctly.
// 1. Fill in the condition so the loop runs while counter is less than or equal to 5.
// 2. Update the counter inside the loop so that it will eventually reach 6 and end the loop.

public class Main {
  public static void main(String[] args) {
    int counter = 1;  // Start counting at 1
    // TODO: Write a condition so this loop runs the correct amount of times
    while ( /* condition here */ ) {
      System.out.println("Count: " + counter);
      // TODO: Change 'counter' so that when it reaches 6, the loop stops.
      /* update counter here */
    }
    // This line should print after the loop has printed 1 through 5
    System.out.println("Loop finished!");
  }
}

/*
 Expected behavior when completed:
  Count: 1
  Count: 2
  Count: 3
  Count: 4
  Count: 5
  Loop finished!
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