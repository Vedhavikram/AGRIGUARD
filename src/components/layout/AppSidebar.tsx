'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Stethoscope,
  Leaf,
  MapPin,
  PenSquare,
  HelpingHand,
} from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';

const menuItems = [
  {
    href: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/diagnose',
    label: 'Plant Doctor',
    icon: Stethoscope,
  },
  {
    href: '/recommendations',
    label: 'Fertilizer Info',
    icon: Leaf,
  },
  {
    href: '/local-resources',
    label: 'Local Shops',
    icon: MapPin,
  },
  {
    href: '/report-price',
    label: 'Report Price',
    icon: PenSquare,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <Leaf className="w-8 h-8 text-primary" />
          {state === 'expanded' && (
            <span className="text-2xl font-bold font-headline text-primary">
              AgriVision
            </span>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map(item => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                as={Link}
                href={item.href}
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton as={Link} href="#" tooltip="Help & Support">
                <HelpingHand/>
                <span>Help & Support</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
