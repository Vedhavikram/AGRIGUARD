import type { DiagnosePlantDiseaseOutput } from '@/ai/flows/diagnose-plant-disease';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface DiagnosisResultProps {
  result: DiagnosePlantDiseaseOutput;
}

const getSeverityVariant = (severity: string): 'destructive' | 'secondary' | 'default' => {
  switch (severity.toLowerCase()) {
    case 'high':
      return 'destructive';
    case 'medium':
      return 'secondary';
    default:
      return 'default';
  }
};

const ecommercePlatforms = [
    { name: 'Amazon', url: 'https://www.amazon.in/s?k=' },
    { name: 'Flipkart', url: 'https://www.flipkart.com/search?q=' },
    { name: 'IndiaMart', url: 'https://dir.indiamart.com/search.mp?ss=' },
];

export function DiagnosisResult({ result }: DiagnosisResultProps) {
  const searchQuery = encodeURIComponent(result.fertilizerRecommendationsEn.split(',')[0].trim());

  return (
    <Card className="animate-in fade-in-50">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="font-headline text-2xl text-primary">
                {result.diseaseNameEn}
                </CardTitle>
                <CardDescription>{result.diseaseNameTa}</CardDescription>
            </div>
             <Badge variant={getSeverityVariant(result.severity)}>
                Severity: {result.severity}
            </Badge>
        </div>
        <div className="text-sm text-muted-foreground pt-2">
            Confidence: {(result.confidence * 100).toFixed(0)}%
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Cure Steps</h3>
          <Tabs defaultValue="en" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="ta">Tamil</TabsTrigger>
            </TabsList>
            <TabsContent value="en" className="prose prose-sm mt-2 p-4 border rounded-md bg-secondary/30">
              <p>{result.cureStepsEn}</p>
            </TabsContent>
            <TabsContent value="ta" className="prose prose-sm mt-2 p-4 border rounded-md bg-secondary/30">
              <p>{result.cureStepsTa}</p>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Fertilizer Recommendations</h3>
          <Tabs defaultValue="en" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="ta">Tamil</TabsTrigger>
            </TabsList>
            <TabsContent value="en" className="prose prose-sm mt-2 p-4 border rounded-md bg-secondary/30">
               <p>{result.fertilizerRecommendationsEn}</p>
            </TabsContent>
            <TabsContent value="ta" className="prose prose-sm mt-2 p-4 border rounded-md bg-secondary/30">
              <p>{result.fertilizerRecommendationsTa}</p>
            </TabsContent>
          </Tabs>
        </div>

        <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                Market Connect
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {ecommercePlatforms.map(platform => (
                     <Button asChild variant="outline" key={platform.name}>
                        <Link href={`${platform.url}${searchQuery}`} target="_blank" rel="noopener noreferrer">
                            Buy on {platform.name}
                        </Link>
                     </Button>
                ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
                Search for '{result.fertilizerRecommendationsEn.split(',')[0].trim()}' on e-commerce sites. Prices and availability may vary.
            </p>
        </div>

      </CardContent>
    </Card>
  );
}
