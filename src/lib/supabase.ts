import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Some features may not work.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);

// Database types for TISA Brain
export interface GeneratedContent {
  id: string;
  created_at: string;
  type: 'instagram' | 'tour_script' | 'objection' | 'email' | 'document';
  pillar: string;
  profile: string;
  psychology: string;
  input: string;
  output: string;
  rating?: number;
}

export interface Scenario {
  id: string;
  created_at: string;
  title: string;
  context: string;
  conversation: Array<{ role: 'user' | 'assistant'; content: string }>;
  resolved: boolean;
}
