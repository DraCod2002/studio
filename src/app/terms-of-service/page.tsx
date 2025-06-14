import PageWrapper from '@/components/layout/PageWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function TermsOfServicePage() {
  const currentDate = format(new Date(), "d 'de' MMMM 'de' yyyy", { locale: es });
  return (
    <PageWrapper>
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold">Términos de Servicio</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p><em>Última actualización: {currentDate}</em></p>

          <p>Por favor, lee estos Términos de Servicio ("Términos", "Términos de Servicio") cuidadosamente antes de usar el sitio web Serenamente y sus servicios (el "Servicio") operado por Serenamente ("nosotros", "nos" o "nuestro").</p>
          
          <p>Tu acceso y uso del Servicio está condicionado a tu aceptación y cumplimiento de estos Términos. Estos Términos se aplican a todos los visitantes, usuarios y otras personas que accedan o utilicen el Servicio.</p>
          
          <p>Al acceder o utilizar el Servicio, aceptas estar sujeto a estos Términos. Si no estás de acuerdo con alguna parte de los términos, entonces no podrás acceder al Servicio.</p>

          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">Uso del Servicio</h2>
          <p>Serenamente proporciona información y herramientas relacionadas con el manejo del estrés, incluyendo un chatbot de apoyo emocional y un test de nivel de estrés. Estos servicios son solo para fines informativos y educativos.</p>
          <p><strong>El Servicio no proporciona consejo médico, diagnóstico o tratamiento.</strong> El contenido y las herramientas proporcionadas no son un sustituto del consejo, diagnóstico o tratamiento médico profesional. Siempre busca el consejo de tu médico u otro proveedor de salud calificado con cualquier pregunta que puedas tener sobre una condición médica. Nunca ignores el consejo médico profesional ni demores en buscarlo debido a algo que hayas leído o con lo que hayas interactuado en el Servicio.</p>
          <p><strong>Si estás experimentando una emergencia médica o crisis, llama a tu número de emergencia local (por ejemplo, 911 en EE. UU.) o dirígete a la sala de emergencias más cercana inmediatamente.</strong></p>

          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">Acceso Anónimo</h2>
          <p>Nos esforzamos por proporcionar acceso anónimo a nuestros servicios. No se te requiere crear una cuenta ni proporcionar información de identificación personal para usar la mayoría de las funciones del Servicio. Te recomendamos no compartir información personal sensible mientras utilizas el chatbot u otras funciones interactivas.</p>

          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">Propiedad Intelectual</h2>
          <p>El Servicio y su contenido original, características y funcionalidad son y seguirán siendo propiedad exclusiva de Serenamente y sus licenciantes. El Servicio está protegido por derechos de autor, marcas registradas y otras leyes tanto de [Tu País/Jurisdicción] como de países extranjeros.</p>

          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">Conducta del Usuario</h2>
          <p>Aceptas no utilizar el Servicio:</p>
          <ul>
            <li>De ninguna manera que viole cualquier ley o regulación nacional o internacional aplicable.</li>
            <li>Con el propósito de explotar, dañar o intentar explotar o dañar a menores de cualquier manera.</li>
            <li>Para transmitir, o procurar el envío de, cualquier material publicitario o promocional, incluyendo cualquier "correo basura", "carta en cadena", "spam" o cualquier otra solicitud similar.</li>
            <li>Para hacerse pasar o intentar hacerse pasar por Serenamente, un empleado de Serenamente, otro usuario o cualquier otra persona o entidad.</li>
            <li>Para participar en cualquier otra conducta que restrinja o inhiba el uso o disfrute del Servicio por parte de cualquier persona, o que, según lo determinemos, pueda dañar a Serenamente o a los usuarios del Servicio o exponerlos a responsabilidad.</li>
          </ul>

          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">Limitación de Responsabilidad</h2>
          <p>En ningún caso Serenamente, ni sus directores, empleados, socios, agentes, proveedores o afiliados, serán responsables por daños indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo, sin limitación, pérdida de ganancias, datos, uso, buena voluntad u otras pérdidas intangibles, resultantes de (i) tu acceso o uso o incapacidad para acceder o usar el Servicio; (ii) cualquier conducta o contenido de cualquier tercero en el Servicio; (iii) cualquier contenido obtenido del Servicio; y (iv) acceso no autorizado, uso o alteración de tus transmisiones o contenido, ya sea basado en garantía, contrato, agravio (incluyendo negligencia) o cualquier otra teoría legal, hayamos sido informados o no de la posibilidad de dicho daño, e incluso si se determina que un remedio establecido en este documento ha fallado en su propósito esencial.</p>

          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">Descargo de Responsabilidad</h2>
          <p>Tu uso del Servicio es bajo tu propio riesgo. El Servicio se proporciona "TAL CUAL" y "SEGÚN DISPONIBILIDAD". El Servicio se proporciona sin garantías de ningún tipo, ya sean expresas o implícitas, incluyendo, pero no limitado a, garantías implícitas de comerciabilidad, idoneidad para un propósito particular, no infracción o curso de rendimiento.</p>
          <p>Serenamente no garantiza que a) el Servicio funcionará ininterrumpidamente, seguro o disponible en cualquier momento o lugar en particular; b) cualquier error o defecto será corregido; c) el Servicio está libre de virus u otros componentes dañinos; o d) los resultados del uso del Servicio cumplirán con tus requisitos.</p>
          
          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">Cambios</h2>
          <p>Nos reservamos el derecho, a nuestra entera discreción, de modificar o reemplazar estos Términos en cualquier momento. Si una revisión es material, intentaremos proporcionar al menos 30 días de aviso antes de que entren en vigor los nuevos términos. Lo que constituye un cambio material se determinará a nuestra entera discreción.</p>
          <p>Al continuar accediendo o utilizando nuestro Servicio después de que esas revisiones entren en vigor, aceptas estar sujeto a los términos revisados. Si no estás de acuerdo con los nuevos términos, por favor deja de usar el Servicio.</p>

          <h2 className="font-headline text-xl font-semibold mt-6 mb-2">Contáctanos</h2>
          <p>Si tienes alguna pregunta sobre estos Términos, por favor contáctanos en [Correo electrónico de marcador de posición: soporte@serenamente.app].</p>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
