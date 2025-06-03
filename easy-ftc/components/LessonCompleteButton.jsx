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
      // Ensure lessonPoints is a number
      const points = Number(lessonPoints);
      if (isNaN(points)) {
        console.error("Invalid lesson points:", lessonPoints);
        router.replace("/dashboard");
        return;
      }

      const formData = new FormData();
      formData.append("points", points);
      
      const response = await fetch("/api/complete-lesson", {
        method: "POST",
        body: formData
      });
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.destination) {
          // Use replace instead of push to prevent back button from returning to the lesson
          router.replace(data.destination);
          return;
        }
      }
      
      // Fallback - if everything else fails, go to the dashboard
      router.replace("/dashboard");
      
    } catch (error) {
      console.error("Error completing lesson:", error);
      router.replace("/dashboard");
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
        {isLoading ? "Loading..." : "Complete Lesson & Continue"}
      </Button>
    </form>
  );
} 