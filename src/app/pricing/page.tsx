'use client'

import { Navigation } from '@/components/ui'
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import Link from 'next/link'
import { useState } from 'react'
import type { NavItem, PricingTier } from '@/types'

// Navigation items
const navItems: NavItem[] = [
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
  { label: 'About', href: '/#about' },
]

// Pricing data based on the attached image
const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 19,
    period: 'month',
    description: 'Great for startups',
    badge: 'Most Popular',
    highlighted: false,
    buttonText: 'Start Free Trial',
    buttonVariant: 'outline',
    limits: {
      tokens: '10M tokens / mo',
      messages: '500 monthly messages',
    },
    features: [
      { text: '1 API-based integration (WhatsApp, Instagram DM, or Web Widget)', included: true },
      { text: '24/7 AI replies (basic Q&A & support)', included: true },
      { text: 'Cart & inventory sync (basic via Supabase)', included: true },
      { text: 'Insights Dashboard (Lite): volume & response times', included: true },
      { text: 'Email/community support', included: true },
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 49,
    period: 'month',
    description: 'Scale to multiple channels with order tracking & standard insights',
    badge: 'For busy teams',
    highlighted: true,
    buttonText: 'Choose Growth',
    buttonVariant: 'primary',
    limits: {
      tokens: '50M tokens / mo (~2,500 msgs)',
      messages: 'Up to 3 API-based integrations',
    },
    features: [
      { text: 'Up to 3 API-based integrations', included: true },
      { text: 'Multi-channel inbox & dashboard', included: true },
      { text: 'Advanced cart & inventory management', included: true },
      { text: 'Order & fulfillment automation', included: true },
      { text: 'Sales Insights (Pro): top queries, funnel drop-offs', included: true },
      { text: 'Email support (48h)', included: true },
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 149,
    period: 'month',
    description: 'High-volume support with predictive insights and custom workflows',
    badge: 'Custom',
    highlighted: false,
    buttonText: 'Upgrade to Pro',
    buttonVariant: 'outline',
    limits: {
      tokens: '200M tokens / mo (~10,000 msgs)',
      messages: 'Up to 6 integrations (API) + 1 web automation channel',
    },
    features: [
      { text: 'Up to 6 integrations (API) + 1 web automation channel', included: true },
      { text: 'Advanced analytics: conversion metrics & predictive insights', included: true },
      { text: 'AI-driven sales recommendations', included: true },
      { text: 'Custom workflows: upsells, cart recovery & order capture', included: true },
      { text: 'Priority support (24h) + live chat', included: true },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 0,
    period: 'custom',
    description: 'For marketplaces & large retailers needing SLAs and custom integrations',
    badge: '',
    highlighted: false,
    buttonText: 'Contact Sales',
    buttonVariant: 'secondary',
    limits: {
      tokens: 'Starts at 1B tokens / mo (~50,000 msgs)',
      messages: 'Unlimited integrations (API) + white-label channels',
    },
    features: [
      { text: 'Unlimited integrations (API) + white-label channels', included: true },
      { text: 'Dedicated CSM, onboarding & success playbooks', included: true },
      { text: 'SLA guarantee & priority incident response', included: true },
      { text: 'Custom integrations (ERP, CRM, POS) & white-label', included: true },
      { text: 'Developer API access & audit logs', included: true },
    ],
  },
]

const faqs = [
  {
    question: 'How tokens map to conversations?',
    answer: 'Our agent averages ~20,000 tokens per full customer message. That\'s ~50 messages per 1M tokens. Plans include a generous token allowance. If you go over, overage is billed at $1 per additional 1M tokens.',
  },
  {
    question: 'Transparent usage',
    answer: 'Each plan includes a generous token allowance. If you go over, overage is billed at $1 per additional 1M tokens. Enterprise gets discounted bulk rates.',
  },
  {
    question: 'API vs Web Automation',
    answer: 'API-based channels are included per plan. Platforms without APIs can be connected via web automation in Pro & Enterprise (an optional setup fee may apply).',
  },
]

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  const getPrice = (tier: PricingTier) => {
    if (tier.id === 'enterprise') return 'Custom'
    const price = isAnnual ? Math.round(tier.price * 0.8) : tier.price
    return `$${price}`
  }

  const getPeriod = (tier: PricingTier) => {
    if (tier.id === 'enterprise') return ''
    return isAnnual ? '/month (billed annually)' : '/month'
  }

  return (
    <main className="relative">
      {/* Navigation */}
      <Navigation 
        items={navItems}
        logo={
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">Z</span>
          </div>
        }
      />

      {/* Header */}
      <section className="section-padding pt-32 lg:pt-40 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950">
        <div className="container-width text-center">
          <div className="max-w-3xl mx-auto space-y-8 animate-slide-up">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                💰 Simple, Transparent Pricing
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                Choose Your <span className="gradient-text">Perfect Plan</span>
              </h1>
              <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto text-balance">
                Start free, scale as you grow. All plans include our core AI agent features with no hidden fees.
              </p>
            </div>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4">
              <span className={`text-sm font-medium ${!isAnnual ? 'text-secondary-900 dark:text-secondary-100' : 'text-secondary-500 dark:text-secondary-400'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isAnnual ? 'bg-primary-600' : 'bg-secondary-200 dark:bg-secondary-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${isAnnual ? 'text-secondary-900 dark:text-secondary-100' : 'text-secondary-500 dark:text-secondary-400'}`}>
                Annual
              </span>
              {isAnnual && (
                <span className="inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                  Save 20%
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding bg-white dark:bg-secondary-900">
        <div className="container-width">
          <div className="grid lg:grid-cols-4 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card 
                key={tier.id} 
                className={`relative p-8 ${
                  tier.highlighted 
                    ? 'ring-2 ring-primary-500 shadow-2xl scale-105' 
                    : 'hover:shadow-xl hover:-translate-y-1 border-secondary-200 dark:border-secondary-800'
                } transition-all duration-300 animate-slide-up animation-delay-${index * 100}`}
              >
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className={`px-4 py-1 rounded-full text-xs font-semibold ${
                      tier.highlighted 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300'
                    }`}>
                      {tier.badge}
                    </span>
                  </div>
                )}

                <CardContent>
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">{getPrice(tier)}</span>
                      {tier.id !== 'enterprise' && (
                        <span className="text-secondary-500 dark:text-secondary-400 ml-1">
                          {getPeriod(tier)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-6">
                      {tier.description}
                    </p>
                  </div>

                  {/* Limits */}
                  <div className="space-y-2 mb-6 p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                    <div className="text-sm">
                      <span className="font-medium text-secondary-900 dark:text-secondary-100">
                        Includes {tier.limits.tokens}
                      </span>
                    </div>
                    <div className="text-xs text-secondary-600 dark:text-secondary-400">
                      {tier.limits.messages}
                    </div>
                    {tier.limits.integrations && (
                      <div className="text-xs text-secondary-600 dark:text-secondary-400">
                        {tier.limits.integrations}
                      </div>
                    )}
                    {tier.limits.channels && (
                      <div className="text-xs text-secondary-600 dark:text-secondary-400">
                        {tier.limits.channels}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <svg 
                          className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                            feature.included 
                              ? 'text-green-500' 
                              : 'text-secondary-300 dark:text-secondary-600'
                          }`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          {feature.included ? (
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          ) : (
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          )}
                        </svg>
                        <span className={`text-sm ${
                          feature.included 
                            ? 'text-secondary-700 dark:text-secondary-300' 
                            : 'text-secondary-400 dark:text-secondary-600 line-through'
                        }`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant={tier.buttonVariant}
                    className="w-full"
                    size="lg"
                  >
                    {tier.buttonText}
                  </Button>

                  {tier.id === 'starter' && (
                    <p className="text-xs text-center text-secondary-500 dark:text-secondary-400 mt-3">
                      Overage: $1 per extra 1M tokens.
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-4">
              All plans include a generous token allowance. Custom SLA available.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-secondary-500 dark:text-secondary-400">
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
                <span>14-day free trial</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-secondary-50 dark:bg-secondary-950">
        <div className="container-width">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 animate-slide-up">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-400">
                Everything you need to know about our pricing and plans.
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className={`p-6 animate-slide-up animation-delay-${index * 100}`}>
                  <CardContent>
                    <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                    <p className="text-secondary-600 dark:text-secondary-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-secondary-600 dark:text-secondary-400 mb-6">
                Still have questions? We're here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary">
                  Contact Sales
                </Button>
                <Button variant="outline">
                  Book a Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white">
        <div className="container-width text-center">
          <div className="max-w-4xl mx-auto animate-slide-up">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto text-balance">
              Join thousands of businesses already using Zauren AI agents. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg px-8 py-4 bg-white text-primary-700 hover:bg-secondary-50"
              >
                Start Free Trial
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary-700"
              >
                Contact Sales
              </Button>
            </div>
            <p className="text-sm text-primary-200 mt-4">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-padding bg-secondary-900 dark:bg-secondary-950 text-white">
        <div className="container-width">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Z</span>
                </div>
                <span className="text-xl font-bold">Zauren</span>
              </div>
              <p className="text-secondary-400 text-sm">
                AI-powered customer service agents for the future of ecommerce.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-secondary-400">
                <li><Link href="/#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Integrations</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-secondary-400">
                <li><Link href="/#about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-secondary-400">
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Status</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-secondary-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-secondary-400">
              © 2025 Zauren. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-secondary-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-secondary-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
