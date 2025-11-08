import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Handle Supabase email links that sometimes arrive at the root with only `?code=`
  const url = new URL(request.url);
  const hasCode = url.searchParams.has("code");
  const isAuthCallback = url.pathname.startsWith("/auth/callback");

  if (hasCode && !isAuthCallback) {
    const target = new URL("/auth/callback", url.origin);

    // Preserve existing params
    url.searchParams.forEach((value, key) => target.searchParams.set(key, value));

    // Ensure we treat this as a recovery when type is missing
    if (!target.searchParams.has("type")) {
      target.searchParams.set("type", "recovery");
    }

    // Ensure we land users on the reset password page after callback
    if (!target.searchParams.has("redirect_to")) {
      target.searchParams.set("redirect_to", "/protected/reset-password");
    }

    return NextResponse.redirect(target);
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
