"use client";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { DescriptionCarWashFormType } from "@/src/types/onBoarding";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { FooterOnboarding } from "../FooterOnboarding";
import { useMemo } from "react";
import { useOnboarding } from "@/src/stores/onboarding/onboarding-store";
import { useRouter } from "next/navigation";

export const DescriptionStep = () => {
  const MotionFieldGroup = useMemo(() => motion(FieldGroup), []);

  const initialValue: DescriptionCarWashFormType = { description: "" };

  const { control, handleSubmit } = useForm({ defaultValues: initialValue });

  const router = useRouter();

  const { setData, nextStep } = useOnboarding();

  const onSubmit = (data: DescriptionCarWashFormType) => {
    setData({ description: data.description });
    const nextUrl = nextStep();

    if (nextUrl) {
      router.push(nextUrl);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MotionFieldGroup
        key="description"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-md mx-auto w-full"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Descripcion
          </h2>
          <p className="text-muted-foreground">
            Describe brevemente tu negocio
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="space-y-2">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="description" className="text-foreground">
                    Descripcion del negocio (Opcional)
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="description"
                    placeholder="Ej: Ofrecemos servicios de lavado de autos de alta calidad con productos ecológicos."
                    className="h-24 resize-none"
                  />
                </Field>
              )}
            />
          </div>
        </div>
      </MotionFieldGroup>
      <FooterOnboarding isValid={true} />
    </form>
  );
};
