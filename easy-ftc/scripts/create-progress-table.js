// Load environment variables from .env.local
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function setupProgressTable() {
  try {
    console.log("Checking for progress table...");
    
    // Check if table exists by trying to query it
    const { error: queryError } = await supabase
      .from('progress')
      .select('*')
      .limit(1);
    
    // If we get a specific error indicating the table doesn't exist
    if (queryError && queryError.code === '42P01') {
      console.log("Progress table doesn't exist, creating it...");
      
      // Execute SQL to create the table using rpc
      const { error: createError } = await supabase.rpc('setup_progress_table');
      
      if (createError) {
        console.error("Error creating progress table:", createError);
        
        // Try to manually execute SQL
        console.log("Trying alternative method to create table...");
        
        // Check for available tables
        const { data: tables } = await supabase
          .from('pg_catalog.pg_tables')
          .select('tablename')
          .eq('schemaname', 'public');
        
        console.log("Available tables:", tables);
        
        // Try to get database schema info
        const { data: schemas } = await supabase
          .rpc('get_supabase_schemas');
        
        console.log("Schema info:", schemas);
      } else {
        console.log("Progress table created successfully!");
      }
    } else if (queryError) {
      console.error("Error checking progress table:", queryError);
    } else {
      console.log("Progress table already exists.");
      
      // Show table structure
      const { data, error } = await supabase
        .from('progress')
        .select('*')
        .limit(1);
      
      if (data && data.length > 0) {
        console.log("Progress table columns:", Object.keys(data[0]));
      } else {
        console.log("Progress table exists but is empty");
      }
      
      // Check RLS policies on the progress table
      console.log("Checking RLS policies...");
      
      // Create test user progress entry
      console.log("Trying to insert a test row...");
      const { data: testUser } = await supabase.auth.getUser();
      
      if (testUser?.user) {
        const { data: insertData, error: insertError } = await supabase
          .from('progress')
          .insert([{ user_id: testUser.user.id, points: 0 }])
          .select();
        
        console.log("Insert test:", insertData);
        if (insertError) {
          console.error("Insert error:", insertError);
          
          // Check if it's an RLS error
          if (insertError.code === '42501') {
            console.log("RLS policy is preventing inserts. Trying to create RLS policy...");
            
            // Try to create RLS policy
            const { error: rlsError } = await supabase.rpc('setup_progress_rls');
            
            if (rlsError) {
              console.error("Error setting up RLS:", rlsError);
            } else {
              console.log("RLS policy created successfully!");
            }
          }
        }
      }
    }
  } catch (e) {
    console.error("General error:", e);
  }
}

setupProgressTable(); 