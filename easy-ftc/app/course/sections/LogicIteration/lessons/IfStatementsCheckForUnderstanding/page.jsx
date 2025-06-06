import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Quiz from "@/components/quiz";

export const metadata = {
  title: "If Statements Check For Understanding | EasyFTC",
};

const questions = [
  {
    question: "What is the output of the following code? ```java\nint score = 85;\nchar grade;\n\nif (score >= 90) {\n    grade = 'A';\n}\nelse if (score >= 80) {\n    grade = 'B';\n}\nelse {\n    grade = 'C';\n}\nSystem.out.println(\"Grade: \" + grade);\n```",
    options: ["Grade: A", "Grade: B", "Grade: C", "Grade: D"],
    answer: "Grade: B",
  },
  {
    question: "Consider this snippet: ```java\nint x = 5;\nif (x < 3) {\n    System.out.println(\"Less than 3\");\n}\nif (x < 10) {\n    System.out.println(\"Less than 10\");\n}\nelse {\n    System.out.println(\"10 or more\");\n}\n``` What will be printed?",
    options: [
      "Less than 3\nLess than 10",
      "Less than 10",
      "Less than 3\n10 or more",
      "Less than 3\nLess than 10\n10 or more"
    ],
    answer: "Less than 10",
  },
  {
    question: "What does the following code print? ```java\nint a = 2;\nif (a > 0) {\n    System.out.println(\"Positive\");\n}\nelse if (a < 0) {\n    System.out.println(\"Negative\");\n}\nelse {\n    System.out.println(\"Zero\");\n}\n```",
    options: ["Positive", "Negative", "Zero", "Compile-time error"],
    answer: "Positive",
  },
  {
    question: "Why is an else if chain preferable to multiple standalone if statements when checking exclusive conditions?",
    options: [
      "Because else if always runs faster than if",
      "Because only one branch of an if / else if / else construct can execute, preventing multiple outputs",
      "Because standalone if statements cannot compare values",
      "Because else if uses less memory than if"
    ],
    answer: "Because only one branch of an if / else if / else construct can execute, preventing multiple outputs",
  },
  {
    question: "Given this code: ```java\nint num = 10;\nif (num % 2 == 0) {\n    System.out.println(\"Even\");\n}\nelse if (num % 3 == 0) {\n    System.out.println(\"Divisible by 3\");\n}\nelse {\n    System.out.println(\"None of the above\");\n}\n``` Which statement is true?",
    options: [
      "\"Even\" and \"Divisible by 3\" will both be printed",
      "\"Divisible by 3\" will be printed",
      "\"Even\" will be printed",
      "\"None of the above\" will be printed"
    ],
    answer: "\"Even\" will be printed",
  }
];




export default function IfStatementsCheckForUnderstanding() {
  // This lesson has 15 points
  const lessonPoints = 15;
  
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