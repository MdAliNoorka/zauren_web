import { SignUpForm } from '@/components/auth'
import Link from 'next/link'

export default function SignUpPage() {
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
            <span className="text-3xl font-bold gradient-text">Zauren</span>
          </Link>
        </div>

        {/* Sign Up Form */}
        <SignUpForm />

        {/* Additional Links */}
        <div className="mt-8 text-center space-y-2">
          <Link
            href="/"
            className="text-sm text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
