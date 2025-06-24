import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ConstructorsEditor from "./ConstructorsEditor";

export const metadata = {
  title: "Constructors | EasyFTC",
};

export default function Constructors() {
  // This lesson has 33 points
  const lessonPoints = 33;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Constructors</h1>

        <br />
        <h2>What Is a Constructor?</h2>
        <p>
          A constructor is a special method that runs when you create a new object. Its job is to set up the object: give it initial values and prepare it for use.
        </p>

        <p>Constructors:</p>
        <ul className="my-4">
          <li>Have the same name as the class</li>
          <li>Do not have a return type (not even void)</li>
          <li>Are called automatically when you create a new object using new</li>
        </ul>

        <br />
        <h2>Example</h2>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class Dog {
    String name;
    int age;

    // This is a constructor
    public Dog(String dogName, int dogAge) {
        name = dogName;
        age = dogAge;
    }
}`}
          </SyntaxHighlighter>
        </div>

        <p>
          When you write:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`Dog myDog = new Dog("Oliver", 4);`}
          </SyntaxHighlighter>
        </div>

        <p>The constructor runs and sets the name and age of myDog.</p>

        <br />
        <h2>Why Use Constructors?</h2>
        <ul className="my-4">
          <li>Constructors make it easy to create objects with specific data right from the start.</li>
          <li>Without a constructor, you'd have to set each value manually after creating the object.</li>
          <li>Constructors ensure that objects start in a usable state.</li>
        </ul>

        <p>Without constructor:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`Dog d = new Dog();
d.name = "Buddy";
d.age = 3;`}
          </SyntaxHighlighter>
        </div>

        <p>With constructor:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`Dog d = new Dog("Buddy", 3);`}
          </SyntaxHighlighter>
        </div>

        <br />
        <h2>Default Constructor</h2>
        <p>
          If you don't write any constructor, Java automatically gives your class a default constructor:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public Dog() {
    // does nothing
}`}
          </SyntaxHighlighter>
        </div>

        <p>But once you write any constructor, the default constructor goes away unless you write it yourself.</p>

        <br />
        <h2>Multiple Constructors (Overloading)</h2>
        <p>You can have more than one constructor, as long as the parameter lists are different.</p>

        <p>Example:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class Dog {
    String name;
    int age;

    public Dog(String dogName, int dogAge) {
        name = dogName;
        age = dogAge;
    }

    // Another constructor
    public Dog(String dogName) {
        name = dogName;
        age = 0; // default age
    }
}`}
          </SyntaxHighlighter>
        </div>

        <p>This allows users to create dogs with just a name, or with both name and age.</p>

        <br />
        <h2>Using this</h2>
        <p>
          Sometimes you'll see this in a constructor. It refers to the current object. It's useful when parameter names are the same as instance variable names.
        </p>

        <p>Example:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class Dog {
    String name;
    int age;

    public Dog(String name, int age) {
        this.name = name;
        this.age = age;
    }
}`}
          </SyntaxHighlighter>
        </div>

        <p>If the parameter was named dogName, we wouldn't need this.</p>

        <br />
        <h2>Try It Yourself!</h2>
        <p>Complete the Student class by adding constructors and create students using different constructor overloads.</p>
        
        <div className="h-[600px] mt-4">
          <ConstructorsEditor />
        </div>
        <br />
        
        <h2>Recap</h2>
        <ul className="my-4">
          <li>Constructors run when you create an object.</li>
          <li>They initialize the object.</li>
          <li>They have the same name as the class and no return type.</li>
          <li>You can have multiple constructors with different parameters.</li>
          <li>If you write one constructor, Java won't provide the default one.</li>
          <li>Use this to clarify between instance variables and parameters.</li>
        </ul>

        <br />
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
