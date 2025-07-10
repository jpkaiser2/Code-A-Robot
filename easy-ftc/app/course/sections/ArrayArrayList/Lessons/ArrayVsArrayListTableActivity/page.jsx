import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { ArrayVsArrayListTableActivity } from "./TableActivity";

export const metadata = {
  title: "Array vs. ArrayList Table Activity | EasyFTC",
};

export default function ArrayVsArrayListTableActivityPage() {
  const lessonPoints = 48;
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <ArrayVsArrayListTableActivity />
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
} 