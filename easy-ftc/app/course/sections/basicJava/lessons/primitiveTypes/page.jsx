import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import PrimitiveTypesEditor from "./PrimitiveTypesEditor";

export const metadata = {
  title: "Primitive Types | EasyFTC",
};

export default function primitiveTypes() {
  // This lesson has 3 points (fourth lesson)
  const lessonPoints = 3;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Primitive Types</h1>
        
        <div className="prose prose-lg">
          <h2 className="text-2xl font-bold mt-8 mb-4">What You'll Learn</h2>
          <ul className="list-disc pl-6">
            <li>How to write comments to explain your code</li>
            <li>What primitive types are in Java</li>
            <li>How to create and use variables</li>
            <li>The difference between declaring and initializing a variable</li>
            <li>The rules for naming variables, and what camel case is</li>
            <li>What a String is and how it stores text</li>
            <li>How to print variables and combine text using concatenation</li>
            <li>Real examples from FTC robot code</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">What Are Comments?</h2>
          <p>
            Imagine you're writing notes to yourself or teammates in your code. These notes are called comments. 
            Java will ignore them when running your program, but they're super helpful for humans reading your code later.
          </p>
          <p>There are two types of comments:</p>
          <p>Single-line comment:</p>
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
            {`// This is a comment on one line`}
          </SyntaxHighlighter>

          <p className="mt-4">Multi-line comment:</p>
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
            {`/*
 This is a comment
 that goes across multiple lines.
*/`}
          </SyntaxHighlighter>

          <p className="flex items-start mt-4">
            <span className="text-yellow-500 text-xl mr-2">💡</span>
            <span>Use comments to explain what your code does, especially when it's something complex. This is a habit every great programmer has!</span>
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">What Are Primitive Types?</h2>
          <p>
            Primitive types are the most basic data types in Java. They are used to store simple values like numbers, 
            true/false, or a single letter. You'll use these all the time in your FTC code to control things like motor 
            power, sensor values, and conditions.
          </p>
          <p>Here are the main ones you'll use:</p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Example</th>
                  <th className="px-4 py-2">What It Stores</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 font-mono">int</td>
                  <td className="px-4 py-2 font-mono">int motorPower = 50;</td>
                  <td className="px-4 py-2">Whole numbers like 0, 100, or -42</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">double</td>
                  <td className="px-4 py-2 font-mono">double distance = 12.5;</td>
                  <td className="px-4 py-2">Decimal numbers (more precise)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">boolean</td>
                  <td className="px-4 py-2 font-mono">boolean isPressed = true;</td>
                  <td className="px-4 py-2">Only true or false</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">char</td>
                  <td className="px-4 py-2 font-mono">char grade = 'A';</td>
                  <td className="px-4 py-2">A single character (like a letter)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">float</td>
                  <td className="px-4 py-2 font-mono">float speed = 5.7f;</td>
                  <td className="px-4 py-2">Decimal numbers (less precise)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="flex items-start mt-4">
            <span className="text-yellow-500 text-xl mr-2">💡</span>
            <span>In FTC, you'll mostly use int, double, and boolean.</span>
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">What Is a Variable?</h2>
          <p>
            A variable is like a labeled container that stores a piece of information. 
            You give it a name and put a value in it. Later, you can use or change that value in your code.
          </p>
          <p>Syntax</p>
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
            {`type name = value;`}
          </SyntaxHighlighter>

          <p className="mt-4">Example:</p>
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
            {`int motorPower = 100;
double armAngle = 45.5;
boolean clawClosed = false;`}
          </SyntaxHighlighter>

          <h2 className="text-2xl font-bold mt-8 mb-4">Declaring vs Initializing</h2>
          <p>
            You can declare a variable (say it exists), or initialize it (give it a value), or do both at once.
          </p>
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
            {`int motorPower;           // Declaration only
motorPower = 100;         // Initialization later`}
          </SyntaxHighlighter>

          <p className="mt-4">Usually, we do both at once for simplicity:</p>
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
            {`int motorPower = 100;`}
          </SyntaxHighlighter>

          <h2 className="text-2xl font-bold mt-8 mb-4">Camel Case and Naming Variables</h2>
          <p>Variable names must follow some rules:</p>
          <ul className="list-disc pl-6">
            <li>Must start with a letter (not a number)</li>
            <li>Can only use letters, numbers, and underscores (_)</li>
            <li>Can't be a Java keyword (like class or public)</li>
            <li>No spaces allowed</li>
            <li>Should describe what the variable holds</li>
          </ul>

          <p className="mt-4">Most programmers use camel case to name variables. That means:</p>
          <ul className="list-disc pl-6">
            <li>The first word is lowercase</li>
            <li>Every new word starts with a capital letter</li>
          </ul>

          <p className="mt-4">✅ Good examples:</p>
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
            {`int armPosition;
double liftHeight;
boolean isClawClosed;`}
          </SyntaxHighlighter>

          <p className="mt-4">🚫 Bad examples:</p>
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
            {`int Arm_Position; // Underscore and capital at start
int arm position; // No spaces allowed`}
          </SyntaxHighlighter>

          <h2 className="text-2xl font-bold mt-8 mb-4">What Is a String?</h2>
          <p>
            A String is a special kind of variable that stores text. Even though it looks simple, 
            it's actually an object, not a primitive type. That just means it comes with extra abilities, called methods. Notice that String always starts with a capital "S". All objects start with a capital letter, but we will cover this in an upcoming section.  
          </p>
          <p>Examples:</p>
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
            {`String robotName = "RoadRunner";
String message = "Ready to start!";`}
          </SyntaxHighlighter>

          <p className="mt-4">In FTC, you'll use String all the time when sending messages to the Driver Station using telemetry.</p>

          <h3 className="text-xl font-bold mt-6 mb-3">Useful String Methods</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Method</th>
                  <th className="px-4 py-2">What It Does</th>
                  <th className="px-4 py-2">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 font-mono">.length()</td>
                  <td className="px-4 py-2">Tells you how many characters are in the text</td>
                  <td className="px-4 py-2 font-mono">"FTC".length() → 3</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">.toUpperCase()</td>
                  <td className="px-4 py-2">Converts text to all capital letters</td>
                  <td className="px-4 py-2 font-mono">"robot".toUpperCase() → "ROBOT"</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">.contains("x")</td>
                  <td className="px-4 py-2">Checks if it includes a word or letter</td>
                  <td className="px-4 py-2 font-mono">"ready".contains("e") → true</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4">You'll learn more about objects and methods soon, but for now just know you can use these like this:</p>
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-lg">
            {`String team = "Silly Servos";
int length = team.length();  // Stores 12
String loudTeam = team.toUpperCase(); // "SILLY SERVOS"`}
          </SyntaxHighlighter>

          <h2 className="text-2xl font-bold mt-8 mb-4">Try It Yourself!</h2>
          <p>Use the editor below to experiment with different primitive types and String methods!</p>
          
          <div className="h-[600px] mt-4">
            <PrimitiveTypesEditor />
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Recap</h2>
          <ul className="list-disc pl-6">
            <li>Comments help explain your code to others (and yourself later)</li>
            <li>Primitive types store basic values like numbers and true/false</li>
            <li>Variables are containers that store values</li>
            <li>Use camel case to name variables (firstWordSecondWord)</li>
            <li>Strings store text and come with helpful methods</li>
          </ul>
        </div>
        
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
} 