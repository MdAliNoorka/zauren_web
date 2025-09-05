export interface PricingTier {
  id: string
  name: string
  price: number
  period: string
  description: string
  features: PricingFeature[]
  highlighted?: boolean
  badge?: string
  buttonText: string
  buttonVariant: 'primary' | 'secondary' | 'outline'
  limits: {
    tokens: string
    messages: string
    integrations?: string
    channels?: string
  }
}

export interface PricingFeature {
  text: string
  included: boolean
  highlight?: boolean
}

export interface ContactFormData {
  name: string
  email: string
  company?: string
  message: string
  subject: string
}

export interface NavItem {
  label: string
  href: string
  external?: boolean
}

export interface FeatureItem {
  icon: React.ElementType
  title: string
  description: string
}

export interface TestimonialItem {
  name: string
  role: string
  company: string
  content: string
  avatar?: string
  rating: number
}

export interface FAQItem {
  question: string
  answer: string
}
