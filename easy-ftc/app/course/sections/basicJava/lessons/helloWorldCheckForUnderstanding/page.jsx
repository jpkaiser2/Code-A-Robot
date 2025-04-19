import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Quiz from "@/components/quiz";

export const metadata = {
  title: "Hello World Check For Understanding | EasyFTC",
};

const questions = [
  {
    question: "What is the first thing Java looks for when running a program?",
    options: ["A System", "System.out.println()", "A start method", "A main method"],
    answer: "A main method",
  },
  {
    question: "In Java, everything lives inside a ____",
    options: ["Class", "File", "Method", "House"],
    answer: "Class",
  },
  {
    question: "What is the difference between print and println?",
    options: ["print outputs the text and then moves on to the next line; println just outputs the text", "println outputs the system and then moves on to the next line; print just outputs the system", "There is no difference", "println outputs the text and then moves on to the next line; print just outputs the text"],
    answer: "println outputs the text and then moves on to the next line; print just outputs the text",
  },
];

export default function HelloWorldCheckForUnderstanding() {
  // This lesson has 2 points (third lesson)
  const lessonPoints = 2;
  
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