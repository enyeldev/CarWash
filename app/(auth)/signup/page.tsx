import { PricingModal } from "@/components/auth/PricingModal";
import SignUpForm from "@/components/auth/SignUpForm";
import { signupSchema } from "@/src/schema/landing";
import { CheckCircle2, Droplets } from "lucide-react";
import Link from "next/link";

const SignUp = async () => {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/auth-image.webp')] opacity-10 bg-cover bg-center" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
              <Droplets className="h-8 w-8" />
            </div>
            <span className="text-2xl font-semibold">WashPro</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight text-balance">
              Comienza a tranformar tu negocio hoy
            </h1>
            <p className="text-sky-100 text-lg leading-relaxed max-w-md">
              Unete a cientos de carwash que ya optimizan sus operaciones con
              WashPro
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-sky-200" />
                <span className="text-sky-50">Prueba gratuita de 14 días</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-sky-200" />
                <span className="text-sky-50">
                  Sin tarjeta de crédito requerida
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-sky-200" />
                <span className="text-sky-50">
                  Soporte personalizado incluido
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-sky-200" />
                <span className="text-sky-50">Cancela cuando quieras</span>
              </div>
            </div>
          </div>

          <p className="text-sky-200 text-sm">
            © 2026 WashPro. Todos los derechos reservados.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-zinc-50 dark:bg-zinc-950">
        <div className="w-full max-w-md space-y-8">
          <div className="flex lg:hidden items-center justify-center gap-3 mb-8">
            <div className="p-2 bg-primary rounded-xl">
              <Droplets className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
              WashPro
            </span>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
              Crea tu cuenta
            </h2>
            <p className="text-muted-foreground">
              Completa tus datos para comenzar tu prueba gratuita
            </p>
          </div>

          <SignUpForm />

          <p className="text-center text-sm text-zinc-950 dark:text-zinc-50">
            Ya tienes una cuenta?{" "}
            <Link href={"/login"} className="font-medium text-primary ">
              Inicia sesion
            </Link>
          </p>
        </div>
      </div>

      <PricingModal />
    </div>
  );
};

export default SignUp;
