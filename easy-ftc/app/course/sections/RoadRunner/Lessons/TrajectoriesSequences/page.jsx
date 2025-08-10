import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const metadata = {
  title: "Creating Trajectories and Sequences | EasyFTC",
};

export default function CreatingTrajectoriesAndSequences() {
  const lessonPoints = 79;

  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Creating Trajectories and Sequences</h1>

        <p>By the end of this lesson, you’ll be able to:</p>
        <ul className="my-4">
          <li>Understand what a trajectory is in Road Runner</li>
          <li>Build single and multiple movement paths</li>
          <li>Use trajectory sequences to make smooth, chained movements in autonomous</li>
        </ul>

        <br />
        <h2>What Is a Trajectory?</h2>
        <p>
          In Road Runner, a <strong>trajectory</strong> is a set of instructions for your robot’s movement from one point to another.
          A trajectory defines:
        </p>
        <ul className="my-4">
          <li>The path (straight line, curve, spline, etc.)</li>
          <li>The speed and acceleration limits</li>
          <li>The smoothness of the movement</li>
        </ul>
        <p>
          Think of it like Google Maps for your robot — you give it a starting point and a goal, and it figures out the path and instructions.
        </p>

        <br />
        <h2>The Trajectory Builder</h2>
        <p>You create a trajectory using Road Runner’s <code>trajectoryBuilder()</code> method.</p>
        <h3>Basic Structure:</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`Trajectory traj = drive.trajectoryBuilder(startPose)
    // movement commands here
    .build();`}
          </SyntaxHighlighter>
        </div>
        <ul className="my-4">
          <li><code>startPose</code> is a <code>Pose2d</code> that tells Road Runner the starting location and heading</li>
          <li>Chain movement methods (like <code>.forward()</code>, <code>.strafeLeft()</code>) inside the builder</li>
          <li><code>.build()</code> finalizes and returns the trajectory</li>
        </ul>

        <h3>Example:</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`Pose2d startPose = new Pose2d(0, 0, Math.toRadians(0));
drive.setPoseEstimate(startPose);

Trajectory traj = drive.trajectoryBuilder(startPose)
    .forward(30)
    .build();`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Running a Trajectory</h2>
        <p>
          Once built, you run a trajectory using:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`drive.followTrajectory(traj);`}
          </SyntaxHighlighter>
        </div>
        <p>Road Runner will handle movement and localization automatically.</p>

        <br />
        <h2>Common Movement Methods</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Method</th>
                <th className="border border-gray-300 px-4 py-2">What It Does</th>
                <th className="border border-gray-300 px-4 py-2">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code>.forward(distance)</code></td>
                <td className="border border-gray-300 px-4 py-2">Move forward</td>
                <td className="border border-gray-300 px-4 py-2"><code>.forward(24)</code></td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code>.back(distance)</code></td>
                <td className="border border-gray-300 px-4 py-2">Move backward</td>
                <td className="border border-gray-300 px-4 py-2"><code>.back(12)</code></td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code>.strafeLeft(distance)</code></td>
                <td className="border border-gray-300 px-4 py-2">Move left</td>
                <td className="border border-gray-300 px-4 py-2"><code>.strafeLeft(18)</code></td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code>.strafeRight(distance)</code></td>
                <td className="border border-gray-300 px-4 py-2">Move right</td>
                <td className="border border-gray-300 px-4 py-2"><code>.strafeRight(18)</code></td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code>.turn(radians)</code></td>
                <td className="border border-gray-300 px-4 py-2">Rotate in place</td>
                <td className="border border-gray-300 px-4 py-2"><code>.turn(Math.toRadians(90))</code></td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code>.lineToLinearHeading(pose)</code></td>
                <td className="border border-gray-300 px-4 py-2">Straight line to a specific pose</td>
                <td className="border border-gray-300 px-4 py-2"><code>.lineToLinearHeading(new Pose2d(24, 24, Math.toRadians(90)))</code></td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code>.splineTo(position, heading)</code></td>
                <td className="border border-gray-300 px-4 py-2">Smooth curve to a position/heading</td>
                <td className="border border-gray-300 px-4 py-2"><code>.splineTo(new Vector2d(36, 36), Math.toRadians(0))</code></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2">Note: Distances are in inches, angles in radians.</p>

        <br />
        <h2>Trajectory Sequences</h2>
        <p>
          A <strong>trajectory sequence</strong> links multiple movements into one smooth plan.
        </p>
        <h3>Without sequences:</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`drive.followTrajectory(traj1);
drive.followTrajectory(traj2);`}
          </SyntaxHighlighter>
        </div>
        <h3>With sequences:</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`TrajectorySequence seq = drive.trajectorySequenceBuilder(startPose)
    .forward(24)
    .turn(Math.toRadians(90))
    .strafeLeft(12)
    .back(18)
    .build();

drive.followTrajectorySequence(seq);`}
          </SyntaxHighlighter>
        </div>
        <p>This removes pauses and makes the robot flow naturally between actions.</p>

        <br />
        <h2>Best Practices</h2>
        <ul className="my-4">
          <li>Always set your starting pose at the beginning of autonomous with <code>setPoseEstimate()</code></li>
          <li>Start simple — test with short movements first</li>
          <li>Watch your units — inches for distance, radians for angles</li>
          <li>Slow down when testing; increase speed after confirming accuracy</li>
          <li>Use comments to label movement sections</li>
        </ul>

        <br />
        <h2>Full Example: Autonomous with a Trajectory Sequence</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`@Autonomous(name = "Road Runner Trajectory Example")
public class RRTrajectoryExample extends LinearOpMode {

    @Override
    public void runOpMode() {
        SampleMecanumDrive drive = new SampleMecanumDrive(hardwareMap);

        Pose2d startPose = new Pose2d(0, 0, Math.toRadians(0));
        drive.setPoseEstimate(startPose);

        TrajectorySequence mySequence = drive.trajectorySequenceBuilder(startPose)
            .forward(24)
            .turn(Math.toRadians(90))
            .strafeLeft(12)
            .back(18)
            .splineTo(new Vector2d(36, 36), Math.toRadians(0))
            .build();

        waitForStart();
        if (isStopRequested()) return;

        drive.followTrajectorySequence(mySequence);
    }
}`}
          </SyntaxHighlighter>
        </div>
        <p><strong>What this does:</strong></p>
        <ul className="my-4">
          <li>Starts at (0, 0) facing forward</li>
          <li>Moves forward 24 inches</li>
          <li>Turns 90°</li>
          <li>Strafes left 12 inches</li>
          <li>Moves backward 18 inches</li>
          <li>Curves smoothly to (36, 36)</li>
        </ul>

        <br />
        <h2>Recap</h2>
        <ul className="my-4">
          <li><strong>Trajectory</strong> = single path for the robot</li>
          <li><strong>Trajectory Builder</strong> = create individual paths</li>
          <li><strong>Trajectory Sequence</strong> = chain multiple paths smoothly</li>
          <li>Always set the starting pose before building paths</li>
          <li>Test in small steps before creating complex sequences</li>
        </ul>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
