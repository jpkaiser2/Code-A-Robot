import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Editor from "./editor";

export const metadata = {
  title: "Nested Arrays & Iteration | EasyFTC",
};

export default function NestedArrays() {
  // This lesson has 49 points
  const lessonPoints = 49;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Nested Arrays & Iteration</h1>

        <p>
          By the end of this lesson, you will be able to:
        </p>
        <ul className="my-4">
          <li>Understand what a <strong>nested array (2D array)</strong> is</li>
          <li>Create and access elements in 2D arrays</li>
          <li>Use nested loops to iterate through 2D arrays</li>
          <li>Apply patterns like <strong>row-major</strong> and <strong>column-major</strong> processing</li>
        </ul>

        <br />
        <h2>What is a Nested Array?</h2>
        <p>
          A nested array, or <strong>2D array</strong>, is like a table with rows and columns. It's an array of arrays. In Java, this is declared using two sets of brackets:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int[][] matrix = new int[3][4]; // 3 rows, 4 columns`}
          </SyntaxHighlighter>
        </div>
        <p>You can also initialize it directly:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};`}
          </SyntaxHighlighter>
        </div>
        <p>This is a 3x3 matrix. You can visualize it like this:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="text" style={vscDarkPlus}>
{`1 2 3
4 5 6
7 8 9`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Accessing Elements in 2D Arrays</h2>
        <p>To access an element, use two indices:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int x = matrix[1][2]; // Gets the value 6`}
          </SyntaxHighlighter>
        </div>
        <ul className="my-4">
          <li>The first index is the <strong>row</strong> (starting from 0)</li>
          <li>The second index is the <strong>column</strong> (also starting from 0)</li>
        </ul>
        <p>You can also modify elements:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`matrix[0][1] = 42;`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Iterating Through a 2D Array</h2>
        <p>We use <strong>nested loops</strong> to go through all the elements in a 2D array.</p>
        <h3>Example: Print All Elements</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`for (int row = 0; row < matrix.length; row++) {
    for (int col = 0; col < matrix[row].length; col++) {
        System.out.print(matrix[row][col] + " ");
    }
    System.out.println();
}`}
          </SyntaxHighlighter>
        </div>
        <p>This goes row by row and prints each element in that row.</p>

        <h2>Row-Major vs Column-Major Iteration</h2>
        <p><strong>Row-Major:</strong> Process each row from left to right.</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`for (int i = 0; i < matrix.length; i++) {
    // i = row index
    for (int j = 0; j < matrix[i].length; j++) {
        // j = column index
    }
}`}
          </SyntaxHighlighter>
        </div>
        <p><strong>Column-Major:</strong> Process each column from top to bottom. This assumes all rows have the same length:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`for (int j = 0; j < matrix[0].length; j++) {
    for (int i = 0; i < matrix.length; i++) {
        // matrix[i][j]
    }
}`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Common Patterns</h2>
        <ol className="my-4 list-decimal ml-6">
          <li>
            <strong>Summing all elements:</strong>
            <div className="bg-muted p-4 rounded-md overflow-x-auto mt-2 mb-2">
              <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int sum = 0;
for (int[] row : matrix) {
    for (int val : row) {
        sum += val;
    }
}`}
              </SyntaxHighlighter>
            </div>
          </li>
          <li>
            <strong>Counting occurrences:</strong>
            <div className="bg-muted p-4 rounded-md overflow-x-auto mt-2 mb-2">
              <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int count = 0;
for (int[] row : matrix) {
    for (int val : row) {
        if (val == target) {
            count++;
        }
    }
}`}
              </SyntaxHighlighter>
            </div>
          </li>
          <li>
            <strong>Finding the largest value:</strong>
            <div className="bg-muted p-4 rounded-md overflow-x-auto mt-2 mb-2">
              <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int max = Integer.MIN_VALUE;
for (int[] row : matrix) {
    for (int val : row) {
        if (val > max) {
            max = val;
        }
    }
}`}
              </SyntaxHighlighter>
            </div>
          </li>
        </ol>

        <br />
        <h2>Try It Yourself!</h2>
        <p>Complete the code according to the comments.</p>
        <div className="h-[600px] mt-4">
          <Editor />
        </div>
        <br />

        <h2>Recap</h2>
        <ul className="my-4">
          <li>A 2D array is an array of arrays (rows and columns)</li>
          <li>Use <code>array[i][j]</code> to access elements</li>
          <li>Use nested loops to process each element</li>
          <li>Row-major and column-major iteration give different processing orders</li>
          <li>You can apply useful patterns like summing rows or finding maximums</li>
          <li>Nested arrays are powerful for grid-like problems, especially in robotics simulations, game boards, or pixel-based computations.</li>
        </ul>

        <br />
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
