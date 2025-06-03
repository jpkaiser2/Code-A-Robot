import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const metadata = {
  title: "Boolean Expressions | EasyFTC",
};

export default function Scanner() {
  // This lesson has 11 points
  const lessonPoints = 11;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Boolean Expressions & DeMorgan's Laws</h1>
        
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
