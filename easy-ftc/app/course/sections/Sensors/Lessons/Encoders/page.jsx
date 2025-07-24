import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const metadata = {
  title: "Encoders & Measuring Distance | EasyFTC",
};

export default function EncodersLesson() {
  const lessonPoints = 64; // Points required to unlock this lesson

  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Encoders & Measuring Distance</h1>

        <p>
          In this lesson, you'll learn how to use motor encoders to measure how far your robot moves. This is essential for autonomous movement, consistent positioning, and precise control.
        </p>

        <h2>What Is an Encoder?</h2>
        <p>
          An encoder is a sensor built into most DC motors used in FTC. It tracks how much the motor shaft has turned.
          Encoders count in ticks, which represent very small rotations of the shaft. For example, a REV HD Hex Motor with a 40:1 gearbox has 1120 ticks per revolution.
        </p>

        <h2>Why Use Encoders?</h2>
        <ul className="my-4">
          <li>Move your robot a specific distance</li>
          <li>Rotate to a certain angle</li>
          <li>Slow down as you approach a target</li>
          <li>Know how far you've already moved</li>
        </ul>
        <p>
          Without encoders, you're just hoping your robot went the right distance. With encoders, you can know.
        </p>

        <h2>Getting Encoder Values in Code</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int ticks = motor.getCurrentPosition();`}
          </SyntaxHighlighter>
        </div>
        <p>This tells you how many encoder ticks have passed since the motor was last reset.</p>

        <p>You can reset it using:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`motor.setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);
motor.setMode(DcMotor.RunMode.RUN_USING_ENCODER);`}
          </SyntaxHighlighter>
        </div>

        <h2>Measuring Rotations and Distance</h2>
        <p>You can calculate rotations from ticks like this:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`double rotations = motor.getCurrentPosition() / TICKS_PER_ROTATION;`}
          </SyntaxHighlighter>
        </div>

        <p>And convert rotations to distance in inches or centimeters using wheel circumference:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`double inches = rotations * (Math.PI * WHEEL_DIAMETER_INCHES);`}
          </SyntaxHighlighter>
        </div>

        <h2>Using Encoders in OpModes</h2>
        <p>Here's a simple OpMode that reads encoder values and shows rotations:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class EncoderTestOpMode extends OpMode {
    DcMotor motor;
    final double TICKS_PER_ROTATION = 1120.0;

    @Override
    public void init() {
        motor = hardwareMap.get(DcMotor.class, "motor");
        motor.setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);
        motor.setMode(DcMotor.RunMode.RUN_USING_ENCODER);
    }

    @Override
    public void loop() {
        motor.setPower(0.5);
        double rotations = motor.getCurrentPosition() / TICKS_PER_ROTATION;
        telemetry.addData("Rotations", rotations);
    }
}`}
          </SyntaxHighlighter>
        </div>

        <h2>Run Modes: RUN_TO_POSITION vs. RUN_USING_ENCODER</h2>
        <h3>RUN_TO_POSITION</h3>
        <p>
          The motor automatically moves to a target encoder tick value and stops:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`motor.setTargetPosition(1120);
motor.setMode(DcMotor.RunMode.RUN_TO_POSITION);
motor.setPower(0.5);`}
          </SyntaxHighlighter>
        </div>
        <ul className="my-4">
          <li>✅ Easy to use</li>
          <li>✅ Stops automatically</li>
          <li>❌ Can be jerky or imprecise in drivetrains</li>
          <li>❌ Not ideal for coordinated smooth movement</li>
        </ul>
        <p>Use this mode for simple arms or linear slides.</p>

        <h3>RUN_USING_ENCODER</h3>
        <p>
          The motor runs normally, but you manually check encoder values and stop it when you choose:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`motor.setMode(DcMotor.RunMode.RUN_USING_ENCODER);
motor.setPower(0.5);

if (motor.getCurrentPosition() >= 1120) {
    motor.setPower(0);
}`}
          </SyntaxHighlighter>
        </div>
        <ul className="my-4">
          <li>✅ More control and flexibility</li>
          <li>✅ Smooth for drivetrains</li>
          <li>❌ Requires more coding</li>
        </ul>
        <p>Use this mode for precise drivetrain control and custom autonomous paths.</p>

        <h2>Using Encoders in Autonomous</h2>
        <p>To move a set distance, you can set a target and let the motor run to it:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`motor.setTargetPosition(1120);
motor.setMode(DcMotor.RunMode.RUN_TO_POSITION);
motor.setPower(0.5);`}
          </SyntaxHighlighter>
        </div>
        <p>This approach is simple but works best for linear mechanisms or basic movements.</p>

        <h2>Tips</h2>
        <ul className="my-4">
          <li>Always reset encoders before each movement</li>
          <li>Use RUN_USING_ENCODER for closed-loop control</li>
          <li>Use RUN_TO_POSITION for simple distance-based movement</li>
          <li>Don't mix run modes on drivetrain motors</li>
        </ul>

        <h2>Recap</h2>
        <ul className="my-4">
          <li>Encoders measure motor shaft rotation in ticks</li>
          <li>Ticks can be converted into rotations or distance</li>
          <li>RUN_TO_POSITION moves to a goal and stops</li>
          <li>RUN_USING_ENCODER gives you live feedback and manual control</li>
          <li>Pick the mode based on your needs: simple vs. flexible</li>
        </ul>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
