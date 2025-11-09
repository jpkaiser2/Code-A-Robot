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

  // Check if the user is coming from an email link
  const type = requestUrl.searchParams.get("type");

  // For password recovery, send the user to the reset password page
  if (type === "recovery") {
    // Build destination
    const destination = redirectTo
      ? `${origin}${redirectTo}`
      : `${origin}/protected/reset-password?success=You%20can%20now%20set%20a%20new%20password`;

    // Set a short-lived cookie to allow visiting the reset page while authenticated
    // This avoids redirecting to dashboard in middleware for legitimate recovery flows
    const res = NextResponse.redirect(destination);
    res.cookies.set("allow_reset", "1", {
      path: "/protected/reset-password",
      maxAge: 60 * 5, // 5 minutes
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });
    return res;
  }

  // For email confirmation or invite flows, send to sign-in
  if (type === "signup" || type === "invite") {
    const params = new URLSearchParams();
    params.set("success", "Your email has been confirmed! Please sign in.");
    return NextResponse.redirect(`${origin}/sign-in?${params.toString()}`);
  }

  if (redirectTo) {
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  // Default redirect if no specific destination is provided
  return NextResponse.redirect(`${origin}/sign-in?success=Authentication%20successful`);
}
