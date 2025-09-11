import { createServerClient } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const redirect = requestUrl.searchParams.get('redirect')
    
    // Validate that we have a code parameter
    if (!code) {
      console.error('❌ No auth code provided in callback')
      return NextResponse.redirect(new URL('/auth/signin?error=missing_code', requestUrl.origin))
    }

    // Validate code format (basic security check)
    if (typeof code !== 'string' || code.length < 10) {
      console.error('❌ Invalid auth code format')
      return NextResponse.redirect(new URL('/auth/signin?error=invalid_code', requestUrl.origin))
    }

    const supabase = createServerClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('❌ Auth callback error:', error.message)
      return NextResponse.redirect(new URL(`/auth/signin?error=${encodeURIComponent(error.message)}`, requestUrl.origin))
    }

    if (data.session && data.user) {
      console.log('✅ Email confirmed successfully:', data.user.email)
      
      // Validate redirect URL for security (must be same origin)
      let redirectUrl = '/dashboard'
      if (redirect) {
        try {
          const redirectUrlObj = new URL(redirect, requestUrl.origin)
          if (redirectUrlObj.origin === requestUrl.origin) {
            redirectUrl = redirect
          }
        } catch {
          // Invalid redirect URL, use default
          redirectUrl = '/dashboard'
        }
      }
      
      // Create response with proper session cookies
      const response = NextResponse.redirect(new URL(redirectUrl, requestUrl.origin))
      
      return response
    }

    // If we get here, something went wrong
    console.error('❌ No session created despite successful code exchange')
    return NextResponse.redirect(new URL('/auth/signin?error=session_creation_failed', requestUrl.origin))

  } catch (error) {
    console.error('❌ Unexpected error in auth callback:', error)
    return NextResponse.redirect(new URL('/auth/signin?error=unexpected_error', new URL(request.url).origin))
  }
}
