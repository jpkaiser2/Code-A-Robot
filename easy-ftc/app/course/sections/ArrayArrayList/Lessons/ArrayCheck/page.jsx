import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Quiz from "@/components/quiz";

export const metadata = {
  title: "Arrays Check For Understanding | EasyFTC",
};

const questions = [
  {
    question: "What does the following code print?\n\n```java\nint[] arr = {2, 4, 6, 8};\nSystem.out.println(arr[arr.length - 1]);\n```",
    options: [
      "6",
      "8",
      "4",
      "It causes an error"
    ],
    answer: "8",
  },
  {
    question: "Which of the following correctly doubles every value in an array called `nums`?\n\nAssume: ```java\nint[] nums = {1, 2, 3, 4};\n```",
    options: [
      "```java\nfor (int i = 1; i < nums.length; i++) {\n    nums[i] = nums[i] * 2;\n}\n```",
      "```java\nfor (int num : nums) {\n    num = num * 2;\n}\n```",
      "```java\nfor (int i = 0; i < nums.length; i++) {\n    nums[i] = nums[i] * 2;\n}\n```",
      "```java\nfor (int i = 0; i <= nums.length; i++) {\n    nums[i] = nums[i] * 2;\n}\n```"
    ],
    answer: "```java\nfor (int i = 0; i < nums.length; i++) {\n    nums[i] = nums[i] * 2;\n}\n```",
  },
  {
    question: "What does this code print?\n\n```java\nint[] data = {3, 6, 9};\nSystem.out.println(data[3]);\n```",
    options: [
      "9",
      "0",
      "It prints nothing",
      "ArrayIndexOutOfBoundsException"
    ],
    answer: "ArrayIndexOutOfBoundsException",
  },
  {
    question: "What does this code print?\n\n```java\nint[] values = {5, 10, 15};\nfor (int i = 0; i < values.length; i++) {\n    values[i] += 5;\n}\nSystem.out.println(values[1]);\n```",
    options: [
      "10",
      "15",
      "20",
      "25"
    ],
    answer: "15",
  },
  {
    question: "Which loop correctly prints all elements of `nums` in reverse?\n\n```java\nint[] nums = {1, 2, 3, 4};\n```",
    options: [
      "```java\nfor (int i = nums.length; i >= 0; i--) {\n    System.out.print(nums[i] + \" \");\n}\n```",
      "```java\nfor (int i = nums.length - 1; i >= 0; i--) {\n    System.out.print(nums[i] + \" \");\n}\n```",
      "```java\nfor (int i = 0; i < nums.length; i++) {\n    System.out.print(nums[i] + \" \");\n}\n```",
      "```java\nfor (int i = 0; i <= nums.length; i++) {\n    System.out.print(nums[i] + \" \");\n}\n```"
    ],
    answer: "```java\nfor (int i = nums.length - 1; i >= 0; i--) {\n    System.out.print(nums[i] + \" \");\n}\n```",
  },
  {
    question: "What is the output?\n\n```java\nint[] a = new int[4];\na[0] = 1;\na[1] = a[0] + 1;\na[2] = a[1] + 1;\na[3] = a[2] + 1;\nSystem.out.println(a[3]);\n```",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    answer: "4",
  },
  {
    question: "Which of these for-each loops will correctly print each number in an array `nums`?\n\n```java\nint[] nums = {2, 4, 6, 8};\n```",
    options: [
      "```java\nfor (int i : nums) {\n    System.out.print(i + \" \");\n}\n```",
      "```java\nfor (int i = 0; i < nums.length; i++) {\n    System.out.print(nums + \" \");\n}\n```",
      "```java\nfor (int i = 0; i <= nums.length; i++) {\n    System.out.print(i + \" \");\n}\n```",
      "```java\nfor (int num = 0; num < nums.length; num++) {\n    System.out.print(num + \" \");\n}\n```"
    ],
    answer: "```java\nfor (int i : nums) {\n    System.out.print(i + \" \");\n}\n```",
  },
  {
    question: "Which line creates an array with 10 values, all set to 0 by default?",
    options: [
      "```java\nint[] arr = new int[10];\n```",
      "```java\nint arr = new int[10];\n```",
      "```java\nint arr[] = {10};\n```",
      "```java\nint[] arr = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};\n```"
    ],
    answer: "```java\nint[] arr = new int[10];\n```",
  },
  {
    question: "Which statement about arrays is TRUE?",
    options: [
      "Arrays can grow and shrink after they are created",
      "Arrays can hold values of multiple types",
      "Arrays are zero-indexed",
      "Arrays must be filled before you can use them"
    ],
    answer: "Arrays are zero-indexed",
  },
  {
    question: "What is the value of `sum` after this code runs?\n\n```java\nint[] nums = {2, 4, 6};\nint sum = 0;\nfor (int i = 0; i < nums.length; i++) {\n    sum += nums[i];\n}\n```",
    options: [
      "6",
      "12",
      "10",
      "2"
    ],
    answer: "12",
  }
];




export default function ArraysCheckForUnderstanding() {
  // This lesson has 44 points
  const lessonPoints = 44;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
      <Quiz title="Arrays Check for Understanding" questions={questions} />
        <br/>
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
          </div>
          </div>
          </LessonLayout>
  );
} 