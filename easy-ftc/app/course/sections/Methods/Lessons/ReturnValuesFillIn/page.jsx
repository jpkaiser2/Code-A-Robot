import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import FillInTheBlank from "@/components/FillInTheBlank";

export const metadata = {
  title: "Return Values Practice | EasyFTC",
};

const sentences = [
  {
    text: "In Java, a method that does not return a value has a return type of ____.",
    blanks: ["blank0"],
    options: ["void", "int", "return", "public", "static"],
    answers: ["void"]
  },
  {
    text: "To return a value from a method, you use the keyword ____ followed by the value you want to send back.",
    blanks: ["blank0"],
    options: ["static", "return", "void", "public", "if"],
    answers: ["return"]
  },
  {
    text: "A method header includes the access modifier, the keyword static, the return type, the method name, and the ____ list.",
    blanks: ["blank0"],
    options: ["parameter", "method", "return", "variable", "print"],
    answers: ["parameter"]
  },
  {
    text: "If a method is supposed to return an int, but it tries to return a String, it will cause a ____.",
    blanks: ["blank0"],
    options: ["compile-time error", "runtime error", "return", "warning", "void"],
    answers: ["compile-time error"]
  },
  {
    text: "You can store the result of a non-void method in a ____ to use it later in your program.",
    blanks: ["blank0"],
    options: ["variable", "method", "parameter", "print", "loop"],
    answers: ["variable"]
  },
  {
    text: "The method header `public static double square(double x)` tells us the method returns a ____.",
    blanks: ["blank0"],
    options: ["double", "void", "String", "int", "boolean"],
    answers: ["double"]
  },
  {
    text: "A method with a return type of `boolean` must return either ____ or ____.",
    blanks: ["blank0", "blank1"],
    options: ["true", "false", "0", "1", "null", "yes"],
    answers: ["true", "false"]
  }
];




export default function ReturnValuesFillIn() {
  const lessonPoints = 26;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1 className="text-3xl font-bold mb-6">Return Values Practice</h1>
        
        <p className="mb-8">Drag and drop the correct words to complete each sentence. Some sentences may have multiple blanks to fill.</p>
        
        <FillInTheBlank 
          title="Return Values" 
          sentences={sentences} 
        />
        
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
} 