import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Car, Clock, Sparkles, ChevronDown } from "lucide-react";

export function BentoGrid() {
  return (
    <section
      id="funciones"
      className="py-20 lg:py-28 dark:bg-background bg-zinc-50"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-background dark:text-foreground sm:text-4xl">
            Gestiona servicios con{" "}
            <span className="text-sky-500">inteligencia</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Simplifica la administración de tu carwash con herramientas
            intuitivas y automatizaciones inteligentes.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="row-span-2 flex flex-col justify-between overflow-hidden p-6 border-sky-100 bg-linear-to-b from-sky-50 to-white dark:border-sky-900/50 dark:from-sky-950/30 dark:to-card dark:shadow-2xl">
            <div>
              <Badge className="mb-4 shadow-none bg-sky-100 text-sky-700 hover:bg-sky-200/80 dark:bg-sky-500/15 dark:text-sky-400 dark:border-sky-500/30 dark:hover:bg-sky-500/25 border border-transparent">
                Popular
              </Badge>
              <h3 className="mb-2 text-xl font-semibold text-background dark:text-foreground">
                Servicios personalizados
              </h3>
              <p className="text-sm text-muted-foreground">
                Crea paquetes de lavado a medida según las necesidades de tu
                negocio.
              </p>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 rounded-lg bg-zinc-50 dark:bg-muted/50 p-3 shadow-sm">
                <Car className="h-5 w-5 text-sky-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-background dark:text-foreground">
                    Lavado Express
                  </p>
                  <p className="text-xs text-muted-foreground">
                    15 min - $8.99
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-zinc-50 dark:bg-muted/50 p-3 shadow-sm">
                <Sparkles className="h-5 w-5 text-sky-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-background dark:text-foreground">
                    Lavado Premium
                  </p>
                  <p className="text-xs text-muted-foreground">
                    45 min - $24.99
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-zinc-50 dark:bg-muted/50 p-3 shadow-sm">
                <Clock className="h-5 w-5 text-sky-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-background dark:text-foreground">
                    Detallado completo
                  </p>
                  <p className="text-xs text-muted-foreground">
                    2 hrs - $79.99
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden p-6">
            <h3 className="mb-2 text-lg font-semibold text-background dark:text-foreground">
              Seguimiento de clientes
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Historial completo de cada cliente y sus preferencias.
            </p>
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-sky-200" />
                <div>
                  <p className="text-sm font-medium text-background dark:text-foreground">
                    Carlos Rodríguez
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ID: #2425644288
                  </p>
                </div>
              </div>
              <div className="mt-3 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Visitas mensuales
                  </span>
                  <span className="font-medium  text-background dark:text-foreground">
                    4
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Servicio favorito
                  </span>
                  <span className="font-medium text-background dark:text-foreground">
                    Premium
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total gastado</span>
                  <span className="font-medium text-sky-600">$156.50</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden p-6">
            <h3 className="mb-2 text-lg font-semibold text-background dark:text-foreground">
              Automatizaciones
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Configura recordatorios y promociones automáticas.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-background dark:text-foreground">
                    Recordatorios SMS
                  </span>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm  text-background dark:text-foreground">
                    Emails promocionales
                  </span>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          <Card className="col-span-1 overflow-hidden p-6 md:col-span-2">
            <h3 className="mb-2 text-lg font-semibold text-background dark:text-foreground">
              Analíticas en tiempo real
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Visualiza el rendimiento de tu negocio con gráficos interactivos.
            </p>
            <div className="flex items-end gap-2">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map(
                (height, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm bg-sky-500 transition-all hover:bg-sky-600"
                    style={{ height: `${height}px` }}
                  />
                )
              )}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Ene - Dic 2025</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-background dark:text-foreground">
                  $52,400
                </span>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  +23%
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
