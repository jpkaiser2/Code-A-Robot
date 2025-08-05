import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";

export const metadata = {
  title: "What Is Road Runner? | EasyFTC",
};

export default function RoadRunnerIntro() {
  const lessonPoints = 76;

  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>What Is Road Runner?</h1>

        <p>
          Road Runner is a powerful tool that helps your FTC robot move more smoothly
          and precisely during autonomous. Instead of basic commands like
          <strong> "drive forward"</strong> or <strong>"turn right"</strong>, Road Runner lets
          you create full paths for your robot to follow, including curves,
          lines, and turns.
        </p>

        <p>
          If you’ve ever written autonomous code that feels jerky, stops and
          starts a lot, or doesn’t always end up in the right place, Road
          Runner is here to fix that.
        </p>

        <h2>Why Use Road Runner?</h2>
        <p>Most teams start with chained motor commands, but this has limits:</p>
        <ul className="my-4">
          <li>Hard to go in smooth curves or diagonal paths</li>
          <li>Robot might drift off course or overshoot turns</li>
          <li>Changing your route means rewriting lots of code</li>
          <li>No easy way to control speed or smoothness</li>
        </ul>

        <p>Road Runner solves these problems. It gives you:</p>
        <ul className="my-4">
          <li><strong>Smooth movement</strong> – glides through curves and turns</li>
          <li><strong>Accurate paths</strong> – you specify where to go, it handles the how</li>
          <li><strong>Real-time correction</strong> – auto-fixes drift or slippage</li>
          <li><strong>Less code</strong> – write more advanced autos with fewer lines</li>
        </ul>

        <h2>How It Works</h2>
        <ul className="my-4">
          <li><strong>You define a path:</strong> Tell Road Runner where to go (e.g. forward 30 in, then curve left).</li>
          <li><strong>It generates a trajectory:</strong> A plan with speed + direction over time.</li>
          <li><strong>It follows it automatically:</strong> Continuously checks your position and adjusts motors to stay on track.</li>
        </ul>

        <h2>What Does Road Runner Need?</h2>
        <ul className="my-4">
          <li>A drive class that connects Road Runner to your motors</li>
          <li>Encoders + IMU to track movement and orientation</li>
          <li>Setup code with library imports, wheel size, track width, and speed limits</li>
        </ul>
        <p>(We’ll walk you through all of this step-by-step later.)</p>

        <h2>What Version Are We Using?</h2>
        <p>
          This course teaches <strong>Road Runner 1.0</strong>, the most beginner-friendly and stable version.
        </p>
        <p>
          Official docs: <a href="https://rr.brott.dev/docs/v1-0/installation/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Road Runner 1.0 Documentation</a>
        </p>

        <h2>When Should You Use Road Runner?</h2>
        <ul className="my-4">
          <li>You want to follow curves or diagonal paths</li>
          <li>You want smooth motion instead of jerky starts/stops</li>
          <li>You want to score multiple game pieces in one run</li>
          <li>You want to park accurately</li>
          <li>You want to run advanced autonomous routines with less code</li>
        </ul>

        <p>
          Even if you’re just starting out, Road Runner is worth learning—your code will be better, and your robot will drive like a pro.
        </p>

        <h2>Recap</h2>
        <ul className="my-4">
          <li>Road Runner helps your robot move smoothly and accurately in autonomous</li>
          <li>It replaces basic drive commands with complete paths (trajectories)</li>
          <li>This course uses Road Runner 1.0</li>
          <li>It’s great for complex routines, curved paths, and precision</li>
          <li>It saves time and makes your code easier to write and maintain</li>
        </ul>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
