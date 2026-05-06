import { createClient } from '@supabase/supabase-js';

// Sanitiza a URL: remove trailing slash e qualquer sufixo /rest/v1 acidental
// que causaria a rota mutante /rest/v1/auth/v1/token → 404
const rawUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');

const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ [MQ ACCESS] Faltam variáveis de ambiente do Supabase (.env)');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
