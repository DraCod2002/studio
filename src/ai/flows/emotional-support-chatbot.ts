'use server';

/**
 * @fileOverview Un agente de IA chatbot de apoyo emocional.
 *
 * - emotionalSupportChatbot - Una función que maneja las interacciones del chatbot.
 * - EmotionalSupportChatbotInput - El tipo de entrada para la función emotionalSupportChatbot.
 * - EmotionalSupportChatbotOutput - El tipo de retorno para la función emotionalSupportChatbot.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EmotionalSupportChatbotInputSchema = z.object({
  message: z.string().describe('El mensaje del usuario al chatbot.'),
  chatHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional().describe('El historial de chat entre el usuario y el chatbot.'),
});
export type EmotionalSupportChatbotInput = z.infer<typeof EmotionalSupportChatbotInputSchema>;

const EmotionalSupportChatbotOutputSchema = z.object({
  response: z.string().describe('La respuesta del chatbot al mensaje del usuario.'),
});
export type EmotionalSupportChatbotOutput = z.infer<typeof EmotionalSupportChatbotOutputSchema>;

export async function emotionalSupportChatbot(input: EmotionalSupportChatbotInput): Promise<EmotionalSupportChatbotOutput> {
  return emotionalSupportChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'emotionalSupportChatbotPrompt',
  input: {schema: EmotionalSupportChatbotInputSchema},
  output: {schema: EmotionalSupportChatbotOutputSchema},
  prompt: `Eres un chatbot de apoyo emocional compasivo y servicial. Tu objetivo es proporcionar consejos personalizados para la reducción del estrés, incluyendo ejercicios, técnicas de meditación y sugerencias para escribir un diario.

  Aquí está el historial de chat:
  {{#each chatHistory}}
  {{role}}: {{content}}
  {{/each}}

  Mensaje del usuario: {{{message}}}

  Responde de manera solidaria y alentadora. Ofrece técnicas prácticas para la reducción del estrés, como ejercicios de respiración, meditación, descansos activos y escritura de un diario. Si el usuario parece estar angustiado, sugiere contactar a un profesional de la salud mental.
  `,
});

const emotionalSupportChatbotFlow = ai.defineFlow(
  {
    name: 'emotionalSupportChatbotFlow',
    inputSchema: EmotionalSupportChatbotInputSchema,
    outputSchema: EmotionalSupportChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
