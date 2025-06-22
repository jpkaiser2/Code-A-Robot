import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const metadata = {
  title: "Objects & Classes | EasyFTC",
};

export default function Objects() {
  // This lesson has 31 points
  const lessonPoints = 31;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Objects & Classes</h1>

        <p>
          <strong>What Are Objects and Classes?</strong><br/>
          Java is a language built on object-oriented programming (OOP), which means its core idea is about working with objects—real or imaginary things that have data and behaviors. This might sound abstract, but it's actually very intuitive when you think about the world around you.
        </p>
        <p>
          Imagine you're designing a video game, a shopping website, or a robot simulator. All of these systems involve things that do things. In Java, we use <strong>classes</strong> to describe what those things are and <strong>objects</strong> to actually use them.
        </p>
        <ul className="my-4">
          <li><strong>Class:</strong> A blueprint or definition. It describes what an object knows (its data) and what it can do (its behavior).</li>
          <li><strong>Object:</strong> A specific instance created from that class. It stores actual values and can perform actions defined in the class.</li>
        </ul>

        <h2>The Big Idea: Modeling the Real World</h2>
        <p>
          Object-oriented programming makes your code more like the real world. Instead of thinking in steps and calculations, you think in terms of things that act and interact.
        </p>
        <p>For example:</p>
        <ul className="my-4">
          <li>In a game, you might have <code>Player</code>, <code>Enemy</code>, and <code>Item</code> classes.</li>
          <li>In a robot simulator, you might define <code>Robot</code>, <code>Arm</code>, and <code>Motor</code> classes.</li>
          <li>In a library system, you might define <code>Book</code>, <code>Author</code>, and <code>Library</code> classes.</li>
        </ul>
        <p>Each class groups together:</p>
        <ul className="my-4">
          <li><strong>Fields</strong> (also called instance variables) to store information.</li>
          <li><strong>Methods</strong> (also called behaviors or actions) to do something.</li>
        </ul>

        <h2>Defining and Understanding a Class</h2>
        <p>Let's look at a very basic class:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class Dog {
    String name;  // instance variable
    int age;      // instance variable

    public void bark() {
        System.out.println(name + " says: Woof!");
    }
}`}
          </SyntaxHighlighter>
        </div>

        <h3>Anatomy of a Class</h3>
        <ul className="my-4">
          <li><strong>Fields (Instance Variables):</strong> These are variables that belong to each object created from the class. They are declared inside the class but outside any method.<br/>Example: <code>String name;</code> and <code>int age;</code><br/>Each Dog you create will have its own name and age.</li>
          <li><strong>Methods:</strong> These are the actions that objects can do. They often use or change the object's fields.<br/>Example: <code>bark()</code> uses the name to say something.</li>
        </ul>
        <h4>Scope and Lifetime:</h4>
        <ul className="my-4">
          <li>Instance variables (fields) live as long as the object exists and can be accessed by any method in the class.</li>
          <li>Local variables live only inside the method or constructor where they are created. They're temporary and disappear when the method ends.</li>
        </ul>
        <p>Here's a method with a local variable that shares a name with an instance variable:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public void setName(String name) {
    this.name = name;  // 'this.name' refers to the instance variable
}`}
          </SyntaxHighlighter>
        </div>
        <p>Without <code>this</code>, Java would think you're assigning the parameter name to itself. This brings us to an important keyword...</p>

        <h2>The <code>this</code> Keyword</h2>
        <p>Use <code>this</code> to refer to the current object's instance variables. It's especially useful when parameter names match the field names:</p>
        <p><strong>In Dog.java:</strong></p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class Dog {
    String name;
    int age;

    public Dog(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void bark() {
        System.out.println(name + " says: Woof!");
    }
}`}
          </SyntaxHighlighter>
        </div>
        <p><strong>In Main.java:</strong></p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class Main {
    public static void main(String[] args) {
        Dog myDog = new Dog("Fluffy", 3);
        myDog.bark(); // Output: Fluffy says: Woof!
    }
}`}
          </SyntaxHighlighter>
        </div>
        <p>If your parameter names are different from your field names, then you don't need to use <code>this</code>:</p>
        <p><strong>In Cat.java:</strong></p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class Cat {
    String name;
    int lives;

    public Cat(String catName, int numberOfLives) {
        name = catName;
        lives = numberOfLives;
    }

    public void meow() {
        System.out.println(name + " says: Meow!");
    }
}`}
          </SyntaxHighlighter>
        </div>
        <p><strong>In Main.java:</strong></p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class Main {
    public static void main(String[] args) {
        Cat myCat = new Cat("Boots", 9);
        myCat.meow(); // Output: Boots says: Meow!
    }
}`}
          </SyntaxHighlighter>
        </div>

        <h2>Creating Objects</h2>
        <p>You create an object using the <code>new</code> keyword. This calls the class's constructor (a special method that sets up the object).</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class Main {
    public static void main(String[] args) {
        Dog myDog = new Dog();
        Dog anotherDog = new Dog();
    }
}`}
          </SyntaxHighlighter>
        </div>
        <p>Each time you use <code>new</code>, a new object is created in memory, with its own copy of the fields.</p>

        <h2>What Is <code>null</code>?</h2>
        <p>In Java, variables that are supposed to refer to objects actually store a reference—a way of pointing to where the object lives in memory. If a variable doesn't point to any object, it holds the value <code>null</code>.</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`Dog myDog = null; // This variable doesn't refer to any object yet`}
          </SyntaxHighlighter>
        </div>
        <p>Trying to use a null object like this:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`myDog.bark();`}
          </SyntaxHighlighter>
        </div>
        <p>will cause a <strong>NullPointerException</strong>—Java is telling you, "You can't call a method on nothing."<br/>You must first assign a real object:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`myDog = new Dog();`}
          </SyntaxHighlighter>
        </div>
        <p>Until you assign it, it's <code>null</code> by default.</p>

        <h2>Calling Methods on Objects</h2>
        <p>Once you have an object, you can access its fields and call its methods using dot notation:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`Dog myDog = new Dog();
myDog.name = "Rover";
myDog.age = 3;
myDog.bark(); // Output: Rover says: Woof!

System.out.println(myDog.name); // Output: Rover
myDog.age = 4;`}
          </SyntaxHighlighter>
        </div>
        <p>Each object has its own data. This means one dog can be 3 years old, and another can be 7. They behave independently.</p>

        <h2>Constructor Methods</h2>
        <p>A constructor is a special method that runs when an object is created. You use it to set the initial values of fields:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class Dog {
    String name;
    int age;

    public Dog(String dogName, int dogAge) {
        this.name = dogName;
        this.age = dogAge;
    }
}`}
          </SyntaxHighlighter>
        </div>
        <p>Now you can write:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`Dog myDog = new Dog("Rover", 3);`}
          </SyntaxHighlighter>
        </div>
        <p>This sets the dog's name and age right away.</p>

        <h2>Overloading Constructors</h2>
        <p>You can write more than one constructor with different parameters:</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class Dog {
    String name;
    int age;

    public Dog(String dogName, int dogAge) {
        this.name = dogName;
        this.age = dogAge;
    }
    public Dog(String name) {
        this.name = name;
        this.age = 0; // default value
    }
}`}
          </SyntaxHighlighter>
        </div>
        <p>This gives you flexibility when creating objects.</p>

        <h2>Objects Interacting With Each Other</h2>
        <p>You can also pass objects into methods, store them inside other objects, or return them from methods.</p>
        <div className="bg-muted p-4 rounded-md overflow-x-auto">
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`public class Owner {
    String name;

    public void callDog(Dog d) {
        System.out.println(name + " calls " + d.name);
        d.bark();
    }
}`}
          </SyntaxHighlighter>
        </div>
        <p>This is where programs start becoming powerful; different objects working together.</p>

        <h2>The Bigger Picture</h2>
        <p>Java isn't just about writing lines of code. It is about building systems of objects that interact with each other. Once you understand classes and objects, you're ready for the deeper ideas in OOP:</p>
        <ul className="my-4">
          <li><strong>Encapsulation:</strong> Keeping fields private and exposing only what's necessary</li>
          <li><strong>Inheritance:</strong> Creating new classes from existing ones</li>
          <li><strong>Polymorphism:</strong> Writing code that works with many types of objects</li>
        </ul>
        <p>Understanding objects and classes gives you a strong foundation to build anything.</p>

        <br />
        <h2>Recap</h2>
        <ul className="my-4">
          <li>A class defines the structure and behavior of something.</li>
          <li>An object is a real instance of a class.</li>
          <li>Fields store object-specific data.</li>
          <li>Methods define actions that objects can take.</li>
          <li>Use <code>new</code> to create objects.</li>
          <li>Use dot notation to call methods and access fields.</li>
          <li>Use <code>this</code> to refer to the current object.</li>
          <li><code>null</code> means the variable doesn't point to any object.</li>
        </ul>
        <br />
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
