import ForgotPassword from "@/components/auth/ForgotPassword";
import { Droplets } from "lucide-react";
import Link from "next/link";

const ForgotPasswordPage = () => {
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
              Gestiona tu carwash de forma inteligente
            </h1>
            <p className="text-sky-100 text-lg leading-relaxed max-w-md">
              Optimiza tus operaciones, aumenta tus ventas y fideliza a tus
              clientes con nuestra plataforma todo-en-uno.
            </p>
            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold">500+</p>
                <p className="text-sky-200 text-sm">Carwash activos</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <p className="text-3xl font-bold">2M+</p>
                <p className="text-sky-200 text-sm">Lavados gestionados</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <p className="text-3xl font-bold">99.9%</p>
                <p className="text-sky-200 text-sm">Uptime</p>
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
              Olvidaste tu contraseña
            </h2>
            <p className="text-muted-foreground">
              Ingresa tu correo para recivir un enlace para cambiar tu
              contraseña.
            </p>
          </div>

          <ForgotPassword />

          <p className="text-center text-sm text-zinc-950 dark:text-zinc-50">
            ¿Recuerdas tu contraseña?{" "}
            <Link href="/login" className="font-medium text-primary ">
              Inicia sesion
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
