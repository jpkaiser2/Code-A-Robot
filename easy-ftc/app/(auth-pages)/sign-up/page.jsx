import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { UserPlus, Mail, User, Eye } from "lucide-react";
import { SmtpMessage } from "../smtp-message";

export default async function Signup(props) {
  const searchParams = await props.searchParams;
  
  if ("message" in searchParams) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <Card>
            <CardContent className="pt-6">
              <FormMessage message={searchParams} />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold tracking-tight">Join Code-A-Robot</h1>
            <p className="text-muted-foreground mt-2">
              Start your FTC programming journey today
            </p>
          </div>
        </div>

        {/* Sign Up Card */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Create account
            </CardTitle>
            <CardDescription>
              Fill in your details to get started with learning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email address
                </Label>
                <Input 
                  id="email"
                  name="email" 
                  type="email"
                  placeholder="you@example.com" 
                  required 
                  className="h-11"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Username
                  </Label>
                  <Input 
                    id="username"
                    name="username" 
                    placeholder="username" 
                    required 
                    className="h-11"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="displayName" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Display Name
                  </Label>
                  <Input 
                    id="displayName"
                    name="displayName" 
                    placeholder="Your name" 
                    required 
                    className="h-11"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Create a secure password"
                  minLength={6}
                  required
                  className="h-11"
                />
                <p className="text-xs text-muted-foreground">
                  Must be at least 6 characters long
                </p>
              </div>

              <FormMessage message={searchParams} />

              <SubmitButton 
                formAction={signUpAction} 
                pendingText="Creating account..."
                className="w-full h-11"
              >
                Create account
              </SubmitButton>
            </form>
          </CardContent>
        </Card>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link 
              className="text-primary font-medium hover:underline" 
              href="/sign-in"
            >
              Sign in here
            </Link>
          </p>
        </div>

       
      </div>
    </div>
  );
}
