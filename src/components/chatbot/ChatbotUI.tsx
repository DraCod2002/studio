'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { emotionalSupportChatbot, EmotionalSupportChatbotInput, EmotionalSupportChatbotOutput } from '@/ai/flows/emotional-support-chatbot';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, User, Sparkles, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatbotUI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const initialMessage: Message = {
    id: 'initial-assistant-message',
    role: 'assistant',
    content: "¡Hola! Estoy aquí para ayudarte con la reducción del estrés y el apoyo emocional. ¿Cómo te sientes hoy?",
  };

  useEffect(() => {
    setMessages([initialMessage]);
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistoryForAI = messages.map(msg => ({ role: msg.role, content: msg.content }));
      
      const chatbotInput: EmotionalSupportChatbotInput = {
        message: input,
        chatHistory: chatHistoryForAI.slice(-6) 
      };
      
      const result: EmotionalSupportChatbotOutput = await emotionalSupportChatbot(chatbotInput);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.response,
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error al llamar la API del chatbot:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Estoy teniendo un pequeño problema para conectarme en este momento. Por favor, inténtalo de nuevo en un momento.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      toast({
        variant: "destructive",
        title: "Error del Chatbot",
        description: "No se pudo obtener una respuesta del chatbot. Por favor, revisa tu conexión o inténtalo de nuevo más tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[70vh] max-h-[70vh]">
      <ScrollArea className="flex-grow p-4 border rounded-lg mb-4 bg-muted/20" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex items-end space-x-3 animate-slide-in-up',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Sparkles className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'p-3 rounded-xl max-w-[70%] shadow-md',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-card text-card-foreground rounded-bl-none border'
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === 'user' && (
                 <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-accent text-accent-foreground">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end space-x-3 justify-start animate-pulse">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Sparkles className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="p-3 rounded-xl max-w-[70%] shadow-md bg-card text-card-foreground rounded-bl-none border">
                <p className="text-sm">Pensando...</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          aria-label="Entrada de mensaje del chat"
          className="flex-grow text-base"
          disabled={isLoading}
        />
        <Button type="submit" size="icon" disabled={isLoading || !input.trim()} aria-label="Enviar mensaje">
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        </Button>
      </form>
    </div>
  );
}
