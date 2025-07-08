import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Editor from "./editor";

export const metadata = {
  title: "Looping Through ArrayLists | EasyFTC",
};

export default function ArrayListLoops() {
  // This lesson has 46 points
  const lessonPoints = 46;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Looping Through ArrayLists</h1>
        <p>By the end of this lesson, you'll be able to:</p>
        <ul className="my-4">
          <li>Use <code>for</code> and <code>for-each</code> loops to access and process data in ArrayLists</li>
          <li>Understand why ArrayLists only store objects, not primitives</li>
          <li>Know when to use different loop types with ArrayLists</li>
          <li>Avoid common errors like out-of-bounds and type issues</li>
        </ul>

        <br />
        <h2>Why Use Loops with ArrayLists?</h2>
        <p>
          ArrayLists can grow or shrink, and you often won’t know the exact number of elements ahead of time. Instead of repeating code manually for each item, we use loops to handle all elements automatically.
        </p>

        <br />
        <h2>Reminder: ArrayLists Only Store Objects</h2>
        <p>
          Java's ArrayList only works with objects, not primitive types like <code>int</code>, <code>double</code>, or <code>boolean</code>. That means you can't directly write:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`ArrayList<int> numbers = new ArrayList<>();  //  Not allowed`}
          </SyntaxHighlighter>
        </div>
        <p>Instead, Java provides wrapper classes that turn primitives into objects:</p>
        <table className="min-w-full border-collapse border border-gray-300 my-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Primitive</th>
              <th className="border border-gray-300 px-4 py-2">Wrapper Class</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">int</td>
              <td className="border border-gray-300 px-4 py-2">Integer</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">double</td>
              <td className="border border-gray-300 px-4 py-2">Double</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">boolean</td>
              <td className="border border-gray-300 px-4 py-2">Boolean</td>
            </tr>
          </tbody>
        </table>
        <p>Here’s how you use them:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`ArrayList<Integer> numbers = new ArrayList<>();
numbers.add(42);  // Java automatically wraps 42 into an Integer object`}
          </SyntaxHighlighter>
        </div>
        <p>
          This feature is called <strong>autoboxing</strong> (primitive to object) and <strong>unboxing</strong> (object to primitive). You usually don’t notice it, but it’s good to know what’s happening behind the scenes.
        </p>

        <br />
        <h2>The for Loop</h2>
        <p>The most common way to go through an ArrayList is using a for loop with an index.</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`ArrayList<String> fruits = new ArrayList<>();
fruits.add("Apple");
fruits.add("Banana");
fruits.add("Cherry");

for (int i = 0; i < fruits.size(); i++) {
    System.out.println(fruits.get(i));
}`}
          </SyntaxHighlighter>
        </div>
        <ul className="my-4">
          <li><code>i</code> starts at 0 because ArrayLists use 0-based indexing.</li>
          <li><code>i &lt; fruits.size()</code> ensures we don’t go out of bounds.</li>
          <li><code>fruits.get(i)</code> gets the item at index <code>i</code>.</li>
        </ul>

        <br />
        <h2>The Enhanced for-each Loop</h2>
        <p>This is a simpler way to loop if you don’t need the index.</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`for (String fruit : fruits) {
    System.out.println(fruit);
}`}
          </SyntaxHighlighter>
        </div>
        <ul className="my-4">
          <li>This loop goes through each element in the ArrayList.</li>
          <li><code>fruit</code> holds each item in the list one at a time.</li>
          <li>You don’t need to call <code>get()</code> or worry about <code>.size()</code>.</li>
        </ul>

        <br />
        <h2>When to Use Which Loop</h2>
        <table className="min-w-full border-collapse border border-gray-300 my-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Use Case</th>
              <th className="border border-gray-300 px-4 py-2">Recommended Loop</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">You need the index</td>
              <td className="border border-gray-300 px-4 py-2">for loop with index</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">You just need the elements</td>
              <td className="border border-gray-300 px-4 py-2">for-each loop</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">You want to remove elements</td>
              <td className="border border-gray-300 px-4 py-2">Use regular for loop (go backwards!)</td>
            </tr>
          </tbody>
        </table>

        <br />
        <h2>Example: Sum of Integers</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`ArrayList<Integer> numbers = new ArrayList<>();
numbers.add(5);
numbers.add(10);
numbers.add(15);

int sum = 0;
for (int num : numbers) {
    sum += num;
}
System.out.println("Sum: " + sum);  // Output: Sum: 30`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Common Mistake: Using Wrong Loop Condition</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`for (int i = 0; i <= fruits.size(); i++) {  // WRONG: will crash
    System.out.println(fruits.get(i));
}`}
          </SyntaxHighlighter>
        </div>
        <p>
          <strong>Fix:</strong> Use <code>&lt;</code> instead of <code>&lt;=</code> because the last index is <code>size() - 1</code>.
        </p>

        <br />
        <h2>Try It Yourself!</h2>
        <p>Practice using ArrayLists and loops! Complete the code as described by the comments below. You'll:
        <ul className="my-4 list-disc ml-6">
          <li>Create and fill an ArrayList of Strings, then print each element using a for loop with an index.</li>
          <li>Print each element again using a for-each loop.</li>
          <li>Create an ArrayList of Integers, sum all values using a for-each loop, and print the result.</li>
          <li>Try using the wrong loop condition and see what error you get (optional).</li>
        </ul>
        </p>
        <div className="h-[600px] mt-4">
          <Editor />
        </div>
        <br />

        <h2>Recap</h2>
        <ul className="my-4">
          <li>Use <code>for (int i = 0; i &lt; list.size(); i++)</code> to access by index.</li>
          <li>Use <code>for (Type item : list)</code> to go through each element simply.</li>
          <li><code>.size()</code> tells you how many elements are in the ArrayList.</li>
          <li>Avoid <code>&lt;=</code> in loops with <code>.size()</code> to prevent out-of-bounds errors.</li>
          <li>ArrayLists can only hold objects, so use wrapper classes like <code>Integer</code>, <code>Double</code>, and <code>Boolean</code> for primitive values.</li>
        </ul>
        <br />

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
