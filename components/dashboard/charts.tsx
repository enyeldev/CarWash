"use client"

import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"


const COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
]

const topServices = [
  { name: "Aspirado Tapiceria", value: 42 },
  { name: "Lavado Basico", value: 35 },
  { name: "Lavado Premium", value: 28 },
  { name: "Encerado", value: 18 },
  { name: "Lavado Motor", value: 12 },
]

const topVehicles = [
  { name: "Honda CR-V", value: 15 },
  { name: "Suzuki Vitara", value: 10 },
  { name: "Toyota Prado", value: 8 },
  { name: "Nissan Patrol", value: 6 },
  { name: "Toyota Tacoma", value: 4 },
]

function HorizontalBarChart({ data }: { data: typeof topServices }) {
  return (
    <ResponsiveContainer width="100%" height={data.length * 36 + 16}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        barSize={20}
      >
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="name"
          width={120}
          tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          cursor={false}
          contentStyle={{
            borderRadius: 8,
            border: "1px solid var(--color-border)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            backgroundColor: "var(--color-background)",
            fontSize: 12,
          }}
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

function ChartCard({
  title,
  subtitle,
  data,
  footerText,
}: {
  title: string
  subtitle: string
  data: typeof topServices
  footerText: string
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <Select defaultValue="30d">
          <SelectTrigger size="sm" className="h-7 w-auto gap-1 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">{'Ultimos 7 dias'}</SelectItem>
            <SelectItem value="30d">{'Ultimos 30 dias'}</SelectItem>
            <SelectItem value="90d">{'Ultimos 90 dias'}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <HorizontalBarChart data={data} />
      <p className="mt-3 text-xs text-muted-foreground">{footerText}</p>
    </Card>
  )
}

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mb-6">
      <ChartCard
        title="Servicios Mas Vendidos"
        subtitle={'Ultimos 30 dias'}
        data={topServices}
        footerText="Basado en la cantidad de servicios vendidos"
      />
      <ChartCard
        title={'Top 5 Vehiculos'}
        subtitle={'Ultimos 30 dias'}
        data={topVehicles}
        footerText={'Basado en la cantidad de ordenes por marca y modelo'}
      />
    </div>
  )
}
