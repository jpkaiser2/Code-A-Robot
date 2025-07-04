import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import FillInTheBlank from "@/components/FillInTheBlank";

export const metadata = {
  title: "Getters Setters Fill in The Blanks | EasyFTC",
};

const sentences = [
  {
    text: "In Java, instance variables are usually marked as ____ to prevent direct access from other classes.",
    blanks: ["blank0"],
    options: ["public", "private", "protected", "static", "final"],
    answers: ["private"]
  },
  {
    text: "A method that allows you to read a private variable is called a ____.",
    blanks: ["blank0"],
    options: ["setter", "getter", "constructor", "initializer", "modifier"],
    answers: ["getter"]
  },
  {
    text: "A method that lets you update a private variable is called a ____.",
    blanks: ["blank0"],
    options: ["getter", "setter", "main method", "reader", "accessor"],
    answers: ["setter"]
  },
  {
    text: "The standard name for a getter method for a variable named 'speed' is ____.",
    blanks: ["blank0"],
    options: ["setSpeed()", "getSpeed()", "Speed()", "readSpeed()", "accessSpeed()"],
    answers: ["getSpeed()"]
  },
  {
    text: "The standard name for a setter method for a variable named 'speed' is ____.",
    blanks: ["blank0"],
    options: ["getSpeed()", "updateSpeed()", "speed()", "setSpeed()", "defineSpeed()"],
    answers: ["setSpeed()"]
  },
  {
    text: "Encapsulation is the concept of keeping fields private and using ____ to access and change them.",
    blanks: ["blank0"],
    options: ["constructors", "interfaces", "getters and setters", "public fields", "inheritance"],
    answers: ["getters and setters"]
  },
  {
    text: "In a setter, you can add extra code like ____ to make sure the new value is valid.",
    blanks: ["blank0"],
    options: ["loops", "comments", "constructors", "validation", "imports"],
    answers: ["validation"]
  }
];





export default function GettersSettersFillIn() {
  const lessonPoints = 38;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1 className="text-3xl font-bold mb-6">Getters & Setters Practice</h1>
        
        <p className="mb-8">Drag and drop the correct words to complete each sentence. Some sentences may have multiple blanks to fill.</p>
        
        <FillInTheBlank 
          title="Getters & Setters" 
          sentences={sentences} 
        />
        
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
} 