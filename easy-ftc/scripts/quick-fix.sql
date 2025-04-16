-- QUICK FIX FOR PROGRESS TABLE PERMISSIONS
-- This allows any authenticated user to read/write to the progress table
-- WARNING: This is less secure than properly configured RLS policies

-- Enable RLS if not already enabled
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS select_own_progress ON public.progress;
DROP POLICY IF EXISTS insert_own_progress ON public.progress;
DROP POLICY IF EXISTS update_own_progress ON public.progress;
DROP POLICY IF EXISTS delete_own_progress ON public.progress;
DROP POLICY IF EXISTS select_all_progress ON public.progress;
DROP POLICY IF EXISTS insert_all_progress ON public.progress;
DROP POLICY IF EXISTS update_all_progress ON public.progress;

-- This policy allows users to select their own records only
CREATE POLICY select_own_progress ON public.progress
    FOR SELECT 
    USING (auth.uid() = user_id);

-- This policy allows users to insert their own records only
CREATE POLICY insert_own_progress ON public.progress
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- This policy allows users to update their own records only
CREATE POLICY update_own_progress ON public.progress
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Add a temporary fallback policy that allows authenticated users to see all progress
-- NOTE: This is less secure but helps for development/debugging
CREATE POLICY select_all_progress ON public.progress
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Test if progress table exists, create if not
DO $$
BEGIN
    CREATE TABLE IF NOT EXISTS public.progress (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
        points INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE(user_id)
    );
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error creating table: %', SQLERRM;
END $$; 