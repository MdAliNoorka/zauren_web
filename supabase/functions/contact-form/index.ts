// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts"

interface ContactFormData {
  name: string
  email: string
  company?: string
  subject: string
  message: string
}

interface EmailData {
  name: string
  email: string
  company?: string
  subject: string
  message: string
  fromEmail: string
  toEmail: string
}

// Function to send email via Resend API
async function sendEmailViaResend(data: EmailData) {
  const resendApiKey = Deno.env.get('RESEND_API_KEY')
  if (!resendApiKey) {
    throw new Error('RESEND_API_KEY not configured')
  }

  const emailResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: data.fromEmail,
      to: [data.toEmail],
      subject: `New Contact Form: ${data.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Submitted at: ${new Date().toISOString()}</small></p>
      `,
    }),
  })

  if (!emailResponse.ok) {
    throw new Error(`Resend API error: ${await emailResponse.text()}`)
  }
}

// Function to send email via SMTP (Zoho, Gmail, etc.)
async function sendEmailViaSMTP(data: EmailData) {
  const smtpHost = Deno.env.get('SMTP_HOST') || 'smtp.zoho.com'
  const smtpPort = parseInt(Deno.env.get('SMTP_PORT') || '587')
  const smtpUser = Deno.env.get('SMTP_USER')
  const smtpPass = Deno.env.get('SMTP_PASSWORD')

  if (!smtpUser || !smtpPass) {
    throw new Error('SMTP credentials not configured')
  }

  const client = new SMTPClient({
    connection: {
      hostname: smtpHost,
      port: smtpPort,
      tls: true,
      auth: {
        username: smtpUser,
        password: smtpPass,
      },
    },
  })

  await client.send({
    from: data.fromEmail,
    to: data.toEmail,
    subject: `New Contact Form: ${data.subject}`,
    content: `
      New Contact Form Submission
      
      Name: ${data.name}
      Email: ${data.email}
      ${data.company ? `Company: ${data.company}` : ''}
      Subject: ${data.subject}
      
      Message:
      ${data.message}
      
      Submitted at: ${new Date().toISOString()}
    `,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Submitted at: ${new Date().toISOString()}</small></p>
    `,
  })

  await client.close()
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    // Parse request body
    const { name, email, company, subject, message }: ContactFormData = await req.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Store contact form submission in database
    const { data, error: dbError } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name,
          email,
          company,
          subject,
          message,
          submitted_at: new Date().toISOString(),
          status: 'new'
        }
      ])
      .select()

    if (dbError) {
      console.error('Database error:', dbError)
      return new Response(
        JSON.stringify({ error: 'Failed to store submission' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Send email notification
    const emailMethod = Deno.env.get('EMAIL_METHOD') || 'resend' // 'resend' or 'smtp'
    const fromEmail = Deno.env.get('FROM_EMAIL') || 'noreply@zauren.dev'
    const toEmail = Deno.env.get('CONTACT_EMAIL') || 'hello@zauren.dev'

    try {
      if (emailMethod === 'smtp') {
        // Use SMTP (Zoho, Gmail, etc.)
        await sendEmailViaSMTP({
          name,
          email,
          company,
          subject,
          message,
          fromEmail,
          toEmail
        })
      } else {
        // Use Resend API (default)
        await sendEmailViaResend({
          name,
          email,
          company,
          subject,
          message,
          fromEmail,
          toEmail
        })
      }
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Don't fail the request if email fails, just log it
    }

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Thank you for your message! We\'ll get back to you soon.',
        submissionId: data[0]?.id
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
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

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/contact-form' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
