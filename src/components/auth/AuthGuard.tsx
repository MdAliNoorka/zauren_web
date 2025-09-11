'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/contexts/AuthContext'

interface AuthGuardProps {
  children: React.ReactNode
  redirectTo?: string
}

export function AuthGuard({ children, redirectTo = '/auth/signin' }: AuthGuardProps) {
  const { user, loading, initialized, isAuthenticated } = useAuthContext()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && initialized && !loading) {
      if (!isAuthenticated || !user) {
        console.log('AuthGuard: Unauthorized access, redirecting...')
        router.replace(redirectTo)
      }
    }
  }, [mounted, initialized, loading, isAuthenticated, user, router, redirectTo])

  // Show loading state while initializing or if not authenticated
  if (!mounted || !initialized || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-primary-50/30 to-accent-50/30 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-secondary-600 dark:text-secondary-400 font-mono">
            {!initialized ? 'Initializing...' : 'Loading...'}
          </p>
        </div>
      </div>
    )
  }

  // Don't render children if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-primary-50/30 to-accent-50/30 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-lg font-mono text-secondary-600 dark:text-secondary-400">Redirecting...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
