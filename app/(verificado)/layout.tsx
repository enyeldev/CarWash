import { ModeToggle } from "@/components/mode-toggle";
import { AppSidebar } from "@/components/ui/AppSidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getSessionAction, userHasCompanyAction } from "@/src/actions/auth";
import { Bell } from "lucide-react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getSessionAction();

  if (!session.data?.user) {
    redirect("/login");
  }
  const userSesion = session.data.user

  const companies = await userHasCompanyAction({userId :userSesion.id})

  const companie =companies?.memberships[0].company

  return (
    <>
      <SidebarProvider>
        <AppSidebar user={userSesion}
           companies={companie}/>
        <SidebarInset>
          <header className="flex h-14 items-center justify-between gap-2 border-b border-border px-4">
            <SidebarTrigger className="-ml-1" />

            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="size-8 relative">
                <Bell className="size-4" />
                <span className="absolute -top-0.5 -right-0.5 flex size-3.5 items-center justify-center rounded-full bg-destructive text-[9px] font-medium text-background">
                  3
                </span>
              </Button>
              <Separator orientation="vertical" className="mr-4 h-4" />
              <ModeToggle />
              <Separator orientation="vertical" className="mx-1 h-4" />
              {userSesion?.name}
              <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs">
                <div className="flex size-5 items-center justify-center rounded-full bg-chart-1 text-[9px] font-bold text-background">
                  {userSesion?.name
                    .split(" ")
                    .map((n) => n.charAt(0))
                    .join("")
                    .toUpperCase()}
                </div>
                <span className="hidden sm:inline"></span>
              </Button>
            </div>
          </header>
          <div className="flex-1 overflow-auto">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
