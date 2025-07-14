import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const metadata = {
  title: "FTC Programming Options | EasyFTC",
};

export default function Options() {
  // This lesson has 51 points
  const lessonPoints = 51;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>FTC Programming Options</h1>

        <h2>Objectives</h2>
        <p>By the end of this lesson, you will:</p>
        <ul className="my-4">
          <li>Understand the difference between TeleOp and Autonomous modes in FTC</li>
          <li>Know what each mode is used for during a match</li>
          <li>Learn the three ways to write FTC programs (Blocks, OnBot Java, Android Studio)</li>
          <li>See how this course uses Java with the FTC SDK</li>
        </ul>

        <br />
        <h2>The Two Modes: TeleOp and Autonomous</h2>
        <p>
          Your robot needs two types of programs: one for the Autonomous period and one for the TeleOp period.
        </p>

        <br />
        <h3>Autonomous Mode</h3>
        <ul className="my-4">
          <li><strong>When?</strong> The first 30 seconds of a match</li>
          <li><strong>Controlled by?</strong> Code only (no driver input allowed)</li>
          <li><strong>What happens?</strong> The robot follows a pre-programmed routine</li>
        </ul>
        <p>
          During Autonomous, the robot must complete tasks by itself without any help from the drivers. You usually use a mix of timed actions and sensor input to score, detect zones, or park.
        </p>
        <p className="font-semibold mb-2">Examples:</p>
        <ul className="my-4">
          <li>Drive off the starting tile</li>
          <li>Detect an AprilTag</li>
          <li>Drop a game element into the correct scoring zone</li>
          <li>Park in a designated area</li>
        </ul>
        <p>This mode is all about strategy, planning, and precision.</p>

        <br />
        <h3>TeleOp Mode</h3>
        <ul className="my-4">
          <li><strong>When?</strong> The 2-minute driver-controlled portion of the match</li>
          <li><strong>Controlled by?</strong> Gamepads held by drivers</li>
          <li><strong>What happens?</strong> The robot responds to driver commands in real time</li>
        </ul>
        <p>
          In TeleOp, you use code to map gamepad inputs to robot actions. The robot does exactly what the drivers tell it to do.
        </p>
        <p className="font-semibold mb-2">Examples:</p>
        <ul className="my-4">
          <li>Joysticks control the drivetrain</li>
          <li>Triggers move an arm or lift</li>
          <li>Buttons open/close a claw</li>
        </ul>
        <p>This mode is all about responsiveness and control. You'll still need clean code and smart logic, but in real time.</p>

        <br />
        <h2>How FTC Code Is Written</h2>
        <p>
          FTC supports three different ways to write programs, depending on your experience level and team goals. They all use the same robot hardware, but offer different environments for writing the code.
        </p>

        <br />
        <h3>1. Blocks (Beginner-Friendly Visual Programming)</h3>
        <ul className="my-4">
          <li>Uses a drag-and-drop interface</li>
          <li>Based on MIT App Inventor</li>
          <li>No need to type or install anything</li>
          <li>Good for learning logic and basic programming flow</li>
        </ul>
        <p className="flex items-start">
          <span className="text-yellow-500 text-xl mr-2">💡</span>
          <span>This course does not use Blocks due to its limitations, but some teams start here and move into Java.</span>
        </p>

        <br />
        <h3>2. OnBot Java</h3>
        <ul className="my-4">
          <li>Java code written directly in a web browser</li>
          <li>No software installation required</li>
          <li>Saves and runs directly on the Control Hub or Robot Controller phone</li>
          <li>Great for early Java learners and quick testing</li>
        </ul>
        <p className="font-semibold mb-2">Pros:</p>
        <ul className="my-4">
          <li>Easy to set up</li>
          <li>Great for trying small programs</li>
        </ul>
        <p className="font-semibold mb-2">Cons:</p>
        <ul className="my-4">
          <li>Limited features (e.g., no Git, limited autocomplete)</li>
          <li>Harder to manage larger projects</li>
        </ul>

        <br />
        <h3>3. Android Studio (Professional Java Environment)</h3>
        <ul className="my-4">
          <li>Uses a full Java IDE (Android Studio)</li>
          <li>Gives access to all FTC SDK features, libraries, and tools</li>
          <li>Supports GitHub, code reuse, advanced logic, and vision pipelines</li>
        </ul>
        <p className="font-semibold mb-2">Pros:</p>
        <ul className="my-4">
          <li>Powerful and professional</li>
          <li>Used by most competitive teams</li>
        </ul>
        <p className="font-semibold mb-2">Cons:</p>
        <ul className="my-4">
          <li>More setup required</li>
          <li>Usually does not work on school-issued Chromebooks</li>
        </ul>

        <br />
        <h2>Which One Does This Course Use?</h2>
        <p>
          This course teaches Java using Android Studio-style syntax and SDK structure, so that you:
        </p>
        <ul className="my-4">
          <li>Learn how FTC code actually works</li>
          <li>Can grow into full competition-ready programming</li>
          <li>Build good habits early (like naming hardware, using loops, handling input, etc.)</li>
        </ul>
        <p>
          Even if you're not using Android Studio yet, the code you write in this course is structured exactly how it would look in a real FTC season.
        </p>

        <br />
        <h2>Recap</h2>
        
        <br />
        <h3>Mode Comparison</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Feature</th>
                <th className="px-4 py-2">TeleOp</th>
                <th className="px-4 py-2">Autonomous</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">Time</td>
                <td className="px-4 py-2">2 minutes</td>
                <td className="px-4 py-2">30 seconds</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Controlled by</td>
                <td className="px-4 py-2">Drivers with gamepads</td>
                <td className="px-4 py-2">Robot-only (pre-programmed)</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Goal</td>
                <td className="px-4 py-2">Drive, score, operate robot</td>
                <td className="px-4 py-2">Score and move without input</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Skills needed</td>
                <td className="px-4 py-2">Input handling, responsiveness</td>
                <td className="px-4 py-2">Planning, logic, timing, sensors</td>
              </tr>
            </tbody>
          </table>
        </div>

        <br />
        <h3>Programming Tool Comparison</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Tool</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Best for</th>
                <th className="px-4 py-2">Used in course?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">Blocks</td>
                <td className="px-4 py-2">Drag & drop</td>
                <td className="px-4 py-2">Beginners</td>
                <td className="px-4 py-2">❌</td>
              </tr>
              <tr>
                <td className="px-4 py-2">OnBot Java</td>
                <td className="px-4 py-2">Java (browser)</td>
                <td className="px-4 py-2">Intermediate</td>
                <td className="px-4 py-2">❌</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Android Studio</td>
                <td className="px-4 py-2">Java (IDE)</td>
                <td className="px-4 py-2">Intermediate/Advanced</td>
                <td className="px-4 py-2">✅</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
