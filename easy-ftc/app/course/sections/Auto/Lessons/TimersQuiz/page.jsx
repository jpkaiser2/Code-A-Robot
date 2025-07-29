import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Quiz from "@/components/quiz";

export const metadata = {
  title: "Timers Quiz | EasyFTC",
};

const questions = [
  {
    question: "What is the main purpose of using timers in autonomous programs?",
    options: [
      "To make robot movements more precise using encoders",
      "To allow the robot to perform actions for a specific duration",
      "To respond to sensor input during a match",
      "To communicate with the driver station during autonomous"
    ],
    answer: "To allow the robot to perform actions for a specific duration",
  },
  {
    question: "Which class is commonly used to track elapsed time in FTC autonomous programs?",
    options: [
      "TimerClock",
      "SystemTime",
      "ElapsedTime",
      "Chrono"
    ],
    answer: "ElapsedTime",
  },
  {
    question: "In the following code from the lesson, how long does the robot drive forward?\n```java\nleftDrive.setPower(0.5);\nrightDrive.setPower(0.5);\nsleep(2000);\n```",
    options: [
      "500 milliseconds",
      "1500 milliseconds",
      "2000 milliseconds",
      "2500 milliseconds"
    ],
    answer: "2000 milliseconds",
  },
  {
    question: "What method pauses the program for a set amount of time?",
    options: [
      "pause()",
      "wait()",
      "delay()",
      "sleep()"
    ],
    answer: "sleep()",
  },
  {
    question: "Why might a timer-based autonomous program behave differently on different fields?",
    options: [
      "Because timers are only supported on wooden floors",
      "Because motor power changes randomly",
      "Because field surfaces and battery levels can affect motion",
      "Because timer values reset every time"
    ],
    answer: "Because field surfaces and battery levels can affect motion",
  },
  {
    question: "Which of the following is a limitation of using timers in autonomous?",
    options: [
      "They require complex sensor input",
      "They are harder to program than encoders",
      "They are less reliable for precise movement",
      "They can only be used in TeleOp"
    ],
    answer: "They are less reliable for precise movement",
  },
  {
    question: "What should you do after each movement in a timer-based routine?",
    options: [
      "Reset the robot's position",
      "Check encoder values",
      "Stop the motors to avoid drifting",
      "Send telemetry to the driver station"
    ],
    answer: "Stop the motors to avoid drifting",
  }
];









export default function TimersQuiz() {
  // This lesson has 72 points
  const lessonPoints = 72;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
      <Quiz title="Timers Quiz" questions={questions} />
        <br/>
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
          </div>
          </div>
          </LessonLayout>
  );
} 