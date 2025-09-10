'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { User, LogOut, Settings, ChevronDown } from 'lucide-react'
import { cn } from '@/utils'

interface UserNavigationProps {
  isScrolled?: boolean
  isMobile?: boolean
}

export function UserNavigation({ isScrolled = false, isMobile = false }: UserNavigationProps) {
  const { user, profile, isAuthenticated, loading, signOut } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 bg-secondary-200 dark:bg-secondary-700 rounded-full animate-pulse"></div>
        <div className="w-20 h-8 bg-secondary-200 dark:bg-secondary-700 rounded animate-pulse"></div>
      </div>
    )
  }

  // Show sign in/up buttons if not authenticated
  if (!isAuthenticated || !user) {
    if (isMobile) {
      return (
        <div className="space-y-2">
          <Link href="/auth/signin">
            <Button variant="ghost" size="sm" className="w-full justify-center">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button variant="primary" size="sm" className="w-full">
              Get Started
            </Button>
          </Link>
        </div>
      )
    }
    
    return (
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
    )
  }

  // Show user menu if authenticated
  const displayName = profile?.full_name || user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User'
  const avatarUrl = profile?.avatar_url || user.user_metadata?.avatar_url || user.user_metadata?.picture
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  const handleSignOut = async () => {
    setIsDropdownOpen(false)
    await signOut()
  }

  // Mobile layout for authenticated user
  if (isMobile) {
    return (
      <div className="space-y-2">
        <div className="mb-3 pb-3 border-b border-secondary-200 dark:border-secondary-700">
          <div className="flex items-center space-x-3">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold">
                {initials}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100 truncate">
                {displayName}
              </p>
              <p className="text-xs text-secondary-500 dark:text-secondary-400 truncate">
                {user.email}
              </p>
            </div>
          </div>
        </div>
        
        <Link 
          href="/dashboard"
          className="block w-full text-left px-4 py-3 text-base font-medium text-secondary-600 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 transition-colors duration-200 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800"
        >
          Dashboard
        </Link>
        <Link 
          href="/profile"
          className="block w-full text-left px-4 py-3 text-base font-medium text-secondary-600 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 transition-colors duration-200 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800"
        >
          Profile
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full text-left px-4 py-3 text-base font-medium text-red-600 dark:text-red-400 transition-colors duration-200 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 flex items-center space-x-2"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={cn(
          'flex items-center space-x-2 transition-all duration-300',
          isScrolled ? 'text-sm px-3 py-2' : 'text-base px-4 py-2.5'
        )}
      >
        {/* Avatar */}
        <div className="relative">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className={cn(
                'rounded-full object-cover border-2 border-primary-200 dark:border-primary-700 transition-all duration-300',
                isScrolled ? 'w-7 h-7' : 'w-8 h-8'
              )}
            />
          ) : (
            <div className={cn(
              'rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold transition-all duration-300',
              isScrolled ? 'w-7 h-7 text-xs' : 'w-8 h-8 text-sm'
            )}>
              {initials}
            </div>
          )}
          {/* Online indicator */}
          <div className={cn(
            'absolute -bottom-0.5 -right-0.5 bg-green-500 rounded-full border-2 border-white dark:border-secondary-900 transition-all duration-300',
            isScrolled ? 'w-2.5 h-2.5' : 'w-3 h-3'
          )}></div>
        </div>

        {/* Name and dropdown arrow */}
        <div className="flex items-center space-x-1">
          <span className={cn(
            'font-medium text-secondary-700 dark:text-secondary-300 font-mono max-w-24 truncate transition-all duration-300',
            isScrolled ? 'text-xs' : 'text-sm'
          )}>
            {displayName}
          </span>
          <ChevronDown 
            className={cn(
              'text-secondary-400 transition-transform transition-all duration-300',
              isScrolled ? 'w-3 h-3' : 'w-4 h-4',
              isDropdownOpen ? 'rotate-180' : ''
            )} 
          />
        </div>
      </Button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-secondary-900 rounded-lg shadow-lg border border-secondary-200 dark:border-secondary-700 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-secondary-200 dark:border-secondary-700">
            <div className="flex items-center space-x-3">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold">
                  {initials}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100 truncate">
                  {displayName}
                </p>
                <p className="text-xs text-secondary-500 dark:text-secondary-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <Link 
              href="/dashboard"
              className="flex items-center px-4 py-2 text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
              onClick={() => setIsDropdownOpen(false)}
            >
              <User className="w-4 h-4 mr-3" />
              Dashboard
            </Link>
            
            <Link 
              href="/settings"
              className="flex items-center px-4 py-2 text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
              onClick={() => setIsDropdownOpen(false)}
            >
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </Link>
          </div>

          {/* Sign Out */}
          <div className="border-t border-secondary-200 dark:border-secondary-700 pt-1">
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
