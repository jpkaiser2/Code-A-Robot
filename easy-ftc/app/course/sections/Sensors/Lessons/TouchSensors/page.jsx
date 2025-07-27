import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const metadata = {
  title: "Touch Sensors and Digital Inputs | EasyFTC",
};

export default function TouchSensors() {
  const lessonPoints = 68;

  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Touch Sensors and Digital Inputs</h1>

        <p>
          Touch sensors are digital inputs that return just two values: pressed or not pressed. They're great for detecting physical contact, like when a mechanism hits a limit or a bumper is pressed.
        </p>

        <h2>What Is a Touch Sensor?</h2>
        <ul className="my-4">
          <li>A touch sensor like the REV Touch Sensor is a digital input device.</li>
          <li>It returns <code>true</code> when <strong>not pressed</strong> (HIGH)</li>
          <li>It returns <code>false</code> when <strong>pressed</strong> (LOW)</li>
          <li>We usually invert the result in code to make it easier to read</li>
        </ul>

        <h2>Hardware & Configuration</h2>
        <ul className="my-4">
          <li>Connect the touch sensor to a digital port (e.g. 0, 2, 4) on the Control Hub or Expansion Hub</li>
          <li>Only the second pin (odd number) is used</li>
          <li>In the Robot Controller app, configure it as a <strong>Digital Device</strong> or <strong>Digital Touch Sensor</strong> and name it (e.g. <code>touch_sensor</code>)</li>
        </ul>

        <h2>Setting Up in Code</h2>
        <p>Here's how to define and set up a digital touch sensor in an OpMode:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`DigitalChannel touchSensor;

touchSensor = hardwareMap.get(DigitalChannel.class, "touch_sensor");
touchSensor.setMode(DigitalChannel.Mode.INPUT);`}
          </SyntaxHighlighter>
        </div>
        <p><strong>Note:</strong> This setup must happen <code>before waitForStart()</code></p>

        <h2>Reading the Sensor Value</h2>
        <p>The sensor is <strong>LOW</strong> when pressed, so we invert it to make our code easier to read:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`boolean isPressed = !touchSensor.getState();`}
          </SyntaxHighlighter>
        </div>

        <h2>Example: TeleOp with Telemetry</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`@TeleOp
public class TouchSensorOpMode extends LinearOpMode {
    private DigitalChannel touchSensor;

    @Override
    public void runOpMode() {
        touchSensor = hardwareMap.get(DigitalChannel.class, "touch_sensor");
        touchSensor.setMode(DigitalChannel.Mode.INPUT);

        telemetry.addData("Status", "Initialized");
        telemetry.update();
        waitForStart();

        while (opModeIsActive()) {
            if (!touchSensor.getState()) {
                telemetry.addData("Touch Sensor", "PRESSED");
            } else {
                telemetry.addData("Touch Sensor", "NOT PRESSED");
            }
            telemetry.update();
        }
    }
}`}
          </SyntaxHighlighter>
        </div>

        <h2>Example: Using as a Limit Switch</h2>
        <p>This is a common pattern for stopping a motor when the sensor is triggered:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`if (!touchSensor.getState()) {
    armMotor.setPower(0); // stop if pressed
} else {
    armMotor.setPower(0.3); // otherwise move arm
}`}
          </SyntaxHighlighter>
        </div>

        <h2>Best Practices</h2>
        <ul className="my-4">
          <li>Use a helper method for clarity:</li>
        </ul>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public boolean isTouchSensorPressed() {
    return !touchSensor.getState();
}`}
          </SyntaxHighlighter>
        </div>
        <ul className="my-4">
          <li>Use clear names like <code>armLimitSwitch</code> or <code>bumperTouch</code></li>
          <li>Always call <code>setMode(INPUT)</code> before reading</li>
          <li>Use telemetry to verify sensor state while testing</li>
        </ul>

        <h2>Recap</h2>
        <ul className="my-4">
          <li>Touch sensors are digital inputs that return <code>false</code> when pressed</li>
          <li>Invert with <code>!</code> to make <code>true</code> mean "pressed"</li>
          <li>Plug into the second pin (odd-numbered) of a digital port</li>
          <li>Configure in the RC app as a "Digital Device"</li>
          <li>Set the mode to <code>INPUT</code> in your code</li>
          <li>Great for limit switches, bumpers, or trigger detection</li>
          <li>Use telemetry to check sensor behavior during testing</li>
        </ul>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
