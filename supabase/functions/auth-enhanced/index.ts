// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface SignInRequest {
  email: string
  password: string
  rememberMe?: boolean
}

interface SignUpRequest {
  email: string
  password: string
  fullName: string
  acceptTerms: boolean
}

interface AuthResponse {
  success: boolean
  user?: any
  session?: any
  error?: string
  requiresEmailConfirmation?: boolean
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

// Rate limiting storage (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string, maxRequests = 10, windowMs = 60000): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (record.count >= maxRequests) {
    return false
  }
  
  record.count++
  return true
}

async function signInUser(supabase: any, request: SignInRequest): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: request.email,
      password: request.password,
    })

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    // Log successful sign-in
    await supabase
      .from('user_sessions')
      .insert({
        user_id: data.user.id,
        email: data.user.email,
        sign_in_at: new Date().toISOString(),
        ip_address: 'edge-function', // In production, get real IP
        user_agent: 'web-app',
        session_duration_preference: request.rememberMe ? '30d' : '1d'
      })

    return {
      success: true,
      user: data.user,
      session: data.session
    }
  } catch (error) {
    return {
      success: false,
      error: 'An unexpected error occurred'
    }
  }
}

async function signUpUser(supabase: any, request: SignUpRequest): Promise<AuthResponse> {
  try {
    // Check if user already exists
    const { data: existingUser } = await supabase.auth.getUser()
    
    const { data, error } = await supabase.auth.signUp({
      email: request.email,
      password: request.password,
      options: {
        data: {
          full_name: request.fullName,
          terms_accepted: request.acceptTerms,
          terms_accepted_at: new Date().toISOString()
        },
        emailRedirectTo: undefined // Disable email confirmation temporarily for testing
      }
    })

    console.log('SignUp response:', { data, error })

    if (error) {
      console.error('Auth signup error:', error)
      return {
        success: false,
        error: error.message
      }
    }

    // Manually create user profile since trigger is disabled for testing
    if (data.user) {
      try {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: data.user.id,
            email: data.user.email,
            full_name: request.fullName,
            terms_accepted: request.acceptTerms,
            terms_accepted_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
        
        if (profileError) {
          console.error('Profile creation error:', profileError)
        }

        // Try to create session log
        const { error: sessionError } = await supabase
          .from('user_sessions')
          .insert({
            user_id: data.user.id,
            email: data.user.email,
            sign_up_at: new Date().toISOString(),
            ip_address: 'edge-function',
            user_agent: 'web-app'
          })
        
        if (sessionError) {
          console.warn('Session creation error:', sessionError)
        }
      } catch (dbError) {
        console.warn('Database operation failed:', dbError)
      }
    }

    return {
      success: true,
      user: data.user,
      session: data.session,
      requiresEmailConfirmation: !data.session // If no session, email confirmation required
    }
  } catch (error: any) {
    console.error('SignUp error:', error)
    return {
      success: false,
      error: error?.message || 'Database error saving new user'
    }
  }
}

async function signOutUser(supabase: any, userId: string): Promise<AuthResponse> {
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    // Log the sign-out
    await supabase
      .from('user_sessions')
      .update({
        sign_out_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .is('sign_out_at', null)

    return {
      success: true
    }
  } catch (error) {
    return {
      success: false,
      error: 'An unexpected error occurred during sign-out'
    }
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const action = url.searchParams.get('action') || 'signin'
    
    // Rate limiting
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    if (!checkRateLimit(clientIP)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Too many requests. Please try again later.' }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    let result: AuthResponse

    switch (action) {
      case 'signin':
        if (req.method !== 'POST') {
          return new Response(
            JSON.stringify({ success: false, error: 'POST method required for sign-in' }),
            { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
          )
        }
        const signInData: SignInRequest = await req.json()
        result = await signInUser(supabase, signInData)
        break

      case 'signup':
        if (req.method !== 'POST') {
          return new Response(
            JSON.stringify({ success: false, error: 'POST method required for sign-up' }),
            { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
          )
        }
        const signUpData: SignUpRequest = await req.json()
        result = await signUpUser(supabase, signUpData)
        break

      case 'signout':
        if (req.method !== 'POST') {
          return new Response(
            JSON.stringify({ success: false, error: 'POST method required for sign-out' }),
            { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
          )
        }
        const { userId } = await req.json()
        result = await signOutUser(supabase, userId)
        break

      case 'session':
        if (req.method !== 'GET') {
          return new Response(
            JSON.stringify({ success: false, error: 'GET method required for session check' }),
            { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
          )
        }
        
        const authHeader = req.headers.get('authorization')
        if (!authHeader) {
          return new Response(
            JSON.stringify({ success: false, error: 'No authorization header' }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
          )
        }

        const token = authHeader.replace('Bearer ', '')
        const { data: { user }, error } = await supabase.auth.getUser(token)
        
        if (error || !user) {
          return new Response(
            JSON.stringify({ success: false, error: 'Invalid session' }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
          )
        }

        return new Response(
          JSON.stringify({ 
            success: true, 
            user: {
              id: user.id,
              email: user.email,
              user_metadata: user.user_metadata
            }
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
        )

      default:
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid action. Use signin, signup, signout, or session' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
        )
    }

    const statusCode = result.success ? 200 : 400
    return new Response(
      JSON.stringify(result),
      { 
        status: statusCode, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Auth function error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Internal server error' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
