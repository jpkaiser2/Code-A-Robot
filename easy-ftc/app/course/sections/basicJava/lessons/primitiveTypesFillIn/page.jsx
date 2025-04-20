import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import FillInTheBlank from "@/components/FillInTheBlank";

export const metadata = {
  title: "Primitive Types Practice | EasyFTC",
};

const sentences = [
  {
    text: "In Java, a variable that stores a whole number is called a(n) ____ type.",
    blanks: ["blank0"],
    options: ["int", "double", "boolean", "String", "char"],
    answers: ["int"]
  },
  {
    text: "A ____ is used to store text values in Java and is not a primitive type.",
    blanks: ["blank0"],
    options: ["boolean", "String", "char", "float", "int"],
    answers: ["String"]
  },
  {
    text: "To store a decimal number with high precision, we use ____, while for a true/false value, we use ____.",
    blanks: ["blank0", "blank1"],
    options: ["int", "double", "boolean", "String", "char", "float"],
    answers: ["double", "boolean"]
  },
  {
    text: "When naming variables in Java, we typically use ____ case, where the first word starts with lowercase and each new word starts with uppercase.",
    blanks: ["blank0"],
    options: ["arch", "camel", "pascal", "Roxy", "upper"],
    answers: ["camel"]
  },
  {
    text: "In FTC robotics programming, we typically use ____ for whole numbers, ____ for decimal values, and ____ for yes/no conditions.",
    blanks: ["blank0", "blank1", "blank2"],
    options: ["int", "double", "boolean", "String", "char", "float"],
    answers: ["int", "double", "boolean"]
  },
  {
    text: "The process of giving a variable a type and name without assigning a value is called ____. Giving it a value later is called ____.",
    blanks: ["blank0", "blank1"],
    options: ["initialization", "concatenation", "declaration", "assignment", "camel case"],
    answers: ["declaration", "initialization"]
  },
  {
    text: "You can print variables by using System.out.println(). To join text and variable values, we use ____.",
    blanks: ["blank0"],
    options: ["concatenation", "declaration", "camelCase", "parentheses", "semicolons"],
    answers: ["concatenation"]
  }
];


export default function PrimitiveTypesFillIn() {
  // This lesson has 4 points (matches the primitiveTypes lesson)
  const lessonPoints = 4;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1 className="text-3xl font-bold mb-6">Primitive Types Practice</h1>
        
        <p className="mb-8">
          Let's test your knowledge of Java primitive types! Drag and drop the correct 
          words to complete each sentence about primitive types in Java. Some sentences 
          may have multiple blanks to fill.
        </p>
        
        <FillInTheBlank 
          title="Java Primitive Types" 
          sentences={sentences} 
        />
        
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
} 