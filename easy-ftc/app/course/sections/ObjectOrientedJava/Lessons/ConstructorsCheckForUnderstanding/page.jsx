import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Quiz from "@/components/quiz";

export const metadata = {
  title: "Constructors Check For Understanding | EasyFTC",
};

const questions = [
  {
    question: "What will this code print?\n```java\npublic class Robot {\n    String name;\n    \n    public Robot(String n) {\n        name = n;\n    }\n\n    public void sayName() {\n        System.out.println(\"My name is \" + name);\n    }\n\n    public static void main(String[] args) {\n        Robot r = new Robot(\"Joe\");\n        r.sayName();\n    }\n}```",
    options: [
      "My name is null",
      "My name is Joe",
      "name",
      "Compilation error"
    ],
    answer: "My name is Joe"
  },
  {
    question: "Which of the following correctly defines a constructor for a class named `Team` that takes a `String teamName`?",
    options: [
      "```java\npublic void Team(String teamName) { name = teamName; }\n```",
      "```java\npublic Team(String teamName) { name = teamName; }\n```",
      "```java\nTeam(String teamName): name(teamName) {}\n```",
      "```java\nvoid constructor(String teamName) { name = teamName; }\n```"
    ],
    answer: "```java\npublic Team(String teamName) { name = teamName; }\n```"
  },
  {
    question: "What is the output of this code?\n```java\npublic class Dog {\n    String breed;\n    \n    public Dog() {\n        breed = \"Labrador\";\n    }\n\n    public static void main(String[] args) {\n        Dog d = new Dog();\n        System.out.println(d.breed);\n    }\n}```",
    options: [
      "null",
      "Labrador",
      "breed",
      "Compilation error"
    ],
    answer: "Labrador"
  },
  {
    question: "What happens if you do NOT define a constructor for your class?",
    options: [
      "Java automatically creates a default constructor",
      "The program won't compile",
      "All instance variables become static",
      "The class must be abstract"
    ],
    answer: "Java automatically creates a default constructor"
  },
  {
    question: "What will be the output of this code?\n```java\npublic class Car {\n    String model;\n    int year;\n\n    public Car(String m, int y) {\n        model = m;\n        year = y;\n    }\n\n    public void printInfo() {\n        System.out.println(model + \" - \" + year);\n    }\n\n    public static void main(String[] args) {\n        Car c = new Car(\"Civic\", 2020);\n        c.printInfo();\n    }\n}```",
    options: [
      "Civic - 2020",
      "model - year",
      "null - 0",
      "Compilation error"
    ],
    answer: "Civic - 2020"
  },
  {
    question: "Why would you use the `this` keyword in a constructor?",
    options: [
      "To create a static variable",
      "To call another method",
      "To differentiate between instance variables and parameters with the same name",
      "To import a class"
    ],
    answer: "To differentiate between instance variables and parameters with the same name"
  },
  {
    question: "What will this code output?\n```java\npublic class Player {\n    String name;\n\n    public Player(String name) {\n        this.name = name;\n    }\n\n    public static void main(String[] args) {\n        Player p = new Player(\"Alex\");\n        System.out.println(p.name);\n    }\n}```",
    options: [
      "null",
      "name",
      "Alex",
      "this.name"
    ],
    answer: "Alex"
  },
  {
    question: "What is the purpose of a constructor in Java?",
    options: [
      "To destroy objects",
      "To initialize an object when it's created",
      "To handle exceptions",
      "To define class variables"
    ],
    answer: "To initialize an object when it's created"
  }
];




export default function ConstructorsCheckForUnderstanding() {
  // This lesson has 34 points
  const lessonPoints = 34;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
      <Quiz title="Constructors Check for Understanding" questions={questions} />
        <br/>
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
          </div>
          </div>
          </LessonLayout>
  );
} 