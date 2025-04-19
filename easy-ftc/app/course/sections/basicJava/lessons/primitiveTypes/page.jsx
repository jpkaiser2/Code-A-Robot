import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";

export const metadata = {
  title: "Primitive Types | EasyFTC",
};

export default function primitiveTypes() {
  // This lesson has 3 points (fourth lesson)
  const lessonPoints = 3;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <p>
          --Lesson content here--
        </p>
        
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
} 