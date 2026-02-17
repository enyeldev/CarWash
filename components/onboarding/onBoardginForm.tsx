"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Droplets,
  Building2,
  FileText,
  Phone,
  Check,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../mode-toggle";
import Loading from "../loadings/Loading";
import { CreateCarWashFromType } from "@/src/types/onBoarding";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { createCarWashFromSchema } from "@/src/schema/onBoarding";
// import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { formatPhone } from "@/src/lib/formateoTelefono";
// import { crearCarWashAction } from "@/src/actions/onboarding";
import { toast } from "sonner";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";

const MotionFieldGroup = motion(FieldGroup);

export function OnboardingForm() {
  
  // const [registroCarWashDefault, setRegistroCarWashDefault] =
  //   useState<CreateCarWashFromType>({
  //     companyName: "",
  //     description: "",
  //     phone: "",
  //   });

  // const {
  //   handleSubmit,
  //   control,
  //   formState: { isSubmitting },
  //   getValues,
  // } = useForm<CreateCarWashFromType>({
  //   // defaultValues: registroCarWashDefault,
  //   resolver: zodResolver(createCarWashFromSchema),
  // });

  // const onSubmit = async (data: CreateCarWashFromType) => {
  //   // const response = await crearCarWashAction(data);

  //   const values = getValues();

  //   console.log(data);

  //   console.log(values);

  //   console.log("qowdnqoiwndqwoi");

  //   // console.log("Respuesta de crearCarWashAction:", response);

  //   // if (!response.ok) {
  //   //   toast.error("Error al crear el Car Wash. Intenta de nuevo.");
  //   //   console.error(response.error);
  //   //   return;
  //   // }

  //   // console.log(response);
  // };

  

  return (
    <div className="min-h-screen bg-background flex flex-col transition-colors duration-300">
      

      {/* Content */}
      <main className="flex-1 w-full container mx-auto px-4 py-8 md:py-12  flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            {/* Step 1: Business Name */}
            {step === 1 && (
              
            )}

            {step === 2 && (

            )}

            {/* Step 3: Phone */}
            {step === 3 && (
              <MotionFieldGroup
                key="phone"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-md mx-auto w-full"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Telefono de contacto
                  </h2>
                  <p className="text-muted-foreground">
                    Para que tus clientes puedan contactarte
                  </p>
                </div>

                <div className="bg-card rounded-2xl border border-border p-6">
                  <div className="space-y-2">
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <Field>
                          <FieldLabel
                            htmlFor="phone"
                            className="text-foreground"
                          >
                            Telefono de contacto
                          </FieldLabel>
                          <Input
                            {...field}
                            id="phone"
                            type="tel"
                            placeholder="Ej: 809-123-4567"
                            className="text-lg h-12"
                            value={formatPhone(registroCarWashDefault.phone)}
                            onChange={(e) => {
                              const onlyNumbers = e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 10);

                              setRegistroCarWashDefault({
                                ...registroCarWashDefault,
                                phone: onlyNumbers,
                              });
                            }}
                            inputMode="numeric"
                            autoFocus
                          />
                          <div className="flex justify-between">
                            <span
                              className={`text-sm text-zinc-950 dark:text-white ${registroCarWashDefault.companyName.trim().length >= 4 ? "text-green-500" : "text-white"}`}
                            >
                              Mínimo 4 caracteres
                            </span>

                            <span
                              className={`text-sm text-zinc-950 dark:text-white ${registroCarWashDefault.companyName.trim().length >= 4 ? "text-green-500" : "text-white"}`}
                            >
                              {registroCarWashDefault.companyName.trim()
                                .length >= 4
                                ? "✓"
                                : "✗"}
                            </span>
                          </div>
                        </Field>
                      )}
                    />
                  </div>
                </div>
              </MotionFieldGroup>
            )}

            <Button
              type="submit"
              className={"gap-2 " + cn(!canProceed() && "cursor-not-allowed")}
            >
              Finalizar PRuEBAAA
            </Button>

            {step > 0 && step < 4 && step !== 4 && (
              <footer className="border-t border-border bg-card">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    className="gap-2 cursor-pointer"
                  >
                    Atras
                  </Button>

                  <Button
                    type="submit"
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className={
                      "gap-2 " + cn(!canProceed() && "cursor-not-allowed")
                    }
                  >
                    {step === 3 ? "Finalizar" : "Siguiente"}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </footer>
            )}
          </form>

          {/* Step 4: Loading */}
          {step === 4 && <Loading />}

          {/* Step 5: Success */}
          {step === 5 && (
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
                    <p className="font-medium text-foreground">
                      {registroCarWashDefault.companyName}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Descripcion
                    </span>
                    <p className="font-medium text-foreground">
                      {registroCarWashDefault.description || "N/A"}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Telefono
                    </span>
                    <p className="font-medium text-foreground">
                      {formatPhone(registroCarWashDefault.phone)}
                    </p>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full cursor-pointer"
                onClick={() => setStep(0)}
              >
                Empieza a gestionar tu Car Wash
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* {step > 0 && step < 4 && step !== 4 && (
        <footer className="border-t border-border bg-card">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="gap-2 cursor-pointer"
            >
              Atras
            </Button>

            {step === 3 ? (
              <Button
                type="submit"
                className={"gap-2 " + cn(!canProceed() && "cursor-not-allowed")}
              >
                Finalizar PRuEBAAA
              </Button>
            ) : (
              <Button
                type="submit"
                onClick={handleNext}
                disabled={!canProceed()}
                className={"gap-2 " + cn(!canProceed() && "cursor-not-allowed")}
              >
                {step === 3 ? "Finalizar" : "Siguiente"}
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </footer>
      )} */}
    </div>
  );
}
