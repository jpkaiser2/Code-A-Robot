import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function ForgotPasswordExchange(props: {
  searchParams: Promise<SearchParams>;
}) {
  // In this project, pages receive `searchParams` as a Promise; await it for consistency
  const sp = await props.searchParams;
  const code = typeof sp?.code === "string" ? sp.code : undefined;

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
