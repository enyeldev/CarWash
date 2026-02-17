"use client";

import { useOnboarding } from "@/src/stores/onboarding/onboarding-store";
import { ModeToggle } from "../mode-toggle";

export const StepPage = () => {
  const { currentStepIndex } = useOnboarding();
  return (
    <div className="flex items-center gap-4">
      {currentStepIndex < 4 && (
        <span className="hidden sm:block text-sm text-muted-foreground">
          Paso {currentStepIndex + 1} de 4
        </span>
      )}
      <ModeToggle />
    </div>
  );
};
