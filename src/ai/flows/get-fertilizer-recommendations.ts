'use server';
/**
 * @fileOverview This file defines the GetPersonalizedFertilizerRecommendations flow, which provides customized fertilizer recommendations based on crop type and local conditions.
 *
 * - getPersonalizedFertilizerRecommendations - A function that handles the process of generating personalized fertilizer recommendations.
 * - GetPersonalizedFertilizerRecommendationsInput - The input type for the getPersonalizedFertilizerRecommendations function.
 * - GetPersonalizedFertilizerRecommendationsOutput - The return type for the getPersonalizedFertilizerRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetPersonalizedFertilizerRecommendationsInputSchema = z.object({
  diseaseName: z.string().describe('The name of the identified plant disease.'),
  cropType: z.string().describe('The type of crop affected by the disease.'),
  localConditions: z
    .string()
    .describe('Description of the local environmental conditions.'),
  crowdsourcedPrice: z.number().optional().describe('The crowdsourced fertilizer price if available'),
  governmentPrice: z.number().optional().describe('The government fertilizer price if available'),
});
export type GetPersonalizedFertilizerRecommendationsInput = z.infer<
  typeof GetPersonalizedFertilizerRecommendationsInputSchema
>;

const GetPersonalizedFertilizerRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A detailed recommendation of fertilizer to use including dosage and usage method.'
    ),
});
export type GetPersonalizedFertilizerRecommendationsOutput = z.infer<
  typeof GetPersonalizedFertilizerRecommendationsOutputSchema
>;

export async function getPersonalizedFertilizerRecommendations(
  input: GetPersonalizedFertilizerRecommendationsInput
): Promise<GetPersonalizedFertilizerRecommendationsOutput> {
  return getPersonalizedFertilizerRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getPersonalizedFertilizerRecommendationsPrompt',
  input: {schema: GetPersonalizedFertilizerRecommendationsInputSchema},
  output: {schema: GetPersonalizedFertilizerRecommendationsOutputSchema},
  prompt: `You are an expert agricultural advisor. Given the following information about a plant disease, the crop type affected, and local conditions, provide a detailed fertilizer recommendation. Be sure to include information about dosage and method of application. You should also take price into account when formulating the recommendation.

Disease Name: {{{diseaseName}}}
Crop Type: {{{cropType}}}
Local Conditions: {{{localConditions}}}
Crowdsourced Price: {{{crowdsourcedPrice}}}
Government Price: {{{governmentPrice}}}

Fertilizer Recommendation:`,
});

const getPersonalizedFertilizerRecommendationsFlow = ai.defineFlow(
  {
    name: 'getPersonalizedFertilizerRecommendationsFlow',
    inputSchema: GetPersonalizedFertilizerRecommendationsInputSchema,
    outputSchema: GetPersonalizedFertilizerRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
