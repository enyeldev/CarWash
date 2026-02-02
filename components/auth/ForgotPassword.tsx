"use client";

import { Loader2, Mail } from "lucide-react";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { ForgotPasswordType } from "@/src/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/src/schema/auth";
import { Button } from "../ui/button";
import { forgotPasswordEmailAction } from "@/src/actions/auth";

const ForgotPassword = () => {
  const forgotPasswordDefaulValue: ForgotPasswordType = {
    email: "",
  };
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<ForgotPasswordType>({
    defaultValues: forgotPasswordDefaulValue,
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordType) => {
    const response = await forgotPasswordEmailAction(data);
    if (!response.ok) {
      if (response.error?.code === "VALIDATION_ERROR") {
        response.error.issues.forEach((issue) => {
          toast.error(issue.message);
        });
        return;
      }
      toast.error(response.error?.message);
      return;
    }
    console.log(response);

    toast.success(response.data?.message);
    // router.push("/dashboard");
  };

  return (
    <div className="w-full px-4 space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FieldGroup>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="text-black dark:text-zinc-50">
                  Correo electronico
                </FieldLabel>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-black dark:text-zinc-50" />
                  <Input
                    {...field}
                    type="email"
                    placeholder="tu@email.com"
                    className="h-12 pl-10 border-input text-zinc-950 dark:text-zinc-50"
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup>
          <Button
            type="submit"
            className=" h-12 text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin size-6" />
            ) : (
              "Enviar enlace"
            )}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
};

export default ForgotPassword;
