-- Enhanced Authentication Tables Migration
-- This migration adds tables for user profiles and session tracking

-- User profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  company TEXT,
  job_title TEXT,
  bio TEXT,
  website TEXT,
  location TEXT,
  timezone TEXT DEFAULT 'UTC',
  language TEXT DEFAULT 'en',
  theme_preference TEXT DEFAULT 'system' CHECK (theme_preference IN ('light', 'dark', 'system')),
  email_notifications BOOLEAN DEFAULT true,
  marketing_emails BOOLEAN DEFAULT false,
  terms_accepted BOOLEAN DEFAULT false,
  terms_accepted_at TIMESTAMPTZ,
  privacy_accepted BOOLEAN DEFAULT false,
  privacy_accepted_at TIMESTAMPTZ,
  email_confirmed BOOLEAN DEFAULT false,
  email_confirmed_at TIMESTAMPTZ,
  phone_confirmed BOOLEAN DEFAULT false,
  phone_confirmed_at TIMESTAMPTZ,
  last_sign_in_at TIMESTAMPTZ,
  sign_in_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User sessions tracking table
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  session_id TEXT,
  sign_in_at TIMESTAMPTZ,
  sign_out_at TIMESTAMPTZ,
  sign_up_at TIMESTAMPTZ,
  ip_address INET,
  user_agent TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  country TEXT,
  city TEXT,
  session_duration_preference TEXT DEFAULT '1d' CHECK (session_duration_preference IN ('1h', '1d', '7d', '30d')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User activity log table
CREATE TABLE IF NOT EXISTS user_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL, -- 'sign_in', 'sign_out', 'password_change', 'profile_update', etc.
  activity_details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Email verification tokens table
CREATE TABLE IF NOT EXISTS email_verification_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  token_type TEXT NOT NULL CHECK (token_type IN ('email_verification', 'password_reset', 'email_change')),
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_sign_in_at ON user_sessions(sign_in_at);
CREATE INDEX IF NOT EXISTS idx_user_activity_user_id ON user_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_created_at ON user_activity(created_at);
CREATE INDEX IF NOT EXISTS idx_email_verification_tokens_token ON email_verification_tokens(token);
CREATE INDEX IF NOT EXISTS idx_email_verification_tokens_user_id ON email_verification_tokens(user_id);

-- Row Level Security (RLS) policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_verification_tokens ENABLE ROW LEVEL SECURITY;

-- User profiles policies
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- User sessions policies
CREATE POLICY "Users can view their own sessions" ON user_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all sessions" ON user_sessions
  FOR ALL USING (auth.role() = 'service_role');

-- User activity policies
CREATE POLICY "Users can view their own activity" ON user_activity
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all activity" ON user_activity
  FOR ALL USING (auth.role() = 'service_role');

-- Email verification tokens policies
CREATE POLICY "Users can view their own tokens" ON email_verification_tokens
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all tokens" ON email_verification_tokens
  FOR ALL USING (auth.role() = 'service_role');

-- Functions to automatically update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update updated_at on user_profiles
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create user profile on user creation
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, email, full_name, email_confirmed, email_confirmed_at, created_at)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.email_confirmed_at IS NOT NULL,
    NEW.email_confirmed_at,
    NEW.created_at
  );
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to create profile when user signs up
CREATE TRIGGER create_user_profile_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_profile();

-- Function to track user sign-ins
CREATE OR REPLACE FUNCTION track_user_signin()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.last_sign_in_at IS NOT NULL AND (OLD.last_sign_in_at IS NULL OR NEW.last_sign_in_at > OLD.last_sign_in_at) THEN
    -- Update user profile sign-in tracking
    UPDATE user_profiles 
    SET 
      last_sign_in_at = NEW.last_sign_in_at,
      sign_in_count = COALESCE(sign_in_count, 0) + 1
    WHERE id = NEW.id;
    
    -- Log the activity
    INSERT INTO user_activity (user_id, activity_type, activity_details)
    VALUES (NEW.id, 'sign_in', jsonb_build_object('timestamp', NEW.last_sign_in_at));
  END IF;
  
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to track sign-ins
CREATE TRIGGER track_user_signin_trigger
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION track_user_signin();

-- Insert some initial data for demo purposes (optional)
-- This can be removed in production
DO $$
BEGIN
  -- Add any initial configuration data here if needed
  NULL;
END $$;
