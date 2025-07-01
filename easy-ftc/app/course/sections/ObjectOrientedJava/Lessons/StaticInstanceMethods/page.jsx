import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import StaticInstanceMethodsEditor from "./StaticInstanceMethodsEditor";

export const metadata = {
  title: "Static Methods vs. Instance Methods | EasyFTC",
};

export default function StaticInstanceMethods() {
  // This lesson has 36 points
  const lessonPoints = 36;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Static Methods vs. Instance Methods</h1>

        <br />
        <h2>What is a Method Again?</h2>
        <p>
          A method is a block of code that performs a specific task. You can call (or invoke) methods to do things like print text, perform calculations, or control a robot.
        </p>
        <p>Example:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public void sayHello() {
    System.out.println("Hello!");
}`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Static Methods</h2>
        <p>
          A static method belongs to the class, not to any specific object created from the class. You don't need to create an object to use it.
        </p>
        <p>You define a static method using the keyword <b>static</b>:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class MathHelper {
    public static int square(int x) {
        return x * x;
    }
}`}
          </SyntaxHighlighter>
        </div>
        <p>You call a static method using the class name:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`int result = MathHelper.square(5); // returns 25`}
          </SyntaxHighlighter>
        </div>
        <p>Key Traits of Static Methods:</p>
        <ul className="my-4">
          <li>Belong to the class</li>
          <li>Called using the class name</li>
          <li>Cannot access instance variables or instance methods directly</li>
          <li>Often used for utility/helper methods</li>
        </ul>

        <br />
        <h2>Instance Methods</h2>
        <p>
          An instance method belongs to an object created from the class. You must create an object before calling it.
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class Dog {
    String name;

    public Dog(String dogName) {
        name = dogName;
    }

    public void bark() {
        System.out.println(name + " says woof!");
    }
}`}
          </SyntaxHighlighter>
        </div>
        <p>To call an instance method:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`Dog myDog = new Dog("Rex");
myDog.bark(); // Output: Rex says woof!`}
          </SyntaxHighlighter>
        </div>
        <p>Key Traits of Instance Methods:</p>
        <ul className="my-4">
          <li>Belong to an object</li>
          <li>Can access instance variables and other instance methods</li>
          <li>Require an object to be called</li>
        </ul>

        <br />
        <h2>When to Use Each</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <b>Use Static Method</b>
            <ul className="my-2">
              <li>When the method doesn't rely on instance variables</li>
              <li>For general-purpose tools or utilities</li>
              <li>When you don't want or need to create an object</li>
            </ul>
          </div>
          <div>
            <b>Use Instance Method</b>
            <ul className="my-2">
              <li>When the method uses instance data</li>
              <li>For behavior tied to an object's state</li>
              <li>When behavior is unique to each object</li>
            </ul>
          </div>
        </div>

        <br />
        <h2>Example Comparison</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class Calculator {
    // static method
    public static int add(int a, int b) {
        return a + b;
    }

    // instance method
    public int multiply(int a, int b) {
        return a * b;
    }
}

public class Main {
    public static void main(String[] args) {
        int sum = Calculator.add(2, 3); // static method

        Calculator calc = new Calculator();
        int product = calc.multiply(4, 5); // instance method
    }
}`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Try It Yourself!</h2>
        <p>
          Write a static method in <b>MathHelper</b> and an instance method in <b>Dog</b>. In <b>Main</b>, call both methods to produce the expected output.
        </p>
        <div className="h-[600px] mt-4">
          <StaticInstanceMethodsEditor />
        </div>
        <br />

        <br />
        <h2>Recap</h2>
        <ul className="my-4">
          <li>Static methods belong to the class and don't require an object to be used.</li>
          <li>Instance methods belong to individual objects and can access their instance variables.</li>
          <li>Choose based on whether your method needs access to instance data.</li>
        </ul>

        <br />
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
