'use client'

import * as React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signUpSchema, type SignUpFormData } from '@/lib/auth-schemas'
import { createClientComponent } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { cn } from '@/utils'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'

interface SignUpFormProps {
  className?: string
  onSuccess?: () => void
  redirectTo?: string
}

export function SignUpForm({ className, onSuccess, redirectTo = '/' }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClientComponent()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  })

  const signUpWithGoogle = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectTo)}`,
        },
      })
      
      if (error) throw error
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      console.log('🎯 Signing up with NEW PROJECT...')
      
      // Signup with user metadata for the trigger
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?redirect=/dashboard`,
          data: {
            full_name: data.name,
            terms_accepted: data.acceptTerms,
            terms_accepted_at: new Date().toISOString()
          }
        }
      })

      console.log('✅ Signup response:', { authData, authError })

      if (authError) {
        console.error('❌ Auth error:', authError)
        setError(authError.message)
        return
      }

      if (authData.user) {
        console.log('🎉 User created in new project:', authData.user.id)
        
        // The trigger should handle profile creation automatically
        if (authData.session) {
          // User is logged in immediately
          console.log('✅ User has session, redirecting...')
          onSuccess?.()
          router.push(redirectTo)
        } else {
          // Email confirmation required
          console.log('📧 Email confirmation required - check your email!')
          setSuccess(true)
        }
      }
    } catch (error: any) {
      console.error('❌ Sign up error:', error)
      setError(`Sign up failed: ${error.message || 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <Card className={cn('p-8 max-w-md w-full mx-auto text-center backdrop-blur-sm bg-white/90 dark:bg-secondary-900/90 border border-white/20 dark:border-secondary-800/30 shadow-2xl', className)}>
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold font-mono gradient-text mb-2">Check Your Email</h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            We've sent you a confirmation link. Please check your email and click the link to activate your account.
          </p>
        </div>
        
        <Button
          variant="primary"
          size="lg"
          className="w-full font-mono transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          onClick={() => router.push('/auth/signin')}
        >
          Continue to Sign In
        </Button>
      </Card>
    )
  }

  return (
    <Card className={cn('p-8 max-w-md w-full mx-auto backdrop-blur-sm bg-white/90 dark:bg-secondary-900/90 border border-white/20 dark:border-secondary-800/30 shadow-2xl', className)}>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold font-mono gradient-text mb-2">Create Account</h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Join Zauren and transform your customer service
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400 text-sm font-mono">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-mono font-medium mb-2 text-secondary-700 dark:text-secondary-300">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 h-5 w-5" />
            <Input
              {...register('name')}
              type="text"
              placeholder="Enter your full name"
              className="pl-10 font-mono text-sm transition-all duration-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              disabled={isLoading}
            />
          </div>
          {errors.name && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-mono">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-mono font-medium mb-2 text-secondary-700 dark:text-secondary-300">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 h-5 w-5" />
            <Input
              {...register('email')}
              type="email"
              placeholder="Enter your email"
              className="pl-10 font-mono text-sm transition-all duration-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              disabled={isLoading}
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-mono">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-mono font-medium mb-2 text-secondary-700 dark:text-secondary-300">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 h-5 w-5" />
            <Input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              className="pl-10 pr-12 font-mono text-sm transition-all duration-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300 transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-mono">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-mono font-medium mb-2 text-secondary-700 dark:text-secondary-300">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 h-5 w-5" />
            <Input
              {...register('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              className="pl-10 pr-12 font-mono text-sm transition-all duration-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300 transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-mono">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-start">
            <input
              {...register('acceptTerms')}
              type="checkbox"
              id="acceptTerms"
              className="mt-1 h-4 w-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500 dark:border-secondary-600 dark:bg-secondary-700"
              disabled={isLoading}
            />
            <label htmlFor="acceptTerms" className="ml-3 block text-sm text-secondary-700 dark:text-secondary-300 font-mono">
              I agree to the{' '}
              <Link href="/terms" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 underline">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 underline">
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.acceptTerms && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-mono">
              {errors.acceptTerms.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full font-mono transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Creating Account...
            </div>
          ) : (
            'Create Account'
          )}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-secondary-300 dark:border-secondary-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-secondary-900 text-secondary-500 font-mono">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full font-mono transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:bg-primary-50 dark:hover:bg-primary-900/20"
          onClick={signUpWithGoogle}
          disabled={isLoading}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-secondary-600 dark:text-secondary-400 font-mono text-sm">
          Already have an account?{' '}
          <Link
            href="/auth/signin"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </Card>
  )
}
