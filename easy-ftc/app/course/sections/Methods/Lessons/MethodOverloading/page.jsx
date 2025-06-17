import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import MethodOverloadingEditor from "./MethodOverloadingEditor";

export const metadata = {
  title: "Method Overloading | EasyFTC",
};

export default function MethodOverloading() {
  // This lesson has 27 points
  const lessonPoints = 27;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Method Overloading</h1>

        <p>
          In Java, you can define multiple methods with the same name as long as they have different parameter lists. This is called method overloading.
        </p>

        <p>
          Why would we want to do this? It lets us reuse the same method name when the action is conceptually the same, but we want to allow for different types or numbers of inputs.
        </p>

        <br />
        <h2>Example: Printing with Options</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class Printer {
    // Method 1: No parameters
    public void print() {
        System.out.println("Printing...");
    }

    // Method 2: One String parameter
    public void print(String message) {
        System.out.println("Printing: " + message);
    }

    // Method 3: One int parameter
    public void print(int copies) {
        System.out.println("Printing " + copies + " copies...");
    }
}`}
          </SyntaxHighlighter>
        </div>

        <p>
          Even though all three methods are called print(), Java can tell them apart by looking at the number and types of parameters.
        </p>

        <br />
        <h2>Rules for Method Overloading</h2>
        <p>To overload a method, the new method must have a different:</p>
        <ul className="my-4">
          <li>Number of parameters</li>
          <li>OR</li>
          <li>Type of parameters</li>
          <li>OR</li>
          <li>Order of parameters (if different types)</li>
        </ul>
        <p>❌ You cannot overload a method by changing the return type only.</p>

        <br />
        <h2>Incorrect Overloading</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public int add(int x, int y) {
    return x + y;
}

// This will cause an error! Only the return type is different.
public double add(int x, int y) {
    return x + y;
}`}
          </SyntaxHighlighter>
        </div>

        <p>
          Java can't figure out which one to call because the parameter lists are the same.
        </p>

        <br />
        <h2>Why Use Method Overloading?</h2>
        <ul className="my-4">
          <li>Cleaner code</li>
          <li>Logical grouping of similar actions</li>
          <li>More flexibility for how a method is called</li>
        </ul>

        <p>For example, consider a method to calculate area:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public double area(double radius) { return Math.PI * radius * radius; }
public int area(int length, int width) { return length * width; }`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Try It Yourself!</h2>
        <p>Complete the code as described by the comments.</p>
        
        <div className="h-[600px] mt-4">
          <MethodOverloadingEditor />
        </div>
      
        <br />
        <h2>Recap</h2>
        <ul className="my-4">
          <li>Method overloading = same method name, different parameter list.</li>
          <li>Helps organize similar behavior in one place.</li>
          <li>Java uses the number, type, and order of parameters to choose the right method.</li>
          <li>You cannot overload by return type alone.</li>
        </ul>
        <br />
        
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
