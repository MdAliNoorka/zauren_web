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
    buttonText: 'Get Started Free',
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
    buttonText: 'Choose Professional',
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
    buttonText: 'Choose Growth',
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
  const [aiQuestion, setAiQuestion] = useState('')
  const [aiAnswer, setAiAnswer] = useState('')
  const [isAiLoading, setIsAiLoading] = useState(false)

  const handleAiQuestion = async () => {
    if (!aiQuestion.trim()) return
    
    const currentQuestion = aiQuestion
    setAiQuestion('') // Clear input immediately
    setIsAiLoading(true)
    setAiAnswer('') // Clear previous answer
    
    try {
      const response = await fetch('/api/faq-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: currentQuestion }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setAiAnswer(data.answer)
      } else {
        setAiAnswer(data.answer || "I'm sorry, I'm experiencing technical difficulties. Please try again or contact our support team.")
      }
    } catch (error) {
      console.error('AI FAQ error:', error)
      setAiAnswer("I'm sorry, I'm experiencing technical difficulties. Please try again or contact our support team.")
    } finally {
      setIsAiLoading(false)
    }
  }

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
      <section className="pt-24 lg:pt-32 pb-8 lg:pb-12 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950">
        <div className="container-width text-center">
          <div className="max-w-3xl mx-auto space-y-6 animate-slide-up">
            <div className="space-y-3">
              <h1 className="text-3xl lg:text-5xl font-bold text-balance leading-tight">
                Choose Your <span className="gradient-text">Perfect Plan</span>
              </h1>
              <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto text-balance">
                Start free, scale as you grow. All plans include our core AI agent features with no hidden fees.
              </p>
            </div>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-4 relative">
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
                <div className={`absolute -right-20 transition-all duration-300 ${isAnnual ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'}`}>
                  <span className="inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-xs font-medium whitespace-nowrap">
                    Save 20%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-8 lg:py-12 bg-white dark:bg-secondary-900">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {pricingTiers.map((tier, index) => (
              <Card 
                key={tier.id} 
                className={`relative h-full flex flex-col group hover:scale-105 opacity-0 ${
                  tier.highlighted 
                    ? 'ring-2 ring-primary-500 shadow-xl border-primary-200 dark:border-primary-700 bg-gradient-to-br from-primary-50/50 to-white dark:from-primary-900/10 dark:to-secondary-900' 
                    : 'border-secondary-200 dark:border-secondary-800 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-lg'
                } transition-all duration-500 ease-out animate-fade-in-up`}
                style={{ animationDelay: `${index * 150}ms` }}
                padding="none"
              >
                {tier.badge && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold shadow-sm ${
                      tier.highlighted 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300'
                    }`}>
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div className="p-4 lg:p-5 flex flex-col h-full">
                  {/* Header */}
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold mb-2 text-secondary-900 dark:text-secondary-100">{tier.name}</h3>
                    <div className="mb-3">
                      <span className="text-3xl lg:text-4xl font-bold text-secondary-900 dark:text-secondary-100">{getPrice(tier)}</span>
                      {tier.id !== 'enterprise' && (
                        <span className="text-secondary-500 dark:text-secondary-400 ml-1 text-sm">
                          {getPeriod(tier)}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-secondary-600 dark:text-secondary-400 leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  {/* Limits */}
                  <div className="mb-4 p-3 bg-gradient-to-r from-secondary-50 to-secondary-100 dark:from-secondary-800 dark:to-secondary-800/50 rounded-lg border border-secondary-200 dark:border-secondary-700 min-h-[80px] flex items-center">
                    <div className="space-y-1 w-full">
                      <div className="text-xs">
                        <span className="font-semibold text-secondary-900 dark:text-secondary-100">
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
                  </div>

                  {/* Features */}
                  <div className="flex-grow">
                    <ul className="space-y-2 mb-4">
                      {tier.features.slice(0, 5).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-2">
                          <div className={`w-4 h-4 mt-0.5 flex-shrink-0 rounded-full flex items-center justify-center ${
                            feature.included 
                              ? 'bg-green-100 dark:bg-green-900/30' 
                              : 'bg-secondary-100 dark:bg-secondary-800'
                          }`}>
                            <svg 
                              className={`w-2.5 h-2.5 ${
                                feature.included 
                                  ? 'text-green-600 dark:text-green-400' 
                                  : 'text-secondary-400 dark:text-secondary-600'
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
                          </div>
                          <span className={`text-xs leading-relaxed ${
                            feature.included 
                              ? 'text-secondary-700 dark:text-secondary-300' 
                              : 'text-secondary-400 dark:text-secondary-600 line-through'
                          }`}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                      {tier.features.length > 5 && (
                        <li className="text-xs text-secondary-500 dark:text-secondary-400 italic">
                          +{tier.features.length - 5} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <Button 
                      variant={tier.buttonVariant}
                      className="w-full font-semibold text-sm"
                      size="sm"
                    >
                      {tier.buttonText}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-2">
              All plans include a generous token allowance. Custom SLA available.
            </p>
            <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-4 font-medium">
              Overage: $1 per extra 1M tokens for all plans.
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
      <section className="section-padding bg-white dark:bg-secondary-900">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-slide-up">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-400">
                Everything you need to know about our pricing and plans.
              </p>
            </div>

            {/* AI Assistant */}
            <Card className="mb-12 p-6 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border-primary-200 dark:border-primary-700">
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">Ask our AI Assistant</h3>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">Get instant answers to your pricing questions</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                      placeholder="Ask me anything about our pricing plans..."
                      className="flex-1 px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100"
                      onKeyPress={(e) => e.key === 'Enter' && handleAiQuestion()}
                    />
                    <Button 
                      onClick={handleAiQuestion}
                      disabled={isAiLoading || !aiQuestion.trim()}
                      className="px-6"
                    >
                      {isAiLoading ? (
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        'Ask'
                      )}
                    </Button>
                  </div>
                  
                  {aiAnswer && (
                    <div className="p-4 bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700">
                      <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed">{aiAnswer}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Existing FAQs */}
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

      {/* Plan Comparison Section */}
      <section className="section-padding bg-secondary-50 dark:bg-secondary-950">
        <div className="container-width">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Compare All Features
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-400">
              Choose the plan that's right for your business needs.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-secondary-900 rounded-xl shadow-lg">
              <thead>
                <tr className="border-b border-secondary-200 dark:border-secondary-700">
                  <th className="text-left p-6 font-semibold text-secondary-900 dark:text-secondary-100">Features</th>
                  <th className="text-center p-6 font-semibold text-secondary-900 dark:text-secondary-100">Starter</th>
                  <th className="text-center p-6 font-semibold text-secondary-900 dark:text-secondary-100 bg-primary-50 dark:bg-primary-900/20">Professional</th>
                  <th className="text-center p-6 font-semibold text-secondary-900 dark:text-secondary-100">Growth</th>
                  <th className="text-center p-6 font-semibold text-secondary-900 dark:text-secondary-100">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-secondary-100 dark:border-secondary-800">
                  <td className="p-6 text-secondary-700 dark:text-secondary-300">Monthly Price</td>
                  <td className="p-6 text-center font-bold text-secondary-900 dark:text-secondary-100">$19</td>
                  <td className="p-6 text-center font-bold text-secondary-900 dark:text-secondary-100 bg-primary-50 dark:bg-primary-900/20">$49</td>
                  <td className="p-6 text-center font-bold text-secondary-900 dark:text-secondary-100">$149</td>
                  <td className="p-6 text-center font-bold text-secondary-900 dark:text-secondary-100">Custom</td>
                </tr>
                <tr className="border-b border-secondary-100 dark:border-secondary-800">
                  <td className="p-6 text-secondary-700 dark:text-secondary-300">API Integrations</td>
                  <td className="p-6 text-center">
                    <span className="text-secondary-600 dark:text-secondary-400">1</span>
                  </td>
                  <td className="p-6 text-center bg-primary-50 dark:bg-primary-900/20">
                    <span className="text-secondary-600 dark:text-secondary-400">3</span>
                  </td>
                  <td className="p-6 text-center">
                    <span className="text-secondary-600 dark:text-secondary-400">6</span>
                  </td>
                  <td className="p-6 text-center">
                    <span className="text-secondary-600 dark:text-secondary-400">Unlimited</span>
                  </td>
                </tr>
                <tr className="border-b border-secondary-100 dark:border-secondary-800">
                  <td className="p-6 text-secondary-700 dark:text-secondary-300">24/7 AI Support</td>
                  <td className="p-6 text-center">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="p-6 text-center bg-primary-50 dark:bg-primary-900/20">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="p-6 text-center">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="p-6 text-center">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
                <tr className="border-b border-secondary-100 dark:border-secondary-800">
                  <td className="p-6 text-secondary-700 dark:text-secondary-300">Cart & Inventory Sync</td>
                  <td className="p-6 text-center">
                    <span className="text-secondary-500 text-sm">Basic</span>
                  </td>
                  <td className="p-6 text-center bg-primary-50 dark:bg-primary-900/20">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="p-6 text-center">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="p-6 text-center">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
                <tr className="border-b border-secondary-100 dark:border-secondary-800">
                  <td className="p-6 text-secondary-700 dark:text-secondary-300">Order & Fulfillment Automation</td>
                  <td className="p-6 text-center">
                    <svg className="w-5 h-5 text-red-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="p-6 text-center bg-primary-50 dark:bg-primary-900/20">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="p-6 text-center">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="p-6 text-center">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
                <tr className="border-b border-secondary-100 dark:border-secondary-800">
                  <td className="p-6 text-secondary-700 dark:text-secondary-300">AI-driven Sales Recommendations</td>
                  <td className="p-6 text-center">
                    <svg className="w-5 h-5 text-red-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="p-6 text-center bg-primary-50 dark:bg-primary-900/20">
                    <svg className="w-5 h-5 text-red-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="p-6 text-center">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="p-6 text-center">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
                <tr className="border-b border-secondary-100 dark:border-secondary-800">
                  <td className="p-6 text-secondary-700 dark:text-secondary-300">Custom Workflows</td>
                  <td className="p-6 text-center">
                    <svg className="w-5 h-5 text-red-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="p-6 text-center bg-primary-50 dark:bg-primary-900/20">
                    <svg className="w-5 h-5 text-red-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="p-6 text-center">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="p-6 text-center">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="p-6 text-secondary-700 dark:text-secondary-300">SLA Guarantee</td>
                  <td className="p-6 text-center">
                    <svg className="w-5 h-5 text-red-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="p-6 text-center bg-primary-50 dark:bg-primary-900/20">
                    <svg className="w-5 h-5 text-red-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="p-6 text-center">
                    <svg className="w-5 h-5 text-red-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="p-6 text-center">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
              </tbody>
            </table>
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
