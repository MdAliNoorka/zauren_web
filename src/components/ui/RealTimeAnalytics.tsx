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
  color: string
}

const initialMetrics: AnalyticsMetric[] = [
  {
    id: 'satisfaction',
    label: 'Satisfaction',
    value: 98,
    unit: '%',
    trend: 'up',
    format: 'percentage',
    color: 'primary'
  },
  {
    id: 'response-time',
    label: 'Response',
    value: 2.1,
    unit: 's',
    trend: 'down',
    format: 'time',
    color: 'accent'
  },
  {
    id: 'conversations',
    label: 'Conversations',
    value: 247,
    unit: '',
    trend: 'up',
    format: 'number',
    color: 'primary'
  },
  {
    id: 'active-agents',
    label: 'Active Agents',
    value: 12,
    unit: '',
    trend: 'neutral',
    format: 'number',
    color: 'accent'
  },
  {
    id: 'revenue-today',
    label: 'Revenue Today',
    value: 8450,
    unit: '$',
    trend: 'up',
    format: 'currency',
    color: 'primary'
  },
  {
    id: 'conversion-rate',
    label: 'Conversion',
    value: 24.8,
    unit: '%',
    trend: 'up',
    format: 'percentage',
    color: 'accent'
  }
]

interface PlatformActivity {
  platform: string
  messages: number
  color: string
}

const platformActivities: PlatformActivity[] = [
  { platform: 'WhatsApp', messages: 89, color: 'bg-green-500' },
  { platform: 'Instagram', messages: 67, color: 'bg-pink-500' },
  { platform: 'Facebook', messages: 45, color: 'bg-blue-600' },
  { platform: 'Telegram', messages: 34, color: 'bg-blue-400' },
  { platform: 'Web Chat', messages: 12, color: 'bg-gray-600' }
]

export function RealTimeAnalytics() {
  const [metrics, setMetrics] = useState<AnalyticsMetric[]>(initialMetrics)
  const [platforms, setPlatforms] = useState<PlatformActivity[]>(platformActivities)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

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
            case 'active-agents':
              newValue = Math.max(8, Math.min(15, metric.value + Math.floor(Math.random() * 3 - 1)))
              break
            case 'revenue-today':
              newValue = Math.max(5000, metric.value + Math.floor(Math.random() * 200 - 50))
              break
            case 'conversion-rate':
              newValue = Math.max(15, Math.min(35, metric.value + variation * 3))
              break
          }
          
          return {
            ...metric,
            value: newValue
          }
        })
      )
      
      // Update platform activity
      setPlatforms(prevPlatforms =>
        prevPlatforms.map(platform => ({
          ...platform,
          messages: Math.max(5, platform.messages + Math.floor(Math.random() * 6 - 2))
        }))
      )
      
      setLastUpdate(new Date())
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

  const getColorClasses = (color: string, type: 'text' | 'bg') => {
    const baseColor = color === 'primary' ? 'primary' : 'accent'
    return type === 'text' 
      ? `text-${baseColor}-600 dark:text-${baseColor}-400`
      : `bg-gradient-to-br from-${baseColor}-50 to-accent-50 dark:from-${baseColor}-900/20 dark:to-accent-900/20`
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-white/90 to-white/70 dark:from-secondary-900/90 dark:to-secondary-800/70 backdrop-blur-xl border border-white/30 dark:border-secondary-700/30 shadow-2xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-secondary-800 dark:text-secondary-200">
            Real-time Analytics
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-600 dark:text-green-400 font-mono">
              LIVE
            </span>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.slice(0, 6).map((metric) => (
            <div
              key={metric.id}
              className={`text-center p-4 rounded-lg transition-all duration-300 hover:scale-105 ${getColorClasses(metric.color, 'bg')}`}
            >
              <div className={`text-2xl lg:text-3xl font-bold ${getColorClasses(metric.color, 'text')} transition-all duration-500`}>
                {formatValue(metric)}
              </div>
              <div className="text-xs text-secondary-600 dark:text-secondary-400 mt-1">
                {metric.label}
              </div>
              {/* Trend indicator */}
              <div className="flex items-center justify-center mt-2">
                {metric.trend === 'up' && (
                  <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {metric.trend === 'down' && (
                  <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {metric.trend === 'neutral' && (
                  <div className="w-3 h-0.5 bg-gray-400 rounded"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Platform Activity */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-secondary-700 dark:text-secondary-300">
            Platform Activity
          </h4>
          <div className="space-y-2">
            {platforms.map((platform) => (
              <div key={platform.platform} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 ${platform.color} rounded-full`}></div>
                  <span className="text-sm text-secondary-600 dark:text-secondary-400">
                    {platform.platform}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-secondary-800 dark:text-secondary-200">
                    {platform.messages}
                  </span>
                  <span className="text-xs text-secondary-500 dark:text-secondary-500">
                    msgs
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Last Update */}
        <div className="text-center">
          <span className="text-xs text-secondary-500 dark:text-secondary-500">
            Last update: {lastUpdate.toLocaleTimeString()}
          </span>
        </div>
      </div>
    </Card>
  )
}
