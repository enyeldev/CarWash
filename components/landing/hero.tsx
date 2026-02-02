"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Users, Calendar, Star } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-zinc-50 dark:bg-background relative overflow-hidden py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-background dark:text-foreground sm:text-5xl lg:text-6xl">
              Gestiona tu carwash{" "}
              <span className="text-sky-500">de forma inteligente</span>
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground">
              Automatiza reservas, controla empleados y aumenta tus ingresos con
              nuestra plataforma todo-en-uno diseñada para negocios de lavado de
              autos.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Input
                type="email"
                placeholder="Ingresa tu email"
                className="h-12 max-w-xs bg-muted/50"
              />
              <Button
                size="lg"
                className="bg-sky-500 hover:bg-sky-600 text-white gap-2"
                asChild
              >
                <Link href="/register">
                  Comenzar gratis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-background dark:border-muted-foreground bg-muted"
                    style={{
                      backgroundImage: `url(/placeholder.svg?height=32&width=32&query=person ${i})`,
                      backgroundSize: "cover",
                    }}
                  />
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  +500 negocios confían en nosotros
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <Card className="overflow-hidden p-6 shadow-xlborder-sky-100 bg-linear-to-br from-sky-50 to-white  dark:border-sky-900 dark:from-slate-950 dark:to-sky-950/20">
              {/* <Card className="overflow-hidden border-sky-100 bg-linear-to-br from-sky-50 to-white p-6 shadow-xl"> */}
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-background dark:text-foreground">
                    Rendimiento del mes
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Estadísticas en tiempo real
                  </p>
                </div>
              </div>

              <div className="mb-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-muted-foreground">
                    Servicios completados
                  </span>
                  <span className="font-semibold text-muted-foreground">
                    85%
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-sky-100">
                  <div className="h-full w-[85%] rounded-full bg-sky-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-zinc-50 dark:bg-sky-500/10 p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="text-xs">Reservas hoy</span>
                  </div>
                  <p className="mt-1 text-2xl font-bold text-muted-foreground">
                    24
                  </p>
                </div>
                <div className="rounded-xl bg-zinc-50 dark:dark:bg-sky-500/10 p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span className="text-xs">Clientes nuevos</span>
                  </div>
                  <p className="mt-1 text-2xl font-bold text-muted-foreground">
                    12
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-lg bg-sky-500/10 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-6 w-6 rounded-full border-2 border-background dark:border-muted-foreground bg-muted"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    8 empleados activos
                  </span>
                </div>
                <span className="text-xs text-sky-600">En línea</span>
              </div>
            </Card>

            <div className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-3xl bg-sky-500/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
