import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CodeEditor from "@/components/CodeEditor";


export const metadata = {
  title: "Inheritance | EasyFTC",
};

export default function Inheritance() {
  // This lesson has 39 points
  const lessonPoints = 39;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Inheritance</h1>

        <br />
        <h2>Introduction to Inheritance</h2>
        <p>
          Inheritance is one of the core principles of object-oriented programming (OOP). It allows one class (called a subclass or child class) to inherit the fields and methods of another class (called a superclass or parent class).
        </p>
        <br />
        <h2>Why Use Inheritance?</h2>
        <ul className="my-4">
          <li><b>Code Reusability:</b> Avoid duplicating code by writing it once in the superclass.</li>
          <li><b>Organization:</b> Group related classes in a logical hierarchy.</li>
          <li><b>Extensibility:</b> Easily add new features or modify behavior through subclasses.</li>
        </ul>
        <br />
        <h2>Understanding Inheritance</h2>
        <p>
          Think of inheritance like this:
        </p>
        <p>
          Imagine you're building different kinds of vehicles. Every vehicle has wheels and can move.
          Instead of writing code for wheels and movement again for every type (car, bike, truck), you write that code once in a "Vehicle" class.
          Then, all specific types of vehicles inherit those properties and behaviors, while adding their own special features.
        </p>
        <p>
          Or think of a recipe base: "pasta dish". All pasta dishes boil noodles and use a sauce. Specific dishes like "Spaghetti and Meatballs" or "Mac and Cheese" follow the base recipe, but add their own twists. This is inheritance!
        </p>
        <br />
        <h2>Creating a Superclass</h2>
        <p>
          A superclass contains the common attributes and methods you want to share.
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class Animal {
    public String name;

    public Animal(String name) {
        this.name = name;
    }

    public void makeSound() {
        System.out.println("Some generic animal sound");
    }
}`}
          </SyntaxHighlighter>
        </div>
        <p>
          This class defines an Animal with a name and a method to make a sound. Think of this like a template or blueprint for any animal.
        </p>
        <br />
        <h2>Creating a Subclass</h2>
        <p>
          A subclass uses the <code>extends</code> keyword to inherit from a superclass.
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class Dog extends Animal {

    public Dog(String name) {
        super(name); // Call the constructor of the superclass
    }

    // Override the method to provide specific behavior
    @Override
    public void makeSound() {
        System.out.println("Woof!");
    }

    public void fetch() {
        System.out.println(name + " is fetching a ball.");
    }
}`}
          </SyntaxHighlighter>
        </div>
        <ul className="my-4">
          <li><code>super(name)</code> calls the constructor in Animal to set the name.</li>
          <li><code>@Override</code> means we're changing how <code>makeSound()</code> works for dogs.</li>
          <li><code>fetch()</code> is a new behavior unique to dogs.</li>
        </ul>
        <br />
        <h2>Inheriting Fields and Methods</h2>
        <p>
          You can access inherited fields and methods as if they were declared in the subclass.
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`Dog dog = new Dog("Buddy");
dog.makeSound();    // Outputs: Woof!
dog.fetch();        // Outputs: Buddy is fetching a ball.
System.out.println(dog.name); // Outputs: Buddy. Note that we do not need a getter since the String "name" in the Animal class is public`}
          </SyntaxHighlighter>
        </div>
        <br />
        <h2>The super Keyword</h2>
        <p>
          The <code>super</code> keyword is used in two main ways:
        </p>
        <ul className="my-4">
          <li>To call the superclass constructor: <code>super(arguments)</code></li>
          <li>To access a superclass method that has been overridden:</li>
        </ul>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class Cat extends Animal {
    public Cat(String name) {
        super(name);
    }

    @Override
    public void makeSound() {
        super.makeSound(); // Call the original method
        System.out.println("Meow!");
    }
}`}
          </SyntaxHighlighter>
        </div>
        <p>
          You might use <code>super.makeSound()</code> if you want to keep the generic sound and add something specific.
        </p>
        <br />
        <h2>Protected Access Modifier</h2>
        <p>
          If a superclass field or method is marked <code>protected</code>, it can be accessed directly by subclasses.
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class Animal {
    protected String name;
    //...
}`}
          </SyntaxHighlighter>
        </div>
        <p>
          This makes it easier to share fields while still hiding them from unrelated classes.
        </p>
        <br />
        <h2>Class Hierarchies</h2>
        <p>
          Java allows multilevel inheritance:
        </p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class Animal { }
public class Mammal extends Animal { }
public class Dog extends Mammal { }`}
          </SyntaxHighlighter>
        </div>
        <ul className="my-4">
          <li>Each level inherits all public and protected fields/methods above it.</li>
          <li>Java does not support multiple inheritance with classes (a class cannot extend more than one class).</li>
        </ul>
        <br />
        <h2>Recap</h2>
        <ul className="my-4">
          <li>Inheritance lets one class inherit fields and methods from another.</li>
          <li>Use <code>extends</code> to create a subclass.</li>
          <li>Use <code>super</code> to call superclass constructors or methods.</li>
          <li>Subclasses can override methods and add new ones.</li>
        </ul>
        <br />
        <h2>Key Terms</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Term</th>
                <th className="px-4 py-2">Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 font-mono">superclass</td>
                <td className="px-4 py-2">The parent class being inherited from</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">subclass</td>
                <td className="px-4 py-2">The child class that inherits from a superclass</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">extends</td>
                <td className="px-4 py-2">Keyword used to create a subclass</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">super</td>
                <td className="px-4 py-2">Keyword to refer to the superclass</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">override</td>
                <td className="px-4 py-2">Replace a method from the superclass</td>
              </tr>
            </tbody>
          </table>
        </div>

        <br />
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
