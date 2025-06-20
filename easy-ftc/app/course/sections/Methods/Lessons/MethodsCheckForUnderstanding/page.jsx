import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Quiz from "@/components/quiz";

export const metadata = {
  title: "Methods Check For Understanding | EasyFTC",
};

const questions = [
  {
    question: "What is the main purpose of a method in Java?",
    options: [
      "To define variables",
      "To repeat code without copying it over and over",
      "To print text to the screen",
      "To create loops"
    ],
    answer: "To repeat code without copying it over and over",
  },
  {
    question: "What is the correct way to define a method that prints 'Hello'?",
    options: [
      "void sayHello() { System.out.println('Hello'); }",
      "public static sayHello() { System.out.println('Hello'); }",
      "public static void sayHello() { System.out.println(\"Hello\"); }",
      "method sayHello() { print('Hello'); }"
    ],
    answer: "public static void sayHello() { System.out.println(\"Hello\"); }",
  },
  {
    question: "How do you call a method named greet that takes one String parameter?",
    options: [
      "greet();",
      "greet[\"Hello\"]",
      "greet(\"Hello\");",
      "call greet(\"Hello\")"
    ],
    answer: "greet(\"Hello\");",
  },
  {
    question: "In the method definition `public static void displayPrice(String item, double price)`, which of the following is true?",
    options: [
      "`item` is an argument and `price` is a return value",
      "`item` and `price` are both parameters",
      "`item` is a parameter and `price` is an argument",
      "`displayPrice` must return a value"
    ],
    answer: "`item` and `price` are both parameters",
  },
  {
    question: "What will this code print?\n```java\npublic static void main(String[] args) {\n    greet(\"Winnie\");\n}\n\npublic static void greet(String name) {\n    System.out.println(\"Hello, \" + name + \"!\");\n}\n```",
    options: [
      "Hello, name!",
      "Hello, Winnie!",
      "greet Winnie",
      "Error: greet is not defined"
    ],
    answer: "Hello, Winnie!",
  },
  {
    question: "What will this code print?\n```java\npublic static void main(String[] args) {\n    sayHi();\n    sayHi();\n}\n\npublic static void sayHi() {\n    System.out.println(\"Hi!\");\n}\n```",
    options: [
      "Hi!",
      "Hi! Hi!",
      "sayHi",
      "Nothing is printed"
    ],
    answer: "Hi! Hi!",
  },
  {
    question: "True or False: You can reuse a method multiple times in your program.",
    options: [
      "True",
      "False"
    ],
    answer: "True"
  }
];




export default function MethodsCheckForUnderstanding() {
  // This lesson has 24 points
  const lessonPoints = 24;
  
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