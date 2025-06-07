import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ForLoopsEditor from "./ForLoopsEditor";

export const metadata = {
  title: "For Loops | EasyFTC",
};

export default function ForLoops() {
  // This lesson has 18 points
  const lessonPoints = 18;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>For Loops</h1>
        
        <p>
          A for loop is a control structure that lets you repeat a block of code a specific number of times. Unlike a while loop (which runs until a condition becomes false), a for loop is ideal when you know in advance how many iterations you need.
        </p>

        <br />
        <h2>Anatomy of a For Loop</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`for (initialization; condition; update) {
    // Code to repeat
}`}
          </SyntaxHighlighter>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Part</th>
                <th className="px-4 py-2">What It Does</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 font-mono">initialization</td>
                <td className="px-4 py-2">Runs once before the loop starts. Commonly declares and sets a counter variable (e.g., int i = 0).</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">condition</td>
                <td className="px-4 py-2">Checked before each iteration. If true, the loop body executes; if false, the loop ends.</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">update</td>
                <td className="px-4 py-2">Runs after each iteration. Typically increments or decrements the counter (e.g., i++, i += 2, i--).</td>
              </tr>
            </tbody>
          </table>
        </div>

        <br />
        <h2>Execution Flow</h2>
        <ol className="my-4">
          <li>Initialize: Run the initialization step.</li>
          <li>Check: Evaluate the condition.</li>
          <li>Execute: If the condition is true, run the loop body.</li>
          <li>Update: Execute the update step.</li>
          <li>Repeat: Go back to step 2.</li>
        </ol>
        <p>When the condition becomes false, the loop stops and execution continues with the statement after the loop.</p>

        <br />
        <h2>Example</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`for (int i = 0; i < 5; i++) {
    System.out.println("Iteration #" + i);
}`}
          </SyntaxHighlighter>
        </div>

        <ul className="my-4">
          <li>Start: i = 0</li>
          <li>Condition: i &lt; 5</li>
          <li>Updates: i++ after each pass</li>
          <li>Runs: for i = 0, 1, 2, 3, 4</li>
          <li>Stops: when i becomes 5</li>
        </ul>

        <p>Output:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="text" style={vscDarkPlus}>
{`Iteration #0
Iteration #1
Iteration #2
Iteration #3
Iteration #4`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Predicting How Many Times a Loop Runs</h2>
        <p>
          You can estimate how many times your loop will run by looking at three things:
        </p>
        <ul className="my-4">
          <li>Start: the initial value of your counter.</li>
          <li>Stop condition: when the loop stops.</li>
          <li>Step: how much the counter changes each time.</li>
        </ul>
        <p>Each loop adds (or subtracts) the step until it reaches the stop condition.</p>

        <p>For example:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`for (int i = 2; i < 10; i += 2) {
    // runs for i = 2, 4, 6, 8 (4 times)
}

for (int i = 0; i <= 10; i += 5) {
    // runs for i = 0, 5, 10 (3 times)
}`}
          </SyntaxHighlighter>
        </div>

        <p>It's as simple as counting how many times you can add your step before the loop stops.</p>

        <br />
        <h2>Common Variations</h2>
        
        <h3>Counting Up</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`for (int i = 1; i <= 10; i++) {
    System.out.println(i);
}`}
          </SyntaxHighlighter>
        </div>

        <h3>Counting Down</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`for (int i = 5; i >= 1; i--) {
    System.out.println(i);
}`}
          </SyntaxHighlighter>
        </div>

        <h3>Skipping Values</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`for (int i = 0; i <= 10; i += 2) {
    System.out.println(i);
}`}
          </SyntaxHighlighter>
        </div>

        <h3>Tracking Runs with a Separate Counter</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int runCount = 0;

for (int i = 0; i < 7; i++) {
    runCount++;
    // ... your code ...
}

System.out.println("Loop ran " + runCount + " times");`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Common Pitfalls</h2>
        <ul className="my-4">
          <li>Infinite Loops
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`for (int i = 0; i < 5; ) { ... }  
// Missing update → i never changes`}
              </SyntaxHighlighter>
            </div>
          </li>
          <li>Off-by-One Errors (mixing &lt; vs &lt;=)</li>
          <li>Wrong Update Step (e.g., i-- instead of i++)</li>
          <li>Incorrect Start/Stop Values</li>
        </ul>

        <br />
        <h2>Try It Yourself!</h2>
        <p>Complete the code as described by the comments.</p>
        
        <div className="h-[600px] mt-4">
          <ForLoopsEditor />
        </div>

        <br />
        <h2>Recap</h2>
        <p>A for loop is used to repeat code a specific number of times.</p>

        <p>It has three parts:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`for (start; stop condition; step)`}
          </SyntaxHighlighter>
        </div>
        <br/>
        <p>Example:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`for (int i = 0; i < 5; i++)`}
          </SyntaxHighlighter>
        </div>

        <p>The loop:</p>
        <ul className="my-4">
          <li>Starts by initializing a counter</li>
          <li>Repeats while the condition is true</li>
          <li>Updates the counter after each run</li>
        </ul>

        <p>You can count up, count down, or skip by custom steps.</p>

        <p>You can figure out how many times it runs by looking at the start, stop, and step.</p>

        <p>Be careful with:</p>
        <ul className="my-4">
          <li>Infinite loops (missing the update)</li>
          <li>Off-by-one errors (&lt; vs &lt;=)</li>
        </ul>

        <p>For loops make your code shorter, cleaner, and easier to control when repeating tasks.</p>

        <p>Use for loops any time you want to say:<br />
        "Do this ___ number of times."</p>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
