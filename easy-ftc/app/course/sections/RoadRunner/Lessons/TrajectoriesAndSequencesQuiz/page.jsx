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
    question: "What does a trajectory represent in Road Runner 1.0?",
    options: [
      "A set of motor power values",
      "A smooth, calculated path that respects robot limits",
      "A single turn action",
      "A hardware mapping configuration"
    ],
    answer: "A smooth, calculated path that respects robot limits",
  },
  {
    question: "Which class stores the robot's position and orientation?",
    options: [
      "Vector2d",
      "Pose3d",
      "Pose2d",
      "Trajectory"
    ],
    answer: "Pose2d",
  },
  {
    question: "What units does Road Runner 1.0 use for distances?",
    options: [
      "Centimeters",
      "Inches",
      "Feet",
      "Meters"
    ],
    answer: "Inches",
  },
  {
    question: "What units does Road Runner 1.0 use for angles?",
    options: [
      "Degrees",
      "Gradians",
      "Radians",
      "Turns"
    ],
    answer: "Radians",
  },
  {
    question: "Which method begins creating a trajectory from a starting pose?",
    options: [
      "drive.createPath(startPose)",
      "drive.actionBuilder(startPose)",
      "drive.buildTrajectory(startPose)",
      "drive.poseEstimator(startPose)"
    ],
    answer: "drive.actionBuilder(startPose)",
  },
  {
    question: "Which method moves the robot sideways to a specific field position?",
    options: [
      ".splineTo()",
      ".lineToY()",
      ".turn()",
      ".strafeTo()"
    ],
    answer: ".strafeTo()",
  },
  {
    question: "Which method rotates the robot in place?",
    options: [
      ".turn()",
      ".setTangent()",
      ".rotateTo()",
      ".pivot()"
    ],
    answer: ".turn()",
  },
  {
    question: "What does `.setTangent(angleRad)` do?",
    options: [
      "Sets the robot's initial heading before autonomous",
      "Sets the direction the next segment will be built from",
      "Turns the robot by the given angle",
      "Aligns the robot with a spline"
    ],
    answer: "Sets the direction the next segment will be built from",
  },
  {
    question: "Which method pauses movement for a set number of seconds?",
    options: [
      ".stop()",
      ".pause()",
      ".waitSeconds()",
      ".sleep()"
    ],
    answer: ".waitSeconds()",
  },
  {
    question: "How do you run an Action so that code execution waits until it finishes?",
    options: [
      "drive.run(path)",
      "Actions.runBlocking(path)",
      "drive.execute(path)",
      "Actions.runAsync(path)"
    ],
    answer: "Actions.runBlocking(path)",
  },
  {
    question: "What is the correct order when building a path?",
    options: [
      "Add segments → Build → Choose start pose → Run",
      "Choose start pose → Initialize drive → Start builder → Add segments → Build → Run",
      "Run → Choose start pose → Build → Add segments",
      "Choose start pose → Add segments → Start builder → Run"
    ],
    answer: "Choose start pose → Initialize drive → Start builder → Add segments → Build → Run",
  },
  {
    question: "What is the purpose of `.endTrajectory().fresh()`?",
    options: [
      "To reset the robot's pose to (0,0,0)",
      "To continue building from the end of a previously built path",
      "To create a fresh drive object",
      "To clear the builder's movement queue"
    ],
    answer: "To continue building from the end of a previously built path",
  },
  {
    question: "What should you do before expecting high accuracy in autonomous paths?",
    options: [
      "Test on a practice field",
      "Tune your drive",
      "Lower robot speed",
      "Use only straight paths"
    ],
    answer: "Tune your drive",
  },
  {
    question: "Which method moves in a smooth curve to a position with a set heading?",
    options: [
      ".lineToX()",
      ".strafeTo()",
      ".splineTo()",
      ".turn()"
    ],
    answer: ".splineTo()",
  },
  {
    question: "Why is getting the starting Pose2d correct important?",
    options: [
      "It makes the code compile",
      "It ensures planned paths match the real field",
      "It increases speed",
      "It reduces battery usage"
    ],
    answer: "It ensures planned paths match the real field",
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