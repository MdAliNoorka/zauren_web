'use client'

import * as React from 'react'
import { useAuth } from '@/hooks/useAuth'

interface AuthContextType {
  user: any
  session: any
  loading: boolean
  signOut: () => Promise<void>
  supabase: any
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth()
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
