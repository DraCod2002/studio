import PageWrapper from '@/components/layout/PageWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';


export default function PrivacyPolicyPage() {
  const currentDate = format(new Date(), "d 'de' MMMM 'de' yyyy", { locale: es });
  return (
    <PageWrapper>
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <ShieldCheck className="w-16 h-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold">Política de Privacidad</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p><em>Última actualización: {currentDate}</em></p>

          <p>Bienvenido/a a Serenamente. Nos comprometemos a proteger tu privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos tu información cuando visitas nuestro sitio web y utilizas nuestros servicios, incluido nuestro chatbot de apoyo emocional y el test de nivel de estrés.</p>

          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">Información que Recopilamos</h2>
          <p>Nuestro objetivo es recopilar la menor cantidad posible de información personal para garantizar tu anonimato y privacidad.</p>
          <ul>
            <li><strong>Datos de Uso Anónimos:</strong> Podemos recopilar datos anónimos sobre tu uso del sitio web, como las páginas visitadas, las funciones utilizadas (chatbot, test de estrés) y los patrones generales de interacción. Estos datos se agregan y no se pueden utilizar para identificarte personalmente.</li>
            <li><strong>Interacciones con el Chatbot:</strong> Las conversaciones con nuestro chatbot de apoyo emocional son procesadas por nuestro modelo de IA para proporcionar respuestas. Si bien el contenido de tus mensajes se envía a la IA, no almacenamos registros de chat identificables a largo plazo asociados contigo. Te recomendamos que no compartas información de identificación personal (PII) en el chat.</li>
            <li><strong>Respuestas del Test de Estrés:</strong> Tus respuestas al test de nivel de estrés se procesan localmente en tu navegador o de forma anónima en nuestro servidor para proporcionarte una puntuación. No almacenamos tus respuestas individuales del test de una manera que pueda vincularse contigo.</li>
          </ul>

          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">Cómo Usamos Tu Información</h2>
          <p>Cualquier información recopilada se utiliza para:</p>
          <ul>
            <li>Proporcionar, operar y mantener nuestro sitio web y servicios.</li>
            <li>Mejorar, personalizar y expandir nuestro sitio web y servicios.</li>
            <li>Comprender y analizar cómo utilizas nuestro sitio web y servicios.</li>
            <li>Desarrollar nuevos productos, servicios, características y funcionalidades.</li>
            <li>Comunicarnos contigo, si inicias contacto para soporte.</li>
          </ul>
          
          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">Seguridad de los Datos</h2>
          <p>Utilizamos medidas de seguridad administrativas, técnicas y físicas para ayudar a proteger cualquier información que podamos manejar. Si bien hemos tomado medidas razonables para proteger la información, ten en cuenta que ninguna medida de seguridad es perfecta o impenetrable, y ningún método de transmisión de datos puede garantizarse contra cualquier intercepción u otro tipo de uso indebido.</p>

          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">Servicios de Terceros</h2>
          <p>La funcionalidad de nuestro chatbot IA es impulsada por modelos de IA de terceros (por ejemplo, Google Gemini a través de Genkit). Tus interacciones con el chatbot están sujetas a las políticas de privacidad de estos proveedores de IA. Hemos configurado estos servicios para priorizar la privacidad del usuario siempre que sea posible.</p>
          
          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">Privacidad de los Niños</h2>
          <p>Nuestros servicios no están destinados a ser utilizados por niños menores de 13 años. No recopilamos deliberadamente información de identificación personal de niños menores de 13 años.</p>

          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">Cambios a Esta Política de Privacidad</h2>
          <p>Podemos actualizar esta Política de Privacidad de vez en cuando. Te notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página. Se te aconseja revisar esta Política de Privacidad periódicamente para cualquier cambio.</p>

          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">Contáctanos</h2>
          <p>Si tienes alguna pregunta sobre esta Política de Privacidad, por favor contáctanos en [Correo electrónico de marcador de posición: privacidad@serenamente.app].</p>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
