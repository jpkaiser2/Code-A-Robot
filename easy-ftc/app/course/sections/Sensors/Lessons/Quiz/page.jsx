import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Quiz from "@/components/quiz";

export const metadata = {
  title: "Sensors & Feedback Quiz | EasyFTC",
};

const questions = [
  {
    question: "What does this line of code return?\n```java\nmotor.getCurrentPosition()\n```",
    options: [
      "The motor's speed in RPM",
      "The motor's current power",
      "The encoder ticks since last reset",
      "The gear ratio of the motor"
    ],
    answer: "The encoder ticks since last reset",
  },
  {
    question: "Why would you use `RUN_TO_POSITION` mode with encoders?",
    options: [
      "To make the motor spin freely",
      "To use the encoder for velocity only",
      "To have the motor stop when it reaches a set target",
      "To disable all feedback from the encoder"
    ],
    answer: "To have the motor stop when it reaches a set target",
  },
  {
    question: "What is the purpose of `ticksPerRotation` in your code?",
    options: [
      "It sets the motor speed",
      "It lets you convert encoder ticks into full rotations",
      "It tells the IMU what angle the robot is at",
      "It sets how far the motor can travel"
    ],
    answer: "It lets you convert encoder ticks into full rotations",
  },
  {
    question: "Which method converts encoder ticks to rotations?\n```java\nreturn motor.getCurrentPosition() / ticksPerRotation;\n```",
    options: ["getSpeed()", "getRotations()", "getPower()", "getPosition()"],
    answer: "getRotations()",
  },
  {
    question: "What does this method do?\n```java\nreturn imu.getRobotYawPitchRollAngles().getYaw(AngleUnit.DEGREES);\n```",
    options: [
      "Returns current robot pitch",
      "Returns robot's heading in degrees",
      "Returns motor angle",
      "Returns joystick direction"
    ],
    answer: "Returns robot's heading in degrees",
  },
  {
    question: "What are pitch and roll measured by?",
    options: [
      "Encoders",
      "IMU",
      "Distance sensor",
      "Servo"
    ],
    answer: "IMU",
  },
  {
    question: "What happens when you call `imu.initialize()` with a RevHubOrientation?",
    options: [
      "It resets all encoders",
      "It tells the IMU how the hub is mounted",
      "It calibrates the motor PID",
      "It disables the IMU"
    ],
    answer: "It tells the IMU how the hub is mounted",
  },
  {
    question: "What is the effect of calling `AngleUnit.normalizeRadians(angle)`?",
    options: [
      "It resets yaw to zero",
      "It ensures angles stay between -π and π",
      "It adds motor power",
      "It calculates distance from ticks"
    ],
    answer: "It ensures angles stay between -π and π",
  },
  {
    question: "What class is used for measuring distance from a sensor?",
    options: ["ColorSensor", "IMU", "DistanceSensor", "AnalogInput"],
    answer: "DistanceSensor",
  },
  {
    question: "What does this return?\n```java\nsensor.getDistance(DistanceUnit.INCH);\n```",
    options: [
      "Distance in centimeters",
      "Raw distance value",
      "Distance in inches",
      "Heading angle"
    ],
    answer: "Distance in inches",
  },
  {
    question: "How do you store a measured distance in cm from a sensor?",
    options: [
      "`distance = sensor.getDistance(INCH);`",
      "`distance = sensor.getDistance(DistanceUnit.CM);`",
      "`distance = sensor.getCM();`",
      "`distance = sensor.read();`"
    ],
    answer: "`distance = sensor.getDistance(DistanceUnit.CM);`",
  },
  {
    question: "What sensor type is typically used to stop a robot when an obstacle is close?",
    options: [
      "Color sensor",
      "Touch sensor",
      "IMU",
      "Distance sensor"
    ],
    answer: "Distance sensor",
  },
  {
    question: "Which of the following sensors is considered digital?",
    options: ["DistanceSensor", "IMU", "DigitalChannel", "AnalogInput"],
    answer: "DigitalChannel",
  },
  {
    question: "What does this method do?\n```java\nreturn !touchSensor.getState();\n```",
    options: [
      "Returns true if the touch sensor is pressed",
      "Resets the sensor",
      "Toggles a servo",
      "Reads analog voltage"
    ],
    answer: "Returns true if the touch sensor is pressed",
  },
  {
    question: "In FTC, how is a digital touch sensor usually initialized?",
    options: [
      "`hwMap.get(TouchSensor.class)`",
      "`hwMap.get(DigitalChannel.class)`",
      "`hwMap.get(AnalogInput.class)`",
      "`new TouchSensor()`"
    ],
    answer: "`hwMap.get(DigitalChannel.class)`",
  },
  {
    question: "Which mode must you set for a DigitalChannel when using it as input?",
    options: [
      "`DigitalChannel.Mode.OUTPUT`",
      "`DigitalChannel.Mode.INPUT`",
      "`DigitalChannel.Mode.TOGGLE`",
      "`DigitalChannel.Mode.STATE`"
    ],
    answer: "`DigitalChannel.Mode.INPUT`",
  },
  {
    question: "What does this code do?\n```java\nif (board.getDistance(DistanceUnit.CM) < 10) {\n  motor.setPower(0);\n}\n```",
    options: [
      "Turns the robot if the heading is too small",
      "Stops the motor if an object is close",
      "Sets encoder position",
      "Turns on telemetry"
    ],
    answer: "Stops the motor if an object is close",
  },
  {
    question: "How can you detect if your robot tilted while driving up a ramp?",
    options: ["By checking encoder speed", "By reading IMU pitch/roll", "Using a touch sensor", "By checking motor power"],
    answer: "By reading IMU pitch/roll",
  },
  {
    question: "Which method prints values to the Driver Station?",
    options: [
      "`hardwareMap.print()`",
      "`telemetry.addData()`",
      "`system.out()`",
      "`debug.log()`"
    ],
    answer: "`telemetry.addData()`",
  },
  {
    question: "What is one use for combining encoder and IMU data?",
    options: [
      "To control LED lights",
      "To calculate battery life",
      "To more accurately estimate robot position",
      "To send gamepad feedback"
    ],
    answer: "To more accurately estimate robot position",
  },
];








export default function SensorsQuiz() {
  // This lesson has 69 points
  const lessonPoints = 69; // Giggity
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
      <Quiz title="Sensors & Feedback Quiz" questions={questions} />
        <br/>
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
          </div>
          </div>
          </LessonLayout>
  );
} 