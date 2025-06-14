import PageWrapper from '@/components/layout/PageWrapper';
import StressTestForm from '@/components/stress-test/StressTestForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardList } from 'lucide-react';

export default function StressTestPage() {
  return (
    <PageWrapper className="flex flex-col items-center">
      <Card className="w-full max-w-2xl shadow-xl">
         <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <ClipboardList className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Stress Level Assessment</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Answer a few questions to get a basic understanding of your current stress level.
            This is not a diagnostic tool.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StressTestForm />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
