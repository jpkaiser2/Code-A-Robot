import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const metadata = {
  title: "Casting | EasyFTC",
};

export default function Casting() {
  // This lesson has 8 points
  const lessonPoints = 8;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Casting in Java</h1>
        
        <p>
          As we learned in the primitive types lesson, each value in Java has a type. Sometimes you need to convert one type into another. 
          Converting from one primitive type to another is called casting. In this lesson, we will cover:
        </p>
        <ul>
          <li>Implicit (automatic) casting</li>
          <li>Explicit (manual) casting</li>
          <li>Truncation: what happens to the decimal part when you convert to a whole number</li>
        </ul>

        <br />
        <h2>Implicit (Automatic) Casting</h2>
        <p>
          Java will automatically convert a "smaller" type into a "larger" type if that conversion can't lose information. 
          No special code is needed; Java does it for you.
        </p>
        <ul>
          <li>int → double</li>
          <li>float → double</li>
          <li>char → int (ASCII Value)</li>
        </ul>

        <br />
        <h3>Examples of Implicit Casting</h3>
        
        <p>int → double</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int    apples = 4;
double price  = 1.75;
double total  = apples * price;
// 'apples' is int, 'price' is double → Java automatically treats 'apples' as 4.0
// total becomes 7.0`}
          </SyntaxHighlighter>
        </div>

        <br />
        <p>float → double</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`float  tempF   = 98.6f;
double tempD   = tempF;
// Implicit: float (98.6) → double (98.6)`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Explicit (Manual) Casting</h2>
        <p>
          When you convert a "larger" type into a "smaller" type, information can be lost. 
          Java forces you to write a cast operator (type) to show you understand this risk.
        </p>
        <ul>
          <li>double → int</li>
          <li>double → float</li>
          <li>int → char</li>
        </ul>

        <br />
        <h3>The Cast Operator Syntax</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`targetType variableName = (targetType) expression;`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Truncation: Dropping the Decimal Part</h2>
        <p>
          Whenever you convert a decimal‐holding type (double or float) into a whole‐number type (int), 
          Java simply removes everything after the decimal point.
        </p>
        <p>
          This removal of the fractional part is called truncation. It does not round; it just cuts off the ".something" part.
        </p>

        <br />
        <h3>Example of Truncation (double → int)</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`double price    = 3.99;
int dollars  = (int) price;  
// (int) price ― Java drops the ".99"
// dollars becomes 3, not 4
System.out.println(dollars); // prints: 3`}
          </SyntaxHighlighter>
        </div>

        <br />
        <p>Because of truncation:</p>
        <ul>
          <li>(int) 3.99 → 3</li>
          <li>Likewise, (int) 5.01 → 5</li>
        </ul>

        <br />
        <h2>Examples of Explicit Casting</h2>
        
        <p>double → int (truncation)</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`double precise = 7.75;
int whole = (int) precise;
// 'whole' becomes 7; the .75 is dropped
System.out.println(whole); // prints: 7`}
          </SyntaxHighlighter>
        </div>

        <br />
        <p>float → int (truncation)</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`float  measurement = 9.99f;
int trimmed = (int) measurement;
// 'trimmed' becomes 9; the .99 is dropped
System.out.println(trimmed); // prints: 9`}
          </SyntaxHighlighter>
        </div>

        <br />
        <p>double → float (possible loss of precision)</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`double preciseValue = 123.4567890123;
float  lessPrecise  = (float) preciseValue;
// Some digits after the decimal might be cut off
System.out.println(lessPrecise); // prints something like: 123.45679 (only 7 significant digits remain)`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Reference Table</h2>
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

        <br />
        <h2>Recap</h2>
        <h3>Implicit Casting (Widening)</h3>
        <ul>
          <li>Java does this automatically. No (type) needed.</li>
          <li>Works when there is no risk of losing information.</li>
          <li>Examples:
            <ul>
              <li>int → double</li>
              <li>float → double</li>
              <li>char → int</li>
            </ul>
          </li>
        </ul>

        <br />
        <h3>Explicit Casting (Narrowing)</h3>
        <ul>
          <li>You must write (targetType) before the value.</li>
          <li>Information can be lost.</li>
          <li>Truncation happens if you convert a decimal type (double or float) to int: everything after the decimal point is dropped.</li>
          <li>Examples:
            <ul>
              <li>double → int (e.g., (int) 3.99 → 3)</li>
              <li>double → float (some decimal precision might be lost)</li>
              <li>int → char (numeric code becomes a character)</li>
            </ul>
          </li>
        </ul>

        <br />
        <p>
          Boolean cannot be converted to or from any other primitive type.
        </p>
        <p>
          By remembering "widening is automatic" and "narrowing requires a cast and may truncate," 
          you will avoid common errors and understand exactly how Java handles each conversion.
        </p>
        
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
