'use client';

import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Leaf } from 'lucide-react';

function capitalize(str: string) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function AppHeader() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const title = segments.length > 0 ? capitalize(segments[segments.length - 1]) : 'Dashboard';

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <SidebarTrigger className="md:hidden" />
      
      <div className="flex items-center gap-2 md:hidden">
        <Leaf className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold font-headline text-primary">AgriVision</span>
      </div>

      <div className="flex-1">
        <h1 className="hidden text-xl font-semibold md:block">{title}</h1>
      </div>
    </header>
  );
}
