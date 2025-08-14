import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import ConfettiEffect from "@/components/ConfettiEffect";

export const metadata = {
  title: "Conclusion and Next Steps | EasyFTC",
};

export default function ConclusionNextSteps() {
  // This lesson has 87 points
  const lessonPoints = 87;

  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <ConfettiEffect />
      <div>
        <h1>Conclusion and Next Steps</h1>

        <p>🎉 <strong>Congratulations!</strong> You have reached the end of this course.</p>
        <p>Over the past lessons, you have learned how to:</p>
        <ul className="my-4">
          <li>Understand the basics of Java programming</li>
          <li>Write and run OpModes for FTC robots</li>
          <li>Map hardware and control it in TeleOp</li>
          <li>Create autonomous programs using timers, encoders, and Road Runner</li>
          <li>Use sensors for feedback and precision</li>
          <li>Build complete, functional robot code from start to finish</li>
        </ul>

        <p>
          This is a significant achievement. You have progressed from learning fundamental Java concepts to programming real, competition-ready FTC robots.
        </p>

        <br />
        <h2>Continuing Your Learning</h2>
        <p>
          Programming is a skill that continues to grow with practice. Now that you have mastered the essentials, you may wish to explore:
        </p>
        <ul className="my-4">
          <li>Advanced FTC Features such as PID control, asynchronous programming, and sensor fusion</li>
          <li>Custom Libraries for reusable code and streamlined development</li>
          <li>Open-Source Code from other FTC teams to learn new techniques</li>
          <li>Competition Strategies for improving speed, reliability, and consistency</li>
        </ul>

        <br />
        <h2>Suggested Challenges</h2>
        <ul className="my-4">
          <li>Write a full autonomous routine that scores during the first 30 seconds and incorporates multiple sensors</li>
          <li>Create a TeleOp program that operates multiple mechanisms such as a drivetrain, arm, claw, and intake</li>
          <li>Experiment with Road Runner by building custom actions for your own mechanisms</li>
          <li>Test and refine your code to increase performance and reliability</li>
        </ul>

        <br />
        <h2>Final Remarks</h2>
        <p>
          Programming is not about producing flawless code on the first attempt.
          It is about thinking logically, solving problems, and learning through iteration.
        </p>
        <p>
          You now possess the knowledge to transform your robot ideas into reality. Continue to experiment, build, and maintain a mindset of curiosity and persistence.
        </p>
        <p>
          Your journey as an FTC programmer is just beginning, and there is no limit to what you can create.
        </p>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
