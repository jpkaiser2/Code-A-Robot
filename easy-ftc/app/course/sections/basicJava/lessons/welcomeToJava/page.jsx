import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";

export const metadata = {
  title: "Welcome to Java | EasyFTC",
  description: "Introduction to Java programming for FIRST Tech Challenge robotics"
};

export default function WelcomeToJavaLesson() {
  // This lesson has 0 points (first lesson)
  const lessonPoints = 0;
  
  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Welcome to Java</h1>
        
        <p>
          Java is the foundation of programming in the FIRST Tech Challenge. It powers robots 
          to manage sensors, coordinate movement, and turn ideas into action on the field. Java 
          is also one of the most widely used programming languages in the world. It supports 
          everything from small applications to large-scale infrastructure, making it a valuable 
          skill that extends far beyond robotics.
        </p>
        
        <br />
        <p>
          Learning Java through FTC gives you experience with a professional, industry-standard 
          language. Java is known for its clarity, portability, and structured approach to programming. 
          These qualities are especially valuable in robotics, where reliability and precision 
          are essential for successful competition performance.
        </p>
        
        <br />
        <p>
          Java supports object-oriented programming, which connects naturally to robotics development. 
          FTC robots consist of distinct physical components like motors, sensors, and servos that 
          work together as one system. Object-oriented programming lets you structure your code 
          in organized and reusable ways that mirror how the robot is built.
        </p>
        
        <br />
        <p>
          This course teaches you Java's essential concepts while applying them directly to 
          FTC robotics programming. You'll learn to build functional robot code and develop 
          important skills in problem-solving, software design, and logical thinking. These skills 
          will serve you throughout your educational and professional journey.
        </p>
        
        <br />
        <p>Let's get started!</p>
        
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
} 