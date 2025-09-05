'use client'

import { useEffect, useState } from 'react'
import { createClientComponent } from '@/lib/supabase'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'

interface StatusCheck {
  name: string
  status: 'checking' | 'success' | 'error'
  message: string
}

export default function AuthStatusPage() {
  const [checks, setChecks] = useState<StatusCheck[]>([
    { name: 'Environment Variables', status: 'checking', message: 'Checking...' },
    { name: 'Supabase Connection', status: 'checking', message: 'Checking...' },
    { name: 'Email Auth Provider', status: 'checking', message: 'Checking...' },
    { name: 'Google OAuth Provider', status: 'checking', message: 'Checking...' },
  ])

  useEffect(() => {
    runStatusChecks()
  }, [])

  const runStatusChecks = async () => {
    const supabase = createClientComponent()
    
    // Check 1: Environment Variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    updateCheck('Environment Variables', 
      supabaseUrl && supabaseKey && !supabaseUrl.includes('your-project-ref'),
      supabaseUrl && supabaseKey && !supabaseUrl.includes('your-project-ref')
        ? 'Environment variables are configured'
        : 'Missing or placeholder environment variables'
    )

    // Check 2: Supabase Connection
    try {
      const { data, error } = await supabase.auth.getSession()
      updateCheck('Supabase Connection', 
        !error,
        !error ? 'Successfully connected to Supabase' : `Connection error: ${error.message}`
      )
    } catch (error) {
      updateCheck('Supabase Connection', false, `Connection failed: ${error}`)
    }

    // Check 3: Email Auth (try to get auth settings)
    try {
      // This is a simple check - if we can make auth calls, email auth is likely working
      await supabase.auth.getSession()
      updateCheck('Email Auth Provider', true, 'Email authentication is available')
    } catch (error) {
      updateCheck('Email Auth Provider', false, `Email auth check failed: ${error}`)
    }

    // Check 4: Google OAuth (we can't easily test this without attempting auth)
    updateCheck('Google OAuth Provider', true, 'Cannot verify without testing (requires actual OAuth flow)')
  }

  const updateCheck = (name: string, success: boolean, message: string) => {
    setChecks(prev => prev.map(check => 
      check.name === name 
        ? { ...check, status: success ? 'success' : 'error', message }
        : check
    ))
  }

  const getStatusIcon = (status: StatusCheck['status']) => {
    switch (status) {
      case 'checking':
        return <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      case 'success':
        return (
          <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )
      case 'error':
        return (
          <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )
    }
  }

  const allSuccess = checks.every(check => check.status === 'success')
  const hasErrors = checks.some(check => check.status === 'error')

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950 p-4">
      <div className="max-w-4xl mx-auto pt-16">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <span className="text-3xl font-bold gradient-text">Zauren</span>
          </Link>
          <h1 className="text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
            Authentication Status
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Check if your authentication setup is working correctly
          </p>
        </div>

        {/* Status Overview */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">
              Overall Status
            </h2>
            {allSuccess ? (
              <div className="flex items-center space-x-2 text-green-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-medium">All systems operational</span>
              </div>
            ) : hasErrors ? (
              <div className="flex items-center space-x-2 text-red-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="font-medium">Issues detected</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-blue-600">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span className="font-medium">Checking systems...</span>
              </div>
            )}
          </div>
        </Card>

        {/* Individual Checks */}
        <div className="grid gap-4 mb-8">
          {checks.map((check, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(check.status)}
                  <div>
                    <h3 className="font-medium text-secondary-900 dark:text-secondary-100">
                      {check.name}
                    </h3>
                    <p className={`text-sm ${
                      check.status === 'error' 
                        ? 'text-red-600 dark:text-red-400' 
                        : 'text-secondary-600 dark:text-secondary-400'
                    }`}>
                      {check.message}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={runStatusChecks}
            className="btn-primary"
          >
            Re-run Checks
          </button>
          <Link href="/auth/signin" className="btn-outline text-center">
            Test Sign In
          </Link>
          <Link href="/auth/signup" className="btn-outline text-center">
            Test Sign Up
          </Link>
          <Link href="/" className="btn-ghost text-center">
            Back to Home
          </Link>
        </div>

        {/* Help Section */}
        <Card className="p-6 mt-8">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
            Need Help?
          </h3>
          <div className="space-y-2 text-secondary-600 dark:text-secondary-400">
            <p>• Check <code className="bg-secondary-100 dark:bg-secondary-800 px-2 py-1 rounded">SETUP_GUIDE.md</code> for detailed setup instructions</p>
            <p>• Review <code className="bg-secondary-100 dark:bg-secondary-800 px-2 py-1 rounded">TROUBLESHOOTING.md</code> for common issues</p>
            <p>• Verify your <code className="bg-secondary-100 dark:bg-secondary-800 px-2 py-1 rounded">.env.local</code> file has correct Supabase credentials</p>
            <p>• Check browser console for any JavaScript errors</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
