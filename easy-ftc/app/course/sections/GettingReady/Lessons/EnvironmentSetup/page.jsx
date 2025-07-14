import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const metadata = {
  title: "Setting Up an Environment | EasyFTC",
};

export default function Environment() {
  // This lesson has 53 points
  const lessonPoints = 53;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Setting Up an Environment</h1>

        <p>
          Before you can start writing code for your FTC robot, you’ll need to choose and set up a programming environment. FTC supports two main options:
        </p>

        <br />
        <h2>Option 1: OnBot Java (Beginner-Friendly)</h2>
        <p className="font-semibold mb-2">What it is:</p>
        <p>
          OnBot Java lets you program your robot directly from a web browser. You don’t need to install anything on your computer. However, you must be connected to the robot to use it, which can slow down programming for some teams.
        </p>
        <p className="font-semibold mb-2">Best for:</p>
        <ul className="my-4">
          <li>Beginners</li>
          <li>Chromebooks or low-power laptops</li>
          <li>Quick edits and testing</li>
        </ul>
        <p className="font-semibold mb-2">How to Set It Up:</p>
        <ul className="my-4">
          <li>Power on the Control Hub or Robot Controller Phone.</li>
          <li>Connect to the robot’s Wi-Fi network.</li>
          <li>Look for a network name like <code>FTC-1234</code> (it will match your team number or have a default one). The password is usually <code>password</code>.</li>
          <li>Open a web browser on your laptop and go to:<br /><span className="font-mono">http://192.168.43.1:8080</span></li>
          <li>You’ll see the OnBot Java interface.</li>
        </ul>
        <p>From here, you can:</p>
        <ul className="my-4">
          <li>Create op modes</li>
          <li>Edit code</li>
          <li>Build and run directly on the robot</li>
        </ul>
        <p>That’s it! You’re now ready to code in Java without installing anything.</p>

        <br />
        <h2>Option 2: Android Studio (Advanced, Full-Featured)</h2>
        <p className="font-semibold mb-2">What it is:</p>
        <p>
          Android Studio is a professional Java development environment. It gives you more control, better tools, and access to external libraries like Road Runner.
        </p>
        <p className="font-semibold mb-2">Best for:</p>
        <ul className="my-4">
          <li>Intermediate/advanced programmers</li>
          <li>Teams that want to use version control (like Git)</li>
          <li>Custom or complex robot code</li>
        </ul>
        <p className="font-semibold mb-2">How to Set It Up:</p>
        <ul className="my-4">
          <li><strong>Install Android Studio:</strong><br />Download it from <a href="https://developer.android.com/studio" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">developer.android.com</a> and follow the installer steps.<br />During setup, install the Android SDK and Java JDK (these usually come bundled).</li>
          <li><strong>Download the FTC SDK:</strong><br />Go to <a href="https://github.com/FIRST-Tech-Challenge/FtcRobotController" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">github.com/FIRST-Tech-Challenge/FtcRobotController</a> and click “Code &gt; Download ZIP.”<br />Unzip it somewhere convenient (like your Documents folder).</li>
          <li><strong>Open the Project in Android Studio:</strong><br />Open Android Studio, choose "Open an Existing Project", and select the folder you just unzipped.<br />Let it finish syncing and building (this can take a few minutes).</li>
          <li><strong>Connect to Your Robot:</strong><br />Connect your computer to the robot’s Wi-Fi network (ex: FTC-1234).<br />Plug in the robot’s Control Hub or phone via USB (for the first time install).<br />Click Run in Android Studio to push your code to the robot.</li>
        </ul>

        <br />
        <h2>Which One Should You Use?</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Feature</th>
                <th className="px-4 py-2">OnBot Java</th>
                <th className="px-4 py-2">Android Studio</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">Install required?</td>
                <td className="px-4 py-2">❌ No</td>
                <td className="px-4 py-2">✅ Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Works in browser?</td>
                <td className="px-4 py-2">✅ Yes</td>
                <td className="px-4 py-2">❌ No</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Access to libraries?</td>
                <td className="px-4 py-2">❌ Limited</td>
                <td className="px-4 py-2">✅ Full access</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Best for...</td>
                <td className="px-4 py-2">Beginners</td>
                <td className="px-4 py-2">Experienced users</td>
              </tr>
            </tbody>
          </table>
        </div>

        <br />
        <p>
          In this course, you can use either option; both will work just fine. If you’re just getting started, OnBot Java is the easiest way to jump in. If you want to go pro, Android Studio gives you more tools and flexibility.
        </p>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
