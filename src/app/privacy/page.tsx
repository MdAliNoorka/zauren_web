import { Navigation } from '@/components/ui/Navigation'

// Navigation items
const navItems = [
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation items={navItems} />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Effective Date:</strong> September 11, 2025<br />
              <strong>Last Updated:</strong> September 11, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Zauren ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered customer service platform and related services.
              </p>
              <p className="text-gray-700">
                By using our services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Personal Information</h3>
              <p className="text-gray-700 mb-3">We collect information you provide directly to us, including:</p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>Name and contact information (email address, phone number)</li>
                <li>Account credentials (username, password)</li>
                <li>Company information (business name, job title)</li>
                <li>Profile information (bio, website, location)</li>
                <li>Communication preferences and settings</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Business Data</h3>
              <p className="text-gray-700 mb-3">To provide our AI customer service solutions, we collect:</p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>Product and service information you provide</li>
                <li>Business processes and workflow data</li>
                <li>Customer interaction patterns and preferences</li>
                <li>Training data for AI model customization</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.3 Usage Information</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>Log data (IP address, browser type, pages visited)</li>
                <li>Device information (device type, operating system)</li>
                <li>Usage analytics and performance metrics</li>
                <li>Session data and authentication tokens</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Service Provision</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>Create and manage your account</li>
                <li>Provide AI customer service automation</li>
                <li>Process and respond to your requests</li>
                <li>Customize AI responses based on your business needs</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 AI Model Training</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>Train AI models specific to your business</li>
                <li>Improve response accuracy and relevance</li>
                <li>Enhance natural language understanding</li>
                <li>Optimize customer interaction flows</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.3 Communication</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>Send account notifications and updates</li>
                <li>Provide customer support</li>
                <li>Send marketing communications (with consent)</li>
                <li>Deliver system alerts and security notifications</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.4 Analytics and Improvement</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>Analyze usage patterns and trends</li>
                <li>Monitor system performance and reliability</li>
                <li>Conduct research and development</li>
                <li>Improve our services and user experience</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Sharing and Disclosure</h2>
              
              <p className="text-gray-700 mb-4">We do not sell, trade, or rent your personal information. We may share your information only in the following circumstances:</p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Service Providers</h3>
              <p className="text-gray-700 mb-4">
                We work with trusted third-party service providers who assist us in operating our platform, including cloud hosting, email services, and analytics providers. These providers are bound by confidentiality agreements.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Legal Requirements</h3>
              <p className="text-gray-700 mb-4">
                We may disclose your information if required by law, court order, or government regulation, or to protect our rights, property, or safety.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.3 Business Transfers</h3>
              <p className="text-gray-700 mb-4">
                In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure authentication and authorization systems</li>
                <li>Regular security audits and monitoring</li>
                <li>Access controls and role-based permissions</li>
                <li>Secure cloud infrastructure with Supabase</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights and Choices</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Account Management</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>Access and update your account information</li>
                <li>Modify your communication preferences</li>
                <li>Download your data</li>
                <li>Delete your account and associated data</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.2 Marketing Communications</h3>
              <p className="text-gray-700 mb-4">
                You can opt out of marketing emails at any time by clicking the unsubscribe link in our emails or updating your preferences in your account settings.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.3 Data Portability</h3>
              <p className="text-gray-700 mb-4">
                You have the right to request a copy of your data in a portable format.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. Specifically:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>Account data: Until account deletion or 3 years of inactivity</li>
                <li>Business data: As long as needed for AI model functionality</li>
                <li>Usage logs: Up to 2 years for analytics and security purposes</li>
                <li>Communication records: Up to 7 years for support purposes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. International Data Transfers</h2>
              <p className="text-gray-700 mb-4">
                Our services are hosted on secure cloud infrastructure. If you are located outside the country where our servers are located, your information may be transferred to and processed in that country. We ensure appropriate safeguards are in place for such transfers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Updates to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last Updated" date. Your continued use of our services after such modifications constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@zauren.dev<br />
                  <strong>Contact Form:</strong> <a href="/contact" className="text-blue-600 hover:text-blue-800">zauren.dev/contact</a><br />
                  <strong>Business Email:</strong> hassan.ahmad@zauren.dev
                </p>
              </div>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500">
                This Privacy Policy is part of our Terms of Service and governs your use of Zauren's AI customer service platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
