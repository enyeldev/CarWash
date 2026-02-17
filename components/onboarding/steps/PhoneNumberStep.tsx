"use client";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { FooterOnboarding } from "../FooterOnboarding";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneCarWashFormSchema } from "@/src/schema/onBoarding";
import { PhoneCarWashFormType } from "@/src/types/onBoarding";
import { formatPhone } from "@/src/lib/formateoTelefono";
import { useOnboarding } from "@/src/stores/onboarding/onboarding-store";
import { crearCarWashAction } from "@/src/actions/onboarding";
import { Loading } from "../Loading";
import { SuccessOnboarding } from "../SuccessOnboarding";

export const PhoneNumberStep = () => {
  const MotionFieldGroup = useMemo(() => motion(FieldGroup), []);

  const initalValues: PhoneCarWashFormType = {
    phone: "",
  };

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting, isSubmitted },
  } = useForm({
    defaultValues: initalValues,
    resolver: zodResolver(phoneCarWashFormSchema),
    mode: "onChange",
  });

  const { setData, name, description, phone } = useOnboarding();

  const onSubmit = async (data: PhoneCarWashFormType) => {
    setData({ phone: data.phone });

    const dataCarWash = {
      name,
      description,
      phone,
    };

    const resposne = await crearCarWashAction(dataCarWash);
  };

  return (
    <>
      {isSubmitting ? (
        <Loading />
      ) : isSubmitted ? (
        <SuccessOnboarding />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="phone" className="text-foreground">
                        Telefono de contacto
                      </FieldLabel>
                      <Input
                        {...field}
                        id="phone"
                        type="tel"
                        placeholder="Ej: 809-123-4567"
                        className="text-lg h-12"
                        value={formatPhone(field.value)}
                        onChange={(e) => {
                          const onlyNumbers = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 10);
                          field.onChange(onlyNumbers);
                        }}
                        inputMode="numeric"
                        autoFocus
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </div>
          </MotionFieldGroup>
          <FooterOnboarding isValid={isValid} />
        </form>
      )}
    </>
  );
};
