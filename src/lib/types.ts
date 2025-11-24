import type { DiagnosePlantDiseaseOutput } from "@/ai/flows/diagnose-plant-disease";
import type { GetPersonalizedFertilizerRecommendationsOutput } from "@/ai/flows/get-fertilizer-recommendations";

export type DiagnoseResult = {
  status: 'success';
  data: DiagnosePlantDiseaseOutput;
} | {
  status: 'error';
  message: string;
};

export type FertilizerRecsResult = {
  status: 'success';
  data: GetPersonalizedFertilizerRecommendationsOutput;
} | {
  status: 'error';
  message: string;
};
