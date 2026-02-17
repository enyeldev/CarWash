"use client";

import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/src/stores/onboarding/onboarding-store";
import { motion } from "framer-motion";
import { ChevronRight, Droplets } from "lucide-react";
import { useRouter } from "next/navigation";

export const WelcomeStep = () => {
  const router = useRouter();
  const { nextStep } = useOnboarding();
  const handleNext = () => {
    const nextUrl = nextStep();

    if (nextUrl) {
      router.push(nextUrl);
    } else {
      console.log("final del formulario");
    }
  };

  return (
    <motion.div
      key="welcome"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-lg mx-auto text-center"
    >
      <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center">
        <Droplets className="w-12 h-12 text-primary" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
        Crea tu Car Wash
      </h1>
      <p className="text-lg text-muted-foreground mb-8 text-pretty">
        Configura tu negocio de lavado de autos en solo unos pasos. Completa la
        informacion basica para comenzar.
      </p>
      <Button onClick={handleNext} size="lg" className="gap-2">
        Comenzar
        <ChevronRight className="w-4 h-4" />
      </Button>
    </motion.div>
  );
};
