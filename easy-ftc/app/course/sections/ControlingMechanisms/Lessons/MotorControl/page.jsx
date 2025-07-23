import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const metadata = {
  title: "Motor Control | EasyFTC",
};

export default function MotorControl() {
  // This lesson has 59 points
  const lessonPoints = 59;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Motor Control</h1>
        <p>
          Now that you've learned how to hardware map motors, it's time to learn how to control them in your OpModes. Motors are the primary way robots move, whether it's driving, lifting an arm, or spinning an intake. Learning to control motors is essential for any FTC robot.
        </p>
        <ul className="my-4">
          <li>Set power to a motor using <code>setPower()</code></li>
          <li>Use gamepad input to control motors interactively</li>
          <li>Stop motors and configure their behavior when stopped</li>
          <li>Reverse motor direction in code</li>
          <li>Coordinate multiple motors for drivetrains or mechanisms</li>
          <li>Use arcade drive for smooth control</li>
        </ul>

        <br />
        <h2>Setting Power to a Motor</h2>
        <p>
          To make a motor move, you call the <code>setPower()</code> method and pass in a number between -1.0 and 1.0. Positive values usually make the motor spin forward, and negative values spin it in reverse.
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`motor.setPower(1.0);   // Full speed forward
motor.setPower(0.0);   // Stop
motor.setPower(-0.5);  // Half speed reverse`}
          </SyntaxHighlighter>
        </div>
        <p>
          The number you pass in is a percentage of full power. 1.0 = 100%, 0.5 = 50%, and so on. Values outside this range will be clipped automatically.<br />
          <span role="img" aria-label="lightbulb">💡</span> <strong>Keep in mind:</strong> setting motor power does not control position. It simply tells the motor how fast (and in which direction) to spin.
        </p>

        <br />
        <h2>Using Gamepad Input to Control Motor</h2>
        <p>
          In TeleOp, you can read values from the gamepad joysticks and use them to control the motor in real time. For example, to control a motor using the left stick's y-axis:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public void loop() {
    double power = -gamepad1.left_stick_y;  // Invert so pushing forward is positive
    motor.setPower(power);
}`}
          </SyntaxHighlighter>
        </div>
        <p>
          <strong>Why the negative sign?</strong> In the FTC SDK, pushing the stick forward returns a negative value. We flip it so pushing forward gives positive power.
        </p>
        <p>
          You can also map buttons to actions. For example:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`if (gamepad1.a) {
    motor.setPower(1.0);
} else {
    motor.setPower(0.0);
}`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Stopping the Motor</h2>
        <p>
          To stop a motor, simply set its power to zero:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`motor.setPower(0);`}
          </SyntaxHighlighter>
        </div>
        <p>
          This cuts power immediately. If the motor is set to <code>BRAKE</code> mode, it will hold its position. If it's set to <code>FLOAT</code>, it will coast to a stop (more on this later).
        </p>

        <br />
        <h2>Motor Direction</h2>
        <p>
          If a motor spins the wrong way, you can reverse it in code using:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`motor.setDirection(DcMotor.Direction.REVERSE);`}
          </SyntaxHighlighter>
        </div>
        <p>
          This reverses the meaning of positive/negative power. You typically do this once in <code>init()</code> or your hardware class. You can also reverse motor direction using the configuration file.<br />
          <strong>Be consistent:</strong> it's common to reverse one motor on a drivetrain (e.g., left side) to ensure both sides spin forward together.
        </p>

        <br />
        <h2>Zero Power Behavior</h2>
        <p>
          When power is set to 0, a motor can either brake (actively resist motion) or float (spin freely). You configure this with:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`motor.setZeroPowerBehavior(DcMotor.ZeroPowerBehavior.BRAKE);`}
          </SyntaxHighlighter>
        </div>
        <p>
          <strong>Options:</strong>
        </p>
        <ul className="my-4">
          <li><strong>BRAKE:</strong> Resists motion. Useful when you want arms or drivetrains to hold position.</li>
          <li><strong>FLOAT:</strong> Coasts to a stop. Useful for smoother stopping or when resistance isn't needed.</li>
        </ul>
        <p>
          Set this once during <code>init()</code> based on what behavior you want when stopping.
        </p>

        <br />
        <h2>Controlling Multiple Motors</h2>
        <p>
          Robots often use more than one motor to move. A simple two-motor drivetrain might look like this:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`leftMotor.setPower(power);
rightMotor.setPower(power);`}
          </SyntaxHighlighter>
        </div>
        <p>
          To allow turning, use the x-axis of the joystick too:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`double drive = -gamepad1.left_stick_y;
double turn = gamepad1.left_stick_x;

leftMotor.setPower(drive + turn);
rightMotor.setPower(drive - turn);`}
          </SyntaxHighlighter>
        </div>
        <p>
          This is called <strong>arcade drive</strong> and gives you forward/backward and turning control using one stick.<br />
          Always test and reverse motors as needed so they move together correctly.
        </p>

        <br />
        <h2>Recap</h2>
        <ul className="my-4">
          <li>Use <code>setPower()</code> to control motor speed and direction.</li>
          <li>Read joystick input from the gamepad to control motors interactively.</li>
          <li>Use <code>setDirection()</code> to reverse motor direction if needed.</li>
          <li>Use <code>setZeroPowerBehavior()</code> to choose between <code>BRAKE</code> and <code>FLOAT</code> when stopping.</li>
          <li>Coordinate multiple motors for drivetrains or mechanisms.</li>
          <li>Use arcade drive (<code>drive + turn</code>) for smoother control.</li>
        </ul>
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
