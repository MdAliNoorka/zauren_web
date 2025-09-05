# Zauren Web

A modern, responsive website for Zauren - AI-powered customer service agents for ecommerce with full authentication system.

## ✨ Features

- 🚀 **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS, Supabase
- 🔐 **Authentication**: Email/password + Google OAuth with Supabase Auth
- 🎨 **Beautiful Design**: Responsive, dark/light mode, smooth animations
- 🔧 **Developer Experience**: ESLint, TypeScript, hot reload
- 📱 **Mobile First**: Fully responsive design
- 🌙 **Dark Mode**: System preference detection with manual toggle
- ⚡ **Performance**: Optimized for speed and SEO
- �️ **Security**: Row Level Security, protected routes, middleware

## 📱 Pages

- **Landing Page**: Modern hero section, features, stats, and testimonials
- **Pricing Page**: Interactive pricing tiers with monthly/annual toggle  
- **Contact Page**: Contact form, office locations, and FAQ
- **Authentication**: Sign-in, sign-up, password reset, email confirmation
- **Dashboard**: Protected user area (sample implementation)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### 1. Clone & Install

```bash
git clone https://github.com/your-username/zauren-web.git
cd zauren-web
npm install
```

### 2. Run Setup Script

**Windows:**
```bash
.\setup-auth.bat
```

**Linux/Mac:**
```bash
chmod +x setup-auth.sh
./setup-auth.sh
```

### 3. Configure Authentication

Follow the detailed setup guide:
📖 **[Complete Setup Guide](SETUP_GUIDE.md)** - Step-by-step Supabase & Google OAuth setup

### 4. Start Development

```bash
npm run dev
```

Visit [http://localhost:3001](http://localhost:3001) to view the website.

## 📚 Documentation

| Document | Description |
|----------|-------------|
| 📖 [**SETUP_GUIDE.md**](SETUP_GUIDE.md) | Complete setup instructions for Supabase & Google OAuth |
| 🔧 [**TROUBLESHOOTING.md**](TROUBLESHOOTING.md) | Common issues and solutions |
| 📋 [**.env.template**](.env.template) | Environment variables template |

## 🔐 Authentication Features

### What's Included
- ✅ Email/password authentication
- ✅ Google OAuth sign-in
- ✅ Email confirmation
- ✅ Password reset
- ✅ Protected routes
- ✅ User session management
- ✅ Responsive auth forms
- ✅ Dark/light mode support

### Quick Test
1. Visit `/auth/status` to check your setup
2. Try `/auth/signup` to create an account
3. Test `/auth/signin` to sign in
4. Access `/dashboard` (protected route)

## 🛠️ Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check

# Run auth setup (Windows)
.\setup-auth.bat
```

## 📁 Project Structure

```
src/
├── app/
│   ├── auth/              # Authentication pages
│   │   ├── signin/        # Sign-in page
│   │   ├── signup/        # Sign-up page
│   │   ├── callback/      # OAuth callback handler
│   │   └── status/        # Setup verification page
│   ├── dashboard/         # Protected dashboard
│   ├── page.tsx          # Landing page
│   ├── pricing/          # Pricing page
│   ├── contact/          # Contact page
│   └── layout.tsx        # Root layout
├── components/
│   ├── auth/             # Authentication components
│   │   ├── SignInForm.tsx
│   │   └── SignUpForm.tsx
│   └── ui/               # UI components
├── lib/
│   ├── supabase.ts       # Client-side Supabase config
│   ├── supabase-server.ts # Server-side Supabase config
│   └── auth-schemas.ts   # Form validation schemas
├── hooks/
│   └── useAuth.ts        # Authentication hook
├── types/
│   └── database.ts       # Database type definitions
└── middleware.ts         # Route protection middleware
```

## 🔧 Environment Setup

### Required Variables

Create `.env.local` (use `.env.template` as reference):

```env
# Supabase (required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

### Getting Supabase Credentials

1. Create project at [supabase.com](https://supabase.com)
2. Go to **Settings** → **API**
3. Copy **Project URL** and **anon public key**
4. Copy **service_role secret key** (keep secret!)

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Update Supabase auth settings with production URLs

### Production Checklist

- [ ] Update `NEXT_PUBLIC_SITE_URL` to production domain
- [ ] Configure Supabase auth settings for production
- [ ] Set up Google OAuth production credentials
- [ ] Enable email confirmations
- [ ] Test all authentication flows

## 🔍 Testing Authentication

### Manual Testing
```bash
# 1. Check setup status
curl http://localhost:3001/auth/status

# 2. Test sign-up
# Visit /auth/signup in browser

# 3. Test sign-in  
# Visit /auth/signin in browser

# 4. Test protected route
# Visit /dashboard (should redirect if not logged in)
```

### Using the Status Page
Visit `/auth/status` in your browser to verify:
- Environment variables
- Supabase connection
- Authentication providers
- Overall system health

## 🎨 Customization

### Colors & Theming
Edit `tailwind.config.js` and `globals.css`:
- Primary: Blue tones for main branding
- Secondary: Gray tones for text and backgrounds  
- Accent: Purple tones for highlights

### Authentication UI
Customize auth forms in `src/components/auth/`:
- Form styling and layout
- Validation messages
- Social auth buttons
- Loading states

## 📖 Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Google OAuth Setup](https://console.cloud.google.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🆘 Getting Help

Having issues? Try these steps:

1. 📋 Check the [**Troubleshooting Guide**](TROUBLESHOOTING.md)
2. 🔍 Visit `/auth/status` to diagnose issues  
3. 🌐 Check [Supabase Discord](https://discord.supabase.com)
4. 📧 Email support@zauren.dev
5. 🐛 Create a GitHub issue

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the coding standards
4. Test authentication flows
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**🎉 Ready to transform customer service with AI? Get started with Zauren today!**
