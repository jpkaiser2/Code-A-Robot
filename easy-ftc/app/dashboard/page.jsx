import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ChevronRight, BookOpen, Trophy, Target, Clock } from "lucide-react";

// Course sections with their lessons count (approximate)
const courseSections = [
  { name: 'Basic Java', slug: 'basicJava', color: 'bg-blue-500', totalLessons: 8 },
  { name: 'Object-Oriented Java', slug: 'ObjectOrientedJava', color: 'bg-green-500', totalLessons: 6 },
  { name: 'Methods', slug: 'Methods', color: 'bg-purple-500', totalLessons: 5 },
  { name: 'Logic & Iteration', slug: 'LogicIteration', color: 'bg-orange-500', totalLessons: 6 },
  { name: 'Arrays & ArrayLists', slug: 'ArrayArrayList', color: 'bg-red-500', totalLessons: 5 },
  { name: 'Getting Ready for FTC', slug: 'GettingReady', color: 'bg-cyan-500', totalLessons: 4 },
  { name: 'OpModes & Gamepads', slug: 'OpModes', color: 'bg-indigo-500', totalLessons: 6 },
  { name: 'Controlling Mechanisms', slug: 'ControlingMechanisms', color: 'bg-pink-500', totalLessons: 7 },
  { name: 'Sensors & Feedback', slug: 'Sensors', color: 'bg-amber-500', totalLessons: 5 },
  { name: 'Autonomous Programming', slug: 'Auto', color: 'bg-emerald-500', totalLessons: 6 },
  { name: 'Road Runner', slug: 'RoadRunner', color: 'bg-violet-500', totalLessons: 4 },
  { name: 'Common TeleOp Programs', slug: 'TeleOps', color: 'bg-rose-500', totalLessons: 5 },
  { name: 'Next Steps', slug: 'EndOfCourse', color: 'bg-slate-500', totalLessons: 2 },
];

export default async function DashboardPage() {
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

  const points = progress?.points || 0;

  // Fetch all lessons to get detailed progress information
  const { data: allLessons } = await supabase
    .from('lessons')
    .select('*')
    .order('unlock_at', { ascending: true });

  const lessons = allLessons || [];
  const totalLessons = lessons.length;
  const completedLessons = lessons.filter(lesson => lesson.unlock_at < points).length;
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  // Find current lesson
  const currentLesson = lessons.find(lesson => lesson.unlock_at === points) || 
                       lessons.find(lesson => lesson.unlock_at > points) ||
                       lessons[lessons.length - 1];

  // Calculate section progress
  const sectionProgress = courseSections.map(section => {
    const sectionLessons = lessons.filter(lesson => 
      lesson.slug.includes(`/sections/${section.slug}/`)
    );
    const completedInSection = sectionLessons.filter(lesson => lesson.unlock_at < points).length;
    return {
      ...section,
      completed: completedInSection,
      total: sectionLessons.length,
      progress: sectionLessons.length > 0 ? (completedInSection / sectionLessons.length) * 100 : 0,
      isUnlocked: sectionLessons.some(lesson => lesson.unlock_at <= points),
      firstLesson: sectionLessons[0]
    };
  });

  // Find next milestone (next section unlock)
  const nextSection = sectionProgress.find(section => !section.isUnlocked);
  const nextMilestone = nextSection?.firstLesson;

  return (
    <div className="flex-1 w-full flex flex-col gap-8 p-4 md:p-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Track your progress and continue your FTC programming journey</p>
      </div>

      {/* Progress Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
            <div className="text-2xl font-bold">{points}</div>
            <p className="text-xs text-muted-foreground text-center">Total Points</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <BookOpen className="h-8 w-8 text-blue-500 mb-2" />
            <div className="text-2xl font-bold">{completedLessons}</div>
            <p className="text-xs text-muted-foreground text-center">Lessons Completed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Target className="h-8 w-8 text-green-500 mb-2" />
            <div className="text-2xl font-bold">{Math.round(progressPercentage)}%</div>
            <p className="text-xs text-muted-foreground text-center">Course Progress</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Clock className="h-8 w-8 text-purple-500 mb-2" />
            <div className="text-2xl font-bold">{totalLessons - completedLessons}</div>
            <p className="text-xs text-muted-foreground text-center">Lessons Remaining</p>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
          <CardDescription>
            You've completed {completedLessons} out of {totalLessons} lessons
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{completedLessons} completed</span>
              <span>{totalLessons} total lessons</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Course */}
      <Card>
        <CardHeader>
          <CardTitle>Continue Learning</CardTitle>
          <CardDescription>
            {currentLesson 
              ? `Next up: ${currentLesson.title}`
              : "You've completed all available lessons!"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentLesson ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{currentLesson.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {currentLesson.slug.split('/')[3].replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                </div>
              </div>
              {nextMilestone && (
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium">Next Milestone:</p>
                  <p className="text-sm text-muted-foreground">
                    Unlock "{nextSection?.name}" section
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground">
              Congratulations on completing the course! Check back for new content.
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href={currentLesson 
              ? currentLesson.slug
              : '/course/sections/basicJava/lessons/helloWorld'}>
              <ChevronRight className="h-4 w-4 mr-2" />
              {currentLesson ? 'Continue Learning' : 'Review Lessons'}
            </Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Course Sections Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Course Sections</CardTitle>
          <CardDescription>Your progress through each section of the course. Click on unlocked sections to start learning.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sectionProgress.map((section) => {
              const isClickable = section.isUnlocked && section.firstLesson;
              
              const SectionContent = () => (
                <div className={`space-y-3 p-3 rounded-lg border transition-colors ${
                  isClickable 
                    ? 'hover:bg-muted/50 cursor-pointer border-border hover:border-border/80' 
                    : 'border-border/50'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${section.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{section.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {section.completed} / {section.total} lessons
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {!section.isUnlocked && (
                        <Badge variant="secondary" className="text-xs">Locked</Badge>
                      )}
                      {section.completed === section.total && section.total > 0 && (
                        <Badge className="text-xs">Complete</Badge>
                      )}
                      {isClickable && (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  <Progress value={section.progress} className="h-2" />
                </div>
              );

              return (
                <div key={section.slug}>
                  {isClickable ? (
                    <Link href={section.firstLesson.slug} className="block">
                      <SectionContent />
                    </Link>
                  ) : (
                    <SectionContent />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Manage your account settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p className="text-sm">
              <span className="font-medium">Account Type:</span>{" "}
              {user.user_metadata?.is_admin ? "Admin" : "Student"}
            </p>
            {user.user_metadata?.username && (
              <p className="text-sm">
                <span className="font-medium">Username:</span> {user.user_metadata.username}
              </p>
            )}
            {user.user_metadata?.display_name && (
              <p className="text-sm">
                <span className="font-medium">Display Name:</span> {user.user_metadata.display_name}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href="/settings">
              Manage Account
              <ChevronRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
