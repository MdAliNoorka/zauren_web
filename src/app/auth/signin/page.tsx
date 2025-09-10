import { SignInForm } from '@/components/auth'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary-100/20 to-transparent dark:from-primary-900/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent-100/20 to-transparent dark:from-accent-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <span className="text-3xl font-semibold font-mono gradient-text">Zauren</span>
            </div>
          </Link>
        </div>

        {/* Sign In Form */}
        <SignInForm />

        {/* Additional Links */}
        <div className="mt-8 text-center space-y-2">
          <Link
            href="/"
            className="text-sm text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 font-mono transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
