import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string
          name: string
          email: string
          company: string | null
          subject: string
          message: string
          created_at: string
          status: 'new' | 'read' | 'replied'
        }
        Insert: {
          id?: string
          name: string
          email: string
          company?: string | null
          subject: string
          message: string
          created_at?: string
          status?: 'new' | 'read' | 'replied'
        }
        Update: {
          id?: string
          name?: string
          email?: string
          company?: string | null
          subject?: string
          message?: string
          created_at?: string
          status?: 'new' | 'read' | 'replied'
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          created_at: string
          confirmed: boolean
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          confirmed?: boolean
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          confirmed?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Singleton client instance to prevent multiple GoTrueClient instances
let clientInstance: any = null

// Client component Supabase client (for use in client components)
export const createClientComponent = () => {
  // Return existing instance if already created
  if (clientInstance) {
    return clientInstance
  }

  // Only create client if environment variables are properly set
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    clientInstance = createClientComponentClient<Database>()
    return clientInstance
  }
  
  // Return a mock client for build time
  clientInstance = createClient<Database>(supabaseUrl, supabaseAnonKey)
  return clientInstance
}

// Legacy export for backward compatibility
export const supabase = createClientComponent()
