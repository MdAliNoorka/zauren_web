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
