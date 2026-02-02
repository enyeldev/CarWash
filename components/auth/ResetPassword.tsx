"use client";
import { resetPasswordSchema } from "@/src/schema/auth";
import { ResetPasswordType } from "@/src/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { resetPasswordAction } from "@/src/actions/auth";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ResetPasswordProps = {
  token: string;
};

const ResetPassword = ({ token }: ResetPasswordProps) => {
  const router = useRouter();
  const [showPassword, setShowPasswords] = useState(false);
  const [showPasswordValidation, setShowPasswordsValidation] = useState(false);

  const resetPasswordDefaulValue: ResetPasswordType = {
    passwaord_validation: "",
    password: "",
    token: token,
  };
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<ResetPasswordType>({
    defaultValues: resetPasswordDefaulValue,
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordType) => {
    const response = await resetPasswordAction(data);
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

    toast.success("Contraseña actualizada.");
    router.push("/login");
  };
  return (
    <div className="w-full px-4 space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FieldGroup>
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="text-black dark:text-zinc-50">
                  Nueva contraseña
                </FieldLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-black dark:text-zinc-50" />
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="......."
                    className="h-12 pl-10 border-input text-zinc-950 dark:text-zinc-50"
                  />
                  <div
                    className=""
                    onClick={() => setShowPasswords((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5 absolute right-3 top-1/2 -translate-1/2 text-zinc-950 dark:text-zinc-50 cursor-pointer" />
                    ) : (
                      <Eye className="size-5 absolute right-3 top-1/2 -translate-1/2 text-zinc-950 dark:text-zinc-50 cursor-pointer" />
                    )}
                  </div>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="passwaord_validation"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="text-black dark:text-zinc-50">
                  Confimar contraseña
                </FieldLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-black dark:text-zinc-50" />
                  <Input
                    {...field}
                    type={showPasswordValidation ? "text" : "password"}
                    placeholder="......."
                    className="h-12 pl-10 border-input text-zinc-950 dark:text-zinc-50"
                  />
                  <div
                    className=""
                    onClick={() => setShowPasswordsValidation((prev) => !prev)}
                  >
                    {showPasswordValidation ? (
                      <EyeOff className="size-5 absolute right-3 top-1/2 -translate-1/2 text-zinc-950 dark:text-zinc-50 cursor-pointer" />
                    ) : (
                      <Eye className="size-5 absolute right-3 top-1/2 -translate-1/2 text-zinc-950 dark:text-zinc-50 cursor-pointer" />
                    )}
                  </div>
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
            className=" h-12 text-base cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin size-6" />
            ) : (
              "Cambiar contraseña"
            )}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
};

export default ResetPassword;
