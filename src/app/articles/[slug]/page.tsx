import PageWrapper from '@/components/layout/PageWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, UserCircle } from 'lucide-react';
import Image from 'next/image';

// This is placeholder data. In a real app, you'd fetch this based on the slug.
const getArticleData = async (slug: string) => {
  // Simulate fetching article data
  await new Promise(resolve => setTimeout(resolve, 100)); 

  const articlesDb = [
    {
      id: 'article1',
      title: 'Understanding Academic Stress: Tips for Students',
      summary: 'Learn common causes of academic stress and practical strategies to cope effectively during your studies.',
      author: 'Dr. Emily Carter',
      date: 'October 26, 2023',
      imageUrl: 'https://placehold.co/800x400.png',
      dataAiHint: 'student library',
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
    // Add other articles here if needed for testing
  ];

  const article = articlesDb.find(art => art.slug === slug);
  if (!article) {
    return null; // Or handle 404
  }
  return article;
};


export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleData(params.slug);

  if (!article) {
    // TODO: Implement a proper 404 page
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
                data-ai-hint={article.dataAiHint}
                priority // Prioritize loading the main article image
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

// This function can be used to generate static paths if you decide to pre-render articles
// export async function generateStaticParams() {
//   // Fetch all article slugs
//   const articles = [{ slug: 'understanding-academic-stress' }]; // Placeholder
//   return articles.map((article) => ({
//     slug: article.slug,
//   }));
// }

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getArticleData(params.slug);
  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }
  return {
    title: `${article.title} | Serene Pathways`,
    description: article.summary,
  }
}
