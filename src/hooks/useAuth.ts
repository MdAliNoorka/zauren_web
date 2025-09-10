'use client'

import { useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { createClientComponent } from '@/lib/supabase'

interface UserProfile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  phone?: string
  company?: string
  job_title?: string
  bio?: string
  website?: string
  location?: string
  timezone?: string
  language?: string
  theme_preference?: string
  email_notifications?: boolean
  marketing_emails?: boolean
  terms_accepted?: boolean
  terms_accepted_at?: string
  email_confirmed?: boolean
  email_confirmed_at?: string
  last_sign_in_at?: string
  sign_in_count?: number
  created_at?: string
  updated_at?: string
}

interface SessionData {
  user: User | null
  profile: UserProfile | null
  isActive: boolean
  lastActivity: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  const supabase = createClientComponent()

  // Validate session using Edge Function
  const validateSession = async (): Promise<SessionData | null> => {
    try {
      const { data: { session: supabaseSession } } = await supabase.auth.getSession()
      
      if (!supabaseSession?.access_token) {
        return null
      }

      // Use Edge Function for comprehensive session validation
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/session-manager?action=validate`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${supabaseSession.access_token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Session validation failed')
      }

      const result = await response.json()
      
      if (result.success && result.session.isActive) {
        return result.session
      }
      
      return null
    } catch (error) {
      console.error('Session validation error:', error)
      return null
    }
  }

  // Refresh session data
  const refreshSession = async () => {
    setLoading(true)
    
    try {
      const { data: { session: supabaseSession } } = await supabase.auth.getSession()
      
      if (supabaseSession) {
        setSession(supabaseSession)
        setUser(supabaseSession.user)
        
        // Get enhanced session data from Edge Function
        const sessionData = await validateSession()
        
        if (sessionData && sessionData.isActive) {
          setProfile(sessionData.profile)
          setIsAuthenticated(true)
        } else {
          setProfile(null)
          setIsAuthenticated(false)
        }
      } else {
        setUser(null)
        setProfile(null)
        setSession(null)
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Session refresh error:', error)
      setUser(null)
      setProfile(null)
      setSession(null)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  // Sign out using Edge Function
  const signOut = async () => {
    try {
      const { data: { session: supabaseSession } } = await supabase.auth.getSession()
      
      if (supabaseSession?.access_token) {
        // Use Edge Function for logout tracking
        try {
          await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/session-manager?action=logout`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${supabaseSession.access_token}`,
              'Content-Type': 'application/json',
            },
          })
        } catch (edgeError) {
          console.log('Edge function logout tracking failed:', edgeError)
          // Continue with sign out even if tracking fails
        }
      }

      // Sign out from Supabase
      await supabase.auth.signOut()
      
      // Update local state
      setUser(null)
      setProfile(null)
      setSession(null)
      setIsAuthenticated(false)
      
      // Redirect to home page
      window.location.href = '/'
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  // Update user profile using Edge Function
  const updateProfile = async (profileData: Partial<UserProfile>): Promise<boolean> => {
    try {
      const { data: { session: supabaseSession } } = await supabase.auth.getSession()
      
      if (!supabaseSession?.access_token) {
        return false
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/session-manager?action=profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${supabaseSession.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData)
      })

      if (!response.ok) {
        return false
      }

      const result = await response.json()
      
      if (result.success) {
        setProfile(result.profile)
        return true
      }
      
      return false
    } catch (error) {
      console.error('Profile update error:', error)
      return false
    }
  }

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      await refreshSession()
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, supabaseSession) => {
        console.log('Auth state change:', event)
        
        if (event === 'SIGNED_OUT' || !supabaseSession) {
          setUser(null)
          setProfile(null)
          setSession(null)
          setIsAuthenticated(false)
          setLoading(false)
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          // Refresh session data when signed in or token refreshed
          await refreshSession()
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  // Periodic session validation (every 5 minutes) when authenticated
  useEffect(() => {
    if (isAuthenticated && !loading) {
      const interval = setInterval(() => {
        refreshSession()
      }, 5 * 60 * 1000) // 5 minutes

      return () => clearInterval(interval)
    }
  }, [isAuthenticated, loading])

  return {
    user,
    session,
    profile,
    loading,
    isAuthenticated,
    signOut,
    refreshSession,
    updateProfile,
    supabase
  }
}
