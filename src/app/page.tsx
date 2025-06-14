
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import PageWrapper from '@/components/layout/PageWrapper';
import { School, Briefcase, Users, Smartphone, CreditCard, Brain, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { fetchPixabayImage } from '@/services/image-service';

const stressCategories = [
  {
    title: 'Estrés Académico',
    description: 'Presión por exámenes, tareas y vida escolar.',
    icon: School,
    link: '/stress/academic',
    dataAiHint: 'estudio biblioteca',
  },
  {
    title: 'Estrés Profesional',
    description: 'Tensión laboral, plazos y desafíos profesionales.',
    icon: Briefcase,
    link: '/stress/professional',
    dataAiHint: 'escritorio oficina tranquilo',
  },
  {
    title: 'Estrés Relacional',
    description: 'Dificultades en relaciones personales con familia o amigos.',
    icon: Users,
    link: '/stress/relational',
    dataAiHint: 'amigos hablando',
  },
  {
    title: 'Estrés Tecnológico',
    description: 'Sobrecarga por redes sociales, notificaciones y vida digital.',
    icon: Smartphone,
    link: '/stress/technological',
    dataAiHint: 'persona relajandose telefono',
  },
  {
    title: 'Estrés Financiero',
    description: 'Preocupaciones por dinero, deudas y estabilidad económica.',
    icon: CreditCard,
    link: '/stress/financial',
    dataAiHint: 'ahorros alcancia',
  },
  {
    title: 'Estrés Existencial',
    description: 'Inquietudes sobre el propósito de vida, significado y bienestar emocional.',
    icon: Brain,
    link: '/stress/existential',
    dataAiHint: 'persona pensativa naturaleza',
  },
];

export default async function HomePage() {
  const heroImageHint = "meditacion naturaleza";
  const heroImageUrl = await fetchPixabayImage(heroImageHint, 'all', 'hero');
  
  const calmSceneryHint = "paisaje calmado";
  const calmSceneryImageUrl = await fetchPixabayImage(calmSceneryHint, 'horizontal', 'paisaje-calmado');

  return (
    <PageWrapper>
      <section className="text-center py-12 md:py-20 bg-gradient-to-b from-background to-accent/10 rounded-lg shadow-sm">
        <div className="relative w-48 h-48 md:w-60 md:h-60 mx-auto mb-8">
          <Image 
            src={heroImageUrl} 
            alt="Persona calmada meditando en la naturaleza" 
            layout="fill"
            objectFit="cover"
            className="rounded-full shadow-xl"
            data-ai-hint={heroImageHint}
            priority
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground animate-fade-in tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary-foreground ">
          Bienvenido a Serenamente
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          Tu guía personal para comprender, manejar y reducir el estrés para una vida más pacífica.
        </p>
        <div className="space-x-4 animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
          <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
            <Link href="/chatbot">Chatea con el Bot de Apoyo <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
            <Link href="/stress-test">Realiza el Test de Estrés</Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <h2 className="text-3xl font-bold text-center mb-12">Explora el Manejo del Estrés</h2>
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
            <h2 className="text-3xl font-bold mb-6">¿Listo para Encontrar tu Calma?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Nuestras herramientas y recursos están diseñados para ayudarte a navegar los desafíos de la vida con mayor facilidad y resiliencia. Descubre estrategias y apoyo personalizados.
            </p>
            <div className="space-y-4 md:space-y-0 md:space-x-4">
              <Button asChild size="lg" className="w-full md:w-auto shadow-md hover:shadow-lg transition-shadow">
                <Link href="/articles">Leer Artículos</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full md:w-auto shadow-md hover:shadow-lg transition-shadow">
                <Link href="/resources">Encontrar Profesionales</Link>
              </Button>
            </div>
          </div>
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-xl">
             <Image 
                src={calmSceneryImageUrl} 
                alt="Paisaje tranquilo" 
                layout="fill"
                objectFit="cover"
                data-ai-hint={calmSceneryHint}
              />
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
