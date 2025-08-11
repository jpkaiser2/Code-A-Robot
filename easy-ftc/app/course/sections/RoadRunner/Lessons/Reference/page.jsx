import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";

export const metadata = {
  title: "Road Runner Reference Sheet | EasyFTC",
};

export default function RoadRunnerReferenceGuide() {
  const lessonPoints = 82;

  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Road Runner Reference Sheet</h1>

        <div className="mt-6">
          <p className="mb-4">
            Note: You do not need to memorize everything in Road Runner. This guide is here for quick reference when building your own autonomous routines. If you forget a method or how to structure code, check here or the official docs. Feel free to download and print this!
          </p>

          <div className="w-full h-screen border rounded-lg overflow-hidden">
            <embed
              src="/RoadRunnerCheatSheet.pdf"
              type="application/pdf"
              width="100%"
              height="100%"
              className="border-0"
            />
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
