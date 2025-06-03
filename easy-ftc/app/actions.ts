"use server";

import { encodedRedirect, performEncodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const username = formData.get("username")?.toString();
  const displayName = formData.get("displayName")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password || !username || !displayName) {
    return performEncodedRedirect(encodedRedirect(
      "error",
      "/sign-up",
      "Email, username, display name, and password are required",
    ));
  }

  if (username.length < 3) {
    return performEncodedRedirect(encodedRedirect(
      "error",
      "/sign-up",
      "Username must be at least 3 characters long",
    ));
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return performEncodedRedirect(encodedRedirect(
      "error",
      "/sign-up",
      "Username can only contain letters, numbers, and underscores",
    ));
  }

  if (displayName.length < 2) {
    return performEncodedRedirect(encodedRedirect(
      "error",
      "/sign-up",
      "Display name must be at least 2 characters long",
    ));
  }

  // Check if display name contains "admin" (case-insensitive)
  if (displayName.toLowerCase().includes("admin")) {
    return performEncodedRedirect(encodedRedirect(
      "error",
      "/sign-up",
      "Display name cannot contain the word \"admin\"",
    ));
  }

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback?type=signup`,
      data: {
        username: username,
        display_name: displayName,
      },
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return performEncodedRedirect(encodedRedirect("error", "/sign-up", error.message));
  } else {
    // Check if email confirmation is required
    if (data?.user?.identities?.length === 0) {
      console.log("User already exists, might need to sign in instead");
      return performEncodedRedirect(encodedRedirect(
        "error",
        "/sign-in",
        "An account with this email already exists. Please sign in instead.",
      ));
    }
    
    return performEncodedRedirect(encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link before signing in.",
    ));
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return performEncodedRedirect(encodedRedirect("error", "/sign-in", error.message));
  }

  return redirect("/dashboard");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return performEncodedRedirect(encodedRedirect("error", "/forgot-password", "Email is required"));
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/settings`,
  });

  if (error) {
    console.error(error.message);
    return performEncodedRedirect(encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    ));
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return performEncodedRedirect(encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  ));
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    return performEncodedRedirect(encodedRedirect(
      "error",
      "/settings",
      "Password and confirm password are required",
    ));
  }

  if (password !== confirmPassword) {
    return performEncodedRedirect(encodedRedirect(
      "error",
      "/settings",
      "Passwords do not match",
    ));
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return performEncodedRedirect(encodedRedirect(
      "error",
      "/settings",
      "Password update failed: " + error.message,
    ));
  }

  return performEncodedRedirect(encodedRedirect("success", "/settings", "Password updated successfully"));
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return performEncodedRedirect(encodedRedirect("success", "/", "You have been signed out"));
};

export const updatePasswordAction = async (formData: FormData) => {
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();
  const supabase = await createClient();

  if (!password || !confirmPassword) {
    return performEncodedRedirect(encodedRedirect(
      "error",
      "/settings",
      "Both password fields are required.",
    ));
  }

  if (password.length < 6) {
    return performEncodedRedirect(encodedRedirect(
      "error",
      "/settings",
      "Password must be at least 6 characters long.",
    ));
  }

  if (password !== confirmPassword) {
    return performEncodedRedirect(encodedRedirect(
      "error",
      "/settings",
      "Passwords do not match.",
    ));
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.error("Password update error:", error);
    return performEncodedRedirect(encodedRedirect(
      "error",
      "/settings",
      `Failed to update password: ${error.message}`,
    ));
  }

  return performEncodedRedirect(encodedRedirect(
    "success",
    "/settings",
    "Password updated successfully!",
  ));
};

export const updateUsernameAction = async (formData: FormData) => {
  const username = formData.get("username")?.toString();
  const supabase = await createClient();

  // Validation
  if (!username) {
    return performEncodedRedirect(encodedRedirect(
      "error",
      "/settings",
      "Username is required.",
      "usernameForm" // Pass form identifier
    ));
  }

  if (username.length < 3) {
    return performEncodedRedirect(encodedRedirect(
      "error",
      "/settings",
      "Username must be at least 3 characters long.",
      "usernameForm"
    ));
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return performEncodedRedirect(encodedRedirect(
      "error",
      "/settings",
      "Username can only contain letters, numbers, and underscores.",
      "usernameForm"
    ));
  }

  // Get current user to compare username
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
     return performEncodedRedirect(encodedRedirect(
      "error",
      "/settings",
      "Could not authenticate user. Please sign in again.",
      "usernameForm"
    ));
  }

  // Avoid unnecessary update if username hasn't changed
  if (user.user_metadata?.username === username) {
     return performEncodedRedirect(encodedRedirect(
      "error", // Or maybe "success" with a different message?
      "/settings",
      "Username is the same as the current one.",
      "usernameForm"
    ));
  }

  // Update user metadata
  const { error } = await supabase.auth.updateUser({
    data: { username: username },
  });

  if (error) {
    console.error("Username update error:", error);
    // Check for specific errors, e.g., uniqueness constraint if you add one later
    return performEncodedRedirect(encodedRedirect(
      "error",
      "/settings",
      `Failed to update username: ${error.message}`,
      "usernameForm"
    ));
  }

  // Revalidate path to show updated username immediately
  // revalidatePath("/settings"); // Need to import revalidatePath from next/cache

  return performEncodedRedirect(encodedRedirect(
    "success",
    "/settings",
    "Username updated successfully!",
    "usernameForm"
  ));
};

export const updateDisplayNameAction = async (formData: FormData) => {
  const displayName = formData.get("displayName")?.toString();
  const supabase = await createClient();

  // Validation
  if (!displayName) {
    return performEncodedRedirect(encodedRedirect(
      "error",
      "/settings",
      "Display name is required.",
      "displayNameForm" // Pass form identifier
    ));
  }

  if (displayName.length < 2) {
    return performEncodedRedirect(encodedRedirect(
      "error",
      "/settings",
      "Display name must be at least 2 characters long.",
      "displayNameForm"
    ));
  }

  // Check if display name contains "admin" (case-insensitive)
  if (displayName.toLowerCase().includes("admin")) {
    return performEncodedRedirect(encodedRedirect(
      "error",
      "/settings",
      "Display name cannot contain the word \"admin\"",
      "displayNameForm"
    ));
  }

  // Get current user to compare display name
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return performEncodedRedirect(encodedRedirect(
      "error",
      "/settings",
      "Could not authenticate user. Please sign in again.",
      "displayNameForm"
    ));
  }

  // Avoid unnecessary update if display name hasn't changed
  if (user.user_metadata?.display_name === displayName) {
    return performEncodedRedirect(encodedRedirect(
      "error",
      "/settings",
      "Display name is the same as the current one.",
      "displayNameForm"
    ));
  }

  // Update user metadata
  const { error } = await supabase.auth.updateUser({
    data: { display_name: displayName }, // Update display_name
  });

  if (error) {
    console.error("Display name update error:", error);
    return performEncodedRedirect(encodedRedirect(
      "error",
      "/settings",
      `Failed to update display name: ${error.message}`,
      "displayNameForm"
    ));
  }

  // Consider revalidating path if display name is shown elsewhere
  // revalidatePath("/settings");
  // revalidatePath("/dashboard"); // If we show it on the dashboard

  return performEncodedRedirect(encodedRedirect(
    "success",
    "/settings",
    "Display name updated successfully!",
    "displayNameForm"
  ));
};

export const completeLessonAction = async (lessonPoints: number) => {
  console.log("Starting completeLessonAction with points:", lessonPoints);
  const supabase = await createClient();
  
  // Get current user
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();
  
  if (userError) {
    console.error("Error getting user:", userError);
    return performEncodedRedirect(encodedRedirect(
      "error",
      "/sign-in",
      "Authentication error: " + userError.message
    ));
  }
  
  if (!user) {
    console.error("No user found in session");
    return performEncodedRedirect(encodedRedirect(
      "error",
      "/sign-in",
      "You must be signed in to complete lessons"
    ));
  }
  
  console.log("User authenticated:", user.id);

  // Fetch current user progress
  const { data: progress, error: progressError } = await supabase
    .from('progress')
    .select('points')
    .eq('user_id', user.id)
    .single();

  console.log("Current progress:", progress, "Error:", progressError);

  if (progressError && progressError.code !== 'PGRST116') {
    console.error("Error fetching progress:", progressError);
    return performEncodedRedirect(encodedRedirect(
      "error",
      "/dashboard",
      `Failed to fetch progress: ${progressError.message}`
    ));
  }

  // Check if the lesson is already completed
  const alreadyCompleted = progress && progress.points >= lessonPoints + 1;

  // If not already completed, update the progress
  if (!alreadyCompleted) {
    console.log("Updating points to:", lessonPoints + 1);

    try {
      // If progress record doesn't exist, create it
      if (!progress) {
        console.log("No progress record exists, creating new one");
        console.log("User ID for insert:", user.id);
        
        const { data: insertData, error: insertError } = await supabase
          .from('progress')
          .insert([{ user_id: user.id, points: lessonPoints + 1 }])
          .select();

        console.log("Insert result:", insertData, "Error:", insertError);

        if (insertError) {
          console.error("Error creating progress:", insertError);
          return performEncodedRedirect(encodedRedirect(
            "error",
            "/dashboard",
            `Failed to create progress: ${insertError.message}`
          ));
        }
      } else {
        // Update existing progress record
        console.log("Updating existing progress record");
        console.log("User ID for update:", user.id);
        
        const { data: updateData, error: updateError } = await supabase
          .from('progress')
          .update({ points: lessonPoints + 1 })
          .eq('user_id', user.id)
          .select();

        console.log("Update result:", updateData, "Error:", updateError);

        if (updateError) {
          console.error("Error updating progress:", updateError);
          return performEncodedRedirect(encodedRedirect(
            "error",
            "/dashboard",
            `Failed to update progress: ${updateError.message}`
          ));
        }
      }
    } catch (e: any) {
      console.error("Exception during progress update:", e);
      return performEncodedRedirect(encodedRedirect(
        "error",
        "/dashboard",
        `Exception during progress update: ${e.message}`
      ));
    }
  } else {
    console.log("Lesson already completed. Finding next lesson...");
  }

  // Always try to find the next lesson, regardless of whether this lesson was just completed
  console.log("Looking for next lesson after lesson with points:", lessonPoints);
  
  // Only fetch the minimal data we need
  const { data: allLessons, error: lessonsError } = await supabase
    .from('lessons')
    .select('slug, unlock_at')
    .order('unlock_at', { ascending: true });
    
  if (lessonsError) {
    console.error("Error fetching lessons:", lessonsError);
    return { destination: "/dashboard", message: "Error fetching lessons" };
  }
  
  if (!allLessons || allLessons.length === 0) {
    console.log("No lessons found in database");
    return { destination: "/dashboard", message: "No lessons found in database" };
  }

  // Find the current lesson using the same logic as the dashboard
  const currentLesson = allLessons.find(lesson => lesson.unlock_at === lessonPoints);
  
  if (!currentLesson) {
    console.log("Current lesson not found. Available points:", allLessons.map(l => l.unlock_at));
    return { destination: "/dashboard", message: "Current lesson not found in sequence" };
  }

  // Find the next lesson by looking for the first lesson with unlock_at > current lesson's unlock_at
  const nextLesson = allLessons.find(lesson => lesson.unlock_at > currentLesson.unlock_at);
  
  if (nextLesson) {
    // Ensure the slug starts with a forward slash
    const cleanSlug = nextLesson.slug.startsWith('/') ? nextLesson.slug : `/${nextLesson.slug}`;
    return { 
      destination: cleanSlug,
      message: alreadyCompleted ? "Moving to the next lesson." : "Lesson completed! Moving to the next lesson."
    };
  } else {
    return { 
      destination: "/dashboard",
      message: alreadyCompleted ? "No more lessons available." : "Congratulations! You've completed this lesson."
    };
  }
};
