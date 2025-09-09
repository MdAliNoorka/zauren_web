'use client'

import { useState, useEffect } from 'react'
import { Card } from './Card'

interface AnalyticsMetric {
  id: string
  label: string
  value: number
  unit: string
  trend: 'up' | 'down' | 'neutral'
  format: 'number' | 'percentage' | 'time' | 'currency'
}

const initialMetrics: AnalyticsMetric[] = [
  {
    id: 'satisfaction',
    label: 'Satisfaction',
    value: 98,
    unit: '%',
    trend: 'up',
    format: 'percentage'
  },
  {
    id: 'conversations',
    label: 'Active Chats',
    value: 247,
    unit: '',
    trend: 'up',
    format: 'number'
  },
  {
    id: 'response-time',
    label: 'Response',
    value: 2.1,
    unit: 's',
    trend: 'down',
    format: 'time'
  },
  {
    id: 'revenue-today',
    label: 'Revenue',
    value: 8450,
    unit: '$',
    trend: 'up',
    format: 'currency'
  }
]

export function CompactAnalytics() {
  const [metrics, setMetrics] = useState<AnalyticsMetric[]>(initialMetrics)
  const [isVisible, setIsVisible] = useState(true)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prevMetrics => 
        prevMetrics.map(metric => {
          const variation = Math.random() * 0.1 - 0.05 // ±5% variation
          let newValue = metric.value
          
          switch (metric.id) {
            case 'satisfaction':
              newValue = Math.max(85, Math.min(100, metric.value + variation * 2))
              break
            case 'response-time':
              newValue = Math.max(1.2, Math.min(4.0, metric.value + variation * 0.5))
              break
            case 'conversations':
              newValue = Math.max(200, metric.value + Math.floor(Math.random() * 10 - 3))
              break
            case 'revenue-today':
              newValue = Math.max(5000, metric.value + Math.floor(Math.random() * 200 - 50))
              break
          }
          
          return {
            ...metric,
            value: newValue
          }
        })
      )
    }, 3000) // Update every 3 seconds

    return () => clearInterval(interval)
  }, [])

  const formatValue = (metric: AnalyticsMetric): string => {
    switch (metric.format) {
      case 'percentage':
        return `${metric.value.toFixed(1)}${metric.unit}`
      case 'time':
        return `${metric.value.toFixed(1)}${metric.unit}`
      case 'currency':
        return `${metric.unit}${metric.value.toLocaleString()}`
      case 'number':
      default:
        return `${Math.floor(metric.value)}${metric.unit}`
    }
  }

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') {
      return (
        <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      )
    }
    if (trend === 'down') {
      return (
        <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )
    }
    return <div className="w-3 h-0.5 bg-gray-400 rounded"></div>
  }

  if (!isVisible) return null

  return (
    <Card className="p-4 bg-gradient-to-r from-white/95 to-primary-50/80 dark:from-secondary-900/95 dark:to-secondary-800/80 backdrop-blur-lg border border-white/20 dark:border-secondary-700/20 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <h3 className="text-sm font-semibold text-secondary-800 dark:text-secondary-200">
            Live Analytics
          </h3>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="text-center p-2 rounded-md bg-white/60 dark:bg-secondary-800/60 backdrop-blur-sm transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-center space-x-1">
              <span className="text-lg font-bold text-primary-600 dark:text-accent-400 transition-all duration-500">
                {formatValue(metric)}
              </span>
              {getTrendIcon(metric.trend)}
            </div>
            <div className="text-xs text-secondary-600 dark:text-secondary-400 mt-1">
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
