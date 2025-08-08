import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";

export const metadata = {
  title: "Basic Components of Road Runner | EasyFTC",
};

export default function BasicComponentsRoadRunner() {
  const lessonPoints = 78;

  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Basic Components of Road Runner</h1>

        <p>By the end of this lesson, you'll be able to:</p>
        <ul className="my-4">
          <li>Recognize the main parts that make up a Road Runner program</li>
          <li>Understand the role of each part in making your robot move accurately</li>
          <li>See how these pieces fit together to form the bigger system</li>
        </ul>

        <br />
        <h2>1. Drive Class</h2>
        <p>
          The drive class is the central “control hub” of Road Runner’s code.
          If Road Runner is the brain of your robot, the drive class is the part that decides how to move and sends commands to the motors.
        </p>
        <p>
          In Road Runner 1.0, most mecanum-based robots use <code>SampleMecanumDrive</code> as their drive class. 
          This pre-made file already knows how to control a standard FTC mecanum drivetrain. 
          If you use a different drivetrain type, you may need a different drive class.
        </p>
        <p>What it does:</p>
        <ul className="my-4">
          <li>Connects Road Runner’s motion planning to your actual motors and sensors</li>
          <li>Provides methods for telling the robot to move in specific ways</li>
          <li>Stores important configuration details about your drivetrain</li>
        </ul>
        <p>You’ll use the drive class almost every time you work with Road Runner.</p>

        <h3>Side Note: What Is a Mecanum Drive?</h3>
        <p>
          A mecanum drive is a type of drivetrain that uses four special wheels with rollers angled at 45 degrees.
          This allows the robot to:
        </p>
        <ul className="my-4">
          <li>Drive forward and backward</li>
          <li>Strafe (move sideways) without turning</li>
          <li>Move diagonally</li>
          <li>Rotate in place</li>
        </ul>
        <p>
          By spinning the wheels in different directions and speeds, the robot can move in any direction without changing its facing direction.
          Mecanum drive is very popular in FTC because it offers high maneuverability in both autonomous and teleop.
        </p>
        <div className="flex flex-col items-center my-4">
          <img src="/images/RRComponents/mecanum.png" alt="Mecanum Drive" className="w-full max-w-xl rounded shadow mb-2" />
          <p><em>Image credit: GoBilda</em></p>
        </div>
        

        <br />
        <h2>2. Pose and Pose2d</h2>
        <p>
          Road Runner always needs to know where the robot is on the field. To do this, it uses a “pose,” which contains:
        </p>
        <ul className="my-4">
          <li><strong>X position</strong> – left/right position on the field</li>
          <li><strong>Y position</strong> – forward/back position on the field</li>
          <li><strong>Heading</strong> – which way the robot is facing (rotation)</li>
        </ul>
        <p>
          These three values are stored together in a special object called <code>Pose2d</code>. 
          Think of it like a GPS coordinate system for your robot, tracking both position and direction at all times.
        </p>

        <br />
        <h2>3. Trajectory</h2>
        <p>
          A trajectory is a plan for how the robot should move from one point to another. 
          It can include curves, turns, and multiple segments.
        </p>
        <p>When creating a trajectory, you specify:</p>
        <ul className="my-4">
          <li>Where the robot starts</li>
          <li>Where it should go</li>
          <li>How it should get there (straight lines, arcs, strafes, etc.)</li>
        </ul>
        <p>
          Road Runner then calculates the speeds and turns needed to follow that path smoothly and precisely.
        </p>

        <br />
        <h2>4. Localization</h2>
        <p>
          Localization is how Road Runner figures out the robot’s current position as it moves.
          It uses sensors such as:
        </p>
        <ul className="my-4">
          <li>Encoders – measure how far the wheels have turned</li>
          <li>IMU (Inertial Measurement Unit) – measures rotation</li>
        </ul>
        <p>
          By reading these sensors continuously, Road Runner keeps an updated estimate of the robot’s position.
          If localization is inaccurate, the robot’s movements won’t match the planned trajectory.
        </p>

        <br />
        <h2>5. Motion Planning</h2>
        <p>
          Motion planning is the process of figuring out the best way to get from point A to point B. 
          Road Runner does this by:
        </p>
        <ul className="my-4">
          <li>Creating smooth paths instead of jerky movements</li>
          <li>Respecting speed and acceleration limits</li>
          <li>Coordinating turning and driving into one continuous flow</li>
        </ul>
        <p>
          You don’t have to calculate this yourself—Road Runner handles it automatically based on the constraints you set.
        </p>

        <br />
        <h2>6. Tuning Parameters</h2>
        <p>
          Before Road Runner can work well, you must tune it to match your specific robot.
          This involves providing:
        </p>
        <ul className="my-4">
          <li>Drive constants – track width, wheel radius, encoder ticks per revolution</li>
          <li>Speed limits – max velocity and acceleration</li>
          <li>Control adjustments – PID values for accuracy</li>
        </ul>
        <p>
          Without proper tuning, your robot may overshoot, undershoot, or drift off course.
        </p>

        <br />
        <h2>Recap</h2>
        <ul className="my-4">
          <li><strong>Drive class</strong> – Connects Road Runner to your hardware and controls movement</li>
          <li><strong>Pose2d</strong> – Stores robot position and heading</li>
          <li><strong>Trajectory</strong> – Planned path for the robot to follow</li>
          <li><strong>Localization</strong> – Tracks the robot’s position in real time</li>
          <li><strong>Motion planning</strong> – Calculates smooth and safe movement paths</li>
          <li><strong>Tuning</strong> – Matches Road Runner settings to your robot’s details</li>
          <li><strong>Mecanum drive</strong> – Allows full omnidirectional movement</li>
        </ul>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
