
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import PageWrapper from '@/components/layout/PageWrapper';
import { School, Briefcase, Users, Smartphone, CreditCard, Brain, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { fetchPixabayImage } from '@/services/image-service';

const stressCategories = [
  {
    title: 'Academic Stress',
    description: 'Pressure from exams, assignments, and school life.',
    icon: School,
    link: '/stress/academic',
    dataAiHint: 'study library', // Updated hint
  },
  {
    title: 'Professional Stress',
    description: 'Work-related tension, deadlines, and career challenges.',
    icon: Briefcase,
    link: '/stress/professional',
    dataAiHint: 'calm office desk', // Updated hint
  },
  {
    title: 'Relational Stress',
    description: 'Difficulties in personal relationships with family or friends.',
    icon: Users,
    link: '/stress/relational',
    dataAiHint: 'friends talking', // Updated hint
  },
  {
    title: 'Technological Stress',
    description: 'Overwhelm from social media, notifications, and digital life.',
    icon: Smartphone,
    link: '/stress/technological',
    dataAiHint: 'person relaxing phone', // Updated hint
  },
  {
    title: 'Financial Stress',
    description: 'Worries about money, debt, and economic stability.',
    icon: CreditCard,
    link: '/stress/financial',
    dataAiHint: 'savings piggy bank', // Updated hint
  },
  {
    title: 'Existential Stress',
    description: 'Concerns about life purpose, meaning, and emotional well-being.',
    icon: Brain,
    link: '/stress/existential',
    dataAiHint: 'thoughtful person nature', // Updated hint
  },
];

export default async function HomePage() {
  const heroImageHint = "meditation nature";
  const heroImageUrl = await fetchPixabayImage(heroImageHint, 'all', 'hero');
  
  const calmSceneryHint = "calm landscape";
  const calmSceneryImageUrl = await fetchPixabayImage(calmSceneryHint, 'horizontal', 'calm-scenery');

  return (
    <PageWrapper>
      <section className="text-center py-12 md:py-20 bg-gradient-to-b from-background to-accent/10 rounded-lg shadow-sm">
        <div className="relative w-48 h-48 md:w-60 md:h-60 mx-auto mb-8">
          <Image 
            src={heroImageUrl} 
            alt="Calm meditating person in nature" 
            layout="fill"
            objectFit="cover"
            className="rounded-full shadow-xl"
            priority
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground animate-fade-in tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary-foreground ">
          Welcome to Serene Pathways
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          Your personal guide to understanding, managing, and reducing stress for a more peaceful life.
        </p>
        <div className="space-x-4 animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
          <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
            <Link href="/chatbot">Chat with Support Bot <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
            <Link href="/stress-test">Take Stress Test</Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <h2 className="text-3xl font-bold text-center mb-12">Explore Stress Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stressCategories.map((category, index) => (
            <Link key={category.title} href={category.link} passHref className="flex">
              <Card 
                className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 animate-slide-in-up flex flex-col"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <category.icon className="w-10 h-10 text-primary" />
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-base mb-4">{category.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/50 rounded-lg shadow-sm">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Ready to Find Your Calm?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our tools and resources are designed to help you navigate life's challenges with greater ease and resilience. Discover personalized strategies and support.
            </p>
            <div className="space-y-4 md:space-y-0 md:space-x-4">
              <Button asChild size="lg" className="w-full md:w-auto shadow-md hover:shadow-lg transition-shadow">
                <Link href="/articles">Read Articles</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full md:w-auto shadow-md hover:shadow-lg transition-shadow">
                <Link href="/resources">Find Professionals</Link>
              </Button>
            </div>
          </div>
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-xl">
             <Image 
                src={calmSceneryImageUrl} 
                alt="Peaceful scenery" 
                layout="fill"
                objectFit="cover"
              />
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
