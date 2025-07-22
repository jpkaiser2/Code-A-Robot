import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';


export const metadata = {
  title: "Creating Your First OpMode | EasyFTC",
};

export default function FirstOpMode() {
  // This lesson has 54 points
  const lessonPoints = 54;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Creating Your First OpMode</h1>

        <p>By the end of this lesson, you'll be able to:</p>
        <ul className="my-4">
          <li>Understand what an OpMode is in FTC</li>
          <li>Create a simple OpMode that sends data to the Driver Station</li>
          <li>Navigate the structure and parts of an FTC OpMode</li>
        </ul>

        <br />
        <h2>What Is an OpMode?</h2>
        <p>
          An OpMode is a Java program that runs on your robot during a match. You can think of it as your robot's "main function"—it's what actually executes when you press INIT and PLAY on the Driver Station.
        </p>
        <ul className="my-4">
          <li><b>@TeleOp</b>: For driver-controlled periods</li>
          <li><b>@Autonomous</b>: For pre-programmed autonomous routines</li>
        </ul>
        <p>We'll focus on <b>@TeleOp</b> for now.</p>

        <br />
        <h2>Anatomy of an OpMode</h2>
        <p>Every OpMode must extend a base class from the FTC SDK. The simplest one to start with is <code>OpMode</code>. Here's the general structure:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`@TeleOp
public class MyOpMode extends OpMode {
    
    @Override
    public void init() {
        // Code that runs once when INIT is pressed
    }

    @Override
    public void loop() {
        // Code that runs repeatedly after PLAY is pressed
    }
}`}
          </SyntaxHighlighter>
        </div>
        <p>There are also optional methods you can include:</p>
        <ul className="my-4">
          <li><code>init_loop()</code>: Runs continuously between INIT and PLAY</li>
          <li><code>start()</code>: Runs once when PLAY is pressed</li>
          <li><code>stop()</code>: Runs once when STOP is pressed</li>
        </ul>
        <p>But you only need <code>init()</code> and <code>loop()</code> to begin.</p>

        <br />
        <h2>Writing Your First OpMode: Hello World</h2>
        <p>Let’s write a simple program that displays “Hello, World!” on the Driver Station screen:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.OpMode;
import com.qualcomm.robotcore.eventloop.opmode.TeleOp;

@TeleOp
public class HelloWorldOpMode extends OpMode {

    @Override
    public void init() {
        telemetry.addData("Hello", "World");
    }

    @Override
    public void loop() {
        // Nothing to repeat yet
    }
}`}
          </SyntaxHighlighter>
        </div>
        <ul className="my-4">
          <li><b>@TeleOp</b> tells the SDK to include this in the TeleOp list on the Driver Station.</li>
          <li><code>telemetry.addData()</code> sends messages to the Driver Station screen. Think of it like <code>System.out.println()</code> but for the Driver Station.</li>
          <li>We use <code>init()</code> to send the message once when INIT is pressed on the Driver Station.</li>
        </ul>

        <br />
        <h2>Running Your OpMode</h2>
        <ol className="my-4 list-decimal list-inside">
          <li>Connect your Control Hub or Robot Controller phone to your computer.</li>
          <li>Press the green play arrow in Android Studio to deploy the code.</li>
          <li>On the Driver Station, select the OpMode from the TeleOp list.</li>
          <li>Press INIT → You should see "Hello: World" on the screen.</li>
        </ol>

        <br />
        <h2>Common Pitfalls</h2>
        <ul className="my-4">
          <li>Be sure to include <b>@TeleOp</b> or <b>@Autonomous</b>. Otherwise, your OpMode won't show up on the Driver Station.</li>
          <li>Java is case-sensitive. <code>Loop</code> and <code>loop</code> are not the same.</li>
          <li>Forgetting semicolons (<code>;</code>) or missing curly braces (<code>{}</code>) are common beginner mistakes.</li>
        </ul>

        <h2>Recap</h2>
        <ul className="my-4">
          <li>An OpMode is a Java class that tells your FTC robot what to do.</li>
          <li>You must use <b>@TeleOp</b> or <b>@Autonomous</b> to register your OpMode.</li>
          <li>All OpModes must implement <code>init()</code> and <code>loop()</code> methods.</li>
          <li><code>telemetry.addData()</code> is how you send debug messages to the Driver Station.</li>
          <li>Use Android Studio to write, upload, and run your code.</li>
          <li>Start simple, test often, and build up your skills from here.</li>
        </ul>
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
