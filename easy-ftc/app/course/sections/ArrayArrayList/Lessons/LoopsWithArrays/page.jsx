import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Editor from "./editor";

export const metadata = {
  title: "Using Loops with Arrays | EasyFTC",
};

export default function Arrays() {
  // This lesson has 43 points
  const lessonPoints = 43;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Using Loops with Arrays</h1>

        <p>
          By the end of this lesson, you'll be able to:
        </p>
        <ul className="my-4">
          <li>Use <code>for</code>, <code>while</code>, and <code>foreach</code> loops to access and process data in arrays</li>
          <li>Understand how array indexes work</li>
          <li>Avoid common errors like going out of bounds</li>
          <li>Recognize and apply common patterns like printing, summing, and finding the maximum value</li>
          <li>Know when to use different loop types, including enhanced for loops for simple array traversal</li>
        </ul>

        <br />
        <h2>What Does It Mean to Traverse an Array?</h2>
        <p>
          Traversing an array means going through each element in the array one by one, usually using a loop.
          You can traverse from the beginning to the end, from the end to the beginning, or even skip certain elements depending on your loop setup.
        </p>
        <p>
          When we say "traverse," we just mean:
        </p>
        <ul className="my-4">
          <li>"Go through each index of the array and do something with the values."</li>
        </ul>

        <br />
        <h2>What is an Index Again?</h2>
        <p>
          An index is the position number of an item in an array.
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int[] nums = {10, 20, 30, 40};
// Indexes:   0   1   2   3`}
          </SyntaxHighlighter>
        </div>
        <p>
          In Java, indexes always start at 0.
        </p>
        <p>
          So:
        </p>
        <ul className="my-4">
          <li><code>nums[0]</code> is 10</li>
          <li><code>nums[2]</code> is 30</li>
          <li>The last index is always <code>array.length - 1</code></li>
        </ul>

        <br />
        <h2>Why Combine Loops with Arrays?</h2>
        <p>
          Arrays can store many values, like a list of joystick positions, motor powers, or sensor readings. But arrays don't know what you want to do with those values.<br />
          Loops let you automatically repeat a task for every element in the array. Instead of writing the same line four times, we loop once and let the index (<code>i</code>) handle the rest.
        </p>
        <h3>Without a Loop</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`System.out.println(scores[0]);
System.out.println(scores[1]);
System.out.println(scores[2]);
System.out.println(scores[3]);`}
          </SyntaxHighlighter>
        </div>
        <h3>With a Loop (Much Better!)</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`for (int i = 0; i < scores.length; i++) {
    System.out.println(scores[i]);
}`}
          </SyntaxHighlighter>
        </div>
        <p>
          This does exactly the same thing, but works even if the array has 100 values.
        </p>

        <br />
        <h2>Example 1: Printing All Elements</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int[] scores = {85, 92, 78, 90};

for (int i = 0; i < scores.length; i++) {
    System.out.println("Score " + i + ": " + scores[i]);
}`}
          </SyntaxHighlighter>
        </div>
        <ul className="my-4">
          <li><code>int i = 0</code> -&gt; we start at index 0, the first element</li>
          <li><code>i &lt; scores.length</code> -&gt; the loop runs while i is less than 4 (number of elements)</li>
          <li><code>i++</code> -&gt; we increase i by 1 after each loop</li>
          <li><code>scores[i]</code> -&gt; gets the value at position i in the array</li>
        </ul>
        <p>💡 This loop prints every element in <code>scores</code>, one by one.</p>

        <br />
        <h2>Example 2: Summing Values in an Array</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int[] values = {3, 5, 2, 8};
int sum = 0;

for (int i = 0; i < values.length; i++) {
    sum += values[i]; // same as sum = sum + values[i];
}

System.out.println("Total sum: " + sum);`}
          </SyntaxHighlighter>
        </div>
        <ul className="my-4">
          <li>We start with <code>sum = 0</code></li>
          <li>On each loop, we add the current element (<code>values[i]</code>) to the sum</li>
          <li>After the loop, <code>sum</code> holds the total of all numbers</li>
        </ul>
        <p>
          This pattern is super useful for calculating totals, averages, or adjusting motor power based on multiple sensor inputs.
        </p>

        <br />
        <h2>Example 3: Finding the Maximum Value</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int[] temps = {67, 72, 90, 85};
int max = temps[0]; // start by assuming the first value is the biggest

for (int i = 1; i < temps.length; i++) {
    if (temps[i] > max) {
        max = temps[i]; // found a new highest value
    }
}

System.out.println("Hottest temperature: " + max);`}
          </SyntaxHighlighter>
        </div>
        <ul className="my-4">
          <li>We assume the first element is the max</li>
          <li>Then we loop through the rest of the array</li>
          <li>If we find a value that's bigger, we update <code>max</code></li>
          <li>In the end, we've compared every value, and <code>max</code> holds the highest one</li>
        </ul>
        <p>
          This is helpful in FTC when you want to find the highest joystick value or the max encoder count.
        </p>

        <br />
        <h2>Common Mistake: Off-By-One Error</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`for (int i = 0; i <= array.length; i++) {
    System.out.println(array[i]); // ArrayIndexOutOfBoundsException
}`}
          </SyntaxHighlighter>
        </div>
        <p>
          Why? Because <code>array.length</code> is one past the last valid index.<br />
          <strong>Remember:</strong><br />
          First index = 0<br />
          Last index = <code>array.length - 1</code><br />
          So always use <code>&lt;</code>, not <code>&lt;=</code> in the loop condition if starting at index 0.
        </p>

        <br />
        <h2>Using a While Loop with Arrays</h2>
        <p>
          While <code>for</code> loops are common with arrays, <code>while</code> loops work too.
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int[] nums = {2, 4, 6, 8};
int i = 0;

while (i < nums.length) {
    System.out.println(nums[i]);
    i++;
}`}
          </SyntaxHighlighter>
        </div>
        <ul className="my-4">
          <li>You need more flexible stopping conditions</li>
          <li>You don't know in advance how many elements you'll process</li>
          <li>You're working with robot states or gamepad inputs in a loop</li>
        </ul>

        <br />
        <h2>Bonus Example: Doubling Every Value</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int[] data = {1, 2, 3, 4};

for (int i = 0; i < data.length; i++) {
    data[i] = data[i] * 2;
}

System.out.println(Arrays.toString(data)); // prints: [2, 4, 6, 8]`}
          </SyntaxHighlighter>
        </div>
        <ul className="my-4">
          <li>Loops through every index in the array</li>
          <li>Replaces the value with its double</li>
          <li>Uses <code>Arrays.toString()</code> to print the whole array</li>
        </ul>
        <p>
          This is a great pattern for modifying the contents of an array.
        </p>

        <br />
        <h2>Traversing an Array Backwards</h2>
        <p>
          You can also go from the last element to the first
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int[] values = {10, 20, 30, 40};

for (int i = values.length - 1; i >= 0; i--) {
    System.out.println("Reverse: " + values[i]);
}`}
          </SyntaxHighlighter>
        </div>
        <ul className="my-4">
          <li>Starts at the last index: <code>values.length - 1</code></li>
          <li>Goes down to index 0</li>
        </ul>

        <br />
        <h2>Using an Enhanced For Loop (foreach)</h2>
        <p>
          In Java, you can use an enhanced for loop (also called a foreach loop) to traverse an array without using indexes.
        </p>
        <h3>Basic Syntax:</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`for (type variable : array) {
    // use variable
}`}
          </SyntaxHighlighter>
        </div>
        <p>
          It automatically goes through every element in the array from start to end.
        </p>
        <h3>Example:</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int[] nums = {5, 10, 15};

for (int num : nums) {
    System.out.println(num);
}`}
          </SyntaxHighlighter>
        </div>
        <p>What this does:</p>
        <ul className="my-4">
          <li>First, <code>num</code> is 5</li>
          <li>Then <code>num</code> is 10</li>
          <li>Then <code>num</code> is 15</li>
        </ul>
        <p>
          You don't need to use <code>nums[i]</code> or manage an index—Java handles it for you.
        </p>

        <h3>When Should You Use a foreach Loop?</h3>
        <p>Use a foreach loop when:</p>
        <ul className="my-4">
          <li>You want to read each value in the array</li>
          <li>You don't need the index (position) of each element</li>
          <li>You don't plan to modify the original array elements</li>
        </ul>

        <h3>Good Example:</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`String[] names = {"Winnie", "Willow", "Wilbur"};

for (String name : names) {
    System.out.println("Hello, " + name + "!");
}`}
          </SyntaxHighlighter>
        </div>

        <h3>But Be Careful: You Can't Access the Index</h3>
        <p>You can't tell which position you're on:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`for (int num : nums) {
    // You cannot do: System.out.println("Index: " + ???);
}`}
          </SyntaxHighlighter>
        </div>
        <p>
          If you need to know the index (like for displaying "Score 0:", "Score 1:"), you should stick with a normal for loop.
        </p>

        <h3>Also: You Can't Modify the Array</h3>
        <p>This won't work the way you might expect:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`for (int num : nums) {
    num = num * 2;  // This does NOT change the array
}`}
          </SyntaxHighlighter>
        </div>
        <p>
          To modify an array (like doubling every value), use a regular for loop with indexing:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`for (int i = 0; i < nums.length; i++) {
    nums[i] = nums[i] * 2;  // This changes the array
}`}
          </SyntaxHighlighter>
        </div>

        <h3>Side-by-Side Comparison</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Goal</th>
                <th className="border border-gray-300 px-4 py-2">Use for loop</th>
                <th className="border border-gray-300 px-4 py-2">Use foreach loop</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Read every value</td>
                <td className="border border-gray-300 px-4 py-2">✅</td>
                <td className="border border-gray-300 px-4 py-2">✅</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Modify values in array</td>
                <td className="border border-gray-300 px-4 py-2">✅</td>
                <td className="border border-gray-300 px-4 py-2">❌</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Access index</td>
                <td className="border border-gray-300 px-4 py-2">✅</td>
                <td className="border border-gray-300 px-4 py-2">❌</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Simpler syntax</td>
                <td className="border border-gray-300 px-4 py-2">❌</td>
                <td className="border border-gray-300 px-4 py-2">✅</td>
              </tr>
            </tbody>
          </table>
        </div>

        <br />
        <h2>Try It Yourself!</h2>
        <p>Complete the code as described by the comments.</p>
        <div className="h-[600px] mt-4">
          <Editor />
        </div>
        <br />

        <h2>Recap</h2>
        <ul className="my-4">
          <li>Traversing an array = looping through each value one by one</li>
          <li>Arrays start at index 0 and end at <code>array.length - 1</code></li>
          <li>Use <code>.length</code> to avoid hardcoding sizes</li>
          <li>Use <code>&lt;</code>, not <code>&lt;=</code>, to avoid going out of bounds</li>
          <li><code>for</code> loops are great for full control (indexing, modifying)</li>
          <li><code>while</code> loops are good when conditions change dynamically</li>
          <li><code>foreach</code> loops are best for simple read-only access</li>
          <li>Common patterns:</li>
          <ul className="ml-6 my-2">
            <li>Print values</li>
            <li>Sum values</li>
            <li>Find max/min</li>
            <li>Modify each value</li>
            <li>Traverse backwards</li>
          </ul>
        </ul>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
