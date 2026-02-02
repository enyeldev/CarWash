"use client";

import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Controller, useForm } from "react-hook-form";
import { LoginFormType } from "@/src/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { logInFormSchema } from "@/src/schema/auth";
import { Input } from "../ui/input";
import { Mail, Lock, EyeOff, Eye, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SocialButton from "./SocialButton";
import { Checkbox } from "../ui/checkbox";
import {
  signInWithEmailAction,
  signInWithSocialAction,
} from "@/src/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LogInForm = () => {
  const [showPassword, setShowPasswords] = useState(false);
  const router = useRouter();

  const logIngDefaulValue: LoginFormType = {
    email: "",
    password: "",
    rememberMe: false,
  };
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<LoginFormType>({
    defaultValues: logIngDefaulValue,
    resolver: zodResolver(logInFormSchema),
  });

  const onSubmit = async (data: LoginFormType) => {
    const response = await signInWithEmailAction(data);

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

    console.log(response);

    router.push("/dashboard");
  };

  const logInWithGoogle = async () => {
    const response = await signInWithSocialAction({ provider: "google" });

    if (!response.data?.url) {
      toast.error("Algo salio mal");
      return;
    }
    router.push(response.data.url);
  };

  return (
    <div className="w-full px-4 space-y-6">
      <SocialButton onClikcFunc={logInWithGoogle} text="Continuar con Google" />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-zinc-50 dark:bg-zinc-950 px-3 text-muted-foreground">
            O continúa con email
          </span>
        </div>
      </div>
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

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="text-black dark:text-zinc-50 flex justify-between">
                  Contraseña{" "}
                  <Link href={"/forgot-password"} className="text-primary">
                    ¿Olvidaste tu contraseña?
                  </Link>
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
            name="rememberMe"
            control={control}
            render={({ field, fieldState }) => (
              <Field orientation="horizontal">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="terms-checkbox-basic"
                  name="terms-checkbox-basic"
                />
                <FieldLabel
                  htmlFor="terms-checkbox-basic"
                  className="text-background dark:text-zinc-50"
                >
                  Recuerdame
                </FieldLabel>
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
              "Inciar sesion"
            )}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
};

export default LogInForm;
