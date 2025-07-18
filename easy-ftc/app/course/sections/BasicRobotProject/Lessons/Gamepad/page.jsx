import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';


export const metadata = {
  title: "Using Gamepad Inputs | EasyFTC",
};

export default function UsingGamepadInputs() {
  // This lesson has 56 points
  const lessonPoints = 56;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Using Gamepad Inputs</h1>

        <p>Now that you've written your first OpMode, it's time to learn how to make your robot respond to gamepad input. This is essential for teleop control during matches, and it's how you'll manually control motors, servos, and more.</p>

        <br />
        <h2>Goals</h2>
        <p>By the end of this lesson, you'll be able to:</p>
        <ul className="my-4">
          <li>Access the gamepad from inside your OpMode</li>
          <li>Read joystick and button values</li>
          <li>Use gamepad input to control telemetry output</li>
        </ul>

        <br />
        <h2>The Gamepad in FTC Java</h2>
        <p>The FTC SDK gives us two gamepads:</p>
        <ul className="my-4">
          <li><b>gamepad1</b>: usually used by the first driver</li>
          <li><b>gamepad2</b>: usually used by the second driver (often for controlling arms or servos)</li>
        </ul>
        <p>Each gamepad has many inputs:</p>
        <ul className="my-4">
          <li><b>Joysticks:</b> <code>left_stick_x</code>, <code>left_stick_y</code>, <code>right_stick_x</code>, <code>right_stick_y</code> (values from -1 to 1)</li>
          <li><b>Buttons:</b> <code>a</code>, <code>b</code>, <code>x</code>, <code>y</code> (booleans: true if pressed)</li>
          <li><b>D-pad:</b> <code>dpad_up</code>, <code>dpad_down</code>, <code>dpad_left</code>, <code>dpad_right</code></li>
          <li><b>Triggers:</b> <code>left_trigger</code>, <code>right_trigger</code> (values from 0 to 1)</li>
          <li><b>Bumpers:</b> <code>left_bumper</code>, <code>right_bumper</code> (booleans)</li>
        </ul>
        <p>You can use these inputs to control the behavior of your robot.</p>

        <br />
        <h2>Gamepads Are Objects</h2>
        <p>Both <code>gamepad1</code> and <code>gamepad2</code> are objects, just like the classes you've learned about in the object-oriented programming lessons. Each gamepad object has fields that represent the buttons, joysticks, and other inputs. You use dot notation to access these fields, like <code>gamepad1.a</code> or <code>gamepad2.left_stick_y</code>.</p>
        <p>This is the same idea as accessing data from any other object:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`Dog myDog = new Dog();
myDog.bark();`}
          </SyntaxHighlighter>
        </div>
        <p>In the same way, you're accessing fields or methods from the <code>gamepad1</code> object:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`if (gamepad1.a) {
    // Do something when the A button is pressed
}`}
          </SyntaxHighlighter>
        </div>
        <p>Understanding that gamepads are objects will help you recognize that you're interacting with a structured unit that holds related data, just like your own custom classes.</p>

        <br />
        <h2>Example OpMode</h2>
        <p>Here's an example that prints joystick and button values to the Driver Station:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`@TeleOp
public class GamepadExample extends OpMode {
    @Override
    public void init() {
        telemetry.addData("Status", "Initialized");
    }

    @Override
    public void loop() {
        telemetry.addData("Left Stick X", gamepad1.left_stick_x);
        telemetry.addData("Left Stick Y", gamepad1.left_stick_y);
        telemetry.addData("A Button Pressed", gamepad1.a);
        telemetry.update();
    }
}`}
          </SyntaxHighlighter>
        </div>
        <p>This example reads the x and y axes of the left joystick and checks if the A button is pressed. It updates the telemetry with those values every cycle.</p>

        <br />
        <h2>State Tracking Example</h2>
        <p>You can track the previous state of buttons to detect toggles or one-time actions:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`@TeleOp
public class ToggleExample extends OpMode {
    boolean wasAPressed = false;
    boolean motorOn = false;

    DcMotor motor;

    @Override
    public void init() {
        motor = hardwareMap.get(DcMotor.class, "motor");
        motor.setPower(0);
    }

    @Override
    public void loop() {
        if (gamepad1.a && !wasAPressed) {
            motorOn = !motorOn;
        }

        wasAPressed = gamepad1.a;

        if (motorOn) {
            motor.setPower(0.5);
        } else {
            motor.setPower(0.0);
        }

        telemetry.addData("Motor On", motorOn);
        telemetry.update();
    }
}`}
          </SyntaxHighlighter>
        </div>
        <p>This example toggles the motor power between 0 and 0.5 each time the A button is pressed (not held).</p>

        <br />
        <h2>Another Example OpMode: D-Pad Servo Control</h2>
        <p>Here’s another useful pattern using gamepad input: controlling a servo with the D-pad.</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`@TeleOp
public class DPadServoControl extends OpMode {
    Servo servo;

    @Override
    public void init() {
        servo = hardwareMap.get(Servo.class, "servo");
    }

    @Override
    public void loop() {
        if (gamepad1.dpad_up) {
            servo.setPosition(1.0);
        } else if (gamepad1.dpad_down) {
            servo.setPosition(0.0);
        } else if (gamepad1.dpad_left || gamepad1.dpad_right) {
            servo.setPosition(0.5);
        }

        telemetry.addData("Servo Position", servo.getPosition());
        telemetry.update();
    }
}`}
          </SyntaxHighlighter>
        </div>
        <p>This lets the user press up for full open, down for fully closed, and left/right for halfway.</p>

        <br />
        <h2>Things to Know</h2>
        <ul className="my-4">
          <li>Joystick y values are negative when pushed up and positive when pushed down.</li>
          <li>Joystick x values are negative when pushed left and positive when pushed right.</li>
          <li>You can combine gamepad inputs with logic to trigger actions.</li>
        </ul>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`if (gamepad1.a && !previouslyPressed) {
    // Toggle something or start an action
}`}
          </SyntaxHighlighter>
        </div>
        <p>To track previous button state, you'll need to store it in a variable.</p>

        <br />
        <h2>Practice Task</h2>
        <p>Write a TeleOp program that:</p>
        <ul className="my-4">
          <li>Turns on a motor when <code>gamepad1.a</code> is pressed</li>
          <li>Turns the motor off when <code>gamepad1.b</code> is pressed</li>
          <li>Displays the current motor power in telemetry</li>
        </ul>
        <p>You’ll need a <code>DcMotor</code> declared and initialized, and conditionals inside your <code>loop()</code> method.</p>

        <br />
        <h2>Recap</h2>
        <ul className="my-4">
          <li>Use <code>gamepad1</code> and <code>gamepad2</code> to access controller input</li>
          <li>Joysticks and triggers give you a range of values</li>
          <li>Buttons and bumpers give you true/false values</li>
          <li>Use these inputs to control motors, servos, or trigger logic in your robot</li>
          <li>Gamepad input is the foundation of manual robot control in FTC. Mastering it lets you create powerful TeleOp routines.</li>
        </ul>
        
        
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
