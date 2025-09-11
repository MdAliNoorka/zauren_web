import { Navigation } from '@/components/ui/Navigation'

// Navigation items
const navItems = [
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation items={navItems} />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Effective Date:</strong> September 11, 2025<br />
              <strong>Last Updated:</strong> September 11, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using Zauren's AI customer service platform ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                Zauren provides AI-powered customer service automation solutions that help businesses create intelligent chatbots and virtual assistants for platforms including WhatsApp, Instagram, Facebook Messenger, and other communication channels.
              </p>
              <p className="text-gray-700">
                Our service includes AI model training, customer interaction management, analytics, and integration tools to enhance your customer service capabilities.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Account Creation</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>You must provide accurate and complete information when creating an account</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                <li>You must be at least 18 years old to create an account</li>
                <li>One person or legal entity may not maintain multiple accounts</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Account Responsibilities</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>You are responsible for all activities that occur under your account</li>
                <li>You must notify us immediately of any unauthorized use of your account</li>
                <li>You must keep your contact information up to date</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Acceptable Use</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Permitted Uses</h3>
              <p className="text-gray-700 mb-4">You may use our service to:</p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>Create AI customer service solutions for your business</li>
                <li>Train AI models with your business data</li>
                <li>Automate customer interactions and support</li>
                <li>Analyze customer interaction data</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Prohibited Uses</h3>
              <p className="text-gray-700 mb-4">You may not use our service to:</p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Distribute spam, malware, or harmful content</li>
                <li>Engage in fraudulent or deceptive practices</li>
                <li>Harass, abuse, or harm others</li>
                <li>Attempt to reverse engineer our software</li>
                <li>Use our service for competitors' benefit</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data and Privacy</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Our collection and use of your information is governed by our Privacy Policy, which is incorporated by reference into these Terms.
              </p>
              <p className="text-gray-700 mb-4">
                By using our service, you grant us the right to use your business data solely for the purpose of providing and improving our AI customer service solutions for your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Our IP</h3>
              <p className="text-gray-700 mb-4">
                Zauren retains all rights to our platform, software, AI models (excluding your custom training data), trademarks, and other intellectual property.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.2 Your IP</h3>
              <p className="text-gray-700 mb-4">
                You retain all rights to your business data, content, and information. We only use this data to provide our services to you and will not share it with third parties except as outlined in our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Payment Terms</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.1 Subscription Fees</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>Subscription fees are billed in advance on a monthly or annual basis</li>
                <li>All fees are non-refundable except as required by law</li>
                <li>Prices may change with 30 days' notice</li>
                <li>Failure to pay may result in service suspension</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.2 Free Trial</h3>
              <p className="text-gray-700 mb-4">
                We may offer free trials for new users. At the end of the trial period, you will be automatically charged unless you cancel before the trial expires.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Service Availability</h2>
              <p className="text-gray-700 mb-4">
                While we strive for high availability, we do not guarantee uninterrupted service. We may perform maintenance, updates, or experience downtime that could temporarily limit access to our service.
              </p>
              <p className="text-gray-700">
                We will provide reasonable notice of planned maintenance when possible.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, ZAUREN SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES.
              </p>
              <p className="text-gray-700">
                Our total liability shall not exceed the amount paid by you for the service in the 12 months preceding the claim.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Termination</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">10.1 Termination by You</h3>
              <p className="text-gray-700 mb-4">
                You may cancel your account at any time through your account settings or by contacting our support team.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">10.2 Termination by Us</h3>
              <p className="text-gray-700 mb-4">
                We may terminate your account if you violate these terms, fail to pay fees, or for any other reason with reasonable notice.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">10.3 Effect of Termination</h3>
              <p className="text-gray-700 mb-4">
                Upon termination, your access to the service will cease, and we may delete your account data after a reasonable period.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these terms at any time. We will provide notice of material changes via email or through our service. Your continued use of the service after such changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These terms shall be governed by and construed in accordance with applicable laws. Any disputes shall be resolved through binding arbitration or in the courts of competent jurisdiction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@zauren.dev<br />
                  <strong>Contact Form:</strong> <a href="/contact" className="text-blue-600 hover:text-blue-800">zauren.dev/contact</a><br />
                  <strong>Business Email:</strong> hassan.ahmad@zauren.dev
                </p>
              </div>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500">
                By using Zauren's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
