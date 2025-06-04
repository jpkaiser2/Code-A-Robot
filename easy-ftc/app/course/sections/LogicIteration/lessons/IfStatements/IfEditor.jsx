'use client';

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";

export default function IfEditor() {
  const [files, setFiles] = useState([
    {
      id: '1',
      name: 'IfStatementExercise.java',
      content: `// Directions:
// 1. Complete each if statement condition inside the parentheses.
// 2. Do NOT modify the existing variable declarations or the System.out.println lines.
// 3. After filling in all conditions, run the program to verify the console output matches the expected output below.

public class IfStatementExercise {
    public static void main(String[] args) {
        // Pre-defined variables (do not modify):
        int batteryLevel = 48;
        int distanceToTarget = 12;
        boolean targetLocked = false;
        int score = 7;
        boolean isPracticeMode = true;
        
        // ================================
        // TASK 1: Low Battery Warning
        // ================================
        // If the batteryLevel is less than or equal to 50, print:
        // "WARNING: Battery low. Please return to charging station."
        if (/* fill in condition */) {
            System.out.println("WARNING: Battery low. Please return to charging station.");
        }
        
        // ================================
        // TASK 2: Target Confirmation
        // ================================
        // If the distanceToTarget is less than 15 AND targetLocked is true,
        // print: "Target in range and locked. Preparing to fire."
        if (/* fill in condition */) {
            System.out.println("Target in range and locked. Preparing to fire.");
        }
        // If the distanceToTarget is less than 15 but targetLocked is false,
        // print: "Target close but not locked. Attempting to lock..."
        if (/* fill in condition */) {
            System.out.println("Target close but not locked. Attempting to lock...");
        }
        
        // ================================
        // TASK 3: Scoring Evaluation
        // ================================
        // If the score is greater than or equal to 10, print:
        // "Great job! Bonus points awarded."
        if (/* fill in condition */) {
            System.out.println("Great job! Bonus points awarded.");
        }
        
        // ================================
        // TASK 4: Practice Mode Reminder
        // ================================
        // If the robot is running in practice mode, print:
        // "Practice mode active. Telemetry data will not affect rankings."
        if (/* fill in condition */) {
            System.out.println("Practice mode active. Telemetry data will not affect rankings.");
        }
        
        // ================================
        // TASK 5: Combined Scenario
        // ================================
        // If batteryLevel is less than 30 AND isPracticeMode is false, print:
        // "CRITICAL: Low battery during competition!"
        if (/* fill in condition */) {
            System.out.println("CRITICAL: Low battery during competition!");
        }
    }
}

/*
Expected Console Output:
WARNING: Battery low. Please return to charging station.
Target close but not locked. Attempting to lock...
Practice mode active. Telemetry data will not affect rankings.
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