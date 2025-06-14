import PageWrapper from '@/components/layout/PageWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <PageWrapper>
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p><em>Last updated: {new Date().toLocaleDateString()}</em></p>

          <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Serene Pathways website and its services (the "Service") operated by Serene Pathways ("us", "we", or "our").</p>
          
          <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.</p>
          
          <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>

          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">Use of Service</h2>
          <p>Serene Pathways provides information and tools related to stress management, including an emotional support chatbot and a stress level test. These services are for informational and educational purposes only.</p>
          <p><strong>The Service does not provide medical advice, diagnosis, or treatment.</strong> The content and tools provided are not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read or interacted with on the Service.</p>
          <p><strong>If you are experiencing a medical emergency or crisis, call your local emergency number (e.g., 911 in the USA) or go to the nearest emergency room immediately.</strong></p>

          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">Anonymous Access</h2>
          <p>We strive to provide anonymous access to our services. You are not required to create an account or provide personally identifiable information to use most features of the Service. We encourage you not to share sensitive personal information while using the chatbot or other interactive features.</p>

          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">Intellectual Property</h2>
          <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Serene Pathways and its licensors. The Service is protected by copyright, trademark, and other laws of both the [Your Country/Jurisdiction] and foreign countries.</p>

          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">User Conduct</h2>
          <p>You agree not to use the Service:</p>
          <ul>
            <li>In any way that violates any applicable national or international law or regulation.</li>
            <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation.</li>
            <li>To impersonate or attempt to impersonate Serene Pathways, a Serene Pathways employee, another user, or any other person or entity.</li>
            <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which, as determined by us, may harm Serene Pathways or users of the Service or expose them to liability.</li>
          </ul>

          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">Limitation Of Liability</h2>
          <p>In no event shall Serene Pathways, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.</p>

          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">Disclaimer</h2>
          <p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.</p>
          <p>Serene Pathways does not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requirements.</p>
          
          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">Changes</h2>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
          <p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.</p>

          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at [Placeholder Email: support@serenepathways.app].</p>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
