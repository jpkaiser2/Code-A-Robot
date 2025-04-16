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

-- Create policy for SELECT
CREATE POLICY select_own_progress ON public.progress
    FOR SELECT
    USING (auth.uid() = user_id);

-- Create policy for INSERT
CREATE POLICY insert_own_progress ON public.progress
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create policy for UPDATE
CREATE POLICY update_own_progress ON public.progress
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Create stored procedure to run the setup
CREATE OR REPLACE FUNCTION public.setup_progress_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
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
END;
$$;

-- Create stored procedure to set up RLS policies
CREATE OR REPLACE FUNCTION public.setup_progress_rls()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS select_own_progress ON public.progress;
    DROP POLICY IF EXISTS insert_own_progress ON public.progress;
    DROP POLICY IF EXISTS update_own_progress ON public.progress;

    -- Create policy for SELECT
    CREATE POLICY select_own_progress ON public.progress
        FOR SELECT
        USING (auth.uid() = user_id);

    -- Create policy for INSERT
    CREATE POLICY insert_own_progress ON public.progress
        FOR INSERT
        WITH CHECK (auth.uid() = user_id);

    -- Create policy for UPDATE
    CREATE POLICY update_own_progress ON public.progress
        FOR UPDATE
        USING (auth.uid() = user_id)
        WITH CHECK (auth.uid() = user_id);
END;
$$; 