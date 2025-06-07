import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Quiz from "@/components/quiz";

export const metadata = {
  title: "While Loops Check For Understanding | EasyFTC",
};

const questions = [
  {
    question: "What is the purpose of a while loop in Java?",
    options: [
      "To repeat code a fixed number of times",
      "To repeat code while a condition is true",
      "To create arrays automatically",
      "To check multiple conditions at once"
    ],
    answer: "To repeat code while a condition is true",
  },
  {
    question: "What happens if the condition in a while loop never becomes false?",
    options: [
      "The program skips the loop",
      "The loop runs exactly once",
      "An infinite loop occurs",
      "The loop ends with an error"
    ],
    answer: "An infinite loop occurs",
  },
  {
    question: "How many times does this loop run?\n```java\nint i = 2;\nwhile (i <= 10) {\n    i = i + 2;\n}\n```",
    options: ["4", "5", "6", "8"],
    answer: "5",
  },
  {
    question: "Which of the following best explains why this loop is infinite?\n```java\nint x = 3;\nwhile (x < 10) {\n    System.out.println(x);\n}\n```",
    options: [
      "The condition is always false",
      "x is changed too quickly",
      "x is never updated inside the loop",
      "The condition uses the wrong variable"
    ],
    answer: "x is never updated inside the loop",
  },
  {
    question: "What does the following code print?\n```java\nint i = 1;\nwhile (i <= 3) {\n    System.out.print(i + \" \");\n    i++;\n}\nSystem.out.println(\"Done\");\n```",
    options: ["1 2 3 Done", "1 2 3 4 Done", "0 1 2 3 Done", "1 2 3"],
    answer: "1 2 3 Done",
  },
  {
    question: "Which while loop condition matches this behavior: \"Keep looping until the user types the correct password\"?",
    options: [
      "`while (input.equals(\"correct\"))`",
      "`while (!input.equals(\"correct\"))`",
      "`while (input == \"correct\")`",
      "`while (true)`"
    ],
    answer: "`while (!input.equals(\"correct\"))`",
  },
  {
    question: "Using this formula: `(StoppingValue – InitialValue) ÷ StepSize`, how many times will this loop run?\n```java\nint i = 5;\nwhile (i <= 15) {\n    i = i + 2;\n}\n```",
    options: ["4", "5", "6", "7"],
    answer: "6",
  }
];



export default function WhileLoopsCheckForUnderstanding() {
  // This lesson has 17 points
  const lessonPoints = 17;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
      <Quiz title="Check for Understanding" questions={questions} />
        <br/>
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
          </div>
          </div>
          </LessonLayout>
  );
} 