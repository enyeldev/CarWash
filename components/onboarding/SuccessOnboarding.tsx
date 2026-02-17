"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { useOnboarding } from "@/src/stores/onboarding/onboarding-store";
import { formatPhone } from "@/src/lib/formateoTelefono";
import { useRouter } from "next/navigation";

export const SuccessOnboarding = () => {
  const { name, description, phone } = useOnboarding();

  const router = useRouter();
  return (
    <>
      <motion.div
        key="success"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto text-center w-full"
      >
        <motion.div
          className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-500/20 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <Check className="w-12 h-12 text-green-500" />
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Tu Car Wash esta listo
        </h2>
        <p className="text-muted-foreground mb-8">
          Has completado la configuracion inicial de tu negocio.
        </p>

        <div className="bg-card rounded-2xl border border-border p-6 mb-8 text-left">
          <h3 className="font-semibold text-foreground mb-4">Resumen</h3>
          <div className="space-y-4">
            <div>
              <span className="text-sm text-muted-foreground">
                Nombre del negocio
              </span>
              <p className="font-medium text-foreground">{name}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Descripcion</span>
              <p className="font-medium text-foreground">
                {description || "N/A"}
              </p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Telefono</span>
              <p className="font-medium text-foreground">
                {formatPhone(phone!)}
              </p>
            </div>
          </div>
        </div>

        <Button
          size="lg"
          className="w-full cursor-pointer"
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          Empieza a gestionar tu Car Wash
        </Button>
      </motion.div>
    </>
  );
};
