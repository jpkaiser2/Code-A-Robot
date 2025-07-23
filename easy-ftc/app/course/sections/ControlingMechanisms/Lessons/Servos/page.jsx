import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const metadata = {
  title: "Servos | EasyFTC",
};

export default function Servos() {
  // This lesson has 61 points
  const lessonPoints = 61;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Servos</h1>
        <p>
          By the end of this lesson, you'll be able to:
        </p>
        <ul className="my-4">
          <li>Add a servo to your configuration file</li>
          <li>Set servo positions in your OpMode</li>
          <li>Use the gamepad to control the servo</li>
          <li>Limit servo range and reverse direction</li>
        </ul>

        <br />
        <h2>What is a Servo?</h2>
        <p>
          A servo is a motor that moves to a specific position, typically between 0.0 and 1.0. Servos are useful for tasks that need precise positioning, such as opening and closing a claw or rotating an arm.
        </p>

        <br />
        <h2>Adding a Servo to Your Configuration</h2>
        <p>To add a servo using the Driver Station:</p>
        <ul className="my-4">
          <li>Open the Robot Controller app.</li>
          <li>Tap the 3 dots &gt; Edit active configuration.</li>
          <li>Tap on "Expansion Hub" or "Control Hub" &gt; "Servos".</li>
          <li>On an available port (e.g. 0), select "Servo".</li>
          <li>Name it something descriptive, like <strong>claw</strong>.</li>
          <li>Tap Done several times and Save.</li>
          <li>Tap Activate.</li>
        </ul>
        <p>Now your robot knows the servo is connected.</p>

        <br />
        <h2>Hardware Mapping the Servo</h2>
        <p>To use a servo in code, you first need to map it using the hardwareMap.</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`Servo claw;

@Override
public void init() {
    claw = hardwareMap.get(Servo.class, "claw");
}`}
          </SyntaxHighlighter>
        </div>
        <p>This line connects your code variable <strong>claw</strong> to the physical servo configured with the name <strong>claw</strong>.</p>

        <br />
        <h2>Setting Servo Positions</h2>
        <p>Servos are controlled by setting a position between 0.0 (minimum) and 1.0 (maximum).</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`claw.setPosition(1.0); // fully open
claw.setPosition(0.0); // fully closed`}
          </SyntaxHighlighter>
        </div>
        <p>You can also use a variable to control the position.</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`double clawPosition = 0.5;
claw.setPosition(clawPosition);`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Using the Gamepad to Control the Servo</h2>
        <p>You can map gamepad buttons to change the servo position.</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`@Override
public void loop() {
    if (gamepad1.a) {
        claw.setPosition(1.0); // open
    } else if (gamepad1.b) {
        claw.setPosition(0.0); // close
    }
}`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Reversing and Scaling the Range</h2>
        <p>
          Sometimes your servo moves the wrong way or you want to limit its movement. You can use:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`claw.setDirection(Servo.Direction.REVERSE);
claw.scaleRange(0.3, 0.8);`}
          </SyntaxHighlighter>
        </div>
        <p>
          This reverses the direction and limits movement between 0.3 and 0.8.<br />
          Use this in <code>init()</code> after hardware mapping the servo.
        </p>

        <br />
        <h2>Full Example</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`@TeleOp
public class ClawOpMode extends OpMode {
    Servo claw;

    @Override
    public void init() {
        claw = hardwareMap.get(Servo.class, "claw");
        claw.setDirection(Servo.Direction.REVERSE);
        claw.scaleRange(0.3, 0.8);
    }

    @Override
    public void loop() {
        if (gamepad1.a) {
            claw.setPosition(1.0);
        } else if (gamepad1.b) {
            claw.setPosition(0.0);
        }
    }
}`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Example: 2-Servo Claw</h2>
        <p>Some robots use two servos that move in opposite directions to open and close a claw.</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`@TeleOp
public class DualServoClawOpMode extends OpMode {
    Servo leftClaw, rightClaw;

    @Override
    public void init() {
        leftClaw = hardwareMap.get(Servo.class, "left_claw");
        rightClaw = hardwareMap.get(Servo.class, "right_claw");

        leftClaw.setDirection(Servo.Direction.FORWARD);
        rightClaw.setDirection(Servo.Direction.REVERSE);
    }

    @Override
    public void loop() {
        if (gamepad1.a) {
            leftClaw.setPosition(1.0);
            rightClaw.setPosition(1.0);
        } else if (gamepad1.b) {
            leftClaw.setPosition(0.0);
            rightClaw.setPosition(0.0);
        }
    }
}`}
          </SyntaxHighlighter>
        </div>
        <p>This keeps the two servos moving in mirrored directions when opening and closing the claw.</p>

        <br />
        <h2>Recap</h2>
        <ul className="my-4">
          <li>A servo moves to a position from 0.0 to 1.0.</li>
          <li>Use <code>hardwareMap.get(Servo.class, name)</code> to map it.</li>
          <li>Set position using <code>setPosition()</code>.</li>
          <li>Gamepad buttons can be used to control it.</li>
          <li>Use <code>setDirection()</code> and <code>scaleRange()</code> to customize movement.</li>
          <li>For dual-servo claws, reverse one servo's direction to mirror motion.</li>
        </ul>
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
