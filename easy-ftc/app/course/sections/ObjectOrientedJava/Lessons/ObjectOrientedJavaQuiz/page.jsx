import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Quiz from "@/components/quiz";

export const metadata = {
  title: "Object Oriented Java Quiz | EasyFTC",
};

const questions = [
  {
    question: "What does a class represent in Java?",
    options: [
      "An individual object",
      "A blueprint for creating objects",
      "A method inside a program",
      "A file that holds variables"
    ],
    answer: "A blueprint for creating objects"
  },
  {
    question: "Which keyword is used to create a new object in Java?",
    options: ["this", "class", "new", "public"],
    answer: "new"
  },
  {
    question: "What is the purpose of a constructor?",
    options: [
      "To perform calculations",
      "To destroy an object",
      "To initialize a new object",
      "To inherit another class"
    ],
    answer: "To initialize a new object"
  },
  {
    question: "How many constructors can a class have?",
    options: ["Only one", "Only two", "Only one per method", "As many as needed"],
    answer: "As many as needed"
  },
  {
    question: "Which of the following is an example of an instance variable?",
    options: [
      "int x = 5; // inside main method",
      "public int count;",
      "static int total;",
      "int calculateTotal()"
    ],
    answer: "public int count;"
  },
  {
    question: "Where can local variables be accessed?",
    options: [
      "Anywhere in the class",
      "Anywhere in the package",
      "Only inside the method they are declared in",
      "In every method of the class"
    ],
    answer: "Only inside the method they are declared in"
  },
  {
    question: "What is the main difference between static and instance methods?",
    options: [
      "Static methods are slower",
      "Static methods belong to the class, instance methods to the object",
      "Instance methods can’t use parameters",
      "Static methods are private by default"
    ],
    answer: "Static methods belong to the class, instance methods to the object"
  },
  {
    question: "Which method below is a valid static method?",
    options: [
      "public void printMessage()",
      "public static void greet()",
      "static greet()",
      "void static message()"
    ],
    answer: "public static void greet()"
  },
  {
    question: "What does a getter method do?",
    options: [
      "Changes a variable's value",
      "Initializes the object",
      "Returns the value of a private variable",
      "Deletes an object"
    ],
    answer: "Returns the value of a private variable"
  },
  {
    question: "Which of these best demonstrates encapsulation?",
    options: [
      "Using public instance variables",
      "Using private variables with getters and setters",
      "Extending another class",
      "Using static methods"
    ],
    answer: "Using private variables with getters and setters"
  },
  {
    question: "What is the correct signature for a setter method for a variable named 'name'?",
    options: [
      "public String setName()",
      "public void setName(String n)",
      "void name(String setName)",
      "public setName(String name)"
    ],
    answer: "public void setName(String n)"
  },
  {
    question: "Why is encapsulation important in Java?",
    options: [
      "It allows a class to be extended",
      "It makes code run faster",
      "It protects data and controls access",
      "It enables polymorphism"
    ],
    answer: "It protects data and controls access"
  },
  {
    question: "Which keyword is used to inherit a class in Java?",
    options: ["this", "inherit", "extends", "super"],
    answer: "extends"
  },
  {
    question: "If `Dog` extends `Animal`, what can a `Dog` object do?",
    options: [
      "Only use Dog methods",
      "Use both Dog and Animal methods",
      "Only use Animal methods",
      "Only use static methods"
    ],
    answer: "Use both Dog and Animal methods"
  },
  {
    question: "Which of these is true about constructors?",
    options: [
      "They must return a value",
      "They have no return type and match the class name",
      "They can be static",
      "They are inherited by subclasses"
    ],
    answer: "They have no return type and match the class name"
  },
  {
    question: "What happens if no constructor is written in a class?",
    options: [
      "The class cannot be used",
      "Java throws an error",
      "Java provides a default constructor",
      "You must use static methods"
    ],
    answer: "Java provides a default constructor"
  },
  {
    question: "What is `super()` used for?",
    options: [
      "Calling a method from a child class",
      "Calling a static method",
      "Calling the parent class constructor",
      "Returning a value"
    ],
    answer: "Calling the parent class constructor"
  },
  {
    question: "If a method is not static, how do you call it?",
    options: [
      "ClassName.method()",
      "Static.method()",
      "object.method()",
      "call method()"
    ],
    answer: "object.method()"
  },
  {
    question: "What is printed?\n```java\nclass Cat {\n  public void meow() {\n    System.out.println(\"Meow\");\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Cat c = new Cat();\n    c.meow();\n  }\n}\n```",
    options: ["Meow", "meow", "Cat", "Error"],
    answer: "Meow"
  },
  {
    question: "Which of these is a benefit of using inheritance?",
    options: [
      "Makes code longer",
      "Forces private variables",
      "Reuses code from existing classes",
      "Makes variables global"
    ],
    answer: "Reuses code from existing classes"
  }
];





export default function OOPJavaQuiz() {
  // This lesson has 41 points
  const lessonPoints = 41;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
      <Quiz title="Object Oriented Java Quiz" questions={questions} />
        <br/>
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
          </div>
          </div>
          </LessonLayout>
  );
} 