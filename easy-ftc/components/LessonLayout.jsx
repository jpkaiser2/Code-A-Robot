import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Global manual section name mapping
const sectionNames = [
  { name: 'Basic*Java', slug: '/course/sections/basicJava/lessons/helloWorld' },
  { name: 'Object-Oriented*Java', slug: '/course/sections/ObjectOrientedJava/Lessons/ObjectsClasses' },
  { name: 'Methods', slug: '/course/sections/Methods/Lessons/IntroToMethods' },
  { name: 'Logic*&*Iteration', slug: '/course/sections/LogicIteration/lessons/BooleanExpressions' },
  { name: 'Arrays*&*ArrayLists', slug: '/course/sections/ArrayArrayList/Lessons/IntroToArrays' },
  { name: 'Getting*Ready*for*FTC*Programming', slug: '/course/sections/GettingReady/Lessons/Options' },
  { name: 'OpModes', slug: '/course/sections/BasicRobotProject/Lessons/FirstOpMode' },
  { name: 'Controlling*Robot*Mechanisms', slug: '/course/sections/ControlingMechanisms/Lessons/HardwareMapping' },
];

export default async function LessonLayout({ children, currentLessonPoints }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch user progress
  const { data: progress } = await supabase
    .from('progress')
    .select('points')
    .eq('user_id', user.id)
    .single();

  const userPoints = progress?.points || 0;

  // Get current lesson and its section
  const { data: currentLesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('unlock_at', currentLessonPoints)
    .single();

  if (!currentLesson) {
    return redirect("/dashboard");
  }

  const currentSection = currentLesson.slug.split('/')[3];

  // Get lessons for current section only
  const { data: sectionLessons } = await supabase
    .from('lessons')
    .select('*')
    .order('unlock_at', { ascending: true });

  // Filter lessons by current section
  const filteredLessons = sectionLessons?.filter(lesson => {
    const lessonSection = lesson.slug.split('/')[3];
    return lessonSection === currentSection;
  }) || [];

  // Find current lesson index
  const currentLessonIndex = filteredLessons.findIndex(
    lesson => lesson.unlock_at === currentLessonPoints
  );

  // Get previous and next lessons
  const prevLesson = currentLessonIndex > 0 ? filteredLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < filteredLessons.length - 1 ? filteredLessons[currentLessonIndex + 1] : null;

  // Always use the global sectionNames array for section navigation
  const sectionMap = sectionNames.reduce((acc, section) => {
    acc[section.name] = {
      name: section.name,
      firstLesson: { slug: section.slug },
      isCurrentSection: section.name === currentSection
    };
    return acc;
  }, {});

  // Helper function to format section names
  const formatSectionName = (name) => {
    return name.replace(/\*/g, ' ').trim();
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-4xl mx-auto">
      <main className="flex-grow p-6">
        {children}
      </main>
      
      <footer className="p-4 border-t mt-8">
        <div className="w-full bg-muted/50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Course Navigation</h3>
            <div className="flex gap-2">
              {prevLesson && (
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className="h-8 w-8"
                >
                  <Link href={prevLesson.slug}>
                    <ChevronLeft className="h-4 w-4" />
                  </Link>
                </Button>
              )}
              {nextLesson && (
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className="h-8 w-8"
                >
                  <Link href={nextLesson.slug}>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {filteredLessons.map((lesson) => {
              const isCompleted = userPoints > lesson.unlock_at;
              const isCurrentLesson = lesson.unlock_at === currentLessonPoints;
              const isLocked = userPoints < lesson.unlock_at;
              
              return (
                <Button
                  key={lesson.id}
                  variant={isCurrentLesson ? "default" : isCompleted ? "outline" : "secondary"}
                  disabled={isLocked}
                  asChild
                  className={`
                    ${isCompleted ? "bg-muted/20 hover:bg-muted/40" : ""}
                    ${isCurrentLesson ? "bg-primary" : ""}
                    ${isLocked ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  <Link href={isLocked ? "#" : lesson.slug}>
                    {lesson.title}
                    {isLocked && " 🔒"}
                    {isCompleted && " ✓"}
                  </Link>
                </Button>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2 pt-2 border-t">
            {Object.values(sectionMap).map((section) => (
              <Button
                key={section.name}
                variant={section.isCurrentSection ? "default" : "outline"}
                size="sm"
                asChild
                className={`
                  ${section.isCurrentSection ? "bg-primary" : "bg-muted/20 hover:bg-muted/40"}
                `}
              >
                <Link href={section.firstLesson.slug}>
                  {formatSectionName(section.name)}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
} 