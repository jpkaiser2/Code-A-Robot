import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Quiz from "@/components/quiz";

export const metadata = {
  title: "OpModes & Gamepads Quiz | EasyFTC",
};





const questions = [
  {
    question: "Which method in an OpMode is called repeatedly after the driver presses PLAY?",
    options: ["init()", "start()", "loop()", "run()"],
    answer: "loop()"
  },
  {
    question: "What annotation must be present for a TeleOp OpMode to appear on the Driver Station?",
    options: ["@TeleOp()", "@Autonomous()", "@FTC()", "@OpMode()"],
    answer: "@TeleOp()"
  },
  {
    question: "What is the name of the method that runs once when INIT is pressed?",
    options: ["start()", "begin()", "run()", "init()"],
    answer: "init()"
  },
  {
    question: "Which method is optional in a regular (non-linear) OpMode?",
    options: ["init()", "loop()", "init_loop()", "All of the above"],
    answer: "init_loop()"
  },
  {
    question: "Which of the following accesses the Y-axis of gamepad1's left joystick?",
    options: ["gamepad1.left_stick_y", "gamepad.left_stick_y", "gamepad1.left.y", "left_stick_y(gamepad1)"],
    answer: "gamepad1.left_stick_y"
  },
  {
    question: "What type of value is returned by gamepad1.a?",
    options: ["double", "boolean", "int", "String"],
    answer: "boolean"
  },
  {
    question: "What is the range of values for the joystick axes like `left_stick_x`?",
    options: ["-100 to 100", "0 to 1", "-1.0 to 1.0", "0.0 to 255.0"],
    answer: "-1.0 to 1.0"
  },
  {
    question: "What is the purpose of `telemetry.addData(\"Speed\", speed);`?",
    options: [
      "To send speed data to the gamepad",
      "To update the robot's display screen",
      "To display speed data on the Driver Station",
      "To log speed into a file"
    ],
    answer: "To display speed data on the Driver Station"
  },
  {
    question: "Which of the following is required in every OpMode that extends `OpMode`?",
    options: ["init() and loop()", "runOpMode()", "start() and stop()", "main()"],
    answer: "init() and loop()"
  },
  {
    question: "What is the default direction of a joystick's Y-axis when pushed up?",
    options: ["Positive", "Negative", "Zero", "Undefined"],
    answer: "Negative"
  },
  {
    question: "Which combination registers gamepad1 with the Driver Station?",
    options: [
      "Pressing SELECT + A",
      "Holding X for 3 seconds",
      "Pressing START + A",
      "Double tapping B"
    ],
    answer: "Pressing START + A"
  },
  {
    question: "What type of input is `gamepad1.left_trigger`?",
    options: ["boolean", "int", "double", "String"],
    answer: "double"
  },
  {
    question: "What happens if you forget the @TeleOp or @Autonomous annotation?",
    options: [
      "The OpMode won't compile",
      "It won’t show up on the Driver Station",
      "It will crash the robot controller",
      "The program won’t run correctly"
    ],
    answer: "It won’t show up on the Driver Station"
  },
  {
    question: "What operator should be used to flip a joystick’s Y-axis value?",
    options: ["+", "*", "-", "/"],
    answer: "-"
  },
  {
    question: "What is the purpose of `@Override` in an OpMode class?",
    options: [
      "It highlights syntax",
      "It tells the system to ignore errors",
      "It indicates that a method is replacing a superclass method",
      "It makes the method public"
    ],
    answer: "It indicates that a method is replacing a superclass method"
  }
];



export default function OpModesGamePadsQuiz() {
  // This lesson has 57 points
  const lessonPoints = 57;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
      <Quiz title="OpModes & Gamepads Quiz" questions={questions} />
        <br/>
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
          </div>
          </div>
          </LessonLayout>
  );
} 