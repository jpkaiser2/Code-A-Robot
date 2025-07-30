import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReturnValuesEditor from "./ReturnValuesEditor";

export const metadata = {
  title: "Return Values & Method Headers | EasyFTC",
};

export default function ReturnValues() {
  // This lesson has 25 points
  const lessonPoints = 25;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Return Values & Method Headers</h1>

        <p>
          In Java, methods can either do something or give something back. So far, you may have written methods that print messages. These are usually void methods because they don't give back a result. They just perform an action.
        </p>

        <p>
          But what if you want a method to calculate something, such as a score, distance, or answer, and give you that result? That's where return values come in.
        </p>

        <br />
        <h2>Void vs. Non-Void Methods</h2>
        <p className="font-semibold mb-2">Comparison of method types:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Feature</th>
                <th className="border border-gray-300 p-2">void method</th>
                <th className="border border-gray-300 p-2">Non-void method (with return)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Returns a value?</td>
                <td className="border border-gray-300 p-2">❌ No</td>
                <td className="border border-gray-300 p-2">✅ Yes</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Can store result?</td>
                <td className="border border-gray-300 p-2">❌ No — just runs and finishes</td>
                <td className="border border-gray-300 p-2">✅ Yes — you can store the result in a variable</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Common use</td>
                <td className="border border-gray-300 p-2">Performing actions (e.g. print, move)</td>
                <td className="border border-gray-300 p-2">Calculating or checking something</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Needs return keyword?</td>
                <td className="border border-gray-300 p-2">Not required (but can be used to exit)</td>
                <td className="border border-gray-300 p-2">✅ Required to return the correct type</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Return type in header?</td>
                <td className="border border-gray-300 p-2">void</td>
                <td className="border border-gray-300 p-2">Must match the type being returned</td>
              </tr>
            </tbody>
          </table>
        </div>

        <br />
        <h2>Example: Void Method</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public static void sayHello() {
    System.out.println("Hello!");
}`}
          </SyntaxHighlighter>
        </div>
        <ul className="my-4">
          <li>This method does something — it prints.</li>
          <li>It does not return a value, so the return type is void.</li>
          <li>You can't store or use a result from this method.</li>
        </ul>

        <br />
        <h2>Example: Non-Void Method (with Return)</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public static int add(int a, int b) {
    return a + b;
}`}
          </SyntaxHighlighter>
        </div>
        <p>This method calculates an integer and returns it.</p>
        <p className="font-semibold mb-2">You can save the result and use it later:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int sum = add(5, 3);  // sum is now 8`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Method Headers</h2>
        <p>A method header is the first line of a method. It tells Java four key things:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public static double calculateArea(double width, double height)`}
          </SyntaxHighlighter>
        </div>

        <p className="font-semibold mb-2">Breaking down the header:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Part</th>
                <th className="border border-gray-300 p-2">What It Means</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">public</td>
                <td className="border border-gray-300 p-2">Anyone can access it (don't worry too much about this yet)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">static</td>
                <td className="border border-gray-300 p-2">The method belongs to the class, not an object (standard for now)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">double</td>
                <td className="border border-gray-300 p-2">This is the return type — the method gives back a double</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">calculateArea</td>
                <td className="border border-gray-300 p-2">The name of the method</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">(double width, double height)</td>
                <td className="border border-gray-300 p-2">The parameters the method takes as input</td>
              </tr>
            </tbody>
          </table>
        </div>

        <br />
        <h2>Using return</h2>
        <p>In a method with a return type (like int, double, or String), you use the return keyword to send back the result:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public static boolean isEven(int num) {
    return num % 2 == 0;
}`}
          </SyntaxHighlighter>
        </div>
        <p className="font-semibold mb-2">And you can use the result like this:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`boolean result = isEven(10);  // true`}
          </SyntaxHighlighter>
        </div>
        <p>You must return the correct type. If your method says int, you must return an int.</p>

        <br />
        <h2>Why Return Values Matter</h2>
        <p>Using return values lets you:</p>
        <ul className="my-4">
          <li>Store results to use later</li>
          <li>Do calculations without repeating code</li>
          <li>Break your code into small, reusable parts</li>
        </ul>
        <p>Return values make your methods more powerful and your code more flexible.</p>

        <br />
        <h2>Common Mistakes</h2>
        
        <br />
        <h3>Missing return statement</h3>
        <p>If your method has a return type (not void), you must include a return statement:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public static int add(int a, int b) {  // ERROR: missing return
    int sum = a + b;
    // Need to add: return sum;
}`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h3>Wrong return type</h3>
        <p>The return type must match what you're returning:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public static int getMessage() {  // ERROR: declared int but returning String
    return "Hello";  // Can't return a String when method says int
}`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Try It Yourself!</h2>
        <p>Complete the code as described by the comments.</p>
        
        <div className="h-[600px] mt-4">
          <ReturnValuesEditor />
        </div>
        <br />

        <h2>Recap</h2>
        <ul className="my-4">
          <li>Use a void method when you just want to do something (like print or move).</li>
          <li>Use a returning method when you want a result back.</li>
          <li>The method header must include a return type (e.g. int, String, boolean).</li>
          <li>Use return to send back the result.</li>
          <li>You can store return values in variables and reuse them anywhere in your code.</li>
        </ul>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
