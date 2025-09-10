// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface HealthCheck {
  name: string
  status: 'success' | 'error' | 'warning'
  message: string
  responseTime?: number
  details?: any
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function checkSupabaseConnection(): Promise<HealthCheck> {
  const startTime = Date.now()
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    const { data, error } = await supabase.auth.getSession()
    const responseTime = Date.now() - startTime
    
    if (error) {
      return {
        name: 'Supabase Connection',
        status: 'error',
        message: `Connection error: ${error.message}`,
        responseTime
      }
    }
    
    return {
      name: 'Supabase Connection',
      status: 'success',
      message: 'Successfully connected to Supabase',
      responseTime
    }
  } catch (error) {
    return {
      name: 'Supabase Connection',
      status: 'error',
      message: `Connection failed: ${error}`,
      responseTime: Date.now() - startTime
    }
  }
}

async function checkDatabaseTables(): Promise<HealthCheck> {
  const startTime = Date.now()
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    // Check if required tables exist
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('count(*)')
      .limit(1)
    
    const responseTime = Date.now() - startTime
    
    if (error) {
      return {
        name: 'Database Tables',
        status: 'error',
        message: `Table check failed: ${error.message}`,
        responseTime
      }
    }
    
    return {
      name: 'Database Tables',
      status: 'success',
      message: 'Required tables are accessible',
      responseTime
    }
  } catch (error) {
    return {
      name: 'Database Tables',
      status: 'error',
      message: `Database error: ${error}`,
      responseTime: Date.now() - startTime
    }
  }
}

async function checkGroqAPI(): Promise<HealthCheck> {
  const startTime = Date.now()
  try {
    const groqApiKey = Deno.env.get('GROQ_API_KEY')
    
    if (!groqApiKey) {
      return {
        name: 'Groq AI API',
        status: 'error',
        message: 'Groq API key not configured',
        responseTime: Date.now() - startTime
      }
    }
    
    // Test API with a simple request
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: "test" }],
        model: "llama-3.3-70b-versatile",
        max_tokens: 10
      }),
    })
    
    const responseTime = Date.now() - startTime
    
    if (!response.ok) {
      return {
        name: 'Groq AI API',
        status: 'error',
        message: `API error: ${response.status} ${response.statusText}`,
        responseTime
      }
    }
    
    return {
      name: 'Groq AI API',
      status: 'success',
      message: 'AI service is operational',
      responseTime
    }
  } catch (error) {
    return {
      name: 'Groq AI API',
      status: 'error',
      message: `API connection failed: ${error}`,
      responseTime: Date.now() - startTime
    }
  }
}

async function checkEmailService(): Promise<HealthCheck> {
  const startTime = Date.now()
  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    
    if (!resendApiKey) {
      return {
        name: 'Email Service',
        status: 'warning',
        message: 'Email service not configured (optional)',
        responseTime: Date.now() - startTime
      }
    }
    
    // Test API connection (just check auth, don't send email)
    const response = await fetch('https://api.resend.com/emails', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
      },
    })
    
    const responseTime = Date.now() - startTime
    
    if (response.status === 401) {
      return {
        name: 'Email Service',
        status: 'error',
        message: 'Invalid email service API key',
        responseTime
      }
    }
    
    return {
      name: 'Email Service',
      status: 'success',
      message: 'Email service is configured',
      responseTime
    }
  } catch (error) {
    return {
      name: 'Email Service',
      status: 'warning',
      message: `Email check failed: ${error}`,
      responseTime: Date.now() - startTime
    }
  }
}

function checkEnvironmentVariables(): HealthCheck {
  const startTime = Date.now()
  const required = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY']
  const optional = ['GROQ_API_KEY', 'RESEND_API_KEY', 'FROM_EMAIL', 'CONTACT_EMAIL']
  
  const missing = required.filter(key => !Deno.env.get(key))
  const optionalMissing = optional.filter(key => !Deno.env.get(key))
  
  if (missing.length > 0) {
    return {
      name: 'Environment Variables',
      status: 'error',
      message: `Missing required variables: ${missing.join(', ')}`,
      responseTime: Date.now() - startTime,
      details: { missing, optionalMissing }
    }
  }
  
  if (optionalMissing.length > 0) {
    return {
      name: 'Environment Variables',
      status: 'warning',
      message: `Missing optional variables: ${optionalMissing.join(', ')}`,
      responseTime: Date.now() - startTime,
      details: { missing, optionalMissing }
    }
  }
  
  return {
    name: 'Environment Variables',
    status: 'success',
    message: 'All environment variables are configured',
    responseTime: Date.now() - startTime
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const startTime = Date.now()
    
    // Run all health checks in parallel
    const [
      envCheck,
      supabaseCheck,
      databaseCheck,
      groqCheck,
      emailCheck
    ] = await Promise.all([
      Promise.resolve(checkEnvironmentVariables()),
      checkSupabaseConnection(),
      checkDatabaseTables(),
      checkGroqAPI(),
      checkEmailService()
    ])
    
    const totalTime = Date.now() - startTime
    const checks = [envCheck, supabaseCheck, databaseCheck, groqCheck, emailCheck]
    
    // Determine overall status
    const hasErrors = checks.some(check => check.status === 'error')
    const hasWarnings = checks.some(check => check.status === 'warning')
    
    let overallStatus = 'healthy'
    if (hasErrors) overallStatus = 'unhealthy'
    else if (hasWarnings) overallStatus = 'degraded'
    
    const healthReport = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      totalResponseTime: totalTime,
      checks,
      summary: {
        total: checks.length,
        success: checks.filter(c => c.status === 'success').length,
        warnings: checks.filter(c => c.status === 'warning').length,
        errors: checks.filter(c => c.status === 'error').length
      }
    }
    
    const statusCode = hasErrors ? 503 : 200
    
    return new Response(
      JSON.stringify(healthReport, null, 2),
      { 
        status: statusCode, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Health check error:', error)
    return new Response(
      JSON.stringify({ 
        status: 'error',
        message: 'Health check system failure',
        error: error.toString(),
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/system-health' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
