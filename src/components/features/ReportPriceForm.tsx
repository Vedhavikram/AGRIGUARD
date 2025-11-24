"use client";

import { useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { handleReportPrice } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";


const initialState = {
    status: '',
    message: '',
    errors: {},
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full">
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                </>
            ) : (
                'Submit Report'
            )}
        </Button>
    );
}

export function ReportPriceForm() {
    const [state, formAction] = useActionState(handleReportPrice, initialState);
    const { toast } = useToast();

    useEffect(() => {
        if (state.status === 'success') {
            toast({
                title: "Report Submitted",
                description: state.message,
            });
        }
    }, [state, toast]);


    return (
        <Card className="max-w-lg mx-auto">
            <form action={formAction}>
                <CardHeader>
                    <CardTitle className="font-headline text-primary">New Price Report</CardTitle>
                    <CardDescription>All fields are required.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     {state.status === 'success' && (
                        <Alert variant="default" className="bg-green-100 dark:bg-green-900/50 border-green-300 dark:border-green-800 text-green-800 dark:text-green-200">
                            <CheckCircle className="h-4 w-4" />
                            <AlertTitle>Success!</AlertTitle>
                            <AlertDescription>{state.message}</AlertDescription>
                        </Alert>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="fertilizerName">Fertilizer Name</Label>
                        <Input id="fertilizerName" name="fertilizerName" placeholder="e.g., Urea" />
                        {state.errors?.fertilizerName && <p className="text-sm text-destructive">{state.errors.fertilizerName[0]}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="price">Price (per bag/unit)</Label>
                        <Input id="price" name="price" type="number" step="0.01" placeholder="e.g., 270.00" />
                        {state.errors?.price && <p className="text-sm text-destructive">{state.errors.price[0]}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Location (Town/District)</Label>
                        <Input id="location" name="location" placeholder="e.g., Madurai" />
                         {state.errors?.location && <p className="text-sm text-destructive">{state.errors.location[0]}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton />
                </CardFooter>
            </form>
        </Card>
    );
}
