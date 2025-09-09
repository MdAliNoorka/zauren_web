import { createClient } from '@supabase/supabase-js'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from './supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Server component Supabase client (for use in server components)
export const createServerClient = () => {
  // Only create client if environment variables are properly set
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return createServerComponentClient<Database>({ cookies })
  }
  // Return a mock client for build time
  return createClient<Database>(supabaseUrl, supabaseAnonKey)
}

// For server-side operations with service key
export const createServiceClient = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key'
  return createClient<Database>(supabaseUrl, supabaseServiceKey)
}
