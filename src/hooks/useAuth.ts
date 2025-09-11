'use client'

import { useEffect, useState, useCallback } from 'react'
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
  const [initialized, setInitialized] = useState(false)
  
  const supabase = createClientComponent()

  // Validate session using Edge Function
  const validateSession = async (): Promise<SessionData | null> => {
    try {
      const { data: { session: supabaseSession } } = await supabase.auth.getSession()
      
      if (!supabaseSession?.access_token) {
        return null
      }

      // Skip Edge Function validation for now to prevent loading issues
      // Use Edge Function for comprehensive session validation
      // const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/session-manager?action=validate`, {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${supabaseSession.access_token}`,
      //     'Content-Type': 'application/json',
      //   },
      // })

      // if (!response.ok) {
      //   throw new Error('Session validation failed')
      // }

      // const result = await response.json()
      
      // if (result.success && result.session.isActive) {
      //   return result.session
      // }
      
      // Simplified validation - just return user data if session exists
      return {
        user: supabaseSession.user,
        profile: null,
        isActive: true,
        lastActivity: new Date().toISOString()
      }
    } catch (error) {
      console.error('Session validation error:', error)
      return null
    }
  }

  // Refresh session data
  const refreshSession = useCallback(async (skipLoading = false) => {
    if (!skipLoading && !initialized) {
      setLoading(true)
    }
    
    try {
      const { data: { session: supabaseSession }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Session error:', error)
        setUser(null)
        setProfile(null)
        setSession(null)
        setIsAuthenticated(false)
        setInitialized(true)
        return
      }
      
      if (supabaseSession?.user) {
        // Only update if session actually changed
        if (!session || session.access_token !== supabaseSession.access_token) {
          setSession(supabaseSession)
          setUser(supabaseSession.user)
          setProfile(null) // Simplified - no profile for now
          setIsAuthenticated(true)
          console.log('✅ Session updated:', supabaseSession.user.email)
        }
      } else {
        if (isAuthenticated) {
          setUser(null)
          setProfile(null)
          setSession(null)
          setIsAuthenticated(false)
          console.log('❌ Session expired')
        }
      }
    } catch (error) {
      console.error('Session refresh error:', error)
      setUser(null)
      setProfile(null)
      setSession(null)
      setIsAuthenticated(false)
    } finally {
      if (!skipLoading && !initialized) {
        setLoading(false)
        setInitialized(true)
      }
    }
  }, [supabase, session, isAuthenticated, initialized])

  // Sign out using Edge Function
  const signOut = async () => {
    try {
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

  // Update user profile using direct Supabase calls
  const updateProfile = async (profileData: Partial<UserProfile>): Promise<boolean> => {
    try {
      const { data: { session: supabaseSession } } = await supabase.auth.getSession()
      
      if (!supabaseSession?.access_token) {
        return false
      }

      // For now, just update local state
      // TODO: Implement proper profile updates when user_profiles table exists
      console.log('Profile update requested:', profileData)
      return true
    } catch (error) {
      console.error('Profile update error:', error)
      return false
    }
  }

  useEffect(() => {
    let mounted = true

    // Get initial session
    const getInitialSession = async () => {
      if (mounted) {
        await refreshSession()
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: any, supabaseSession: any) => {
        if (!mounted) return
        
        console.log('Auth state change:', event)
        
        if (event === 'SIGNED_OUT' || !supabaseSession) {
          setUser(null)
          setProfile(null)
          setSession(null)
          setIsAuthenticated(false)
          setLoading(false)
          setInitialized(true)
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          // Update session data directly without refresh to prevent loops
          setSession(supabaseSession)
          setUser(supabaseSession.user)
          setProfile(null)
          setIsAuthenticated(true)
          setLoading(false)
          setInitialized(true)
          console.log('✅ Auth state updated:', supabaseSession.user.email)
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [supabase.auth]) // Remove refreshSession and session from dependencies

  // Periodic session validation (only when needed)
  useEffect(() => {
    if (initialized && isAuthenticated && user && session) {
      const interval = setInterval(() => {
        // Only refresh if user is still on the page and session exists
        if (document.visibilityState === 'visible') {
          refreshSession(true) // Skip loading state for background refreshes
        }
      }, 15 * 60 * 1000) // 15 minutes - longer interval

      return () => clearInterval(interval)
    }
  }, [initialized, isAuthenticated, user, session, refreshSession])

  return {
    user,
    session,
    profile,
    loading,
    isAuthenticated,
    initialized,
    signOut,
    refreshSession,
    updateProfile,
    supabase
  }
}
