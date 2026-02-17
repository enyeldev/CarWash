"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { nameCarWashFormSchema } from "@/src/schema/onBoarding";
import { useOnboarding } from "@/src/stores/onboarding/onboarding-store";
import { NameCarWashFormType } from "@/src/types/onBoarding";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { FooterOnboarding } from "../FooterOnboarding";
import { useMemo } from "react";

export const NombreStep = () => {
  const MotionFieldGroup = useMemo(() => motion(FieldGroup), []);

  const { nextStep, setData } = useOnboarding();
  const router = useRouter();
  const initialValues: NameCarWashFormType = {
    name: "",
  };

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(nameCarWashFormSchema),
  });

  const onSubmit = (data: NameCarWashFormType) => {
    setData({ name: data.name });
    const nextUrl = nextStep();

    console.log(nextUrl);

    if (nextUrl) {
      router.push(nextUrl);
    } else {
      console.log("final del formulario");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MotionFieldGroup
          key="name"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="max-w-md mx-auto w-full"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Nombre del negocio
            </h2>
            <p className="text-muted-foreground">Como se llama tu car wash?</p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="space-y-2">
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="text-foreground">
                      Nombre del Car Wash*
                    </FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Ej: AquaShine Car Wash"
                      className="text-lg h-12"
                      autoFocus
                    />
                    {/* <div className="">
                      <span
                        className={`text-xs text-zinc-950 dark:text-white ${field.value.trim().length >= 4 ? "text-green-500" : "text-white"}`}
                      ></span>
                    </div> */}
                    <FieldDescription>Mínimo 4 caracteres</FieldDescription>
                  </Field>
                )}
              />
            </div>
          </div>
        </MotionFieldGroup>
        <FooterOnboarding isValid={isValid} />
      </form>
    </>
  );
};
