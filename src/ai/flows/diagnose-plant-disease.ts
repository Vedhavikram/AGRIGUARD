'use server';

/**
 * @fileOverview A plant disease diagnosis AI agent.
 *
 * - diagnosePlantDisease - A function that handles the plant disease diagnosis process.
 * - DiagnosePlantDiseaseInput - The input type for the diagnosePlantDisease function.
 * - DiagnosePlantDiseaseOutput - The return type for the diagnosePlantDisease function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiagnosePlantDiseaseInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type DiagnosePlantDiseaseInput = z.infer<typeof DiagnosePlantDiseaseInputSchema>;

const DiagnosePlantDiseaseOutputSchema = z.object({
  diseaseNameEn: z.string().describe('The name of the disease in English.'),
  diseaseNameTa: z.string().describe('The name of the disease in Tamil.'),
  confidence: z.number().describe('The confidence score of the diagnosis.'),
  severity: z.string().describe('The severity level of the disease.'),
  cureStepsEn: z.string().describe('The cure steps in English.'),
  cureStepsTa: z.string().describe('The cure steps in Tamil.'),
  fertilizerRecommendationsEn: z
    .string()
    .describe('A comma-separated list of specific, commercially available fertilizer product names to treat the detected issue. For example: "Miracle-Gro Water Soluble All Purpose Plant Food, NPK 20-20-20".'),
  fertilizerRecommendationsTa: z
    .string()
    .describe('Fertilizer recommendations in Tamil, listing specific commercial products.'),
});
export type DiagnosePlantDiseaseOutput = z.infer<typeof DiagnosePlantDiseaseOutputSchema>;

export async function diagnosePlantDisease(
  input: DiagnosePlantDiseaseInput
): Promise<DiagnosePlantDiseaseOutput> {
  return diagnosePlantDiseaseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'diagnosePlantDiseasePrompt',
  input: {schema: DiagnosePlantDiseaseInputSchema},
  output: {schema: DiagnosePlantDiseaseOutputSchema},
  prompt: `You are an expert agronomist. Analyze the attached image of a plant. Detect any disease or deficiency. For fertilizer recommendations, provide specific, commercially available product names that can be purchased online. Return ONLY JSON: {disease_name_en, disease_name_ta, confidence, severity, cure_steps_en:, cure_steps_ta:, fertilizer_recommendations_en:, fertilizer_recommendations_ta:}.\n\n   Photo: {{media url=photoDataUri}}`,
});

const diagnosePlantDiseaseFlow = ai.defineFlow(
  {
    name: 'diagnosePlantDiseaseFlow',
    inputSchema: DiagnosePlantDiseaseInputSchema,
    outputSchema: DiagnosePlantDiseaseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
