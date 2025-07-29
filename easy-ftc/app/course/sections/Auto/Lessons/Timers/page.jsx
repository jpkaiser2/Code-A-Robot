import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const metadata = {
  title: "Writing Autonomous with Timers | EasyFTC",
};

export default function TimerAutonomous() {
  const lessonPoints = 71;

  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Writing Autonomous with Timers</h1>

        <p>In this lesson, you'll learn how to write a basic autonomous program using timers. This approach lets your robot perform a sequence of actions for a set amount of time, without relying on encoders or sensors.</p>

        <h2>Why Use Timers?</h2>
        <p>Using timers is a simple way to control your robot during autonomous when you don't need precise movement. It's especially useful for beginner teams or for quickly testing basic routines.</p>
        <ul className="my-4">
          <li>You tell each motor how long to run at a certain power</li>
          <li>Movements are based on time, not distance</li>
          <li>It's quick to implement but less consistent than using encoders</li>
        </ul>

        <h2>Setting Up a Timer Autonomous</h2>
        <p>To use timers, you need to:</p>
        <ul className="my-4">
          <li>Extend <code>LinearOpMode</code></li>
          <li>Use the <code>ElapsedTime</code> class to track how long things run</li>
          <li>Use <code>sleep()</code> or a loop that waits based on time</li>
        </ul>

        <h2>Example: Drive Forward, Stop, then Turn</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`@Autonomous
public class TimerAuto extends LinearOpMode {
    DcMotor leftDrive, rightDrive;
    ElapsedTime timer = new ElapsedTime();

    @Override
    public void runOpMode() {
        leftDrive = hardwareMap.get(DcMotor.class, "left_drive");
        rightDrive = hardwareMap.get(DcMotor.class, "right_drive");

        waitForStart();

        // Drive forward for 2 seconds
        leftDrive.setPower(0.5);
        rightDrive.setPower(0.5);
        sleep(2000); // milliseconds

        // Stop
        leftDrive.setPower(0);
        rightDrive.setPower(0);
        sleep(500);

        // Turn right for 1.5 seconds
        leftDrive.setPower(0.5);
        rightDrive.setPower(-0.5);
        sleep(1500);

        // Stop again
        leftDrive.setPower(0);
        rightDrive.setPower(0);
    }
}`}
          </SyntaxHighlighter>
        </div>

        <h2>Tips for Using Timers</h2>
        <ul className="my-4">
          <li>Test your robot's timing on the actual field, as different surfaces and battery levels can change how far it moves</li>
          <li>Use <code>sleep()</code> for simple routines, or <code>ElapsedTime</code> if you want to monitor and do multiple things based on timing</li>
          <li>Always stop your motors after each movement to avoid drifting</li>
        </ul>

        <h2>When Not to Use Timers</h2>
        <ul className="my-4">
          <li>When you need consistent, repeatable movement</li>
          <li>When you need to react to field elements (use sensors instead)</li>
          <li>When precise distances or angles are important (use encoders or the IMU)</li>
        </ul>

        <h2>Recap</h2>
        <ul className="my-4">
          <li>Timers let you create autonomous routines based on how long motors run</li>
          <li>Use <code>sleep()</code> to pause the program for a set time</li>
          <li>Good for testing and simple programs, but less reliable than encoders or sensors</li>
          <li>A great starting point for learning autonomous</li>
        </ul>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
