'use client'

// Force dynamic rendering to avoid static generation errors
export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/ui/Navigation'
import { useAuthContext } from '@/contexts/AuthContext'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  Bot, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  Users, 
  TrendingUp,
  Zap,
  Shield,
  Clock,
  CheckCircle
} from 'lucide-react'

const navigationItems = [
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

const stats = [
  { label: 'AI Agents', value: '3', change: '+2 this month', icon: Bot },
  { label: 'Messages', value: '2,847', change: '+12% this week', icon: MessageSquare },
  { label: 'Response Time', value: '0.8s', change: '45% faster', icon: Clock },
  { label: 'Satisfaction', value: '98%', change: '+5% this month', icon: CheckCircle },
]

const quickActions = [
  {
    title: 'Create AI Agent',
    description: 'Set up a new AI assistant for your business',
    icon: Bot,
    action: 'Create Agent',
    gradient: 'from-blue-500 to-purple-500',
  },
  {
    title: 'View Analytics',
    description: 'Track performance and customer interactions',
    icon: BarChart3,
    action: 'View Reports',
    gradient: 'from-green-500 to-teal-500',
  },
  {
    title: 'Training Center',
    description: 'Improve your AI with business knowledge',
    icon: Zap,
    action: 'Start Training',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    title: 'Security Settings',
    description: 'Manage access and permissions',
    icon: Shield,
    action: 'Manage Security',
    gradient: 'from-purple-500 to-pink-500',
  },
]

function DashboardContent() {
  const { user, loading } = useAuthContext()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !loading && !user) {
      console.log('No user found, redirecting to signin...')
      router.push('/auth/signin')
    }
  }, [user, loading, router, mounted])

  // Show loading state
  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-primary-50/30 to-accent-50/30 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-secondary-600 dark:text-secondary-400 font-mono">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  // Show redirect message if no user (during redirect)
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-primary-50/30 to-accent-50/30 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-lg font-mono text-secondary-600 dark:text-secondary-400">Redirecting to sign in...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-primary-50/30 to-accent-50/30 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950 relative overflow-hidden">
      <Navigation items={navigationItems} />
      
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary-400/10 to-accent-400/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-accent-400/15 to-primary-400/15 rounded-full blur-lg"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-br from-primary-400/20 to-accent-400/20 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-br from-accent-400/10 to-primary-400/10 rounded-full blur-xl"></div>
      </div>

      <main className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="mb-12">
            <div className="text-center space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold font-mono text-secondary-900 dark:text-white">
                Welcome back,{' '}
                <span className="bg-gradient-to-r from-primary-600 via-accent-500 to-primary-700 bg-clip-text text-transparent">
                  {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                </span>
              </h1>
              <p className="text-lg font-sans text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">
                Your AI-powered customer service dashboard. Monitor performance, manage agents, and grow your business.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="p-6 bg-gradient-to-br from-white/95 to-primary-50/80 dark:from-secondary-900/95 dark:to-secondary-800/80 backdrop-blur-lg border border-white/20 dark:border-secondary-700/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-green-600 dark:text-green-400 font-semibold bg-green-50 dark:bg-green-950/50 px-2 py-1 rounded-full border border-green-200 dark:border-green-800">
                      {stat.change}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold font-mono text-secondary-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400 font-sans">
                      {stat.label}
                    </p>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Quick Actions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold font-mono text-secondary-900 dark:text-white mb-6 text-center">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <Card key={index} className="p-6 bg-gradient-to-br from-white/95 to-primary-50/80 dark:from-secondary-900/95 dark:to-secondary-800/80 backdrop-blur-lg border border-white/20 dark:border-secondary-700/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer">
                    <div className="space-y-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center mx-auto shadow-lg transition-transform group-hover:scale-110`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-center space-y-2">
                        <h3 className="font-semibold font-mono text-secondary-900 dark:text-white">
                          {action.title}
                        </h3>
                        <p className="text-sm font-sans text-secondary-600 dark:text-secondary-400">
                          {action.description}
                        </p>
                      </div>
                      <Button 
                        className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-mono text-sm"
                      >
                        {action.action}
                      </Button>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6 bg-gradient-to-br from-white/95 to-primary-50/80 dark:from-secondary-900/95 dark:to-secondary-800/80 backdrop-blur-lg border border-white/20 dark:border-secondary-700/20 shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold font-mono text-secondary-900 dark:text-white">
                    Recent Activity
                  </h3>
                  <TrendingUp className="w-5 h-5 text-primary-500" />
                </div>
                <div className="space-y-3">
                  {[
                    { action: 'New customer chat started', time: '2 minutes ago', type: 'chat' },
                    { action: 'AI Agent completed training', time: '1 hour ago', type: 'training' },
                    { action: 'Weekly report generated', time: '3 hours ago', type: 'report' },
                    { action: 'Customer satisfaction updated', time: '1 day ago', type: 'update' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-primary-50/50 to-accent-50/50 dark:from-primary-950/30 dark:to-accent-950/30 rounded-lg border border-primary-200/30 dark:border-primary-800/30">
                      <div className="space-y-1">
                        <p className="text-sm font-medium font-sans text-secondary-900 dark:text-white">
                          {activity.action}
                        </p>
                        <p className="text-xs text-secondary-500 dark:text-secondary-400 font-mono">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-white/95 to-primary-50/80 dark:from-secondary-900/95 dark:to-secondary-800/80 backdrop-blur-lg border border-white/20 dark:border-secondary-700/20 shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold font-mono text-secondary-900 dark:text-white">
                    AI Agent Status
                  </h3>
                  <Users className="w-5 h-5 text-primary-500" />
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Customer Support Bot', status: 'Active', messages: '1,247' },
                    { name: 'Sales Assistant', status: 'Active', messages: '892' },
                    { name: 'FAQ Helper', status: 'Training', messages: '708' },
                  ].map((agent, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-primary-50/50 to-accent-50/50 dark:from-primary-950/30 dark:to-accent-950/30 rounded-lg border border-primary-200/30 dark:border-primary-800/30">
                      <div className="space-y-1">
                        <p className="text-sm font-medium font-sans text-secondary-900 dark:text-white">
                          {agent.name}
                        </p>
                        <p className="text-xs text-secondary-500 dark:text-secondary-400 font-mono">
                          {agent.messages} messages today
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        agent.status === 'Active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-400 border border-green-200 dark:border-green-800'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/50 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800'
                      }`}>
                        {agent.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-primary-50/30 to-accent-50/30 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  return <DashboardContent />
}
