"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LessonCompleteButton({ lessonPoints }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("points", lessonPoints);
      
      console.log("Submitting lesson completion for points:", lessonPoints);
      
      // Use fetch with manual redirect handling
      const response = await fetch("/api/complete-lesson", {
        method: "POST",
        body: formData,
        redirect: "manual" // Don't auto-follow redirects so we can debug
      });
      
      console.log("Response:", {
        status: response.status,
        redirected: response.redirected,
        type: response.type,
        url: response.url,
        headers: Object.fromEntries([...response.headers.entries()])
      });
      
      // For 3xx status codes, follow the Location header
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get("Location");
        
        console.log("Redirect location:", location);
        
        if (location) {
          console.log("Following redirect to:", location);
          window.location.href = location;
          return;
        }
      }
      
      // If not redirected but the response is OK, try JSON
      if (response.ok) {
        try {
          const data = await response.json();
          console.log("Response data:", data);
          
          // If there's a destination in the response, use it
          if (data && data.destination) {
            console.log("Using destination from response:", data.destination);
            window.location.href = data.destination;
            return;
          }
        } catch (jsonError) {
          console.log("Not a JSON response");
        }
      }
      
      // Fallback - if everything else fails, go to the dashboard
      console.log("No clear redirect path, defaulting to dashboard");
      window.location.href = "/dashboard";
      
    } catch (error) {
      console.error("Error completing lesson:", error);
      window.location.href = "/dashboard";
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="points" value={lessonPoints} />
      <Button 
        type="submit"
        disabled={isLoading} 
        className="mt-6 w-full sm:w-auto"
      >
        {isLoading ? "Completing..." : "Complete Lesson & Continue"}
      </Button>
    </form>
  );
} 