# Render Deployment Guide 🚀

## Quick Deploy to Render

### 1. Prepare Your Repository
Your repository is now ready with:
- ✅ No hardcoded API keys
- ✅ Proper environment variable handling
- ✅ Successful production build
- ✅ Security best practices

### 2. Push to GitHub
```bash
git push -u origin main
```

### 3. Deploy on Render

#### Option A: Deploy from GitHub
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `MdAliNoorka/zauren_web`
4. Configure settings:
   - **Name**: `zauren-web`
   - **Branch**: `main`
   - **Root Directory**: (leave blank)
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

#### Option B: Deploy with One Click
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/MdAliNoorka/zauren_web)

### 4. Environment Variables
Add these in your Render service settings:

#### Required for Basic Functionality:
```bash
# Supabase (for authentication)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Groq AI (for chat functionality)
GROQ_API_KEY=your-groq-api-key-here
```

### 5. Render Configuration

Create `render.yaml` in your project root (optional):
```yaml
services:
  - type: web
    name: zauren-web
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
```

### 6. Domain Setup (Optional)
1. Go to your service settings in Render
2. Navigate to "Custom Domains"
3. Add your domain and follow DNS instructions

## Environment Variables Details

### How to Get Supabase Keys:
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings → API
4. Copy the URL and anon key

### How to Get Groq API Key:
1. Go to [Groq Console](https://console.groq.com/)
2. Sign up/Login
3. Generate an API key
4. Copy the key (starts with `gsk_`)

## Features That Work Without Setup:
- ✅ Landing page with animations
- ✅ Pricing page
- ✅ Contact page (form display)
- ✅ Responsive design
- ✅ Dark/light theme

## Features That Need Environment Variables:
- 🔑 User authentication (Supabase)
- 🔑 AI chat functionality (Groq)
- 🔑 Contact form submission (Supabase)
- 🔑 Dashboard features (Supabase)

## Troubleshooting

### Build Fails:
- ✅ **Fixed**: Build now works without environment variables
- Check build logs in Render dashboard

### Chat Not Working:
- Ensure `GROQ_API_KEY` is set correctly
- Check API key is valid and has credits

### Authentication Issues:
- Verify Supabase environment variables
- Check Supabase project is active

## Security Features ✅
- No API keys in source code
- Proper environment variable handling
- Graceful fallbacks for missing configs
- GitHub push protection compliant

Your application is now secure and ready for production deployment! 🎉
