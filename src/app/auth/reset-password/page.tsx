'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import { createClientComponent } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { cn } from '@/utils'
import { Lock, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react'
import { Navigation } from '@/components/ui/Navigation'

// Navigation items
const navItems = [
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

// Validation schema
const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isValidSession, setIsValidSession] = useState<boolean | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClientComponent()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const password = watch('password')

  // Check if user has a valid session for password reset
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error || !session) {
        setIsValidSession(false)
        return
      }
      
      setIsValidSession(true)
    }

    checkSession()
  }, [supabase])

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password
      })

      if (error) {
        throw error
      }

      setIsSuccess(true)
      
      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        router.push('/dashboard')
      }, 3000)
    } catch (error: any) {
      console.error('Password reset error:', error)
      setError(error.message || 'Failed to reset password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Loading state while checking session
  if (isValidSession === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-primary-50/30 to-accent-50/30 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  // Invalid session - show error
  if (!isValidSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-primary-50/30 to-accent-50/30 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950 relative overflow-hidden">
        <Navigation items={navItems} />
        
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-8 bg-gradient-to-br from-white/95 to-primary-50/80 dark:from-secondary-900/95 dark:to-secondary-800/80 backdrop-blur-lg border border-white/20 dark:border-secondary-700/20 shadow-xl">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto shadow-lg">
                <XCircle className="w-8 h-8 text-white" />
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
                  Invalid Reset Link
                </h1>
                <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">
                  This password reset link is invalid or has expired. Please request a new one.
                </p>
              </div>

              <Button
                onClick={() => router.push('/auth/forgot-password')}
                className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-mono"
              >
                Request New Reset Link
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  // Success state
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-primary-50/30 to-accent-50/30 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950 relative overflow-hidden">
        <Navigation items={navItems} />
        
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-8 bg-gradient-to-br from-white/95 to-primary-50/80 dark:from-secondary-900/95 dark:to-secondary-800/80 backdrop-blur-lg border border-white/20 dark:border-secondary-700/20 shadow-xl">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mx-auto shadow-lg shadow-primary-500/25">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
                  Password Reset Successful!
                </h1>
                <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">
                  Your password has been successfully updated. You'll be redirected to your dashboard shortly.
                </p>
              </div>

              <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950/50 dark:to-accent-950/50 rounded-lg p-4 border border-primary-200/30 dark:border-primary-800/30">
                <p className="text-sm text-secondary-700 dark:text-secondary-300">
                  Redirecting to dashboard in a few seconds...
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-primary-50/30 to-accent-50/30 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950 relative overflow-hidden">
      <Navigation items={navItems} />
      
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-primary-400/15 to-accent-400/15 rounded-full blur-lg"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-accent-400/10 to-primary-400/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-primary-400/20 to-accent-400/20 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-br from-accent-400/15 to-primary-400/15 rounded-full blur-md"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 bg-gradient-to-br from-white/95 to-primary-50/80 dark:from-secondary-900/95 dark:to-secondary-800/80 backdrop-blur-lg border border-white/20 dark:border-secondary-700/20 shadow-xl">
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mx-auto shadow-lg shadow-primary-500/25">
                <Lock className="w-8 h-8 text-white" />
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
                  Set New Password
                </h1>
                <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">
                  Choose a strong password to secure your account.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 font-mono">
                  New Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your new password"
                    className={cn(
                      'font-mono pr-12',
                      errors.password && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    )}
                    {...register('password')}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600 dark:text-red-400 font-mono">
                    {errors.password.message}
                  </p>
                )}
                
                {/* Password strength indicator */}
                {password && (
                  <div className="space-y-2">
                    <div className="text-xs text-secondary-600 dark:text-secondary-400 font-mono">
                      Password strength:
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        password.length >= 8,
                        /[A-Z]/.test(password),
                        /[a-z]/.test(password) && /\d/.test(password),
                      ].map((met, index) => (
                        <div
                          key={index}
                          className={cn(
                            'h-1 rounded-full transition-colors',
                            met 
                              ? 'bg-gradient-to-r from-primary-500 to-accent-500' 
                              : 'bg-secondary-200 dark:bg-secondary-700'
                          )}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 font-mono">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your new password"
                    className={cn(
                      'font-mono pr-12',
                      errors.confirmPassword && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    )}
                    {...register('confirmPassword')}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600 dark:text-red-400 font-mono">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-sm text-red-600 dark:text-red-400 font-mono">
                    {error}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-mono"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Updating Password...
                  </div>
                ) : (
                  'Update Password'
                )}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
}
