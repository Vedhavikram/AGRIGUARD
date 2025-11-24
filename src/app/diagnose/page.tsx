import PlantDoctorForm from '@/components/features/PlantDoctorForm';

export default function DiagnosePage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold font-headline text-primary">
          Plant Doctor AI
        </h1>
        <p className="text-muted-foreground">
          Upload a photo of an affected plant to get an AI-powered diagnosis and
          treatment plan.
        </p>
      </header>
      <PlantDoctorForm />
    </div>
  );
}
