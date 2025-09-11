# 🚀 PRODUCTION DEPLOYMENT CHECKLIST

## 1. Environment Variables to Update

When deploying, update these in your hosting platform's environment settings:

```bash
# CRITICAL: Update this to your production domain
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Keep these as-is (already production Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://dlvcxajdrjobnyergown.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsdmN4YWpkcmpvYm55ZXJnb3duIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MDIxMDEsImV4cCI6MjA3MzA3ODEwMX0.96KAolxIv379ZguY_nlzvsJsRfvS_gcMfCzos2PblMw
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsdmN4YWpkcmpvYm55ZXJnb3duIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzUwMjEwMSwiZXhwIjoyMDczMDc4MTAxfQ.U6_ttJKNHbYvB1Y-3un6CFBfG3BBcaNuvzJphMbcQcs

# App settings (update domain)
NEXT_PUBLIC_SITE_NAME=Zauren
NEXT_PUBLIC_SITE_DESCRIPTION=Modern SaaS Platform
NODE_ENV=production
```

**Note: GROQ_API_KEY is NOT needed - AI functionality is handled by Edge Functions!**

## 2. Supabase Dashboard Configuration

Go to https://supabase.com/dashboard/project/dlvcxajdrjobnyergown/auth/url-configuration

Update:
- **Site URL**: `https://your-domain.com`
- **Redirect URLs**: Add `https://your-domain.com/auth/callback`

## 3. Next.js Config Update (if using images)

In `next.config.js`, add your domain:
```javascript
images: {
  domains: ['localhost', 'your-domain.com'],
},
```

## 4. Platform-Specific Instructions

### For Vercel:
1. Connect GitHub repo
2. Add environment variables in Vercel dashboard
3. Deploy automatically

### For Netlify:
1. Connect GitHub repo  
2. Add environment variables in Netlify dashboard
3. Build command: `npm run build`
4. Publish directory: `.next`

### For Render:
1. Use the included `render.yaml` config
2. Add environment variables in Render dashboard
3. Deploy from GitHub

## 5. Post-Deployment Steps

1. Test signup/signin flow
2. Verify email confirmations work
3. Test AI chat functionality
4. Check contact form submissions
5. Verify dashboard access

## ⚠️ IMPORTANT NOTES

- **Never commit .env.local to Git** (it's in .gitignore)
- **All Supabase URLs are already production-ready**
- **Only NEXT_PUBLIC_APP_URL needs domain update**
- **Test authentication flow after deployment**
