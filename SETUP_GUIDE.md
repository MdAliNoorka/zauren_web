# Zauren Authentication Setup Guide

This guide will walk you through setting up Supabase authentication with email/password and Google OAuth for your Zauren application.

## 📋 Prerequisites

- A Supabase account (free tier is sufficient)
- A Google Cloud Console account
- Your Zauren application running locally

## 🚀 Part 1: Supabase Project Setup

### Step 1: Create a Supabase Project

1. Go to [Supabase](https://supabase.com) and sign in/sign up
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `zauren-web`
   - **Database Password**: Generate a secure password (save this!)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be created (2-3 minutes)

### Step 2: Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Anon key** (public key, starts with `eyJ...`)
   - **Service role key** (secret key, starts with `eyJ...`)

### Step 3: Configure Environment Variables

Create a `.env.local` file in your project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Optional: For production
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

**⚠️ Important**: Replace the placeholder values with your actual Supabase credentials.

## 🔐 Part 2: Enable Email Authentication

### Step 1: Configure Email Authentication

1. In Supabase dashboard, go to **Authentication** → **Settings**
2. Under **Auth Providers**, ensure **Email** is enabled
3. Configure email settings:
   - **Enable email confirmations**: ✅ (recommended)
   - **Enable email change confirmations**: ✅ (recommended)
   - **Enable secure email change**: ✅ (recommended)

### Step 2: Configure Email Templates (Optional)

1. Go to **Authentication** → **Email Templates**
2. Customize the email templates for:
   - Confirmation email
   - Password reset email
   - Email change confirmation

### Step 3: Test Email Authentication

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3001/auth/signup`
3. Try creating an account with your email
4. Check your email for the confirmation link

## 🌐 Part 3: Google OAuth Setup

### Step 1: Create Google OAuth Application

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one:
   - Click **Select a project** → **New Project**
   - Name: `zauren-auth`
   - Click **Create**

3. Enable Google+ API:
   - Go to **APIs & Services** → **Library**
   - Search for "Google+ API"
   - Click on it and press **Enable**

4. Configure OAuth consent screen:
   - Go to **APIs & Services** → **OAuth consent screen**
   - Choose **External** user type
   - Fill in the required fields:
     - **App name**: `Zauren`
     - **User support email**: Your email
     - **Developer contact email**: Your email
   - Add authorized domains (for production):
     - `zauren.dev` (your domain)
   - Click **Save and Continue**

5. Create OAuth credentials:
   - Go to **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **OAuth 2.0 Client IDs**
   - Choose **Web application**
   - Name: `Zauren Web App`
   - Add authorized redirect URIs:
     ```
     http://localhost:3001/auth/callback
     https://your-project-ref.supabase.co/auth/v1/callback
     ```
   - Click **Create**

6. Copy your credentials:
   - **Client ID**: `xxxxx.apps.googleusercontent.com`
   - **Client Secret**: `GOCSPX-xxxxx`

### Step 2: Configure Google OAuth in Supabase

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Google** and click the toggle to enable it
3. Enter your Google OAuth credentials:
   - **Client ID**: Paste your Google Client ID
   - **Client Secret**: Paste your Google Client Secret
4. Set the redirect URL (should be auto-filled):
   ```
   https://your-project-ref.supabase.co/auth/v1/callback
   ```
5. Click **Save**

### Step 3: Test Google OAuth

1. Make sure your development server is running
2. Navigate to `http://localhost:3001/auth/signin`
3. Click "Continue with Google"
4. Complete the Google sign-in flow
5. You should be redirected back to your app and logged in

## 🗄️ Part 4: Database Setup (Optional)

If you want to store additional user profile information:

### Step 1: Create Profiles Table

1. In Supabase dashboard, go to **SQL Editor**
2. Run this SQL to create a profiles table:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## 🚦 Part 5: Testing Your Setup

### Test Checklist

- [ ] **Email Signup**: Create account with email/password
- [ ] **Email Confirmation**: Check email and click confirmation link
- [ ] **Email Signin**: Sign in with email/password
- [ ] **Google Signup**: Create account with Google OAuth
- [ ] **Google Signin**: Sign in with Google OAuth
- [ ] **Protected Routes**: Try accessing `/dashboard` without being logged in
- [ ] **Navigation**: Check that user menu appears when logged in
- [ ] **Sign Out**: Test the sign-out functionality

### Common Issues and Solutions

#### 1. "Invalid login credentials" error
- **Cause**: Wrong email/password or user hasn't confirmed email
- **Solution**: Check email for confirmation link, or reset password

#### 2. Google OAuth redirect error
- **Cause**: Incorrect redirect URI configuration
- **Solution**: Ensure redirect URIs match exactly in both Google Console and Supabase

#### 3. "Email not confirmed" error
- **Cause**: User hasn't clicked email confirmation link
- **Solution**: Check spam folder, or disable email confirmation for testing

#### 4. Environment variables not loading
- **Cause**: `.env.local` file not in project root or server not restarted
- **Solution**: Restart development server after adding environment variables

## 🌍 Part 6: Production Deployment

When you're ready to deploy to production:

### Step 1: Update Environment Variables

Add your production environment variables to your hosting platform:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=https://zauren.dev
```

### Step 2: Update OAuth Settings

1. **Google Console**:
   - Add your production domain to authorized redirect URIs
   - Add your production domain to authorized domains

2. **Supabase**:
   - Go to **Authentication** → **Settings**
   - Update **Site URL** to your production domain
   - Add your production domain to **Additional redirect URLs**

### Step 3: Update CORS Settings

In Supabase **Settings** → **API**:
- Add your production domain to **CORS origins**

## 🔒 Security Best Practices

1. **Environment Variables**:
   - Never commit `.env.local` to version control
   - Use different Supabase projects for development and production

2. **Row Level Security**:
   - Always enable RLS on your tables
   - Create appropriate policies for data access

3. **Email Confirmation**:
   - Keep email confirmation enabled in production
   - Set up proper email templates

4. **Rate Limiting**:
   - Configure rate limiting in Supabase for auth endpoints
   - Monitor authentication attempts

## 📞 Support

If you encounter any issues:

1. Check the [Supabase Documentation](https://supabase.com/docs)
2. Visit the [Supabase Discord](https://discord.supabase.com)
3. Check your browser's developer console for errors
4. Verify all environment variables are set correctly

## 🎉 Congratulations!

Your Zauren application now has complete authentication functionality with both email/password and Google OAuth support! Users can sign up, sign in, and access protected areas of your application.

Next steps might include:
- Setting up user profiles
- Adding role-based access control
- Implementing password reset functionality
- Adding more OAuth providers (GitHub, Facebook, etc.)
