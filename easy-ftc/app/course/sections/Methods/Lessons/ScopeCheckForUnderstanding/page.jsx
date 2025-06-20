import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Quiz from "@/components/quiz";

export const metadata = {
  title: "Scope Check For Understanding | EasyFTC",
};

const questions = [
  {
    question: "What is the scope of a variable?",
    options: [
      "The type of data the variable holds",
      "The part of the program where the variable can be accessed",
      "The number of times a variable is used",
      "How fast the variable is processed"
    ],
    answer: "The part of the program where the variable can be accessed"
  },
  {
    question: "What will this code do?\n```java\npublic class ScopeExample {\n    public static void main(String[] args) {\n        int x = 10;\n        if (x > 5) {\n            int y = 20;\n            System.out.println(x + y);\n        }\n        // System.out.println(y); // line A\n    }\n}```",
    options: [
      "30",
      "Error at line A because `y` is out of scope",
      "20",
      "10"
    ],
    answer: "Error at line A because `y` is out of scope"
  },
  {
    question: "Which of the following best describes method overloading?",
    options: [
      "Using a loop inside a method",
      "Calling a method from another class",
      "Defining multiple methods with the same name but different parameters",
      "Defining a method inside another method"
    ],
    answer: "Defining multiple methods with the same name but different parameters"
  },
  {
    question: "What will this code print?\n```java\npublic class OverloadTest {\n    public static void greet() {\n        System.out.println(\"Hello!\");\n    }\n\n    public static void greet(String name) {\n        System.out.println(\"Hello, \" + name + \"!\");\n    }\n\n    public static void main(String[] args) {\n        greet();\n        greet(\"Jordan\");\n    }\n}```",
    options: [
      "Error: method greet is defined twice",
      "Hello!\nHello, Jordan!",
      "Hello, Jordan!\nHello!",
      "Hello, Jordan!\nHello, Jordan!"
    ],
    answer: "Hello!\nHello, Jordan!"
  },
  {
    question: "Which of the following is a valid overloaded method of `printInfo()`?",
    options: [
      "public void printInfo()",
      "public void printInfo(String name)",
      "public int printInfo()",
      "All of the above"
    ],
    answer: "All of the above"
  },
  {
    question: "Fill in the blank: A variable declared inside a method is called a ____ variable, and it can only be used ____ the method.",
    options: [
      "global and after",
      "class and before",
      "local and inside",
      "static and outside"
    ],
    answer: "local and inside"
  },
  {
    question: "Which method call would match this method definition?\n```java\npublic void move(int speed, double distance)\n```",
    options: [
      "move(10.0, 5)",
      "move(10, 5.0)",
      "move(10, \"5\")",
      "move(\"fast\", 10.5)"
    ],
    answer: "move(10, 5.0)"
  }
];




export default function ScopeCheckForUnderstanding() {
  // This lesson has 29 points
  const lessonPoints = 29;
  
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