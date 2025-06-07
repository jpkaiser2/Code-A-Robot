import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import BooleanExpressionsEditor from "./BooleanExpressionsEditor";

export const metadata = {
  title: "Boolean Expressions | EasyFTC",
};

export default function BooleanExpressions() {
  // This lesson has 11 points
  const lessonPoints = 11;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Boolean Expressions & DeMorgan's Laws</h1>
        
        <p>
          A boolean expression evaluates to either true or false. In Java, you use booleans to represent simple facts.
        </p>

        <br />
        <h2>Boolean Values and Variables</h2>
        <p>In Java, a boolean can only be true or false. For example:</p>
        
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`boolean isPressed = true;
boolean objectDetected = false;`}
          </SyntaxHighlighter>
        </div>

        <br />
        <p>You can also store the result of a comparison in a boolean:</p>
        
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int distance = 15;
boolean tooClose = (distance < 10);     // false, since 15 < 10 is false`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Comparison Operators</h2>
        <p>When you compare two values, you get a boolean result.</p>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Operator</th>
                <th className="px-4 py-2">Meaning</th>
                <th className="px-4 py-2">Example</th>
                <th className="px-4 py-2">Result (if x = 5)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 font-mono">==</td>
                <td className="px-4 py-2">Equal to</td>
                <td className="px-4 py-2 font-mono">x == 5</td>
                <td className="px-4 py-2">true</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">!=</td>
                <td className="px-4 py-2">Not equal to</td>
                <td className="px-4 py-2 font-mono">x != 5</td>
                <td className="px-4 py-2">false</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">&lt;</td>
                <td className="px-4 py-2">Less than</td>
                <td className="px-4 py-2 font-mono">x &lt; 8</td>
                <td className="px-4 py-2">true</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">&gt;</td>
                <td className="px-4 py-2">Greater than</td>
                <td className="px-4 py-2 font-mono">x &gt; 8</td>
                <td className="px-4 py-2">false</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">&lt;=</td>
                <td className="px-4 py-2">Less than or equal to</td>
                <td className="px-4 py-2 font-mono">x &lt;= 5</td>
                <td className="px-4 py-2">true</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">&gt;=</td>
                <td className="px-4 py-2">Greater than or equal to</td>
                <td className="px-4 py-2 font-mono">x &gt;= 6</td>
                <td className="px-4 py-2">false</td>
              </tr>
            </tbody>
          </table>
        </div>

        <br />
        <h2>Opposite of a comparison</h2>
        <p>The ! operator means "not" or the "opposite of". In programming, taking the opposite of something is called negation.</p>
        
        <ul className="my-4">
          <li>The opposite of &lt;= is &gt;.</li>
          <li>The opposite of &lt; is &gt;=.</li>
          <li>The opposite of &gt;= is &lt;.</li>
          <li>The opposite of &gt; is &lt;=.</li>
          <li>The opposite of == is !=, and vice versa.</li>
        </ul>

        <p>Example:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int batteryVoltage = 12;
boolean isFull = (batteryVoltage >= 12);   // true
boolean full = !(batteryVoltage < 12);    // also true, since < is the opposite of >=`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Logical Operators</h2>
        <p>You can also combine comparisons:</p>

        <br />
        <h3>AND (&&)</h3>
        <p>True only if both sides are true.</p>
        <p>Example:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`boolean frontClear = (distFront > 20);   // e.g., distFront = 25 → true
boolean backClear  = (distBack  > 20);   // e.g., distBack  = 10 → false
boolean bothClear  = frontClear && backClear;  // false`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h3>OR (||)</h3>
        <p>True if at least one side is true.</p>
        <p>Example:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`boolean a = false;
boolean b = true;
boolean either = a || b;  // true`}
          </SyntaxHighlighter>
        </div>
        <br/>
        <p>💡 If both sides of a comparison are false, the expression evaluates to false. Remember, two wrongs don't make a right :)</p>

        <br />
        <h3>NOT (!)</h3>
        <p>Flips true to false, and false to true.</p>
        <p>Example:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`boolean switchPressed = false; // suppose false
boolean proceed = !switchPressed; // true`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Short-Circuit Behavior</h2>
        <ul className="my-4">
          <li>For A && B: if A is false, Java does not check B.</li>
          <li>For A || B: if A is true, Java does not check B.</li>
        </ul>

        <br />
        <h2>De Morgan's Laws</h2>
        <p>When you want to negate (take the opposite of) a combined expression, De Morgan's Laws tell you how to "distribute" the !:</p>

        <br />
        <h3>Negating an AND</h3>
        <p>!(A && B) == (!A) || (!B)</p>
        <p>"Not (A AND B)" equals "(Not A) OR (Not B)."</p>

        <br />
        <h3>Negating an OR</h3>
        <p>!(A || B) == (!A) && (!B)</p>
        <p>"Not (A OR B)" equals "(Not A) AND (Not B)."</p>

        <br />
        <h3>Distributing the !</h3>
        <p>Example 1:</p>
        <p>Two sensors:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`boolean leftDetects  = (leftSensor.getValue() > 50);
boolean rightDetects = (rightSensor.getValue() > 50);`}
          </SyntaxHighlighter>
        </div>

        <br />
        <p>You want a boolean that means "it is not true that both detect." That is:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`boolean notBoth = !(leftDetects && rightDetects);`}
          </SyntaxHighlighter>
        </div>

        <br />
        <p>By De Morgan's Law, distribute the ! inside:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`boolean notBothAlt = (!leftDetects) || (!rightDetects);`}
          </SyntaxHighlighter>
        </div>

        <br />
        <p>Before: !(A && B)</p>
        <p>After: (!A) || (!B)</p>
        <p>These two segments give the same output, but are just written differently</p>

        <br />
        <p>Example 2:</p>
        <p>Two obstacle checks:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`boolean frontObstacle = (frontDistance < 10);
boolean backObstacle  = (backDistance  < 10);`}
          </SyntaxHighlighter>
        </div>

        <br />
        <p>To say "there is no obstacle at all," write:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`boolean noObstacle = !(frontObstacle || backObstacle);`}
          </SyntaxHighlighter>
        </div>

        <br />
        <p>Distribute the !:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`boolean noObstacleAlt = (!frontObstacle) && (!backObstacle);`}
          </SyntaxHighlighter>
        </div>

        <br />
        <p>Before: !(A || B)</p>
        <p>After: (!A) && (!B)</p>

        <br />
        <p>💡 "Distribute the !" means push it inside parentheses, flip && ↔ ||, and put a ! in front of each simple condition.</p>

        <br />
        <h2>Negating Comparison Operators Directly</h2>
        <p>Instead of using ! on a comparison, you can also flip the operator to its opposite:</p>
        <ul className="my-4">
          <li>Opposite of &lt;= is &gt;.</li>
          <li>Opposite of &lt; is &gt;=.</li>
          <li>Opposite of &gt;= is &lt;.</li>
          <li>Opposite of &gt; is &lt;=.</li>
          <li>Opposite of == is !=, and vice versa.</li>
        </ul>

        <p>Example:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int speed = 5;
// Instead of writing: boolean tooFast = !(speed <= 3);
// Flip <= to >:
boolean tooFast = (speed > 3);  // true since 5 > 3`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Try It Yourself!</h2>
        <p>Complete the code as described by the comments.</p>
        
        <div className="h-[600px] mt-4">
          <BooleanExpressionsEditor />
        </div>
        <br />
        <h2>Recap</h2>
        <ul className="my-4">
          <li>A boolean is either true or false.</li>
          <li>Comparison operators (==, !=, &lt;, &gt;, &lt;=, &gt;=) give a boolean result.</li>
          <li>Logical operators combine or invert booleans:
            <ul className="my-2">
              <li>&& (AND): true only if both sides are true.</li>
              <li>|| (OR): true if at least one side is true.</li>
              <li>! (NOT): flips true and false.</li>
            </ul>
          </li>
          <li>De Morgan's Laws let you distribute ! inside parentheses by flipping && and ||:
            <ul className="my-2">
              <li>!(A && B) == (!A) || (!B)</li>
              <li>!(A || B) == (!A) && (!B)</li>
            </ul>
          </li>
          <li>Instead of writing !(comparison), you can directly flip the operator to its opposite (e.g., use &gt; instead of !(&lt;=)).</li>
        </ul>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
