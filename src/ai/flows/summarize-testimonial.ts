
'use server';

/**
 * @fileOverview Un agente de IA para resumir testimonios.
 *
 * - summarizeTestimonial - Una función que maneja el proceso de resumen de testimonios.
 * - SummarizeTestimonialInput - El tipo de entrada para la función summarizeTestimonial.
 * - SummarizeTestimonialOutput - El tipo de retorno para la función summarizeTestimonial.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTestimonialInputSchema = z.object({
  testimonial: z
    .string()
    .describe('El testimonio a resumir.'),
});
export type SummarizeTestimonialInput = z.infer<typeof SummarizeTestimonialInputSchema>;

const SummarizeTestimonialOutputSchema = z.object({
  summary: z.string().describe('El resumen del testimonio.'),
});
export type SummarizeTestimonialOutput = z.infer<typeof SummarizeTestimonialOutputSchema>;

export async function summarizeTestimonial(input: SummarizeTestimonialInput): Promise<SummarizeTestimonialOutput> {
  return summarizeTestimonialFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeTestimonialPrompt',
  input: {schema: SummarizeTestimonialInputSchema},
  output: {schema: SummarizeTestimonialOutputSchema},
  prompt: `Resume el siguiente testimonio de forma concisa e informativa:\n\n{{{testimonial}}}`,
});

const summarizeTestimonialFlow = ai.defineFlow(
  {
    name: 'summarizeTestimonialFlow',
    inputSchema: SummarizeTestimonialInputSchema,
    outputSchema: SummarizeTestimonialOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
