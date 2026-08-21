import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if credentials are properly provided
export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'https://your-supabase-project.supabase.co' &&
    !supabaseUrl.includes('YOUR_SUPABASE')
  );
};

// Initialize Supabase client
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Initial mock thoughts for demo / fallback mode
export const MOCK_THOUGHTS = [
  {
    id: 'mock-1',
    name: 'CyberDev_99',
    message: 'The 3D interactive neon canvas is absolutely mindblowing! Love the floating glowing toruses and dark cyberpunk aesthetic! 🚀⚡',
    category: '🚀 Feature',
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    likes: 12
  },
  {
    id: 'mock-2',
    name: 'Aria Vance',
    message: 'Would be awesome if we could customize our card neon color themes based on user profile badges or karma score! 💡',
    category: '💡 Idea',
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    likes: 8
  },
  {
    id: 'mock-3',
    name: 'Nexus_Seeker',
    message: 'Smooth glassmorphism cards and responsive mouse tilt animations make reading feedback feel like navigating a sci-fi HUD.',
    category: '💬 Feedback',
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    likes: 19
  },
  {
    id: 'mock-4',
    name: 'Sarah Connor',
    message: 'Shoutout to the creator for building such a clean Next.js + Three.js integration with real-time feedback capabilities! ❤️',
    category: '❤️ Shoutout',
    created_at: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    likes: 15
  },
  {
    id: 'mock-5',
    name: 'QuantumCoder',
    message: 'Can we add real-time sound effects when hovering over 3D cards? The current submit audio chime is super slick!',
    category: '💡 Idea',
    created_at: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    likes: 6
  }
];
