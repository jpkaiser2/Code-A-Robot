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
      <div>
        <h1>Expression vs. Assignment</h1>
        
        <p>
          When programming your robot, you'll often need to do math with variables or store the result of a calculation. 
          That's where expressions and assignments come in.
        </p>
        
        <p>
          This lesson will teach you how Java evaluates expressions, how you store the results using assignment, 
          and how different operators and variables work together to make your robot smart.
        </p>
        
        <br />
        <h2>Evaluating Arithmetic Expressions</h2>
        
        <p>
          An expression is a combination of values, variables, and operators that Java can calculate.
        </p>
        
        <p>Some examples:</p>
        
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`5 + 3          // adds two numbers → 8
10 - 2 * 4     // → 2 (because multiplication happens first)
(x + y) / 2    // uses variables and parentheses
joystick * 0.75 // might scale down power`}
          </SyntaxHighlighter>
        </div>
        
        <br />
        <p>
          Java follows operator precedence when it solves math:
        </p>
        
        <ul>
          <li>Parentheses ()</li>
          <li>Multiplication *, Division /, Modulus %</li>
          <li>Addition +, Subtraction -</li>
        </ul>
        
        <br />
        <p>For example:</p>
        
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`2 + 3 * 4   // → 14 (not 20)
(2 + 3) * 4 // → 20`}
          </SyntaxHighlighter>
        </div>
        
        <br />
        <p>
          Use parentheses () to control the order if you want to be sure.
        </p>
        
        <br />
        <h3>Bonus: The Modulus Operator %</h3>
        
        <p>
          The modulus operator (%) gives the remainder after dividing two numbers.
        </p>
        
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`10 % 3  // → 1, because 10 divided by 3 is 3 with a remainder of 1
8 % 4   // → 0, because 8 divides evenly by 4
7 % 2   // → 1, because 7 divided by 2 is 3 with a remainder of 1`}
          </SyntaxHighlighter>
        </div>
        
        <br />
        <p>
          Why does this matter? Sometimes you only care about the leftovers from a division.
        </p>
        
        <br />
        <p>
          You'll use this later in FTC when:
        </p>
        
        <ul>
          <li>You want something to wrap around (like looping from 0 back to 1)</li>
          <li>You want to break things into parts (like checking whether a number fits in a group of 5)</li>
          <li>You need to cycle through values in a predictable pattern</li>
        </ul>
        
        <br />
        <p>
          Even now, you can practice it just like regular math.
        </p>
        
        <br />
        <h2>Using Assignment to Store Values</h2>
        
        <p>
          The = symbol in Java is called the assignment operator. It stores a value in a variable.
        </p>
        
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int result = 5 + 3;`}
          </SyntaxHighlighter>
        </div>
        
        <br />
        <p>
          Here's what's happening:
        </p>
        
        <ul>
          <li>5 + 3 is the expression</li>
          <li>result = 5 + 3 is the assignment</li>
          <li>It stores the number 8 in the variable result</li>
        </ul>
        
        <br />
        <p>
          You can also update a variable using itself:
        </p>
        
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`result = result + 2;  // result was 8, now it becomes 10`}
          </SyntaxHighlighter>
        </div>
        
        <br />
        <p>
          Java has shortcuts for common updates:
        </p>
        
        <br />
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
        
        <br />
        <h2>Combining Variables and Operators</h2>
        
        <p>
          Java can handle expressions with multiple variables, numbers, and operators all at once.
        </p>
        
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`double leftPower = -joystickY;
double rightPower = -joystickY;
double average = (leftPower + rightPower) / 2;`}
          </SyntaxHighlighter>
        </div>
        
        <br />
        <p>
          Let's break that down:
        </p>
        
        <ul>
          <li>leftPower + rightPower is the expression</li>
          <li>That result is divided by 2</li>
          <li>The final result is assigned to the variable average</li>
        </ul>
        
        <br />
        <p>
          Here's another one with %:
        </p>
        
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int remainder = 23 % 5;  // remainder will be 3`}
          </SyntaxHighlighter>
        </div>
        
        <br />
        <p>
          And one using multiple operations:
        </p>
        
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int result = (a + b) * 2 % 5;`}
          </SyntaxHighlighter>
        </div>
        
        <br />
        <p>
          You don't need to worry about what this does yet — the important thing is that:
        </p>
        
        <ul>
          <li>Java solves it from the inside out, following precedence</li>
          <li>The final value is assigned to the variable</li>
        </ul>
        
        <br />
        <h2>Summary</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Concept</th>
                <th className="px-4 py-2">Example</th>
                <th className="px-4 py-2">What It Does</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">Arithmetic Expression</td>
                <td className="px-4 py-2"><code>4 + 3 * 2</code></td>
                <td className="px-4 py-2">Calculates a value</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Assignment</td>
                <td className="px-4 py-2"><code>int x = 7;</code></td>
                <td className="px-4 py-2">Stores 7 in x</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Modulus %</td>
                <td className="px-4 py-2"><code>10 % 3 → 1</code></td>
                <td className="px-4 py-2">Remainder of division</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Update Variable</td>
                <td className="px-4 py-2"><code>x += 5;</code></td>
                <td className="px-4 py-2">Adds 5 to x</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Combined Expression</td>
                <td className="px-4 py-2"><code>int result = a + b * c;</code></td>
                <td className="px-4 py-2">Calculates using multiple values</td>
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