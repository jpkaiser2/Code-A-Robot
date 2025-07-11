import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Quiz from "@/components/quiz";

export const metadata = {
  title: "Arrays & ArrayLists Quiz | EasyFTC",
};

const questions = [
  {
    question: "Which of the following correctly declares an array of integers?",
    options: [
      "int array = new int[5];",
      "int[] array = new int[5];",
      "int array[] = int[5];",
      "int array[] = new int();"
    ],
    answer: "int[] array = new int[5];"
  },
  {
    question: "What is the default value of elements in an integer array in Java?",
    options: ["null", "0", "undefined", "Not initialized"],
    answer: "0"
  },
  {
    question: "What will be the output of the following code?\n```java\nint[] nums = {3, 5, 7};\nSystem.out.println(nums[1]);\n```",
    options: ["3", "5", "7", "1"],
    answer: "5"
  },
  {
    question: "Which of the following will create an empty ArrayList of Strings?",
    options: [
      "ArrayList<String> list = new ArrayList<>();",
      "ArrayList list = new ArrayList<String>();",
      "ArrayList<String> list = new ArrayList<String>();",
      "All of the above"
    ],
    answer: "All of the above"
  },
  {
    question: "Which method adds an element to the end of an ArrayList?",
    options: ["add()", "insert()", "append()", "push()"],
    answer: "add()"
  },
  {
    question: "What is the output of the following code?\n```java\nString[] words = {\"a\", \"b\", \"c\"};\nSystem.out.println(words.length);\n```",
    options: ["2", "3", "4", "It causes an error"],
    answer: "3"
  },
  {
    question: "What method is used to find the size of an ArrayList?",
    options: ["length", "size()", "length()", "count()"],
    answer: "size()"
  },
  {
    question: "What will happen if you try to access index 10 in an array of length 5?",
    options: [
      "Returns null",
      "Compiles but prints 0",
      "ArrayIndexOutOfBoundsException",
      "Nothing happens"
    ],
    answer: "ArrayIndexOutOfBoundsException"
  },
  {
    question: "Which of the following statements is true?",
    options: [
      "Arrays can grow in size",
      "ArrayLists store only primitive types",
      "Arrays and ArrayLists both use .size()",
      "ArrayLists can only store objects"
    ],
    answer: "ArrayLists can only store objects"
  },
  {
    question: "How would you replace the second element of an ArrayList named `list` with \"hi\"?",
    options: [
      "list.set(1, \"hi\");",
      "list[1] = \"hi\";",
      "list.add(1, \"hi\");",
      "list.replace(1, \"hi\");"
    ],
    answer: "list.set(1, \"hi\");"
  },
  {
    question: "Which loop is best for reading all values of an array when you don’t need the index?",
    options: [
      "for loop",
      "enhanced for loop",
      "while loop",
      "do-while loop"
    ],
    answer: "enhanced for loop"
  },
  {
    question: "What is the output of this code?\n```java\nArrayList<String> list = new ArrayList<>();\nlist.add(\"a\");\nlist.add(\"b\");\nSystem.out.println(list.get(1));\n```",
    options: ["a", "b", "1", "null"],
    answer: "b"
  },
  {
    question: "What type of values can an `int[]` array store?",
    options: ["Any type", "Only integers", "Objects", "Strings"],
    answer: "Only integers"
  },
  {
    question: "Which line will remove the value at index 0 in an ArrayList named `data`?",
    options: [
      "data.remove(0);",
      "data.delete(0);",
      "data.pop(0);",
      "data.erase(0);"
    ],
    answer: "data.remove(0);"
  },
  {
    question: "What keyword is used to create a new array?",
    options: ["new", "array", "ArrayList", "create"],
    answer: "new"
  },
  {
    question: "What is printed?\n```java\nint[] arr = {10, 20, 30};\nfor (int x : arr) {\n  System.out.print(x + \" \");\n}\n```",
    options: ["10 20 30 ", "0 1 2 ", "30 20 10 ", "Compilation error"],
    answer: "10 20 30 "
  },
  {
    question: "Which of the following is not a valid array declaration?",
    options: [
      "int[] nums = new int[5];",
      "String names[] = {\"Alice\", \"Bob\"};",
      "double values = new double[10];",
      "boolean[] flags = new boolean[2];"
    ],
    answer: "double values = new double[10];"
  },
  {
    question: "Why can't ArrayLists hold primitive types directly?",
    options: [
      "Because they are too large",
      "Because ArrayList only stores references to objects",
      "Because Java doesn’t support it",
      "They can, if imported properly"
    ],
    answer: "Because ArrayList only stores references to objects"
  },
  {
    question: "How can you iterate over an ArrayList named `scores`?",
    options: [
      "for (int i = 0; i < scores.size(); i++)",
      "for (int score : scores)",
      "forEach(score in scores)",
      "Both A and B"
    ],
    answer: "Both A and B"
  },
  {
    question: "How would you check if an ArrayList `list` contains the value \"hello\"?",
    options: [
      "list.has(\"hello\")",
      "list.contains(\"hello\")",
      "list.include(\"hello\")",
      "list.exists(\"hello\")"
    ],
    answer: "list.contains(\"hello\")"
  }
];






export default function ArrayQuiz() {
  // This lesson has 50 points
  const lessonPoints = 50;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
      <Quiz title="Arrays & ArrayLists Quiz" questions={questions} />
        <br/>
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
          </div>
          </div>
          </LessonLayout>
  );
} 