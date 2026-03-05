"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Download,
  Printer,
  FileText,
  DollarSign,
  TrendingUp,
  Clock,
  Car,
} from "lucide-react"

const COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
]

const revenueData = [
  { day: "Lun", revenue: 245 },
  { day: "Mar", revenue: 320 },
  { day: "Mie", revenue: 180 },
  { day: "Jue", revenue: 410 },
  { day: "Vie", revenue: 380 },
  { day: "Sab", revenue: 520 },
  { day: "Dom", revenue: 290 },
]

const serviceRevenue = [
  { name: "Lavado Premium", value: 680 },
  { name: "Lavado Basico", value: 420 },
  { name: "Detallado Interior", value: 320 },
  { name: "Aspirado Tapiceria", value: 180 },
  { name: "Lavado Express", value: 120 },
]

const paymentBreakdown = [
  { name: "Efectivo", value: 55, fill: "var(--color-chart-1)" },
  { name: "Tarjeta", value: 30, fill: "var(--color-chart-2)" },
  { name: "Transferencia", value: 15, fill: "var(--color-chart-3)" },
]

const carsPerDay = [
  { day: "Lun", cars: 12 },
  { day: "Mar", cars: 18 },
  { day: "Mie", cars: 9 },
  { day: "Jue", cars: 22 },
  { day: "Vie", cars: 16 },
  { day: "Sab", cars: 28 },
  { day: "Dom", cars: 14 },
]

const reportKPIs = [
  { title: "Ingresos Totales", value: "$2,345.00", icon: DollarSign, change: "+12.3%" },
  { title: "Ticket Promedio", value: "$18.50", icon: TrendingUp, change: "+5.2%" },
  { title: "Carros Atendidos", value: "119", icon: Car, change: "+8.1%" },
  { title: "Tiempo Promedio Espera", value: "14 min", icon: Clock, change: "-3.4%" },
]

export default function ReportsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Reportes</h1>
          <p className="text-sm text-muted-foreground">
            {"Analiticas y metricas de rendimiento"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-2">
            <Download className="size-3.5" />
            CSV
          </Button>
          <Button variant="outline" size="sm" className="h-9 gap-2">
            <FileText className="size-3.5" />
            PDF
          </Button>
          <Button variant="outline" size="sm" className="h-9 gap-2">
            <Printer className="size-3.5" />
            Imprimir
          </Button>
        </div>
      </div>

      {/* Filtros de fecha */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            {"Periodo"}
          </label>
          <Select defaultValue="week">
            <SelectTrigger size="sm" className="h-8 w-36 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoy</SelectItem>
              <SelectItem value="week">Esta Semana</SelectItem>
              <SelectItem value="month">Este Mes</SelectItem>
              <SelectItem value="quarter">Este Trimestre</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            Turno
          </label>
          <Select defaultValue="all">
            <SelectTrigger size="sm" className="h-8 w-32 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los turnos</SelectItem>
              <SelectItem value="morning">{"Manana"}</SelectItem>
              <SelectItem value="afternoon">Tarde</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            Empleado
          </label>
          <Select defaultValue="all">
            <SelectTrigger size="sm" className="h-8 w-36 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los empleados</SelectItem>
              <SelectItem value="javier">Javier Ugalde</SelectItem>
              <SelectItem value="francisco">Francisco Ugalde</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-6">
        {reportKPIs.map((kpi) => (
          <Card key={kpi.title} className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <kpi.icon className="size-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">{kpi.title}</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-xl font-semibold tracking-tight text-foreground">{kpi.value}</span>
              <span className={`text-[10px] font-medium pb-0.5 ${
                kpi.change.startsWith("+") ? "text-chart-2" : "text-destructive"
              }`}>
                {kpi.change}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Tabs de reportes */}
      <Tabs defaultValue="sales">
        <TabsList className="mb-4">
          <TabsTrigger value="sales" className="text-xs">Ventas</TabsTrigger>
          <TabsTrigger value="operational" className="text-xs">Operativo</TabsTrigger>
          <TabsTrigger value="cash" className="text-xs">Caja</TabsTrigger>
          <TabsTrigger value="employees" className="text-xs">Empleados</TabsTrigger>
          <TabsTrigger value="services" className="text-xs">Servicios</TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card className="p-5">
              <h3 className="text-sm font-medium text-foreground mb-1">Ingresos por Dia</h3>
              <p className="text-xs text-muted-foreground mb-4">Ingresos diarios esta semana</p>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid var(--color-border)",
                      backgroundColor: "var(--color-background)",
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-foreground)"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "var(--color-foreground)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-5">
              <h3 className="text-sm font-medium text-foreground mb-1">Ingresos por Servicio</h3>
              <p className="text-xs text-muted-foreground mb-4">{"Desglose de ingresos por tipo de servicio"}</p>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={serviceRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid var(--color-border)",
                      backgroundColor: "var(--color-background)",
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {serviceRevenue.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-5">
              <h3 className="text-sm font-medium text-foreground mb-1">{"Metodos de Pago"}</h3>
              <p className="text-xs text-muted-foreground mb-4">Desglose por tipo de pago</p>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={paymentBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {paymentBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: "1px solid var(--color-border)",
                        backgroundColor: "var(--color-background)",
                        fontSize: 12,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-4 mt-2">
                {paymentBreakdown.map((item) => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <div
                      className="size-2 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {item.name} ({item.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="text-sm font-medium text-foreground mb-1">Carros Atendidos</h3>
              <p className="text-xs text-muted-foreground mb-4">Volumen diario de carros esta semana</p>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={carsPerDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid var(--color-border)",
                      backgroundColor: "var(--color-background)",
                      fontSize: 12,
                    }}
                  />
                  <Bar
                    dataKey="cars"
                    fill="var(--color-chart-2)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="operational">
          <Card className="p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
            <Clock className="size-8 text-muted-foreground mb-3" />
            <h3 className="text-sm font-semibold text-foreground mb-1">Reportes Operativos</h3>
            <p className="text-xs text-muted-foreground max-w-sm">
              {"Metricas operativas detalladas incluyendo tiempos de lavado, horas pico y puntuaciones de eficiencia apareceran aqui."}
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="cash">
          <Card className="p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
            <DollarSign className="size-8 text-muted-foreground mb-3" />
            <h3 className="text-sm font-semibold text-foreground mb-1">Reportes de Caja</h3>
            <p className="text-xs text-muted-foreground max-w-sm">
              {"Historial de apertura/cierre de caja, seguimiento de variaciones y totales por turno apareceran aqui."}
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="employees">
          <Card className="p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
            <Car className="size-8 text-muted-foreground mb-3" />
            <h3 className="text-sm font-semibold text-foreground mb-1">Reportes de Empleados</h3>
            <p className="text-xs text-muted-foreground max-w-sm">
              {"Productividad por empleado, carros lavados, ingresos generados y rankings de rendimiento apareceran aqui."}
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card className="p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
            <TrendingUp className="size-8 text-muted-foreground mb-3" />
            <h3 className="text-sm font-semibold text-foreground mb-1">Reportes de Servicios</h3>
            <p className="text-xs text-muted-foreground max-w-sm">
              {"Servicios mas vendidos, rentabilidad por servicio e impacto de la duracion en los ingresos apareceran aqui."}
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
