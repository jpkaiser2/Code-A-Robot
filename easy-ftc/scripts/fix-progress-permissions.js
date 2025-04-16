// Load environment variables from .env.local
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

// Log the values to check (without revealing full key)
console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("Supabase Key exists:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  }
);

async function fixProgressPermissions() {
  try {
    console.log("Fixing progress table permissions...");
    
    // 1. Check if progress table exists
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', 'progress');
    
    if (tablesError) {
      console.error("Error checking tables:", tablesError);
      return;
    }
    
    if (!tables || tables.length === 0) {
      console.log("Progress table doesn't exist, creating it...");
      
      // Create the progress table
      const { error: createTableError } = await supabase.rpc('admin_create_progress_table');
      
      if (createTableError) {
        console.error("Error creating progress table:", createTableError);
        return;
      }
      
      console.log("Progress table created successfully");
    } else {
      console.log("Progress table exists");
    }
    
    // 2. Disable RLS to allow setup
    console.log("Disabling RLS temporarily...");
    const { error: disableRLSError } = await supabase.rpc('admin_disable_progress_rls');
    
    if (disableRLSError) {
      console.error("Error disabling RLS:", disableRLSError);
    }
    
    // 3. Create or update public policies
    console.log("Setting up RLS policies...");
    const { error: setupPoliciesError } = await supabase.rpc('admin_setup_progress_policies');
    
    if (setupPoliciesError) {
      console.error("Error setting up policies:", setupPoliciesError);
    } else {
      console.log("RLS policies set up successfully");
    }
    
    // 4. Re-enable RLS
    console.log("Re-enabling RLS...");
    const { error: enableRLSError } = await supabase.rpc('admin_enable_progress_rls');
    
    if (enableRLSError) {
      console.error("Error enabling RLS:", enableRLSError);
    } else {
      console.log("RLS enabled successfully");
    }
    
    // 5. Test the policies
    console.log("Testing RLS policies with a sample insert...");
    
    const testUserId = '00000000-0000-0000-0000-000000000000'; // Placeholder UUID for testing
    
    const { error: insertError } = await supabase
      .from('progress')
      .insert({ user_id: testUserId, points: 0 })
      .select()
      .single();
    
    if (insertError) {
      console.log("Insert test failed as expected (this is good):", insertError.message);
    } else {
      console.warn("Warning: Insert succeeded for a test user without authentication");
      
      // Clean up the test data
      await supabase
        .from('progress')
        .delete()
        .eq('user_id', testUserId);
    }
  } catch (e) {
    console.error("General error:", e);
  }
}

fixProgressPermissions(); 