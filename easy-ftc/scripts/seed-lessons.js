// Load environment variables from .env.local
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

// Log the values to check (without revealing full key)
console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("Supabase Key exists:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const lessons = [
  {
    title: "Welcome to Java",
    slug: "/course/sections/basicJava/lessons/welcomeToJava",
    description: "An introduction to Java programming for FIRST Tech Challenge.",
    unlock_at: 0
  },
  {
    title: "Hello World",
    slug: "/course/sections/basicJava/lessons/helloWorld",
    description: "Your first Java program for FIRST Tech Challenge robotics.",
    unlock_at: 1
  },
  {
    title: "Variables and Data Types",
    slug: "/course/sections/basicJava/lessons/variablesAndDataTypes",
    description: "Learn about variables and data types in Java.",
    unlock_at: 2
  },
  {
    title: "Control Flow",
    slug: "/course/sections/basicJava/lessons/controlFlow",
    description: "Understanding control flow in Java programming.",
    unlock_at: 3
  }
];

async function seedLessons() {
  try {
    console.log("Connecting to Supabase...");
    
    // Check if connection is working
    const { data: healthCheck, error: healthError } = await supabase.from('lessons').select('id').limit(1);
    if (healthError) {
      throw new Error(`Database connection error: ${healthError.message}`);
    }
    console.log("Database connection successful:", healthCheck);
    
    // Clear existing lessons
    console.log("Deleting existing lessons...");
    const { error: deleteError } = await supabase.from('lessons').delete().neq('id', 0);
    if (deleteError) {
      console.log("Error deleting lessons:", deleteError);
    }

    // Insert new lessons
    console.log("Inserting new lessons...");
    const { data, error } = await supabase.from('lessons').insert(lessons).select();
    
    if (error) {
      throw error;
    }
    
    console.log("Inserted lessons:", data);
    console.log('Successfully seeded lessons!');
  } catch (error) {
    console.error('Error seeding lessons:', error);
  }
}

seedLessons(); 