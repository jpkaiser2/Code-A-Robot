import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Quiz from "@/components/quiz";

export const metadata = {
  title: "Autonomous Quiz | EasyFTC",
};

const questions = [
  {
    question: "What happens during the autonomous period in an FTC match?",
    options: [
      "Robots are driven by drivers using gamepads",
      "Robots follow pre-programmed instructions without human control",
      "Robots only charge their batteries",
      "Robots connect to WiFi"
    ],
    answer: "Robots follow pre-programmed instructions without human control",
  },
  {
    question: "Why is the autonomous period important?",
    options: [
      "It charges the robot battery",
      "It lets you test your teleop code",
      "It can score bonus points and set your team up for success",
      "It helps update your robot firmware"
    ],
    answer: "It can score bonus points and set your team up for success",
  },
  {
    question: "Which of the following is a common use of a timer in autonomous code?",
    options: [
      "Making the robot follow a wall",
      "Having the robot turn until a sensor is triggered",
      "Running motors for a specific duration",
      "Measuring encoder ticks"
    ],
    answer: "Running motors for a specific duration",
  },
  {
    question: "What class is commonly used in FTC to measure elapsed time?",
    options: [
      "ElapsedTimer",
      "SystemClock",
      "ElapsedTime",
      "TimeCounter"
    ],
    answer: "ElapsedTime",
  },
  {
    question: "Which of the following motor modes allows the robot to move to a specific encoder target?",
    options: [
      "RUN_WITHOUT_ENCODER",
      "RUN_TO_POSITION",
      "STOP_AND_RESET_ENCODER",
      "RUN_USING_ENCODER"
    ],
    answer: "RUN_TO_POSITION",
  },
  {
    question: "What must be done before using encoders to move a specific distance?",
    options: [
      "Reset encoders and set target position",
      "Plug in a USB encoder module",
      "Configure the IMU first",
      "Disable motor brakes"
    ],
    answer: "Reset encoders and set target position",
  },
  {
    question: "What is the purpose of the `STOP_AND_RESET_ENCODER` mode?",
    options: [
      "It disables the motor completely",
      "It puts the motor in float mode",
      "It sets the encoder count to zero",
      "It makes the motor run faster"
    ],
    answer: "It sets the encoder count to zero",
  },
  {
    question: "Which of these code snippets correctly initializes and starts a timer?",
    options: [
      "ElapsedTime timer = new ElapsedTime();",
      "ElapsedTime.start();",
      "timer = ElapsedTime();",
      "new ElapsedTime.start();"
    ],
    answer: "ElapsedTime timer = new ElapsedTime();",
  },
  {
    question: "Why are if statements useful in autonomous routines?",
    options: [
      "They reduce the need for motor power",
      "They allow the robot to react to conditions like sensor input",
      "They remove the need for timers",
      "They only work in teleop"
    ],
    answer: "They allow the robot to react to conditions like sensor input",
  },
  {
    question: "What does this code check?\n```java\nif (sensorDistance.getDistance(DistanceUnit.CM) < 10) {\n    // do something\n}```",
    options: [
      "If the robot is charging",
      "If the distance sensor is working",
      "If the object is closer than 10 cm",
      "If the sensor is more than 10 cm away"
    ],
    answer: "If the object is closer than 10 cm",
  },
  {
    question: "Which of these best describes the downside of using timers in autonomous?",
    options: [
      "They are slower than encoders",
      "They use more battery",
      "They are inconsistent due to changes in robot conditions",
      "They are illegal in FTC"
    ],
    answer: "They are inconsistent due to changes in robot conditions",
  },
  {
    question: "Which of the following is a valid use of encoders?",
    options: [
      "Checking battery level",
      "Limiting CPU usage",
      "Measuring how far the robot has driven",
      "Turning off motors after a delay"
    ],
    answer: "Measuring how far the robot has driven",
  },
  {
    question: "What is the advantage of using separate autonomous files (like RedLeftAuto.java)?",
    options: [
      "It lets you avoid using @Autonomous annotations",
      "It’s easier to organize and select routines",
      "It makes encoders more accurate",
      "You can use Gamepad input in autonomous"
    ],
    answer: "It’s easier to organize and select routines",
  },
  {
    question: "What must every autonomous OpMode include to run properly?",
    options: [
      "An IMU sensor",
      "waitForStart()",
      "A Gamepad variable",
      "Dashboard logging"
    ],
    answer: "waitForStart()",
  },
  {
    question: "What is the effect of calling sleep(2000) in your autonomous OpMode?",
    options: [
      "Pauses the entire program for 2 seconds",
      "Stops the motors permanently",
      "Turns off encoders",
      "Switches to teleop"
    ],
    answer: "Pauses the entire program for 2 seconds",
  }
];










export default function AutoQuiz() {
  // This lesson has 75 points
  const lessonPoints = 75;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
      <Quiz title="Autonomous Quiz" questions={questions} />
        <br/>
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
          </div>
          </div>
          </LessonLayout>
  );
} 