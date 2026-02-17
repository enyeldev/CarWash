import { CreateCarWashFromType } from "@/src/types/onBoarding";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const ONBOARDING_STEPS = [
  "/onboarding",
  "/onboarding/nombre",
  "/onboarding/description",
  "/onboarding/telefono",
] as const;

type OnboardingActions = {
  setData: (data: Partial<CreateCarWashFromType>) => void;
  nextStep: () => string | null;
  prevStep: () => string | null;
  getCurrentStepUrl: () => string;
  isFirstStep: () => boolean;
  isLastStep: () => boolean;
  syncStepFromUrl: (pathname: string) => void;
};

type OnboardingStore = Partial<CreateCarWashFromType> &
  OnboardingActions & {
    currentStepIndex: number;
    steps: typeof ONBOARDING_STEPS;
  };

export const useOnboarding = create<OnboardingStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Data del formulario
        name: "",
        phone: "",
        description: "",

        // Navegación
        currentStepIndex: 0,
        steps: ONBOARDING_STEPS,

        setData: (data) => set(data),

        nextStep: () => {
          const { currentStepIndex, steps } = get();
          if (currentStepIndex < steps.length - 1) {
            const nextIndex = currentStepIndex + 1;
            set({ currentStepIndex: nextIndex });
            return steps[nextIndex];
          }
          return null; // Ya está en el último paso
        },

        prevStep: () => {
          const { currentStepIndex, steps } = get();
          if (currentStepIndex > 0) {
            const prevIndex = currentStepIndex - 1;
            set({ currentStepIndex: prevIndex });
            return steps[prevIndex];
          }
          return null; // Ya está en el primer paso
        },

        getCurrentStepUrl: () => {
          const { currentStepIndex, steps } = get();
          return steps[currentStepIndex];
        },

        isFirstStep: () => get().currentStepIndex === 0,

        isLastStep: () => {
          const { currentStepIndex, steps } = get();
          return currentStepIndex === steps.length - 1;
        },
        syncStepFromUrl: (pathname) => {
          const { steps } = get();
          const stepIndex = steps.findIndex((step) => step === pathname);

          if (stepIndex !== -1 && stepIndex !== get().currentStepIndex) {
            set({ currentStepIndex: stepIndex });
          }
        },
      }),
      {
        name: "onboarding-storage",
        partialize: (state) => ({
          name: state.name,
          phone: state.phone,
          description: state.description,
        }),
      },
    ),
  ),
);
