"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  ShoppingCart,
  Receipt,
  BarChart3,
  Users,
  Package,
  Tag,
  Settings,
  HelpCircle,
  ChevronsUpDown,
  Droplets,
  PlusCircle,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { SubscriptionStatus, UserPlan } from "@/src/generated/prisma/enums";

const mainNav = [
  {
    title: "Crear venta",
    href: "/pos",
    icon: PlusCircle,
    highlight: true,
  },
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Punto de Venta", href: "/pos", icon: ShoppingCart },
  { title: "Ordenes", href: "/orders", icon: ClipboardList },
  { title: "Inventario", href: "/inventario", icon: Package },
  { title: "Servicios", href: "/services", icon: Receipt },
  { title: "Reportes", href: "/reports", icon: BarChart3 },
];

const managementNav = [
  { title: "Clientes", href: "/gestionvehiculo", icon: Users },
  { title: "Gastos", href: "/expenses", icon: Tag },
  { title: "Empleados", href: "/employees", icon: Users },
];

type Users = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
};

type Companies = {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    phone: string;
    description: string | null;
    plan: UserPlan;
    trialEndsAt: Date | null;
    subscriptionStatus: SubscriptionStatus;
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
    deletedAt: Date | null;
}

type AppSidebarProps = {
  user: Users;
  companies?: Companies;
};

export function AppSidebar({ user, companies }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-3 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-foreground text-background">
            <Droplets className="size-4" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold tracking-tight">
              AutoSpa Pro
            </span>
          </div>
        </Link>
        <div className="mt-2 flex items-center gap-2 rounded-md border border-border px-2 py-1.5 group-data-[collapsible=icon]:hidden">
          <div className="flex size-6 items-center justify-center rounded-full bg-chart-1/10">
            <div className="size-2 rounded-full bg-chart-1" />
          </div>
          <div className="flex flex-1 flex-col">
            <span className="text-xs font-medium">{companies?.name}</span>
            <span className="text-[10px] text-muted-foreground">Sucursal</span>
          </div>
          <ChevronsUpDown className="size-3.5 text-muted-foreground" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href)
                    }
                    tooltip={item.title}
                    className={
                      item.highlight
                        ? "bg-foreground text-background hover:bg-foreground/90 hover:text-background"
                        : undefined
                    }
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>{"Gestion"}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-3 pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Configuracion">
              <Link href="/settings">
                <Settings className="size-4" />
                <span>{"Configuracion"}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Ayuda">
              <Link href="/help">
                <HelpCircle className="size-4" />
                <span>Soporte y Ayuda</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator className="mx-0" />
        <div className="flex items-center gap-2 px-1 py-1 group-data-[collapsible=icon]:justify-center">
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-xs font-medium">{user.email}</span>
            <span className="text-[11px] text-muted-foreground">{companies?.plan}</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
