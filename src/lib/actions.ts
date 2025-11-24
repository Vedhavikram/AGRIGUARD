'use server';

import { z } from 'zod';
import { diagnosePlantDisease } from '@/ai/flows/diagnose-plant-disease';
import { getPersonalizedFertilizerRecommendations } from '@/ai/flows/get-fertilizer-recommendations';
import type { DiagnoseResult, FertilizerRecsResult } from './types';

const diagnoseSchema = z.object({
  photoDataUri: z.string().min(1, 'Image is required.'),
});

export async function handleDiagnosePlant(
  prevState: any,
  formData: FormData
): Promise<DiagnoseResult> {
  try {
    const validatedFields = diagnoseSchema.safeParse({
      photoDataUri: formData.get('photoDataUri'),
    });

    if (!validatedFields.success) {
      return { status: 'error', message: 'Invalid input.' };
    }

    const result = await diagnosePlantDisease(validatedFields.data);

    return { status: 'success', data: result };
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { status: 'error', message };
  }
}

const fertilizerSchema = z.object({
    diseaseName: z.string().min(1, 'Disease name is required.'),
    cropType: z.string().min(1, 'Crop type is required.'),
    localConditions: z.string().min(1, 'Local conditions are required.'),
});


export async function handleGetFertilizerRecs(
  prevState: any,
  formData: FormData
): Promise<FertilizerRecsResult> {
  try {
    const validatedFields = fertilizerSchema.safeParse({
      diseaseName: formData.get('diseaseName'),
      cropType: formData.get('cropType'),
      localConditions: formData.get('localConditions'),
    });

    if (!validatedFields.success) {
      return { status: 'error', message: 'Invalid input.' };
    }
    
    const result = await getPersonalizedFertilizerRecommendations(validatedFields.data);

    return { status: 'success', data: result };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { status: 'error', message };
  }
}

const reportPriceSchema = z.object({
    fertilizerName: z.string().min(1, "Fertilizer name is required"),
    price: z.coerce.number().min(0, "Price must be a positive number"),
    location: z.string().min(1, "Location is required"),
});

export async function handleReportPrice(prevState: any, formData: FormData) {
    const validatedFields = reportPriceSchema.safeParse({
        fertilizerName: formData.get('fertilizerName'),
        price: formData.get('price'),
        location: formData.get('location'),
    });

    if (!validatedFields.success) {
        return {
            status: 'error',
            message: "Invalid data. Please check your inputs.",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // In a real app, you would save this to a database.
    console.log("New price reported:", validatedFields.data);

    return {
        status: 'success',
        message: `Thank you for reporting the price of ${validatedFields.data.fertilizerName}!`,
    };
}
