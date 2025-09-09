'use client'

import { useState, useEffect } from 'react'

interface Stat {
  label: string
  value: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  trend?: 'up' | 'down' | 'neutral'
}

const StatsIcons = {
  Speed: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Heart: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  TrendingUp: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  DollarSign: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
    </svg>
  )
}

const initialStats: Stat[] = [
  { 
    label: 'Response Time', 
    value: '< 2s', 
    description: 'Average AI response time',
    icon: StatsIcons.Speed,
    trend: 'down' // Good for response time
  },
  { 
    label: 'Customer Satisfaction', 
    value: '98%', 
    description: 'AI interaction satisfaction rate',
    icon: StatsIcons.Heart,
    trend: 'up'
  },
  { 
    label: 'Sales Conversion', 
    value: '+45%', 
    description: 'Increase in conversion rates',
    icon: StatsIcons.TrendingUp,
    trend: 'up'
  },
  { 
    label: 'Operating Costs', 
    value: '-60%', 
    description: 'Reduction in support costs',
    icon: StatsIcons.DollarSign,
    trend: 'down' // Good for costs
  },
]

export function AnimatedStatsSimple() {
  const [stats, setStats] = useState(initialStats)
  const [isVisible, setIsVisible] = useState(false)
  const [animatedStats, setAnimatedStats] = useState<Stat[]>([])

  // Trigger animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Animate stats in sequence
  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        setTimeout(() => {
          setAnimatedStats(prev => [...prev, stat])
        }, index * 200)
      })
    }
  }, [isVisible, stats])

  // Simulate live updates to some stats
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => 
        prevStats.map(stat => {
          if (stat.label === 'Customer Satisfaction') {
            const variation = Math.random() * 0.4 - 0.2 // ±0.2% variation
            const currentValue = parseFloat(stat.value.replace('%', ''))
            const newValue = Math.max(95, Math.min(100, currentValue + variation))
            return { ...stat, value: `${newValue.toFixed(1)}%` }
          }
          if (stat.label === 'Response Time') {
            const variation = Math.random() * 0.2 - 0.1 // ±0.1s variation
            const currentValue = parseFloat(stat.value.replace('< ', '').replace('s', ''))
            const newValue = Math.max(1.2, Math.min(3.0, currentValue + variation))
            return { ...stat, value: `< ${newValue.toFixed(1)}s` }
          }
          return stat
        })
      )
    }, 4000) // Update every 4 seconds

    return () => clearInterval(interval)
  }, [])

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up':
        return (
          <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        )
      case 'down':
        return (
          <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
      {stats.map((stat, index) => {
        const isAnimated = animatedStats.includes(stat)
        const IconComponent = stat.icon
        
        return (
          <div 
            key={stat.label}
            className={`text-center transform transition-all duration-700 ${
              isAnimated 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            <div className="group">
              {/* Icon */}
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
              </div>
              
              {/* Value */}
              <div className="mb-2">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent transition-all duration-500">
                  {stat.value}
                </div>
                {stat.trend && (
                  <div className="flex items-center justify-center mt-1">
                    {getTrendIcon(stat.trend)}
                  </div>
                )}
              </div>
              
              {/* Label */}
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                {stat.label}
              </h3>
              
              {/* Description */}
              <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                {stat.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
