import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const metadata = {
  title: "2-Motor Tank Drive | EasyFTC",
};

export default function TankDrive2MotorLesson() {
  const lessonPoints = 84;

  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>2-Motor Tank Drive</h1>

        <p>
          A simple and reliable TeleOp that uses two drive motors: one on the left and one on the right.
          Each joystick controls the motor on its side — the left stick controls the left motor, and the right stick controls the right motor.
        </p>

        <h2>What You Get</h2>
        <ul className="my-4">
          <li>Clean hardware mapping for two motors</li>
          <li>Proper motor direction and braking setup</li>
          <li>Stick input with deadzone and optional precision mode</li>
          <li>Safe, game-ready defaults</li>
        </ul>

        <h2>Wiring and Configuration</h2>
        <p>In the Robot Controller app, configure two motors:</p>
        <ul className="my-4">
          <li><code>leftDrive</code></li>
          <li><code>rightDrive</code></li>
        </ul>
        <p>
          Mount the motors so the robot moves forward when both wheels spin forward.
          If one side runs backward, reverse its motor direction in code.
        </p>

        <h2>Example: LinearOpMode</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`package org.firstinspires.ftc.teamcode.teleop;

import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.eventloop.opmode.TeleOp;
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.hardware.DcMotorSimple;

@TeleOp(name = "2-Motor Tank Drive", group = "Reference")
public class TankDrive2Motor extends LinearOpMode {

    private static final double DEADZONE = 0.05;
    private static final double SLOW_MULTIPLIER = 0.4;

    private DcMotor leftDrive;
    private DcMotor rightDrive;

    @Override
    public void runOpMode() {
        leftDrive  = hardwareMap.get(DcMotor.class, "leftDrive");
        rightDrive = hardwareMap.get(DcMotor.class, "rightDrive");

        leftDrive.setDirection(DcMotorSimple.Direction.FORWARD);
        rightDrive.setDirection(DcMotorSimple.Direction.REVERSE);

        leftDrive.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
        rightDrive.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);

        leftDrive.setZeroPowerBehavior(DcMotor.ZeroPowerBehavior.BRAKE);
        rightDrive.setZeroPowerBehavior(DcMotor.ZeroPowerBehavior.BRAKE);

        telemetry.addLine("Ready: Tank Drive (2-Motor)");
        telemetry.update();

        waitForStart();

        while (opModeIsActive()) {
            double leftInput  = -gamepad1.left_stick_y;
            double rightInput = -gamepad1.right_stick_y;

            leftInput  = applyDeadzone(leftInput, DEADZONE);
            rightInput = applyDeadzone(rightInput, DEADZONE);

            leftInput  = squarePreserveSign(leftInput);
            rightInput = squarePreserveSign(rightInput);

            double multiplier;
            if (gamepad1.left_bumper) {
                multiplier = SLOW_MULTIPLIER;
            } else {
                multiplier = 1.0;
            }

            double leftPower  = leftInput  * multiplier;
            double rightPower = rightInput * multiplier;

            leftDrive.setPower(leftPower);
            rightDrive.setPower(rightPower);

            String precisionMode;
            if (gamepad1.left_bumper) {
                precisionMode = "ON";
            } else {
                precisionMode = "OFF";
            }

            telemetry.addData("Left Power",  "%.2f", leftPower);
            telemetry.addData("Right Power", "%.2f", rightPower);
            telemetry.addData("Precision", precisionMode);
            telemetry.update();
        }
    }

    private double applyDeadzone(double value, double dz) {
        if (Math.abs(value) < dz) {
            return 0.0;
        } else {
            return value;
        }
    }

    private double squarePreserveSign(double x) {
        return Math.signum(x) * x * x;
    }
}`}
          </SyntaxHighlighter>
        </div>

        <h2>Alternate Code: Iterative OpMode</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`package org.firstinspires.ftc.teamcode.teleop;

import com.qualcomm.robotcore.eventloop.opmode.OpMode;
import com.qualcomm.robotcore.eventloop.opmode.TeleOp;
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.hardware.DcMotorSimple;

@TeleOp(name = "2-Motor Tank Drive (Iterative)", group = "Reference")
public class TankDrive2MotorIterative extends OpMode {

    private static final double DEADZONE = 0.05;
    private static final double SLOW_MULTIPLIER = 0.4;

    private DcMotor leftDrive;
    private DcMotor rightDrive;

    @Override
    public void init() {
        leftDrive  = hardwareMap.get(DcMotor.class, "leftDrive");
        rightDrive = hardwareMap.get(DcMotor.class, "rightDrive");

        leftDrive.setDirection(DcMotorSimple.Direction.FORWARD);
        rightDrive.setDirection(DcMotorSimple.Direction.REVERSE);

        leftDrive.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
        rightDrive.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);

        leftDrive.setZeroPowerBehavior(DcMotor.ZeroPowerBehavior.BRAKE);
        rightDrive.setZeroPowerBehavior(DcMotor.ZeroPowerBehavior.BRAKE);

        telemetry.addLine("Initialized: 2-Motor Tank Drive");
    }

    @Override
    public void loop() {
        double left  = -gamepad1.left_stick_y;
        double right = -gamepad1.right_stick_y;

        if (Math.abs(left) < DEADZONE) {
            left = 0.0;
        }
        if (Math.abs(right) < DEADZONE) {
            right = 0.0;
        }

        left  = Math.signum(left)  * left  * left;
        right = Math.signum(right) * right * right;

        double mult;
        if (gamepad1.left_bumper) {
            mult = SLOW_MULTIPLIER;
        } else {
            mult = 1.0;
        }

        leftDrive.setPower(left * mult);
        rightDrive.setPower(right * mult);

        if (gamepad1.left_bumper) {
            telemetry.addData("Precision", "ON");
        } else {
            telemetry.addData("Precision", "OFF");
        }
        telemetry.addData("Left",  "%.2f", left * mult);
        telemetry.addData("Right", "%.2f", right * mult);
    }
}`}
          </SyntaxHighlighter>
        </div>

        <h2>Controls</h2>
        <ul className="my-4">
          <li>Left stick up/down: left motor forward/backward</li>
          <li>Right stick up/down: right motor forward/backward</li>
          <li>Hold left bumper: precision mode for delicate moves</li>
        </ul>

        <h2>Common Pitfalls</h2>
        <ul className="my-4">
          <li>Robot drives backward when both sticks go forward: reverse one motor’s direction in code</li>
          <li>Robot coasts when you release the sticks: set <code>ZeroPowerBehavior</code> to BRAKE</li>
          <li>Jittering while centered: slightly increase the deadzone</li>
          <li>Changes in battery voltage affect feel: use precision mode or input squaring</li>
        </ul>

        <h2>Easy Additions</h2>
        <ul className="my-4">
          <li>Add a slow mode toggle using a button instead of holding a bumper</li>
          <li>Add a reverse drive toggle for driver preference</li>
          <li>Add encoder telemetry to monitor wheel motion</li>
          <li>Add current limiting or ramping if your drivetrain is aggressive</li>
        </ul>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
