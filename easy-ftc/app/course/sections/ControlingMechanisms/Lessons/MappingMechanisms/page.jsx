import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const metadata = {
  title: "Mapping Buttons to Mechanisms | EasyFTC",
};

export default function MappingButtons() {
  const lessonPoints = 63;

  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Mapping Buttons to Mechanisms</h1>

        <p>
          In this lesson, you'll learn how to use gamepad buttons to control parts of your robot like motors or servos. You'll see the difference between using buttons that hold a position versus buttons that toggle between states.
        </p>

        <h2>Why Map Buttons to Mechanisms?</h2>
        <p>
          Most mechanisms on your robot like claws, arms, and slides aren’t just controlled by joysticks. You often want to press a button to open or close a claw, move an arm to a position, or toggle something on or off.
        </p>
        <p>
          This is where buttons become powerful. Depending on your goal, you might:
        </p>
        <ul className="my-4">
          <li>Hold a button to activate something</li>
          <li>Press a button once to turn something on, then press it again to turn it off</li>
        </ul>

        <h2>Button Hold Behavior</h2>
        <p>This is the simplest method. The mechanism is only active while the button is being pressed.</p>

        <h3>Example: Holding a button to power a motor</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`if (gamepad1.a) {
    motor.setPower(0.5);
} else {
    motor.setPower(0.0);
}`}
          </SyntaxHighlighter>
        </div>
        <p>This keeps the motor running only while the A button is pressed.</p>

        <h3>Example: Holding a button to move a servo</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`if (gamepad1.b) {
    servo.setPosition(1.0); // fully extended
} else {
    servo.setPosition(0.0); // retracted
}`}
          </SyntaxHighlighter>
        </div>

        <h2>Button Toggle Behavior</h2>
        <p>
          This is more advanced: the mechanism changes once per button press and stays that way until the button is pressed again.
        </p>
        <p>
          To do this, we need to:
        </p>
        <ul className="my-4">
          <li>Track whether the button was already pressed</li>
          <li>Flip the state when the button goes from not pressed to pressed (rising edge)</li>
        </ul>

        <h3>Example: Toggling a motor on and off</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`boolean motorOn = false;
boolean aAlreadyPressed = false;

public void loop() {
    if (gamepad1.a && !aAlreadyPressed) {
        motorOn = !motorOn;
    }
    aAlreadyPressed = gamepad1.a;

    if (motorOn) {
        motor.setPower(0.5);
    } else {
        motor.setPower(0.0);
    }
}`}
          </SyntaxHighlighter>
        </div>
        <p>This flips <code>motorOn</code> each time the button is newly pressed.</p>

        <h2>Button State Tracking: Why It Matters</h2>
        <p>
          You might be tempted to just check <code>if (gamepad1.a)</code>, but that would trigger over and over while the button is held. By using a separate <code>alreadyPressed</code> variable, you ensure your action happens once per press, not repeatedly during the entire hold.
        </p>
        <p>This is called <strong>edge detection</strong>, or detecting the moment the button changes state from not pressed to pressed.</p>

        <h2>Common Patterns</h2>

        <h3>Toggle a servo between open and closed</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`boolean clawOpen = false;
boolean xAlreadyPressed = false;

public void loop() {
    if (gamepad1.x && !xAlreadyPressed) {
        clawOpen = !clawOpen;
    }
    xAlreadyPressed = gamepad1.x;

    if (clawOpen) {
        servo.setPosition(1.0);
    } else {
        servo.setPosition(0.0);
    }
}`}
          </SyntaxHighlighter>
        </div>

        <h3>Using both hold and toggle</h3>
        <p>Use A to toggle motor power. Use B to hold and override with full power while held.</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`boolean motorToggle = false;
boolean aWasPressed = false;

public void loop() {
    if (gamepad1.a && !aWasPressed) {
        motorToggle = !motorToggle;
    }
    aWasPressed = gamepad1.a;

    if (gamepad1.b) {
        motor.setPower(1.0); // override full power
    } else if (motorToggle) {
        motor.setPower(0.5); // toggle power
    } else {
        motor.setPower(0.0);
    }
}`}
          </SyntaxHighlighter>
        </div>

        <h2>Recap</h2>
        <ul className="my-4">
          <li>Hold logic is easy and happens while the button is down</li>
          <li>Toggle logic requires storing a boolean to track state and edge detection</li>
          <li>You can combine both for more flexible controls</li>
        </ul>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
