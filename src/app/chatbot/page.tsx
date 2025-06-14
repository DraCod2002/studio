import PageWrapper from '@/components/layout/PageWrapper';
import ChatbotUI from '@/components/chatbot/ChatbotUI';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquareHeart } from 'lucide-react';

export default function ChatbotPage() {
  return (
    <PageWrapper className="flex flex-col items-center">
      <Card className="w-full max-w-3xl shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <MessageSquareHeart className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Chatbot de Apoyo Emocional</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Tu compañero IA amigable para el alivio del estrés y el bienestar emocional.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChatbotUI />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
