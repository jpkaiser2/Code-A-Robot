import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ScopeEditor from "./ScopeEditor";

export const metadata = {
  title: "Scope | EasyFTC",
};

export default function Scope() {
  // This lesson has 28 points
  const lessonPoints = 28;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Scope</h1>

        <p>
          When you write Java programs, it's important to understand where your variables and methods can be used. This is known as scope. Scope determines which parts of your code can "see" or access a particular variable or method.
        </p>

        <br />
        <h2>Why Scope Matters</h2>
        <p>If you try to use a variable outside of where it was declared, your program will give you an error. Understanding scope helps you:</p>
        <ul className="my-4">
          <li>Avoid naming conflicts</li>
          <li>Write cleaner and safer code</li>
          <li>Know where variables exist and when they disappear</li>
        </ul>

        <br />
        <h2>Types of Scope in Java</h2>
        
        <h3>1. Local Scope</h3>
        <p>Variables declared inside a method (or block) only exist inside that method.</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class ScopeExample {
    public static void main(String[] args) {
        int score = 10; // This variable has local scope to main
        System.out.println(score);
    }
    
    public static void showScore() {
        System.out.println(score); // ERROR! 'score' doesn't exist here
    }
}`}
          </SyntaxHighlighter>
        </div>

        <h3>2. Instance Scope (Fields)</h3>
        <p>Variables declared outside of methods, but inside a class, can be used by any method in that class. These are called instance variables or fields.</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class Dog {
    String name; // This variable has instance scope

    public void bark() {
        System.out.println(name + " says woof!");
    }

    public void rename(String newName) {
        name = newName; // No problem accessing 'name' here
    }
}`}
          </SyntaxHighlighter>
        </div>

        <h3>3. Block Scope</h3>
        <p>Variables declared inside {} braces only exist within those braces.</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class BlockScope {
    public static void main(String[] args) {
        if (true) {
            int age = 15;
            System.out.println(age);
        }
        // System.out.println(age); // ERROR! 'age' is out of scope
    }
}`}
          </SyntaxHighlighter>
        </div>

       

        <br />
        <h2>Try It Yourself!</h2>
        <p>Complete the code as described by the comments.</p>
        
        <div className="h-[600px] mt-4">
          <ScopeEditor />
        </div>
        <br />
        
        <h2>Recap</h2>
        <ul className="my-4">
          <li>A variable only exists in the place it was declared.</li>
          <li>Variables inside methods are local to that method.</li>
          <li>Variables inside blocks {} are local to that block.</li>
          <li>Variables outside methods, but inside a class, are accessible to all methods in the class.</li>
        </ul>
        <br />
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
