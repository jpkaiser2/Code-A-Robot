import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import VarsEditor from "./VarsEditor";

export const metadata = {
  title: "Instance Variables vs. Local Variables | EasyFTC",
};

export default function VarsVs() {
  // This lesson has 35 points
  const lessonPoints = 35;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Instance Variables vs. Local Variables</h1>
        <br />
        <p>In Java, understanding the difference between <b>instance variables</b> and <b>local variables</b> is crucial to writing clear, well-organized code. These two types of variables serve different purposes and exist in different parts of your program.</p>
        <br />
        <h2>Instance Variables</h2>
        <p><b>Definition:</b> An instance variable is a variable that belongs to an object. It is declared inside a class, but outside of any method or constructor.</p>
        <ul className="list-disc ml-6">
          <li>Belongs to each object (or "instance") of the class</li>
          <li>Exists for as long as the object exists</li>
          <li>Used to represent the state or attributes of an object</li>
          <li>Can be accessed by all methods in the class</li>
        </ul>
        <b>Example:</b>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-md my-2">
{`public class Dog {
    String name;       // instance variable
    int age;           // instance variable

    public void bark() {
        System.out.println(name + " says woof!");
    }
}`}
          </SyntaxHighlighter>
        </div>
        <p>Here, <code>name</code> and <code>age</code> are instance variables. Every <code>Dog</code> object will have its own <code>name</code> and <code>age</code>.</p>
        <br />
        <h2>Local Variables</h2>
        <p><b>Definition:</b> A local variable is a variable that is declared inside a method, constructor, or block, and it only exists while that method is running.</p>
        <ul className="list-disc ml-6">
          <li>Belongs only to the method/block in which it is declared</li>
          <li>Exists only for the duration of the method</li>
          <li>Cannot be used outside the method</li>
        </ul>
        <b>Example:</b>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-md my-2">
{`public class Dog {
    public void celebrateBirthday() {
        int yearsToAdd = 1; // local variable
        System.out.println("Happy Birthday!");
    }
}`}
          </SyntaxHighlighter>
        </div>
        <p>Here, <code>yearsToAdd</code> is a local variable. It only exists during the execution of the <code>celebrateBirthday</code> method.</p>
        <br />
        <h2>Side-by-Side Comparison</h2>
        <table className="w-full text-left border mt-2 mb-4">
          <thead>
            <tr>
              <th className="border px-2 py-1">Feature</th>
              <th className="border px-2 py-1">Instance Variable</th>
              <th className="border px-2 py-1">Local Variable</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1">Where declared</td>
              <td className="border px-2 py-1">Inside class, outside methods</td>
              <td className="border px-2 py-1">Inside method or block</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Scope</td>
              <td className="border px-2 py-1">Whole class</td>
              <td className="border px-2 py-1">Only within method/block</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Lifetime</td>
              <td className="border px-2 py-1">As long as object exists</td>
              <td className="border px-2 py-1">Only while method is running</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Accessed by</td>
              <td className="border px-2 py-1">Any method in class</td>
              <td className="border px-2 py-1">Only inside the method</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Default value</td>
              <td className="border px-2 py-1">Automatically assigned (e.g. 0, null)</td>
              <td className="border px-2 py-1">Must be manually initialized</td>
            </tr>
          </tbody>
        </table>
        <h2>A Full Example</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-md my-2">
{`public class Student {
    String name; // instance variable
    int grade;   // instance variable

    public void updateGrade(int newScore) {
        int extraCredit = 5; // local variable
        grade = newScore + extraCredit;
    }
}`}
          </SyntaxHighlighter>
        </div>
        <p><code>name</code> and <code>grade</code> are instance variables shared across methods.<br />
        <code>extraCredit</code> is a temporary helper variable that disappears after <code>updateGrade</code> finishes.</p>
        <br />
        <h2>Common Mistakes</h2>
        <ul className="list-disc ml-6">
          <li>Using local variables outside their method → <b>Won't compile</b></li>
          <li>Forgetting to initialize a local variable → <b>Compiler error</b></li>
          <li>Assuming all variables in a class are instance variables → <b>Only those declared directly inside the class (not in methods)</b></li>
        </ul>
        <br />
        <h2>Try It Yourself!</h2>
        <p><b>Activity:</b> Write a Java class called <code>Dog</code> with two instance variables (<code>name</code> and <code>age</code>) and a method <code>bark()</code>. Then, in the <code>main</code> method, create a <code>Dog</code> object, set its name and age, and call <code>bark()</code>. Add a local variable inside <code>bark()</code> to count how many times the dog has barked.</p>
        <div className="h-[600px] mt-4">
          <VarsEditor />
        </div>
        <br />
        <h2>Recap</h2>
        <ul className="list-disc ml-6">
          <li>Use instance variables to store long-term data for an object</li>
          <li>Use local variables for temporary work inside a method</li>
          <li>Instance variables define what an object is; local variables help with what the object does</li>
        </ul>
        <br />
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
