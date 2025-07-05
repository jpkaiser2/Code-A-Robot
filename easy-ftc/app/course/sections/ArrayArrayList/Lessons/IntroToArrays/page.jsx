import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ArraysEditor from "./ArraysEditor";

export const metadata = {
  title: "Introduction to Arrays | EasyFTC",
};

export default function Arrays() {
  // This lesson has 42 points
  const lessonPoints = 42;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Introduction to Arrays</h1>

        <p>
          When you're programming, you often need to store lots of related data, like the scores of all players on a team, or the power values for all four motors on a robot. That's where arrays come in. In this lesson, we'll cover:
        </p>
        <ul className="my-4">
          <li>What an array is and why we use them</li>
          <li>How to declare and initialize arrays</li>
          <li>How to access and modify array elements</li>
          <li>Understanding array indexes and the length property</li>
          <li>Common mistakes to avoid</li>
        </ul>

        <br />
        <h2>What Is an Array?</h2>
        <p>
          An array is a container that can hold multiple values of the same type. Think of it like a row of boxes. Each box holds one value, and you can label each box with a number.
        </p>
        <p>
          Imagine a row of lockers labeled 0, 1, 2, 3, and so on. Each locker can store something (like a student's backpack). That's basically how an array works.
        </p>

        <br />
        <h2>Array Syntax (Declaration & Initialization)</h2>
        
        <br />
        <h3>1. Declaring an array</h3>
        <p>
          You need to tell Java what type of data the array will hold.
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int[] scores;`}
          </SyntaxHighlighter>
        </div>
        <p>
          This says: "I'm going to make an array that stores int values." But right now, it's just a variable — there's no actual space created yet.
        </p>

        <br />
        <h3>2. Creating (Initializing) an array</h3>
        <p>
          Now let's actually create an array that can hold 5 integers:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`scores = new int[5];`}
          </SyntaxHighlighter>
        </div>
        <p>
          Or combine declaration and initialization:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int[] scores = new int[5];`}
          </SyntaxHighlighter>
        </div>
        <p>
          That gives you an array like this:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`[0, 0, 0, 0, 0]`}
          </SyntaxHighlighter>
        </div>
        <p>
          All the values are 0 by default.
        </p>

        <br />
        <h3>3. Shortcut with values</h3>
        <p>
          You can also create and fill an array right away:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int[] powers = {80, 60, 90, 70};`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Indexes and Length</h2>
        <p>
          Each value in an array has a position, called an index.
        </p>
        <p>
          Java arrays are zero-based, meaning:
        </p>
        <ul className="my-4">
          <li>First item is index 0</li>
          <li>Second item is index 1</li>
          <li>Third item is index 2</li>
          <li>And so on…</li>
        </ul>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int[] nums = {5, 10, 15};`}
          </SyntaxHighlighter>
        </div>
        <br />
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Index</th>
                <th className="border border-gray-300 px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">0</td>
                <td className="border border-gray-300 px-4 py-2">5</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">10</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">2</td>
                <td className="border border-gray-300 px-4 py-2">15</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <p>
          You can also get the number of items in an array using:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`nums.length`}
          </SyntaxHighlighter>
        </div>
        <p>
          In this case, nums.length would be 3.
        </p>

        <br />
        <h2>Accessing and Modifying Elements</h2>
        <p>
          You can access an item in an array using its index:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int x = nums[1];  // x is now 10`}
          </SyntaxHighlighter>
        </div>
        <p>
          You can also change an item:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`nums[2] = 20;     // Now the array is [5, 10, 20]`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Array Examples</h2>
        
        <br />
        <h3>Example 1: Storing Motor Powers</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`// Store the power values for 4 drive motors
double[] motorPowers = {0.8, 0.8, 0.6, 0.6};

// Access individual motor powers
double leftFrontPower = motorPowers[0];  // 0.8
double rightRearPower = motorPowers[3];  // 0.6

// Change a motor power
motorPowers[2] = 0.9;  // Increase third motor to 90%`}
          </SyntaxHighlighter>
        </div>
        <ul className="my-4">
          <li>We create an array to store power values for 4 motors.</li>
          <li>Each motor gets its own index (0, 1, 2, 3).</li>
          <li>We can access or modify any motor's power using its index.</li>
        </ul>

        <br />
        <h3>Example 2: Storing Sensor Readings</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`// Store distance readings from multiple sensors
int[] distances = new int[3];  // Create array for 3 sensors

// Set sensor readings (in practice, these would come from actual sensors)
distances[0] = 150;  // Front sensor: 150mm
distances[1] = 200;  // Left sensor: 200mm  
distances[2] = 180;  // Right sensor: 180mm

// Check if any sensor detects something close
if (distances[0] < 100 || distances[1] < 100 || distances[2] < 100) {
    System.out.println("Obstacle detected!");
}`}
          </SyntaxHighlighter>
        </div>
        <ul className="my-4">
          <li>We create an array to store readings from 3 distance sensors.</li>
          <li>Each sensor reading is stored at a specific index.</li>
          <li>We can check all sensors by accessing each index individually.</li>
        </ul>

        <br />
        <h2>Common Mistakes</h2>
        
        <br />
        <h3>Off-by-One Errors</h3>
        <p>
          If your array has 5 items, the valid indexes are:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`0, 1, 2, 3, 4`}
          </SyntaxHighlighter>
        </div>
        <p>
          If you try to do this:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int x = nums[5];  // Error!`}
          </SyntaxHighlighter>
        </div>
        <p>
          You'll get an error because index 5 doesn't exist. Java will crash with an ArrayIndexOutOfBoundsException.
        </p>
        <p className="font-semibold mb-2">Remember:</p>
        <p>Last index = length - 1</p>

        <br />
        <h3>Forgetting to initialize</h3>
        <p>
          If you declare an array but don't initialize it, you can't use it:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int[] scores;           // Declaration only
scores[0] = 85;          // ERROR: array not initialized

int[] scores = new int[5];  // Correct: declare and initialize
scores[0] = 85;             // Now this works`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h3>Wrong array type</h3>
        <p>
          Make sure you use the right type for your array:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int[] numbers = {1, 2, 3};           // Correct
String[] names = {"Alice", "Bob"};     // Correct
int[] scores = {"85", "92"};           // ERROR: can't put strings in int array`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Try It Yourself!</h2>
        <p>Complete the code as described by the comments.</p>
        
        <div className="h-[600px] mt-4">
          <ArraysEditor />
        </div>
        <br />
        
        <h2>Recap</h2>
        <ul className="my-4">
          <li>An array stores multiple values of the same type.</li>
          <li>Use int[], double[], or String[] to declare arrays.</li>
          <li>Array indexes start at 0.</li>
          <li>You access items with array[index].</li>
          <li>.length gives you how many items are in the array.</li>
          <li>Watch out for off-by-one errors!</li>
        </ul>
        
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
