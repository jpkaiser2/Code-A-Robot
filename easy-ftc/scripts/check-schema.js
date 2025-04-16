// Load environment variables from .env.local
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkSchema() {
  try {
    // Just select a single row to see the column names
    const { data, error, status } = await supabase
      .from('lessons')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Error fetching lessons:', error);
      return;
    }
    
    console.log('HTTP Status:', status);
    
    if (data && data.length > 0) {
      console.log('Lessons table columns:', Object.keys(data[0]));
      console.log('Sample data:', data[0]);
    } else {
      console.log('No data found in lessons table');
      
      // Try querying with introspection
      const { data: tables } = await supabase
        .from('pg_catalog.pg_tables')
        .select('tablename')
        .eq('schemaname', 'public');
      
      console.log('Available tables:', tables);
    }
  } catch (e) {
    console.error('General error:', e);
  }
}

checkSchema(); 