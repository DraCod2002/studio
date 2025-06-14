
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
  imageUrl?: string; 
}

const articlesDb: Omit<ArticleData, 'imageUrl'>[] = [
  {
    id: 'article1',
    title: 'Comprendiendo el Estrés Académico: Consejos para Estudiantes',
    summary: 'Aprende las causas comunes del estrés académico y estrategias prácticas para afrontarlo eficazmente durante tus estudios.',
    author: 'Dra. Emily Carter',
    date: '26 de octubre de 2023',
    dataAiHint: 'estudiante estudiando biblioteca tranquilo', 
    category: 'Estrés Académico',
    slug: 'understanding-academic-stress',
    content: `
      <p>La vida académica, aunque gratificante, a menudo puede ser una fuente importante de estrés para los estudiantes. La presión por rendir bien en los exámenes, cumplir con los plazos de las tareas, gestionar actividades extracurriculares y planificar el futuro puede resultar abrumadora. Comprender los desencadenantes comunes del estrés académico es el primer paso para gestionarlo eficazmente.</p>
      <h3 class="text-xl font-semibold mt-6 mb-3 font-headline">Causas Comunes del Estrés Académico:</h3>
      <ul class="list-disc list-inside space-y-1 mb-4">
        <li>Presión por los exámenes y miedo al fracaso</li>
        <li>Gran carga de trabajo y plazos ajustados</li>
        <li>Dificultad para comprender el material del curso</li>
        <li>Competencia con los compañeros</li>
        <li>Equilibrar los estudios con la vida personal y trabajos a tiempo parcial</li>
        <li>Ansiedades sobre la futura carrera profesional</li>
      </ul>
      <h3 class="text-xl font-semibold mt-6 mb-3 font-headline">Estrategias Prácticas para Afrontarlo:</h3>
      <ol class="list-decimal list-inside space-y-2">
        <li><strong>Gestión del Tiempo:</strong> Crea un horario de estudio realista. Divide las tareas grandes en pasos más pequeños y manejables. Prioriza las tareas según su importancia y plazos.</li>
        <li><strong>Hábitos de Estudio Efectivos:</strong> Encuentra un método de estudio que te funcione. Esto podría incluir el recuerdo activo, la repetición espaciada o los mapas conceptuales. Asegúrate de tener un entorno de estudio tranquilo y cómodo.</li>
        <li><strong>Busca Apoyo:</strong> No dudes en hablar con profesores, ayudantes de cátedra, asesores académicos o consejeros si tienes dificultades. Los grupos de estudio también pueden ser beneficiosos.</li>
        <li><strong>Prioriza el Sueño:</strong> Intenta dormir entre 7 y 9 horas de calidad por noche. La falta de sueño puede empeorar significativamente el estrés y afectar la función cognitiva.</li>
        <li><strong>Ejercicio Regular:</strong> La actividad física es un gran alivio para el estrés. Incluso una caminata corta o algunos estiramientos pueden marcar la diferencia.</li>
        <li><strong>Mindfulness y Técnicas de Relajación:</strong> Practica ejercicios de respiración profunda, meditación o yoga para calmar tu mente.</li>
        <li><strong>Dieta Saludable:</strong> Alimenta tu cuerpo y cerebro con alimentos nutritivos. Evita el exceso de cafeína y los snacks azucarados.</li>
        <li><strong>Establece Metas Realistas:</strong> Esfuérzate por progresar, no por la perfección. Celebra las pequeñas victorias en el camino.</li>
        <li><strong>Toma Descansos Regulares:</strong> Los descansos cortos durante las sesiones de estudio pueden mejorar la concentración y reducir la fatiga.</li>
        <li><strong>Participa en Hobbies:</strong> Dedica tiempo a actividades que disfrutes. Esto ayuda a desestresarse y proporciona una sensación de equilibrio.</li>
      </ol>
      <p class="mt-6">Recuerda, experimentar algo de estrés es normal, pero el estrés crónico puede ser perjudicial para tu salud y rendimiento académico. Implementar estas estrategias puede ayudarte a navegar los desafíos de la vida estudiantil de manera más efectiva. Si el estrés se vuelve inmanejable, buscar ayuda profesional es una señal de fortaleza.</p>
    `
  },
  {
    id: 'article2',
    title: 'Equilibrio entre Trabajo y Vida Personal en la Era Moderna',
    summary: 'Explora técnicas para manejar el estrés profesional y cultivar un equilibrio saludable entre trabajo y vida personal en el entorno exigente de hoy.',
    author: 'John Miller',
    date: '5 de noviembre de 2023',
    dataAiHint: 'persona equilibrando trabajo hogar',
    category: 'Estrés Profesional',
    slug: 'work-life-balance',
    content: `
      <p>Lograr un equilibrio saludable entre el trabajo y la vida personal es crucial para el bienestar general y para prevenir el agotamiento profesional. Las demandas del trabajo moderno a menudo pueden difuminar las líneas entre la vida profesional y personal. Este artículo explora estrategias para crear mejores límites y gestionar tu energía de manera eficaz.</p>
      <h3 class="text-xl font-semibold mt-6 mb-3 font-headline">Áreas Clave para Mejorar:</h3>
      <ul class="list-disc list-inside space-y-1 mb-4">
        <li>Establecer límites claros entre el trabajo y el tiempo personal.</li>
        <li>Priorizar tareas y gestionar el tiempo de manera eficiente.</li>
        <li>Aprender a decir "no" a compromisos adicionales cuando se está abrumado.</li>
        <li>Incorporar descansos regulares y tiempo de inactividad.</li>
        <li>Participar en hobbies y actividades fuera del trabajo.</li>
        <li>Desconectarse de las comunicaciones relacionadas con el trabajo fuera del horario laboral.</li>
      </ul>
      <p class="mt-6">Encontrar lo que funciona para ti es un viaje personal, pero trabajar activamente hacia un mejor equilibrio entre el trabajo y la vida personal puede reducir significativamente el estrés y mejorar la satisfacción laboral.</p>
    `
  },
  {
    id: 'article3',
    title: 'Navegando las Redes Sociales y el Bienestar Mental',
    summary: 'Descubre cómo la tecnología y las redes sociales pueden impactar los niveles de estrés y aprende enfoques conscientes para el consumo digital.',
    author: 'Aisha Khan',
    date: '12 de noviembre de 2023',
    dataAiHint: 'persona usando telefono conscientemente naturaleza',
    category: 'Estrés Tecnológico',
    slug: 'social-media-wellbeing',
    content: `
      <p>Las redes sociales y la conectividad digital constante pueden ser un arma de doble filo. Si bien ofrecen conexión e información, también pueden contribuir al estrés, la ansiedad y los sentimientos de insuficiencia. Este artículo analiza enfoques conscientes para el uso de la tecnología.</p>
      <h3 class="text-xl font-semibold mt-6 mb-3 font-headline">Estrategias para un Uso Consciente de la Tecnología:</h3>
      <ul class="list-disc list-inside space-y-1 mb-4">
        <li>Establecer límites de tiempo para el uso de redes sociales y aplicaciones.</li>
        <li>Curar tu feed para incluir contenido positivo y edificante.</li>
        <li>Tomar descansos regulares de desintoxicación digital.</li>
        <li>Ser consciente de las trampas de comparación y su impacto en la autoestima.</li>
        <li>Centrarse en interacciones y hobbies del mundo real.</li>
      </ul>
      <p class="mt-6">Al volvernos más intencionales con nuestro uso de la tecnología, podemos aprovechar sus beneficios mientras mitigamos sus posibles impactos negativos en nuestro bienestar mental.</p>
    `
  },
  {
    id: 'article4',
    title: 'Meditación Mindfulness: Guía para Principiantes',
    summary: 'Una introducción a las prácticas de meditación mindfulness que pueden ayudar a reducir el estrés y mejorar la regulación emocional general.',
    author: 'Equipo Xstrees',
    date: '18 de noviembre de 2023',
    dataAiHint: 'persona calmada meditando airelibre sol',
    category: 'Técnicas',
    slug: 'mindfulness-meditation-guide',
    content: `
      <p>La meditación mindfulness es una práctica que implica prestar atención al momento presente sin juzgar. Se ha demostrado que reduce el estrés, mejora la concentración y potencia la regulación emocional. Esta guía proporciona una introducción sencilla para que comiences.</p>
      <h3 class="text-xl font-semibold mt-6 mb-3 font-headline">Comenzando con Mindfulness:</h3>
      <ol class="list-decimal list-inside space-y-2">
        <li><strong>Encuentra un Espacio Tranquilo:</strong> Elige un lugar cómodo donde no te molesten.</li>
        <li><strong>Postura Cómoda:</strong> Siéntate o acuéstate en una posición cómoda.</li>
        <li><strong>Concéntrate en tu Respiración:</strong> Presta atención a la sensación de tu respiración entrando y saliendo de tu cuerpo.</li>
        <li><strong>Reconoce los Pensamientos:</strong> Cuando tu mente divague (y lo hará), reconoce suavemente el pensamiento y vuelve tu atención a tu respiración.</li>
        <li><strong>Empieza Poco a Poco:</strong> Comienza con sesiones cortas de 5-10 minutos y aumenta gradualmente la duración.</li>
      </ol>
      <p class="mt-6">La constancia es clave. Incluso unos pocos minutos de mindfulness cada día pueden marcar la diferencia.</p>
    `
  },
];

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
          <h1 className="text-4xl font-bold mb-4">Artículo No Encontrado</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Lo sentimos, no pudimos encontrar el artículo que estabas buscando.
          </p>
          <Button asChild>
            <Link href="/articles">Volver a Artículos</Link>
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
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Artículos
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
            <h3 className="text-2xl font-semibold mb-4">¿Necesitas Más Apoyo?</h3>
            <p className="text-muted-foreground mb-6">
                Nuestro Chatbot IA puede proporcionar consejos personalizados, o puedes explorar recursos profesionales.
            </p>
            <div className="space-x-4">
                <Button asChild size="lg">
                    <Link href="/chatbot">Chatear con IA</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                    <Link href="/resources">Encontrar Profesionales</Link>
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
  const articleDataForMeta = articlesDb.find(art => art.slug === params.slug);
  if (!articleDataForMeta) {
    return {
      title: 'Artículo No Encontrado',
    }
  }
  return {
    title: `${articleDataForMeta.title} | Xstrees`,
    description: articleDataForMeta.summary,
  }
}
