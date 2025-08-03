import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Code-A-Robot",
  description: "Privacy Policy for Code-A-Robot - Learn how we collect, use, and protect your information.",
};

export default function PrivacyPolicy() {
  return (
    <div className="flex-1 w-full flex flex-col gap-8 p-4 md:p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm">
          Last updated: August 3, 2025
        </p>
      </div>

      <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to Code-A-Robot ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our educational platform for FTC (FIRST Tech Challenge) robotics programming.
          </p>
          <p>
            By using Code-A-Robot, you consent to the data practices described in this policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          
          <h3 className="text-xl font-medium mb-3">2.1 Information You Provide</h3>
          <p className="mb-4">We collect information you voluntarily provide when you:</p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li><strong>Create an Account:</strong> Email address, username, display name, and password</li>
            <li><strong>Use Our Services:</strong> Code submissions, lesson progress, quiz responses, and other educational content</li>
            <li><strong>Contact Us:</strong> Any information you provide when reaching out for support or feedback</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">2.2 Information Automatically Collected</h3>
          <p className="mb-4">When you use our platform, we automatically collect:</p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li><strong>Usage Data:</strong> Pages visited, time spent on lessons, feature usage, and navigation patterns</li>
            <li><strong>Device Information:</strong> Browser type, operating system, device identifiers, and screen resolution</li>
            <li><strong>Technical Data:</strong> IP address, cookies, session data, and error logs</li>
            <li><strong>Code Editor Data:</strong> Code submissions for compilation and execution (processed temporarily)</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">2.3 Cookies and Tracking Technologies</h3>
          <p className="mb-4">
            We use cookies and similar technologies to enhance your experience, remember your preferences, and analyze platform usage. You can control cookie settings through your browser preferences.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p className="mb-4">We use your information to:</p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li><strong>Provide Educational Services:</strong> Deliver course content, track progress, and enable code compilation/execution</li>
            <li><strong>Account Management:</strong> Create and maintain your account, authenticate access, and provide user support</li>
            <li><strong>Platform Improvement:</strong> Analyze usage patterns to enhance features and educational content</li>
            <li><strong>Communication:</strong> Send important updates, security notifications, and respond to inquiries</li>
            <li><strong>Security:</strong> Protect against fraud, abuse, and unauthorized access</li>
            <li><strong>Legal Compliance:</strong> Meet legal obligations and enforce our terms of service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibent mb-4">4. How We Share Your Information</h2>
          <p className="mb-4">We do not sell, trade, or rent your personal information. We may share your information only in the following circumstances:</p>
          
          <h3 className="text-xl font-medium mb-3">4.1 Service Providers</h3>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li><strong>Supabase:</strong> For authentication, database services, and user management</li>
            <li><strong>CheerpJ:</strong> For Java runtime environment in the browser</li>
            <li><strong>Vercel:</strong> For hosting and analytics services</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">4.2 Legal Requirements</h3>
          <p className="mb-4">We may disclose your information when required by law, court order, or government request, or to protect our rights, property, or safety.</p>

          <h3 className="text-xl font-medium mb-3">4.3 Business Transfers</h3>
          <p className="mb-4">In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
          <p className="mb-4">We implement appropriate security measures to protect your information:</p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li><strong>Encryption:</strong> Data is encrypted in transit using HTTPS/TLS</li>
            <li><strong>Authentication:</strong> Secure user authentication through Supabase</li>
            <li><strong>Access Controls:</strong> Limited access to personal information on a need-to-know basis</li>
            <li><strong>Regular Updates:</strong> Security practices are regularly reviewed and updated</li>
          </ul>
          <p className="mb-4">
            However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Your Rights and Choices</h2>
          <p className="mb-4">You have the following rights regarding your personal information:</p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li><strong>Access:</strong> Request access to your personal information</li>
            <li><strong>Correction:</strong> Update or correct inaccurate information through your account settings</li>
            <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
            <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
            <li><strong>Opt-out:</strong> Unsubscribe from non-essential communications</li>
          </ul>
          <p className="mb-4">
            To exercise these rights, please contact us using the information provided in the "Contact Us" section.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Children's Privacy</h2>
          <p className="mb-4">
            Code-A-Robot is designed for educational use and may be used by minors as part of FTC robotics programs. We are committed to protecting children's privacy:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>We do not knowingly collect personal information from children under 13 without parental consent</li>
            <li>If you are under 18, please obtain parental permission before using our services</li>
            <li>Parents and guardians can contact us to review, update, or delete their child's information</li>
            <li>We encourage parents and teachers to monitor and guide students' use of our platform</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Data Retention</h2>
          <p className="mb-4">We retain your information for as long as necessary to:</p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Provide our educational services</li>
            <li>Maintain your account and learning progress</li>
            <li>Comply with legal obligations</li>
            <li>Resolve disputes and enforce agreements</li>
          </ul>
          <p className="mb-4">
            Code submissions are processed temporarily for compilation and execution and are not permanently stored on our servers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. International Data Transfers</h2>
          <p className="mb-4">
            Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Third-Party Links</h2>
          <p className="mb-4">
            Our platform may contain links to third-party websites or services (such as GitHub, Android Studio downloads, or FTC resources). This Privacy Policy does not apply to these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">11. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Posting the updated policy on our website</li>
            <li>Updating the "Last updated" date</li>
            <li>Sending email notifications for significant changes</li>
          </ul>
          <p className="mb-4">
            Your continued use of Code-A-Robot after any changes constitutes acceptance of the updated Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
          <p className="mb-4">
            If you have questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="mb-2"><strong>Code-A-Robot Support</strong></p>
            <p className="mb-2">Email: codearobot@jacobkaiserman.com</p>
            <p className="mb-2">Website: <Link href="/" className="text-primary hover:underline">Code-A-Robot.com</Link></p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">13. Educational Use Disclaimer</h2>
          <p className="mb-4">
            Code-A-Robot is designed as an educational tool for learning robotics programming. While we strive to provide accurate and up-to-date content, the platform is intended for educational purposes only. We encourage users to verify information and follow official FTC guidelines for competition use.
          </p>
        </section>
      </div>

      <div className="flex justify-center mt-12">
        <Link 
          href="/"
          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
