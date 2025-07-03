import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CodeEditor from "@/components/CodeEditor";
import GettersSettersEditor from "./GettersSettersEditor";

export const metadata = {
  title: "Getters & Setters | EasyFTC",
};

export default function GettersSetters() {
  // This lesson has 37 points
  const lessonPoints = 37;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Getters & Setters</h1>

        <br />
        <h2>What are Getters & Setters?</h2>
        <p>
          As your classes become more advanced, you may want to control how the instance variables of a class are accessed or changed. This is where <b>getters</b> and <b>setters</b> come in. They are special methods that let you get or set the value of private variables from outside the class.
        </p>
        <br />
        <h2>Why Use Getters and Setters?</h2>
        <p>
          In Java, it's a common practice to make your instance variables <b>private</b>. This means other classes can't directly access or modify them. Instead, you provide public methods to safely read and change these values.
        </p>
        <ul className="my-4">
          <li>Protect your data from being changed in invalid ways</li>
          <li>Make your code easier to maintain and debug</li>
          <li>Add logic when getting or setting values (like validation)</li>
        </ul>
        <br />
        <h2>Example Without Getters or Setters</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class Robot {
    public int speed; // Public, not safe
}

public class Main {
    public static void main(String[] args) {
        Robot r = new Robot();
        r.speed = -10; // Uh-oh! Negative speed might not be valid
    }
}`}
          </SyntaxHighlighter>
        </div>
        <br />
        <h2>Using Getters and Setters</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class Robot {
    private int speed;

    // Getter method
    public int getSpeed() {
        return speed;
    }

    // Setter method
    public void setSpeed(int newSpeed) {
        if (newSpeed >= 0) {
            speed = newSpeed;
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Robot r = new Robot();
        r.setSpeed(10); // Safe
        System.out.println(r.getSpeed()); // Prints: 10
    }
}`}
          </SyntaxHighlighter>
        </div>
        <br />
        <h2>Naming Convention</h2>
        <ul className="my-4">
          <li>A getter is named <code>getVariableName()</code></li>
          <li>A setter is named <code>setVariableName()</code></li>
          <li>If the variable is a boolean, the getter can be called <code>isVariableName()</code></li>
        </ul>
        <br />
        <h2>When to Use Them</h2>
        <ul className="my-4">
          <li>Encapsulate your fields (hide internal details)</li>
          <li>Validate changes to your data</li>
          <li>Allow read-only access (just create a getter)</li>
          <li>Prevent changes (don't create a setter)</li>
        </ul>
        <br />
        <h2>Try It Yourself!</h2>
        <p>
          Write a <b>getter</b> and <b>setter</b> for a private variable <code>name</code> in a <code>Person</code> class. In <code>Main</code>, create a <code>Person</code> object, set the name to your own, and print it out using the getter.
        </p>
        <div className="h-[600px] mt-4">
          <GettersSettersEditor />
        </div>
        <br />
        <h2>Recap</h2>
        <ul className="my-4">
          <li>Instance variables should be <b>private</b></li>
          <li>Use getters to return their values</li>
          <li>Use setters to change their values safely</li>
          <li>This is called <b>encapsulation</b>, a key part of object-oriented programming</li>
        </ul>

        <br />
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
