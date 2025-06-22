import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Editor from "./Editor";

export const metadata = {
  title: "Objects & Classes Practice | EasyFTC",
};

export default function OCPractice() {
  // This lesson has 32 points
  const lessonPoints = 32;

  const carClassCode = `public class Car {
  String make;
  String model;
  int year;

  // Full constructor
  public Car(String make, String model, int year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  // Constructor with default year
  public Car(String make, String model) {
    this.make = make;
    this.model = model;
    this.year = 2024;
  }

  // Default constructor
  public Car() {
    // leave fields uninitialized
  }

  public void printDetails() {
    System.out.println(year + " " + make + " " + model);
  }
}`;

  const mainClassCode = `public class Main {
  public static void main(String[] args) {
    Car car1 = new Car("Toyota", "Camry", 2020);
    Car car2 = new Car("Tesla", "Model 3");
    Car car3 = new Car();
    car3.make = "Honda";
    car3.model = "Accord";
    car3.year = 2015;

    car1.printDetails();
    car2.printDetails();
    car3.printDetails();
  }
}`;

  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Objects & Classes Practice</h1>
        <br />
        <p><strong>Instructions:</strong></p>
  <ol>
    <li>
      Define a class called <code>Car</code>.
      <ul>
        <li>It should have three fields: <code>make</code> (String), <code>model</code> (String), and <code>year</code> (int).</li>
      </ul>
    </li>
    <li>
      Add two constructors to the <code>Car</code> class:
      <ul>
        <li>One constructor should take all three parameters: <code>make</code>, <code>model</code>, and <code>year</code>.</li>
        <li>The second constructor should take only <code>make</code> and <code>model</code>, and set <code>year</code> to 2024 by default.</li>
      </ul>
    </li>
    <li>
      Add a method to the <code>Car</code> class called <code>printDetails()</code>.
      <ul>
        <li>This method should print a description of the car in this format: <code>"2020 Toyota Camry"</code></li>
      </ul>
    </li>
    <li>
      In the <code>main</code> method:
      <ul>
        <li>Create one <code>Car</code> using the full constructor.</li>
        <li>Create another <code>Car</code> using the second constructor.</li>
        <li>Create a third <code>Car</code> using the default constructor (no arguments) and set its fields manually.</li>
      </ul>
    </li>
    <li>
      Call <code>printDetails()</code> on each car object to print the information.
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
              <div className="mb-2 font-semibold">Car.java</div>
              <SyntaxHighlighter language="java" style={vscDarkPlus} customStyle={{ borderRadius: '8px', fontSize: '1rem' }}>
                {carClassCode}
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
