import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";

export const metadata = {
  title: "Installing and Integrating Road Runner | EasyFTC",
};

export default function InstallingRoadRunner() {
  const lessonPoints = 77;

  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Installing and Integrating Road Runner</h1>

        <p>
          In this course, we'll be using Road Runner to create advanced autonomous routines. However, this lesson is not about writing code yet. It's here to give you a heads-up that Road Runner requires setup and tuning before you can use it effectively.
        </p>

        <p>
          <strong>You do not need to set up a robot with Road Runner right now.</strong> This lesson is for future reference to help you understand that Road Runner must be configured before you can start writing any path-following code.
        </p>

        <h2>Using the Official Road Runner Docs</h2>
        <p>
          Rather than giving you outdated or incomplete instructions here, we'll be directing you to the official Road Runner 1.0 documentation. These are maintained and updated by the developers. Learning how to read and follow documentation is a critical skill in robotics and programming.
        </p>

        <ul className="my-4">
          <li>
            <a className="text-blue-500 underline" href="https://rr.brott.dev/docs/v1-0/installation/" target="_blank" rel="noopener noreferrer">
              Official Docs
            </a>
          </li>
          <li>
            <a className="text-blue-500 underline" href="https://github.com/acmerobotics/road-runner-quickstart" target="_blank" rel="noopener noreferrer">
              Quickstart GitHub Repo
            </a>
          </li>
        </ul>

        <h2>What to Do (When You're Ready)</h2>
        <h3>1. Installation</h3>
        <ul className="my-4">
          <li>Download or clone the <code>road-runner-quickstart</code> repository.</li>
          <li>Open it in Android Studio.</li>
          <li>If you already have a codebase, follow the instructions for copying over the relevant files and configuration.</li>
        </ul>

        <h3>2. Drive Constants</h3>
        <ul className="my-4">
          <li>Update values like wheel radius, gear ratio, and track width in <code>DriveConstants.java</code>.</li>
          <li>These must match your robot’s hardware for accurate motion planning.</li>
        </ul>

        <h3>3. Tuning</h3>
        <ul className="my-4">
          <li>Tune the PID and feedforward values as outlined in the docs.</li>
          <li>This is critical to getting smooth and accurate path following.</li>
          <li>Take your time—this step affects everything Road Runner does.</li>
        </ul>

        <h2>Recap</h2>
        <ul className="my-4">
          <li>Road Runner requires setup before use: installation, constants configuration, and tuning.</li>
          <li>Use the official docs to guide your setup process.</li>
          <li>You don’t need to perform the setup right now—but know that it must be done before using Road Runner code.</li>
          <li>Once fully set up and tuned, you’ll be ready to write advanced trajectory-following code.</li>
        </ul>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
