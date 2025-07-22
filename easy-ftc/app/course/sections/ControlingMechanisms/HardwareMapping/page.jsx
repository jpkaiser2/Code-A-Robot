import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const metadata = {
  title: "Hardware Mapping | EasyFTC",
};

export default function HardwareMapping() {
  // This lesson has 58 points
  const lessonPoints = 58;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Hardware Mapping</h1>
        <p>
          By the end of this lesson, you'll be able to:
        </p>
        <ul className="my-4">
          <li>Understand what hardware mapping is and why it's needed</li>
          <li>Declare and initialize hardware devices using <code>hardwareMap</code></li>
          <li>Structure your code using <code>init()</code> methods for better organization and reuse</li>
        </ul>

        <br />
        <h2>What Is Hardware Mapping?</h2>
        <p>
          When you build an FTC robot, you connect motors, servos, and sensors to the Control Hub or Expansion Hub. But your Java code doesn’t automatically know what’s connected where.<br />
          <strong>Hardware mapping</strong> is the process of telling your code which device name refers to which physical component on your robot.
        </p>

        <br />
        <h2>Configuration Name</h2>
        <p>
          Every piece of hardware in the FTC robot configuration (on the Robot Controller app) is given a name. For example, you might create a configuration with:
        </p>
        <ul className="my-4">
          <li>Motor on port 0 named <code>"left_drive"</code></li>
          <li>Servo on port 1 named <code>"claw_servo"</code></li>
        </ul>
        <p>
          These names must match exactly in your code or the app will crash.
        </p>

        <br />
        <h2>How to Hardware Map Using the Robot Controller App</h2>
        <ol className="my-4 list-decimal list-inside">
          <li>Open the Robot Controller App on your Control Hub or Robot Controller phone.</li>
          <li>Tap the three-dot menu (︙) in the upper right corner.</li>
          <li>Select <strong>Configure Robot</strong>.</li>
          <li>Tap <strong>New Configuration</strong>.</li>
          <li>Select the type of hub you're using (e.g., Control Hub, Expansion Hub).</li>
          <li>Tap on each port (0–3 for motors, etc.) and assign the correct device type (<code>DcMotor</code>, <code>Servo</code>, etc.).</li>
          <li>Give each device a unique and meaningful name, like <code>"left_drive"</code>, <code>"claw_servo"</code>, or <code>"arm_motor"</code>.</li>
          <li>When you're done, tap <strong>Save</strong>, and give your configuration a name like <code>"CompetitionBot"</code>.</li>
          <li>Tap <strong>Activate</strong> to use this configuration.</li>
        </ol>
        <p>
          <span role="img" aria-label="pin">📌</span> These names are what you’ll use in your Java code when calling <code>hardwareMap.get()</code>.
        </p>

        <br />
        <h2>Using <code>hardwareMap</code> in Code</h2>
        <p>
          In your OpMode or mechanism class, you use <code>hardwareMap.get()</code> to get access to the physical hardware. Here's how it works:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`DcMotor leftDrive;
Servo claw;

@Override
public void init() {
    leftDrive = hardwareMap.get(DcMotor.class, "left_drive");
    claw = hardwareMap.get(Servo.class, "claw_servo");
}`}
          </SyntaxHighlighter>
        </div>
        <p>
          The <code>hardwareMap.get()</code> function takes the type of hardware and the string name from the robot configuration.
        </p>

        <br />
        <h2>Creating a Mechanism Class (Optional but Recommended)</h2>
        <p>
          Instead of cluttering your OpMode with all the hardware declarations, you can organize them into a separate class. For example:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class Drivetrain {
    DcMotor leftDrive;
    DcMotor rightDrive;

    public void init(HardwareMap hwMap) {
        leftDrive = hwMap.get(DcMotor.class, "left_drive");
        rightDrive = hwMap.get(DcMotor.class, "right_drive");
    }

    public void setPower(double power) {
        leftDrive.setPower(power);
        rightDrive.setPower(power);
    }
}`}
          </SyntaxHighlighter>
        </div>
        <p>
          Then in your OpMode:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`Drivetrain drive = new Drivetrain();

@Override
public void init() {
    drive.init(hardwareMap);
}

@Override
public void loop() {
    drive.setPower(0.5); // Usage of drivetrain
}`}
          </SyntaxHighlighter>
        </div>
        <p>
          This structure keeps your code clean and reusable.
        </p>

        <br />
        <h2>Best Practices</h2>
        <ul className="my-4">
          <li>Always check for typos in your configuration names.</li>
          <li>Use descriptive names like <code>"arm_motor"</code> instead of just <code>"motor"</code>.</li>
          <li>Group related hardware into mechanism classes (like Drivetrain, Arm, etc.)</li>
          <li>Use comments to explain what hardware each variable connects to if it’s not obvious.</li>
        </ul>

        <br />
        <h2>Recap</h2>
        <ul className="my-4">
          <li>Every piece of robot hardware needs to be "mapped" in your code using the <code>hardwareMap.get()</code> method.</li>
          <li>The string name you use in code must match exactly with the name used in the Robot Controller configuration.</li>
          <li>Grouping hardware access inside <code>init()</code> methods and using custom mechanism classes makes your code easier to manage.</li>
          <li>Good naming and organization will help you debug and extend your code more easily throughout the season.</li>
        </ul>
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
