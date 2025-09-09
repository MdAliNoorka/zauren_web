'use client'

import { Navigation } from '@/components/ui/Navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { InteractiveChat } from '@/components/ui/InteractiveChat'
import { CompactAnalytics } from '@/components/ui/CompactAnalytics'
import { DynamicPlatforms } from '@/components/ui/DynamicPlatforms'
import { AnimatedStatsSimple } from '@/components/ui/AnimatedStatsSimple'
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
    title: 'Works Everywhere Your Customers Are',
    description: 'Your AI assistant automatically chats with customers on WhatsApp, Facebook, Instagram, and any other messaging app they use. One setup, everywhere.',
  },
  {
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Gets Smarter Every Day',
    description: 'The AI learns about your business and remembers what your customers like. It gets better at helping them over time, just like a great employee would.',
  },
  {
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Handles Everything for You',
    description: 'From answering questions about your products to helping customers place orders and track deliveries - your AI does it all automatically.',
  },
  {
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Always Has the Right Information',
    description: 'Connected to your business systems, so customers always get accurate details about what you have in stock, current prices, and delivery times.',
  },
  {
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Never Sleeps, Never Takes a Break',
    description: 'Your AI assistant helps customers 24 hours a day, 7 days a week. Even when you\'re sleeping, it\'s making sales and keeping customers happy.',
  },
  {
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'See How Well It\'s Working',
    description: 'Simple reports show you how many customers your AI helped, how much it sold, and what questions come up most often. Easy to understand, helpful for growing.',
  },
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
                <h1 className="text-4xl lg:text-6xl font-black text-balance leading-tight">
                  <span className="block text-secondary-900 dark:text-white">Transform Your</span>
                  <span className="block text-secondary-900 dark:text-white">Customer Service</span>
                  <span className="block bg-gradient-to-r from-primary-600 via-accent-500 to-primary-700 bg-clip-text text-transparent bg-300% animate-gradient-shift">with Smart AI</span>
                </h1>
                <p className="text-lg lg:text-xl text-secondary-600 dark:text-secondary-300 max-w-2xl text-balance leading-relaxed font-medium">
                  Just give us access to your business information and let our <span className="text-primary-600 dark:text-primary-400 font-semibold relative inline-block">
                    <span className="absolute inset-0 bg-gradient-to-r from-primary-200 to-accent-200 dark:from-primary-800 dark:to-accent-800 rounded-sm animate-pulse opacity-30"></span>
                    <span className="relative">smart AI assistants</span>
                  </span> chat with customers, answer questions, and boost your sales automatically.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-10 py-5 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 shadow-2xl shadow-primary-500/25 transform hover:scale-105 transition-all duration-300">
                  <span className="mr-2">Get Started Now</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-10 py-5 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white shadow-lg transform hover:scale-105 transition-all duration-300 relative overflow-hidden group">
                  <span className="mr-2 flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-live-blink"></div>
                    Live Demo
                  </span>
                  <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
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
                <InteractiveChat />
                
                {/* Real-time Analytics Dashboard */}
                <div className="transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                  <CompactAnalytics />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white dark:bg-secondary-900 relative">
        <div className="container-width">
          <AnimatedStatsSimple />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding bg-secondary-50 dark:bg-secondary-950 relative">
        <div className="container-width">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-2xl lg:text-4xl font-bold mb-6">
              Why Choose <span className="text-primary-600 dark:text-accent-400">Zauren</span>?
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto text-balance">
              We make it simple - just share your business details with us and we'll set up everything for you. No technical knowledge needed, just better customer service and more sales.
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

      {/* How It Works Section */}
      <section className="section-padding bg-gradient-to-br from-secondary-50 via-primary-50/30 to-accent-50/30 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="border border-primary-600/20 dark:border-primary-400/20"></div>
            ))}
          </div>
        </div>
        
        <div className="container-width relative z-10">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-2xl lg:text-4xl font-bold mb-6">
              How <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">It Works</span>
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
              Getting started is super simple: just share your business information with us and we'll handle all the technical setup. No complicated steps.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                step: "01",
                title: "Share Your Business Info",
                description: "Tell us about your products, services, and how you like to communicate with customers. We'll take care of connecting everything.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                ),
              },
              {
                step: "02", 
                title: "We Build Your AI Assistant",
                description: "Our team creates a smart assistant that knows everything about your business. You don't need to learn anything technical - we handle it all.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Watch Your Business Grow", 
                description: "Your AI assistant starts helping customers right away - day and night. More happy customers, more sales, while you focus on running your business.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              }
            ].map((item, index) => (
              <div key={item.step} className={`relative animate-slide-up animation-delay-${index * 100}`}>
                <Card className="h-full p-8 bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm border border-primary-200/30 dark:border-primary-800/30 hover:scale-105 transition-transform duration-300">
                  <CardContent>
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center text-white mr-4">
                        {item.icon}
                      </div>
                      <div className="text-4xl font-bold font-mono text-primary-600/30 dark:text-primary-400/30">
                        {item.step}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-secondary-900 dark:text-white font-mono">
                      {item.title}
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Connection Line */}
                {index < 2 && (
                  <div className={`hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transform -translate-y-1/2 z-10 animate-slide-up animation-delay-${index * 100 + 200} opacity-0 animate-fade-in`}>
                    <div className={`absolute right-0 top-1/2 w-2 h-2 bg-accent-500 rounded-full transform translate-x-1 -translate-y-1/2 animate-pulse animation-delay-${index * 100 + 400}`}></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Integration Showcase */}
          <DynamicPlatforms />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-white dark:bg-secondary-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-white to-accent-50/50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900"></div>
        <div className="absolute inset-0 opacity-20 dark:opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container-width relative z-10">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-2xl lg:text-4xl font-bold mb-6">
              What Our <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Clients Say</span>
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
              Real businesses sharing how AI assistants transformed their customer service and boosted their sales.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "E-commerce Store Owner",
                company: "Fashion Hub",
                avatar: "SC",
                rating: 5,
                text: "Our AI assistant handles 80% of customer questions now. Sales went up 35% in just 2 months! Customers love getting instant answers, even at midnight.",
                metrics: { sales: "+35%", response: "24/7", satisfaction: "95%" }
              },
              {
                name: "Mike Rodriguez",
                role: "Restaurant Manager",
                company: "Bella Vista",
                avatar: "MR",
                rating: 5,
                text: "Game changer for our delivery business. The AI takes orders, checks availability, and even suggests add-ons. We're serving 50% more customers with the same staff.",
                metrics: { orders: "+50%", efficiency: "3x", errors: "-90%" }
              },
              {
                name: "Lisa Thompson",
                role: "Fitness Studio Owner",
                company: "FitLife Studio",
                avatar: "LT",
                rating: 5,
                text: "Before Zauren, I was answering the same questions all day. Now the AI handles bookings, class info, and payment issues. I can focus on actually training clients!",
                metrics: { bookings: "+40%", time: "5hrs/day", retention: "+25%" }
              }
            ].map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={`group animate-slide-up animation-delay-${index * 100}`}
              >
                <Card className="h-[520px] p-0 relative overflow-hidden bg-gradient-to-br from-white/95 via-white/90 to-primary-50/80 dark:from-secondary-800/95 dark:via-secondary-800/90 dark:to-secondary-700/80 backdrop-blur-xl border-2 border-primary-200/40 dark:border-primary-700/40 hover:scale-110 hover:border-primary-300/60 dark:hover:border-primary-600/60 transition-all duration-500 shadow-2xl hover:shadow-primary-500/20 dark:hover:shadow-primary-400/20">
                  {/* Advanced Tech Grid Background */}
                  <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]">
                    <div className="grid grid-cols-8 grid-rows-10 h-full w-full">
                      {Array.from({ length: 80 }).map((_, i) => (
                        <div key={i} className="border border-primary-600/30 dark:border-primary-400/30 relative">
                          {i % 7 === 0 && (
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Corner Indicators */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-primary-500/60 dark:border-primary-400/60"></div>
                  <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-primary-500/60 dark:border-primary-400/60"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-primary-500/60 dark:border-primary-400/60"></div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-primary-500/60 dark:border-primary-400/60"></div>

                  {/* Tech Status Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 opacity-60"></div>
                  
                  {/* Card Number Badge */}
                  <div className="absolute top-6 right-6 w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center text-white font-mono text-sm font-bold shadow-lg">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <CardContent className="p-8 relative z-10 h-full flex flex-col">
                    {/* Rating Stars */}
                    <div className="flex mb-6">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current mr-1" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-sm font-mono text-primary-600 dark:text-primary-400 opacity-70">5.0/5.0</span>
                    </div>

                    {/* Testimonial Text */}
                    <div className="flex-1 mb-6">
                      <div className="relative">
                        <div className="absolute -left-2 -top-2 text-6xl text-primary-200 dark:text-primary-800 font-serif leading-none">"</div>
                        <blockquote className="text-base text-secondary-700 dark:text-secondary-300 leading-relaxed pl-6 italic">
                          {testimonial.text}
                        </blockquote>
                        <div className="absolute -right-2 -bottom-4 text-6xl text-primary-200 dark:text-primary-800 font-serif leading-none">"</div>
                      </div>
                    </div>

                    {/* Metrics Dashboard */}
                    <div className="mb-6">
                      <div className="text-xs font-mono text-primary-600 dark:text-primary-400 mb-3 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        PERFORMANCE_METRICS.json
                      </div>
                      <div className="grid grid-cols-3 gap-3 p-4 bg-gradient-to-r from-primary-50/80 to-accent-50/80 dark:from-primary-900/30 dark:to-accent-900/30 rounded-lg border border-primary-200/50 dark:border-primary-700/50 backdrop-blur-sm">
                        {Object.entries(testimonial.metrics).map(([key, value]) => (
                          <div key={key} className="text-center group-hover:scale-105 transition-transform duration-300">
                            <div className="text-lg font-bold text-primary-600 dark:text-primary-400 font-mono leading-tight">
                              {value}
                            </div>
                            <div className="text-xs text-secondary-600 dark:text-secondary-400 capitalize font-medium tracking-wide">
                              {key}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Author Profile */}
                    <div className="flex items-center">
                      <div className="relative mr-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                          {testimonial.avatar}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-secondary-800"></div>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-secondary-900 dark:text-white text-sm">
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-secondary-600 dark:text-secondary-400 font-medium">
                          {testimonial.role}
                        </div>
                        <div className="text-xs text-primary-600 dark:text-primary-400 font-mono bg-primary-100/50 dark:bg-primary-900/30 px-2 py-1 rounded mt-1 inline-block">
                          @{testimonial.company.toLowerCase().replace(/\s+/g, '_')}
                        </div>
                      </div>
                      <div className="text-xs font-mono text-secondary-500 dark:text-secondary-400">
                        VERIFIED
                      </div>
                    </div>
                  </CardContent>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-accent-500/10 to-primary-500/10 blur-xl"></div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 animate-slide-up animation-delay-300">
            <div className="bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl p-8 border border-primary-200/30 dark:border-primary-800/30">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-secondary-900 dark:text-white">
                Ready to Join Them?
              </h3>
              <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-8 max-w-2xl mx-auto">
                Start your AI assistant today and watch your business grow like our successful clients.
              </p>
              <Button size="lg" className="text-lg px-10 py-5 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 shadow-2xl shadow-primary-500/25 transform hover:scale-105 transition-all duration-300">
                <span className="mr-2">Get Started Free</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
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
