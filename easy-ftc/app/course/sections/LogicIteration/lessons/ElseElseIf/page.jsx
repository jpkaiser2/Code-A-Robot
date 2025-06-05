import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ElseIfEditor from "./ElseIfEditor";

export const metadata = {
  title: "Else & Else If | EasyFTC",
};

export default function ElseElseIf() {
  // This lesson has 14 points
  const lessonPoints = 14;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Else & Else If Statements</h1>

        <p>
          In this lesson, you'll learn how to use else and else if to handle multiple conditions in Java. These let your programs make decisions when the initial if condition is not met.
        </p>

        <br />
        <h2>When to Use else</h2>
        <p>
          The else block runs when the if condition evaluates to false. It provides a fallback action.
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`if (powerButtonPressed) {
  // If the power button is pressed, start the robot
  startRobot();
}
else {
  // If the power button is not pressed, display a message
  System.out.println("Robot is waiting for power.");
}`}
          </SyntaxHighlighter>
        </div>
        <p className="mt-4">💡 The else does not have a condition. It automatically runs when the if fails.</p>

        <br />
        <h2>Else If for Multiple Options</h2>
        <p>
          Use else if when you need to check more than two possibilities. It sits between an initial if and a final else (optional).
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`if (distanceToWall < 10) {
  // If too close to a wall, back up
  driveBackward(0.5);
}
else if (batteryLevel < 20) {
  // If battery is low but not too close to wall, stop and alert
  stopAllMotors();
  System.out.println("Battery low: 20% remaining.");
}
else {
  // If neither condition is true, proceed normally
  driveForward(0.8);
}`}
          </SyntaxHighlighter>
        </div>

        <p className="mt-4">How it works:</p>
        <ul className="my-4">
          <li>Java checks the first if (distanceToWall &lt; 10). If true, it executes that block and skips the rest.</li>
          <li>If the first if is false, Java checks the else if (batteryLevel &lt; 20). If that is true, it executes that block and skips the else.</li>
          <li>If both if and else if are false, Java goes to the final else block (if provided).</li>
        </ul>

        <br />
        <h2>Syntax Rules and Best Practices</h2>
        <ul className="my-4">
          <li>Order matters: Place the most specific or critical conditions first.</li>
          <li>Only one branch runs: Once a matching condition is found, Java exits the entire if-else if-else chain.</li>
          <li>else is optional: You can omit else if you only need to check multiple if conditions without a fallback.</li>
          <li>No extra braces around else if condition: Write else if (condition) (not else {'{'} if (condition) {'}'}).</li>
        </ul>

        <p className="font-semibold mb-2">✅ Correct:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`if (x > 0) {
  System.out.println("Positive");
} 
else if (x == 0) {
  System.out.println("Zero");
} 
else {
  System.out.println("Negative");
}`}
          </SyntaxHighlighter>
        </div>

        <p className="font-semibold mb-2 mt-4">❌ Incorrect:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`if (x > 0) {
  System.out.println("Positive");
} 
else { 
  if (x == 0) {
    System.out.println("Zero");
  } 
}
else {
  System.out.println("Negative");
}`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Chaining Separate if Statements</h2>
        <p>
          When you chain separate if statements instead of using else if, more than one block can run, leading to unexpected results. Consider this example:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int score = 93;
char grade;

if (score >= 90) {
  grade = 'A';
}
if (score >= 80) {
  grade = 'B';
}
if (score >= 70) {
  grade = 'C';
} 
else {
  grade = 'D';
}

System.out.println("Grade: " + grade); // Output: Grade: C`}
          </SyntaxHighlighter>
        </div>

        <p className="mt-4">
          Issue: All if statements are evaluated independently. Since score &gt;= 90, grade is set to 'A', then score &gt;= 80 is true so grade becomes 'B', then score &gt;= 70 is true so grade becomes 'C'. The final print shows 'C', not the intended 'A'.
        </p>

        <p className="mt-4">Use else if to ensure only one branch executes. Here is the correct code:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int score = 93;
char grade;

if (score >= 90) {
  grade = 'A';
} 
else if (score >= 80) {
  grade = 'B';
} 
else if (score >= 70) {
  grade = 'C';
}
else {
  grade = 'D';
}

System.out.println("Grade: " + grade); // Output: Grade: A`}
          </SyntaxHighlighter>
        </div>

        <p className="mt-4">
          Once score &gt;= 90 is true, Java assigns grade to 'A' and skips all other else if and else blocks, printing the correct grade.
        </p>
        <br />
        <h2>Try It Yourself!</h2>
        <p>Complete the code as described by the comments.</p>
        
        <div className="h-[600px] mt-4">
          <ElseIfEditor />
        </div>

        <br />
        <h2>Recap</h2>
        <ul className="my-4">
          <li>Use else as a catch-all when an if condition fails.</li>
          <li>Use else if to check additional conditions sequentially.</li>
          <li>Only one branch in an if-else if-else chain is executed per run.</li>
          <li>Order your conditions from most to least specific.</li>
        </ul>
        
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
