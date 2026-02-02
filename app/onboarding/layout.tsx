import { ModeToggle } from "@/components/mode-toggle";
import { getSessionAction } from "@/src/actions/auth";
import { Droplets } from "lucide-react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await getSessionAction();

  if (!session.data?.user) {
    redirect("/login");
  }

  console.log(session.data?.user);

  return (
    <>
      <div className="w-screen min-h-screen bg-linear-to-br from-slate-50 to-sky-50">
        <header className="border-b border-border bg-white/80 backdrop-blur-sm">
          <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500">
                <Droplets className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">WashPro</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Plan:</span>
              <span className="rounded-full bg-sky-100 px-3 py-1 font-medium capitalize text-sky-700">
                15 dias gratis
              </span>
            </div>

            <ModeToggle />
          </div>
        </header>

        <main className="">{children}</main>
      </div>
    </>
  );
};

export default layout;
