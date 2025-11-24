"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { handleGetFertilizerRecs } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, AlertCircle, Sparkles, Wand2 } from "lucide-react";
import type { FertilizerRecsResult } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const initialState: FertilizerRecsResult | null = null;

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full">
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                </>
            ) : (
                <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get Recommendation
                </>
            )}
        </Button>
    );
}

export function FertilizerForm() {
    const [state, formAction] = useActionState(handleGetFertilizerRecs, initialState);

    return (
        <div className="grid md:grid-cols-2 gap-8 items-start">
            <Card>
                <form action={formAction}>
                    <CardHeader>
                        <CardTitle className="font-headline text-primary">Crop Details</CardTitle>
                        <CardDescription>Fill in the details below for a custom recommendation.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="diseaseName">Disease Name</Label>
                            <Input id="diseaseName" name="diseaseName" placeholder="e.g., Leaf Blight" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cropType">Crop Type</Label>
                            <Input id="cropType" name="cropType" placeholder="e.g., Rice" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="localConditions">Local Conditions</Label>
                            <Textarea id="localConditions" name="localConditions" placeholder="e.g., High humidity, clay soil, post-monsoon season" required />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <SubmitButton />
                    </CardFooter>
                </form>
            </Card>

            <div>
                {state?.status === 'success' && (
                    <Card className="animate-in fade-in-50">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl text-primary flex items-center gap-2">
                                <Wand2 />
                                Your Recommendation
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm">
                            <p>{state.data.recommendations}</p>
                        </CardContent>
                    </Card>
                )}
                {state?.status === 'error' && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Generation Failed</AlertTitle>
                        <AlertDescription>{state.message}</AlertDescription>
                    </Alert>
                )}
                 {!state && (
                    <Card className="flex flex-col items-center justify-center h-full text-center bg-secondary/50 border-dashed">
                        <CardContent className="p-6">
                            <LeafIcon className="w-16 h-16 mx-auto text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-semibold">AI-Powered Advice</h3>
                            <p className="mt-1 text-sm text-muted-foreground">Your custom fertilizer plan will be generated here.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}


function LeafIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 4 13V8a5 5 0 0 1 10 0v5a7 7 0 0 1-7 7m0 0c-3.33-2-5-5.33-5-9V8a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v5c0 3.67-1.67 7-5 9m-4-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  )
}
