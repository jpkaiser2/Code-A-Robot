import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import FillInTheBlank from "@/components/FillInTheBlank";

export const metadata = {
  title: "For Loops Practice | EasyFTC",
};

const sentences = [
  {
    text: "A for loop has three parts: initialization, condition, and ____.",
    blanks: ["blank0"],
    options: ["update", "header", "execution", "stop", "repeat", "method"],
    answers: ["update"]
  },
  {
    text: "The loop condition is checked ____ each time before the loop runs.",
    blanks: ["blank0"],
    options: ["before", "after", "during", "never", "once"],
    answers: ["before"]
  },
  {
    text: "In a typical for loop, the counter is often increased using the ____ operator.",
    blanks: ["blank0"],
    options: ["++", "--", "+=", "-=", "==", "*="],
    answers: ["++"]
  },
  {
    text: "To run a loop 10 times starting at 0, the condition should be ____.",
    blanks: ["blank0"],
    options: ["i < 10", "i <= 10", "i == 10", "i >= 0", "i = 10"],
    answers: ["i < 10"]
  },
  {
    text: "The loop will stop running once the ____ becomes false.",
    blanks: ["blank0"],
    options: ["condition", "update", "header", "counter", "variable"],
    answers: ["condition"]
  },
  {
    text: "A for loop is useful when you know exactly how many times you want to ____ code.",
    blanks: ["blank0"],
    options: ["repeat", "write", "debug", "define", "compile"],
    answers: ["repeat"]
  },
  {
    text: "To count backwards in a for loop, you typically use the ____ operator.",
    blanks: ["blank0"],
    options: ["--", "++", "-=", "+=", "/", "*="],
    answers: ["--"]
  }
];




export default function ForLoopsFillIn() {
  const lessonPoints = 19;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1 className="text-3xl font-bold mb-6">For Loops Practice</h1>
        
        <p className="mb-8">Drag and drop the correct words to complete each sentence. Some sentences may have multiple blanks to fill.</p>
        
        <FillInTheBlank 
          title="For Loops" 
          sentences={sentences} 
        />
        
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
} 