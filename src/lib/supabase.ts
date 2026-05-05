import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ [MQ ACCESS] Faltam variáveis de ambiente do Supabase (.env)');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
