/// <reference types="astro/client" />

import type { User, SupabaseClient } from '@supabase/supabase-js';

declare namespace App {
  interface Locals {
    // Injetado pelo middleware em todas as rotas /app/*
    user: User | null;
    supabase: SupabaseClient; // cliente SSR autenticado com cookies do request
  }
}
