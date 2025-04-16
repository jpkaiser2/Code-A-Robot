import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const metadata = {
  title: "Hello World | EasyFTC",
  description: "Your first Java program for FIRST Tech Challenge robotics"
};

export default function HelloWorldLesson() {
  // This lesson has 1 point (second lesson)
  const lessonPoints = 1;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-base">
        <h1>Hello World!</h1>
        
        <p>
          Welcome to your first step into the world of Java programming for FTC! Before we get into robots, motors, and sensors, 
          we need to understand the basics of Java itself — and that starts with a simple, classic program: Hello World.
        </p>
        
        <h2>What You'll Learn</h2>
        
        <ul>
          <li>How to write your first Java program</li>
          <li>What the main method is and why it matters</li>
          <li>How to print messages using System.out.print() and System.out.println()</li>
          <li>The difference between print and println</li>
        </ul>
        
        <h2>Your First Program</h2>
        
        <p>Let's jump right into some code:</p>
        
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}`}
          </SyntaxHighlighter>
        </div>
        
        <h2>Let's Break It Down</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Line</th>
                <th className="px-4 py-2">What it does</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2"><code>public class HelloWorld</code></td>
                <td className="px-4 py-2">This defines a class named HelloWorld. In Java, everything lives inside a class. The file should be saved as HelloWorld.java.</td>
              </tr>
              <tr>
                <td className="px-4 py-2"><code>public static void main(String[] args)</code></td>
                <td className="px-4 py-2">This is the main method. It's the first thing that runs when your program starts. Java always looks for this method.</td>
              </tr>
              <tr>
                <td className="px-4 py-2"><code>System.out.println("Hello World!")</code></td>
                <td className="px-4 py-2">This prints the message Hello World! to the console, followed by a new line.</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h2>print vs println</h2>
        
        <p>Java gives you two ways to print to the console:</p>
        
        <h3>System.out.println()</h3>
        <p>Prints the text and then moves to the next line</p>
        <p>Think of it like hitting "Enter" after typing</p>
        
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`System.out.println("Line 1");
System.out.println("Line 2");`}
          </SyntaxHighlighter>
        </div>
        
        <p>Output:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter style={vscDarkPlus}>
{`Line 1
Line 2`}
          </SyntaxHighlighter>
        </div>
        
        <h3>System.out.print()</h3>
        <p>Prints the text but stays on the same line</p>
        <p>Great when you want to build a line of text in parts</p>
        
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`System.out.print("Line ");
System.out.print("1");`}
          </SyntaxHighlighter>
        </div>
        
        <p>Output:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter style={vscDarkPlus}>
{`Line 1`}
          </SyntaxHighlighter>
        </div>
        
        <h2>Quick Tip</h2>
        
        <p>You can mix print and println to control how your output looks:</p>
        
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`System.out.print("Hello ");
System.out.println("World!");
System.out.println("This is a new line.");`}
          </SyntaxHighlighter>
        </div>
        
        <p>Output:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter style={vscDarkPlus}>
{`Hello World!
This is a new line.`}
          </SyntaxHighlighter>
        </div>
        
        <h2>Try It Yourself!</h2>
        
        <p>Copy this code into an online Java compiler (like replit.com, JDoodle, or paiza.io):</p>
        
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class HelloWorld {
    public static void main(String[] args) {
        System.out.print("Hello ");
        System.out.println("FTC Programmer!");
    }
}`}
          </SyntaxHighlighter>
        </div>
        
        <p>Try changing the messages. What happens if you add more println() or mix in extra print() lines?</p>
        
        <h2>Recap</h2>
        
        <ul>
          <li>Every Java program starts with a class and a main method</li>
          <li>System.out.print() and System.out.println() let you display text</li>
          <li>println() adds a new line, print() doesn't</li>
        </ul>
        
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
} 