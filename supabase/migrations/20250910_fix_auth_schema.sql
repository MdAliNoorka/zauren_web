-- Fix database schema to work with Supabase Auth
-- Drop conflicting tables and recreate with proper UUID references

-- First, drop all dependent tables
DROP TABLE IF EXISTS public.token_usage CASCADE;
DROP TABLE IF EXISTS public.metrics CASCADE;
DROP TABLE IF EXISTS public.integrations CASCADE;
DROP TABLE IF EXISTS public.inventory_sources CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.cart_items CASCADE;
DROP TABLE IF EXISTS public.carts CASCADE;
DROP TABLE IF EXISTS public.order_items CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.subscriptions CASCADE;
DROP TABLE IF EXISTS public.payment_transactions CASCADE;
DROP TABLE IF EXISTS public.plans CASCADE;

-- Drop the conflicting users table
DROP TABLE IF EXISTS public.users CASCADE;

-- Ensure user_profiles table exists and is properly configured
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id uuid NOT NULL,
  email text NOT NULL UNIQUE,
  full_name text,
  avatar_url text,
  phone text,
  company text,
  job_title text,
  bio text,
  website text,
  location text,
  timezone text DEFAULT 'UTC'::text,
  language text DEFAULT 'en'::text,
  theme_preference text DEFAULT 'system'::text CHECK (theme_preference = ANY (ARRAY['light'::text, 'dark'::text, 'system'::text])),
  email_notifications boolean DEFAULT true,
  marketing_emails boolean DEFAULT false,
  terms_accepted boolean DEFAULT false,
  terms_accepted_at timestamp with time zone,
  privacy_accepted boolean DEFAULT false,
  privacy_accepted_at timestamp with time zone,
  email_confirmed boolean DEFAULT false,
  email_confirmed_at timestamp with time zone,
  phone_confirmed boolean DEFAULT false,
  phone_confirmed_at timestamp with time zone,
  last_sign_in_at timestamp with time zone,
  sign_in_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_profiles_pkey PRIMARY KEY (id),
  CONSTRAINT user_profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Ensure user_sessions table exists
CREATE TABLE IF NOT EXISTS public.user_sessions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  email text,
  session_id text,
  sign_in_at timestamp with time zone,
  sign_out_at timestamp with time zone,
  sign_up_at timestamp with time zone,
  ip_address inet,
  user_agent text,
  device_type text,
  browser text,
  os text,
  country text,
  city text,
  session_duration_preference text DEFAULT '1d'::text CHECK (session_duration_preference = ANY (ARRAY['1h'::text, '1d'::text, '7d'::text, '30d'::text])),
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_sessions_pkey PRIMARY KEY (id),
  CONSTRAINT user_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Ensure user_activity table exists
CREATE TABLE IF NOT EXISTS public.user_activity (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  activity_type text NOT NULL,
  activity_details jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_activity_pkey PRIMARY KEY (id),
  CONSTRAINT user_activity_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Ensure contact_submissions table exists
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new'::text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT contact_submissions_pkey PRIMARY KEY (id)
);

-- Ensure chat_analytics table exists
CREATE TABLE IF NOT EXISTS public.chat_analytics (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  message_text text,
  response_text text,
  response_time_ms integer,
  user_id text,
  session_id text,
  client_ip text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT chat_analytics_pkey PRIMARY KEY (id)
);

-- Ensure email_verification_tokens table exists
CREATE TABLE IF NOT EXISTS public.email_verification_tokens (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  email text NOT NULL,
  token text NOT NULL UNIQUE,
  token_type text NOT NULL CHECK (token_type = ANY (ARRAY['email_verification'::text, 'password_reset'::text, 'email_change'::text])),
  expires_at timestamp with time zone NOT NULL,
  used_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT email_verification_tokens_pkey PRIMARY KEY (id),
  CONSTRAINT email_verification_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_verification_tokens ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_profiles
CREATE POLICY "Users can view own profile"
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create RLS policies for user_sessions
CREATE POLICY "Users can view own sessions"
  ON public.user_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions"
  ON public.user_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions"
  ON public.user_sessions FOR UPDATE
  USING (auth.uid() = user_id);

-- Create RLS policies for user_activity
CREATE POLICY "Users can view own activity"
  ON public.user_activity FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service can insert activity"
  ON public.user_activity FOR INSERT
  WITH CHECK (true);

-- Create RLS policies for contact_submissions
CREATE POLICY "Anyone can submit contact forms"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

-- Create RLS policies for chat_analytics
CREATE POLICY "Service can insert chat analytics"
  ON public.chat_analytics FOR INSERT
  WITH CHECK (true);

-- Create RLS policies for email_verification_tokens
CREATE POLICY "Users can view own tokens"
  ON public.email_verification_tokens FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service can insert tokens"
  ON public.email_verification_tokens FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service can update tokens"
  ON public.email_verification_tokens FOR UPDATE
  WITH CHECK (true);

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update user profile timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update timestamp on profile updates
DROP TRIGGER IF EXISTS handle_updated_at ON public.user_profiles;
CREATE TRIGGER handle_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
