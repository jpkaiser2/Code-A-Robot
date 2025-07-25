import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Quiz from "@/components/quiz";

export const metadata = {
  title: "Encoders Check For Understanding | EasyFTC",
};





const questions = [
  {
    question: "Given this code:\n```java\nmotor.setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);\nint ticks = motor.getCurrentPosition();\n```What value will `ticks` most likely be?",
    options: ["0", "1120", "-1", "It depends on the motor"],
    answer: "0",
  },
  {
    question: "What is the output of this code after the robot has driven forward?\n```java\ntelemetry.addData(\"Position\", motor.getCurrentPosition());\n```",
    options: [
      "The number of inches moved",
      "The number of ticks the motor has turned since reset",
      "The current power of the motor",
      "The rotation direction of the motor"
    ],
    answer: "The number of ticks the motor has turned since reset",
  },
  {
    question: "Assume you run this code:\n```java\nmotor.setTargetPosition(1120);\nmotor.setMode(DcMotor.RunMode.RUN_TO_POSITION);\nmotor.setPower(0.5);\n```What should happen?",
    options: [
      "The motor spins continuously",
      "The motor moves one full rotation and stops",
      "The motor waits for encoder input",
      "The motor resets its encoder"
    ],
    answer: "The motor moves one full rotation and stops",
  },
  {
    question: "Which of the following best explains why a motor might never reach its target position in `RUN_TO_POSITION` mode?",
    options: [
      "The target position is negative",
      "The encoder is not connected",
      "The motor power is too low to overcome resistance",
      "RUN_WITHOUT_ENCODER was called before"
    ],
    answer: "The motor power is too low to overcome resistance",
  },
  {
    question: "What does the following sequence do?\n```java\nmotor.setMode(DcMotor.RunMode.RUN_USING_ENCODER);\nmotor.setPower(0.8);\n```",
    options: [
      "Uses encoder feedback to regulate speed",
      "Moves to a specific position and stops",
      "Disables encoder tracking",
      "Sets the target to 0 and stops"
    ],
    answer: "Uses encoder feedback to regulate speed",
  },
  {
    question: "If you want to track how far your robot has moved over time in TeleOp, which of the following should you do?",
    options: [
      "Use `RUN_TO_POSITION` and reset encoders every loop",
      "Use `RUN_WITHOUT_ENCODER` and a timer",
      "Use `RUN_USING_ENCODER` and read `getCurrentPosition()` regularly",
      "Use a stopwatch and guess distance based on power"
    ],
    answer: "Use `RUN_USING_ENCODER` and read `getCurrentPosition()` regularly",
  },
  {
    question: "What does this print after 3 seconds of forward motion?\n```java\nmotor.setMode(DcMotor.RunMode.RUN_USING_ENCODER);\nmotor.setPower(1.0);\nThread.sleep(3000);\ntelemetry.addData(\"Ticks\", motor.getCurrentPosition());\n```",
    options: [
      "Roughly 1120",
      "0 (because encoders reset after 3 seconds)",
      "A large positive number, depending on speed",
      "The motor’s RPM",
    ],
    answer: "A large positive number, depending on speed",
  },
  {
    question: "Why might two motors driving straight report very different encoder values in TeleOp?",
    options: [
      "One has higher gear reduction",
      "One’s encoder is disabled",
      "They are not mechanically aligned or calibrated",
      "The joystick wasn’t pushed far enough"
    ],
    answer: "They are not mechanically aligned or calibrated",
  },
  {
    question: "Which combination would allow a robot to move forward exactly 10 inches if your wheel circumference is 4 inches and there are 1120 ticks per wheel revolution?",
    options: [
      "`targetPosition = 1120 * 2.5`",
      "`targetPosition = 4 * 10`",
      "`targetPosition = 10 / 4`",
      "`targetPosition = 10 * 1120`"
    ],
    answer: "`targetPosition = 1120 * 2.5`",
  },
  {
    question: "You forgot to reset your encoder before starting autonomous. What’s the risk?",
    options: [
      "Your motor will ignore all setPower() commands",
      "Your robot will stall when trying to stop",
      "You won’t know how far the motor moved from the starting position",
      "The encoder count will always be zero"
    ],
    answer: "You won’t know how far the motor moved from the starting position",
  },
];




export default function EncodersQuiz() {
  // This lesson has 65 points
  const lessonPoints = 65;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
      <Quiz title="Encoders Check For Understanding" questions={questions} />
        <br/>
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
          </div>
          </div>
          </LessonLayout>
  );
} 