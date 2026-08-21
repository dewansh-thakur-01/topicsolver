-- ========================================================
-- SUPABASE SQL SCRIPT FOR PUBLIC WALL OF THOUGHTS
-- Copy and run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql/new
-- ========================================================

-- 1. Create the `thoughts` table
CREATE TABLE IF NOT EXISTS public.thoughts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT '🚀 Feature',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.thoughts ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policy: Allow anyone (anonymous users) to read all thoughts
CREATE POLICY "Allow public read access"
  ON public.thoughts
  FOR SELECT
  USING (true);

-- 4. Create RLS Policy: Allow anyone (anonymous users) to insert new thoughts
CREATE POLICY "Allow public insert access"
  ON public.thoughts
  FOR INSERT
  WITH CHECK (true);

-- 5. Enable Realtime Replication for instant live feed updates across browsers
ALTER PUBLICATION supabase_realtime ADD TABLE public.thoughts;

-- 6. Insert initial seed thoughts (Optional demo data)
INSERT INTO public.thoughts (name, message, category) VALUES
  ('CyberDev_99', 'The 3D interactive neon canvas is absolutely mindblowing! Love the floating glowing toruses and dark cyberpunk aesthetic! 🚀⚡', '🚀 Feature'),
  ('Aria Vance', 'Would be awesome if we could customize our card neon color themes based on user profile badges or karma score! 💡', '💡 Idea'),
  ('Nexus_Seeker', 'Smooth glassmorphism cards and responsive mouse tilt animations make reading feedback feel like navigating a sci-fi HUD.', '💬 Feedback'),
  ('Sarah Connor', 'Shoutout to the creator for building such a clean Next.js + Three.js integration with real-time feedback capabilities! ❤️', '❤️ Shoutout');
