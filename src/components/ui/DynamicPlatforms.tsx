'use client'

import { useState, useEffect } from 'react'

interface Platform {
  name: string
  color: string
  icon: React.ComponentType<{ className?: string }>
  users?: string
  category: string
}

// Platform Icons as SVG components
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217s.23.005.329.009c.106.004.248-.04.389.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289-.086.101-.173.188-.26.289-.086.101-.177.208-.076.408.101.2.448.738.962 1.194.662.588 1.299.77 1.485.856.186.087.294.072.402-.043.108-.116.462-.537.585-.723.123-.186.246-.155.415-.093.17.062 1.074.507 1.074.507l.18.085c.117.067.195.155.195.289 0 .173-.144.405-.288.81z"/>
  </svg>
)

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 7.377a4.623 4.623 0 100 9.246 4.623 4.623 0 000-9.246zm0 7.627a3.004 3.004 0 110-6.008 3.004 3.004 0 010 6.008z"/>
    <circle cx="16.806" cy="7.207" r="1.078"/>
    <path d="M20.533 6.111A4.605 4.605 0 0017.9 3.479a6.606 6.606 0 00-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 00-2.184.42 4.6 4.6 0 00-2.633 2.632 6.585 6.585 0 00-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 002.634 2.632 6.584 6.584 0 002.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 002.186-.419 4.613 4.613 0 002.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 00-.421-2.217zm-1.218 9.532a5.043 5.043 0 01-.311 1.688 2.987 2.987 0 01-1.712 1.711 4.985 4.985 0 01-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 01-1.669-.311 2.985 2.985 0 01-1.719-1.711 5.08 5.08 0 01-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 01.311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 011.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 011.67.311 2.991 2.991 0 011.712 1.712 5.08 5.08 0 01.311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"/>
  </svg>
)

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
)

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
)

const SlackIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
  </svg>
)

const TeamsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.625 7.5h-1.875V5.625C18.75 2.5234 16.2266 0 13.125 0S7.5 2.5234 7.5 5.625V7.5H5.625C2.5234 7.5 0 10.0234 0 13.125v1.875C0 17.4766 2.5234 20 5.625 20h1.875v1.875C7.5 24.4766 10.0234 27 13.125 27s5.625-2.5234 5.625-5.625V20h1.875C23.4766 20 26 17.4766 26 14.875v-1.875C26 10.0234 23.4766 7.5 20.625 7.5zM5.625 17.5C4.2188 17.5 3.125 16.4062 3.125 15V13.125C3.125 11.7188 4.2188 10.625 5.625 10.625h1.875v6.875H5.625zm10.625 1.875C16.25 21.0312 15.1562 22.125 13.75 22.125S11.25 21.0312 11.25 19.375V17.5h5.625v1.875zM16.25 15V5.625C16.25 4.2188 15.1562 3.125 13.75 3.125S11.25 4.2188 11.25 5.625V15H5.625V10.625h1.875V8.75h3.75V5.625C11.25 2.5234 13.7734 0 16.875 0S22.5 2.5234 22.5 5.625V8.75h3.75v1.875h1.875V15H16.25z"/>
  </svg>
)

const ZoomIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm-1-17H8v10h6v-3l3 2.5V7.5L14 10V7c0-.55-.45-1-1-1z"/>
  </svg>
)

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
)

const SnapchatIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.219-.359-.219c-.219-.937.219-1.406 1.406-1.406.938 0 1.719.719 1.719 1.406 0 .938-1.406 5.957-1.406 5.957-.219.937-.105 2.403.041 3.439 4.46-1.757 7.618-6.095 7.618-11.174C24.005 5.367 18.638.001 12.017.001z"/>
  </svg>
)

const WebChatIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04.97 4.29L1 23l6.71-1.97C9.04 21.64 10.54 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.24 0-2.45-.2-3.57-.57L7 20l1.43-1.43C7.2 17.45 7 16.24 7 15c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5z"/>
    <circle cx="9" cy="12" r="1"/>
    <circle cx="12" cy="12" r="1"/>
    <circle cx="15" cy="12" r="1"/>
  </svg>
)

const platforms: Platform[] = [
  { name: "WhatsApp", color: "bg-green-500", icon: WhatsAppIcon, users: "2.4B", category: "Messaging" },
  { name: "Instagram", color: "bg-pink-500", icon: InstagramIcon, users: "1.8B", category: "Social" },
  { name: "Facebook", color: "bg-blue-600", icon: FacebookIcon, users: "2.9B", category: "Social" },
  { name: "Telegram", color: "bg-blue-400", icon: TelegramIcon, users: "800M", category: "Messaging" },
  { name: "Discord", color: "bg-indigo-600", icon: DiscordIcon, users: "400M", category: "Gaming" },
  { name: "Slack", color: "bg-purple-600", icon: SlackIcon, users: "32M", category: "Business" },
  { name: "Teams", color: "bg-blue-500", icon: TeamsIcon, users: "280M", category: "Business" },
  { name: "Zoom", color: "bg-blue-400", icon: ZoomIcon, users: "300M", category: "Business" },
  { name: "Twitter", color: "bg-black", icon: TwitterIcon, users: "450M", category: "Social" },
  { name: "LinkedIn", color: "bg-blue-700", icon: LinkedInIcon, users: "900M", category: "Professional" },
  { name: "TikTok", color: "bg-black", icon: TikTokIcon, users: "1.7B", category: "Social" },
  { name: "Snapchat", color: "bg-yellow-400", icon: SnapchatIcon, users: "750M", category: "Social" },
  { name: "Web Chat", color: "bg-gray-600", icon: WebChatIcon, users: "Custom", category: "Web" }
]

export function DynamicPlatforms() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null)
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  
  const platformsPerView = 4
  const totalSlides = Math.ceil(platforms.length / platformsPerView)

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoRotating) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [totalSlides, isAutoRotating])

  const nextSlide = () => {
    setIsAutoRotating(false)
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
    // Resume auto-rotation after 10 seconds
    setTimeout(() => setIsAutoRotating(true), 10000)
  }

  const prevSlide = () => {
    setIsAutoRotating(false)
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
    // Resume auto-rotation after 10 seconds
    setTimeout(() => setIsAutoRotating(true), 10000)
  }

  const goToSlide = (index: number) => {
    setIsAutoRotating(false)
    setCurrentIndex(index)
    // Resume auto-rotation after 10 seconds
    setTimeout(() => setIsAutoRotating(true), 10000)
  }

  const getCurrentPlatforms = () => {
    const startIndex = currentIndex * platformsPerView
    return platforms.slice(startIndex, startIndex + platformsPerView)
  }

  return (
    <div className="text-center">
      {/* Header */}
      <div className="mb-12">
        <h3 className="text-2xl lg:text-4xl font-bold mb-4 text-secondary-900 dark:text-white">
          <span className="bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 bg-clip-text text-transparent font-mono">
            Connect to Every Platform
          </span>
        </h3>
        <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
          Seamlessly integrate with all major messaging and social platforms your customers use
        </p>
      </div>

      {/* Tech-style carousel container - Compact version */}
      <div className="relative max-w-4xl mx-auto">
        {/* Background grid effect - More subtle */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
          <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-primary-400/20"></div>
            ))}
          </div>
        </div>

        {/* Main carousel container - Smaller background */}
        <div className="relative bg-white/30 dark:bg-secondary-900/30 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-secondary-700/20 p-6 shadow-lg">
          {/* Navigation arrows - More compact */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white hover:scale-105 transition-all duration-300 shadow-md group"
            disabled={totalSlides <= 1}
          >
            <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white hover:scale-105 transition-all duration-300 shadow-md group"
            disabled={totalSlides <= 1}
          >
            <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Platforms display - More compact */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 min-h-[180px]">
            {getCurrentPlatforms().map((platform, index) => {
              const IconComponent = platform.icon
              const globalIndex = currentIndex * platformsPerView + index
              
              return (
                <div
                  key={`${platform.name}-${currentIndex}`}
                  className="flex flex-col items-center space-y-4 group cursor-pointer"
                  onMouseEnter={() => setHoveredPlatform(platform.name)}
                  onMouseLeave={() => setHoveredPlatform(null)}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Platform icon container - More compact */}
                  <div className="relative">
                    <div className={`w-16 h-16 ${platform.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-all duration-300 relative overflow-hidden`}>
                      {/* Tech grid overlay */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="grid grid-cols-4 grid-rows-4 h-full w-full">
                          {Array.from({ length: 16 }).map((_, i) => (
                            <div key={i} className="border border-white/30"></div>
                          ))}
                        </div>
                      </div>
                      
                      <IconComponent className="w-8 h-8 relative z-10" />
                      
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Connection indicator - Smaller */}
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-secondary-900 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* Platform info */}
                  <div className="text-center space-y-2">
                    <h4 className="text-sm font-semibold text-secondary-800 dark:text-secondary-200">
                      {platform.name}
                    </h4>
                    <div className="text-xs text-secondary-500 dark:text-secondary-500">
                      <span className="bg-secondary-100 dark:bg-secondary-800 px-2 py-1 rounded-full">
                        {platform.category}
                      </span>
                    </div>
                    
                    {/* Hover details */}
                    {hoveredPlatform === platform.name && (
                      <div className="animate-fade-in space-y-1">
                        <div className="text-xs text-secondary-600 dark:text-secondary-400">
                          {platform.users} users
                        </div>
                        <div className="text-xs text-green-600 dark:text-green-400 font-mono">
                          ● CONNECTED
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 scale-125'
                    : 'bg-secondary-300 dark:bg-secondary-600 hover:bg-secondary-400 dark:hover:bg-secondary-500'
                }`}
              />
            ))}
          </div>

          {/* Auto-rotation indicator */}
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isAutoRotating ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-xs text-secondary-500 dark:text-secondary-500 font-mono">
              {isAutoRotating ? 'AUTO' : 'MANUAL'}
            </span>
          </div>
        </div>

        {/* Stats overlay - Startup appropriate */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="text-center p-4 bg-white/10 dark:bg-secondary-800/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-secondary-700/30">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              {platforms.length}+
            </div>
            <div className="text-xs text-secondary-600 dark:text-secondary-400 font-mono">PLATFORMS</div>
          </div>
          <div className="text-center p-4 bg-white/10 dark:bg-secondary-800/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-secondary-700/30">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              2025
            </div>
            <div className="text-xs text-secondary-600 dark:text-secondary-400 font-mono">FOUNDED</div>
          </div>
          <div className="text-center p-4 bg-white/10 dark:bg-secondary-800/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-secondary-700/30">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              FAST
            </div>
            <div className="text-xs text-secondary-600 dark:text-secondary-400 font-mono">RESPONSE</div>
          </div>
          <div className="text-center p-4 bg-white/10 dark:bg-secondary-800/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-secondary-700/30">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              24/7
            </div>
            <div className="text-xs text-secondary-600 dark:text-secondary-400 font-mono">AVAILABLE</div>
          </div>
        </div>
      </div>
    </div>
  )
}
