
import PageWrapper from '@/components/layout/PageWrapper';
import StressTestForm from '@/components/stress-test/StressTestForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardCheck } from 'lucide-react'; // Changed icon

export default function StressTestPage() {
  return (
    <PageWrapper className="flex flex-col items-center">
      <Card className="w-full max-w-2xl shadow-xl">
         <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <ClipboardCheck className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Formulario para Identificar si Tienes Estrés</CardTitle>
          <CardDescription className="text-lg text-muted-foreground px-2">
            Instrucciones: Marca con una “✅” si la afirmación aplica a ti durante las últimas dos semanas.
            <br />
            <span className="text-sm mt-1 block">Esta es una herramienta de autoevaluación, no un diagnóstico.</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StressTestForm />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
