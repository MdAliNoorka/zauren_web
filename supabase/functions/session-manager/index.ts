// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface SessionData {
  user: any
  profile?: any
  isActive: boolean
  lastActivity: string
  sessionPreferences?: any
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

// Rate limiting storage
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string, maxRequests = 30, windowMs = 60000): boolean {
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

async function validateSession(supabase: any, authHeader: string): Promise<SessionData> {
  try {
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error || !user) {
      return {
        user: null,
        isActive: false,
        lastActivity: new Date().toISOString()
      }
    }

    // Try to get user profile (if table exists)
    let profile = null
    try {
      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      
      profile = profileData
    } catch (profileError) {
      // Table might not exist yet, that's ok
      console.log('Profile table not found or error:', profileError)
    }

    // Update last activity (if table exists)
    try {
      await supabase
        .from('user_sessions')
        .update({
          last_activity: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('is_active', true)
    } catch (sessionError) {
      // Table might not exist yet, that's ok
      console.log('Session table not found or error:', sessionError)
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        user_metadata: user.user_metadata,
        email_confirmed_at: user.email_confirmed_at,
        last_sign_in_at: user.last_sign_in_at
      },
      profile,
      isActive: true,
      lastActivity: new Date().toISOString()
    }
  } catch (error) {
    return {
      user: null,
      isActive: false,
      lastActivity: new Date().toISOString()
    }
  }
}

async function createUserProfile(supabase: any, user: any): Promise<any> {
  try {
    // Check if profile already exists
    const { data: existingProfile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (existingProfile) {
      return existingProfile
    }

    // Create new profile
    const { data: newProfile, error } = await supabase
      .from('user_profiles')
      .insert({
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || '',
        avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || '',
        email_confirmed: !!user.email_confirmed_at,
        email_confirmed_at: user.email_confirmed_at,
        last_sign_in_at: user.last_sign_in_at,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating profile:', error)
      return null
    }

    return newProfile
  } catch (error) {
    console.error('Profile creation error:', error)
    return null
  }
}

async function updateSessionActivity(supabase: any, userId: string, activity: string): Promise<void> {
  try {
    // Insert activity log (if table exists)
    await supabase
      .from('user_activity')
      .insert({
        user_id: userId,
        activity_type: activity,
        activity_details: { timestamp: new Date().toISOString() },
        created_at: new Date().toISOString()
      })
  } catch (error) {
    // Table might not exist yet, that's ok
    console.log('Activity logging error:', error)
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const action = url.searchParams.get('action') || 'validate'
    
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

    switch (action) {
      case 'validate': {
        const authHeader = req.headers.get('authorization')
        if (!authHeader) {
          return new Response(
            JSON.stringify({ 
              success: true, 
              session: { user: null, isActive: false, lastActivity: new Date().toISOString() }
            }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
          )
        }

        const sessionData = await validateSession(supabase, authHeader)
        
        if (sessionData.isActive && sessionData.user) {
          // Ensure profile exists
          if (!sessionData.profile) {
            sessionData.profile = await createUserProfile(supabase, sessionData.user)
          }
          
          // Log activity
          await updateSessionActivity(supabase, sessionData.user.id, 'session_validation')
        }

        return new Response(
          JSON.stringify({ 
            success: true, 
            session: sessionData
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
        )
      }

      case 'profile': {
        const authHeader = req.headers.get('authorization')
        if (!authHeader) {
          return new Response(
            JSON.stringify({ success: false, error: 'Authentication required' }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
          )
        }

        const sessionData = await validateSession(supabase, authHeader)
        if (!sessionData.isActive || !sessionData.user) {
          return new Response(
            JSON.stringify({ success: false, error: 'Invalid session' }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
          )
        }

        if (req.method === 'GET') {
          // Get profile
          let profile = sessionData.profile
          if (!profile) {
            profile = await createUserProfile(supabase, sessionData.user)
          }

          return new Response(
            JSON.stringify({ 
              success: true, 
              profile,
              user: sessionData.user
            }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
          )
        } else if (req.method === 'PUT') {
          // Update profile
          const updateData = await req.json()
          
          try {
            const { data: updatedProfile, error } = await supabase
              .from('user_profiles')
              .update({
                ...updateData,
                updated_at: new Date().toISOString()
              })
              .eq('id', sessionData.user.id)
              .select()
              .single()

            if (error) {
              return new Response(
                JSON.stringify({ success: false, error: error.message }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
              )
            }

            // Log activity
            await updateSessionActivity(supabase, sessionData.user.id, 'profile_update')

            return new Response(
              JSON.stringify({ 
                success: true, 
                profile: updatedProfile
              }),
              { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
            )
          } catch (error) {
            return new Response(
              JSON.stringify({ success: false, error: 'Failed to update profile' }),
              { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
            )
          }
        }
        break
      }

      case 'logout': {
        const authHeader = req.headers.get('authorization')
        if (authHeader) {
          const sessionData = await validateSession(supabase, authHeader)
          if (sessionData.isActive && sessionData.user) {
            // Log logout activity
            await updateSessionActivity(supabase, sessionData.user.id, 'logout')
            
            // Update session record (if table exists)
            try {
              await supabase
                .from('user_sessions')
                .update({
                  sign_out_at: new Date().toISOString(),
                  is_active: false
                })
                .eq('user_id', sessionData.user.id)
                .eq('is_active', true)
            } catch (error) {
              console.log('Session table update error:', error)
            }
          }
        }

        return new Response(
          JSON.stringify({ success: true, message: 'Logged out successfully' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
        )
      }

      default:
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid action. Use validate, profile, or logout' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }}
        )
    }

  } catch (error) {
    console.error('Session management error:', error)
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
