'use server';

/**
 * @fileOverview A emotional support chatbot AI agent.
 *
 * - emotionalSupportChatbot - A function that handles the chatbot interactions.
 * - EmotionalSupportChatbotInput - The input type for the emotionalSupportChatbot function.
 * - EmotionalSupportChatbotOutput - The return type for the emotionalSupportChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EmotionalSupportChatbotInputSchema = z.object({
  message: z.string().describe('The user message to the chatbot.'),
  chatHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional().describe('The chat history between the user and the chatbot.'),
});
export type EmotionalSupportChatbotInput = z.infer<typeof EmotionalSupportChatbotInputSchema>;

const EmotionalSupportChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user message.'),
});
export type EmotionalSupportChatbotOutput = z.infer<typeof EmotionalSupportChatbotOutputSchema>;

export async function emotionalSupportChatbot(input: EmotionalSupportChatbotInput): Promise<EmotionalSupportChatbotOutput> {
  return emotionalSupportChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'emotionalSupportChatbotPrompt',
  input: {schema: EmotionalSupportChatbotInputSchema},
  output: {schema: EmotionalSupportChatbotOutputSchema},
  prompt: `You are a compassionate and helpful emotional support chatbot. Your goal is to provide personalized stress reduction advice, including exercises, meditation techniques, and journaling prompts.

  Here's the chat history:
  {{#each chatHistory}}
    {{#if (eq this.role \"user\")}}User:{{this.content}}
    {{else}}Assistant: {{this.content}}{{/if}}
  {{/each}}

  User message: {{{message}}}

  Respond in a supportive and encouraging manner. Offer practical techniques for stress reduction, such as breathing exercises, meditation, active breaks, and journaling. If the user seems to be in distress, suggest contacting a mental health professional.
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
