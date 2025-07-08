import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ArraysEditor from "./ArraysEditor";

export const metadata = {
  title: "ArrayList Basics | EasyFTC",
};

export default function ArrayListBasics() {
  // This lesson has 45 points
  const lessonPoints = 45;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>ArrayList Basics</h1>

        <p>By the end of this lesson, you'll be able to:</p>
        <ul className="my-4">
          <li>Understand what an ArrayList is and how it's different from an array</li>
          <li>Create and initialize an ArrayList</li>
          <li>Add, access, change, and remove elements</li>
          <li>Use <code>.size()</code> to find out how many items are in the list</li>
          <li>Know when to use an ArrayList vs. an array</li>
        </ul>

        <br />
        <h2>Why Use ArrayLists?</h2>
        <p>Sometimes we don’t know how many items we’ll need to store ahead of time. With arrays, you have to decide the size upfront:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`int[] scores = new int[10]; // always has 10 slots`}
          </SyntaxHighlighter>
        </div>
        <p>But what if the list needs to grow or shrink as your program runs?<br />
        That's where ArrayList comes in. It's flexible and easy to use when the amount of data changes.</p>

        <br />
        <h2>What is an ArrayList?</h2>
        <p>An ArrayList is a resizable array from Java’s utility library. Unlike arrays, which have a fixed size, ArrayList lets you:</p>
        <ul className="my-4">
          <li>Add items</li>
          <li>Remove items</li>
          <li>Change items</li>
          <li>Grow and shrink as needed</li>
        </ul>
        <p><b>Importing the class:</b></p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`import java.util.ArrayList;`}
          </SyntaxHighlighter>
        </div>
        <p className="my-4">
          <b>Why do you need to import ArrayList?</b><br />
          <code>ArrayList</code> is not a built-in part of the Java language itself. It is a class provided in Java's <code>java.util</code> library. This means you have to explicitly import it at the top of your file so your program knows where to find it. If you forget to import it, you'll get a compiler error saying <code>ArrayList</code> cannot be found.
        </p>

        <br />
        <h3>Creating an ArrayList</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`ArrayList<String> names = new ArrayList<String>();`}
          </SyntaxHighlighter>
        </div>
        <p>Let’s break this down:</p>
        <ul className="my-4">
          <li><code>ArrayList&lt;String&gt;</code>: Making a list that can only hold String objects.</li>
          <li><code>new ArrayList&lt;String&gt;()</code>: Creates the actual list in memory.</li>
          <li><code>names</code>: The variable that refers to this list.</li>
        </ul>

        <br />
        <h3>Adding Elements</h3>
        <p>Use <code>.add()</code> to insert an item at the end of the list:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`names.add("Alice");
names.add("Bob");`}
          </SyntaxHighlighter>
        </div>
        <p>You can also insert at a specific index:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`names.add(1, "Charlie"); // Puts "Charlie" at index 1`}
          </SyntaxHighlighter>
        </div>
        <p>💡 <b>Remember:</b> indexes start at 0!</p>

        <br />
        <h3>Accessing Elements</h3>
        <p>To get a specific item, use <code>.get(index)</code>:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`System.out.println(names.get(0)); // Prints "Alice"`}
          </SyntaxHighlighter>
        </div>
        <p>If you try to get an index that doesn't exist, you’ll get an <code>IndexOutOfBoundsException</code>.</p>

        <br />
        <h3>Changing Elements</h3>
        <p>Use <code>.set(index, newValue)</code> to change an existing value:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`names.set(0, "Alicia"); // Replaces "Alice" with "Alicia"`}
          </SyntaxHighlighter>
        </div>
        <p>This does not add a new item — it replaces an existing one.</p>

        <br />
        <h3>Removing Elements</h3>
        <p>You can remove by index:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`names.remove(1); // Removes the item at index 1`}
          </SyntaxHighlighter>
        </div>
        <p>Or remove by value:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`names.remove("Bob"); // Removes the first "Bob" it finds`}
          </SyntaxHighlighter>
        </div>
        <p>If the value doesn't exist, nothing happens.</p>

        <br />
        <h3>Finding the Size</h3>
        <p>The <code>.size()</code> method tells you how many elements are in the ArrayList:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`int count = names.size();
System.out.println("There are " + count + " names.");`}
          </SyntaxHighlighter>
        </div>
        <p>This is like <code>.length</code> for arrays — but for ArrayLists, you must use <code>.size()</code>.<br />
        Don’t write:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`names.length // This won't work`}
          </SyntaxHighlighter>
        </div>
        <p>Instead, always use:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`names.size() // This gives you the number of elements`}
          </SyntaxHighlighter>
        </div>
        <p>💡Use <code>.size()</code> in loops to make sure you don’t go out of bounds.</p>

        <br />
        <h3>Looping Through an ArrayList</h3>
        <p>Using a for loop with <code>.size()</code>:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`for (int i = 0; i < names.size(); i++) {
    System.out.println(names.get(i));
}`}
          </SyntaxHighlighter>
        </div>
        <p>Using an enhanced for loop (a "for-each" loop):</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`for (String name : names) {
    System.out.println(name);
}`}
          </SyntaxHighlighter>
        </div>
        <p>This is simpler and works well when you don’t need to know the index.</p>

        <br />
        <h3>Common Mistakes</h3>
        <ul className="my-4">
          <li><code>names[0]</code> → This is array syntax. Use <code>names.get(0)</code> instead.</li>
          <li><code>names.length</code> → This only works for arrays. Use <code>names.size()</code> for ArrayLists.</li>
          <li>Forgetting to import <code>java.util.ArrayList</code></li>
        </ul>

        <br />
        <h3>When to Use ArrayList vs. Array</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 my-4">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Use Case</th>
                <th className="border border-gray-300 px-4 py-2">Choose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">You know the number of items ahead of time</td>
                <td className="border border-gray-300 px-4 py-2">Array</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">The size of the list will change</td>
                <td className="border border-gray-300 px-4 py-2">ArrayList</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">You want to store primitive values directly</td>
                <td className="border border-gray-300 px-4 py-2">Array</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">You want to easily add/remove elements</td>
                <td className="border border-gray-300 px-4 py-2">ArrayList</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>⛔ <b>Note:</b> You can't store primitives like <code>int</code> in an ArrayList (more on this in upcoming lessons.) Use wrapper classes like <code>Integer</code> instead:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`ArrayList<Integer> numbers = new ArrayList<>();`}
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
          <li>ArrayList = flexible, growable list of objects</li>
          <li>Must import from <code>java.util</code></li>
          <li>Use <code>.add()</code>, <code>.get()</code>, <code>.set()</code>, <code>.remove()</code>, and <code>.size()</code></li>
          <li>Great for when you don’t know how many items you’ll need</li>
          <li>Always use wrapper classes (<code>Integer</code>, <code>Double</code>, etc.) for primitive types</li>
        </ul>
        <br />
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
