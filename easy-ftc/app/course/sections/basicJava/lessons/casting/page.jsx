import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CastingEditor from "./CastingEditor";

export const metadata = {
  title: "Casting | EasyFTC",
};

export default function Casting() {
  // This lesson has 8 points
  const lessonPoints = 8;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Casting in Java</h1>
        
        <div className="prose prose-lg">
          <p>
            As we learned in the primitive types lesson, each value in Java has a type. Sometimes you need to convert one type into another. 
            Converting from one primitive type to another is called casting. In this lesson, we will cover:
          </p>
          <ul className="list-disc pl-6">
            <li>Implicit (automatic) casting</li>
            <li>Explicit (manual) casting</li>
            <li>Truncation: what happens to the decimal part when you convert to a whole number</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Implicit (Automatic) Casting</h2>
          <p>
            Java will automatically convert a "smaller" type into a "larger" type if that conversion can't lose information. 
            No special code is needed; Java does it for you.
          </p>
          <ul className="list-disc pl-6">
            <li>int → double</li>
            <li>float → double</li>
            <li>char → int (ASCII Value)</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">Examples of Implicit Casting</h3>
          
          <p>int → double</p>
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
{`int    apples = 4;
double price  = 1.75;
double total  = apples * price;
// 'apples' is int, 'price' is double → Java automatically treats 'apples' as 4.0
// total becomes 7.0`}
          </SyntaxHighlighter>

          <p className="mt-4">float → double</p>
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
{`float  tempF   = 98.6f;
double tempD   = tempF;
// Implicit: float (98.6) → double (98.6)`}
          </SyntaxHighlighter>

          <h2 className="text-2xl font-bold mt-8 mb-4">Explicit (Manual) Casting</h2>
          <p>
            When you convert a "larger" type into a "smaller" type, information can be lost. 
            Java forces you to write a cast operator (type) to show you understand this risk.
          </p>
          <ul className="list-disc pl-6">
            <li>double → int</li>
            <li>double → float</li>
            <li>int → char</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">The Cast Operator Syntax</h3>
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
{`targetType variableName = (targetType) expression;`}
          </SyntaxHighlighter>

          <h2 className="text-2xl font-bold mt-8 mb-4">Truncation: Dropping the Decimal Part</h2>
          <p>
            Whenever you convert a decimal‐holding type (double or float) into a whole‐number type (int), 
            Java simply removes everything after the decimal point.
          </p>
          <p>
            This removal of the fractional part is called truncation. It does not round; it just cuts off the ".something" part.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Example of Truncation (double → int)</h3>
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
{`double price    = 3.99;
int dollars  = (int) price;  
// (int) price ― Java drops the ".99"
// dollars becomes 3, not 4
System.out.println(dollars); // prints: 3`}
          </SyntaxHighlighter>

          <p className="mt-4">Because of truncation:</p>
          <ul className="list-disc pl-6">
            <li>(int) 3.99 → 3</li>
            <li>Likewise, (int) 5.01 → 5</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Examples of Explicit Casting</h2>
          
          <p>double → int (truncation)</p>
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
{`double precise = 7.75;
int whole = (int) precise;
// 'whole' becomes 7; the .75 is dropped
System.out.println(whole); // prints: 7`}
          </SyntaxHighlighter>

          <p className="mt-4">float → int (truncation)</p>
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
{`float  measurement = 9.99f;
int trimmed = (int) measurement;
// 'trimmed' becomes 9; the .99 is dropped
System.out.println(trimmed); // prints: 9`}
          </SyntaxHighlighter>

          <p className="mt-4">double → float (possible loss of precision)</p>
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
{`double preciseValue = 123.4567890123;
float  lessPrecise  = (float) preciseValue;
// Some digits after the decimal might be cut off
System.out.println(lessPrecise); // prints something like: 123.45679 (only 7 significant digits remain)`}
          </SyntaxHighlighter>

          <h2 className="text-2xl font-bold mt-8 mb-4">Reference Table</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">From Type</th>
                  <th className="px-4 py-2">To Type</th>
                  <th className="px-4 py-2">Implicit?</th>
                  <th className="px-4 py-2">Truncation or Info Loss?</th>
                  <th className="px-4 py-2">Example Code</th>
                  <th className="px-4 py-2">Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">int</td>
                  <td className="px-4 py-2">double</td>
                  <td className="px-4 py-2">Yes</td>
                  <td className="px-4 py-2">No</td>
                  <td className="px-4 py-2">double d = 5;</td>
                  <td className="px-4 py-2">d becomes 5.0</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">float</td>
                  <td className="px-4 py-2">double</td>
                  <td className="px-4 py-2">Yes</td>
                  <td className="px-4 py-2">No</td>
                  <td className="px-4 py-2">double d2 = 2.5f;</td>
                  <td className="px-4 py-2">d2 becomes 2.5</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">char</td>
                  <td className="px-4 py-2">int</td>
                  <td className="px-4 py-2">Yes</td>
                  <td className="px-4 py-2">No</td>
                  <td className="px-4 py-2">int code = 'A';</td>
                  <td className="px-4 py-2">code becomes 65</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">double</td>
                  <td className="px-4 py-2">int</td>
                  <td className="px-4 py-2">No</td>
                  <td className="px-4 py-2">Yes: decimal truncated</td>
                  <td className="px-4 py-2">int i = (int) 3.99;</td>
                  <td className="px-4 py-2">i becomes 3</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">double</td>
                  <td className="px-4 py-2">float</td>
                  <td className="px-4 py-2">No</td>
                  <td className="px-4 py-2">Yes: can lose extra decimal places</td>
                  <td className="px-4 py-2">float f = (float) 3.14159265359;</td>
                  <td className="px-4 py-2">f becomes about 3.1415927</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">float</td>
                  <td className="px-4 py-2">int</td>
                  <td className="px-4 py-2">No</td>
                  <td className="px-4 py-2">Yes: decimal truncated</td>
                  <td className="px-4 py-2">int n = (int) 9.99f;</td>
                  <td className="px-4 py-2">n becomes 9</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">int</td>
                  <td className="px-4 py-2">char</td>
                  <td className="px-4 py-2">No</td>
                  <td className="px-4 py-2">No (just converts code to character)</td>
                  <td className="px-4 py-2">char c = (char) 67;</td>
                  <td className="px-4 py-2">c becomes 'C'</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">boolean</td>
                  <td className="px-4 py-2">—</td>
                  <td className="px-4 py-2">N/A</td>
                  <td className="px-4 py-2">N/A</td>
                  <td className="px-4 py-2">Cannot cast</td>
                  <td className="px-4 py-2">Compiler error</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Try It Yourself!</h2>
          <p>Complete the code as described by the comments.</p>
          
          <div className="h-[600px] mt-4">
            <CastingEditor />
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Recap</h2>
          <h3 className="text-xl font-bold mt-6 mb-3">Implicit Casting (Widening)</h3>
          <ul className="list-disc pl-6">
            <li>Java does this automatically. No (type) needed.</li>
            <li>Works when there is no risk of losing information.</li>
            <li>Examples:
              <ul className="list-disc pl-6">
                <li>int → double</li>
                <li>float → double</li>
                <li>char → int</li>
              </ul>
            </li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">Explicit Casting (Narrowing)</h3>
          <ul className="list-disc pl-6">
            <li>Requires (type) operator.</li>
            <li>Used when information might be lost.</li>
            <li>Examples:
              <ul className="list-disc pl-6">
                <li>double → int (truncation)</li>
                <li>double → float (precision loss)</li>
                <li>int → char (ASCII conversion)</li>
              </ul>
            </li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">Truncation</h3>
          <ul className="list-disc pl-6">
            <li>Happens when converting to whole numbers.</li>
            <li>Simply drops everything after the decimal point.</li>
            <li>Does not round up or down.</li>
          </ul>
        </div>
        
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
