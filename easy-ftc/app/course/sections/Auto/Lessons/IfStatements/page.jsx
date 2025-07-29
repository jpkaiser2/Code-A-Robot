import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export const metadata = {
  title: "Creating Autonomous Routines with If Statements | EasyFTC",
};

export default function IfStatementsAuto() {
  const lessonPoints = 74;

  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Creating Autonomous Routines with If Statements</h1>

        <p>
          In this lesson, you'll learn how to make your autonomous code smarter by using <code>if</code> statements. These allow your robot to make decisions based on sensor inputs or game conditions instead of blindly following the same commands every time.
        </p>

        <br />
        <h2>Why Use If Statements?</h2>
        <p>In many autonomous routines, your robot needs to:</p>
        <ul className="my-4">
          <li>Do different things depending on what it detects</li>
          <li>Choose a parking spot based on a color or AprilTag (advanced; not covered in this course)</li>
          <li>Score in different junctions based on field layout</li>
          <li>React to last-minute setup changes</li>
        </ul>
        <p>
          <code>if</code> statements let your robot react and adapt to what it senses.
        </p>

        <br />
        <h2>The Basic If Statement</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`if (condition) {
    // code runs if the condition is true
}`}
          </SyntaxHighlighter>
        </div>
        <p>You can also use <code>else</code> and <code>else if</code> to check multiple conditions:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`if (condition1) {
    // runs if condition1 is true
} else if (condition2) {
    // runs if condition2 is true and condition1 is false
} else {
    // runs if neither condition is true
}`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Example: Parking Based on Distance Sensor</h2>
        <p>Let’s say your robot needs to park in one of three spots depending on the distance it detects in front of it.</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`double distance = sensor.getDistance(DistanceUnit.CM);

if (distance < 10) {
    // Spot 1
    driveForward(30);
} else if (distance < 30) {
    // Spot 2
    strafeLeft(20);
} else {
    // Spot 3
    strafeRight(20);
}`}
          </SyntaxHighlighter>
        </div>
        <p>This code checks the distance and decides which movement to perform based on that.</p>

        <br />
        <h2>Where to Put If Statements in Autonomous</h2>
        <p>You can use if statements:</p>
        <ul className="my-4">
          <li>Inside your <code>runOpMode()</code> method after <code>waitForStart()</code></li>
          <li>After initializing sensors</li>
          <li>At points where you want to make a decision</li>
        </ul>
        <p>Make sure sensor values are updated before using them:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`waitForStart();

// Read the sensor after start
double distance = sensor.getDistance(DistanceUnit.CM);

// Then decide what to do`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Tips</h2>
        <ul className="my-4">
          <li>Avoid putting sensor reads inside an <code>if</code> condition multiple times. Read once, store in a variable.</li>
          <li>Use <code>.equals()</code> to compare Strings, not <code>==</code>.</li>
          <li>You can nest <code>if</code> statements if needed, but don’t overcomplicate logic.</li>
          <li>Make sure your decision logic is tested and reliable before using it in competition.</li>
        </ul>
        <br />
        <h2>Running Different Autos Based on Alliance &amp; Position</h2>
        <p>
          A helpful way to organize your autonomous programs is based on your starting alliance color and position by creating separate files for each routine.
          This makes your code easier to manage and helps tournament officials quickly see which auto you’re using.
        </p>

        <h3>Why Use Separate Auto Files?</h3>
        <p>
          While it’s possible to select routines with code or dashboard input, it is recommended that each autonomous routine is clearly separated.
          This makes it easier to keep track of autos during testing and competition. It also negates the need for using the gamepad before the match starts.
        </p>

        <h3>Example File Structure</h3>
        <p>You can create different files like:</p>
        <ul className="my-4">
          <li><code>RedLeftAuto.java</code></li>
          <li><code>RedRightAuto.java</code></li>
          <li><code>BlueLeftAuto.java</code></li>
          <li><code>BlueRightAuto.java</code></li>
        </ul>
        <p>
          Each of these should extend <code>LinearOpMode</code> and have its own <code>@Autonomous</code> name.
        </p>
        <br />
        <h2>Recap</h2>
        <ul className="my-4">
          <li><code>if</code> statements help your robot make decisions during autonomous.</li>
          <li>You can use them with sensors like distance, color, or AprilTags.</li>
          <li>Read and store sensor values before using them in conditions.</li>
          <li><code>if</code>, <code>else if</code>, and <code>else</code> let you handle multiple possibilities.</li>
        </ul>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
