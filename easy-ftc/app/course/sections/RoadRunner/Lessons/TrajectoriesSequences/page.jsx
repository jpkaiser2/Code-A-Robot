import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';


export const metadata = {
  title: "Creating Trajectories | EasyFTC",
};

export default function CreatingTrajectoriesAndSequences() {
  // This lesson has 79 points
  const lessonPoints = 79;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Creating Trajectories</h1>

        <p>By the end of this lesson, you will be able to:</p>
        <ul className="my-4">
          <li>Understand what a trajectory is in Road Runner 1.0</li>
          <li>Build movement paths using <code>TrajectoryActionBuilder</code></li>
          <li>Know what a <code>Pose2d</code> is and why it matters</li>
          <li>Run drive and mechanism actions with <code>Actions.runBlocking(...)</code></li>
          <li>Chain multiple movements into complete autonomous routines</li>
          <li>Debug and fine-tune your trajectories for accuracy</li>
        </ul>

        <br />
        <h2>What is a Trajectory in Road Runner?</h2>
        <p>
          A trajectory is a planned, smooth path your robot follows while respecting physical limits like speed, acceleration, and turn rate. In Road Runner 1.0, you create an <code>Action</code> using <code>TrajectoryActionBuilder</code> and run it.
        </p>
        <p>Road Runner automatically manages:</p>
        <ul className="my-4">
          <li><strong>Path shape</strong>: straight lines, strafes, and smooth curves (splines)</li>
          <li><strong>Velocity and acceleration</strong>: adjusts to stay within constraints</li>
          <li><strong>Heading control</strong>: maintain heading, rotate in place, or smoothly turn</li>
        </ul>
        <p>This lets you focus on <em>where</em> you want the robot to go instead of manually controlling motors.</p>

        <br />
        <h2>What is a Pose2d?</h2>
        <p>
          A pose represents the robot’s location and facing direction at a moment in time. Road Runner uses <code>Pose2d</code> objects to know where the robot starts and to track it during movement.
        </p>
        <ul className="my-4">
          <li><strong>X</strong>: side-to-side position in inches</li>
          <li><strong>Y</strong>: forward/backward position in inches</li>
          <li><strong>Heading</strong>: rotation in radians, counterclockwise from the field’s X-axis</li>
        </ul>
        <p>If your starting <code>Pose2d</code> is wrong, all subsequent paths will be off.</p>
        <p><strong>Tip:</strong> Use field coordinates that match your actual FTC field setup.</p>

        <br />
        <h2>Building with TrajectoryActionBuilder</h2>
        <p>
          There are no <code>.forward()</code> or <code>.back()</code> helpers in 1.0. Instead, you use position-based methods to build precise movements.
        </p>
        <h3>General Process:</h3>
        <ol className="my-4 list-decimal ml-6">
          <li>Measure your start pose: Stand your robot at the starting tile and measure X, Y, and heading.</li>
          <li>Create a <code>Pose2d</code>: Store those values in code.</li>
          <li>Initialize your drive: Pass <code>hardwareMap</code> and <code>startPose</code> into your drive class.</li>
          <li>Create a builder: Call <code>drive.actionBuilder(startPose)</code>.</li>
          <li>Add movement segments: Use methods like <code>.lineToX()</code>, <code>.lineToY()</code>, <code>.strafeTo()</code>, <code>.splineTo()</code>, <code>.turn()</code>, <code>.waitSeconds()</code>.</li>
          <li>Build the action: Call <code>.build()</code> to finalize.</li>
          <li>Run the action: Use <code>Actions.runBlocking(...)</code>.</li>
        </ol>

        <br />
        <h3>Basic Example</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`Pose2d startPose = new Pose2d(0, 0, Math.toRadians(90));
MecanumDrive drive = new MecanumDrive(hardwareMap, startPose);

TrajectoryActionBuilder tab = drive.actionBuilder(startPose)
        .lineToY(24)
        .turn(Math.toRadians(90))
        .strafeTo(new Vector2d(24, 24))
        .waitSeconds(1.0);

Action path = tab.build();
Actions.runBlocking(path);`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Step-by-Step Example</h2>
        <ol className="my-4 list-decimal ml-6">
          <li>
            <strong>Define the start pose</strong>
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`Pose2d startPose = new Pose2d(12, 60, Math.toRadians(90));`}
              </SyntaxHighlighter>
            </div>
            <ul className="my-4">
              <li>12 inches from left wall</li>
              <li>60 inches forward from bottom wall</li>
              <li>Facing north (90°)</li>
            </ul>
          </li>
          <li>
            <strong>Initialize drive</strong>
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`MecanumDrive drive = new MecanumDrive(hardwareMap, startPose);`}
              </SyntaxHighlighter>
            </div>
          </li>
          <li>
            <strong>Start a builder</strong>
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`TrajectoryActionBuilder tab = drive.actionBuilder(startPose);`}
              </SyntaxHighlighter>
            </div>
          </li>
          <li>
            <strong>Add movements</strong>
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`tab.lineToY(36)                          
   .turn(Math.toRadians(-90))            
   .strafeTo(new Vector2d(24, 36))       
   .waitSeconds(0.5);`}
              </SyntaxHighlighter>
            </div>
          </li>
          <li>
            <strong>Finalize path</strong>
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`Action path = tab.build();`}
              </SyntaxHighlighter>
            </div>
          </li>
          <li>
            <strong>Run the path</strong>
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`Actions.runBlocking(path);`}
              </SyntaxHighlighter>
            </div>
          </li>
          <li>
            <strong>Extend from end</strong>
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`Action extraPath = tab.endTrajectory().fresh()
        .strafeTo(new Vector2d(48, 12))
        .build();
Actions.runBlocking(extraPath);`}
              </SyntaxHighlighter>
            </div>
          </li>
          <li>Create multiple builders for branching autonomous options.</li>
        </ol>

        <br />
        <h2>Common Methods</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Method</th>
                <th className="border border-gray-300 px-4 py-2">Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code>.lineToX(x)</code> / <code>.lineToY(y)</code></td>
                <td className="border border-gray-300 px-4 py-2">Move straight to coordinate</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code>.lineToXSplineHeading(x, hdg)</code> / <code>.lineToYSplineHeading(y, hdg)</code></td>
                <td className="border border-gray-300 px-4 py-2">Spline to X/Y with heading</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code>.strafeTo(Vector2d p)</code></td>
                <td className="border border-gray-300 px-4 py-2">Move sideways to position</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code>.splineTo(Vector2d p, hdg)</code></td>
                <td className="border border-gray-300 px-4 py-2">Smooth curve to position and heading</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code>.turn(angleRad)</code></td>
                <td className="border border-gray-300 px-4 py-2">Rotate robot in place</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code>.setTangent(angleRad)</code></td>
                <td className="border border-gray-300 px-4 py-2">Set direction for next segment</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code>.waitSeconds(t)</code></td>
                <td className="border border-gray-300 px-4 py-2">Pause for t seconds</td>
              </tr>
            </tbody>
          </table>
        </div>

        <br />
        <h2>Good Habits</h2>
        <ul className="my-4">
          <li>Match starting pose to actual robot position</li>
          <li>Test short segments before full routines</li>
          <li>Keep units consistent (inches, radians)</li>
          <li>Tune drive settings before relying on accuracy</li>
          <li>Build paths during init for instant start</li>
        </ul>

        <br />
        <h2>Recap</h2>
        <ul className="my-4">
          <li><code>Pose2d</code> holds your robot’s X, Y, and heading</li>
          <li>Use <code>TrajectoryActionBuilder</code> to chain precise movements</li>
          <li>Run with <code>Actions.runBlocking(...)</code></li>
          <li>Extend with <code>.endTrajectory().fresh()</code> for continued motion</li>
          <li>Use branching to adapt autonomous to real-time conditions</li>
        </ul>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
