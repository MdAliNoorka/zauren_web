'use client'

import { useEffect } from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Ensure theme is properly set on client side (backup for the script)
    try {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      } else {
        // Default to light theme
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
      }
    } catch (e) {
      // Default to light theme if localStorage is not available
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return <>{children}</>
}
