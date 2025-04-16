import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      console.error("Auth callback error:", error);
      // Redirect to sign-in with error message
      const params = new URLSearchParams();
      params.set("error", `Authentication error: ${error.message}`);
      return NextResponse.redirect(`${origin}/sign-in?${params.toString()}`);
    }
  }

  // Check if the user is coming from email confirmation
  const type = requestUrl.searchParams.get("type");
  
  if (type === "signup" || type === "recovery" || type === "invite") {
    // Redirect to sign-in with success message
    const params = new URLSearchParams();
    params.set("success", "Your email has been confirmed! Please sign in.");
    return NextResponse.redirect(`${origin}/sign-in?${params.toString()}`);
  }

  if (redirectTo) {
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  // Default redirect to dashboard if no specific destination is provided
  return NextResponse.redirect(`${origin}/sign-in?success=Authentication%20successful`);
}
