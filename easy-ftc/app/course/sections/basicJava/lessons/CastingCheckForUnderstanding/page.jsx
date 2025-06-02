import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Quiz from "@/components/quiz";

export const metadata = {
  title: "Casting Check For Understanding | EasyFTC",
};

const questions = [
  {
    question: "What is the result of the expression? ```java\n(int) 5.9 + 2\n```",
    options: ["7.9", "7", "6.9", "6"],
    answer: "7",
  },
  {
    question: "What is the result of the expression? ```java\n(double) 5 / 2\n```",
    options: ["2", "2.5", "2.0", "Compile-time error"],
    answer: "2.5",
  },
  {
    question: "What is the result of the expression? ```java\n(int) (3.7 + 4.6)\n```",
    options: ["8.3", "8", "7", "Compile-time error"],
    answer: "8",
  },
  {
    question: "What is the result of the expression? ```java\n(float) 9 / 4\n```",
    options: ["2.25", "2.0", "2.25f", "2"],
    answer: "2.25",
  },
];



export default function CastingCheckForUnderstanding() {
  // This lesson has 9 points
  const lessonPoints = 9;
  
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