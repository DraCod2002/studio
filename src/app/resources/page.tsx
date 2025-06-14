
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
    name: 'Línea 113 - Opción 5 (MINSA)',
    description: 'Línea gratuita del Ministerio de Salud de Perú que brinda orientación y consejería en salud mental las 24 horas.',
    contact: 'Marcar 113, opción 5',
    website: 'https://www.gob.pe/minsa',
    type: 'hotline',
  },
  {
    id: 'resource2',
    name: 'Sentido - Centro Peruano de Suicidología y Prevención del Suicidio',
    description: 'Organización dedicada a la prevención del suicidio, ofrece información y recursos. Pueden tener líneas de ayuda o formas de contacto en su web.',
    website: 'https://www.sentido.pe/',
    type: 'organization',
  },
  {
    id: 'resource3',
    name: 'Instituto Nacional de Salud Mental "Honorio Delgado - Hideyo Noguchi"',
    description: 'Principal institución de investigación, docencia y atención especializada en salud mental en Perú.',
    contact: '(01) 6149200', // Verificar este número o buscar uno de atención directa si existe
    website: 'https://www.insm.gob.pe/',
    type: 'organization',
  },
  {
    id: 'resource4',
    name: 'Aldeas Infantiles SOS Perú',
    description: 'Si bien se enfocan en niños, pueden ofrecer o dirigir a recursos de apoyo emocional para familias y jóvenes.',
    website: 'https://www.aldeasinfantiles.org.pe/apoyo-emocional', // Revisar si tienen sección específica
    type: 'organization',
  },
  {
    id: 'resource5',
    name: 'Chat 100 (MIMP)',
    description: 'Servicio de chat del Ministerio de la Mujer y Poblaciones Vulnerables para casos de violencia, pero también puede ofrecer orientación general.',
    website: 'https://chat100.mimp.gob.pe/',
    type: 'online_resource',
  },
  {
    id: 'resource6',
    name: 'InfoSalud (MINSA)',
    description: 'Plataforma del Ministerio de Salud con información diversa, incluyendo temas de salud mental y directorios.',
    website: 'https://www.gob.pe/institucion/minsa/canales_atencion_multiple',
    type: 'online_resource',
  },
];

export default function ResourcesPage() {
  return (
    <PageWrapper>
      <div className="text-center mb-12">
        <LifeBuoy className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">Recursos Profesionales en Perú</h1>
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
            La información proporcionada en Xstrees, incluyendo el chatbot y el test de estrés, es solo para fines informativos y educativos. No pretende ser un sustituto del consejo, diagnóstico o tratamiento médico profesional. Siempre busca el consejo de tu médico u otro proveedor de salud calificado con cualquier pregunta que puedas tener sobre una condición médica. Si estás en una crisis, por favor contacta a los servicios de emergencia o a una línea de crisis inmediatamente.
          </p>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
