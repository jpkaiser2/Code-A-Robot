import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const metadata = {
  title: "Scanner Class | EasyFTC",
};

export default function Scanner() {
  // This lesson has 7 points
  const lessonPoints = 7;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Scanner Class</h1>
        
        <p>
          The Scanner class in Java lets us take input from the user. For example, you might ask the user to enter the robot’s starting position or how far it should drive.
        </p>
        
        <h2>Importing and Creating a Scanner</h2>
        <p>To use it, we first import the class:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`import java.util.Scanner;`}
          </SyntaxHighlighter>
        </div>
        <br />
        <p>Then we create a Scanner object:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`Scanner scanner = new Scanner(System.in);`}
          </SyntaxHighlighter>
        </div>
        
        <br />
        <h2>Common Scanner Methods</h2>
        <p>Some of the most common methods:</p>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Method</th>
                <th className="px-4 py-2">What it does</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">nextLine()</td>
                <td className="px-4 py-2">Reads a whole line of text</td>
              </tr>
              <tr>
                <td className="px-4 py-2">next()</td>
                <td className="px-4 py-2">Reads a single word</td>
              </tr>
              <tr>
                <td className="px-4 py-2">nextInt()</td>
                <td className="px-4 py-2">Reads an integer (whole number)</td>
              </tr>
              <tr>
                <td className="px-4 py-2">nextDouble()</td>
                <td className="px-4 py-2">Reads a decimal number</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <br />
        <h2>Example</h2>
        <p>Here's an example that reads a robot name and drive distance:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`import java.util.Scanner;

public class RobotTest {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Enter your robot's name: ");
        String name = input.nextLine();

        System.out.print("Enter drive distance in inches: ");
        int distance = input.nextInt();

        System.out.println("Robot " + name + " will drive " + distance + " inches.");

        input.close();
    }
}`}
          </SyntaxHighlighter>
        </div>
        
        <br />
        <h2>Scanner in FTC vs. Java</h2>
        <p>
          While the Scanner class is very important in general Java programming, it's not commonly used in FTC robotics programming.
        </p>
        <p>Why not in FTC?</p>
        <ul>
          <li>FTC robots don’t take text input from a keyboard during a match.</li>
          <li>All robot behavior must be pre-programmed or based on gamepad/controller inputs.</li>
          <li>Using Scanner in an OpMode doesn’t make sense because there’s no terminal to type into on the Driver Station app.</li>
        </ul>
        <br />
        <p>So… Why learn it then?</p>
        <ul>
          <li>Scanner is an essential part of learning Java.</li>
          <li>Many beginner Java programs use it for practice with variables, logic, and conditionals.</li>
          <li>Understanding Scanner helps you get comfortable with how input/output works, which is a foundation for more advanced topics like reading files or handling sensors.</li>
        </ul>
        
        <br />
        <h2>Common Mistakes</h2>
        <p>Watch out for these mistakes:</p>
        <ul>
          <li>
            Forgetting to import Scanner<br />
            Fix: <code>import java.util.Scanner;</code>
          </li>
          <li>
            Forgetting to close the Scanner<br />
            Fix: <code>scanner.close();</code> (only after you're done using it)
          </li>
          <li>
            Mixing <code>nextLine()</code> with <code>nextInt()</code>/<code>nextDouble()</code><br />
            Add an extra <code>nextLine()</code> to consume the leftover newline:
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int num = scanner.nextInt();
scanner.nextLine();  // consume newline
String text = scanner.nextLine();`}
              </SyntaxHighlighter>
            </div>
          </li>
        </ul>
        
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
