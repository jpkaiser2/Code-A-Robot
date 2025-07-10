import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const metadata = {
  title: "Choosing Between Arrays and ArrayLists | EasyFTC",
};

export default function ArrayVsArrayList() {
  // This lesson has 47 points
  const lessonPoints = 47;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Choosing Between Arrays and ArrayLists</h1>
        
        <p>By the end of this lesson, you'll be able to:</p>
        <ul className="my-4">
          <li>Understand the key differences between arrays and ArrayLists</li>
          <li>Know when to choose an array over an ArrayList, and vice versa</li>
          <li>Decide which structure is best based on the needs of your program</li>
        </ul>

        <br />
        <h2>Arrays vs. ArrayLists: What's the Difference?</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 my-4">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Feature</th>
                <th className="border border-gray-300 px-4 py-2">Array</th>
                <th className="border border-gray-300 px-4 py-2">ArrayList</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Fixed Size?</td>
                <td className="border border-gray-300 px-4 py-2">✅ Yes</td>
                <td className="border border-gray-300 px-4 py-2">❌ No (can grow/shrink)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Holds Primitives?</td>
                <td className="border border-gray-300 px-4 py-2">✅ Yes</td>
                <td className="border border-gray-300 px-4 py-2">❌ No (only objects)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Syntax Simpler?</td>
                <td className="border border-gray-300 px-4 py-2">✅ Slightly</td>
                <td className="border border-gray-300 px-4 py-2">❌ Requires more methods</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Performance</td>
                <td className="border border-gray-300 px-4 py-2">✅ Faster for fixed-size data</td>
                <td className="border border-gray-300 px-4 py-2">⚠️ Slightly slower due to dynamic resizing</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Flexibility</td>
                <td className="border border-gray-300 px-4 py-2">❌ Not very flexible</td>
                <td className="border border-gray-300 px-4 py-2">✅ Very flexible</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Part of Java's...</td>
                <td className="border border-gray-300 px-4 py-2">Core language</td>
                <td className="border border-gray-300 px-4 py-2">java.util package (must import)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p><b>Quick Rule:</b></p>
        <ul className="my-4">
          <li>If you know exactly how many elements you'll need and they won't change, use an array.</li>
          <li>If you want to add/remove elements as your program runs, use an ArrayList.</li>
        </ul>

        <br />
        <h2>Example: Sensor Readings</h2>
        <p>Let's say you're storing 4 fixed distance sensor values:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`double[] distances = {2.1, 4.3, 5.6, 3.3}; // Perfect for an array`}
          </SyntaxHighlighter>
        </div>
        <p>But what if you don't know how many sensor readings you'll take?</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`ArrayList<Double> distances = new ArrayList<>();
distances.add(2.1);
distances.add(4.3);
// Add more as needed - ArrayList grows with you`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Arrays are Best When:</h2>
        <ul className="my-4">
          <li>The number of items is fixed and known ahead of time</li>
          <li>You need fast access and performance</li>
          <li>You're working with primitives like <code>int</code>, <code>double</code>, <code>char</code>, etc.</li>
        </ul>

        <br />
        <h2>ArrayLists are Best When:</h2>
        <ul className="my-4">
          <li>The number of items can change</li>
          <li>You want easy adding/removing without worrying about size</li>
          <li>You're working with objects (like <code>String</code>, <code>Integer</code>, <code>Robot</code>, etc.)</li>
        </ul>

        <br />
        <h2>⛔ Warning: Primitives and ArrayLists</h2>
        <p>ArrayLists do not support primitives like <code>int</code> or <code>double</code> directly.</p>
        <p>Instead, Java automatically wraps them using classes like <code>Integer</code>, <code>Double</code>, etc.</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`ArrayList<Integer> scores = new ArrayList<>();
scores.add(100); // Java wraps 100 into an Integer object`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Recap</h2>
        <ul className="my-4">
          <li>Choose arrays when you know how many values you'll store and care about speed.</li>
          <li>Choose ArrayLists when your list might grow or shrink and you're storing objects.</li>
        </ul>
        
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
