"use client";

import { useOnboarding } from "@/src/stores/onboarding/onboarding-store";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

export const ClientLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { syncStepFromUrl } = useOnboarding();
  useEffect(() => {
    syncStepFromUrl(pathname);
  }, [pathname]);

  return <>{children}</>;
};
