'use client'

import { Navigation } from '@/components/ui/Navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import Link from 'next/link'

// Navigation items
const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
  { label: 'Dashboard', href: '/dashboard' },
]

// Features data
const features = [
  {
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: 'Universal Platform Integration',
    description: 'Connect with customers on WhatsApp, Facebook Messenger, Instagram, or any digital platform your business and clients prefer—no limitations.',
  },
  {
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Smart Learning AI',
    description: 'Advanced AI that remembers customer preferences, purchase history, and provides personalized responses for better customer experience.',
  },
  {
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'End-to-End Automation',
    description: 'From product inquiries to payment processing and delivery coordination - handle the complete customer journey automatically.',
  },
  {
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Real-time Integration',
    description: 'Direct access to your inventory, order management, and customer database for accurate, up-to-date information.',
  },
  {
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '24/7 Availability',
    description: 'Never miss a customer inquiry. AI agents work around the clock to provide instant responses and support.',
  },
  {
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Advanced Analytics',
    description: 'Comprehensive analytics on customer interactions, sales performance, and AI agent effectiveness to optimize your business.',
  },
]

// Stats data
const stats = [
  { label: 'Response Time', value: '< 2s', description: 'Average AI response time' },
  { label: 'Customer Satisfaction', value: '98%', description: 'AI interaction satisfaction rate' },
  { label: 'Sales Conversion', value: '+45%', description: 'Increase in conversion rates' },
  { label: 'Operating Costs', value: '-60%', description: 'Reduction in support costs' },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-secondary-950">
      <Navigation 
        items={navItems}
        logo={
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">Z</span>
          </div>
        }
      />

      {/* Hero Section */}
      <section className="section-padding pt-32 lg:pt-40 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-primary-400/10 to-accent-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        {/* Tech Grid Overlay */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="border border-primary-600/20 dark:border-primary-400/20"></div>
            ))}
          </div>
        </div>
        
        <div className="container-width relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-50 dark:bg-primary-900/30 rounded-md border border-primary-200 dark:border-primary-700">
                  <span className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                    AI-Powered
                  </span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-black text-balance leading-tight">
                  <span className="block text-secondary-900 dark:text-white">Replace Customer</span>
                  <span className="block text-secondary-900 dark:text-white">Service with</span>
                  <span className="block bg-gradient-to-r from-primary-600 via-accent-500 to-primary-700 bg-clip-text text-transparent animate-pulse">AI Agents</span>
                </h1>
                <p className="text-xl lg:text-2xl text-secondary-600 dark:text-secondary-300 max-w-2xl text-balance leading-relaxed font-medium">
                  Empower your business with <span className="text-primary-600 dark:text-primary-400 font-semibold">intelligent AI agents</span> that engage, assist, and convert customers—boosting sales and support on any digital platform.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-10 py-5 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 shadow-2xl shadow-primary-500/25 transform hover:scale-105 transition-all duration-300">
                  <span className="mr-2">Start Free Trial</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-10 py-5 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white shadow-lg transform hover:scale-105 transition-all duration-300">
                  <span className="mr-2">Watch Demo</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-secondary-600 dark:text-secondary-400">
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>24/7 support</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative animate-slide-up animation-delay-200">
              {/* Floating Background Elements */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-primary-400/20 to-accent-400/20 rounded-full blur-xl animate-bounce delay-1000"></div>
                <div className="absolute bottom-20 left-5 w-16 h-16 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-full blur-lg animate-bounce delay-2000"></div>
                <div className="absolute top-1/2 left-10 w-12 h-12 bg-primary-500/30 rounded-full blur-md animate-pulse"></div>
              </div>
              
              <div className="relative z-10 space-y-6">
                {/* AI Chat Interface */}
                <Card className="p-6 bg-gradient-to-br from-white/90 to-white/70 dark:from-secondary-900/90 dark:to-secondary-800/70 backdrop-blur-xl border border-white/30 dark:border-secondary-700/30 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="text-xs text-secondary-500 font-mono bg-secondary-100 dark:bg-secondary-800 px-2 py-1 rounded relative overflow-hidden group animate-ai-badge hover:animate-glow-pulse transition-all duration-300">
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-live-blink"></div>
                          <span className="relative z-10">AI AGENT LIVE</span>
                          <div className="flex gap-0.5 ml-1">
                            <div className="w-0.5 h-0.5 bg-secondary-500 rounded-full animate-bounce"></div>
                            <div className="w-0.5 h-0.5 bg-secondary-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-0.5 h-0.5 bg-secondary-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-200/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">AI</span>
                        </div>
                        <div className="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 px-4 py-2 rounded-lg rounded-tl-none text-sm">
                          Hi! I'm your AI assistant. How can I help you today?
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 justify-end">
                        <div className="bg-secondary-100 dark:bg-secondary-700 text-secondary-800 dark:text-secondary-200 px-4 py-2 rounded-lg rounded-tr-none text-sm">
                          I need help with my order status
                        </div>
                        <div className="w-8 h-8 bg-secondary-300 dark:bg-secondary-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-secondary-600 dark:text-secondary-300 text-xs font-bold">U</span>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">AI</span>
                        </div>
                        <div className="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 px-4 py-2 rounded-lg rounded-tl-none text-sm">
                          <div className="flex items-center space-x-2">
                            <div className="animate-pulse flex space-x-1">
                              <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                              <div className="w-2 h-2 bg-primary-600 rounded-full animation-delay-75"></div>
                              <div className="w-2 h-2 bg-primary-600 rounded-full animation-delay-150"></div>
                            </div>
                            <span className="text-xs opacity-70">AI is typing...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                
                {/* Analytics Dashboard Preview */}
                <Card className="p-6 bg-gradient-to-br from-white/90 to-white/70 dark:from-secondary-900/90 dark:to-secondary-800/70 backdrop-blur-xl border border-white/30 dark:border-secondary-700/30 shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-secondary-800 dark:text-secondary-200">Real-time Analytics</h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-600 dark:text-green-400 font-mono">LIVE</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">98%</div>
                        <div className="text-xs text-secondary-600 dark:text-secondary-400">Satisfaction</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-accent-600 dark:text-accent-400">2.1s</div>
                        <div className="text-xs text-secondary-600 dark:text-secondary-400">Response</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-secondary-600 dark:text-secondary-400">Conversations today</span>
                        <span className="text-secondary-800 dark:text-secondary-200 font-semibold">247</span>
                      </div>
                      <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full animate-pulse" style={{width: '78%'}}></div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white dark:bg-secondary-900 relative">
        <div className="container-width">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={stat.label} className="text-center p-6 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-secondary-800 dark:to-secondary-700 border border-primary-200/30 dark:border-primary-800/30 hover:scale-105 transition-transform duration-300">
                <CardContent>
                  <div className="text-3xl lg:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold text-secondary-900 dark:text-white mb-1">{stat.label}</div>
                  <div className="text-sm text-secondary-600 dark:text-secondary-400">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding bg-secondary-50 dark:bg-secondary-950 relative">
        <div className="container-width">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Why Choose <span className="text-primary-600 dark:text-accent-400">Zauren</span>?
            </h2>
            <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto text-balance">
              Our AI agents don't just answer questions - they transform your entire customer experience with intelligent, personalized interactions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`group animate-slide-up animation-delay-${index * 100}`}
              >
                <Card hover className="h-[420px] flex flex-col p-0 relative overflow-hidden bg-white dark:bg-secondary-900 border-primary-200/30 dark:border-primary-800/30">
                  {/* Tech Grid Background */}
                  <div className="absolute inset-0 opacity-5 dark:opacity-10">
                    <div className="grid grid-cols-6 grid-rows-6 h-full w-full">
                      {Array.from({ length: 36 }).map((_, i) => (
                        <div key={i} className="border border-primary-600/20 dark:border-primary-400/20"></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Card Number */}
                  <div className="absolute top-4 right-4 text-primary-600/60 dark:text-primary-400/60 font-mono text-sm font-bold">
                    0{index + 1}
                  </div>
                  
                  <CardContent className="flex flex-col h-full p-6 relative z-10">
                    {/* Icon Section */}
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mx-auto shadow-lg shadow-primary-500/25">
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl blur-sm -z-10"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-4 text-secondary-900 dark:text-white font-mono tracking-wide">{feature.title}</h3>
                        <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed text-sm">
                          {feature.description}
                        </p>
                      </div>
                      
                      {/* Learn More Button */}
                      <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <a href="#" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-primary-500/50 transition-all duration-200 transform hover:scale-105">
                          <span className="mr-2">Learn More</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                  
                  {/* Bottom Tech Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent"></div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-white/10"></div>
            ))}
          </div>
        </div>
        
        <div className="container-width text-center relative z-10">
          <div className="max-w-4xl mx-auto animate-slide-up">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Customer Service?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of businesses already using AI agents to boost sales and improve customer satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="text-lg px-10 py-5 border-2 border-white text-white hover:bg-white hover:text-primary-600 transform hover:scale-105 transition-all duration-300">
                Start Your Free Trial
              </Button>
              <Button size="lg" className="text-lg px-10 py-5 bg-white text-primary-600 hover:bg-primary-50 transform hover:scale-105 transition-all duration-300">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-padding bg-secondary-900 dark:bg-secondary-950 text-white">
        <div className="container-width">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Z</span>
                </div>
                <span className="text-xl font-bold">Zauren</span>
              </div>
              <p className="text-secondary-400">
                Empowering businesses with AI agents that transform customer service and boost sales.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-secondary-400">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-secondary-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-secondary-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/status" className="hover:text-white transition-colors">Status</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-secondary-800 mt-12 pt-8 text-center text-secondary-400">
            <p>&copy; 2024 Zauren. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
