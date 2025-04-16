import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

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

  return (
    <div className="flex flex-col min-h-screen w-full max-w-4xl mx-auto">
      <main className="flex-grow p-6">
        {children}
      </main>
      
      <footer className="p-4 border-t mt-8">
        <div className="w-full bg-muted/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Course Navigation</h3>
          <div className="flex flex-wrap gap-2">
            {allLessons && allLessons.map((lesson) => {
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
        </div>
      </footer>
    </div>
  );
} 