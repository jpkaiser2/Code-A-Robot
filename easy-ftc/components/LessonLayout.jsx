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
  { name: 'OpModes*&*Gamepads', slug: '/course/sections/OpModes/Lessons/FirstOpMode' },
  { name: 'Controlling*Robot*Mechanisms', slug: '/course/sections/ControlingMechanisms/Lessons/HardwareMapping' },
  { name: 'Sensors*&*Feedback', slug: '/course/sections/Sensors/Lessons/Encoders' },
  { name: 'Autonomous*Programming', slug: '/course/sections/Auto/Lessons/IntroToAuto' },
  { name: 'Road*Runner', slug: '/course/sections/RoadRunner/Lessons/Intro' },
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

  // Handle cross-section navigation for edge cases
  let crossSectionPrevLesson = null;
  let crossSectionNextLesson = null;

  if (!prevLesson || !nextLesson) {
    // Get all lessons across all sections
    const allLessons = sectionLessons || [];
    const currentLessonGlobalIndex = allLessons.findIndex(lesson => lesson.unlock_at === currentLessonPoints);
    
    if (!prevLesson && currentLessonGlobalIndex > 0) {
      crossSectionPrevLesson = allLessons[currentLessonGlobalIndex - 1];
    }
    
    if (!nextLesson && currentLessonGlobalIndex < allLessons.length - 1) {
      crossSectionNextLesson = allLessons[currentLessonGlobalIndex + 1];
    }
  }

  const finalPrevLesson = prevLesson || crossSectionPrevLesson;
  const finalNextLesson = nextLesson || crossSectionNextLesson;

  // Calculate section progress based on completed lessons
  const completedLessonsInSection = filteredLessons.filter(lesson => userPoints > lesson.unlock_at).length;
  const sectionProgressPercentage = filteredLessons.length > 0 ? Math.round((completedLessonsInSection / filteredLessons.length) * 100) : 0;

  // Always use the global sectionNames array for section navigation
  const sectionMap = sectionNames.reduce((acc, section) => {
    const sectionSlug = section.slug.split('/')[3]; // Extract section from slug
    acc[section.name] = {
      name: section.name,
      firstLesson: { slug: section.slug },
      isCurrentSection: sectionSlug === currentSection
    };
    return acc;
  }, {});

  // Get the proper section display name from the mapping
  const currentSectionDisplayName = Object.values(sectionMap).find(section => section.isCurrentSection)?.name || currentSection;

  // Helper function to format section names
  const formatSectionName = (name) => {
    return name.replace(/\*/g, ' ').trim();
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-4xl mx-auto">
      <main className="flex-grow p-6">
        {children}
      </main>
      
      <footer className="p-6 border-t mt-8 bg-gradient-to-r from-background to-muted/10">
        <div className="w-full bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-sm">
          {/* Header with navigation arrows */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-foreground">Course Navigation</h3>
              <p className="text-sm text-muted-foreground mt-1 break-words">
                {formatSectionName(currentSectionDisplayName)} • Lesson {currentLessonIndex + 1} of {filteredLessons.length}
              </p>
            </div>
            <div className="flex gap-3">
              {finalPrevLesson ? (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="flex items-center gap-2 hover:bg-primary/10 transition-colors"
                >
                  <Link href={finalPrevLesson.slug}>
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                    {crossSectionPrevLesson && (
                      <span className="text-xs opacity-75 ml-1">(Section)</span>
                    )}
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" size="sm" disabled className="flex items-center gap-2 opacity-50">
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
              )}
              {finalNextLesson ? (
                <Button
                  size="sm"
                  asChild
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 transition-colors"
                >
                  <Link href={finalNextLesson.slug}>
                    Next
                    {crossSectionNextLesson && (
                      <span className="text-xs opacity-75 ml-1">(Section)</span>
                    )}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button size="sm" disabled className="flex items-center gap-2 opacity-50">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Progress bar for current section */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Section Progress</span>
              <span>{sectionProgressPercentage}% Complete ({completedLessonsInSection} of {filteredLessons.length})</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-300"
                style={{ width: `${sectionProgressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Current section lessons */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
              Current Section Lessons
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredLessons.map((lesson, index) => {
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
                      h-auto min-h-[3rem] p-3 justify-start text-left transition-all duration-200 whitespace-normal
                      ${isCompleted ? "bg-green-100/50 border-green-300/50 hover:bg-green-200/50 text-green-900 dark:bg-green-900/20 dark:border-green-700/50 dark:hover:bg-green-800/30 dark:text-green-100" : ""}
                      ${isCurrentLesson ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20" : ""}
                      ${isLocked ? "opacity-50 cursor-not-allowed bg-muted/50" : ""}
                      ${!isLocked && !isCurrentLesson && !isCompleted ? "hover:bg-accent/50 hover:text-accent-foreground bg-muted/30" : ""}
                    `}
                  >
                    <Link href={isLocked ? "#" : lesson.slug} className="w-full block">
                      <div className="flex items-start gap-3">
                        <div className={`
                          flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5
                          ${isCompleted ? "bg-green-600/80 text-white dark:bg-green-500" : ""}
                          ${isCurrentLesson ? "bg-primary-foreground/90 text-primary" : ""}
                          ${isLocked ? "bg-muted-foreground/30 text-muted-foreground" : ""}
                          ${!isLocked && !isCurrentLesson && !isCompleted ? "bg-primary/30 text-primary" : ""}
                        `}>
                          {isCompleted ? "✓" : isLocked ? "🔒" : index + 1}
                        </div>
                        <div className="flex-1 min-w-0 overflow-hidden">
                          <div className="font-medium text-sm break-words leading-tight hyphens-auto">
                            {lesson.title}
                          </div>
                          {isCurrentLesson && (
                            <div className="text-xs opacity-75 mt-1">Currently viewing</div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* All sections navigation */}
          <div className="pt-4 border-t">
            <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
              All Course Sections
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {Object.values(sectionMap).map((section) => (
                <Button
                  key={section.name}
                  variant={section.isCurrentSection ? "default" : "outline"}
                  size="sm"
                  asChild
                  className={`
                    h-auto min-h-[2.5rem] p-3 justify-start text-left transition-all duration-200 whitespace-normal
                    ${section.isCurrentSection 
                      ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20" 
                      : "bg-muted/30 hover:bg-accent/50 hover:text-accent-foreground border-border/50"
                    }
                  `}
                >
                  <Link href={section.firstLesson.slug} className="w-full block">
                    <div className="text-xs font-medium leading-tight break-words hyphens-auto">
                      {formatSectionName(section.name)}
                    </div>
                    {section.isCurrentSection && (
                      <div className="text-xs opacity-75 mt-1">Current section</div>
                    )}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 