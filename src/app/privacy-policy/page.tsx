import PageWrapper from '@/components/layout/PageWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <PageWrapper>
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <ShieldCheck className="w-16 h-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p><em>Last updated: {new Date().toLocaleDateString()}</em></p>

          <p>Welcome to Serene Pathways. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services, including our emotional support chatbot and stress level test.</p>

          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
          <p>We aim to collect as little personal information as possible to ensure your anonymity and privacy.</p>
          <ul>
            <li><strong>Anonymous Usage Data:</strong> We may collect anonymous data regarding your usage of the website, such as pages visited, features used (chatbot, stress test), and general interaction patterns. This data is aggregated and cannot be used to identify you personally.</li>
            <li><strong>Chatbot Interactions:</strong> Conversations with our emotional support chatbot are processed by our AI model to provide responses. While the content of your messages is sent to the AI, we do not store long-term identifiable chat logs associated with you. We encourage you not to share personally identifiable information (PII) in the chat.</li>
            <li><strong>Stress Test Responses:</strong> Your answers to the stress level test are processed locally in your browser or anonymously on our server to provide you with a score. We do not store your individual test responses in a way that can be linked back to you.</li>
          </ul>

          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
          <p>Any information collected is used to:</p>
          <ul>
            <li>Provide, operate, and maintain our website and services.</li>
            <li>Improve, personalize, and expand our website and services.</li>
            <li>Understand and analyze how you use our website and services.</li>
            <li>Develop new products, services, features, and functionality.</li>
            <li>Communicate with you, if you initiate contact for support.</li>
          </ul>
          
          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">Data Security</h2>
          <p>We use administrative, technical, and physical security measures to help protect any information we might handle. While we have taken reasonable steps to secure the information, please be aware that no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">Third-Party Services</h2>
          <p>Our AI chatbot functionality is powered by third-party AI models (e.g., Google Gemini via Genkit). Your interactions with the chatbot are subject to the privacy policies of these AI providers. We have configured these services to prioritize user privacy where possible.</p>
          
          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">Children's Privacy</h2>
          <p>Our services are not intended for use by children under the age of 13. We do not knowingly collect personally identifiable information from children under 13.</p>

          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at [Placeholder Email: privacy@serenepathways.app].</p>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
