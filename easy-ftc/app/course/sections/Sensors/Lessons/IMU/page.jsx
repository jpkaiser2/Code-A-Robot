import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const metadata = {
  title: "Using the IMU | EasyFTC",
};

export default function UsingIMU() {
  const lessonPoints = 66;

  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Using The IMU</h1>

        <p>
          In this lesson, you'll learn how to use the IMU (Inertial Measurement Unit) to determine your robot's orientation.
          The IMU is a powerful tool for making your autonomous programs more reliable by measuring heading, pitch, and roll.
        </p>

        <h2>What Is an IMU?</h2>
        <p>
          The IMU is a built-in sensor on the Control Hub that measures the robot’s rotation in space.
          It combines a gyroscope and accelerometer to track the robot’s angular position.
        </p>
        <p>Most teams use it to:</p>
        <ul className="my-4">
          <li>Know which direction the robot is facing</li>
          <li>Turn to a specific angle in autonomous</li>
          <li>Keep the robot driving straight</li>
          <li>Create field-centric drive systems</li>
        </ul>

        <h2>Understanding Yaw, Pitch, and Roll</h2>
        <ul className="my-4">
          <li><strong>Yaw</strong>: Rotation around the vertical axis (turning left or right)</li>
          <li><strong>Pitch</strong>: Rotation around the horizontal axis (nose up or down)</li>
          <li><strong>Roll</strong>: Rotation around the front-to-back axis (tilting left or right)</li>
        </ul>
        <p>
          In most FTC applications, yaw is used the most. Pitch and roll can be helpful in advanced cases like balancing on a ramp or detecting tilt.
        </p>

        <h2>Setting Up the IMU</h2>
        <p>You don’t need to configure the IMU in the hardware map. It already exists under the name "imu".</p>
        <p>Initialize it in <code>init()</code>:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`IMU imu;

@Override
public void init() {
    imu = hardwareMap.get(IMU.class, "imu");

    RevHubOrientationOnRobot orientation = new RevHubOrientationOnRobot(
        RevHubOrientationOnRobot.LogoFacingDirection.UP,
        RevHubOrientationOnRobot.UsbFacingDirection.FORWARD
    );

    imu.initialize(new IMU.Parameters(orientation));
}`}
          </SyntaxHighlighter>
        </div>
        <p>This setup tells the SDK how your Control Hub is mounted so it can interpret orientation correctly.</p>

        <h2>Reading the Heading</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`double heading = imu.getRobotYawPitchRollAngles().getYaw(AngleUnit.DEGREES);`}
          </SyntaxHighlighter>
        </div>
        <p>This returns the yaw (rotation around the vertical axis) in degrees. Values typically range from -180 to 180.</p>

        <h2>Resetting the Heading</h2>
        <p>To treat the current angle as zero, store it at the start and subtract it later:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`double initialHeading;

@Override
public void start() {
    initialHeading = imu.getRobotYawPitchRollAngles().getYaw(AngleUnit.DEGREES);
}

@Override
public void loop() {
    double rawHeading = imu.getRobotYawPitchRollAngles().getYaw(AngleUnit.DEGREES);
    double relativeHeading = rawHeading - initialHeading;

    telemetry.addData("Relative Heading", relativeHeading);
}`}
          </SyntaxHighlighter>
        </div>

        <h2>Turning to a Specific Angle</h2>
        <p>Use this logic to turn the robot to a target heading:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`double targetAngle = 90; // degrees
double turnSpeed = 0.3;

@Override
public void loop() {
    double heading = imu.getRobotYawPitchRollAngles().getYaw(AngleUnit.DEGREES);

    if (heading < targetAngle - 2) {
        leftDrive.setPower(turnSpeed);
        rightDrive.setPower(-turnSpeed);
    } else if (heading > targetAngle + 2) {
        leftDrive.setPower(-turnSpeed);
        rightDrive.setPower(turnSpeed);
    } else {
        leftDrive.setPower(0);
        rightDrive.setPower(0);
    }

    telemetry.addData("Heading", heading);
}`}
          </SyntaxHighlighter>
        </div>
        <p>This stops the turn when the heading is within ±2° of the target.</p>

        <h2>Bonus: Driving Straight with the IMU</h2>
        <p>
          If your robot drifts off course, you can use the IMU to correct its heading during driving:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`double targetHeading = 0; // desired heading

@Override
public void loop() {
    double currentHeading = imu.getRobotYawPitchRollAngles().getYaw(AngleUnit.DEGREES);
    double error = currentHeading - targetHeading;

    double kP = 0.02;
    double correction = error * kP;

    double basePower = 0.5;

    leftDrive.setPower(basePower - correction);
    rightDrive.setPower(basePower + correction);
}`}
          </SyntaxHighlighter>
        </div>
        <p>This uses proportional control (the "P" in PID) to correct small errors in heading while driving.</p>

        <h2>What Is PID?</h2>
        <p>
          The example above uses the "P" part of a PID controller. PID stands for Proportional, Integral, and Derivative. It’s a control technique that helps your robot reach target values more smoothly and accurately. You don’t need to master it yet, but just know it’s a powerful upgrade over basic if-statements.
        </p>

        <h2>Recap</h2>
        <ul className="my-4">
          <li>The IMU measures yaw (heading), pitch, and roll.</li>
          <li>Yaw is the most commonly used for turning and orientation.</li>
          <li>You read heading with <code>imu.getRobotYawPitchRollAngles().getYaw()</code>.</li>
          <li>To reset heading, store the initial value and subtract it each loop.</li>
          <li>Use if-statements or proportional control to turn or stay straight.</li>
          <li>Always initialize the IMU with the correct Control Hub orientation.</li>
        </ul>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
