import PageWrapper from '@/components/layout/PageWrapper';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpen, ExternalLink, Edit3 } from 'lucide-react';
import Image from 'next/image';

interface Article {
  id: string;
  title: string;
  summary: string;
  author?: string;
  date?: string;
  imageUrl: string;
  dataAiHint: string;
  category: string;
  slug: string; // for linking to a full article page eventually
}

const sampleArticles: Article[] = [
  {
    id: 'article1',
    title: 'Understanding Academic Stress: Tips for Students',
    summary: 'Learn common causes of academic stress and practical strategies to cope effectively during your studies.',
    author: 'Dr. Emily Carter',
    date: 'October 26, 2023',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'student studying',
    category: 'Academic Stress',
    slug: 'understanding-academic-stress',
  },
  {
    id: 'article2',
    title: 'Work-Life Balance in the Modern Age',
    summary: 'Explore techniques to manage professional stress and cultivate a healthy work-life balance in today\'s demanding environment.',
    author: 'John Miller',
    date: 'November 5, 2023',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'office laptop',
    category: 'Professional Stress',
    slug: 'work-life-balance',
  },
  {
    id: 'article3',
    title: 'Navigating Social Media and Mental Well-being',
    summary: 'Discover how technology and social media can impact stress levels and learn mindful approaches to digital consumption.',
    author: 'Aisha Khan',
    date: 'November 12, 2023',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'social media',
    category: 'Technological Stress',
    slug: 'social-media-wellbeing',
  },
  {
    id: 'article4',
    title: 'Mindfulness Meditation: A Beginner\'s Guide',
    summary: 'An introduction to mindfulness meditation practices that can help reduce stress and improve overall emotional regulation.',
    author: 'Serene Pathways Team',
    date: 'November 18, 2023',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'meditation peace',
    category: 'Techniques',
    slug: 'mindfulness-meditation-guide',
  },
];

export default function ArticlesPage() {
  return (
    <PageWrapper>
      <div className="text-center mb-12">
        <Edit3 className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">Articles & Insights</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore a collection of articles and insights on various aspects of stress management and emotional well-being.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sampleArticles.map((article, index) => (
          <Card key={article.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardHeader className="p-0">
              <div className="relative w-full h-48">
                <Image 
                  src={article.imageUrl} 
                  alt={article.title} 
                  layout="fill" 
                  objectFit="cover" 
                  className="rounded-t-lg"
                  data-ai-hint={article.dataAiHint}
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold uppercase text-primary tracking-wider">{article.category}</span>
                <CardTitle className="text-xl mt-1 mb-2">{article.title}</CardTitle>
                 {article.author && article.date && (
                  <p className="text-xs text-muted-foreground mb-2">
                    By {article.author} on {article.date}
                  </p>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow px-6">
              <CardDescription className="text-base leading-relaxed">{article.summary}</CardDescription>
            </CardContent>
            <CardFooter className="px-6 pb-6">
              {/* This button can link to a full article page in the future */}
              <Button asChild variant="outline" className="w-full">
                <Link href={`/articles/${article.slug}`}> 
                  Read More <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </PageWrapper>
  );
}
