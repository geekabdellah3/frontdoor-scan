import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Detect if keys are properly configured (non-empty and not placeholders)
const isConfigured = 
  !!supabaseUrl && 
  !!supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-id.supabase.co' && 
  supabaseAnonKey !== 'your-actual-anon-public-key';

// If configured, use real keys; otherwise initialize with dummy placeholders to prevent SDK initialization errors.
export const supabase = createClient(
  isConfigured ? supabaseUrl : 'https://dummy-project.supabase.co',
  isConfigured ? supabaseAnonKey : 'dummy-anon-key'
);

/**
 * Returns true if real, user-provided Supabase credentials are configured.
 */
export function isSupabaseConfigured(): boolean {
  return isConfigured;
}
