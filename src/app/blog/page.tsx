'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Navigation } from '@/components/ui/Navigation'

// Navigation items
const navItems = [
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

// Sample blog posts for demonstration - will be replaced with real content management
const blogPosts = [
  {
    id: 1,
    title: "Why AI Customer Service is the Future of Small Business",
    excerpt: "Discover how AI assistants are revolutionizing customer service for small businesses, providing 24/7 support and increasing customer satisfaction.",
    date: "2025-01-15",
    readTime: "5 min read",
    category: "AI Technology",
    author: "Zauren Team",
    slug: "ai-customer-service-future",
    featured: true
  },
  {
    id: 2,
    title: "Getting Started: Your First AI Assistant Setup",
    excerpt: "A step-by-step guide to setting up your first AI customer service assistant and what to expect in the first week.",
    date: "2025-01-10",
    readTime: "8 min read",
    category: "Getting Started",
    author: "Zauren Team",
    slug: "first-ai-assistant-setup",
    featured: false
  },
  {
    id: 3,
    title: "Common Customer Questions Your AI Should Handle",
    excerpt: "Learn about the most common customer inquiries and how to train your AI assistant to handle them effectively.",
    date: "2025-01-05",
    readTime: "6 min read",
    category: "Best Practices",
    author: "Zauren Team",
    slug: "common-customer-questions-ai",
    featured: false
  }
]

const categories = ["All", "AI Technology", "Getting Started", "Best Practices", "Case Studies"]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-secondary-950" style={{zoom: '0.9'}}>
      <Navigation 
        items={navItems}
        logo={
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">Z</span>
          </div>
        }
      />

      {/* Blog Header */}
      <section className="pt-32 sm:pt-28 lg:pt-32 pb-16 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950"></div>
        
        {/* Tech Grid Overlay */}
        <div className="absolute inset-0 opacity-3 dark:opacity-5">
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-primary-600/10 dark:border-primary-400/10"></div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl lg:text-5xl font-semibold font-mono text-secondary-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-primary-600 via-accent-500 to-primary-700 bg-clip-text text-transparent">
                Zauren Blog
              </span>
            </h1>
            <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto mb-8">
              Insights, tips, and stories about AI customer service, small business growth, and the future of automated customer support.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 bg-secondary-50 dark:bg-secondary-950">
        <div className="container mx-auto px-6">
          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "primary" : "outline"}
                size="sm"
                className="font-mono text-sm"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Featured Post */}
          {blogPosts.filter(post => post.featured).map((post) => (
            <div key={post.id} className="mb-16">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image Placeholder */}
                  <div className="bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 p-12 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <span className="text-lg font-mono text-primary-600 dark:text-primary-400">Featured Article</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full text-sm font-mono">
                        {post.category}
                      </span>
                      <span className="text-sm text-secondary-500 font-mono">Featured</span>
                    </div>
                    
                    <h2 className="text-2xl lg:text-3xl font-semibold font-mono text-secondary-900 dark:text-white mb-4">
                      {post.title}
                    </h2>
                    
                    <p className="text-secondary-600 dark:text-secondary-300 mb-6 text-lg leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-secondary-500">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      
                      <Button size="sm" className="font-mono">
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          ))}

          {/* Regular Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(post => !post.featured).map((post) => (
              <Card key={post.id} className="hover:shadow-xl transition-all duration-300 group">
                {/* Image Placeholder */}
                <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 p-8 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2 py-1 rounded text-xs font-mono">
                      {post.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold font-mono text-secondary-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-secondary-600 dark:text-secondary-300 mb-4 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-secondary-500">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>{post.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Coming Soon Section */}
          <div className="mt-16 text-center">
            <Card className="p-12 bg-gradient-to-br from-white/90 to-primary-50/80 dark:from-secondary-900/90 dark:to-secondary-800/80 backdrop-blur-sm border border-primary-200/30 dark:border-primary-800/30">
              <div className="max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-semibold font-mono text-secondary-900 dark:text-white mb-4">
                  More Content Coming Soon
                </h3>
                
                <p className="text-secondary-600 dark:text-secondary-300 mb-6">
                  We're working on more helpful articles about AI customer service, business automation, and growth strategies. Check back soon for new insights!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="font-mono">
                    Subscribe to Updates
                  </Button>
                  <Button variant="outline" className="font-mono">
                    <Link href="/contact">
                      Suggest a Topic
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold font-mono text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-primary-100 mb-8">
              Get the latest insights about AI customer service and business automation delivered to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button variant="outline" className="font-mono text-white border-white hover:bg-white hover:text-primary-600">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-secondary-900 dark:bg-secondary-950 text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Z</span>
                </div>
                <span className="text-xl font-bold font-mono">Zauren</span>
              </div>
              <p className="text-secondary-400 text-sm">
                AI-powered customer service for growing businesses.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold font-mono mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/#features" className="text-secondary-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="text-secondary-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/contact" className="text-secondary-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold font-mono mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/blog" className="text-secondary-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="text-secondary-400 hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold font-mono mb-4">Connect</h4>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-secondary-800 rounded-lg flex items-center justify-center hover:bg-secondary-700 transition-colors cursor-pointer">
                  <span className="text-xs">📧</span>
                </div>
                <div className="w-8 h-8 bg-secondary-800 rounded-lg flex items-center justify-center hover:bg-secondary-700 transition-colors cursor-pointer">
                  <span className="text-xs">🐦</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-secondary-800 mt-8 pt-8 text-center">
            <p className="text-secondary-500 text-sm font-mono">
              © 2025 Zauren. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
