import { ProgressBar } from "@/components/onboarding/ProgressBar";
import { StepPage } from "@/components/onboarding/StepPage";
import { getSessionAction } from "@/src/actions/auth";
import { AnimatePresence, motion } from "framer-motion";
import { Droplets } from "lucide-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { ClientLayout } from "./client-layout";

export const metadata: Metadata = {
  title: "AquaShine - Premium Car Wash",
  description: "Premium car wash services that make your vehicle shine",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await getSessionAction();

  if (!session.data?.user) {
    redirect("/login");
  }

  return (
    <>
      <div className="min-h-screen bg-background flex flex-col transition-colors duration-300">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Droplets className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-xl text-foreground">
                CarWash Pro
              </span>
            </div>
            {/* Step Page */}
            <StepPage />
          </div>
        </header>

        {/* Progress Bar */}
        <ProgressBar />

        {/* Content */}
        <main className="flex-1 w-full container mx-auto px-4 py-8 md:py-12  flex flex-col justify-center">
          <ClientLayout>
            <AnimatePresence mode="wait">{children}</AnimatePresence>
          </ClientLayout>
        </main>
      </div>
    </>
  );
};

export default layout;
