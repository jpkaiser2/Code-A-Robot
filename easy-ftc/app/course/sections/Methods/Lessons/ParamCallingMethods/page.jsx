import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ParamCallingMethodsEditor from "./ParamCallingMethodsEditor";

export const metadata = {
  title: "Parameters & Calling Methods | EasyFTC",
};

export default function ParamCallingMethods() {
  // This lesson has 23 points
  const lessonPoints = 23;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Parameters & Calling Methods</h1>

        <p>
          Parameters are like input variables for a method. They let you send information into the method so it can work with it.
        </p>
        <p>
          Think of it like this: A vending machine method needs to know which snack you want. The snack name is a parameter.
        </p>

        <br />
        <h2>Defining a Method With Parameters</h2>
        <p>
          You define parameters inside the parentheses when creating a method:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public static void greet(String name) {
    System.out.println("Hi, " + name + "!");
}`}
          </SyntaxHighlighter>
        </div>

        <p>In this example:</p>
        <ul className="my-4">
          <li><code>String name</code> is a parameter</li>
          <li>It means the method needs a String value when you call it</li>
        </ul>

        <br />
        <h2>Calling a Method With Arguments</h2>
        <p>
          You provide actual values when you call the method — those are called arguments.
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`greet("Winnie");
greet("Willow");`}
          </SyntaxHighlighter>
        </div>

        <p>This calls the method twice with different arguments.</p>

        <br />
        <h2>Example: Method With One Parameter</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class Main {
    public static void main(String[] args) {
        greet("Wilbur");
    }

    public static void greet(String name) {
        System.out.println("Hello, " + name + "!");
    }
}`}
          </SyntaxHighlighter>
        </div>

        <p className="font-semibold mb-2">Output:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="text" style={vscDarkPlus}>
            Hello, Wilbur!
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Example: Method With Multiple Parameters</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class Main {
    public static void main(String[] args) {
        printSum(5, 8);
    }

    public static void printSum(int a, int b) {
        System.out.println("Sum: " + (a + b));
    }
}`}
          </SyntaxHighlighter>
        </div>

        <p className="font-semibold mb-2">Output:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="text" style={vscDarkPlus}>
            Sum: 13
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Reusing Methods With Different Inputs</h2>
        <p>
          Once you make a method with parameters, you can use it again and again with different data:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`printSum(1, 2);
printSum(10, 50);
printSum(100, -20);`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Common Mistakes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">❌ Mistake</th>
                <th className="px-4 py-2">✅ Fix</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">Calling without an argument: <code>greet();</code></td>
                <td className="px-4 py-2">Provide one: <code>greet("Zoe");</code></td>
              </tr>
              <tr>
                <td className="px-4 py-2">Using wrong type: <code>printSum("hi", 2);</code></td>
                <td className="px-4 py-2">Match types: <code>printSum(3, 4);</code></td>
              </tr>
              <tr>
                <td className="px-4 py-2">Mixing up parameter order</td>
                <td className="px-4 py-2">Make sure values match the method's order and type</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <h2>Try It Yourself!</h2>
        <p>Complete the code as described by the comments.</p>
        
        <div className="h-[600px] mt-4">
          <ParamCallingMethodsEditor />
        </div>
        <br />
        <h2>Recap</h2>
        <ul className="my-4">
          <li>A parameter is a variable declared in a method definition.</li>
          <li>An argument is the actual value you pass into the method when calling it.</li>
          <li>You can define methods with zero, one, or multiple parameters.</li>
          <li>Calling a method runs its code. If it has parameters, you must provide arguments.</li>
          <li>Methods help organize and reuse code efficiently.</li>
        </ul>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
