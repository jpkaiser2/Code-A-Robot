import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export const metadata = {
  title: "Using Mechanisms in Trajectories | EasyFTC",
};

export default function UsingMechanismsInTrajectories() {
  const lessonPoints = 81;

  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Using Mechanisms in Trajectories</h1>

        <p>By the end of this lesson, you will be able to:</p>
        <ul className="my-4">
          <li>
            Understand how to control mechanisms alongside movement using Road
            Runner 1.0’s Action-based system
          </li>
          <li>Create a simple custom Action for a mechanism</li>
          <li>
            Combine drivetrain and mechanism actions in a single autonomous
            routine
          </li>
        </ul>

        <br />
        <h2>Why Use Mechanisms in Trajectories?</h2>
        <p>
          In most FTC autonomous routines, your robot needs to do more than just
          move. For example, you might:
        </p>
        <ul className="my-4">
          <li>Close your claw before driving away</li>
          <li>
            Open your claw to release a game element after reaching the target
          </li>
          <li>Coordinate movement with mechanism actions to save time</li>
          <li>Score game elements</li>
        </ul>
        <p>
          Road Runner 1.0 makes this possible by treating both movement and
          mechanisms as <strong>Actions</strong>.
        </p>

        <br />
        <h2>How Actions Work</h2>
        <ul className="my-4">
          <li>An Action is any task the robot performs until it finishes</li>
          <li>
            A trajectory from the <code>TrajectoryActionBuilder</code> is an
            Action
          </li>
          <li>
            A custom mechanism control (like closing a claw) can also be an
            Action
          </li>
        </ul>
        <p>An Action must have a <code>run()</code> method that:</p>
        <ul className="my-4">
          <li>Runs repeatedly during autonomous</li>
          <li>Returns true while it is still running</li>
          <li>Returns false when it is done</li>
        </ul>

        <br />
        <h2>Writing a Mechanism as an Action</h2>
        <p>
          Suppose you have a claw servo named <code>claw</code> in your hardware
          map. We want to make an Action that closes it, waits briefly for it to
          move, and then finishes.
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class ClawCloseAction implements Action {
    private Servo clawServo;             // The servo that controls the claw
    private boolean initialized = false; // Tracks if we have started the action yet
    private long startTime;               // Records the time when the claw started moving

    public ClawCloseAction(Servo clawServo) {
        this.clawServo = clawServo;
    }

    @Override
    public boolean run(@NonNull TelemetryPacket packet) {
        if (!initialized) {
            clawServo.setPosition(1.0); // Move claw to the closed position
            startTime = System.currentTimeMillis(); // Record the start time
            initialized = true;          // Mark action as started
        }

        // Keep running until 500 ms have passed, then finish
        return System.currentTimeMillis() - startTime < 500;
    }
}`}
          </SyntaxHighlighter>
        </div>
        <p>How it works:</p>
        <ul className="my-4">
          <li>
            On the first call to <code>run()</code>, the claw closes and the
            start time is recorded
          </li>
          <li>
            For the next 500 ms, the method returns true so the action continues
            running
          </li>
          <li>
            After that, it returns false so Road Runner moves to the next action
          </li>
        </ul>

        <br />
        <h2>Adding Mechanism Actions to a Trajectory Sequence</h2>
        <p>
          Here is how to use the claw Action in an autonomous program with Road
          Runner:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`@Autonomous
public class AutoWithClaw extends LinearOpMode {
    @Override
    public void runOpMode() throws InterruptedException {
        MecanumDrive drive = new MecanumDrive(hardwareMap); // Your drive system
        Servo clawServo = hardwareMap.get(Servo.class, "claw"); // Map the claw servo

        waitForStart();

        Pose2d startPose = new Pose2d(0, 0, 0); // Starting position of the robot
        drive.setPoseEstimate(startPose);       // Tell Road Runner where the robot is starting

        // Create a simple trajectory to move forward 24 inches using lineToX()
        Action driveForward = drive.actionBuilder(startPose)
            .lineToX(24)
            .build();

        // Create a claw close action
        Action closeClaw = new ClawCloseAction(clawServo);

        // Run the actions in sequence: close claw, then drive forward
        Actions.runBlocking(
            new SequentialAction(
                closeClaw,      // Step 1: Close claw
                driveForward    // Step 2: Drive forward
            )
        );
    }
}`}
          </SyntaxHighlighter>
        </div>
        <p>This sequence:</p>
        <ul className="my-4">
          <li>Closes the claw</li>
          <li>Waits 500 ms for it to move</li>
          <li>Drives forward until the robot reaches x = 24 inches</li>
        </ul>

        <br />
        <h2>Running Mechanisms During Movement</h2>
        <p>
          You can also run the claw while the robot moves using a{" "}
          <code>ParallelAction</code>:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`// Run the drive forward and close claw at the same time
Action moveAndClose = new ParallelAction(
    drive.actionBuilder(startPose)
        .lineToX(24)
        .build(),
    closeClaw // Close claw while moving
);

// Run both actions
Actions.runBlocking(moveAndClose);`}
          </SyntaxHighlighter>
        </div>
        <p>This will:</p>
        <ul className="my-4">
          <li>Start closing the claw</li>
          <li>Drive forward at the same time</li>
        </ul>

        <br />
        <h2>Step-by-Step for Your Own Mechanisms</h2>
        <ol className="my-4 list-decimal list-inside">
          <li>Identify what your mechanism needs to do</li>
          <li>Create an Action class for that mechanism</li>
          <li>
            In <code>run()</code>, set the mechanism’s position or power when it
            starts
          </li>
          <li>
            Keep returning true until it is done (time delay or sensor check)
          </li>
          <li>Return false to finish the Action</li>
          <li>
            Combine it with trajectories using <code>SequentialAction</code> or{" "}
            <code>ParallelAction</code>
          </li>
        </ol>

        <br />
        <h2>Recap</h2>
        <ul className="my-4">
          <li>
            Actions allow you to control mechanisms and movement in the same
            system
          </li>
          <li>A mechanism Action runs repeatedly until it is done</li>
          <li>
            Use <code>SequentialAction</code> for step-by-step control, or{" "}
            <code>ParallelAction</code> to multitask
          </li>
          <li>
            The claw servo example can be adapted for any mechanism in your
            robot
          </li>
        </ul>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
