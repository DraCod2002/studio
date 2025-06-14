
import PageWrapper from '@/components/layout/PageWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Info, School, Briefcase, Users, Smartphone, CreditCard, Brain } from 'lucide-react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { fetchPixabayImage } from '@/services/image-service';

type CategoryDetails = {
  [key: string]: {
    title: string;
    description: string;
    longDescription: string;
    icon: React.ElementType;
    dataAiHint: string; 
    defaultImageUrl?: string; 
  };
};

const categoryDetailsData: CategoryDetails = {
  academic: {
    title: 'Estrés Académico',
    description: 'Explora información y recursos relacionados con el estrés académico.',
    longDescription: 'El estrés académico surge de la presión de los exámenes, tareas, plazos y el entorno escolar en general. Puede afectar a estudiantes de todos los niveles. Esta sección proporciona ideas para manejar la carga de estudio, afrontar la ansiedad ante los exámenes y mantener un equilibrio saludable durante tu trayectoria académica.',
    icon: School,
    dataAiHint: 'estudio biblioteca tranquilo',
  },
  professional: {
    title: 'Estrés Profesional',
    description: 'Explora información y recursos relacionados con el estrés profesional.',
    longDescription: 'El estrés laboral puede surgir de plazos exigentes, proyectos desafiantes, dinámicas en el lugar de trabajo e incertidumbres profesionales. Aprende estrategias para gestionar la carga de trabajo, mejorar el equilibrio entre la vida laboral y personal, lidiar con colegas difíciles y prevenir el agotamiento en tu vida profesional.',
    icon: Briefcase,
    dataAiHint: 'oficina moderna tranquila',
  },
  relational: {
    title: 'Estrés Relacional',
    description: 'Explora información y recursos relacionados con el estrés relacional.',
    longDescription: 'El estrés en las relaciones personales con la familia, amigos o pareja puede afectar significativamente el bienestar. Esta sección cubre temas como habilidades de comunicación, resolución de conflictos, establecimiento de límites y fomento de conexiones saludables para reducir el estrés interpersonal.',
    icon: Users,
    dataAiHint: 'amigos solidarios conversando',
  },
  technological: {
    title: 'Estrés Tecnológico',
    description: 'Explora información y recursos relacionados con el estrés tecnológico.',
    longDescription: 'La conectividad constante, las presiones de las redes sociales y la sobrecarga de información de los dispositivos digitales pueden ser una fuente importante de estrés. Descubre formas de gestionar tu vida digital, practicar el uso consciente de la tecnología y reducir la ansiedad asociada con estar "siempre conectado".',
    icon: Smartphone,
    dataAiHint: 'persona relajandose naturaleza telefono',
  },
  financial: {
    title: 'Estrés Financiero',
    description: 'Explora información y recursos relacionados con el estrés financiero.',
    longDescription: 'Las preocupaciones sobre el dinero, las deudas, la elaboración de presupuestos y la estabilidad económica son factores estresantes comunes. Esta sección ofrece orientación sobre planificación financiera, cómo afrontar la ansiedad financiera y encontrar recursos para administrar tus finanzas de manera más eficaz.',
    icon: CreditCard,
    dataAiHint: 'planificacion financiera escritorio',
  },
  existential: {
    title: 'Estrés Existencial',
    description: 'Explora información y recursos relacionados con el estrés existencial.',
    longDescription: 'Las preocupaciones sobre el propósito de la vida, el significado, la mortalidad y el bienestar emocional general pueden provocar estrés existencial. Explora enfoques filosóficos y conscientes para encontrar significado, afrontar la incertidumbre y cultivar la paz interior.',
    icon: Brain,
    dataAiHint: 'persona serena pensando naturaleza',
  },
};

interface CategoryPageProps {
  params: { category: string };
}

async function getCategoryPageData(slug: string) {
  const details = categoryDetailsData[slug] || {
    slug,
    title: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ') + ' Estrés',
    description: `Detalles y recursos sobre el estrés ${slug.replace(/-/g, ' ')}.`,
    longDescription: 'Próximamente habrá disponible información más detallada sobre este tipo de estrés. Vuelve a consultar para obtener actualizaciones y recursos.',
    icon: Info,
    dataAiHint: 'informacion ayuda',
    defaultImageUrl: `https://placehold.co/800x400.png?text=${encodeURIComponent(slug)}`,
  };

  const imageUrl = await fetchPixabayImage(details.dataAiHint, 'horizontal', slug);
  
  return {
    ...details,
    imageUrl: imageUrl, 
  };
}

export default async function StressCategoryPage({ params }: CategoryPageProps) {
  const categoryData = await getCategoryPageData(params.category);
  const IconComponent = categoryData.icon;

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Inicio
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
                Esta página proporciona información general. Para artículos y herramientas más específicos relacionados con {categoryData.title.toLowerCase()}, por favor explora nuestros otros recursos.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
            <h3 className="text-2xl font-semibold mb-4">Explora Otros Recursos</h3>
            <p className="text-muted-foreground mb-6">
                Encuentra artículos, chatea con nuestra IA o descubre ayuda profesional.
            </p>
            <div className="space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 flex flex-col sm:flex-row justify-center">
                <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link href="/articles">Leer Artículos</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                    <Link href="/chatbot">Chatear con IA</Link>
                </Button>
                <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                    <Link href="/resources">Encontrar Profesionales</Link>
                </Button>
            </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const categoryData = await getCategoryPageData(params.category); 
  return {
    title: `${categoryData.title} | Serenamente`,
    description: categoryData.description,
  };
}

export async function generateStaticParams() {
  return Object.keys(categoryDetailsData).map((category) => ({
    category: category,
  }));
}
