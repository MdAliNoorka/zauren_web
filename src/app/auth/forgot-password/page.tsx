'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { z } from 'zod'
import { createClientComponent } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { cn } from '@/utils'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import { Navigation } from '@/components/ui/Navigation'

// Navigation items
const navItems = [
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

// Validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponent()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) {
        setError(error.message)
      } else {
        setIsSuccess(true)
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendEmail = async () => {
    const email = getValues('email')
    if (!email) {
      setError('Please enter your email address first.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) {
        setError(error.message)
      } else {
        alert('Reset link sent again! Please check your email.')
      }
    } catch (err) {
      setError('Failed to resend email. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-primary-50/30 to-accent-50/30 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950 relative overflow-hidden">
      <Navigation items={navItems} />
      
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary-400/10 to-accent-400/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-accent-400/15 to-primary-400/15 rounded-full blur-lg"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-br from-primary-400/20 to-accent-400/20 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-br from-accent-400/10 to-primary-400/10 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 pt-32 pb-16 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md mx-4 p-8 bg-gradient-to-br from-white/95 to-primary-50/80 dark:from-secondary-900/95 dark:to-secondary-800/80 backdrop-blur-lg border border-white/20 dark:border-secondary-700/20 shadow-2xl">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-primary-500/25">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
                Reset Your Password
              </h1>
              <p className="text-sm text-secondary-600 dark:text-secondary-300">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            {isSuccess ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-green-500/25">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-secondary-900 dark:text-white">
                    Check Your Email
                  </h2>
                  <p className="text-sm text-secondary-600 dark:text-secondary-300">
                    We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
                  </p>
                  <p className="text-xs text-secondary-500 dark:text-secondary-400">
                    Don't see the email? Check your spam folder or try again.
                  </p>
                </div>
                <div className="space-y-3">
                  <Button
                    onClick={handleResendEmail}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-700 hover:to-secondary-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-mono"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Resending...
                      </div>
                    ) : (
                      'Resend Email'
                    )}
                  </Button>
                  
                  <Link 
                    href="/auth/signin"
                    className="inline-flex items-center justify-center w-full text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 underline font-semibold font-mono"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Sign In
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-secondary-700 dark:text-secondary-300 font-mono">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      {...register('email')}
                      className={cn(
                        'bg-gradient-to-r from-white/90 to-primary-50/90 dark:from-secondary-800/90 dark:to-secondary-700/90 backdrop-blur-sm border border-primary-200/50 dark:border-secondary-600/50 focus:border-primary-500 dark:focus:border-primary-400 shadow-lg',
                        errors.email && 'border-red-500 focus:border-red-500'
                      )}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 dark:text-red-400 font-mono">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {error && (
                    <div className="p-3 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/50 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-sm text-red-700 dark:text-red-400 font-mono">
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
                        Sending Reset Link...
                      </div>
                    ) : (
                      'Send Reset Link'
                    )}
                  </Button>
                </form>

                <div className="text-center">
                  <Link 
                    href="/auth/signin"
                    className="inline-flex items-center text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 underline font-semibold font-mono"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Sign In
                  </Link>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
