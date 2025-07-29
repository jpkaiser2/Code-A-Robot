import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export const metadata = {
  title: "Intro to Autonomous Period | EasyFTC",
};

export default function IntroToAutonomous() {
  const lessonPoints = 70;

  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Intro to Autonomous Period</h1>

        <p>
          In this lesson, you'll learn what the autonomous period is, why it’s important, and how to begin writing your own autonomous routines in Java. You'll also explore key concepts like starting positions, sensors, and motion planning.
        </p>

        <br />
        <h2>What Is the Autonomous Period?</h2>
        <p>
          The autonomous period is the first 30 seconds of an FTC match, where your robot must operate completely on its own.
        </p>
        <p>Your robot can:</p>
        <ul className="my-4">
          <li>Score points automatically</li>
          <li>Use sensors to detect game elements or field positions</li>
          <li>Navigate the field precisely</li>
          <li>Avoid collisions with partners or field elements</li>
        </ul>
        <p>
          During this time, your robot follows a pre-programmed set of instructions, often reacting to inputs from sensors.
        </p>

        <br />
        <h2>Why It Matters</h2>
        <ul className="my-4">
          <li>A strong autonomous routine can score bonus points that often decide the outcome</li>
          <li>Parking at the end of auto can earn extra points</li>
          <li>Autonomous movement sets your robot up in a good position for teleop</li>
        </ul>
        <p>Teams with consistent, reliable autonomous routines have a huge competitive advantage.</p>

        <br />
        <h2>Autonomous Strategy Basics</h2>
        <p>Before writing code, plan your strategy:</p>
        <ul className="my-4">
          <li><strong>Starting Side:</strong> Red or Blue Alliance?</li>
          <li><strong>Starting Position:</strong> Near the backdrop, center, or wall?</li>
          <li><strong>Scoring Goal:</strong> Detect spike mark, deliver a pixel, or just park?</li>
        </ul>
        <p>Many teams write multiple autonomous routines for different positions and game strategies.</p>

        <br />
        <h2>Writing Autonomous Code</h2>
        <p>
          Autonomous programs extend <code>LinearOpMode</code>, meaning the robot runs instructions step-by-step.
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`@Autonomous(name = "Auto Example", group = "Autonomous")
public class AutoExample extends LinearOpMode {
    DcMotor leftDrive;
    DcMotor rightDrive;

    public void runOpMode() {
        leftDrive = hardwareMap.get(DcMotor.class, "left_drive");
        rightDrive = hardwareMap.get(DcMotor.class, "right_drive");

        waitForStart(); // Wait until the match starts

        // Drive forward
        leftDrive.setPower(0.5);
        rightDrive.setPower(0.5);
        sleep(1000); // move for 1 second
        stopMotors();
    }

    private void stopMotors() {
        leftDrive.setPower(0);
        rightDrive.setPower(0);
    }
}`}
          </SyntaxHighlighter>
        </div>
        <p>💡 <strong>Important:</strong> Nothing moves until <code>waitForStart()</code> is called.</p>

        <br />
        <h2>Common Actions in Autonomous</h2>
        <ul className="my-4">
          <li><strong>Driving Forward / Turning:</strong> Use motor power or encoder feedback</li>
          <li><strong>Detecting Positions:</strong> Use vision (AprilTags, color sensors), distance sensors, or touch</li>
          <li><strong>Running a Sequence:</strong> Move, pause, activate mechanism, move again</li>
          <li><strong>Conditional Branching:</strong> Use <code>if</code> statements to react to sensor input</li>
        </ul>

        <br />
        <h2>Typical Autonomous Routine Flow</h2>
        <ul className="my-4">
          <li><strong>Initialize:</strong> Setup hardware, sensors, and encoders</li>
          <li><strong>Wait for Start:</strong> <code>waitForStart()</code></li>
          <li><strong>Detect:</strong> Use sensors or vision to make decisions</li>
          <li><strong>Move:</strong> Drive or rotate to target locations</li>
          <li><strong>Score:</strong> Drop a pixel, rotate an arm, or activate a servo</li>
          <li><strong>Park:</strong> Move to the parking zone</li>
        </ul>

        <br />
        <h2>Recap</h2>
        <ul className="my-4">
          <li>The autonomous period is the first 30 seconds with no driver input</li>
          <li>Plan your autonomous strategy based on starting side, position, and goals</li>
          <li>Write your auto routine using <code>LinearOpMode</code> step-by-step</li>
          <li>Focus on small wins: drive, detect, score, park</li>
        </ul>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
