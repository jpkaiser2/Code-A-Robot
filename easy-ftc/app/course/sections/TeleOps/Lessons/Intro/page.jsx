import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";

export const metadata = {
  title: "Common TeleOp Programs | EasyFTC",
};

export default function CommonTeleOpPrograms() {
  const lessonPoints = 83;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Common TeleOp Programs</h1>

        <p>
          In this section, you’ll find a collection of example TeleOp programs that are commonly used in FTC robotics. 
          Each example includes an explanation of how it works and why you might use it.
        </p>

        <p>
          These programs are designed as a reference. You can copy them, adapt them, 
          or simply study them to better understand TeleOp programming techniques. 
          While you are not required to complete quizzes or practice activities here, 
          it is highly recommended that you look through these examples. 
        </p>

        <p>
          They can give you ideas, help you troubleshoot your own code, and speed up your programming process during the season.
        </p>

        <p>
          Think of this as your <strong>toolbox</strong> for TeleOp. Whenever you need a working example of a certain feature, 
          you can come back here and find it.
        </p>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
