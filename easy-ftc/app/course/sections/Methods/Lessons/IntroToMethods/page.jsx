import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import IntroMethodsEditor from "./IntroMethodsEditor";

export const metadata = {
  title: "Intro to Methods | EasyFTC",
};

export default function IntroMethods() {
  // This lesson has 22 points
  const lessonPoints = 22;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Intro to Methods</h1>

        <p>
          In Java, a method is a block of code that performs a specific task. You can "call" a method whenever you need to run that task. This makes your code cleaner, more organized, and easier to work with.
        </p>

        <p>
          Think of a method like a mini-program you can run as many times as you want without copying and pasting the same code everywhere.
        </p>

        <br />
        <h2>Why Methods Are Useful</h2>
        <p>
          Let's say you want your program to print out the steps to make a sandwich.
        </p>

        <h3>Without methods:</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`System.out.println("Get two slices of bread");
System.out.println("Add peanut butter");
System.out.println("Add jelly");
System.out.println("Put the slices together");
System.out.println("Cut the sandwich in half");

System.out.println("Get two slices of bread");
System.out.println("Add peanut butter");
System.out.println("Add jelly");
System.out.println("Put the slices together");
System.out.println("Cut the sandwich in half");`}
          </SyntaxHighlighter>
        </div>

        <p>That's a lot of repeated code.</p>

        <h3>Now here's the same idea using a method:</h3>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public static void makeSandwich() {
    System.out.println("Get two slices of bread");
    System.out.println("Add peanut butter");
    System.out.println("Add jelly");
    System.out.println("Put the slices together");
    System.out.println("Cut the sandwich in half");
}`}
          </SyntaxHighlighter>
        </div>

        <p>And in main:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`makeSandwich();
makeSandwich();`}
          </SyntaxHighlighter>
        </div>

        <p>
          Now the code is shorter, easier to read, and if you want to change how the sandwich is made, you only need to update one place.
        </p>

        <br />
        <h2>How to Write a Method</h2>
        <p>Here's what a basic method looks like:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public static void methodName() {
    // code goes here
}`}
          </SyntaxHighlighter>
        </div>

        <p>Let's break it down:</p>
        <ul className="my-4">
          <li><strong>public</strong> – Makes the method usable from anywhere in your program.</li>
          <li><strong>static</strong> – For now, this just means you can call it from main.</li>
          <li><strong>void</strong> – Means the method doesn't return a value. We will talk more about this in an upcoming lesson.</li>
          <li><strong>methodName</strong> – You choose the name. It should describe what the method does.</li>
          <li><strong>{'{ }'}</strong> – Curly braces hold the code that runs when the method is called.</li>
        </ul>

        <br />
        <h2>Full Example</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class Main {
    // This method prints sandwich-making steps
    public static void makeSandwich() {
        System.out.println("Get two slices of bread");
        System.out.println("Add peanut butter");
        System.out.println("Add jelly");
        System.out.println("Put the slices together");
        System.out.println("Cut the sandwich in half");
    }

    public static void main(String[] args) {
        makeSandwich(); // Call the method once
        makeSandwich(); // Call it again
    }
}`}
          </SyntaxHighlighter>
        </div>

        <p>Output:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="text" style={vscDarkPlus}>
{`Get two slices of bread
Add peanut butter
Add jelly
Put the slices together
Cut the sandwich in half
Get two slices of bread
Add peanut butter
Add jelly
Put the slices together
Cut the sandwich in half`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>When to Use a Method</h2>
        <p>Create a method when:</p>
        <ul className="my-4">
          <li>You're repeating the same code in different places</li>
          <li>You want your program to be more organized</li>
          <li>You want to make your code easier to understand and update</li>
        </ul>

        <br />
        <h2>Don't Forget!</h2>
        <p>
          Just writing a method doesn't run it. You must call it using its name and parentheses:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`makeSandwich(); // This runs the method`}
          </SyntaxHighlighter>
        </div>
<br />
        <h2>Try It Yourself!</h2>
        <p>Complete the code as described by the comments.</p>
        
        <div className="h-[600px] mt-4">
          <IntroMethodsEditor />
        </div>
        <br />
        <h2>Recap</h2>
        <ul className="my-4">
          <li>A method is a reusable block of code.</li>
          <li>It helps avoid repetition and makes your code easier to manage.</li>
          <li>You write the method once and call it whenever you need it.</li>
        </ul>

        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
