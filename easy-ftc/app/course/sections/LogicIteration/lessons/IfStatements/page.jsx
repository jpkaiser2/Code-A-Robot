import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import IfEditor from "./IfEditor";

export const metadata = {
  title: "If Statements | EasyFTC",
};

export default function IfStatements() {
  // This lesson has 13 points
  const lessonPoints = 13;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>If Statements</h1>

        <p>
          In programming, making decisions based on certain conditions is essential, especially in robotics, where your robot often needs to react differently depending on sensor readings or controller inputs. The if statement is the simplest form of decision-making in Java. In this lesson, we'll cover:
        </p>
        <ul className="my-4">
          <li>What an if statement does</li>
          <li>The basic syntax of an if statement</li>
          <li>How to write conditions using boolean expressions</li>
          <li>Examples showing how if statements control program flow</li>
        </ul>

        <br />
        <h2>What Is an if Statement?</h2>
        <p>
          An if statement lets your program choose whether to run a block of code, based on whether a condition is true or false.
        </p>
        <p className="font-semibold mb-2">The general idea:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`if (condition) {
    // code to run when condition is true
}
// code here always runs, regardless of condition`}
          </SyntaxHighlighter>
        </div>
        <p>
          When Java reaches an if, it evaluates the condition (which must be a boolean expression).
          If the condition is true, Java executes everything inside the curly braces {'{ ... }'}.
          If the condition is false, Java skips over that block and continues with the next statement after the closing {'}'}.
        </p>

        <br />
        <h2>Basic Syntax of an if Statement</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`if (booleanExpression) {
    // one or more Java statements
}`}
          </SyntaxHighlighter>
        </div>
        <ul className="my-4">
          <li><strong>booleanExpression:</strong> Any expression that results in true or false.</li>
          <li>Examples: x &gt; 10, armPosition &lt;= 1000, isPressed == true, (gamepad1.right_trigger &gt; 0.5)</li>
          <li><strong>Curly braces {'{ }'}:</strong> Define a block of code. If the condition is true, all statements inside these braces run.</li>
          <li>You must include parentheses around the booleanExpression.</li>
          <li>If you write only one statement inside, braces are still recommended for clarity. Although Java allows omitting them in this case, it's best practice to keep them to avoid mistakes.</li>
        </ul>

        <br />
        <h2>Example Breakdown</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int batteryLevel = 75;             // batteryLevel is 75%
boolean isLowBattery = batteryLevel < 20;  // evaluates to false

if (isLowBattery) {
    System.out.println("Warning: Low battery!");
}
System.out.println("Continuing robot operations...");`}
          </SyntaxHighlighter>
        </div>
        <p>
          Let's break this down:
        </p>
        <ul className="my-4">
          <li>int batteryLevel = 75;</li>
          <li>boolean isLowBattery = batteryLevel &lt; 20;</li>
          <li>The expression batteryLevel &lt; 20 checks if 75 &lt; 20. That is false, so isLowBattery is false.</li>
          <li>if (isLowBattery) {'{ ... }'}</li>
          <li>Since isLowBattery is false, Java skips the println inside the braces.</li>
          <li>Java then executes System.out.println("Continuing robot operations..."); regardless of the if.</li>
        </ul>

        <p>Output when you run this code:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="text" style={vscDarkPlus}>
{`Continuing robot operations...`}
          </SyntaxHighlighter>
        </div>

        <p>If instead batteryLevel were 15, then isLowBattery would be true, and the output would be:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="text" style={vscDarkPlus}>
{`Warning: Low battery!
Continuing robot operations...`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Writing Conditions with Boolean Expressions</h2>
        <p>
          You already learned about boolean expressions in the previous lesson such as:
        </p>
        <ul className="my-4">
          <li>Relational operators: &gt; , &lt; , &gt;= , &lt;= , == , !=</li>
          <li>Logical operators: && (AND), || (OR), ! (NOT)</li>
        </ul>
        <p>
          Any combination of these can be the booleanExpression inside your if. Java requires that this expression evaluates to a boolean (true or false).
        </p>
        <p className="font-semibold mb-2">Examples of valid conditions:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`if (x == 0) { ... }
if (distanceToWall <= 50) { ... }
if (gamepad1.a && !gamepad1.b) { ... }  // "a AND (NOT b)"
if ((x > 0) && (x < 100)) { ... }       // x is between 1 and 99`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>if Statement Examples</h2>
        
        <br />
        <h3>Example 1: Checking a Button Press</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`// Suppose we want to run an arm motor only when 'A' is pressed.
if (gamepad1.a) {
    armMotor.setPower(1.0);  // run arm at full power
}
// Motor stays off if 'A' isn't pressed`}
          </SyntaxHighlighter>
        </div>
        <ul className="my-4">
          <li>Condition: gamepad1.a is already a boolean (true if pressed, false otherwise).</li>
          <li>If the driver holds A down, armMotor.setPower(1.0); executes. Otherwise, nothing happens.</li>
        </ul>

        <br />
        <h3>Example 2: Checking Sensor Value</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int distance = distanceSensor.getDistance(DistanceUnit.MM); // stores an integer value. Don't worry about this yet :)

if (distance < 200) {
    // If the robot is too close to an obstacle (< 200 mm), stop and back up
    leftDrive.setPower(0);
    rightDrive.setPower(0);
}`}
          </SyntaxHighlighter>
        </div>
        <ul className="my-4">
          <li>distanceSensor.getDistance(...) returns an integer (e.g., 150 mm).</li>
          <li>The condition distance &lt; 200 is true if the robot is closer than 20 cm.</li>
          <li>If true, both drive motors stop (power set to 0). If false, nothing changes here.</li>
        </ul>

        <br />
        <h3>Example 3: Combining Relational and Logical Operators</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int xPosition = odometryXEncoder.getCurrentPosition();
int yPosition = odometryYEncoder.getCurrentPosition();

// If robot is inside a 30×30 box (0 ≤ x < 30 and 0 ≤ y < 30), spin the wheel
if ((xPosition >= 0 && xPosition < 30) && (yPosition >= 0 && yPosition < 30)) {
    wheelServo.setPosition(0.5);
}`}
          </SyntaxHighlighter>
        </div>
        <ul className="my-4">
          <li>We check two things at once:</li>
          <li>xPosition &gt;= 0 && xPosition &lt; 30</li>
          <li>yPosition &gt;= 0 && yPosition &lt; 30</li>
          <li>Both have to be true for the whole condition to be true (because of && between them).</li>
          <li>If your robot's odometry says it's in that 30×30 area, the wheel servo is set to 0.5. Otherwise, nothing happens.</li>
        </ul>

        <br />
        <h2>Common Mistakes</h2>
        
        <br />
        <h3>Condition must be boolean</h3>
        <p>
          This is different from some other languages where you can put an int directly in if(intValue). In Java, you must write a boolean expression (e.g., x == 5, not just x).
        </p>

        <br />
        <h3>Using = vs. ==</h3>
        <ul className="my-4">
          <li>= is assignment.</li>
          <li>== checks equality.</li>
          <li>Always use == when you want to compare values inside an if.</li>
        </ul>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int x = 5;
if (x == 5) {    // CORRECT: comparison  
    // ...
}
if (x = 5) {     // ERROR: cannot convert int to boolean
    // ...
}`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h3>Forgotten braces</h3>
        <p>
          Writing if (condition) singleStatement; without braces can lead to mistakes when adding more lines later.
          Always use braces, even for single statements.
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`if (condition) {  // Correct brace usage
    doSomething();
}
doSomethingElse();  // not part of if`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h3>Semicolon after if</h3>
        <p>Don't put a semicolon right after the if(...):</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`if (x > 0); {       // WRONG - this semicolon ends the if  
    // This block always runs
}`}
          </SyntaxHighlighter>
        </div>
        <p>
          Make sure the opening brace {'{'} immediately follows the ) with no semicolon in between.
        </p>

        

        <br />
        <h2>Try It Yourself!</h2>
        <p>Complete the code as described by the comments.</p>
        
        <div className="h-[600px] mt-4">
          <IfEditor />
        </div>
<br />
        <h2>Recap</h2>
        <ul className="my-4">
          <li>An if (condition) {'{ ... }'} block lets you execute code only when condition is true.</li>
          <li>Conditions must be boolean expressions—i.e., they evaluate to true or false.</li>
          <li>You can combine relational operators (&gt; , &lt; , ==, etc.) and logical operators (&&, ||, !) inside the if.</li>
          <li>Always use braces {'{ }'} , even for a single statement, to keep your code clear and prevent mistakes.</li>
          <li>Multiple standalone if statements run independently, one after another.</li>
        </ul>
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
