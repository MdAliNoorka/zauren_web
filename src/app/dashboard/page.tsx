import { createServerClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { Navigation } from '@/components/ui'

const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
]

export default async function DashboardPage() {
  const supabase = createServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-secondary-950">
      <Navigation items={navigationItems} />
      
      <main className="pt-32 pb-16">
        <div className="container-width section-padding">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold gradient-text mb-8">
              Welcome to your Dashboard
            </h1>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4 text-secondary-900 dark:text-secondary-100">
                  AI Agents
                </h2>
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  Manage your AI customer service agents
                </p>
                <button className="btn-primary">
                  View Agents
                </button>
              </div>
              
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4 text-secondary-900 dark:text-secondary-100">
                  Analytics
                </h2>
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  Track performance and customer interactions
                </p>
                <button className="btn-primary">
                  View Analytics
                </button>
              </div>
              
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4 text-secondary-900 dark:text-secondary-100">
                  Settings
                </h2>
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  Configure your account and preferences
                </p>
                <button className="btn-primary">
                  Open Settings
                </button>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-secondary-900 dark:text-secondary-100">
                Account Information
              </h2>
              <div className="space-y-2">
                <p className="text-secondary-600 dark:text-secondary-400">
                  <strong>Email:</strong> {session.user.email}
                </p>
                <p className="text-secondary-600 dark:text-secondary-400">
                  <strong>Name:</strong> {session.user.user_metadata?.full_name || 'Not provided'}
                </p>
                <p className="text-secondary-600 dark:text-secondary-400">
                  <strong>Account created:</strong> {new Date(session.user.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
