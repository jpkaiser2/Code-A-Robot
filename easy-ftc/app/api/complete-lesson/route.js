import { completeLessonAction } from "@/app/actions";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request) {
  try {
    // Make sure we have a Supabase client with auth session
    const supabase = await createClient();
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error("Auth error:", authError);
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }
    
    console.log("API authenticated user:", user.id);
    
    const formData = await request.formData();
    const points = parseInt(formData.get("points"), 10);
    
    if (isNaN(points)) {
      return NextResponse.json(
        { error: "Invalid points value" },
        { status: 400 }
      );
    }
    
    console.log("Complete lesson API called with points:", points);
    
    // Call the server action to process the lesson completion
    const actionResponse = await completeLessonAction(points);
    
    console.log("Action returned full response:", actionResponse);
    
    if (!actionResponse || !actionResponse.destination) {
      console.error("Invalid response from completeLessonAction:", actionResponse);
      return NextResponse.json(
        { error: "Invalid response from action", details: "No destination found" },
        { status: 500 }
      );
    }
    
    const { destination } = actionResponse;
    console.log("Action returned destination path:", destination);
    
    // Get the origin for constructing absolute URLs
    const origin = request.headers.get("origin") || "http://localhost:3000";
    const isRelativePath = !destination.startsWith('http') && !destination.startsWith('//');
    
    let redirectUrl;
    if (isRelativePath) {
      // For relative paths, ensure they start with a slash before joining with origin
      const cleanPath = destination.startsWith('/') ? destination : `/${destination}`;
      // Strip trailing slash from origin if present
      const cleanOrigin = origin.endsWith('/') ? origin.slice(0, -1) : origin;
      redirectUrl = `${cleanOrigin}${cleanPath}`;
    } else {
      // For absolute URLs, use as is
      redirectUrl = destination;
    }
    
    console.log("Final redirect URL:", redirectUrl);
    
    // Set simple absolute redirect URL without any query params
    // This fixes query parameter handling issues
    const urlObj = new URL(redirectUrl);
    
    // Return a proper redirect response
    return new Response(null, {
      status: 303, // See Other
      headers: {
        'Location': redirectUrl,
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
  } catch (error) {
    console.error("Error in complete-lesson API route:", error);
    return NextResponse.json(
      { error: "Failed to complete lesson", details: error.message, stack: error.stack },
      { status: 500 }
    );
  }
} 