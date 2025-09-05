@echo off
echo 🚀 Zauren Authentication Setup
echo ================================
echo.

REM Check if .env.local exists
if not exist .env.local (
    echo 📝 Creating .env.local file...
    (
        echo # Supabase Configuration
        echo # Replace these with your actual Supabase credentials
        echo NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
        echo NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
        echo SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
        echo.
        echo # Site URL ^(change for production^)
        echo NEXT_PUBLIC_SITE_URL=http://localhost:3001
    ) > .env.local
    echo ✅ .env.local file created!
    echo ⚠️  Please edit .env.local with your actual Supabase credentials
) else (
    echo ✅ .env.local file already exists
)

echo.
echo 📋 Setup Checklist:
echo ===================
echo.
echo 1. 🏗️  Create Supabase Project:
echo    - Go to https://supabase.com
echo    - Create new project named 'zauren-web'
echo    - Save your database password!
echo.
echo 2. 🔑 Get Supabase Credentials:
echo    - Go to Settings → API in your Supabase dashboard
echo    - Copy Project URL and Anon key
echo    - Update .env.local with these values
echo.
echo 3. 📧 Enable Email Authentication:
echo    - Go to Authentication → Settings
echo    - Ensure Email provider is enabled
echo    - Enable email confirmations
echo.
echo 4. 🌐 Setup Google OAuth:
echo    - Create Google Cloud Console project
echo    - Enable Google+ API
echo    - Create OAuth 2.0 credentials
echo    - Add redirect URI: https://your-project-ref.supabase.co/auth/v1/callback
echo    - Configure in Supabase Authentication → Providers → Google
echo.
echo 5. 🧪 Test Your Setup:
echo    - Run: npm run dev
echo    - Visit: http://localhost:3001/auth/signup
echo    - Try both email and Google sign-up
echo.
echo 📖 For detailed instructions, see SETUP_GUIDE.md
echo.
echo 🎉 Happy coding!
pause
