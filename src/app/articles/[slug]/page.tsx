
import PageWrapper from '@/components/layout/PageWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, UserCircle } from 'lucide-react';
import Image from 'next/image';
import { fetchPixabayImage } from '@/services/image-service';
import type { Metadata } from 'next';

interface ArticleData {
  id: string;
  title: string;
  summary: string;
  author: string;
  date: string;
  dataAiHint: string;
  category: string;
  slug: string;
  content: string;
  imageUrl?: string; // Will be populated
}

const articlesDb: Omit<ArticleData, 'imageUrl'>[] = [
  {
    id: 'article1',
    title: 'Understanding Academic Stress: Tips for Students',
    summary: 'Learn common causes of academic stress and practical strategies to cope effectively during your studies.',
    author: 'Dr. Emily Carter',
    date: 'October 26, 2023',
    dataAiHint: 'student studying library peaceful', // More specific hint
    category: 'Academic Stress',
    slug: 'understanding-academic-stress',
    content: `
      <p>Academic life, while rewarding, can often be a significant source of stress for students. The pressure to perform well in exams, meet assignment deadlines, manage extracurricular activities, and plan for the future can feel overwhelming. Understanding the common triggers of academic stress is the first step towards managing it effectively.</p>
      <h3 class="text-xl font-semibold mt-6 mb-3 font-headline">Common Causes of Academic Stress:</h3>
      <ul class="list-disc list-inside space-y-1 mb-4">
        <li>Exam pressure and fear of failure</li>
        <li>Heavy workload and tight deadlines</li>
        <li>Difficulty understanding course material</li>
        <li>Competition with peers</li>
        <li>Balancing studies with personal life and part-time jobs</li>
        <li>Future career anxieties</li>
      </ul>
      <h3 class="text-xl font-semibold mt-6 mb-3 font-headline">Practical Strategies for Coping:</h3>
      <ol class="list-decimal list-inside space-y-2">
        <li><strong>Time Management:</strong> Create a realistic study schedule. Break down large tasks into smaller, manageable steps. Prioritize tasks based on importance and deadlines.</li>
        <li><strong>Effective Study Habits:</strong> Find a study method that works for you. This could include active recall, spaced repetition, or concept mapping. Ensure you have a quiet and comfortable study environment.</li>
        <li><strong>Seek Support:</strong> Don't hesitate to talk to professors, teaching assistants, academic advisors, or counselors if you're struggling. Study groups can also be beneficial.</li>
        <li><strong>Prioritize Sleep:</strong> Aim for 7-9 hours of quality sleep per night. Lack of sleep can significantly worsen stress and impair cognitive function.</li>
        <li><strong>Regular Exercise:</strong> Physical activity is a great stress reliever. Even a short walk or some stretching can make a difference.</li>
        <li><strong>Mindfulness and Relaxation Techniques:</strong> Practice deep breathing exercises, meditation, or yoga to calm your mind.</li>
        <li><strong>Healthy Diet:</strong> Fuel your body and brain with nutritious foods. Avoid excessive caffeine and sugary snacks.</li>
        <li><strong>Set Realistic Goals:</strong> Strive for progress, not perfection. Celebrate small victories along the way.</li>
        <li><strong>Take Regular Breaks:</strong> Short breaks during study sessions can improve focus and reduce fatigue.</li>
        <li><strong>Engage in Hobbies:</strong> Make time for activities you enjoy. This helps to de-stress and provides a sense of balance.</li>
      </ol>
      <p class="mt-6">Remember, experiencing some stress is normal, but chronic stress can be detrimental to your health and academic performance. Implementing these strategies can help you navigate the challenges of student life more effectively. If stress becomes unmanageable, seeking professional help is a sign of strength.</p>
    `
  },
  {
    id: 'article2',
    title: 'Work-Life Balance in the Modern Age',
    summary: 'Explore techniques to manage professional stress and cultivate a healthy work-life balance in today\'s demanding environment.',
    author: 'John Miller',
    date: 'November 5, 2023',
    dataAiHint: 'person balancing work home',
    category: 'Professional Stress',
    slug: 'work-life-balance',
    content: `
      <p>Achieving a healthy work-life balance is crucial for overall well-being and preventing professional burnout. The demands of modern work can often blur the lines between professional and personal life. This article explores strategies to create better boundaries and manage your energy effectively.</p>
      <h3 class="text-xl font-semibold mt-6 mb-3 font-headline">Key Areas for Improvement:</h3>
      <ul class="list-disc list-inside space-y-1 mb-4">
        <li>Setting clear boundaries between work and personal time.</li>
        <li>Prioritizing tasks and managing time efficiently.</li>
        <li>Learning to say "no" to additional commitments when overwhelmed.</li>
        <li>Incorporating regular breaks and downtime.</li>
        <li>Engaging in hobbies and activities outside of work.</li>
        <li>Disconnecting from work-related communications outside of work hours.</li>
      </ul>
      <p class="mt-6">Finding what works for you is a personal journey, but actively working towards a better work-life balance can significantly reduce stress and improve job satisfaction.</p>
    `
  },
  {
    id: 'article3',
    title: 'Navigating Social Media and Mental Well-being',
    summary: 'Discover how technology and social media can impact stress levels and learn mindful approaches to digital consumption.',
    author: 'Aisha Khan',
    date: 'November 12, 2023',
    dataAiHint: 'person mindfully using phone nature',
    category: 'Technological Stress',
    slug: 'social-media-wellbeing',
    content: `
      <p>Social media and constant digital connectivity can be a double-edged sword. While offering connection and information, they can also contribute to stress, anxiety, and feelings of inadequacy. This article discusses mindful approaches to using technology.</p>
      <h3 class="text-xl font-semibold mt-6 mb-3 font-headline">Strategies for Mindful Tech Use:</h3>
      <ul class="list-disc list-inside space-y-1 mb-4">
        <li>Setting time limits for social media and app usage.</li>
        <li>Curating your feed to include positive and uplifting content.</li>
        <li>Taking regular digital detox breaks.</li>
        <li>Being aware of comparison traps and their impact on self-esteem.</li>
        <li>Focusing on real-world interactions and hobbies.</li>
      </ul>
      <p class="mt-6">By becoming more intentional with our technology use, we can harness its benefits while mitigating its potential negative impacts on our mental well-being.</p>
    `
  },
  {
    id: 'article4',
    title: 'Mindfulness Meditation: A Beginner\'s Guide',
    summary: 'An introduction to mindfulness meditation practices that can help reduce stress and improve overall emotional regulation.',
    author: 'Serene Pathways Team',
    date: 'November 18, 2023',
    dataAiHint: 'calm person meditating outdoors sun',
    category: 'Techniques',
    slug: 'mindfulness-meditation-guide',
    content: `
      <p>Mindfulness meditation is a practice that involves paying attention to the present moment without judgment. It has been shown to reduce stress, improve focus, and enhance emotional regulation. This guide provides a simple introduction to get you started.</p>
      <h3 class="text-xl font-semibold mt-6 mb-3 font-headline">Getting Started with Mindfulness:</h3>
      <ol class="list-decimal list-inside space-y-2">
        <li><strong>Find a Quiet Space:</strong> Choose a comfortable place where you won't be disturbed.</li>
        <li><strong>Comfortable Posture:</strong> Sit or lie down in a comfortable position.</li>
        <li><strong>Focus on Your Breath:</strong> Pay attention to the sensation of your breath entering and leaving your body.</li>
        <li><strong>Acknowledge Thoughts:</strong> When your mind wanders (and it will), gently acknowledge the thought and return your focus to your breath.</li>
        <li><strong>Start Small:</strong> Begin with short sessions of 5-10 minutes and gradually increase the duration.</li>
      </ol>
      <p class="mt-6">Consistency is key. Even a few minutes of mindfulness each day can make a difference.</p>
    `
  },
];

// This function simulates fetching full article data including its image URL
async function getArticleData(slug: string): Promise<ArticleData | null> {
  const articleBase = articlesDb.find(art => art.slug === slug);
  if (!articleBase) {
    return null;
  }

  const imageUrl = await fetchPixabayImage(articleBase.dataAiHint, 'horizontal', slug);
  
  return {
    ...articleBase,
    imageUrl,
  };
}


export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleData(params.slug);

  if (!article) {
    return (
      <PageWrapper>
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Sorry, we couldn't find the article you were looking for.
          </p>
          <Button asChild>
            <Link href="/articles">Back to Articles</Link>
          </Button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="outline" asChild>
            <Link href="/articles">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
            </Link>
          </Button>
        </div>

        <Card className="shadow-xl overflow-hidden">
          {article.imageUrl && (
            <div className="relative w-full h-64 md:h-96">
              <Image
                src={article.imageUrl}
                alt={article.title}
                layout="fill"
                objectFit="cover"
                priority 
              />
            </div>
          )}
          <CardHeader className="p-6 md:p-8">
            <span className="text-sm font-semibold uppercase text-primary tracking-wider mb-2 block">{article.category}</span>
            <CardTitle className="text-3xl md:text-4xl font-bold leading-tight">{article.title}</CardTitle>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-4">
              {article.author && (
                <div className="flex items-center">
                  <UserCircle className="mr-1.5 h-4 w-4" />
                  <span>{article.author}</span>
                </div>
              )}
              {article.date && (
                <div className="flex items-center">
                  <CalendarDays className="mr-1.5 h-4 w-4" />
                  <span>{article.date}</span>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div
              className="prose dark:prose-invert max-w-none text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content || article.summary }}
            />
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
            <h3 className="text-2xl font-semibold mb-4">Need More Support?</h3>
            <p className="text-muted-foreground mb-6">
                Our AI Chatbot can provide personalized advice, or you can explore professional resources.
            </p>
            <div className="space-x-4">
                <Button asChild size="lg">
                    <Link href="/chatbot">Chat with AI</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                    <Link href="/resources">Find Professionals</Link>
                </Button>
            </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export async function generateStaticParams() {
  return articlesDb.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Fetch minimal data needed for metadata, or reuse if already fetched efficiently
  const articleDataForMeta = articlesDb.find(art => art.slug === params.slug);
  if (!articleDataForMeta) {
    return {
      title: 'Article Not Found',
    }
  }
  return {
    title: `${articleDataForMeta.title} | Serene Pathways`,
    description: articleDataForMeta.summary,
    // openGraph: {
    //   images: [articleDataForMeta.imageUrl || ''], // Add fetched image URL here if needed for social sharing
    // },
  }
}

