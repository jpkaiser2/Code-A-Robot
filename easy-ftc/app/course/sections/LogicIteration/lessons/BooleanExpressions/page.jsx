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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Boolean Expressions & DeMorgan's Laws</h1>
        
        <div className="prose prose-lg">
          <p>
            A boolean expression evaluates to either true or false. In Java, you use booleans to represent simple facts.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Boolean Values and Variables</h2>
          <p>In Java, a boolean can only be true or false. For example:</p>
          
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
{`boolean isPressed = true;
boolean objectDetected = false;`}
          </SyntaxHighlighter>

          <p className="mt-4">You can also store the result of a comparison in a boolean:</p>
          
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
{`int distance = 15;
boolean tooClose = (distance < 10);     // false, since 15 < 10 is false`}
          </SyntaxHighlighter>

          <h2 className="text-2xl font-bold mt-8 mb-4">Comparison Operators</h2>
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
                  <td className="px-4 py-2 font-mono">{'<'}</td>
                  <td className="px-4 py-2">Less than</td>
                  <td className="px-4 py-2 font-mono">x {'<'} 8</td>
                  <td className="px-4 py-2">true</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">{'>'}</td>
                  <td className="px-4 py-2">Greater than</td>
                  <td className="px-4 py-2 font-mono">x {'>'} 8</td>
                  <td className="px-4 py-2">false</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">{'<='}</td>
                  <td className="px-4 py-2">Less than or equal to</td>
                  <td className="px-4 py-2 font-mono">x {'<='} 5</td>
                  <td className="px-4 py-2">true</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">{'>='}</td>
                  <td className="px-4 py-2">Greater than or equal to</td>
                  <td className="px-4 py-2 font-mono">x {'>='} 6</td>
                  <td className="px-4 py-2">false</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Opposite of a comparison</h2>
          <p>The ! operator means "not" or the "opposite of". In programming, taking the opposite of something is called negation.</p>
          
          <ul className="list-disc pl-6 mt-4">
            <li>The opposite of {'<='} is {'>'}.</li>
            <li>The opposite of {'<'} is {'>='}.</li>
            <li>The opposite of {'>='} is {'<'}.</li>
            <li>The opposite of {'>'} is {'<='}.</li>
            <li>The opposite of == is !=, and vice versa.</li>
          </ul>

          <p className="mt-4">Example:</p>
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
{`int batteryVoltage = 12;
boolean isFull = (batteryVoltage >= 12);   // true
boolean full = !(batteryVoltage < 12);    // also true, since < is the opposite of >=`}
          </SyntaxHighlighter>

          <h2 className="text-2xl font-bold mt-8 mb-4">Logical Operators</h2>
          <p>You can also combine comparisons:</p>

          <h3 className="text-xl font-bold mt-6 mb-3">AND (&&)</h3>
          <p>True only if both sides are true.</p>
          <p>Example:</p>
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
{`boolean frontClear = (distFront > 20);   // e.g., distFront = 25 → true
boolean backClear  = (distBack  > 20);   // e.g., distBack  = 10 → false
boolean bothClear  = frontClear && backClear;  // false`}
          </SyntaxHighlighter>

          <h3 className="text-xl font-bold mt-6 mb-3">OR (||)</h3>
          <p>True if at least one side is true.</p>
          <p>Example:</p>
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
{`boolean a = false;
boolean b = true;
boolean either = a || b;  // true`}
          </SyntaxHighlighter>
          <p className="mt-4">💡 If both sides of a comparison are false, the expression evaluates to false. Remember, two wrongs don't make a right :)</p>

          <h3 className="text-xl font-bold mt-6 mb-3">NOT (!)</h3>
          <p>Flips true to false, and false to true.</p>
          <p>Example:</p>
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
{`boolean switchPressed = false; // suppose false
boolean proceed = !switchPressed; // true`}
          </SyntaxHighlighter>

          <h2 className="text-2xl font-bold mt-8 mb-4">Short-Circuit Behavior</h2>
          <ul className="list-disc pl-6 mt-4">
            <li>For A && B: if A is false, Java does not check B.</li>
            <li>For A || B: if A is true, Java does not check B.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">De Morgan's Laws</h2>
          <p>When you want to negate (take the opposite of) a combined expression, De Morgan's Laws tell you how to "distribute" the !:</p>

          <h3 className="text-xl font-bold mt-6 mb-3">Negating an AND</h3>
          <p>!(A && B) == (!A) || (!B)</p>
          <p>"Not (A AND B)" equals "(Not A) OR (Not B)."</p>

          <h3 className="text-xl font-bold mt-6 mb-3">Negating an OR</h3>
          <p>!(A || B) == (!A) && (!B)</p>
          <p>"Not (A OR B)" equals "(Not A) AND (Not B)."</p>

          <h3 className="text-xl font-bold mt-6 mb-3">Distributing the !</h3>
          <p>Example 1:</p>
          <p>Two sensors:</p>
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
{`boolean leftDetects  = (leftSensor.getValue() > 50);
boolean rightDetects = (rightSensor.getValue() > 50);`}
          </SyntaxHighlighter>

          <p className="mt-4">You want a boolean that means "it is not true that both detect." That is:</p>
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
{`boolean notBoth = !(leftDetects && rightDetects);`}
          </SyntaxHighlighter>

          <p className="mt-4">By De Morgan's Law, distribute the ! inside:</p>
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
{`boolean notBothAlt = (!leftDetects) || (!rightDetects);`}
          </SyntaxHighlighter>

          <p className="mt-4">Before: !(A && B)</p>
          <p>After: (!A) || (!B)</p>
          <p>These two segments give the same output, but are just written differently</p>

          <p className="mt-4">Example 2:</p>
          <p>Two obstacle checks:</p>
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
{`boolean frontObstacle = (frontDistance < 10);
boolean backObstacle  = (backDistance  < 10);`}
          </SyntaxHighlighter>

          <p className="mt-4">To say "there is no obstacle at all," write:</p>
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
{`boolean noObstacle = !(frontObstacle || backObstacle);`}
          </SyntaxHighlighter>

          <p className="mt-4">Distribute the !:</p>
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
{`boolean noObstacleAlt = (!frontObstacle) && (!backObstacle);`}
          </SyntaxHighlighter>

          <p className="mt-4">Before: !(A || B)</p>
          <p>After: (!A) && (!B)</p>

          <p className="mt-4">💡 "Distribute the !" means push it inside parentheses, flip && ↔ ||, and put a ! in front of each simple condition.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Negating Comparison Operators Directly</h2>
          <p>Instead of using ! on a comparison, you can also flip the operator to its opposite:</p>
        </div>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
