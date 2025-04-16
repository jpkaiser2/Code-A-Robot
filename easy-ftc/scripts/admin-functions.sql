-- Function to create the progress table
CREATE OR REPLACE FUNCTION public.admin_create_progress_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    CREATE TABLE IF NOT EXISTS public.progress (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
        points INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE(user_id)
    );
END;
$$;

-- Function to disable RLS on the progress table
CREATE OR REPLACE FUNCTION public.admin_disable_progress_rls()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    ALTER TABLE public.progress DISABLE ROW LEVEL SECURITY;
END;
$$;

-- Function to enable RLS on the progress table
CREATE OR REPLACE FUNCTION public.admin_enable_progress_rls()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
END;
$$;

-- Function to set up policies for the progress table
CREATE OR REPLACE FUNCTION public.admin_setup_progress_policies()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Drop existing policies
    DROP POLICY IF EXISTS select_own_progress ON public.progress;
    DROP POLICY IF EXISTS insert_own_progress ON public.progress;
    DROP POLICY IF EXISTS update_own_progress ON public.progress;
    DROP POLICY IF EXISTS delete_own_progress ON public.progress;
    
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
        USING (auth.uid() = user_id);
    
    -- Create policy for DELETE (optional)
    CREATE POLICY delete_own_progress ON public.progress
        FOR DELETE
        USING (auth.uid() = user_id);
END;
$$;

-- Function to recreate the progress table (WARNING: deletes all data)
CREATE OR REPLACE FUNCTION public.admin_reset_progress_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    DROP TABLE IF EXISTS public.progress;
    PERFORM admin_create_progress_table();
    PERFORM admin_setup_progress_policies();
    PERFORM admin_enable_progress_rls();
END;
$$;

-- Function to fully reset permissions on progress table
CREATE OR REPLACE FUNCTION public.admin_fix_progress_permissions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Step 1: Disable RLS
    PERFORM admin_disable_progress_rls();
    
    -- Step 2: Set up policies
    PERFORM admin_setup_progress_policies();
    
    -- Step 3: Re-enable RLS
    PERFORM admin_enable_progress_rls();
END;
$$; 