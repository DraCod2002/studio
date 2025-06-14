
import PageWrapper from '@/components/layout/PageWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LifeBuoy, Phone, Globe, ExternalLink, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface Resource {
  id: string;
  name: string;
  description: string;
  contact?: string;
  website?: string;
  type: 'hotline' | 'organization' | 'online_resource';
}

const professionalResources: Resource[] = [
  {
    id: 'resource1',
    name: 'National Suicide Prevention Lifeline (USA)',
    description: 'Provides 24/7, free and confidential support for people in distress, prevention and crisis resources for you or your loved ones.',
    contact: '988',
    website: 'https://988lifeline.org/',
    type: 'hotline',
  },
  {
    id: 'resource2',
    name: 'Crisis Text Line',
    description: 'Text HOME to 741741 from anywhere in the US, anytime, about any type of crisis.',
    contact: 'Text HOME to 741741',
    website: 'https://www.crisistextline.org/',
    type: 'hotline',
  },
  {
    id: 'resource3',
    name: 'National Alliance on Mental Illness (NAMI)',
    description: 'The nation’s largest grassroots mental health organization dedicated to building better lives for the millions of Americans affected by mental illness.',
    website: 'https://www.nami.org/',
    type: 'organization',
  },
  {
    id: 'resource4',
    name: 'MentalHealth.gov',
    description: 'Provides one-stop access to U.S. government mental health and mental health problems information.',
    website: 'https://www.mentalhealth.gov/',
    type: 'online_resource',
  },
  {
    id: 'resource5',
    name: 'The Trevor Project',
    description: 'Provides crisis intervention and suicide prevention services to lesbian, gay, bisexual, transgender, queer & questioning (LGBTQ) young people under 25.',
    contact: '1-866-488-7386',
    website: 'https://www.thetrevorproject.org/',
    type: 'organization',
  },
    {
    id: 'resource6',
    name: 'Anxiety & Depression Association of America (ADAA)',
    description: 'An international nonprofit organization dedicated to the prevention, treatment, and cure of anxiety, depression, OCD, PTSD, and co-occurring disorders through education, practice, and research.',
    website: 'https://adaa.org/',
    type: 'organization',
  },
];

export default function ResourcesPage() {
  return (
    <PageWrapper>
      <div className="text-center mb-12">
        <LifeBuoy className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">Professional Resources</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          If you are in crisis or need immediate support, please reach out to these organizations.
          Remember, you are not alone.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {professionalResources.map((resource, index) => (
          <Card key={resource.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                {resource.type === 'hotline' && <Phone className="mr-2 h-5 w-5 text-primary" />}
                {resource.type === 'organization' && <Globe className="mr-2 h-5 w-5 text-primary" />}
                {resource.type === 'online_resource' && <ExternalLink className="mr-2 h-5 w-5 text-primary" />}
                {resource.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-base mb-4">{resource.description}</CardDescription>
              {resource.contact && (
                <p className="text-sm mb-2">
                  <strong>Contact:</strong> {resource.contact}
                </p>
              )}
            </CardContent>
            {resource.website && (
              <div className="p-6 pt-0 mt-auto">
                <Button asChild variant="outline" className="w-full">
                  <Link href={resource.website} target="_blank" rel="noopener noreferrer">
                    Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
       <Card className="mt-12 bg-primary/10 border-primary shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" /> Important Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The information provided on Serene Pathways, including the chatbot and stress test, is for informational and educational purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. If you are in a crisis, please contact emergency services or a crisis hotline immediately.
          </p>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
