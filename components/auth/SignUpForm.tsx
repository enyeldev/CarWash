"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Controller, useForm } from "react-hook-form";
import { Eye, EyeOff, Lock, Mail, User, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { SignUpFormType } from "@/src/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema } from "@/src/schema/auth";
import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  signInWithSocialAction,
  signUpWithEmailAction,
} from "@/src/actions/auth";
import { toast } from "sonner";
import SocialButton from "./SocialButton";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfimrPassword] = useState(false);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit = async (data: SignUpFormType) => {
    const response = await signUpWithEmailAction(data);

    if (!response.ok) {
      if (response.error.code === "VALIDATION_ERROR") {
        response.error.issues.forEach((issue) => {
          toast.error(issue.message);
        });

        return;
      }

      toast.error(response.error.message);

      return;
    }

    toast.success("Revisa tu correo para validar tu cuenta.");
  };

  const signInWithGoogle = async () => {
    const response = await signInWithSocialAction({ provider: "google" });

    console.log(response);

    if (!response.data?.url) {
      toast.error(response.error?.message);
      return;
    }
    router.push(response.data.url);
  };

  return (
    <div className="w-full px-4 space-y-6">
      <SocialButton
        onClikcFunc={signInWithGoogle}
        text="Registrarse con Google"
      />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-zinc-50 dark:bg-zinc-950 px-3 text-muted-foreground">
            O registrate con email
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FieldGroup>
          <Controller
            name="fullName"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="text-black dark:text-zinc-50">
                  Nombre Completo
                </FieldLabel>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-black dark:text-zinc-50" />
                  <Input
                    {...field}
                    type="text"
                    placeholder="Eduardo Vallejos"
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

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="text-black dark:text-zinc-50 flex justify-between">
                  Contraseña
                </FieldLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-black dark:text-zinc-50" />
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="........"
                    className="h-12 pl-10 border-input text-zinc-950 dark:text-zinc-50"
                  />
                  <div
                    className=""
                    onClick={() => setShowPassword((prev) => !prev)}
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
                <FieldLabel className="text-black dark:text-zinc-50 flex justify-between">
                  Confirmar Contraseña
                </FieldLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-black dark:text-zinc-50" />
                  <Input
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="........"
                    className="h-12 pl-10 border-input text-zinc-950 dark:text-zinc-50"
                  />
                  <div
                    className=""
                    onClick={() => setShowConfimrPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? (
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
            className="h-12 text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin size-6" />
            ) : (
              "Crear cuenta"
            )}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
};

export default SignUpForm;
