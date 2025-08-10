import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Quiz from "@/components/quiz";

export const metadata = {
  title: "Trajectories and Sequences Quiz | EasyFTC",
};

const questions = [
  {
    question: "In Road Runner, what is the main purpose of a trajectory?",
    options: [
      "To define the robot's physical hardware",
      "To describe a precise movement path for the robot",
      "To set motor power manually",
      "To create a driver-controlled program"
    ],
    answer: "To describe a precise movement path for the robot",
  },
  {
    question: "Which Road Runner class is typically used to build trajectories?",
    options: [
      "TrajectoryBuilder",
      "DriveConstants",
      "OpMode",
      "LinearDrive"
    ],
    answer: "TrajectoryBuilder",
  },
  {
    question: "What is the main difference between a trajectory and a sequence in Road Runner?",
    options: [
      "A trajectory only controls speed, while a sequence only controls turns",
      "A trajectory is a single continuous path, while a sequence can chain multiple paths and actions",
      "A trajectory is for autonomous and a sequence is for teleop",
      "A sequence requires encoders, while a trajectory does not"
    ],
    answer: "A trajectory is a single continuous path, while a sequence can chain multiple paths and actions",
  },
  {
    question: "Which method is used to start building a trajectory from the robot's current position?",
    options: [
      "trajectoryBuilder()",
      "beginTrajectory()",
      "startTrajectory()",
      "newTrajectory()"
    ],
    answer: "trajectoryBuilder()",
  },
  {
    question: "In the example code, what does `.forward(20)` do?",
    options: [
      "Moves the robot forward for 20 seconds",
      "Moves the robot forward 20 inches",
      "Moves the robot forward until encoder counts reach 20",
      "Moves the robot forward at 20% speed"
    ],
    answer: "Moves the robot forward 20 inches",
  },
  {
    question: "When using a trajectory sequence, which method is used to create it?",
    options: [
      "trajectorySequenceBuilder()",
      "sequenceBuilder()",
      "buildSequence()",
      "createTrajectorySequence()"
    ],
    answer: "trajectorySequenceBuilder()",
  },
  {
    question: "What does `waitSeconds(2)` do when included in a trajectory sequence?",
    options: [
      "Pauses the robot for 2 seconds",
      "Delays the start of the program by 2 seconds",
      "Slows the robot down by half",
      "Stops the motors permanently after 2 seconds"
    ],
    answer: "Pauses the robot for 2 seconds",
  },
  {
    question: "Why might you use trajectory sequences instead of individual trajectories?",
    options: [
      "They are easier to tune for wheel slip",
      "They allow you to chain multiple paths and actions without stopping",
      "They automatically avoid obstacles",
      "They require less code to declare hardware"
    ],
    answer: "They allow you to chain multiple paths and actions without stopping",
  },
  {
    question: "What method runs the trajectory or sequence on the robot?",
    options: [
      "followPath()",
      "runTrajectory()",
      "followTrajectory() / followTrajectorySequence()",
      "execute()"
    ],
    answer: "followTrajectory() / followTrajectorySequence()",
  },
  {
    question: "If you want the robot to move in an arc instead of a straight line, which method could you use?",
    options: [
      "splineTo()",
      "curveTo()",
      "arcMove()",
      "turnArc()"
    ],
    answer: "splineTo()",
  }
];











export default function TrajectoriesAndSequencesQuiz() {
  // This lesson has 80 points
  const lessonPoints = 80;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
      <Quiz title="Trajectories and Sequences Quiz" questions={questions} />
        <br/>
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
          </div>
          </div>
          </LessonLayout>
  );
} 