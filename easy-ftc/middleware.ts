import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // If Supabase sends a bare root link like "/?code=...", forward it to our auth callback
  if (url.pathname === "/" && url.searchParams.has("code")) {
    const target = new URL("/auth/callback", url.origin);
    // Always include the code
    const code = url.searchParams.get("code");
    if (code) target.searchParams.set("code", code);
    // If type isn't provided, default to recovery (signup links usually include type=signup)
    const type = url.searchParams.get("type");
    target.searchParams.set("type", type ?? "recovery");
    // Ensure redirect_to so users land on the reset page after callback
    const redirectTo = url.searchParams.get("redirect_to") ?? "/protected/reset-password";
    target.searchParams.set("redirect_to", redirectTo);
    return NextResponse.redirect(target);
  }

  const response = await updateSession(request);
  return response;
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
