import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://xlvupkicpjpatmdkmqrd.supabase.co";
const supabaseAnonKey = "sb_publishable_77Z7SIeXDv_NbEs7VTakMg_sDjqwTb8";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase as s };
