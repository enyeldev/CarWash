"use client";
import { useOnboarding } from "@/src/stores/onboarding/onboarding-store";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

type FooterOnboardingProps = {
  isValid: boolean;
};

export const FooterOnboarding = ({ isValid }: FooterOnboardingProps) => {
  const { prevStep, isLastStep, isFirstStep } = useOnboarding();
  const router = useRouter();

  const handlePrevStep = () => {
    const prevUrl = prevStep();

    console.log(prevUrl);

    console.log(isLastStep());

    if (prevUrl) {
      router.push(prevUrl);
    } else {
      console.log("inicio del formulario");
    }
  };

  return (
    <footer className="fixed left-0 bottom-0 w-full border-t border-border bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={handlePrevStep}
          className="gap-2 cursor-pointer"
          disabled={isFirstStep()}
        >
          Atras
        </Button>

        <Button
          type="submit"
          //   onClick={handleNext}
          disabled={!isValid}
          className="cursor-pointer"
        >
          {isLastStep() ? "Finalizar" : "Siguiente"}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </footer>
  );
};
