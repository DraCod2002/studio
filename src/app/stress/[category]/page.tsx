import PageWrapper from '@/components/layout/PageWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Info, School, Briefcase, Users, Smartphone, CreditCard, Brain } from 'lucide-react';
import Image from 'next/image';
import type { Metadata } from 'next';

// Helper to get category display data
const categoryDetails: { [key: string]: { title: string; description: string; longDescription: string; icon: React.ElementType, dataAiHint: string, imageUrl: string } } = {
  academic: {
    title: 'Academic Stress',
    description: 'Explore information and resources related to academic stress.',
    longDescription: 'Academic stress stems from the pressures of exams, assignments, deadlines, and the overall school environment. It can affect students at all levels. This section provides insights into managing study load, coping with exam anxiety, and maintaining a healthy balance during your academic journey.',
    icon: School,
    dataAiHint: 'student library',
    imageUrl: 'https://placehold.co/800x400.png',
  },
  professional: {
    title: 'Professional Stress',
    description: 'Explore information and resources related to professional stress.',
    longDescription: 'Work-related stress can arise from demanding deadlines, challenging projects, workplace dynamics, and career uncertainties. Learn about strategies for managing workload, improving work-life balance, dealing with difficult colleagues, and preventing burnout in your professional life.',
    icon: Briefcase,
    dataAiHint: 'office meeting',
    imageUrl: 'https://placehold.co/800x400.png',
  },
  relational: {
    title: 'Relational Stress',
    description: 'Explore information and resources related to relational stress.',
    longDescription: 'Stress in personal relationships with family, friends, or partners can significantly impact well-being. This section covers topics like communication skills, conflict resolution, setting boundaries, and nurturing healthy connections to reduce interpersonal stress.',
    icon: Users,
    dataAiHint: 'friends talking',
    imageUrl: 'https://placehold.co/800x400.png',
  },
  technological: {
    title: 'Technological Stress',
    description: 'Explore information and resources related to technological stress.',
    longDescription: 'The constant connectivity, social media pressures, and information overload from digital devices can be a major source of stress. Discover ways to manage your digital life, practice mindful technology use, and reduce the anxiety associated with being "always on".',
    icon: Smartphone,
    dataAiHint: 'person phone',
    imageUrl: 'https://placehold.co/800x400.png',
  },
  financial: {
    title: 'Financial Stress',
    description: 'Explore information and resources related to financial stress.',
    longDescription: 'Worries about money, debt, budgeting, and economic stability are common stressors. This section offers guidance on financial planning, coping with financial anxiety, and finding resources to manage your finances more effectively.',
    icon: CreditCard,
    dataAiHint: 'money coins',
    imageUrl: 'https://placehold.co/800x400.png',
  },
  existential: {
    title: 'Existential Stress',
    description: 'Explore information and resources related to existential stress.',
    longDescription: 'Concerns about life purpose, meaning, mortality, and overall emotional well-being can lead to existential stress. Explore philosophical and mindful approaches to finding meaning, coping with uncertainty, and cultivating inner peace.',
    icon: Brain,
    dataAiHint: 'meditation thinking',
    imageUrl: 'https://placehold.co/800x400.png',
  },
};

const getCategoryData = (slug: string) => {
  return categoryDetails[slug] || { 
    slug, 
    title: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ') + ' Stress', 
    description: `Details and resources about ${slug.replace(/-/g, ' ')} stress.`,
    longDescription: 'More detailed information about this type of stress will be available soon. Check back for updates and resources.',
    icon: Info,
    dataAiHint: 'stress help',
    imageUrl: 'https://placehold.co/800x400.png',
  };
};

export default async function StressCategoryPage({ params }: { params: { category: string } }) {
  const categoryData = getCategoryData(params.category);
  const IconComponent = categoryData.icon;

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
        </div>

        <Card className="shadow-xl overflow-hidden">
          <div className="relative w-full h-64 md:h-80">
            <Image 
              src={categoryData.imageUrl} 
              alt={categoryData.title} 
              layout="fill" 
              objectFit="cover"
              data-ai-hint={categoryData.dataAiHint}
              priority
            />
          </div>
          <CardHeader className="p-6 md:p-8">
            <div className="flex items-center mb-3">
              <IconComponent className="w-10 h-10 text-primary mr-3" />
              <CardTitle className="text-3xl md:text-4xl font-bold leading-tight">{categoryData.title}</CardTitle>
            </div>
            <CardDescription className="text-lg text-muted-foreground">
              {categoryData.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed">
              <p>{categoryData.longDescription}</p>
              <p className="mt-6">
                This page is currently a placeholder. More specific content, articles, and tools related to {categoryData.title.toLowerCase()} will be added soon.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
            <h3 className="text-2xl font-semibold mb-4">Explore Other Resources</h3>
            <p className="text-muted-foreground mb-6">
                Find articles, chat with our AI, or discover professional help.
            </p>
            <div className="space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 flex flex-col sm:flex-row justify-center">
                <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link href="/articles">Read Articles</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                    <Link href="/chatbot">Chat with AI</Link>
                </Button>
                <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                    <Link href="/resources">Find Professionals</Link>
                </Button>
            </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const categoryData = getCategoryData(params.category);
  return {
    title: `${categoryData.title} | Serene Pathways`,
    description: categoryData.description,
  };
}

// Optional: If you want to pre-render these pages at build time
// export async function generateStaticParams() {
//   return Object.keys(categoryDetails).map((category) => ({
//     category: category,
//   }));
// }
