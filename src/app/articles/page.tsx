
import PageWrapper from '@/components/layout/PageWrapper';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Edit3, ExternalLink } from 'lucide-react'; 
import Image from 'next/image';
import { fetchPixabayImage } from '@/services/image-service';

interface Article {
  id: string;
  title: string;
  summary: string;
  author?: string;
  date?: string;
  dataAiHint: string;
  category: string;
  slug: string;
  imageUrl?: string; 
}

const sampleArticlesData: Omit<Article, 'imageUrl'>[] = [
  {
    id: 'article1',
    title: 'Comprendiendo el Estrés Académico: Consejos para Estudiantes',
    summary: 'Aprende las causas comunes del estrés académico y estrategias prácticas para afrontarlo eficazmente durante tus estudios.',
    author: 'Dra. Emily Carter',
    date: '26 de octubre de 2023',
    dataAiHint: 'estudiante concentrado biblioteca',
    category: 'Estrés Académico',
    slug: 'understanding-academic-stress',
  },
  {
    id: 'article2',
    title: 'Equilibrio entre Trabajo y Vida Personal en la Era Moderna',
    summary: 'Explora técnicas para manejar el estrés profesional y cultivar un equilibrio saludable entre trabajo y vida personal en el entorno exigente de hoy.',
    author: 'John Miller',
    date: '5 de noviembre de 2023',
    dataAiHint: 'equilibrio laboral personal',
    category: 'Estrés Profesional',
    slug: 'work-life-balance',
  },
  {
    id: 'article3',
    title: 'Navegando las Redes Sociales y el Bienestar Mental',
    summary: 'Descubre cómo la tecnología y las redes sociales pueden impactar los niveles de estrés y aprende enfoques conscientes para el consumo digital.',
    author: 'Aisha Khan',
    date: '12 de noviembre de 2023',
    dataAiHint: 'redes sociales conscientes',
    category: 'Estrés Tecnológico',
    slug: 'social-media-wellbeing',
  },
  {
    id: 'article4',
    title: 'Meditación Mindfulness: Guía para Principiantes',
    summary: 'Una introducción a las prácticas de meditación mindfulness que pueden ayudar a reducir el estrés y mejorar la regulación emocional general.',
    author: 'Equipo Serenamente',
    date: '18 de noviembre de 2023',
    dataAiHint: 'meditacion pacifica airelibre',
    category: 'Técnicas',
    slug: 'mindfulness-meditation-guide',
  },
];

async function getArticlesWithImages(): Promise<Article[]> {
  const articlesWithImages = await Promise.all(
    sampleArticlesData.map(async (articleData) => {
      const imageUrl = await fetchPixabayImage(articleData.dataAiHint, 'horizontal', articleData.slug);
      return {
        ...articleData,
        imageUrl,
      };
    })
  );
  return articlesWithImages;
}

export default async function ArticlesPage() {
  const articles = await getArticlesWithImages();

  return (
    <PageWrapper>
      <div className="text-center mb-12">
        <Edit3 className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">Artículos e Ideas</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explora una colección de artículos e ideas sobre diversos aspectos del manejo del estrés y el bienestar emocional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <Card key={article.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardHeader className="p-0">
              {article.imageUrl && (
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
              )}
              <div className="p-6">
                <span className="text-xs font-semibold uppercase text-primary tracking-wider">{article.category}</span>
                <CardTitle className="text-xl mt-1 mb-2">{article.title}</CardTitle>
                 {article.author && article.date && (
                  <p className="text-xs text-muted-foreground mb-2">
                    Por {article.author} el {article.date}
                  </p>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow px-6">
              <CardDescription className="text-base leading-relaxed">{article.summary}</CardDescription>
            </CardContent>
            <CardFooter className="px-6 pb-6">
              <Button asChild variant="outline" className="w-full">
                <Link href={`/articles/${article.slug}`}>
                  Leer Más <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </PageWrapper>
  );
}
