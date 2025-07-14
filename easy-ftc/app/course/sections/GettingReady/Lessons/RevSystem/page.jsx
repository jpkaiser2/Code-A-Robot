import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const metadata = {
  title: "REV Electronics Overview | EasyFTC",
};

export default function Rev() {
  // This lesson has 52 points
  const lessonPoints = 52;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>REV Electronics Overview</h1>

        <p>
          In this lesson, you'll learn about the core electronic components of an FTC robot using the REV system. These include the Control Hub, Expansion Hub, and the Driver Station Phone (or Driver Hub). Understanding these components is essential to setting up, troubleshooting, and programming your robot.
        </p>

        <br />
        <h2>The Big Picture: How the REV System Works</h2>
        <p>
          Your FTC robot is made up of hardware and software. The hardware includes motors, servos, sensors, and the hubs that control them. The software (the code you write) runs on the Control Hub and is sent there wirelessly from your Driver Station device.
        </p>
        <ul className="my-4">
          <li>The Driver Station (either an approved Android phone or the REV Driver Hub — recommended) tells the robot what to do (start/stop, opmode selection).</li>
          <li>The Control Hub runs your Java code and sends instructions to motors, servos, and sensors.</li>
          <li>If you need more ports, the Expansion Hub adds extra capacity and connects to the Control Hub.</li>
        </ul>

        <br />
        <h2>1. Control Hub</h2>
        <div className="flex flex-col items-center my-4">
          <img src="/images/RevSystem/ControlHub.png" alt="REV Control Hub" className="w-full max-w-xl rounded shadow mb-2" />
        </div>
        <p>The Control Hub is the brain of your robot. It contains an Android processor, motor controllers, servo controllers, and sensor ports all in one box.</p>
        <p className="font-semibold mb-2">Key Features:</p>
        <ul className="my-4">
          <li>Built-in Android OS: Runs the robot code directly</li>
          <li>USB Ports: For webcams or additional devices</li>
          <li>Built-in Wi-Fi: Communicates with the Driver Station</li>
          <li>Motor Ports: Controls DC motors</li>
          <li>Servo Ports: Controls standard servos</li>
          <li>I2C, Analog, and Digital Ports: For sensors</li>
          <li>Connects to battery</li>
        </ul>

        <br />
        <h2>2. Expansion Hub</h2>
        <div className="flex flex-col items-center my-4">
          <img src="/images/RevSystem/ExpansionHub.png" alt="REV Expansion Hub" className="w-full max-w-xl rounded shadow mb-2" />
        </div>
        <p>The Expansion Hub adds more ports when the Control Hub runs out. It connects to the Control Hub using an RS485 cable.</p>
        <p className="font-semibold mb-2">Key Features:</p>
        <ul className="my-4">
          <li>Same ports as the Control Hub (motor, servo, sensor ports)</li>
          <li>No Android brain or Wi-Fi: It's controlled entirely by the Control Hub</li>
          <li>RS485 Port: Connects to the Control Hub</li>
        </ul>

        <br />
        <h2>3. Driver Station (Phone or REV Driver Hub)</h2>
        <div className="flex flex-col items-center my-4">
          <img src="/images/RevSystem/DriverStation.png" alt="REV Driver Station" className="w-full max-w-xl rounded shadow mb-2" />
        </div>
        <p>The Driver Station is your remote control. It can be an approved Android phone or the REV Driver Hub, which is a rugged, all-in-one device that simplifies wiring and setup. Using the REV Driver Hub is recommended for reliability and convenience.</p>
        <p className="font-semibold mb-2">Key Features:</p>
        <ul className="my-4">
          <li>Runs the FTC Driver Station App</li>
          <li>Connects via Wi-Fi to the Control Hub</li>
          <li>Displays robot status, battery level, and lets you start/stop opmodes</li>
          <li>USB OTG Cable connects it to a gamepad (if using a phone)</li>
          <li>The REV Driver Hub includes built-in USB ports and simplifies cable management</li>
        </ul>

        <br />
        <h2>Putting It All Together</h2>
        <p>Here’s how these components interact:</p>
        <ul className="my-4">
          <li>The Driver Station connects via Wi-Fi to the Control Hub</li>
          <li>The Control Hub runs the robot code and sends commands to motors, servos, and sensors</li>
          <li>If more hardware is needed, the Control Hub talks to an Expansion Hub via RS485</li>
          <li>Power is distributed from your robot’s 12V battery to both hubs</li>
        </ul>

        <br />
        <h2>Recap</h2>
        <ul className="my-4">
          <li>The Control Hub is the brain of the robot and runs your Java code</li>
          <li>The Expansion Hub adds more ports and is controlled by the Control Hub</li>
          <li>The Driver Station (phone or REV Driver Hub) lets you control and monitor the robot</li>
          <li>These components work together to make your robot move, sense, and compete!</li>
        </ul>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
