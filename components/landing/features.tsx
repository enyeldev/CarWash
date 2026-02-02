import { Card } from "@/components/ui/card";
import {
  CalendarCheck,
  Users,
  BarChart3,
  CreditCard,
  Bell,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: CalendarCheck,
    title: "Gestión de reservas",
    description:
      "Sistema de citas automatizado que permite a tus clientes reservar online 24/7.",
  },
  {
    icon: Users,
    title: "Control de empleados",
    description:
      "Asigna turnos, monitorea rendimiento y gestiona tu equipo fácilmente.",
  },
  {
    icon: BarChart3,
    title: "Reportes inteligentes",
    description:
      "Analíticas en tiempo real para tomar decisiones basadas en datos.",
  },
  {
    icon: CreditCard,
    title: "Pagos integrados",
    description:
      "Acepta múltiples métodos de pago y gestiona la facturación sin esfuerzo.",
  },
  {
    icon: Bell,
    title: "Notificaciones automáticas",
    description:
      "Recordatorios por SMS y email para reducir las citas perdidas.",
  },
  {
    icon: Shield,
    title: "Seguridad garantizada",
    description:
      "Tus datos y los de tus clientes protegidos con encriptación de nivel bancario.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="bg-muted dark:bg-muted/50 py-20 lg:py-28"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-background dark:text-zinc-50 sm:text-4xl">
            Todo lo que necesitas para{" "}
            <span className="text-sky-500">hacer crecer tu negocio</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Herramientas poderosas y fáciles de usar diseñadas específicamente
            para carwashes.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group border-transparent bg-zinc-50 dark:bg-background p-6 shadow-sm transition-all hover:border-sky-200 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 dark:bg-muted text-sky-600 transition-colors group-hover:bg-sky-500 group-hover:text-white">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-background dark:text-zinc-50">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
