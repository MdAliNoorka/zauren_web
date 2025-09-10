// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface ChatRequest {
  message: string
  userId?: string
  sessionId?: string
}

interface ChatAnalytics {
  message_count: number
  response_time_ms: number
  user_id?: string
  session_id?: string
  message_text: string
  response_text: string
  created_at: string
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Rate limiting storage (in-memory for demo, use Redis in production)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>()

function checkRateLimit(clientId: string, maxRequests = 10, windowMs = 60000): boolean {
  const now = Date.now()
  const clientData = rateLimitMap.get(clientId)
  
  if (!clientData || now - clientData.lastReset > windowMs) {
    rateLimitMap.set(clientId, { count: 1, lastReset: now })
    return true
  }
  
  if (clientData.count >= maxRequests) {
    return false
  }
  
  clientData.count++
  return true
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get client IP for rate limiting
    const clientIp = req.headers.get('x-forwarded-for') || 'unknown'
    
    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const startTime = Date.now()
    
    // Parse request body
    const { message, userId, sessionId }: ChatRequest = await req.json()

    // Validate message
    if (!message || message.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Check message length
    if (message.length > 1000) {
      return new Response(
        JSON.stringify({ error: 'Message too long. Maximum 1000 characters.' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get Groq API key
    const groqApiKey = Deno.env.get('GROQ_API_KEY')
    if (!groqApiKey) {
      return new Response(
        JSON.stringify({ error: 'AI service is not configured. Please contact support.' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Enhanced system prompt with context
    const systemPrompt = `You are a helpful AI customer service assistant for Zauren, a company that provides AI-powered customer service solutions for small businesses.

About Zauren:
- We help businesses set up AI assistants that chat with customers automatically
- Businesses share their information with us, we handle all technical setup
- AI learns about products, services, and business details
- Available 24/7 for customer questions, orders, support
- Works on WhatsApp, Instagram, Facebook Messenger, web chat
- Increases sales and customer satisfaction
- Reduces support costs by 60% on average
- 98% customer satisfaction rate
- <2s average response time

Current date: ${new Date().toLocaleDateString()}

Guidelines:
- Keep responses concise (1-2 sentences, max 50 words)
- Be professional, friendly, and helpful
- Focus on how Zauren can help their business
- For pricing: mention plans start at $19/month
- For technical questions: emphasize we handle all setup
- For features: highlight 24/7 AI, multi-platform, easy setup`

    // Make request to Groq API
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: message
          }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 100,
        top_p: 0.9
      }),
    })

    if (!groqResponse.ok) {
      throw new Error(`Groq API error: ${groqResponse.status}`)
    }

    const groqData = await groqResponse.json()
    const aiResponse = groqData.choices[0]?.message?.content || "I'm here to help! Could you please rephrase your question?"
    
    const responseTime = Date.now() - startTime

    // Initialize Supabase client for analytics
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Store analytics (async, don't wait)
    supabase
      .from('chat_analytics')
      .insert([
        {
          message_text: message.substring(0, 500), // Truncate for storage
          response_text: aiResponse.substring(0, 500),
          response_time_ms: responseTime,
          user_id: userId,
          session_id: sessionId,
          client_ip: clientIp.substring(0, 100),
          created_at: new Date().toISOString()
        }
      ])
      .then(({ error }) => {
        if (error) console.error('Analytics storage error:', error)
      })

    // Return response with analytics
    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        responseTime,
        timestamp: new Date().toISOString(),
        sessionId: sessionId || `session_${Date.now()}`
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Chat error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'I\'m having trouble right now. Please try again in a moment!',
        responseTime: Date.now()
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

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/ai-chat-enhanced' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
