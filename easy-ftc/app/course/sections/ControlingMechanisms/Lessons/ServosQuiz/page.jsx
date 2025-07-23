import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Quiz from "@/components/quiz";

export const metadata = {
  title: "Servos Quiz | EasyFTC",
};





const questions = [
  {
    question: "What range of values can you pass to `servo.setPosition()`?",
    options: ["0 to 100", "0.0 to 1.0", "-1.0 to 1.0", "0 to 360"],
    answer: "0.0 to 1.0",
  },
  {
    question: "What does the `setPosition()` method do for a servo?",
    options: [
      "Sets how fast the servo rotates",
      "Sets the power to the servo",
      "Moves the servo to a position between its min and max range",
      "Stops the servo from moving"
    ],
    answer: "Moves the servo to a position between its min and max range",
  },
  {
    question: "Which of the following code snippets sets a servo to its halfway position?",
    options: [
      "```java\nservo.setPower(0.5);\n```",
      "```java\nservo.setPosition(90);\n```",
      "```java\nservo.setPosition(0.5);\n```",
      "```java\nservo.move(0.5);\n```"
    ],
    answer: "```java\nservo.setPosition(0.5);\n```",
  },
  {
    question: "How do you reverse a servo’s direction?",
    options: [
      "```java\nservo.setPower(-1.0);\n```",
      "```java\nservo.reverse();\n```",
      "```java\nservo.setDirection(Servo.Direction.REVERSE);\n```",
      "```java\nservo.setZeroPowerBehavior(BRAKE);\n```"
    ],
    answer: "```java\nservo.setDirection(Servo.Direction.REVERSE);\n```",
  },
  {
    question: "What does `servo.scaleRange(0.5, 1.0);` do?",
    options: [
      "Changes the maximum speed of the servo",
      "Scales the servo’s output power by 50%",
      "Restricts servo motion to the second half of its range",
      "Reverses the servo direction"
    ],
    answer: "Restricts servo motion to the second half of its range",
  },
  {
    question: "What happens if you call `servo.setPosition(1.5);`?",
    options: [
      "The servo will rotate 1.5 times",
      "An error will occur",
      "The value is clipped to 1.0",
      "The servo moves to the center position"
    ],
    answer: "The value is clipped to 1.0",
  },
  {
    question: "Which method allows you to set how far the servo moves when passing 0.0 to 1.0?",
    options: [
      "`servo.setPower()`",
      "`servo.scaleRange()`",
      "`servo.setRange()`",
      "`servo.setLimits()`"
    ],
    answer: "`servo.scaleRange()`",
  }
];




export default function ServosQuiz() {
  // This lesson has 62 points
  const lessonPoints = 62;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
      <Quiz title="Servos Quiz" questions={questions} />
        <br/>
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
          </div>
          </div>
          </LessonLayout>
  );
} 