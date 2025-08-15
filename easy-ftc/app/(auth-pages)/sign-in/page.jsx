import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { LogIn } from "lucide-react";

export default async function Login(props) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Welcome Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Image
              src="/images/logoShadow.png"
              alt="Code-A-Robot Logo"
              width={80}
              height={80}
              className="rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground mt-2">
              Continue your FTC programming journey
            </p>
          </div>
        </div>

        {/* Sign In Card */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl flex items-center gap-2">
              <LogIn className="h-5 w-5" />
              Sign in
            </CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input 
                  id="email"
                  name="email" 
                  type="email"
                  placeholder="you@example.com" 
                  required 
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    className="text-sm text-primary hover:underline"
                    href="/forgot-password"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="h-11"
                />
              </div>

              <FormMessage message={searchParams} />

              <SubmitButton 
                pendingText="Signing in..." 
                formAction={signInAction}
                className="w-full h-11"
              >
                Sign in
              </SubmitButton>
            </form>
          </CardContent>
        </Card>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link 
              className="text-primary font-medium hover:underline" 
              href="/sign-up"
            >
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
