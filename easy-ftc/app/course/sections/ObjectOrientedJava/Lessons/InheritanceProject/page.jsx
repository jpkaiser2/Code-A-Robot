import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Editor from "./Editor";

export const metadata = {
  title: "Inheritance Project | EasyFTC",
};

export default function InheritanceProject() {
  // This lesson has 40 points
  const lessonPoints = 40;

  const animalClassCode = `public class Animal {
    String name;
    int age;

    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void makeSound() {
        System.out.println("Some generic animal sound");
    }

    public void getInfo() {
        System.out.println("Name: " + name + " | Age: " + age);
    }
}`;

  const lionClassCode = `public class Lion extends Animal {
    public Lion(String name, int age) {
        super(name, age);
    }

    @Override
    public void makeSound() {
        System.out.println("Roar!");
    }
}`;

  const elephantClassCode = `public class Elephant extends Animal {
    public Elephant(String name, int age) {
        super(name, age);
    }

    @Override
    public void makeSound() {
        System.out.println("Trumpet!");
    }
}`;

  const monkeyClassCode = `public class Monkey extends Animal {
    public Monkey(String name, int age) {
        super(name, age);
    }

    @Override
    public void makeSound() {
        System.out.println("Ooh ooh aah aah!");
    }
}`;

  const mainClassCode = `public class Main {
    public static void main(String[] args) {
        Lion leo = new Lion("Leo", 5);
        Elephant ella = new Elephant("Ella", 8);
        Monkey george = new Monkey("George", 3);

        leo.getInfo();
        leo.makeSound();

        ella.getInfo();
        ella.makeSound();

        george.getInfo();
        george.makeSound();
    }
}`;

  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Inheritance Project</h1>
        <br />
        <p><strong>Goal:</strong></p>
        <p>Use inheritance to create a Zoo system with a base Animal class and multiple subclasses like Lion, Elephant, and Monkey. Each animal will have its own behavior and you'll print out their details in the main method one by one.</p>
        <br />
        <p><strong>What You'll Practice:</strong></p>
        <ul>
          <li>Inheritance (extends)</li>
          <li>Constructors and super()</li>
          <li>Method overriding</li>
        </ul>
        <br />
        <p><strong>Your Task:</strong></p>
        <ol>
          <li>
            Finish the Animal class with a constructor, makeSound(), and getInfo() methods.
          </li>
          <li>
            Make 3 subclasses (Lion, Elephant, Monkey) that each:
            <ul>
              <li>Call the parent constructor using super(...)</li>
              <li>Override the makeSound() method</li>
            </ul>
          </li>
          <li>
            In the Main class main method:
            <ul>
              <li>Create one Lion, one Elephant, and one Monkey</li>
              <li>Call getInfo() and makeSound() on each one</li>
            </ul>
          </li>
        </ol>
        
        <div className="h-[600px] mt-4">
          <Editor />
        </div>
        <br />
        
        <div className="mt-10 flex flex-col items-center gap-4">
          <details>
            <summary className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mb-4">Show Sample Solution</summary>
            <div className="mt-2 w-full max-w-lg">
              <div className="mb-2 font-semibold">Animal.java</div>
              <SyntaxHighlighter language="java" style={vscDarkPlus} customStyle={{ borderRadius: '8px', fontSize: '1rem' }}>
                {animalClassCode}
              </SyntaxHighlighter>
              <div className="mb-2 mt-6 font-semibold">Lion.java</div>
              <SyntaxHighlighter language="java" style={vscDarkPlus} customStyle={{ borderRadius: '8px', fontSize: '1rem' }}>
                {lionClassCode}
              </SyntaxHighlighter>
              <div className="mb-2 mt-6 font-semibold">Elephant.java</div>
              <SyntaxHighlighter language="java" style={vscDarkPlus} customStyle={{ borderRadius: '8px', fontSize: '1rem' }}>
                {elephantClassCode}
              </SyntaxHighlighter>
              <div className="mb-2 mt-6 font-semibold">Monkey.java</div>
              <SyntaxHighlighter language="java" style={vscDarkPlus} customStyle={{ borderRadius: '8px', fontSize: '1rem' }}>
                {monkeyClassCode}
              </SyntaxHighlighter>
              <div className="mb-2 mt-6 font-semibold">Main.java</div>
              <SyntaxHighlighter language="java" style={vscDarkPlus} customStyle={{ borderRadius: '8px', fontSize: '1rem' }}>
                {mainClassCode}
              </SyntaxHighlighter>
            </div>
          </details>
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
}
