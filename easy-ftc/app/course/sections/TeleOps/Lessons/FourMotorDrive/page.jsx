import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const metadata = {
  title: "4-Motor Tank Drive | EasyFTC",
};

export default function FourMotorTankDrive() {
  const lessonPoints = 85;

  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>4-Motor Tank Drive</h1>
        <p>
          A dependable TeleOp that uses four drive motors. The left joystick controls the two left motors, and the right joystick controls the two right motors.
        </p>
        <h2>What You Get</h2>
        <ul className="my-4">
          <li>Clean hardware mapping for four motors</li>
          <li>Proper motor direction and braking setup for mirrored drivetrains</li>
          <li>Stick input with deadzone and optional precision mode</li>
          <li>Safe, game-ready defaults</li>
        </ul>

        <h2>Wiring and Config</h2>
        <p>Configure four motors in the Robot Controller app:</p>
        <ul className="my-4">
          <li><code>leftFront</code></li>
          <li><code>leftRear</code></li>
          <li><code>rightFront</code></li>
          <li><code>rightRear</code></li>
        </ul>
        <p>
          Mount the motors so the robot moves forward when both sides spin forward. If a side runs backward, flip its motor direction in code.
        </p>

        <h2>Example: LinearOpMode</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`package org.firstinspires.ftc.teamcode.teleop;

import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.eventloop.opmode.TeleOp;
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.hardware.DcMotorSimple;

@TeleOp(name = "4-Motor Tank Drive", group = "Reference")
public class TankDrive4Motor extends LinearOpMode {

    private static final double DEADZONE = 0.05;
    private static final double SLOW_MULTIPLIER = 0.4;

    private DcMotor leftFront;
    private DcMotor leftRear;
    private DcMotor rightFront;
    private DcMotor rightRear;

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

        leftFront.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
        leftRear.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
        rightFront.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
        rightRear.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);

        leftFront.setZeroPowerBehavior(DcMotor.ZeroPowerBehavior.BRAKE);
        leftRear.setZeroPowerBehavior(DcMotor.ZeroPowerBehavior.BRAKE);
        rightFront.setZeroPowerBehavior(DcMotor.ZeroPowerBehavior.BRAKE);
        rightRear.setZeroPowerBehavior(DcMotor.ZeroPowerBehavior.BRAKE);

        telemetry.addLine("Ready: Tank Drive (4-Motor)");
        telemetry.update();

        waitForStart();

        while (opModeIsActive()) {
            double leftInput  = -gamepad1.left_stick_y;
            double rightInput = -gamepad1.right_stick_y;

            if (Math.abs(leftInput) < DEADZONE) leftInput = 0.0;
            if (Math.abs(rightInput) < DEADZONE) rightInput = 0.0;

            leftInput  = Math.signum(leftInput) * leftInput * leftInput;
            rightInput = Math.signum(rightInput) * rightInput * rightInput;

            double multiplier = gamepad1.left_bumper ? SLOW_MULTIPLIER : 1.0;

            double leftPower  = leftInput  * multiplier;
            double rightPower = rightInput * multiplier;

            leftFront.setPower(leftPower);
            leftRear.setPower(leftPower);
            rightFront.setPower(rightPower);
            rightRear.setPower(rightPower);

            telemetry.addData("Left Power",  "%.2f", leftPower);
            telemetry.addData("Right Power", "%.2f", rightPower);
            telemetry.addData("Precision", gamepad1.left_bumper ? "ON" : "OFF");
            telemetry.update();
        }
    }
}`}          </SyntaxHighlighter>
        </div>

        <h2>Alternate Code: Iterative OpMode</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`package org.firstinspires.ftc.teamcode.teleop;

import com.qualcomm.robotcore.eventloop.opmode.OpMode;
import com.qualcomm.robotcore.eventloop.opmode.TeleOp;
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.hardware.DcMotorSimple;

@TeleOp(name = "4-Motor Tank Drive (Iterative)", group = "Reference")
public class TankDrive4MotorIterative extends OpMode {

    private static final double DEADZONE = 0.05;
    private static final double SLOW_MULTIPLIER = 0.4;

    private DcMotor leftFront;
    private DcMotor leftRear;
    private DcMotor rightFront;
    private DcMotor rightRear;

    @Override
    public void init() {
        leftFront  = hardwareMap.get(DcMotor.class, "leftFront");
        leftRear   = hardwareMap.get(DcMotor.class, "leftRear");
        rightFront = hardwareMap.get(DcMotor.class, "rightFront");
        rightRear  = hardwareMap.get(DcMotor.class, "rightRear");

        leftFront.setDirection(DcMotorSimple.Direction.FORWARD);
        leftRear.setDirection(DcMotorSimple.Direction.FORWARD);
        rightFront.setDirection(DcMotorSimple.Direction.REVERSE);
        rightRear.setDirection(DcMotorSimple.Direction.REVERSE);

        leftFront.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
        leftRear.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
        rightFront.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
        rightRear.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);

        leftFront.setZeroPowerBehavior(DcMotor.ZeroPowerBehavior.BRAKE);
        leftRear.setZeroPowerBehavior(DcMotor.ZeroPowerBehavior.BRAKE);
        rightFront.setZeroPowerBehavior(DcMotor.ZeroPowerBehavior.BRAKE);
        rightRear.setZeroPowerBehavior(DcMotor.ZeroPowerBehavior.BRAKE);

        telemetry.addLine("Initialized: 4-Motor Tank Drive");
    }

    @Override
    public void loop() {
        double left  = -gamepad1.left_stick_y;
        double right = -gamepad1.right_stick_y;

        if (Math.abs(left) < DEADZONE) left = 0.0;
        if (Math.abs(right) < DEADZONE) right = 0.0;

        left  = Math.signum(left)  * left  * left;
        right = Math.signum(right) * right * right;

        double mult = gamepad1.left_bumper ? SLOW_MULTIPLIER : 1.0;

        leftFront.setPower(left * mult);
        leftRear.setPower(left * mult);
        rightFront.setPower(right * mult);
        rightRear.setPower(right * mult);

        telemetry.addData("Precision", gamepad1.left_bumper ? "ON" : "OFF");
        telemetry.addData("Left",  "%.2f", left * mult);
        telemetry.addData("Right", "%.2f", right * mult);
    }
}`}          </SyntaxHighlighter>
        </div>

        <h2>Controls</h2>
        <ul className="my-4">
          <li>Left stick up/down: left side forward and backward</li>
          <li>Right stick up/down: right side forward and backward</li>
          <li>Hold left bumper: precision mode for delicate moves</li>
        </ul>

        <h2>Common Pitfalls</h2>
        <ul className="my-4">
          <li>Robot drives backward when both sticks go forward: flip one side's motor direction in code</li>
          <li>Robot coasts when sticks are released: set ZeroPowerBehavior to BRAKE</li>
          <li>Jittering when sticks are centered: slightly increase the deadzone</li>
          <li>Power feels different with changing battery voltage: use precision mode or input squaring</li>
        </ul>

        <h2>Easy Additions</h2>
        <ul className="my-4">
          <li>Add a slow mode toggle with a button instead of holding a bumper</li>
          <li>Add a reverse drive toggle for driver preference</li>
          <li>Add encoder telemetry to monitor wheel motion</li>
          <li>Add current limiting or ramping for aggressive drivetrains</li>
        </ul>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
