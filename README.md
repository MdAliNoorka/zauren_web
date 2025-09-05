# Zauren Web

A modern, responsive website for Zauren - AI-powered customer service agents for ecommerce.

## Features

- 🚀 **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS
- 🎨 **Beautiful Design**: Responsive, dark/light mode, smooth animations
- 🔧 **Developer Experience**: ESLint, TypeScript, hot reload
- 📱 **Mobile First**: Fully responsive design
- 🌙 **Dark Mode**: System preference detection with manual toggle
- ⚡ **Performance**: Optimized for speed and SEO
- 🔒 **Backend Integration**: Supabase for database and authentication

## Pages

- **Landing Page**: Modern hero section, features, stats, and testimonials
- **Pricing Page**: Interactive pricing tiers with monthly/annual toggle
- **Contact Page**: Contact form, office locations, and FAQ

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (optional for full functionality)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/zauren-web.git
cd zauren-web
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
- Supabase URL and keys
- SMTP settings for contact forms
- Analytics IDs

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Development Commands

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
```

## Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── page.tsx        # Landing page
│   ├── pricing/        # Pricing page
│   ├── contact/        # Contact page
│   ├── layout.tsx      # Root layout
│   └── globals.css     # Global styles
├── components/         # Reusable components
│   └── ui/            # UI components
├── lib/               # Utilities and configurations
├── types/             # TypeScript type definitions
├── hooks/             # Custom React hooks
└── utils/             # Utility functions
```

## Key Components

### UI Components
- **Button**: Flexible button component with variants
- **Card**: Container component for content sections
- **Input**: Form input component with validation
- **Navigation**: Responsive navigation with theme toggle

### Features
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: System preference detection
- **Animations**: Smooth CSS animations and transitions
- **Form Handling**: Contact form with validation
- **SEO Optimized**: Meta tags, structured data

## Customization

### Colors
Edit `tailwind.config.js` to customize the color palette:
- Primary: Blue tones for main branding
- Secondary: Gray tones for text and backgrounds
- Accent: Purple tones for highlights

### Typography
- Primary font: Inter
- Monospace font: JetBrains Mono

### Animations
Custom animations defined in `globals.css`:
- `fade-in`: Smooth fade in effect
- `slide-up`: Slide up animation
- `scale-in`: Scale in animation

## Backend Integration

The website integrates with Supabase for:
- Contact form submissions
- Newsletter subscriptions
- User analytics (optional)

Database schema is defined in `src/lib/supabase.ts`.

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The website can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Digital Ocean

## Environment Variables

Required environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=your_app_url
```

Optional:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
NEXT_PUBLIC_GA_ID=your_analytics_id
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@zauren.dev or create an issue on GitHub.
