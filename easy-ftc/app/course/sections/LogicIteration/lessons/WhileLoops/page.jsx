import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import WhileLoopsEditor from "./WhileLoopsEditor";

export const metadata = {
  title: "While Loops | EasyFTC",
};

export default function WhileLoops() {
  // This lesson has 16 points
  const lessonPoints = 16;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>While Loops</h1>

        <p>
          A while loop tells your program to repeat a block of code as long as a certain condition is true. In other words, the loop keeps running "while" the condition remains true, and it stops immediately when the condition becomes false. This is useful when you want your program to keep checking something over and over until a goal is reached. For example, "Keep asking for a password until the user has entered it correctly" or "Keep printing numbers until you reach 10."
        </p>
 
        <br />
        <h2>How a While Loop Works</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`while (condition) {
    // This code runs again and again as long as 'condition' is true
}
// Once 'condition' is false, execution moves here and the loop is done`}
          </SyntaxHighlighter>
        </div>

        <ul className="my-4">
          <li>condition is a true-or-false test (a boolean expression).</li>
          <li>Before each repetition, Java checks condition:</li>
          <li>If it's true, the code inside the braces {'{ }'} executes.</li>
          <li>If it's false, the loop ends immediately, and the program continues with any code that follows the loop.</li>
        </ul>

        <p className="font-semibold mb-2">Key Point: A while loop is about continuously checking "Is this condition still true?" If yes, keep repeating. As soon as it becomes false, the loop stops.</p>

        <br />
        <h2>When to Use It</h2>
        <ul className="my-4">
          <li>Use a while loop when you don't know exactly how many times you need to repeat something.</li>
          <li>You are telling your program: "Keep doing this task until X becomes false."</li>
        </ul>

        <br />
        <h2>Ensuring the Loop Can End</h2>
        <p>
          If the condition never turns false, the loop will never stop. That is called an infinite loop, and it locks your program into repeating forever. To avoid that, you must change at least one variable or state inside the loop so that the condition will eventually become false.
        </p>

        <br />
        <h2>Example 1: Counting From 1 to 5</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class CountUp {
    public static void main(String[] args) {
        int i = 1; // Start at 1

        // Loop runs while i is 1, 2, 3, 4, or 5 (i <= 5)
        while (i <= 5) {
            System.out.println(i);
            i = i + 1;        // Increase i by 1 each time, so eventually i > 5
        }

        // Once i becomes 6, i <= 5 is false, so the loop ends
        System.out.println("Done!");
    }
}

/*
 Expected output:
 1
 2
 3
 4
 5
 Done!
*/`}
          </SyntaxHighlighter>
        </div>

        <ul className="my-4">
          <li>The loop's condition is i &lt;= 5.</li>
          <li>Each time through, i increases by 1.</li>
          <li>When i reaches 6, i &lt;= 5 is false, so the loop stops.</li>
        </ul>

        <p className="mt-4">💡 Remember: If you forgot i = i + 1, then i would stay at 1, the condition 1 &lt;= 5 always stays true, and the program is stuck printing 1 forever.</p>

        <br />
        <h2>Example 2: Asking for a Password</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`import java.util.Scanner;

public class PasswordCheck {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = "";  // Start as empty

        // Keep looping while the typed input is NOT "open_sesame"
        while (!input.equals("open_sesame")) {
            System.out.print("Enter password: ");
            input = scanner.nextLine();
        }

        // As soon as input.equals("open_sesame") is true, loop ends
        System.out.println("Access granted!");
        scanner.close();
    }
}`}
          </SyntaxHighlighter>
        </div>

        <ul className="my-4">
          <li>The loop condition is !input.equals("open_sesame"), which means "input is not equal to 'open_sesame'."</li>
          <li>As long as the typed password is wrong, input.equals("open_sesame") stays false, so !input.equals(...) stays true, and the loop continues.</li>
          <li>Once the user types "open_sesame," input.equals("open_sesame") becomes true, so !input.equals(...) becomes false. That false condition stops the loop.</li>
        </ul>

        <br />
        <h2>Estimating Loop Iterations When Using a Counter</h2>
        <p>
          If your loop changes a number by a fixed amount each time, you can figure out exactly how many times it will run before the condition flips from true to false.
        </p>

        <p className="font-semibold mb-2">Steps to Calculate Iterations:</p>
        <ul className="my-4">
          <li>Initial Value: What number does your loop variable start at? (e.g., i = 2)</li>
          <li>Stopping Value: What value makes the condition false? (For i &lt;= 10, it stops when i becomes 11.)</li>
          <li>Step Size: How much does the variable change each iteration? (e.g., i = i + 2 means a step of 2.)</li>
        </ul>

        <p className="font-semibold mb-2">Formula:</p>
        <p className="text-center">(StoppingValue – InitialValue) ÷ StepSize</p>
        <p className="text-center">Round up if the result isn't a whole number.</p>

        <p className="mt-4">Example:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int i = 2;
while (i <= 10) {
    i = i + 2;  // i takes values 2, 4, 6, 8, 10, then next is 12 which stops loop
}`}
          </SyntaxHighlighter>
        </div>

        <ul className="my-4">
          <li>InitialValue = 2</li>
          <li>The condition i &lt;= 10 stops when i becomes 12 (first number &gt; 10).</li>
          <li>StoppingValue = 12</li>
          <li>StepSize = 2</li>
          <li>Calculate: (12 – 2) ÷ 2 = 10 ÷ 2 = 5.</li>
          <li>So the loop body executes 5 times (i: 2 → 4 → 6 → 8 → 10).</li>
        </ul>

        <p className="mt-4">💡 If you used i = i + 3 instead, you'd do (first number &gt; 10, which is 11 – 2) ÷ 3, then round up as needed.</p>

        <br />
        <h2>Spotting and Fixing Infinite Loops</h2>
        <p>
          An infinite loop happens when the condition never becomes false. The program ends up repeating forever.
        </p>

        <p className="font-semibold mb-2">Common Causes:</p>
        <ul className="my-4">
          <li>Forgetting to update the loop variable.</li>
          <li>Using a condition that never changes (for example, while (true) {'{ }'} without any break;).</li>
        </ul>

        <p className="mt-4">Example of an Infinite Loop:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int x = 5;
while (x > 0) {
    // We never change x, so x stays 5. Condition always true.
}`}
          </SyntaxHighlighter>
        </div>

        <p className="mt-4">Fix: Update x inside the loop so it eventually fails the test:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int x = 5;
while (x > 0) {
    x = x - 1;  // Now x goes 5 → 4 → 3 → 2 → 1 → 0. When x is 0, x > 0 is false.
}`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Try It Yourself!</h2>
        <p>Complete the code as described by the comments.</p>
        
         <div className="h-[600px] mt-4">
          <WhileLoopsEditor />
        </div>

        <br />
        <h2>Recap</h2>
        <ul className="my-4">
          <li>A while loop repeats its code block as long as the condition is true.</li>
          <li>Key Idea: The loop keeps checking "Is the condition still true?" If yes, run again. If no, stop.</li>
          <li>Always update something inside the loop (a variable or input) so that the condition can eventually become false.</li>
          <li>When using a counter that changes by a fixed amount, you can calculate iterations with:
            <br />(StoppingValue – InitialValue) ÷ StepSize</li>
          <li>Watch out for infinite loops: if you never make the condition false, the program never moves on.</li>
        </ul>
        
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
