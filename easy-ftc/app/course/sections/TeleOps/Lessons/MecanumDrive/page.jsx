import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export const metadata = {
  title: "Mecanum Drive | EasyFTC",
};

export default function MecanumDrive() {
  const lessonPoints = 86;

  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Mecanum Drive</h1>

        <p>
          A flexible TeleOp for robots with four mecanum wheels. The left stick
          controls forward/backward movement and strafing. The right stick
          controls rotation.
        </p>

        <h2>What You Get</h2>
        <ul className="my-4">
          <li>Clean hardware mapping for four drive motors</li>
          <li>Correct motor directions for mecanum wheels</li>
          <li>Deadzone and optional precision mode</li>
          <li>Proper power normalization to keep values in range</li>
          <li>Safe, game-ready defaults</li>
        </ul>

        <h2>Wiring and Configuration</h2>
        <p>
          Configure four motors in the Robot Controller app with these names:
        </p>
        <ul className="my-4">
          <li>leftFront</li>
          <li>leftRear</li>
          <li>rightFront</li>
          <li>rightRear</li>
        </ul>
        <p>
          After mapping, push the left stick up. The robot should drive forward.
          If it drives backward, change the direction for one or more motors as
          shown below until forward is correct.
        </p>

        <h2>Example: LinearOpMode (Robot-Centric)</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`package org.firstinspires.ftc.teamcode.teleop;

import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.eventloop.opmode.TeleOp;
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.hardware.DcMotorSimple;

@TeleOp(name = "Mecanum Drive", group = "Reference")
public class MecanumDriveLinear extends LinearOpMode {

    private static final double DEADZONE = 0.05;
    private static final double SLOW_MULTIPLIER = 0.4;
    private static final double STRAFE_CORRECTION = 1.0;

    private DcMotor leftFront, leftRear, rightFront, rightRear;

    @Override
    public void runOpMode() {
        leftFront  = hardwareMap.get(DcMotor.class, "leftFront");
        leftRear   = hardwareMap.get(DcMotor.class, "leftRear");
        rightFront = hardwareMap.get(DcMotor.class, "rightFront");
        rightRear  = hardwareMap.get(DcMotor.class, "rightRear");

        leftFront.setDirection(DcMotorSimple.Direction.FORWARD);
        leftRear.setDirection(DcMotorSimple.Direction.FORWARD);
        rightFront.setDirection(DcMotorSimple.Direction.REVERSE);
        rightRear.setDirection(DcMotorSimple.Direction.REVERSE);

        setRunMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
        setZeroPowerBehavior(DcMotor.ZeroPowerBehavior.BRAKE);

        telemetry.addLine("Ready: Mecanum Drive");
        telemetry.update();

        waitForStart();

        while (opModeIsActive()) {
            double y  = -gamepad1.left_stick_y;
            double x  = gamepad1.left_stick_x;
            double rx = gamepad1.right_stick_x;

            y  = applyDeadzone(y, DEADZONE);
            x  = applyDeadzone(x, DEADZONE);
            rx = applyDeadzone(rx, DEADZONE);

            y  = squarePreserveSign(y);
            x  = squarePreserveSign(x) * STRAFE_CORRECTION;
            rx = squarePreserveSign(rx);

            double mult = 1.0;
            if (gamepad1.left_bumper) {
                mult = SLOW_MULTIPLIER;
            }

            double denominator = Math.max(Math.abs(y) + Math.abs(x) + Math.abs(rx), 1.0);
            double lf = (y + x + rx) / denominator * mult;
            double lr = (y - x + rx) / denominator * mult;
            double rf = (y - x - rx) / denominator * mult;
            double rr = (y + x - rx) / denominator * mult;

            leftFront.setPower(lf);
            leftRear.setPower(lr);
            rightFront.setPower(rf);
            rightRear.setPower(rr);

            telemetry.addData("LF", "%.2f", lf);
            telemetry.addData("LR", "%.2f", lr);
            telemetry.addData("RF", "%.2f", rf);
            telemetry.addData("RR", "%.2f", rr);
            telemetry.addData("Precision", gamepad1.left_bumper ? "ON" : "OFF");
            telemetry.update();
        }
    }

    private void setRunMode(DcMotor.RunMode mode) {
        leftFront.setMode(mode);
        leftRear.setMode(mode);
        rightFront.setMode(mode);
        rightRear.setMode(mode);
    }

    private void setZeroPowerBehavior(DcMotor.ZeroPowerBehavior behavior) {
        leftFront.setZeroPowerBehavior(behavior);
        leftRear.setZeroPowerBehavior(behavior);
        rightFront.setZeroPowerBehavior(behavior);
        rightRear.setZeroPowerBehavior(behavior);
    }

    private double applyDeadzone(double value, double dz) {
        return Math.abs(value) < dz ? 0.0 : value;
    }

    private double squarePreserveSign(double x) {
        return Math.signum(x) * x * x;
    }
}`}
          </SyntaxHighlighter>
        </div>

        <h2>Alternate: Iterative OpMode</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`@TeleOp(name = "Mecanum Drive (Iterative)", group = "Reference")
public class MecanumDriveIterative extends OpMode {

    private static final double DEADZONE = 0.05;
    private static final double SLOW_MULTIPLIER = 0.4;
    private static final double STRAFE_CORRECTION = 1.0;

    private DcMotor leftFront, leftRear, rightFront, rightRear;

    @Override
    public void init() {
        // Same setup as LinearOpMode example
    }

    @Override
    public void loop() {
        double y  = -gamepad1.left_stick_y;
        double x  = gamepad1.left_stick_x;
        double rx = gamepad1.right_stick_x;

        if (Math.abs(y) < DEADZONE) y = 0.0;
        if (Math.abs(x) < DEADZONE) x = 0.0;
        if (Math.abs(rx) < DEADZONE) rx = 0.0;

        y  = Math.signum(y)  * y  * y;
        x  = Math.signum(x)  * x  * x * STRAFE_CORRECTION;
        rx = Math.signum(rx) * rx * rx;

        double mult = gamepad1.left_bumper ? SLOW_MULTIPLIER : 1.0;

        double denominator = Math.max(Math.abs(y) + Math.abs(x) + Math.abs(rx), 1.0);
        double lf = (y + x + rx) / denominator * mult;
        double lr = (y - x + rx) / denominator * mult;
        double rf = (y - x - rx) / denominator * mult;
        double rr = (y + x - rx) / denominator * mult;

        leftFront.setPower(lf);
        leftRear.setPower(lr);
        rightFront.setPower(rf);
        rightRear.setPower(rr);

        telemetry.addData("Precision", gamepad1.left_bumper ? "ON" : "OFF");
    }
}`}
          </SyntaxHighlighter>
        </div>

        <h2>Controls</h2>
        <ul className="my-4">
          <li>Left stick up/down: forward and backward</li>
          <li>Left stick left/right: strafe left and right</li>
          <li>Right stick left/right: rotate left and right</li>
          <li>Hold left bumper: precision mode</li>
        </ul>

        <h2>Common Pitfalls</h2>
        <ul className="my-4">
          <li>Robot does not drive forward correctly → fix motor directions</li>
          <li>Robot coasts when sticks are released → set ZeroPowerBehavior to BRAKE</li>
          <li>Robot pulls during strafing → increase STRAFE_CORRECTION</li>
          <li>Jittering while centered → increase deadzone</li>
          <li>Battery voltage changes feel → use precision mode or input shaping</li>
        </ul>

        <h2>Easy Extensions</h2>
        <ul className="my-4">
          <li>Slow mode toggle instead of holding bumper</li>
          <li>Reverse drive toggle for driver preference</li>
          <li>Field-centric control with an IMU</li>
          <li>Encoder telemetry and distance tracking</li>
        </ul>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
