import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Quiz from "@/components/quiz";

export const metadata = {
  title: "Methods Quiz | EasyFTC",
};

const questions = [
  {
    question: "What is the main benefit of using methods in Java?",
    options: [
      "They slow down the program",
      "They make the code more repetitive",
      "They allow code to be reused and organized",
      "They increase memory usage"
    ],
    answer: "They allow code to be reused and organized",
  },
  {
    question: "Which is a valid method header in Java?",
    options: [
      "void hello(String name)",
      "hello(String name): void",
      "public static void hello(String name)",
      "def hello(name)"
    ],
    answer: "public static void hello(String name)",
  },
  {
    question: "What is the correct way to call a method named `greet` that takes a String?",
    options: [
      "greet(\"Roxy\");",
      "greet = \"Roxy\";",
      "greet -> Roxy;",
      "call greet with \"Roxy\";"
    ],
    answer: "greet(\"Roxy\");",
  },
  {
    question: "What is printed by the following code?\n\n```java\npublic static void main(String[] args) {\n  sayHello();\n}\n\npublic static void sayHello() {\n  System.out.println(\"Hello!\");\n}\n```",
    options: [
      "Nothing, it's an error",
      "Hello!",
      "sayHello",
      "main"
    ],
    answer: "Hello!",
  },
  {
    question: "What is the purpose of the `return` keyword in a method?",
    options: [
      "To define a new variable",
      "To call another method",
      "To send a value back to where the method was called",
      "To print a message"
    ],
    answer: "To send a value back to where the method was called",
  },
  {
    question: "Which method correctly returns the sum of two `int` values?",
    options: [
      "public static void add(int a, int b) { return a + b; }",
      "public int add(int a, int b) = a + b;",
      "public static int add(int a, int b) { return a + b; }",
      "static void add(int a, int b) -> a + b;"
    ],
    answer: "public static int add(int a, int b) { return a + b; }",
  },
  {
    question: "What is method overloading?",
    options: [
      "Calling the same method many times",
      "Using a method inside another method",
      "Writing multiple methods with the same name but different parameters",
      "Using too many parameters in one method"
    ],
    answer: "Writing multiple methods with the same name but different parameters",
  },
  {
    question: "Which pair of methods are valid overloads of each other?",
    options: [
      "void print(String s) and void print(String s)",
      "void print(String s) and int print(String s)",
      "void print(String s) and void print(int n)",
      "void print() and void print()"
    ],
    answer: "void print(String s) and void print(int n)",
  },
  {
    question: "What is the scope of a variable declared inside a method?",
    options: [
      "It can be used anywhere in the program",
      "It can only be used in other methods",
      "It exists as long as the program is running",
      "It can only be used inside that method"
    ],
    answer: "It can only be used inside that method",
  },
  {
    question: "Which of the following would cause a scope error?",
    options: [
      "Declaring a variable inside `main` and using it in another method",
      "Using a variable before declaring it",
      "Declaring two variables with the same name in different methods",
      "Returning a value from a method"
    ],
    answer: "Declaring a variable inside `main` and using it in another method",
  },
];





export default function MethodsQuiz() {
  // This lesson has 30 points
  const lessonPoints = 30;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
      <Quiz title="Methods Quiz" questions={questions} />
        <br/>
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
          </div>
          </div>
          </LessonLayout>
  );
} 