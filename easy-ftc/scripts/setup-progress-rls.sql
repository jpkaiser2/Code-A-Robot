-- Create progress table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    points INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies to start clean
DROP POLICY IF EXISTS select_own_progress ON public.progress;
DROP POLICY IF EXISTS insert_own_progress ON public.progress;
DROP POLICY IF EXISTS update_own_progress ON public.progress;

-- Policy for SELECT - users can only see their own progress
CREATE POLICY select_own_progress ON public.progress
    FOR SELECT 
    USING (auth.uid() = user_id);

-- Policy for INSERT - users can only insert their own progress
CREATE POLICY insert_own_progress ON public.progress
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Policy for UPDATE - users can only update their own progress
CREATE POLICY update_own_progress ON public.progress
    FOR UPDATE
    USING (auth.uid() = user_id); 