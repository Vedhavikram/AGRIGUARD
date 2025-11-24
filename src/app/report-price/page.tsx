import { ReportPriceForm } from "@/components/features/ReportPriceForm";

export default function ReportPricePage() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold font-headline text-primary">
                    Report Fertilizer Price
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                    Help other farmers by reporting the latest fertilizer prices in your area. Your contribution strengthens our community data.
                </p>
            </header>
            <ReportPriceForm />
        </div>
    );
}
