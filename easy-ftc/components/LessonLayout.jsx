import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  // Get all lessons to build the navigation bar
  const { data: allLessons } = await supabase
    .from('lessons')
    .select('*')
    .order('unlock_at', { ascending: true });

  // Get the current path to determine the section
  const currentLesson = allLessons?.find(lesson => lesson.unlock_at === currentLessonPoints);
  const currentSection = currentLesson?.slug.split('/')[3] || null;

  // Get all unique sections and their first lessons
  const sections = allLessons?.reduce((acc, lesson) => {
    const section = lesson.slug.split('/')[3];
    if (!acc[section]) {
      acc[section] = {
        name: section,
        firstLesson: lesson,
        isCurrentSection: section === currentSection
      };
    }
    return acc;
  }, {}) || {};

  // Filter lessons by current section
  const sectionLessons = allLessons?.filter(lesson => {
    const lessonSection = lesson.slug.split('/')[3];
    return lessonSection === currentSection;
  }) || [];

  // Find current lesson index
  const currentLessonIndex = sectionLessons.findIndex(
    lesson => lesson.unlock_at === currentLessonPoints
  );

  // Get previous and next lessons, including section transitions
  let prevLesson = null;
  let nextLesson = null;

  // Check if this is the first lesson of the entire course
  const isFirstLessonOfCourse = allLessons?.[0]?.unlock_at === currentLessonPoints;
  // Check if this is the last lesson of the entire course
  const isLastLessonOfCourse = allLessons?.[allLessons.length - 1]?.unlock_at === currentLessonPoints;

  if (!isFirstLessonOfCourse) {
    if (currentLessonIndex > 0) {
      // If not the first lesson in section, get previous lesson from same section
      prevLesson = sectionLessons[currentLessonIndex - 1];
    } else {
      // If first lesson in section, get last lesson from previous section
      const prevSectionLessons = allLessons?.filter(lesson => {
        const lessonSection = lesson.slug.split('/')[3];
        return lessonSection !== currentSection;
      }).sort((a, b) => b.unlock_at - a.unlock_at) || [];
      
      if (prevSectionLessons.length > 0) {
        prevLesson = prevSectionLessons[0];
      }
    }
  }

  if (!isLastLessonOfCourse) {
    if (currentLessonIndex < sectionLessons.length - 1) {
      // If not the last lesson in section, get next lesson from same section
      nextLesson = sectionLessons[currentLessonIndex + 1];
    } else {
      // If last lesson in section, get first lesson from next section
      const nextSectionLessons = allLessons?.filter(lesson => {
        const lessonSection = lesson.slug.split('/')[3];
        return lessonSection !== currentSection;
      }).sort((a, b) => a.unlock_at - b.unlock_at) || [];
      
      if (nextSectionLessons.length > 0) {
        nextLesson = nextSectionLessons[0];
      }
    }
  }

  // Helper function to format section names
  const formatSectionName = (name) => {
    return name
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
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
            {sectionLessons.map((lesson) => {
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
            {Object.values(sections).map((section) => (
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