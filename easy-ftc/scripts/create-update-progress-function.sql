-- Create a function to update or create a progress record
-- This function bypasses RLS because it's SECURITY DEFINER
CREATE OR REPLACE FUNCTION update_user_progress(user_uuid UUID, new_points INTEGER)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    current_points INTEGER;
BEGIN
    -- Check if we have a record for this user
    SELECT points INTO current_points 
    FROM public.progress 
    WHERE user_id = user_uuid;
    
    IF current_points IS NULL THEN
        -- No record exists, create one
        INSERT INTO public.progress (user_id, points) 
        VALUES (user_uuid, new_points);
        
        RETURN new_points;
    ELSE
        -- Record exists, update it if new_points is higher
        IF new_points > current_points THEN
            UPDATE public.progress 
            SET points = new_points,
                updated_at = NOW()
            WHERE user_id = user_uuid;
            
            RETURN new_points;
        ELSE
            -- Keep the current points if they're already higher
            RETURN current_points;
        END IF;
    END IF;
END;
$$; 