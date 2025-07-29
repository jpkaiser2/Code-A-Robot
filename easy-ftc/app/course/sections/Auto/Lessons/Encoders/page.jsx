import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const metadata = {
  title: "Writing Autonomous with Encoders | EasyFTC",
};

export default function EncoderAutonomous() {
  const lessonPoints = 73;

  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Writing Autonomous with Encoders</h1>

        <p>
          In this lesson, you'll learn how to use motor encoders to precisely move your FTC robot during the autonomous period. Encoders let your robot travel exact distances by counting how far the motors have turned.
        </p>

        <br />
        <h2>What Are Encoders?</h2>
        <p>
          Encoders are built into most FTC motors and measure how far the motor shaft has rotated. Since the wheels are connected to the motors, this helps us calculate how far the robot has moved.
        </p>

        <br />
        <h2>Why Use Encoders?</h2>
        <p>
          Using <code>sleep()</code> or timers is unreliable. Battery levels, friction, and weight affect timing-based movement. Encoders solve this by telling motors to move a specific number of ticks (rotations), making your autonomous routine more consistent.
        </p>

        <br />
        <h2>Motor Modes for Encoders</h2>
        <p>Here are the main modes you'll use:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`motor.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
motor.setMode(DcMotor.RunMode.RUN_USING_ENCODER);
motor.setMode(DcMotor.RunMode.RUN_TO_POSITION);
motor.setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);`}
          </SyntaxHighlighter>
        </div>
        <ul className="my-4">
          <li><strong>STOP_AND_RESET_ENCODER</strong>: Zeroes the motor’s encoder value.</li>
          <li><strong>RUN_TO_POSITION</strong>: Moves to a target encoder position.</li>
          <li><strong>RUN_USING_ENCODER</strong>: Maintains velocity using encoders (for teleop).</li>
        </ul>

        <br />
        <h2>Steps to Use Encoders in Autonomous</h2>
        <ol className="list-decimal ml-6 my-4">
          <li>Reset the encoders</li>
          <li>Set target position (ticks)</li>
          <li>Set mode to <code>RUN_TO_POSITION</code></li>
          <li>Set motor power</li>
          <li>Wait while motors move</li>
        </ol>

        <br />
        <h2>Example: Move Forward 12 Inches</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`@Autonomous(name="Encoder Drive Example")
public class EncoderDriveExample extends LinearOpMode {
    private DcMotor leftDrive, rightDrive;

    static final double COUNTS_PER_MOTOR_REV = 537.6;
    static final double WHEEL_DIAMETER_INCHES = 4.0;
    static final double COUNTS_PER_INCH = COUNTS_PER_MOTOR_REV / (WHEEL_DIAMETER_INCHES * Math.PI);

    @Override
    public void runOpMode() {
        leftDrive = hardwareMap.get(DcMotor.class, "left_drive");
        rightDrive = hardwareMap.get(DcMotor.class, "right_drive");

        leftDrive.setDirection(DcMotor.Direction.REVERSE);

        leftDrive.setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);
        rightDrive.setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);

        leftDrive.setTargetPosition((int)(12 * COUNTS_PER_INCH));
        rightDrive.setTargetPosition((int)(12 * COUNTS_PER_INCH));

        leftDrive.setMode(DcMotor.RunMode.RUN_TO_POSITION);
        rightDrive.setMode(DcMotor.RunMode.RUN_TO_POSITION);

        leftDrive.setPower(0.5);
        rightDrive.setPower(0.5);

        waitForStart();

        while (opModeIsActive() && (leftDrive.isBusy() && rightDrive.isBusy())) {
            telemetry.addData("Left", leftDrive.getCurrentPosition());
            telemetry.addData("Right", rightDrive.getCurrentPosition());
            telemetry.update();
        }

        leftDrive.setPower(0);
        rightDrive.setPower(0);

        leftDrive.setMode(DcMotor.RunMode.RUN_USING_ENCODER);
        rightDrive.setMode(DcMotor.RunMode.RUN_USING_ENCODER);
    }
}`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Tips</h2>
        <ul className="my-4">
          <li><code>RUN_TO_POSITION</code> automatically stops the motor at the target.</li>
          <li>Use <code>setTargetPosition()</code> on all motors in a drivetrain.</li>
          <li>Always <strong>reset encoders</strong> at the beginning of autonomous.</li>
          <li>Use <code>telemetry</code> to debug distances and motor movement.</li>
        </ul>

        <br />
        <h2>Recap</h2>
        <ul className="my-4">
          <li>Encoders measure motor rotation to drive precise distances.</li>
          <li>Use <code>RUN_TO_POSITION</code> to move to a specific location.</li>
          <li>Convert inches to ticks using formulas like <code>COUNTS_PER_INCH</code>.</li>
          <li>Steps: Reset → Set target → Set mode → Set power → Wait.</li>
        </ul>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
