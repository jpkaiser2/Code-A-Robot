import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

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

  // Fetch the lesson that corresponds to the user's points
  const { data: currentLesson } = await supabase
    .from('lessons')
    .select('*')
    .lte('unlock_at', points)
    .order('unlock_at', { ascending: false })
    .limit(1)
    .single();

  // Add a simple query to test the database connection
  const { data: lessonsData, error } = await supabase.from('lessons').select('*');
  console.log('Lessons:', lessonsData);
  if (error) console.error('Error fetching lessons:', error);

  return (
    <div className="flex-1 w-full flex flex-col gap-8 p-4 md:p-8">
      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>Track your learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Points</span>
              <span className="text-sm font-medium">{points} points</span>
            </div>
            <Progress value={(points / 100) * 100} />
          </div>
        </CardContent>
      </Card>

      {/* Current Course */}
      <Card>
        <CardHeader>
          <CardTitle>Current Course</CardTitle>
          <CardDescription>Continue your learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">
            {currentLesson 
              ? `You're currently on: ${currentLesson.title}`
              : "Start your learning journey"}
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href={currentLesson 
              ? `${currentLesson.slug}`
              : '/course/sections/basicJava/lessons/helloWorld'}>
              {currentLesson ? 'Continue Learning' : 'Start Learning'}
            </Link>
          </Button>
        </CardFooter>
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
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href="/settings">Manage Account</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
