import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  ArrowDown,
  ArrowUp,
  CloudSun,
  Droplets,
  Thermometer,
  Wind,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const weather = {
  temperature: '28°C',
  humidity: '75%',
  precipitation: '10%',
  wind: '12 km/h',
  condition: 'Partly Cloudy',
};

const mandiPrices = [
  { vegetable: 'Tomato', price: '₹2,500', trend: 'up' },
  { vegetable: 'Onion', price: '₹1,800', trend: 'down' },
  { vegetable: 'Potato', price: '₹1,500', trend: 'up' },
  { vegetable: 'Brinjal', price: '₹2,200', trend: 'stable' },
  { vegetable: 'Carrot', price: '₹3,000', trend: 'up' },
];

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-dashboard');

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-headline text-primary">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome to AgriVision. Here's your farm's overview.
        </p>
      </header>

      {heroImage && (
        <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-4xl font-bold text-white font-headline">
              AgriVision
            </h2>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weather.temperature}</div>
            <p className="text-xs text-muted-foreground">
              {weather.condition}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Humidity</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weather.humidity}</div>
            <p className="text-xs text-muted-foreground">
              High humidity today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Precipitation</CardTitle>
            <CloudSun className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weather.precipitation}</div>
            <p className="text-xs text-muted-foreground">Low chance of rain</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wind Speed</CardTitle>
            <Wind className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weather.wind}</div>
            <p className="text-xs text-muted-foreground">Gentle breeze</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-primary">
            Mandi Prices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vegetable</TableHead>
                <TableHead>Price (per quintal)</TableHead>
                <TableHead className="text-right">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mandiPrices.map(item => (
                <TableRow key={item.vegetable}>
                  <TableCell className="font-medium">
                    {item.vegetable}
                  </TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={
                        item.trend === 'up'
                          ? 'destructive'
                          : item.trend === 'down'
                          ? 'default'
                          : 'secondary'
                      }
                      className="flex items-center gap-1 w-fit ml-auto"
                    >
                      {item.trend === 'up' && (
                        <ArrowUp className="h-3 w-3" />
                      )}
                      {item.trend === 'down' && (
                        <ArrowDown className="h-3 w-3" />
                      )}
                      <span>{item.trend}</span>
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
