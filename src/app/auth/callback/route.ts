import { createServerClient } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const redirect = requestUrl.searchParams.get('redirect') || '/dashboard'

  if (code) {
    const supabase = createServerClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(new URL('/auth/signin?error=callback_error', request.url))
    }

    if (data.session) {
      console.log('✅ Email confirmed, user logged in:', data.session.user.id)
      // Redirect to dashboard on successful email confirmation
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Redirect to the specified page or dashboard
  return NextResponse.redirect(new URL(redirect, request.url))
}
