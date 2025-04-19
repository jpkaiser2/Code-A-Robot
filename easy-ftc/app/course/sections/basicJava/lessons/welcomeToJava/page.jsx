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
          Java is the foundation of programming in the FIRST Tech Challenge. It is the language 
          that drives the robot, manages sensors, coordinates movement, and brings complex ideas 
          to life on the field. But Java is more than just a tool for robotics—it is a language 
          used across industries to build software systems, applications, and large-scale infrastructure.
        </p>
        
        <br />
        <p>
          By learning Java through FTC, you're gaining experience with a language that is used in 
          professional environments around the world. Java is known for its clarity, portability, 
          and structure, making it an ideal language for building reliable code. These qualities are 
          especially important in robotics, where consistency and precision matter.
        </p>
        
        <br />
        <p>
          One of the core strengths of Java is its support for object-oriented programming (OOP). 
          In FTC, robots are built from distinct physical components—motors, sensors, servos, etc. 
          Object-oriented programming mirrors this physical structure in software. It allows you to 
          group related data and behavior into reusable components, leading to more organized and 
          scalable code.
        </p>
        
        <br />
        <p>
          As you progress through this course, you'll gain an understanding of key OOP principles 
          and see how they apply directly to the systems you build in FTC. These concepts aren't 
          specific to robotics; they form the backbone of modern software development across nearly 
          every domain.
        </p>
        
        <br />
        <p>
          The goal of this course is not just to help you program a working robot. It's to give you 
          a solid foundation in Java that you can carry beyond FTC to other engineering challenges, 
          to future internships, and to university-level coursework. The skills you develop 
          here—logical thinking, software design, problem-solving—are highly transferable and in demand.
        </p>
        
        <br />
        <p>
          Whether or not you pursue computer science long-term, understanding how software works at 
          this level will give you an edge. In FTC, it will help you write more efficient, adaptable 
          code. Beyond FTC, it will help you think more clearly about systems, technology, and the way 
          the digital world operates.
        </p>
        
        <br />
        <p>Let's begin!</p>
        
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
} 