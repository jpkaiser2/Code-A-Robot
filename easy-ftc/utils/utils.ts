import { redirect } from "next/navigation";

/**
 * Redirects to a specified path with encoded message and optional form ID as query parameters.
 * @param type - The type of message, either 'error' or 'success'.
 * @param path - The path to redirect to.
 * @param message - The message to be encoded and added as a query parameter.
 * @param formId - Optional identifier for the form that generated the message.
 * @returns A redirect Response for server actions
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string,
  formId?: string,
) {
  // If the path starts with /course/sections (for lessons), don't add query parameters
  // This prevents issues with navigating to lesson URLs
  const isLessonPath = path.includes('/course/sections');
  let destination = path;
  
  if (!isLessonPath) {
    // Only add query parameters for non-lesson paths
    const params = new URLSearchParams();
    params.set(type, message);
    if (formId) {
      params.set("formId", formId);
    }
    
    // Ensure proper handling of existing query parameters
    const hasQuery = path.includes('?');
    destination = hasQuery 
      ? `${path}&${params.toString()}` 
      : `${path}?${params.toString()}`;
  }
  
  // For debugging
  console.log("Encoded redirect destination:", destination, "from path:", path);
  
  return {
    // This allows API routes to access the destination path
    destination,
    // This is a non-serializable function, but we only use it server-side
    redirect: () => {
      // For lesson paths, use the path directly without query parameters
      if (isLessonPath) {
        return redirect(path);
      }
      // For other paths, use the destination with query parameters
      return redirect(destination);
    }
  };
}

/**
 * Server actions should call this directly
 */
export function performEncodedRedirect(redirectResponse: ReturnType<typeof encodedRedirect>) {
  return redirectResponse.redirect();
}
