import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const metadata = {
  title: "Primitive Types | EasyFTC",
};

export default function primitiveTypes() {
  // This lesson has 3 points (fourth lesson)
  const lessonPoints = 3;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Primitive Types</h1>
        
        <br />
        <h2>What You'll Learn</h2>
        <ul>
          <li>How to write comments to explain your code</li>
          <li>What primitive types are in Java</li>
          <li>How to create and use variables</li>
          <li>The difference between declaring and initializing a variable</li>
          <li>The rules for naming variables, and what camel case is</li>
          <li>What a String is and how it stores text</li>
          <li>How to print variables and combine text using concatenation</li>
          <li>Real examples from FTC robot code</li>
        </ul>
        
        <br />
        <h2>What Are Comments?</h2>
        <p>
          Imagine you're writing notes to yourself or teammates in your code. These notes are called comments. 
          Java will ignore them when running your program, but they're super helpful for humans reading your code later.
        </p>
        <p>There are two types of comments:</p>
        <p>Single-line comment:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`// This is a comment on one line`}
          </SyntaxHighlighter>
        </div>

        <br />
        <p>Multi-line comment:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`/*
 This is a comment
 that goes across multiple lines.
*/`}
          </SyntaxHighlighter>
        </div>

        <br />
        <p className="flex items-start">
          <span className="text-yellow-500 text-xl mr-2">💡</span>
          <span>Use comments to explain what your code does, especially when it's something complex. This is a habit every great programmer has!</span>
        </p>

        <br />
        <h2>What Are Primitive Types?</h2>
        <p>
          Primitive types are the most basic data types in Java. They are used to store simple values like numbers, 
          true/false, or a single letter. You'll use these all the time in your FTC code to control things like motor 
          power, sensor values, and conditions.
        </p>
        <p>Here are the main ones you'll use:</p>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Example</th>
                <th className="px-4 py-2">What It Stores</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 font-mono">int</td>
                <td className="px-4 py-2 font-mono">int motorPower = 50;</td>
                <td className="px-4 py-2">Whole numbers like 0, 100, or -42</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">double</td>
                <td className="px-4 py-2 font-mono">double distance = 12.5;</td>
                <td className="px-4 py-2">Decimal numbers (more precise)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">boolean</td>
                <td className="px-4 py-2 font-mono">boolean isPressed = true;</td>
                <td className="px-4 py-2">Only true or false</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">char</td>
                <td className="px-4 py-2 font-mono">char grade = 'A';</td>
                <td className="px-4 py-2">A single character (like a letter)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">float</td>
                <td className="px-4 py-2 font-mono">float speed = 5.7f;</td>
                <td className="px-4 py-2">Decimal numbers (less precise)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <br />
        <p className="flex items-start">
          <span className="text-yellow-500 text-xl mr-2">💡</span>
          <span>In FTC, you'll mostly use int, double, and boolean.</span>
        </p>

        <br />
        <h2>What Is a Variable?</h2>
        <p>
          A variable is like a labeled container that stores a piece of information. 
          You give it a name and put a value in it. Later, you can use or change that value in your code.
        </p>
        <p>Syntax</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`type name = value;`}
          </SyntaxHighlighter>
        </div>

        <br />
        <p>Example:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`int motorPower = 100;
double armAngle = 45.5;
boolean clawClosed = false;`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Declaring vs Initializing</h2>
        <p>
          You can declare a variable (say it exists), or initialize it (give it a value), or do both at once.
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`int motorPower;           // Declaration only
motorPower = 100;         // Initialization later`}
          </SyntaxHighlighter>
        </div>

        <br />
        <p>Usually, we do both at once for simplicity:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`int motorPower = 100;`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Camel Case and Naming Variables</h2>
        <p>Variable names must follow some rules:</p>
        <ul>
          <li>Must start with a letter (not a number)</li>
          <li>Can only use letters, numbers, and underscores (_)</li>
          <li>Can't be a Java keyword (like class or public)</li>
          <li>No spaces allowed</li>
          <li>Should describe what the variable holds</li>
        </ul>

        <br />
        <p>In Java, we use camel case to name variables. That means:</p>
        <ul>
          <li>The first word is lowercase</li>
          <li>Every new word starts with a capital letter</li>
        </ul>

        <br />
        <p>✅ Good examples:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`int armPosition;
double liftHeight;
boolean isClawClosed;`}
          </SyntaxHighlighter>
        </div>

        <br />
        <p>🚫 Bad examples:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`int Arm_Position; // Underscore and capital at start
int arm position; // No spaces allowed`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>What Is a String?</h2>
        <p>
          A String is a special kind of variable that stores text. Even though it looks simple, 
          it's actually an object, not a primitive type. That just means it comes with extra abilities, called methods. Notice that String always starts with a capital "S". All objects start with a capital letter, but we will cover this in an upcoming section.  
        </p>
        <p>Examples:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`String robotName = "RoadRunner";
String message = "Ready to start!";`}
          </SyntaxHighlighter>
        </div>

        <br />
        <p>In FTC, you'll use String all the time when sending messages to the Driver Station using telemetry.</p>

        <br />
        <h3>Useful String Methods</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Method</th>
                <th className="px-4 py-2">What It Does</th>
                <th className="px-4 py-2">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 font-mono">.length()</td>
                <td className="px-4 py-2">Tells you how many characters are in the text</td>
                <td className="px-4 py-2 font-mono">"FTC".length() → 3</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">.toUpperCase()</td>
                <td className="px-4 py-2">Converts text to all capital letters</td>
                <td className="px-4 py-2 font-mono">"robot".toUpperCase() → "ROBOT"</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">.contains("x")</td>
                <td className="px-4 py-2">Checks if it includes a word or letter</td>
                <td className="px-4 py-2 font-mono">"ready".contains("e") → true</td>
              </tr>
            </tbody>
          </table>
        </div>

        <br />
        <p>You'll learn more about objects and methods soon, but for now just know you can use these like this:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`String team = "Silly Servos";
int length = team.length();  // Stores 12
String loudTeam = team.toUpperCase(); // "SILLY SERVOS"`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Printing Variables (and Concatenation!)</h2>
        <p>
          Sometimes, you want to see what's happening in your code. You can print a variable using:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`System.out.println(variableName);`}
          </SyntaxHighlighter>
        </div>

        <br />
        <p>
          But if you want to show some other text in addition to the value of a variable, 
          you use concatenation, which means joining text together using the + symbol:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`int speed = 100;
System.out.println("The speed is: " + speed);`}
          </SyntaxHighlighter>
        </div>

        <br />
        <p>This will output:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter style={vscDarkPlus}>
            {`The speed is: 100`}
          </SyntaxHighlighter>
        </div>

        <br />
        <p>You can also combine multiple variables and strings:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`String name = "Robo";
int teamNumber = 12345;
System.out.println("Team: " + name + " #" + teamNumber);`}
          </SyntaxHighlighter>
        </div>

        <br />
        <p>Output:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter style={vscDarkPlus}>
            {`Team: Robo #12345`}
          </SyntaxHighlighter>
        </div>

        <br />
        <p>
          This is helpful when you're trying to debug your program — find out what values are changing or what the robot is doing.
        </p>

        <br />
        <h2>FTC Code Example</h2>
        <p>Here's a real-world example of everything in action:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`public void runOpMode() {
    // Declare and initialize variables
    int drivePower = 75;
    boolean clawClosed = false;
    double liftHeight = 10.2;
    String status = "Initializing";

    // Show values on the Driver Station
    telemetry.addData("Status", status);
    telemetry.addData("Drive Power", drivePower);
    telemetry.addData("Claw Closed?", clawClosed);
    telemetry.addData("Lift Height", liftHeight);
    telemetry.update();

    waitForStart();  // Wait for the match to start

    // Update the robot's status
    status = "Running!";
    telemetry.addData("Status", status);
    telemetry.update();
}`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Wrap-Up</h2>
        <p>You've now learned how to:</p>
        <ul>
          <li>Use comments to describe your code</li>
          <li>Understand and use primitive types</li>
          <li>Create and name variables</li>
          <li>Follow camel case naming conventions</li>
          <li>Work with String to store and manipulate text</li>
          <li>Use concatenation to print values</li>
          <li>Apply all this in your FTC robot code</li>
        </ul>
        
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
} 