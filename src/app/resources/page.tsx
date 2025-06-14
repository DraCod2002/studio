
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
    name: 'Línea Nacional de Prevención del Suicidio (EE. UU.)',
    description: 'Proporciona apoyo gratuito y confidencial las 24 horas del día, los 7 días de la semana para personas en crisis, recursos de prevención y crisis para ti o tus seres queridos.',
    contact: '988',
    website: 'https://988lifeline.org/es/', 
    type: 'hotline',
  },
  {
    id: 'resource2',
    name: 'Crisis Text Line (EE. UU.)',
    description: 'Envía un mensaje de texto con HOME al 741741 desde cualquier lugar de EE. UU., en cualquier momento, sobre cualquier tipo de crisis.',
    contact: 'Envía HOME al 741741',
    website: 'https://www.crisistextline.org/',
    type: 'hotline',
  },
  {
    id: 'resource3',
    name: 'Alianza Nacional sobre Enfermedades Mentales (NAMI - EE. UU.)',
    description: 'La organización de salud mental de base más grande del país dedicada a construir mejores vidas para los millones de estadounidenses afectados por enfermedades mentales.',
    website: 'https://www.nami.org/Your-Journey/Identity-and-Cultural-Dimensions/Hispanic-Latinx',
    type: 'organization',
  },
  {
    id: 'resource4',
    name: 'MentalHealth.gov (EE. UU.)',
    description: 'Proporciona acceso único a información del gobierno de EE. UU. sobre salud mental y problemas de salud mental.',
    website: 'https://www.mentalhealth.gov/get-help/immediate-help',
    type: 'online_resource',
  },
  {
    id: 'resource5',
    name: 'The Trevor Project (EE. UU.)',
    description: 'Proporciona intervención en crisis y servicios de prevención del suicidio a jóvenes lesbianas, gays, bisexuales, transgénero, queer e indecisos (LGBTQ) menores de 25 años.',
    contact: '1-866-488-7386',
    website: 'https://www.thetrevorproject.org/get-help/', 
    type: 'organization',
  },
    {
    id: 'resource6',
    name: 'Asociación de Ansiedad y Depresión de América (ADAA - EE. UU.)',
    description: 'Una organización internacional sin fines de lucro dedicada a la prevención, tratamiento y cura de la ansiedad, depresión, TOC, TEPT y trastornos concurrentes a través de la educación, la práctica y la investigación.',
    website: 'https://adaa.org/finding-help/hispanic-latinos',
    type: 'organization',
  },
];

export default function ResourcesPage() {
  return (
    <PageWrapper>
      <div className="text-center mb-12">
        <LifeBuoy className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">Recursos Profesionales</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Si estás en crisis o necesitas apoyo inmediato, por favor contacta a estas organizaciones.
          Recuerda, no estás solo/a.
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
                  <strong>Contacto:</strong> {resource.contact}
                </p>
              )}
            </CardContent>
            {resource.website && (
              <div className="p-6 pt-0 mt-auto">
                <Button asChild variant="outline" className="w-full">
                  <Link href={resource.website} target="_blank" rel="noopener noreferrer">
                    Visitar Sitio Web <ExternalLink className="ml-2 h-4 w-4" />
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
            <AlertTriangle className="mr-2 h-5 w-5" /> Descargo de Responsabilidad Importante
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            La información proporcionada en Serenamente, incluyendo el chatbot y el test de estrés, es solo para fines informativos y educativos. No pretende ser un sustituto del consejo, diagnóstico o tratamiento médico profesional. Siempre busca el consejo de tu médico u otro proveedor de salud calificado con cualquier pregunta que puedas tener sobre una condición médica. Si estás en una crisis, por favor contacta a los servicios de emergencia o a una línea de crisis inmediatamente.
          </p>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
