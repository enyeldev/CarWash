"use client";

import { useModal } from "@/src/hooks/useModal";
import { Check, Droplets, X, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import PricingCard from "../landing/pricing-card";
import { plans } from "@/src/const";

export function PricingModal() {
  const router = useRouter();

  const { isOpen, onClose } = useModal({ query: "modalPrice" });

  if (!isOpen) return null;

  const handleSelectPlan = (planName: string) => {
    // Aquí iría la lógica para procesar el plan seleccionado
    router.push(`/dashboard?plan=${planName.toLowerCase()}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop con blur */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        // onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto rounded-2xl bg-zinc-50 dark:bg-background border border-border shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-zinc-50 dark:bg-background/95 backdrop-blur-sm border-b border-border px-6 py-5">
          {/* <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button> */}

          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100">
              <Sparkles className="h-5 w-5 text-sky-600" />
            </div>
            <h2 className="text-2xl font-bold text-background dark:text-foreground">
              ¡Cuenta creada exitosamente!
            </h2>
          </div>
          <p className="text-muted-foreground">
            Elige el plan que mejor se adapte a tu negocio. Todos incluyen 14
            días de prueba gratis.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <PricingCard key={plan.planCode} plan={plan} redirectRoute="/dashboard" />
            ))}
          </div>

          {/* Footer note */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Sin tarjeta de crédito requerida. Cancela cuando quieras.
          </p>
        </div>
      </div>
    </div>
  );
}
