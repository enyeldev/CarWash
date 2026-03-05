"use client"

import { Card } from "@/components/ui/card"
import {
  Car,
  Loader2,
  Clock,
  CircleCheckBig,
  DollarSign,
  Timer,
  UserCheck,
} from "lucide-react"

const kpis = [
  {
    title: "Carros Atendidos Hoy",
    value: "24",
    icon: Car,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    title: "Carros en Proceso",
    value: "5",
    icon: Loader2,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  {
    title: "Carros en Espera",
    value: "3",
    icon: Clock,
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
  {
    title: "Carros Terminados",
    value: "16",
    icon: CircleCheckBig,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
]

const secondaryKpis = [
  {
    title: "Ingresos del Dia",
    value: "$1,248.50",
    description: "Basado en ordenes completadas",
    icon: DollarSign,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    title: "Tiempo Promedio por Lavado",
    value: "38 min",
    description: "Promedio de todos los servicios",
    icon: Timer,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    title: "Empleados Activos",
    value: "6 / 8",
    description: "6 activos, 2 libres",
    icon: UserCheck,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
]

export function DashboardKPIs() {
  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Primary row: vehicle status cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="p-5">
            <div className="flex items-center gap-3">
              <div className={`flex size-10 items-center justify-center rounded-lg ${kpi.bgColor}`}>
                <kpi.icon className={`size-5 ${kpi.color}`} />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">{kpi.title}</p>
                <p className="text-2xl font-semibold tracking-tight text-foreground">{kpi.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Secondary row: revenue, avg time, employees */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {secondaryKpis.map((kpi) => (
          <Card key={kpi.title} className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`flex size-8 items-center justify-center rounded-md ${kpi.bgColor}`}>
                  <kpi.icon className={`size-4 ${kpi.color}`} />
                </div>
                <span className="text-xs font-medium text-muted-foreground">{kpi.title}</span>
              </div>
            </div>
            <div className="text-2xl font-semibold tracking-tight text-foreground">{kpi.value}</div>
            <p className="mt-1 text-xs text-muted-foreground">{kpi.description}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
