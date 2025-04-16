// Load environment variables from .env.local
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkProgressSchema() {
  try {
    // Try querying the progress table
    const { data, error } = await supabase
      .from('progress')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Error fetching progress table:', error);
      
      // Check if the table exists
      const { data: tables } = await supabase
        .from('pg_catalog.pg_tables')
        .select('tablename')
        .eq('schemaname', 'public');
      
      console.log('Available tables:', tables);
      return;
    }
    
    if (data && data.length > 0) {
      console.log('Progress table columns:', Object.keys(data[0]));
      console.log('Sample data:', data[0]);
    } else {
      console.log('No data found in progress table');
      
      // Check table definition using system views
      try {
        const { data: sampleUser } = await supabase.auth.getUser();
        const userId = sampleUser?.data?.user?.id;
        
        if (userId) {
          // Insert sample data
          const { data: insertData, error: insertError } = await supabase
            .from('progress')
            .insert([{ user_id: userId, points: 0 }])
            .select();
          
          console.log('Inserted sample data:', insertData);
          console.log('Insert error:', insertError);
        } else {
          console.log('No authenticated user to test with');
        }
      } catch (authError) {
        console.error('Auth error:', authError);
      }
    }
  } catch (e) {
    console.error('General error:', e);
  }
}

checkProgressSchema(); 