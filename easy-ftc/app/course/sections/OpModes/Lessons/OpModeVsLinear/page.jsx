import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';


export const metadata = {
  title: "LinearOpMode vs OpMode | EasyFTC",
};

export default function LinearVsOpMode() {
  // This lesson has 55 points
  const lessonPoints = 55;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>LinearOpMode vs OpMode</h1>

        <p>In FTC programming, there are two main types of OpModes you can write in Java: <b>OpMode</b> and <b>LinearOpMode</b>. Both are ways to control the robot during a match, but they work very differently. Choosing the right one depends on what you're trying to accomplish.</p>

        <br />
        <h2>What Is an OpMode?</h2>
        <p>
          An OpMode is just a program you write to tell the robot what to do. You select it from the Driver Station, press INIT to prepare the robot, and then PLAY to begin running your code.
        </p>
        <p>The FTC SDK gives you two main styles of OpModes:</p>
        <ul className="my-4">
          <li><b>OpMode (Iterative)</b> — sometimes called a "looping OpMode"</li>
          <li><b>LinearOpMode</b> — a step-by-step style</li>
        </ul>
        <p>Let’s break down the differences.</p>

        <br />
        <h2>OpMode (Iterative)</h2>
        <p>This is the “default” style in the SDK and the one used throughout this course.</p>
        <p>You extend the <code>OpMode</code> class and define two required methods:</p>
        <ul className="my-4">
          <li><code>init()</code> — runs once when INIT is pressed.</li>
          <li><code>loop()</code> — runs over and over again (about 50 times per second) after PLAY is pressed.</li>
        </ul>
        <p>Optional methods you can add:</p>
        <ul className="my-4">
          <li><code>init_loop()</code> — runs repeatedly after INIT is pressed, before PLAY.</li>
          <li><code>start()</code> — runs once when PLAY is pressed.</li>
          <li><code>stop()</code> — runs once when STOP is pressed.</li>
        </ul>
        <p>This style is ideal for:</p>
        <ul className="my-4">
          <li>Reacting to gamepad input in real-time (e.g., TeleOp)</li>
          <li>Writing programs that need to update frequently</li>
        </ul>
        <p>You control the behavior by storing "state" using variables and changing them between loop calls.</p>

        <br />
        <h2>LinearOpMode</h2>
        <p>A <b>LinearOpMode</b> lets you write your robot code in a straight line — one step after the next, like a recipe.</p>
        <p>You extend <code>LinearOpMode</code> and implement one required method:</p>
        <ul className="my-4">
          <li><code>runOpMode()</code> — all your robot code goes here.</li>
        </ul>
        <p className="font-semibold mb-2">Example:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`@Autonomous
public class MoveForwardAuto extends LinearOpMode {

    private DcMotor leftMotor;
    private DcMotor rightMotor;

    @Override
    public void runOpMode() throws InterruptedException {
        // Initialize hardware
        leftMotor = hardwareMap.get(DcMotor.class, "left_drive");
        rightMotor = hardwareMap.get(DcMotor.class, "right_drive");

        // Wait for the game to start (driver presses PLAY)
        waitForStart();

        // Move forward at half power for 2 seconds
        leftMotor.setPower(0.5);
        rightMotor.setPower(0.5);
        sleep(2000);

        // Stop motors
        leftMotor.setPower(0);
        rightMotor.setPower(0);
    }
}`}
          </SyntaxHighlighter>
        </div>
        <p>This approach is easier to read for simple sequences, like autonomous code that runs a few tasks in order.</p>
        <p>But it comes with limitations:</p>
        <ul className="my-4">
          <li>You can't react to real-time input as easily (like changing direction while a motor is moving)</li>
          <li>You can't use a <code>loop()</code> method — all control must happen in <code>runOpMode()</code></li>
          <li>No <code>start()</code>, <code>stop()</code>, or <code>init_loop()</code></li>
        </ul>

        <br />
        <h2>Pros and Cons</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Feature</th>
                <th className="px-4 py-2">OpMode (Iterative)</th>
                <th className="px-4 py-2">LinearOpMode</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">Looping behavior</td>
                <td className="px-4 py-2"><code>loop()</code> runs ~50 times/sec</td>
                <td className="px-4 py-2">You must write your own loops</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Real-time responsiveness</td>
                <td className="px-4 py-2">Excellent for TeleOp</td>
                <td className="px-4 py-2">Limited</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Code structure</td>
                <td className="px-4 py-2">Requires managing state variables</td>
                <td className="px-4 py-2">Straightforward, top-to-bottom</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Good for autonomous?</td>
                <td className="px-4 py-2">Yes, but needs more logic</td>
                <td className="px-4 py-2">Yes, often easier to read</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Good for teleop?</td>
                <td className="px-4 py-2">Yes</td>
                <td className="px-4 py-2">Not recommended</td>
              </tr>
            </tbody>
          </table>
        </div>

        <br />
        <h2>So Which One Should You Use?</h2>
        <ul className="my-4">
          <li>For <b>TeleOp</b>, always use <b>OpMode</b>. It gives you full control and responsiveness.</li>
          <li>For <b>Autonomous</b>, many teams start with <b>LinearOpMode</b> because it's easier to write and read. As you grow, you might switch to OpMode with states for more control and flexibility.</li>
        </ul>
        <p>In this course, we’ll mostly be using <b>OpMode</b> because it teaches you how to manage state and control the robot with precision. But you’ll still understand how <b>LinearOpMode</b> works and where it fits best.</p>

        <br />
        <h2>Recap</h2>
        <ul className="my-4">
          <li><b>OpMode</b> gives you a loop that runs constantly — great for live control and state-based programming.</li>
          <li><b>LinearOpMode</b> runs your code from top to bottom like a script — great for simple autonomous sequences.</li>
          <li>Understanding both gives you more power as a programmer.</li>
        </ul>
        
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
