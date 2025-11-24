import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Store } from "lucide-react";
import Link from "next/link";

export default function LocalResourcesPage() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold font-headline text-primary">
                    Find Local Resources
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                    Locate fertilizer shops and agricultural suppliers near you with a single tap.
                </p>
            </header>
            <Card className="max-w-md mx-auto text-center">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                        <Store className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-2xl text-primary pt-4">
                        Nearby Fertilizer Shops
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Click the button below to open your map application and search for "fertilizer shop near me". This uses your device's GPS for accurate results.
                    </p>
                    <Button asChild size="lg" className="w-full">
                        <Link href="geo:0,0?q=fertilizer+shop+near+me">
                           <MapPin className="mr-2 h-5 w-5"/> Find Shops Near Me
                        </Link>
                    </Button>
                     <p className="text-xs text-muted-foreground pt-4">
                        Note: This feature works best on mobile devices with a map application (like Google Maps) installed.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
