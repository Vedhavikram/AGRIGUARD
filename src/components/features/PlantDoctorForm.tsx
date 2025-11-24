'use client';

import { useState, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Image from 'next/image';
import { handleDiagnosePlant } from '@/lib/actions';
import type { DiagnoseResult } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { UploadCloud, Loader2, AlertCircle } from 'lucide-react';
import { DiagnosisResult } from '@/components/features/DiagnosisResult';

const initialState: DiagnoseResult | null = null;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        'Diagnose Plant'
      )}
    </Button>
  );
}

export default function PlantDoctorForm() {
  const [state, formAction] = useActionState(handleDiagnosePlant, initialState);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dataUriInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        if (dataUriInputRef.current) {
          dataUriInputRef.current.value = result;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        if (fileInputRef.current) {
            fileInputRef.current.files = e.dataTransfer.files;
            // Manually trigger change event
            const changeEvent = new Event('change', { bubbles: true });
            fileInputRef.current.dispatchEvent(changeEvent);
        }
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle className="font-headline text-primary">Upload Plant Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <Label 
                    htmlFor="plant-image"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-secondary transition-colors"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    {preview ? (
                        <div className="relative w-full h-full">
                            <Image src={preview} alt="Plant preview" fill className="object-contain rounded-lg" />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP</p>
                        </div>
                    )}
                </Label>
                <Input ref={fileInputRef} id="plant-image" type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
                <input ref={dataUriInputRef} name="photoDataUri" type="hidden" />
            </div>
            {fileName && <p className="text-sm text-muted-foreground">Selected file: {fileName}</p>}
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
      <div>
        {state?.status === 'success' && <DiagnosisResult result={state.data} />}
        {state?.status === 'error' && (
          <Alert variant="destructive">
             <AlertCircle className="h-4 w-4" />
            <AlertTitle>Diagnosis Failed</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}
        {!state && (
            <Card className="flex flex-col items-center justify-center h-full text-center bg-secondary/50 border-dashed">
                <CardContent className="p-6">
                    <Leaf className="w-16 h-16 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">Diagnosis Results</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Your plant's health analysis will appear here.</p>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}

// Dummy Leaf icon if not imported from lucide
const Leaf = (props: React.SVGProps<SVGSVGElement>) => (
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
);
