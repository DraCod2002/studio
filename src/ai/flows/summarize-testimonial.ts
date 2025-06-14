// Summarize a testimonial
'use server';

/**
 * @fileOverview A testimonial summarization AI agent.
 *
 * - summarizeTestimonial - A function that handles the testimonial summarization process.
 * - SummarizeTestimonialInput - The input type for the summarizeTestimonial function.
 * - SummarizeTestimonialOutput - The return type for the summarizeTestimonial function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTestimonialInputSchema = z.object({
  testimonial: z
    .string()
    .describe('The testimonial to summarize.'),
});
export type SummarizeTestimonialInput = z.infer<typeof SummarizeTestimonialInputSchema>;

const SummarizeTestimonialOutputSchema = z.object({
  summary: z.string().describe('The summary of the testimonial.'),
});
export type SummarizeTestimonialOutput = z.infer<typeof SummarizeTestimonialOutputSchema>;

export async function summarizeTestimonial(input: SummarizeTestimonialInput): Promise<SummarizeTestimonialOutput> {
  return summarizeTestimonialFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeTestimonialPrompt',
  input: {schema: SummarizeTestimonialInputSchema},
  output: {schema: SummarizeTestimonialOutputSchema},
  prompt: `Summarize the following testimonial in a concise and informative way:\n\n{{{testimonial}}}`,
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
