import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const metadata = {
  title: "Expression vs. Assignment | EasyFTC",
};

export default function ExpressionAssignment() {
  // This lesson has 5 points
  const lessonPoints = 5;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Expression vs. Assignment</h1>
        
        <div className="prose prose-lg">
          <p>
            When programming your robot, you'll often need to do math with variables or store the result of a calculation. 
            That's where expressions and assignments come in.
          </p>
          
          <p>
            This lesson will teach you how Java evaluates expressions, how you store the results using assignment, 
            and how different operators and variables work together to make your robot smart.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Evaluating Arithmetic Expressions</h2>
          
          <p>
            An expression is a combination of values, variables, and operators that Java can calculate.
          </p>
          
          <p>Some examples:</p>
          
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
{`5 + 3          // adds two numbers → 8
10 - 2 * 4     // → 2 (because multiplication happens first)
(x + y) / 2    // uses variables and parentheses
joystick * 0.75 // might scale down power`}
          </SyntaxHighlighter>
          
          <p className="mt-4">
            Java follows operator precedence when it solves math:
          </p>
          
          <ul className="list-disc pl-6">
            <li>Parentheses ()</li>
            <li>Multiplication *, Division /, Modulus %</li>
            <li>Addition +, Subtraction -</li>
          </ul>
          
          <p className="mt-4">For example:</p>
          
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
{`2 + 3 * 4   // → 14 (not 20)
(2 + 3) * 4 // → 20`}
          </SyntaxHighlighter>
          
          <p className="mt-4">
            Use parentheses () to control the order if you want to be sure.
          </p>
          
          <h3 className="text-xl font-bold mt-6 mb-3">Bonus: The Modulus Operator %</h3>
          
          <p>
            The modulus operator (%) gives the remainder after dividing two numbers.
          </p>
          
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
{`10 % 3  // → 1, because 10 divided by 3 is 3 with a remainder of 1
8 % 4   // → 0, because 8 divides evenly by 4
7 % 2   // → 1, because 7 divided by 2 is 3 with a remainder of 1`}
          </SyntaxHighlighter>
          
          <p className="mt-4">
            Why does this matter? Sometimes you only care about the leftovers from a division.
          </p>
          
          <p className="mt-4">
            You'll use this later in FTC when:
          </p>
          
          <ul className="list-disc pl-6">
            <li>You want something to wrap around (like looping from 0 back to 1)</li>
            <li>You want to break things into parts (like checking whether a number fits in a group of 5)</li>
            <li>You need to cycle through values in a predictable pattern</li>
          </ul>
          
          <p className="mt-4">
            Even now, you can practice it just like regular math.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Using Assignment to Store Values</h2>
          
          <p>
            The = symbol in Java is called the assignment operator. It stores a value in a variable.
          </p>
          
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
{`int result = 5 + 3;`}
          </SyntaxHighlighter>
          
          <p className="mt-4">
            Here's what's happening:
          </p>
          
          <ul className="list-disc pl-6">
            <li>5 + 3 is the expression</li>
            <li>result = 5 + 3 is the assignment</li>
            <li>It stores the number 8 in the variable result</li>
          </ul>
          
          <p className="mt-4">
            You can also update a variable using itself:
          </p>
          
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
{`result = result + 2;  // result was 8, now it becomes 10`}
          </SyntaxHighlighter>
          
          <p className="mt-4">
            Java has shortcuts for common updates:
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Operator</th>
                  <th className="px-4 py-2">Meaning</th>
                  <th className="px-4 py-2">Example</th>
                  <th className="px-4 py-2">Same As</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">+=</td>
                  <td className="px-4 py-2">Add and assign</td>
                  <td className="px-4 py-2"><code>x += 3;</code></td>
                  <td className="px-4 py-2"><code>x = x + 3;</code></td>
                </tr>
                <tr>
                  <td className="px-4 py-2">-=</td>
                  <td className="px-4 py-2">Subtract and assign</td>
                  <td className="px-4 py-2"><code>y -= 2;</code></td>
                  <td className="px-4 py-2"><code>y = y - 2;</code></td>
                </tr>
                <tr>
                  <td className="px-4 py-2">*=</td>
                  <td className="px-4 py-2">Multiply and assign</td>
                  <td className="px-4 py-2"><code>z *= 5;</code></td>
                  <td className="px-4 py-2"><code>z = z * 5;</code></td>
                </tr>
                <tr>
                  <td className="px-4 py-2">/=</td>
                  <td className="px-4 py-2">Divide and assign</td>
                  <td className="px-4 py-2"><code>a /= 4;</code></td>
                  <td className="px-4 py-2"><code>a = a / 4;</code></td>
                </tr>
                <tr>
                  <td className="px-4 py-2">%=</td>
                  <td className="px-4 py-2">Mod and assign</td>
                  <td className="px-4 py-2"><code>b %= 10;</code></td>
                  <td className="px-4 py-2"><code>b = b % 10;</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Combining Variables and Operators</h2>
          
          <p>
            Java can handle expressions with multiple variables, numbers, and operators all at once.
          </p>
          
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
{`double leftPower = -joystickY;
double rightPower = -joystickY;
double average = (leftPower + rightPower) / 2;`}
          </SyntaxHighlighter>
          
          <p className="mt-4">
            Let's break that down:
          </p>
          
          <ul className="list-disc pl-6">
            <li>leftPower + rightPower is the expression</li>
            <li>That result is divided by 2</li>
            <li>The final result is assigned to the variable average</li>
          </ul>
          
          <p className="mt-4">
            Here's another one with %:
          </p>
          
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
{`int remainder = 23 % 5;  // remainder will be 3`}
          </SyntaxHighlighter>
          
          <p className="mt-4">
            And one using multiple operations:
          </p>
          
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
{`int result = (a + b) * 2 % 5;`}
          </SyntaxHighlighter>
          
          <p className="mt-4">
            You don't need to worry about what this does yet — the important thing is that:
          </p>
          
          <ul className="list-disc pl-6">
            <li>Java solves it from the inside out, following precedence</li>
            <li>The final value is assigned to the variable</li>
          </ul>
        </div>
        
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
} 