"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function ConfettiEffect() {
  useEffect(() => {
    // Create confetti effect when the component mounts
    const createConfetti = () => {
      // Fire confetti from the left side
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.1, y: 0.8 },
        colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
      });
      
      // Fire confetti from the right side
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.9, y: 0.8 },
        colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
      });
      
      // Fire confetti from the center
      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { x: 0.5, y: 0.6 },
          colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
        });
      }, 300);

      // Additional confetti burst after a delay
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { x: 0.3, y: 0.7 },
          colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
        });
        
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { x: 0.7, y: 0.7 },
          colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
        });
      }, 800);
    };

    // Trigger confetti after a short delay
    const timer = setTimeout(createConfetti, 500);

    // Cleanup
    return () => clearTimeout(timer);
  }, []);

  return null; // This component doesn't render anything visible
}
