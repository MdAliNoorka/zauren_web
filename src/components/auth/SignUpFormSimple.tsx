// Simplified SignUp component for testing new project

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface SignUpFormData {
  email: string
  password: string
}

interface SignUpFormProps {
  redirectTo?: string
  onSuccess?: () => void
}

export function SignUpForm({ redirectTo = '/dashboard', onSuccess }: SignUpFormProps) {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      console.log('🧪 Testing basic signup with NEW PROJECT...')
      console.log('Project URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
      
      // Absolute minimal signup for testing NEW PROJECT
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
      })

      console.log('✅ Signup response:', { authData, authError })

      if (authError) {
        console.error('❌ Auth error:', authError)
        setError(authError.message)
        return
      }

      if (authData.user) {
        console.log('🎉 User created successfully in NEW PROJECT:', authData.user.id)
        
        if (authData.session) {
          console.log('✅ User logged in immediately')
          onSuccess?.()
          router.push(redirectTo)
        } else {
          console.log('📧 Email confirmation required')
          setSuccess(true)
        }
      }
    } catch (error: any) {
      console.error('❌ Signup error:', error)
      setError(`Signup failed: ${error.message || 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="text-green-600 font-medium text-lg">
          🎉 SUCCESS! Account created in new project!
        </div>
        <div className="text-sm text-gray-600">
          ✅ Basic auth is working perfectly!<br/>
          📧 Please check your email to confirm your account.
        </div>
        <div className="text-xs text-blue-600 bg-blue-50 p-3 rounded">
          <strong>Next Step:</strong> Run the user_profiles SQL in Supabase Dashboard
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="text-sm text-blue-800">
          <strong>🧪 Testing New Project:</strong><br/>
          Project ID: <code>dlvcxajdrjobnyergown</code><br/>
          This should work without any 500 errors!
        </div>
      </div>
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1"
            placeholder="test@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={handleInputChange}
            className="mt-1"
            placeholder="password123"
          />
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-800">
              <strong>❌ Error:</strong> {error}
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? '🔄 Testing new project...' : '🧪 Test Basic Signup'}
        </Button>
      </form>
    </div>
  )
}
