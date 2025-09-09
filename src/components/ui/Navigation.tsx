'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/utils'
import { Button } from './Button'
import { useAuth } from '@/hooks/useAuth'
import type { NavItem } from '@/types'
import { LogOut, User } from 'lucide-react'

interface NavigationProps {
  items: NavItem[]
  logo?: React.ReactNode
  logoText?: string
  className?: string
}

export function Navigation({ items, logo, logoText = 'Zauren', className }: NavigationProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isDark, setIsDark] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [showUserMenu, setShowUserMenu] = React.useState(false)
  const { user, loading, signOut } = useAuth()

  // Click outside handler for user menu
  const userMenuRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserMenu])

  // Scroll detection with debouncing and hysteresis
  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let lastScrollY = 0

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Clear previous timeout
      clearTimeout(timeoutId)
      
      // Use hysteresis to prevent jittery behavior
      const threshold = isScrolled ? 30 : 80 // Different thresholds for up/down
      
      timeoutId = setTimeout(() => {
        if (currentScrollY > threshold && !isScrolled) {
          setIsScrolled(true)
        } else if (currentScrollY <= threshold && isScrolled) {
          setIsScrolled(false)
        }
      }, 10) // Small delay to debounce
      
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
    }
  }, [isScrolled])

  // Theme detection and toggle
  React.useEffect(() => {
    // Sync state with current theme
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    
    if (newIsDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const handleSignOut = async () => {
    await signOut()
    setShowUserMenu(false)
  }

  return (
    <nav className={cn(
      'fixed top-0 w-full z-50 transition-all duration-700 ease-in-out',
      isScrolled 
        ? 'top-6 left-1/2 transform -translate-x-1/2 w-[calc(100%-4rem)] max-w-5xl mx-auto rounded-2xl shadow-2xl backdrop-blur-md bg-white/80 dark:bg-secondary-900/80 border border-white/20 dark:border-secondary-700/20' 
        : 'top-0 left-0 transform-none w-full bg-white/10 dark:bg-secondary-900/10 backdrop-blur-md border-b border-white/20 dark:border-secondary-700/20',
      className
    )}>
      <div className={cn(
        'transition-all duration-700 ease-in-out',
        isScrolled ? 'px-6 py-4' : 'container-width section-padding py-6'
      )}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            {logo}
            <span className={cn(
              'font-bold gradient-text transition-all duration-300',
              isScrolled ? 'text-xl' : 'text-2xl'
            )}>
              {logoText}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'font-medium transition-colors duration-200',
                  'text-secondary-600 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400',
                  isScrolled ? 'text-base' : 'text-lg'
                )}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className={cn(
                'p-3 transition-all duration-300',
                isScrolled ? 'w-10 h-10' : 'w-12 h-12'
              )}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className={cn('transition-all duration-300', isScrolled ? 'h-5 w-5' : 'h-6 w-6')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className={cn('transition-all duration-300', isScrolled ? 'h-5 w-5' : 'h-6 w-6')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </Button>

            {/* Authentication buttons/user menu */}
            {loading ? (
              <div className="w-24 h-10 bg-secondary-200 dark:bg-secondary-700 rounded-lg animate-pulse" />
            ) : user ? (
              <div className="relative" ref={userMenuRef}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={cn(
                    'flex items-center space-x-2 transition-all duration-300',
                    isScrolled ? 'text-sm px-3 py-2' : 'text-base px-4 py-2.5'
                  )}
                >
                  <User className={cn('transition-all duration-300', isScrolled ? 'h-4 w-4' : 'h-5 w-5')} />
                  <span className="hidden sm:block">{user.user_metadata?.full_name || user.email}</span>
                </Button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-secondary-800 rounded-lg shadow-lg border border-secondary-200 dark:border-secondary-700 py-2 z-50">
                    <div className="px-4 py-2 border-b border-secondary-200 dark:border-secondary-700">
                      <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
                        {user.user_metadata?.full_name || 'User'}
                      </p>
                      <p className="text-xs text-secondary-500 dark:text-secondary-400">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-secondary-100 dark:hover:bg-secondary-700 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/auth/signin">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'transition-all duration-300',
                      isScrolled ? 'text-sm px-3 py-2' : 'text-base px-4 py-2.5'
                    )}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button 
                    variant="primary" 
                    size="sm"
                    className={cn(
                      'transition-all duration-300',
                      isScrolled ? 'text-sm px-4 py-2' : 'text-base px-6 py-2.5'
                    )}
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className={cn(
                'p-3 transition-all duration-300',
                isScrolled ? 'w-10 h-10' : 'w-12 h-12'
              )}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className={cn('transition-all duration-300', isScrolled ? 'h-5 w-5' : 'h-6 w-6')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className={cn('transition-all duration-300', isScrolled ? 'h-5 w-5' : 'h-6 w-6')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                'p-3 transition-all duration-300',
                isScrolled ? 'w-10 h-10' : 'w-12 h-12'
              )}
              aria-label="Toggle menu"
            >
              <svg className={cn('transition-all duration-300', isScrolled ? 'h-6 w-6' : 'h-7 w-7')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-secondary-200 dark:border-secondary-700 animate-slide-down">
            <div className="pt-4 space-y-3">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 text-base font-medium text-secondary-600 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 transition-colors duration-200 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800"
                  onClick={() => setIsOpen(false)}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-3 px-4 space-y-2">
                {loading ? (
                  <div className="w-full h-10 bg-secondary-200 dark:bg-secondary-700 rounded-lg animate-pulse" />
                ) : user ? (
                  <>
                    <div className="mb-3 pb-3 border-b border-secondary-200 dark:border-secondary-700">
                      <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
                        {user.user_metadata?.full_name || 'User'}
                      </p>
                      <p className="text-xs text-secondary-500 dark:text-secondary-400">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="block w-full text-left px-4 py-3 text-base font-medium text-secondary-600 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 transition-colors duration-200 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="block w-full text-left px-4 py-3 text-base font-medium text-secondary-600 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 transition-colors duration-200 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut()
                        setIsOpen(false)
                      }}
                      className="w-full text-left px-4 py-3 text-base font-medium text-red-600 dark:text-red-400 transition-colors duration-200 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 flex items-center space-x-2"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full justify-center">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                      <Button variant="primary" size="sm" className="w-full">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
