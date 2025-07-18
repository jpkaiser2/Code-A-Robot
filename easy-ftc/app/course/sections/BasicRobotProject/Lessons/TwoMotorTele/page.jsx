import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';


export const metadata = {
  title: "Writing a Simple 2-Motor TeleOp | EasyFTC",
};

export default function TwoMotorTele() {
  // This lesson has 58 points
  const lessonPoints = 58;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Writing a Simple 2-Motor TeleOp</h1>

        <p>By now, you’ve learned how to use variables, read from a gamepad, and create a basic OpMode. In this lesson, we’ll put it all together to control a robot with two drive motors using a gamepad joystick.</p>

        <br />
        <h2>Learning Objectives</h2>
        <p>By the end of this lesson, you should be able to:</p>
        <ul className="my-4">
          <li>Write a LinearOpMode to control two motors</li>
          <li>Use joystick input to control forward/backward movement</li>
          <li>Configure and use hardware from the configuration file</li>
          <li>Test your code using a Driver Station and Control Hub</li>
        </ul>

        <br />
        <h2>What You Need</h2>
        <p>Make sure your hardware is set up with:</p>
        <ul className="my-4">
          <li>Two drive motors named <code>"left_drive"</code> and <code>"right_drive"</code> in the robot configuration</li>
          <li>A Control Hub or Expansion Hub</li>
          <li>A Driver Station device with a gamepad</li>
        </ul>

        <br />
        <h2>What is a 2-Motor Drive?</h2>
        <p>A 2-motor drivetrain is the simplest way to drive a robot. One motor drives the left side, and one motor drives the right. If both motors move forward, the robot drives forward. If they move in opposite directions, it turns.</p>
        <p>To make this work in code, we’ll:</p>
        <ul className="my-4">
          <li>Read the y-value from the left stick of <code>gamepad1</code></li>
          <li>Set that value as the power for both motors</li>
          <li>Reverse one motor to ensure both sides go in the same direction</li>
        </ul>

        <br />
        <h2>Example Code</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.eventloop.opmode.TeleOp;
import com.qualcomm.robotcore.hardware.DcMotor;

@TeleOp(name = "Simple 2-Motor Drive", group = "TeleOp")
public class SimpleTwoMotorDrive extends LinearOpMode {
    @Override
    public void runOpMode() {
        DcMotor leftMotor = hardwareMap.get(DcMotor.class, "left_drive");
        DcMotor rightMotor = hardwareMap.get(DcMotor.class, "right_drive");

        // Reverse one motor to make the robot drive straight
        leftMotor.setDirection(DcMotor.Direction.FORWARD);
        rightMotor.setDirection(DcMotor.Direction.REVERSE);

        waitForStart();

        while (opModeIsActive()) {
            double power = -gamepad1.left_stick_y;

            leftMotor.setPower(power);
            rightMotor.setPower(power);

            telemetry.addData("Motor Power", power);
            telemetry.update();
        }
    }
}`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Code Breakdown</h2>
        <ul className="my-4">
          <li><code>@TeleOp(...)</code>: Registers the program as a TeleOp so it shows on the Driver Station.</li>
          <li><code>hardwareMap.get(...)</code>: Connects your code to the hardware defined in the robot configuration file.</li>
          <li><code>rightMotor.setDirection(...)</code>: Ensures both sides spin in the correct direction.</li>
          <li><code>gamepad1.left_stick_y</code>: Reads the joystick value. We negate it because pushing forward gives a negative number.</li>
          <li><code>telemetry.addData(...)</code>: Sends useful info to the Driver Station.</li>
        </ul>

        <br />
        <h2>Tips</h2>
        <ul className="my-4">
          <li>Always test your motor directions. If your robot spins in place, one motor is likely reversed the wrong way.</li>
          <li>You can also try using the right stick for forward/backward control—it's up to you!</li>
          <li>If your robot doesn't move, check the configuration file to make sure the motor names match.</li>
        </ul>

        <br />
        <h2>Challenge: Add Turning</h2>
        <p>Try updating the code to allow turning with the left and right sticks:</p>
        <ul className="my-4">
          <li>Left stick Y for forward/backward</li>
          <li>Right stick X for turning</li>
        </ul>
        <p className="font-semibold mb-2">Hint: Combine the inputs like this:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`double drive = -gamepad1.left_stick_y;
double turn = gamepad1.right_stick_x;

double leftPower = drive + turn;
double rightPower = drive - turn;

leftMotor.setPower(leftPower);
rightMotor.setPower(rightPower);`}
          </SyntaxHighlighter>
        </div>
        <p>Then set the motor power to <code>leftPower</code> and <code>rightPower</code>.</p>

        <br />
        <h2>Recap</h2>
        <ul className="my-4">
          <li>In this lesson, you wrote a LinearOpMode that uses joystick input to control two drive motors.</li>
          <li>You learned how to access motors through the hardware map, read joystick values, and reverse motor direction for proper motion.</li>
        </ul>
        
        
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
