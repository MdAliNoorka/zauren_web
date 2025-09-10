'use client'

import { Navigation } from '@/components/ui/Navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { InteractiveChat } from '@/components/ui/InteractiveChat'
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
    <main className="min-h-screen bg-white dark:bg-secondary-950" style={{zoom: '0.9'}}>
      {/* Global Smooth Scrolling Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          * {
            scroll-behavior: smooth;
          }
          
          html {
            scroll-behavior: smooth;
          }
          
          body {
            scroll-behavior: smooth;
          }
          
          /* Enhanced smooth scrolling for all elements */
          *, *::before, *::after {
            transition-property: transform, opacity, background-color, border-color, color, fill, stroke, box-shadow;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 150ms;
          }
          
          /* Smoother hover transitions */
          [class*="hover:"]:hover {
            transition-duration: 200ms;
          }
          
          /* Performance optimizations */
          .animate-pulse, .animate-bounce {
            will-change: transform;
          }
          
          /* Smooth transforms */
          [class*="transform"], [class*="rotate"], [class*="scale"] {
            will-change: transform;
            backface-visibility: hidden;
          }
        `
      }} />
      
      <Navigation 
        items={navItems}
        logo={
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">Z</span>
          </div>
        }
      />

      {/* Hero Section */}
      <section className="section-padding pt-32 sm:pt-28 lg:pt-32 pb-20 lg:pb-28 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-48 h-48 bg-primary-400/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-accent-400/10 rounded-full blur-2xl"></div>
        </div>
        
        {/* Tech Grid Overlay */}
        <div className="absolute inset-0 opacity-3 dark:opacity-5">
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-primary-600/10 dark:border-primary-400/10"></div>
            ))}
          </div>
        </div>
        
        <div className="container-width relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6 animate-slide-up">
              <div className="space-y-6">
                <h1 className="text-2xl lg:text-4xl font-semibold font-mono text-balance leading-tight">
                  <span className="block text-secondary-900 dark:text-white">Transform Your</span>
                  <span className="block text-secondary-900 dark:text-white">Customer Service</span>
                  <span className="block bg-gradient-to-r from-primary-600 via-accent-500 to-primary-700 bg-clip-text text-transparent">with Smart AI</span>
                </h1>
                <p className="text-base lg:text-lg text-secondary-600 dark:text-secondary-300 max-w-xl text-balance leading-relaxed">
                  Just give us access to your business information and let our <span className="text-primary-600 dark:text-primary-400 font-semibold">smart AI assistants</span> chat with customers, answer questions, and boost your sales automatically.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-sm px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <span className="mr-2">Get Started Now</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
                <Button variant="outline" size="lg" className="text-sm px-6 py-3 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white shadow transform hover:scale-105 transition-all duration-300">
                  <span className="mr-2 flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    Live Demo
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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
                <div className="absolute top-10 right-5 w-16 h-16 bg-gradient-to-br from-primary-400/15 to-accent-400/15 rounded-full blur-lg"></div>
                <div className="absolute bottom-16 left-5 w-12 h-12 bg-gradient-to-br from-accent-400/15 to-primary-400/15 rounded-full blur-md"></div>
              </div>
              
              <div className="relative z-10 space-y-4 flex flex-col items-center">
                {/* AI Chat Interface */}
                <InteractiveChat />
                
                {/* Demo Notice */}
                <div className="transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                  <Card className="p-4 bg-gradient-to-r from-white/95 to-primary-50/80 dark:from-secondary-900/95 dark:to-secondary-800/80 backdrop-blur-lg border border-white/20 dark:border-secondary-700/20 shadow-lg">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-secondary-800 dark:text-secondary-200">
                        Try our AI assistant above! Response time shown in the chat header.
                      </span>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Stats Section */}
      <section className="py-20 lg:py-24 bg-white dark:bg-secondary-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold font-mono text-secondary-900 dark:text-white mb-4">
              What We're Building
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">
              We're a new company focused on creating the best AI assistant experience for small businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { 
                value: '2025', 
                label: 'Founded This Year',
                icon: '🚀'
              },
              { 
                value: '24/7', 
                label: 'AI Never Sleeps',
                icon: '⏰'
              },
              { 
                value: '100%', 
                label: 'Focused on You',
                icon: '🎯'
              }
            ].map((stat, index) => (
              <div key={index} className="text-center p-8 bg-gradient-to-br from-primary-50 to-accent-50/50 dark:from-secondary-800 dark:to-primary-900/20 rounded-xl border border-primary-200/30 dark:border-primary-800/30 hover:scale-105 transition-all duration-300">
                <div className="text-5xl mb-4">{stat.icon}</div>
                <div className="text-3xl lg:text-4xl font-bold font-mono text-primary-600 dark:text-primary-400 mb-2">
                  {stat.value}
                </div>
                <h3 className="text-lg font-semibold font-mono text-secondary-900 dark:text-white">
                  {stat.label}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding py-20 lg:py-28 bg-secondary-50 dark:bg-secondary-950 relative">
        <div className="container-width">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-lg lg:text-2xl font-semibold font-mono mb-6">
              Why Choose <span className="text-primary-600 dark:text-accent-400">Zauren</span>?
            </h2>
            <p className="text-base text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto text-balance">
              We make it simple - just share your business details with us and we'll set up everything for you. No technical knowledge needed, just better customer service and more sales.
            </p>
          </div>

          {/* Horizontal Carousel - Responsive */}
          <div className="relative">
            <div id="carousel-container" className="overflow-hidden">
              <div id="carousel-track" className="flex transition-transform duration-500 ease-in-out" style={{transform: 'translateX(0%)'}}>
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
                  >
                    <Card hover className="h-[420px] flex flex-col p-0 relative overflow-hidden bg-white dark:bg-secondary-900 border-primary-200/30 dark:border-primary-800/30">
                      {/* Tech Grid Background */}
                      <div className="absolute inset-0 opacity-2 dark:opacity-5">
                        <div className="grid grid-cols-4 grid-rows-4 h-full w-full">
                          {Array.from({ length: 16 }).map((_, i) => (
                            <div key={i} className="border border-primary-600/10 dark:border-primary-400/10"></div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Card Number */}
                      <div className="absolute top-4 right-4 text-primary-600/60 dark:text-primary-400/60 font-mono text-sm font-bold">
                        0{index + 1}
                      </div>
                      
                      <CardContent className="flex flex-col h-full p-6 relative z-10">
                        {/* Icon Section */}
                        <div className="relative mb-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mx-auto shadow-lg shadow-primary-500/25">
                            <feature.icon className="w-7 h-7 text-white" />
                          </div>
                          <div className="absolute -inset-2 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl blur-sm -z-10"></div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-lg font-bold mb-3 text-secondary-900 dark:text-white font-mono tracking-wide">{feature.title}</h3>
                            <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed text-sm">
                              {feature.description}
                            </p>
                          </div>
                          
                          {/* Learn More Button */}
                          <div className="mt-4">
                            <a href="#" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold font-mono text-sm rounded-lg shadow-lg hover:shadow-primary-500/50 transition-all duration-200 transform hover:scale-105">
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
            
            {/* Carousel Controls - Responsive */}
            <div className="flex justify-center items-center mt-6 space-x-4">
              <button 
                id="prev-btn"
                className="w-12 h-12 bg-white dark:bg-secondary-800 border-2 border-primary-200 dark:border-primary-800 rounded-full flex items-center justify-center hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  const track = document.getElementById('carousel-track') as HTMLElement;
                  const container = document.getElementById('carousel-container') as HTMLElement;
                  
                  if (!track || !container) return;
                  
                  // Determine cards per view based on screen size
                  const screenWidth = window.innerWidth;
                  let cardsPerView;
                  if (screenWidth < 640) cardsPerView = 1; // sm breakpoint
                  else if (screenWidth < 1024) cardsPerView = 2; // lg breakpoint  
                  else cardsPerView = 3;
                  
                  const movePercent = 100 / cardsPerView;
                  let currentTranslate = parseInt(track.style.transform.replace('translateX(', '').replace('%)', '')) || 0;
                  const newTranslate = Math.min(currentTranslate + movePercent, 0);
                  track.style.transform = `translateX(${newTranslate}%)`;
                  
                  // Update button states
                  const maxSlides = Math.max(0, features.length - cardsPerView);
                  const prevBtn = document.getElementById('prev-btn') as HTMLButtonElement;
                  const nextBtn = document.getElementById('next-btn') as HTMLButtonElement;
                  if (prevBtn) prevBtn.disabled = newTranslate >= 0;
                  if (nextBtn) nextBtn.disabled = newTranslate <= -(maxSlides * movePercent);
                }}
              >
                <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Dots Indicator - Responsive */}
              <div className="flex space-x-2">
                <script 
                  dangerouslySetInnerHTML={{
                    __html: `
                      window.addEventListener('DOMContentLoaded', function() {
                        function updateDots() {
                          const screenWidth = window.innerWidth;
                          let cardsPerView;
                          if (screenWidth < 640) cardsPerView = 1;
                          else if (screenWidth < 1024) cardsPerView = 2;
                          else cardsPerView = 3;
                          
                          const maxSlides = Math.max(1, ${features.length} - cardsPerView + 1);
                          const dotsContainer = document.querySelector('.dots-container');
                          if (dotsContainer) {
                            dotsContainer.innerHTML = '';
                            for (let i = 0; i < maxSlides; i++) {
                              const dot = document.createElement('div');
                              dot.className = 'w-2 h-2 rounded-full transition-colors duration-200 ' + (i === 0 ? 'bg-primary-500' : 'bg-primary-200 dark:bg-primary-800');
                              dotsContainer.appendChild(dot);
                            }
                          }
                        }
                        
                        updateDots();
                        window.addEventListener('resize', updateDots);
                      });
                    `
                  }}
                />
                <div className="dots-container flex space-x-2">
                  {/* Dots will be dynamically generated */}
                </div>
              </div>
              
              <button 
                id="next-btn"
                className="w-12 h-12 bg-white dark:bg-secondary-800 border-2 border-primary-200 dark:border-primary-800 rounded-full flex items-center justify-center hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  const track = document.getElementById('carousel-track') as HTMLElement;
                  const container = document.getElementById('carousel-container') as HTMLElement;
                  
                  if (!track || !container) return;
                  
                  // Determine cards per view based on screen size
                  const screenWidth = window.innerWidth;
                  let cardsPerView;
                  if (screenWidth < 640) cardsPerView = 1; // sm breakpoint
                  else if (screenWidth < 1024) cardsPerView = 2; // lg breakpoint
                  else cardsPerView = 3;
                  
                  const movePercent = 100 / cardsPerView;
                  const maxSlides = Math.max(0, features.length - cardsPerView);
                  const maxTranslate = -(maxSlides * movePercent);
                  let currentTranslate = parseInt(track.style.transform.replace('translateX(', '').replace('%)', '')) || 0;
                  const newTranslate = Math.max(currentTranslate - movePercent, maxTranslate);
                  track.style.transform = `translateX(${newTranslate}%)`;
                  
                  // Update button states
                  const prevBtn = document.getElementById('prev-btn') as HTMLButtonElement;
                  const nextBtn = document.getElementById('next-btn') as HTMLButtonElement;
                  if (prevBtn) prevBtn.disabled = newTranslate >= 0;
                  if (nextBtn) nextBtn.disabled = newTranslate <= maxTranslate;
                }}
              >
                <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding py-20 lg:py-28 bg-gradient-to-br from-secondary-50 via-primary-50/30 to-accent-50/30 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="border border-primary-600/20 dark:border-primary-400/20"></div>
            ))}
          </div>
        </div>
        
        <div className="container-width relative z-10">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-lg lg:text-2xl font-semibold font-mono mb-6">
              How <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">It Works</span>
            </h2>
            <p className="text-base text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
              Getting started is super simple: just share your business information with us and we'll handle all the technical setup. No complicated steps.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Scrollable Cards with Enhanced Scrollbar */}
            <div className="relative">
              <div 
                id="how-it-works-scroll"
                className="h-[500px] overflow-y-auto space-y-6 pr-4"
                style={{
                  scrollSnapType: 'y mandatory'
                }}
                onWheel={(e) => {
                  const container = e.currentTarget;
                  const isAtTop = container.scrollTop === 0;
                  const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 1;
                  
                  if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
                    // Allow page scrolling when at the boundaries
                    return;
                  } else {
                    // Prevent page scrolling when scrolling within container
                    e.stopPropagation();
                  }
                }}
              >
                {[
                  {
                    step: "01",
                    title: "Share Your Business Info",
                    description: "Tell us about your products, services, and how you like to communicate with customers. We'll take care of connecting everything. Our team will analyze your business needs and create a custom AI solution that perfectly matches your brand voice and customer service style.",
                    icon: (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    ),
                  },
                  {
                    step: "02", 
                    title: "We Build Your AI Assistant",
                    description: "Our team creates a smart assistant that knows everything about your business. You don't need to learn anything technical - we handle it all. The AI is trained on your specific products, services, and customer interaction patterns to provide accurate, helpful responses every time.",
                    icon: (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    ),
                  },
                  {
                    step: "03",
                    title: "Watch Your Business Grow", 
                    description: "Your AI assistant starts helping customers right away - day and night. More happy customers, more sales, while you focus on running your business. Watch as customer satisfaction increases and your support costs decrease, all while maintaining the personal touch your customers love.",
                    icon: (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    ),
                  }
                ].map((item, index) => (
                  <div 
                    key={item.step} 
                    className="min-h-[480px] flex items-center justify-center bg-white/90 dark:bg-secondary-800/90 backdrop-blur-sm rounded-2xl border border-primary-200/30 dark:border-primary-800/30 shadow-lg hover:shadow-xl transition-all duration-300 p-8"
                    style={{ scrollSnapAlign: 'start' }}
                  >
                    <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
                      {/* Content Side */}
                      <div className="space-y-6">
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                            {item.icon}
                          </div>
                          <div className="text-4xl font-bold font-mono text-primary-600/60 dark:text-primary-400/60">
                            {item.step}
                          </div>
                        </div>
                        
                        <h3 className="text-2xl lg:text-3xl font-semibold font-mono text-secondary-900 dark:text-white leading-tight">
                          {item.title}
                        </h3>
                        
                        <p className="text-lg text-secondary-600 dark:text-secondary-300 leading-relaxed">
                          {item.description}
                        </p>
                        
                        {/* Progress Indicator */}
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-mono text-primary-600 dark:text-primary-400">
                            Step {item.step} of 03
                          </span>
                          <div className="flex space-x-1">
                            {[0, 1, 2].map((i) => (
                              <div 
                                key={i}
                                className={`w-12 h-1 rounded-full transition-colors duration-300 ${
                                  i === index 
                                    ? 'bg-gradient-to-r from-primary-500 to-accent-500' 
                                    : 'bg-secondary-200 dark:bg-secondary-700'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Visual Side */}
                      <div className="relative">
                        <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-secondary-800 dark:to-secondary-700 rounded-2xl p-8 border border-primary-200/30 dark:border-primary-800/30">
                          <div className="bg-white dark:bg-secondary-900 rounded-xl p-6 shadow-xl">
                            <div className="space-y-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              </div>
                              <div className="space-y-3">
                                <div className="h-4 bg-gradient-to-r from-primary-200 to-accent-200 dark:from-primary-800 dark:to-accent-800 rounded animate-pulse"></div>
                                <div className="h-4 bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900 dark:to-accent-900 rounded w-3/4 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                                <div className="h-4 bg-gradient-to-r from-primary-200 to-accent-200 dark:from-primary-800 dark:to-accent-800 rounded w-1/2 animate-pulse" style={{animationDelay: '1s'}}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Floating Elements */}
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg rotate-12 animate-bounce"></div>
                        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-accent-500 to-primary-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Clean Scroll Indicator */}
              <div className="absolute top-1/2 right-2 transform -translate-y-1/2 flex flex-col items-center space-y-1 opacity-60">
                <div className="w-0.5 h-6 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"></div>
                <svg className="w-3 h-3 text-primary-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>

            {/* Ultra-Smooth Custom Scrollbar Styles */}
            <style dangerouslySetInnerHTML={{
              __html: `
                #how-it-works-scroll {
                  scrollbar-width: thin;
                  scrollbar-color: #3B82F6 rgba(59, 130, 246, 0.1);
                  scroll-behavior: smooth;
                  -webkit-overflow-scrolling: touch;
                }
                
                #how-it-works-scroll::-webkit-scrollbar {
                  width: 12px;
                  background: transparent;
                }
                
                #how-it-works-scroll::-webkit-scrollbar-track {
                  background: rgba(59, 130, 246, 0.1);
                  border-radius: 10px;
                  margin: 10px 0;
                  border: 2px solid transparent;
                  background-clip: content-box;
                  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                #how-it-works-scroll::-webkit-scrollbar-thumb {
                  background: linear-gradient(180deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%);
                  border-radius: 10px;
                  border: 2px solid transparent;
                  background-clip: content-box;
                  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
                  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                  will-change: transform, background;
                }
                
                #how-it-works-scroll::-webkit-scrollbar-thumb:hover {
                  background: linear-gradient(180deg, #2563EB 0%, #7C3AED 50%, #DB2777 100%);
                  transform: scaleX(1.1);
                  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2), 0 0 8px rgba(59, 130, 246, 0.2);
                  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                #how-it-works-scroll::-webkit-scrollbar-thumb:active {
                  background: linear-gradient(180deg, #1D4ED8 0%, #6D28D9 50%, #BE185D 100%);
                  transform: scaleX(1.05);
                  transition: all 0.1s ease;
                }
                
                .dark #how-it-works-scroll::-webkit-scrollbar-track {
                  background: rgba(55, 65, 81, 0.3);
                }
                
                .dark #how-it-works-scroll::-webkit-scrollbar-thumb {
                  background: linear-gradient(180deg, #60A5FA 0%, #A78BFA 50%, #F472B6 100%);
                  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
                }
                
                .dark #how-it-works-scroll::-webkit-scrollbar-thumb:hover {
                  background: linear-gradient(180deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%);
                  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2), 0 0 8px rgba(139, 92, 246, 0.2);
                }
                
                /* Enhanced scroll snap for smoother card transitions */
                #how-it-works-scroll > div {
                  scroll-snap-align: start;
                  scroll-margin-top: 0px;
                }
                
                /* Smooth momentum scrolling on iOS */
                @supports (-webkit-overflow-scrolling: touch) {
                  #how-it-works-scroll {
                    -webkit-overflow-scrolling: touch;
                  }
                }
              `
            }} />
          </div>

          {/* Platform Integration */}
          <div className="mt-16">
            <DynamicPlatforms />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION - COMMENTED OUT FOR FUTURE USE
         Will be added when we have real customer reviews
      */}

      {/* Get Started for Free Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-r from-primary-600 to-accent-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold font-mono text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of businesses already using AI to delight customers and boost sales. Get started today with your own AI assistant.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button size="lg" className="text-lg px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold">
                <span className="mr-2">Get Started Free</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold">
                <span className="mr-2">Schedule Demo</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 text-white/80">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="font-mono">Free 14-day trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="font-mono">No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="font-mono">Setup in 24 hours</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </section>

      {/* Footer */}
      <footer className="section-padding py-16 lg:py-20 bg-secondary-900 dark:bg-secondary-950 text-white">
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
