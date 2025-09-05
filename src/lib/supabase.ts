import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For server-side operations
export const createServiceClient = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(supabaseUrl, supabaseServiceKey)
}

// Database types (will be generated from Supabase schema)
export type Database = {
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
  }
}
