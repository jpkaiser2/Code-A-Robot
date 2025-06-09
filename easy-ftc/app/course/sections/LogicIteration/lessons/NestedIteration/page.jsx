import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import NestedIterationEditor from "./NestedIterationEditor";

export const metadata = {
  title: "Nested Iteration | EasyFTC",
};

export default function NestedIteration() {
  // This lesson has 20 points
  const lessonPoints = 20;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Nested Iteration</h1>

        <p>
          When you need to repeat actions inside other repeated actions, you use nested iteration. In Java, this means putting one loop inside another loop. This is a powerful tool that helps you solve problems involving repeated patterns, structured outputs, and layered repetition.
        </p>

        <br />
        <h2>What Is Nested Iteration?</h2>
        <p>
          Nested iteration simply means one loop inside another. The outer loop runs first, and for each time it runs once, the inner loop runs completely.
        </p>
        <p>You can think of this like:</p>
        <ul className="my-4">
          <li>A clock: for each hour (outer loop), the minute hand (inner loop) goes through 60 minutes.</li>
          <li>Going through a grid: for each row, check each column.</li>
        </ul>

        <br />
        <h2>Syntax Structure</h2>
        <p>Here's a simple structure of a nested for loop:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`for (int i = 0; i < outerLimit; i++) {
    for (int j = 0; j < innerLimit; j++) {
        // This code runs innerLimit times for every outer loop
    }
}`}
          </SyntaxHighlighter>
        </div>
        <p>The inner loop executes fully each time the outer loop runs once.</p>

        <br />
        <h2>Example: Printing a Rectangle of Stars</h2>
        <p>Let's print a rectangle that is 3 rows tall and 5 stars wide.</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`for (int row = 1; row <= 3; row++) {
    for (int col = 1; col <= 5; col++) {
        System.out.print("*");
    }
    System.out.println(); // Start a new line after each row
}`}
          </SyntaxHighlighter>
        </div>

        <p>Output:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="text" style={vscDarkPlus}>
{`*****
*****
*****`}
          </SyntaxHighlighter>
        </div>

        <p>Here's what happens:</p>
        <ul className="my-4">
          <li>The outer loop runs 3 times, once for each row.</li>
          <li>Each time, the inner loop prints 5 stars.</li>
          <li>System.out.println() moves to the next line after each row.</li>
        </ul>

        <br />
        <h2>Example: Printing a Triangle of Stars</h2>
        <p>Now let's make something a bit more interesting — a right triangle using nested loops:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`for (int row = 1; row <= 5; row++) {
    for (int col = 1; col <= row; col++) {
        System.out.print("*");
    }
    System.out.println();
}`}
          </SyntaxHighlighter>
        </div>

        <p>Output:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="text" style={vscDarkPlus}>
{`*
**
***
****
*****`}
          </SyntaxHighlighter>
        </div>

        <p>How it works:</p>
        <ul className="my-4">
          <li>The outer loop runs from 1 to 5 (each line of the triangle).</li>
          <li>The inner loop also runs, but only up to row. So:</li>
          <li>On row 1, it prints 1 star.</li>
          <li>On row 2, it prints 2 stars.</li>
          <li>And so on.</li>
        </ul>
        <p>This technique lets you make shapes, patterns, or visual output that changes with each line.</p>

        <br />
        <h2>Why It Matters in Programming</h2>
        <p>Even though you might not print triangles in robotics, understanding how nested loops work is essential:</p>
        <ul className="my-4">
          <li>It teaches you control over repeated actions.</li>
          <li>You'll use nested loops when working with multi-step tasks, combinations, structured sequences, or anything involving layered behavior.</li>
        </ul>

        <br />
        <h2>Common Mistakes to Avoid</h2>
        <ul className="my-4">
          <li>Infinite Loops: Don't forget to update your loop counters.</li>
          <li>Too Many Loops: Keep it simple. Two levels are usually enough for most beginner tasks.</li>
          <li>Mixing Counters: Use different variable names (i, j, row, col) for each loop so you don't overwrite values.</li>
        </ul>
<br />
        <h2>Try It Yourself!</h2>
        <p>Complete the code as described by the comments.</p>
        
        <div className="h-[600px] mt-4">
          <NestedIterationEditor />
        </div>

        <br />
        <h2>Recap</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Term</th>
                <th className="px-4 py-2">Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">Outer Loop</td>
                <td className="px-4 py-2">Runs once for each major repetition</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Inner Loop</td>
                <td className="px-4 py-2">Runs fully every time the outer loop runs once</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Nested Iteration</td>
                <td className="px-4 py-2">Loop inside a loop for layered repetition</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
