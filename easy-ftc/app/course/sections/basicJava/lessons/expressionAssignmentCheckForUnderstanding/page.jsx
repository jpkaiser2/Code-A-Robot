import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Quiz from "@/components/quiz";

export const metadata = {
  title: "Expression vs. Assignment Check For Understanding | EasyFTC",
};

const questions = [
  {
    question: "What is the result of the expression? ```java\n10 - 2 * 4\n```",
    options: ["32", "8", "2", "6"],
    answer: "2",
  },
  {
    question: "What does the % operator do in Java?",
    options: [
      "Divides two numbers",
      "Returns the whole number result of a division",
      "Returns the remainder after division",
      "Converts a value to a percentage"
    ],
    answer: "Returns the remainder after division",
  },
  {
    question: "Which of the following is a valid assignment statement?",
    options: [
      "```java\n5 + 3 = result;\n```",
      "```java\nint x == 4;\n```",
      "```java\nx = x + 2;\n```",
      "```java\nx + 2 => x;\n```"
    ],
    answer: "```java\nx = x + 2;\n```",
  },
  {
    question: "What is the value of result after this code runs?\n```java\nint a = 4;\nint b = 3;\nint result = (a + b) * 2 % 5;\n```",
    options: ["1", "2", "0", "3"],
    answer: "1",
  },
  {
    question: "Which of the following uses the assignment operator correctly?",
    options: [
      "```java\ntotal += 5;\n```",
      "```java\ntotal == total + 5;\n```",
      "```java\n5 = total + 5;\n```",
      "```java\ntotal + 5 = total;\n```"
    ],
    answer: "```java\ntotal += 5;\n```",
  },
  {
    question: "What is the purpose of parentheses in arithmetic expressions in Java?",
    options: [
      "They're ignored by the compiler",
      "They make code look nicer",
      "They change the order of operations",
      "They store values"
    ],
    answer: "They change the order of operations",
  },
];


export default function ExpressionAssignmentCheckForUnderstanding() {
  const lessonPoints = 6;
  
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