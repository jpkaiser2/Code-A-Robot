import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Quiz from "@/components/quiz";

export const metadata = {
  title: "Logic & Iteration Quiz | EasyFTC",
};

const questions = [
  {
    question: "Which of the following is a correct boolean expression in Java?",
    options: [
      "x = 5 > 3",
      "if (x < 10)",
      "x < 10 && y >= 2",
      "5 + true"
    ],
    answer: "x < 10 && y >= 2",
  },
  {
    question: "What is the output of this code?\n```java\nint x = 5;\nif (x > 3) {\n  System.out.println(\"Yes\");\n}\n```",
    options: ["Yes", "No", "Nothing", "Error"],
    answer: "Yes",
  },
  {
    question: "What is the output of the following?\n```java\nint score = 72;\nif (score >= 90) {\n  System.out.println(\"A\");\n}\n else if (score >= 80) {\n  System.out.println(\"B\");\n}\n else if (score >= 70) {\n  System.out.println(\"C\");\n}\n else {\n  System.out.println(\"D\");\n}\n```",
    options: ["A", "B", "C", "D"],
    answer: "C",
  },
  {
    question: "What does this loop do?\n```java\nint i = 0;\nwhile (i < 3) {\n  System.out.println(i);\n  i++;\n}\n```",
    options: [
      "Prints 0, 1, 2",
      "Prints 1, 2, 3",
      "Infinite loop",
      "Nothing prints"
    ],
    answer: "Prints 0, 1, 2",
  },
  {
    question: "How many times will this loop run?\n```java\nfor (int i = 0; i < 5; i++) {\n  System.out.println(i);\n}\n```",
    options: ["4", "5", "6", "0"],
    answer: "5",
  },
  {
    question: "What is nested iteration?",
    options: [
      "Two functions running at the same time",
      "A loop inside another loop",
      "An if statement inside a loop",
      "Two variables being updated together"
    ],
    answer: "A loop inside another loop",
  },
  {
    question: "According to DeMorgan’s Law, the expression:\n```java\n!(a && b)\n```\nis equivalent to:",
    options: [
      "!a || b",
      "!a || !b",
      "!a && !b",
      "a || !b"
    ],
    answer: "!a || !b",
  },
  {
    question: "What type of condition does an 'if' statement check in Java?",
    options: ["Number", "Loop", "Boolean", "Variable"],
    answer: "Boolean"
  },
  {
    question: "What does a 'while' loop check before each repetition?",
    options: ["Braces", "Variable", "Condition", "Statement"],
    answer: "Condition"
  },
  {
    question: "What part typically comes first in a for loop?",
    options: ["if", "Iteration", "Initialization", "Increment"],
    answer: "Initialization"
  }
];


export default function LogicIterationQuiz() {
  // This lesson has 21 points
  const lessonPoints = 21;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
      <Quiz title="Logic & Iteration Quiz" questions={questions} />
        <br/>
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
          </div>
          </div>
          </LessonLayout>
  );
} 