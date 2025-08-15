import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { KeyRound, ArrowLeft } from "lucide-react";
import { SmtpMessage } from "../smtp-message";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header Section */}
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
            <h1 className="text-3xl font-bold tracking-tight">Reset Password</h1>
            <p className="text-muted-foreground mt-2">
              Enter your email to receive a password reset link
            </p>
          </div>
        </div>

        {/* Reset Password Card */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl flex items-center gap-2">
              <KeyRound className="h-5 w-5" />
              Forgot Password
            </CardTitle>
            <CardDescription>
              We'll send you a link to reset your password
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

              <FormMessage message={searchParams} />

              <SubmitButton 
                formAction={forgotPasswordAction}
                className="w-full h-11"
              >
                Send Reset Link
              </SubmitButton>
            </form>
          </CardContent>
        </Card>

        {/* Back to Sign In Link */}
        <div className="text-center">
          <Link 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary" 
            href="/sign-in"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Link>
        </div>

       
      </div>
    </div>
  );
}
