import { FertilizerForm } from "@/components/features/FertilizerForm";

export default function RecommendationsPage() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold font-headline text-primary">
                    Personalized Fertilizer Recommendations
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                    Get a tailored fertilizer plan by providing details about your crop, diagnosed disease, and local conditions.
                </p>
            </header>
            <FertilizerForm />
        </div>
    );
}
