import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type SearchParams = {
  code?: string;
  type?: string;
  [key: string]: string | string[] | undefined;
};

export default async function ForgotPasswordExchange({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // In App Router, this page runs on the server, so we can safely exchange the code here
  const code = typeof searchParams?.code === "string" ? searchParams.code : undefined;

  if (!code) {
    // No code provided – send user to sign-in with a helpful error
    redirect("/sign-in?error=Invalid%20or%20missing%20recovery%20code");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    redirect(`/sign-in?error=${encodeURIComponent("Authentication error: " + error.message)}`);
  }

  // Success: user now has a recovery session and can set a new password
  redirect("/protected/reset-password?success=You%20can%20now%20set%20a%20new%20password");
}
