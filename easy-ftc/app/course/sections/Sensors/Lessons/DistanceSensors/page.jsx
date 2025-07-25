import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export const metadata = {
  title: "Distance Sensors | EasyFTC",
};

export default function DistanceSensors() {
  const lessonPoints = 67;

  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Distance Sensors</h1>

        <p>By the end of this lesson, you'll be able to:</p>
        <ul className="my-4">
          <li>Understand how distance sensors work</li>
          <li>Set up and configure a distance sensor on your robot</li>
          <li>Access and use distance values in Java code</li>
          <li>Use distance sensors to avoid obstacles and detect positions</li>
          <li>Apply best practices for reliable sensing</li>
        </ul>

        <br />
        <h2>What Is a Distance Sensor?</h2>
        <p>
          A distance sensor measures how far away something is using reflected light,
          typically infrared or laser. The most common distance sensor in FTC is the REV
          Color/Distance Sensor, which does both color and distance sensing.
        </p>
        <ul className="my-4">
          <li>Measures distance based on how much light bounces back</li>
          <li>Returns values in centimeters or inches</li>
          <li>Most accurate at short distances (under 30 cm)</li>
          <li>Often combined with a color sensor in one module</li>
        </ul>

        <br />
        <h2>Why Use a Distance Sensor?</h2>
        <p>Distance sensors are helpful when your robot needs to:</p>
        <ul className="my-4">
          <li>Detect objects and stop before hitting them</li>
          <li>Know when a game element is in place</li>
          <li>Line up precisely with a wall or pole</li>
          <li>Make decisions based on which side has a closer object</li>
        </ul>

        <br />
        <h2>How to Set It Up</h2>
        <ul className="my-4">
          <li>Plug the sensor into an I2C port on the REV Hub</li>
          <li>Use the Robot Controller app to name it (e.g. <code>sensor_distance</code>)</li>
          <li>No extra wiring is needed</li>
        </ul>

        <br />
        <h2>Getting Distance Sensor Values</h2>
        <p>To use the sensor in code:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`import com.qualcomm.robotcore.hardware.DistanceSensor;

DistanceSensor distanceSensor;

@Override
public void init() {
    distanceSensor = hardwareMap.get(DistanceSensor.class, "sensor_distance");
}`}
          </SyntaxHighlighter>
        </div>
        <p>Then get the distance:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto mt-2">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`double distanceCM = distanceSensor.getDistance(DistanceUnit.CM);
double distanceIN = distanceSensor.getDistance(DistanceUnit.INCH);`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Example: Avoiding Obstacles</h2>
        <p>This code stops the robot if something is closer than 10 cm:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`@Override
public void loop() {
    double distance = distanceSensor.getDistance(DistanceUnit.CM);
    telemetry.addData("Distance", distance);

    if (distance < 10.0) {
        motor.setPower(0); // Stop if too close
    } else {
        motor.setPower(0.5); // Keep moving
    }
}`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Advanced Use: Choosing Between Positions</h2>
        <p>
          Many teams use multiple distance sensors to decide between positions. If the left sensor reads a shorter distance than the right, it may indicate an object is on the left side.
        </p>
        <p>
          You can also rotate the robot slightly and sample different directions with one sensor.
        </p>

        <br />
        <h2>Tips for Reliable Use</h2>
        <ul className="my-4">
          <li><strong>Avoid sunlight:</strong> Infrared from the sun can mess with readings</li>
          <li><strong>Use short range:</strong> Best results are under 30 cm</li>
          <li><strong>Mount securely:</strong> Loose sensors give bad data</li>
          <li><strong>Combine:</strong> Use timers, encoders, or sensor fusion for safety</li>
        </ul>

        <br />
        <h2>Recap</h2>
        <ul className="my-4">
          <li>Distance sensors use reflected light to measure how far away something is</li>
          <li>REV Color/Distance Sensor is the most common in FTC</li>
          <li>Use <code>getDistance()</code> to get distance in cm or inches</li>
          <li>Helpful for obstacle detection, alignment, and autonomous decisions</li>
          <li>Mount securely, test in your environment, and use with other sensors for reliability</li>
        </ul>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
