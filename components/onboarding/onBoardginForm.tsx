"use client";

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Phone,
  Sparkles,
} from "lucide-react";
import { Card } from "../ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Controller, useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { CreateCarWashFromType } from "@/src/types/onBoarding";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCarWashFromSchema } from "@/src/schema/onBoarding";

const OnBoardginForm = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

  const [currentStep, setCurrentStep] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<CreateCarWashFromType>({
    resolver: zodResolver(createCarWashFromSchema),
  });

  const steps = [{ id: 1, name: "Información básica", icon: Building2 }];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async () => {
    // setIsLoading(true);
    // // Simular creación del tenant/carwash
    // await new Promise((resolve) => setTimeout(resolve, 1500));
    // // Generar un tenantId único (en producción vendría del backend)
    // const tenantId = `cw_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    // // Redirigir al dashboard con el tenantId
    // router.push(`/dashboard/${tenantId}`);
  };

  //   const isStep1Valid =
  //     formData.businessName && formData.businessType && formData.phone;
  //   const isStep2Valid = formData.address && formData.city && formData.state;
  //   const isStep3Valid = formData.schedule.some((s) => s.isOpen);

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-center gap-4">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;

            return (
              <div key={step.id} className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all ${
                      isCompleted
                        ? "border-sky-500 bg-sky-500 text-white"
                        : isCurrent
                          ? "border-sky-500 bg-sky-50 text-sky-600"
                          : "border-slate-200 bg-white text-slate-400"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : (
                      <StepIcon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      isCurrent ? "text-sky-600" : "text-muted-foreground"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 w-16 ${
                      currentStep > step.id ? "bg-sky-500" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <Card className="border-border bg-white p-8 shadow-lg">
        {/* Step 1: Información básica */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100">
                  <Sparkles className="h-5 w-5 text-sky-600" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Crea tu primer CarWash
                </h2>
              </div>
              <p className="text-muted-foreground">
                Empecemos con la información básica de tu negocio. Podrás
                agregar más sucursales después.
              </p>
            </div>

            <form className="grid gap-6 md:grid-cols-2">
              <FieldGroup>
                <Controller
                  name="companyName"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel className="text-black dark:text-zinc-50">
                        Nombre del negocio *
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          {...field}
                          type="text"
                          placeholder="Ej: CarWash Express Centro"
                          className="h-12 pl-10 border-input text-zinc-950 dark:text-zinc-50"
                        />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="phone"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel className="text-black dark:text-zinc-50">
                        Teléfono de contacto *
                      </FieldLabel>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          {...field}
                          type="tel"
                          placeholder="+52 55 1234 5678"
                          className="h-12 pl-10 border-input text-zinc-950 dark:text-zinc-50"
                        />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="description"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel className="text-black dark:text-zinc-50">
                        Descripción (opcional)
                      </FieldLabel>
                      <div className="relative">
                        <Textarea
                          {...field}
                          placeholder="Describe brevemente tu negocio..."
                          rows={3}
                          
                        />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* <div>
                  <Label htmlFor="businessType">Tipo de negocio *</Label>
                  <Selection
                    value={formData.businessType}
                    onValueChange={(value) => updateFormData("businessType", value)}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Selecciona el tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Selection>
                </div> */}
            </form>
          </div>
        )}

        {/* Step 2: Ubicación
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Ubicación del CarWash
              </h2>
              <p className="text-muted-foreground">
                Ingresa la dirección donde está ubicado tu negocio.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label htmlFor="address">Dirección *</Label>
                <div className="relative mt-1.5">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="address"
                    placeholder="Calle, número, colonia"
                    value={formData.address}
                    onChange={(e) => updateFormData("address", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="city">Ciudad *</Label>
                <Input
                  id="city"
                  placeholder="Ciudad"
                  value={formData.city}
                  onChange={(e) => updateFormData("city", e.target.value)}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="state">Estado *</Label>
                <Input
                  id="state"
                  placeholder="Estado"
                  value={formData.state}
                  onChange={(e) => updateFormData("state", e.target.value)}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="zipCode">Código Postal</Label>
                <Input
                  id="zipCode"
                  placeholder="00000"
                  value={formData.zipCode}
                  onChange={(e) => updateFormData("zipCode", e.target.value)}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="country">País</Label>
                <Select
                  value={formData.country}
                  onValueChange={(value) => updateFormData("country", value)}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="México">México</SelectItem>
                    <SelectItem value="Estados Unidos">
                      Estados Unidos
                    </SelectItem>
                    <SelectItem value="Colombia">Colombia</SelectItem>
                    <SelectItem value="Argentina">Argentina</SelectItem>
                    <SelectItem value="España">España</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )} */}

        {/* Navigation Buttons */}
        {/* <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="gap-2 bg-transparent"
          >
            Atrás
          </Button>

          {currentStep < 3 ? (
            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !isStep1Valid) ||
                (currentStep === 2 && !isStep2Valid)
              }
              className="gap-2 bg-sky-500 hover:bg-sky-600"
            >
              Continuar
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isStep3Valid || isLoading}
              className="gap-2 bg-sky-500 hover:bg-sky-600"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Creando...
                </>
              ) : (
                <>
                  Crear CarWash
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div> */}
      </Card>
    </>
  );
};

export default OnBoardginForm;
