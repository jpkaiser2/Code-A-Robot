import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Quiz from "@/components/quiz";

export const metadata = {
  title: "Basic Java Quiz | EasyFTC",
};

const questions = [
  {
    question: "What is the difference between\n```java\nSystem.out.print(\"Hello\");\n```\nand\n```java\nSystem.out.println(\"Hello\");```?",
    options: [
      "'print' adds a newline after the text, 'println' does not.",
      "'println' adds a newline after the text, 'print' does not.",
      "'print' converts the argument to a string, 'println' does not.",
      "There is no functional difference."
    ],
    answer: "'println' adds a newline after the text, 'print' does not.",
  },
  {
    question: "Given the code:\n```java\nSystem.out.print(\"A\");\nSystem.out.print(\"B\");\nSystem.out.println(\"C\");\nSystem.out.println(\"D\");\n```\nWhat is the exact console output? (Note: \\n means new line)",
    options: [
      "'AB\\nCD\\n'",
      "'ABC\\nD\\n'",
      "'AB C\\nD\\n'",
      "'A B C D'"
    ],
    answer: "'AB\\nC\\nD\\n'",
  },
  {
    question: "Which of these is NOT a valid Java primitive type?",
    options: [
      "'int'",
      "'String'",
      "'boolean'",
      "'char'"
    ],
    answer: "'String'",
  },
  {
    question: "What is the default value of an uninitialized 'boolean' instance variable in Java?",
    options: [
      "'true'",
      "'false'",
      "'null'",
      "'0'"
    ],
    answer: "'false'",
  },
  {
    question: "In Java, what is the value of 'x' after this code runs?\n```java\nint x = 5;\nx = x + 3 * 2;\n```",
    options: [
      "'16'",
      "'11'",
      "'13'",
      "'10'"
    ],
    answer: "'11'",
  },
  {
    question: "Which of the following is an example of an assignment statement (not just an expression)?",
    options: [
      "'(a + b) * c'",
      "'x = y + 2;'",
      "'3 + 4 * 2'",
      "'(x > y) && (y < z)'"
    ],
    answer: "'x = y + 2;'",
  },
  {
    question: "Consider this snippet:\n```java\nScanner scanner = new Scanner(System.in);\nSystem.out.print(\"Enter a number: \");\nint n = scanner.nextInt();\nSystem.out.println(\"You entered: \" + n);\n```\nWhat happens if the user types '3.14' and presses Enter?",
    options: [
      "It prints 'You entered: 3' (truncating to int).",
      "It throws an 'InputMismatchException' at runtime.",
      "It prints 'You entered: 3.14' as a string.",
      "It rounds to '4' automatically and prints 'You entered: 4'."
    ],
    answer: "It throws an 'InputMismatchException' at runtime.",
  },
  {
    question: "Which import is required to use 'Scanner' in Java?",
    options: [
      "'import java.io.Scanner;'",
      "'import java.util.Scanner;'",
      "'import java.lang.Scanner;'",
      "No import is needed."
    ],
    answer: "'import java.util.Scanner;'",
  },
  {
    question: "Given:\n```java\ndouble d = 9.7;\nint i = (int) d;\n```\nWhat is the value of 'i' after casting?",
    options: [
      "'9'",
      "'10'",
      "'9.0'",
      "Compilation error"
    ],
    answer: "'9'",
  },
  {
    question: "Which statement about casting is true?",
    options: [
      "You can cast a 'String' to an 'int' by writing '(int) myString;'.",
      "Widening conversions (e.g., 'int' to 'double') happen automatically.",
      "Narrowing conversions (e.g., 'double' to 'int') never require explicit cast syntax.",
      "Casting between unrelated reference types (e.g., 'String' to 'Scanner') is allowed without errors."
    ],
    answer: "Widening conversions (e.g., 'int' to 'double') happen automatically.",
  }
];






export default function CastingCheckForUnderstanding() {
  // This lesson has 10 points
  const lessonPoints = 10;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
      <Quiz title="Basic Java Quiz" questions={questions} />
        <br/>
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
          </div>
          </div>
          </LessonLayout>
  );
} 