import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import FillInTheBlank from "@/components/FillInTheBlank";

export const metadata = {
  title: "Boolean Expressions Practice | EasyFTC",
};

const sentences = [
  {
    text: "A boolean variable in Java can hold a ____ or ____ value.",
    blanks: ["blank0", "blank1"],
    options: ["true", "false", "int", "double", "String", "char"],
    answers: ["true", "false"]
  },
  {
    text: "In Java, the AND operator is written as ____ and the OR operator is written as ____. ",
    blanks: ["blank0", "blank1"],
    options: ["&&", "||", "!", "==", "!=", "++"],
    answers: ["&&", "||"]
  },
  {
    text: "The NOT operator is represented by ____ and it inverts a boolean expression.",
    blanks: ["blank0"],
    options: ["&&", "||", "!", "!=", "=", "=="],
    answers: ["!"]
  },
  {
    text: "DeMorgan’s Law: The negation of (A && B) is equivalent to ____ || ____.",
    blanks: ["blank0", "blank1"],
    options: ["!A", "!B", "A", "B", "!(A && B)", "!(A || B)"],
    answers: ["!A", "!B"]
  },
  {
    text: "DeMorgan’s Law: The negation of (X || Y) is equivalent to ____ && ____.",
    blanks: ["blank0", "blank1"],
    options: ["!X", "!Y", "X", "Y", "!(X && Y)", "!(X || Y)"],
    answers: ["!X", "!Y"]
  },
  {
    text: "When distributing a NOT over a compound expression, you ____ each operator and negate each operand.",
    blanks: ["blank0"],
    options: ["swap", "flip", "distribute", "concatenate", "declare"],
    answers: ["flip"]
  },
  {
    text: "To simplify !(A == B), we can rewrite it as A ____ B.",
    blanks: ["blank0"],
    options: ["!=", "==", "&&", "||", ">=", "<="],
    answers: ["!="]
  }
];



export default function BooleanExpressionsFillIn() {
  const lessonPoints = 12;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1 className="text-3xl font-bold mb-6">Boolean Expressions Practice</h1>
        
        <p className="mb-8">
          Let's test your knowledge of boolean expressions and De Morgan's Laws! Drag and drop the correct 
          words to complete each sentence. Some sentences 
          may have multiple blanks to fill.
        </p>
        
        <FillInTheBlank 
          title="Boolean Expressions and De Morgan's Laws" 
          sentences={sentences} 
        />
        
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
} 