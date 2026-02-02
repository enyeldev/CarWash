import { PlanType } from "../types/landing";

export const plans: PlanType[] = [
  {
    name: "Básico",
    description: "Ideal para carwashes pequeños que inician.",
    price: "$29",
    period: "/mes",
    features: [
      "Hasta 100 reservas/mes",
      "3 empleados",
      "Recordatorios por email",
      "Reportes básicos",
      "Soporte por email",
    ],
    highlighted: false,
    planCode: "basico",
  },
  {
    name: "Profesional",
    description: "Para negocios en crecimiento que necesitan más.",
    price: "$79",
    period: "/mes",
    features: [
      "Reservas ilimitadas",
      "10 empleados",
      "SMS + Email",
      "Reportes avanzados",
      "Pagos integrados",
      "Soporte prioritario",
    ],
    highlighted: true,
    planCode: "profesional",
  },
  {
    name: "Enterprise",
    description: "Solución completa para cadenas de carwash.",
    price: "$199",
    period: "/mes",
    features: [
      "Todo en Profesional",
      "Empleados ilimitados",
      "Multi-sucursal",
      "API personalizada",
      "Manager dedicado",
      "SLA garantizado",
    ],
    highlighted: false,
    planCode: "enterprise",
  },
];
