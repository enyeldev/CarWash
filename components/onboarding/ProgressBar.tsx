"use client";

import { useOnboarding } from "@/src/stores/onboarding/onboarding-store";
import { motion } from "framer-motion";

export const ProgressBar = () => {
  const { currentStepIndex } = useOnboarding();

  const progress = ((currentStepIndex + 1) / 4) * 100;

  return (
    <>
      <div className="h-1 bg-muted">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </>
  );
};
