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
      console.error("Invalid points value:", formData.get("points"));
      return NextResponse.json(
        { error: "Invalid points value" },
        { status: 400 }
      );
    }
    
    console.log("Complete lesson API called with points:", points);
    
    // Call the server action to process the lesson completion
    const actionResponse = await completeLessonAction(points);
    
    console.log("Action returned response:", actionResponse);
    
    if (!actionResponse || !actionResponse.destination) {
      console.error("Invalid response from completeLessonAction:", actionResponse);
      return NextResponse.json(
        { error: "Invalid response from action", details: "No destination found" },
        { status: 500 }
      );
    }
    
    // Return the destination path and message
    return NextResponse.json(actionResponse);
    
  } catch (error) {
    console.error("Error in complete-lesson API route:", error);
    return NextResponse.json(
      { error: "Failed to complete lesson", details: error.message },
      { status: 500 }
    );
  }
} 