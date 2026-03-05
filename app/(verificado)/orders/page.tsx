"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PlusCircle, Search, MoreHorizontal, ArrowUpDown } from "lucide-react"

const statusConfig: Record<string, { label: string; className: string }> = {
  "en-proceso": {
    label: "En Proceso",
    className: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  },
  entregada: {
    label: "Entregada",
    className: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  },
  pagada: {
    label: "Pagada",
    className: "bg-chart-1/10 text-chart-1 border-chart-1/20",
  },
  finalizada: {
    label: "Finalizada",
    className: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  },
  pendiente: {
    label: "Pendiente",
    className: "bg-chart-5/10 text-chart-5 border-chart-5/20",
  },
}

const allOrders = [
  {
    id: 1,
    client: "Pedro Palote",
    vehicle: "Hyundai - i10 (AF1145)",
    employee: "Javier Ugalde",
    status: "en-proceso",
    total: "$23.81",
    date: "Hoy",
  },
  {
    id: 2,
    client: "Patricia Alvarez",
    vehicle: "Ford - Laser (EN0015)",
    employee: "Usuario Nuevo 6",
    status: "entregada",
    total: "$14.45",
    date: "23/08/2025",
  },
  {
    id: 3,
    client: "David Perez",
    vehicle: "- (-)",
    employee: "Francisco Ugalde",
    status: "pagada",
    total: "$19.80",
    date: "22/08/2025",
  },
  {
    id: 4,
    client: "Juanito Pepinona",
    vehicle: "Honda - CRV (EN0012)",
    employee: "Francisco Ugalde",
    status: "pagada",
    total: "$18.46",
    date: "20/08/2025",
  },
  {
    id: 5,
    client: "Fernando Asier Ugalde Matos",
    vehicle: "Honda - Crv (AN2354)",
    employee: "Javier Ugalde",
    status: "pagada",
    total: "$24.82",
    date: "19/08/2025",
  },
  {
    id: 6,
    client: "David Perez",
    vehicle: "- (-)",
    employee: "Francisco Ugalde",
    status: "finalizada",
    total: "$6.42",
    date: "14/08/2025",
  },
  {
    id: 7,
    client: "Francisco Ugalde",
    vehicle: "- (-)",
    employee: "Fernando Ugalde",
    status: "pagada",
    total: "$8.13",
    date: "10/08/2025",
  },
  {
    id: 8,
    client: "Maria Monacos",
    vehicle: "- (-)",
    employee: "Francisco Ugalde",
    status: "pagada",
    total: "$5.78",
    date: "10/08/2025",
  },
  {
    id: 9,
    client: "David Perez",
    vehicle: "- (-)",
    employee: "Fernando Ugalde",
    status: "en-proceso",
    total: "$18.78",
    date: "10/08/2025",
  },
  {
    id: 10,
    client: "Francisco Ugalde",
    vehicle: "Suzuki - Grand Vitara (EN0920)",
    employee: "Javier Ugalde",
    status: "pendiente",
    total: "$28.36",
    date: "10/08/2025",
  },
]

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOrders = allOrders.filter(
    (order) =>
      order.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      statusConfig[order.status]?.label
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">{"Ordenes"}</h1>
          <p className="text-sm text-muted-foreground">{"Administra las ordenes de tu autolavado"}</p>
        </div>
        <Button asChild className="h-9 gap-2">
          <Link href="/pos">
            <PlusCircle className="size-4" />
            Nueva Orden
          </Link>
        </Button>
      </div>

      <div className="mb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={"Buscar por cliente, vehiculo, matricula o estado..."}
            className="h-9 pl-8 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent bg-muted/30">
              <TableHead className="text-xs font-medium">
                <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                  Cliente
                  <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
              <TableHead className="text-xs font-medium">
                <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                  {"Vehiculo"}
                  <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
              <TableHead className="text-xs font-medium">
                <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                  Usuario
                  <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
              <TableHead className="text-xs font-medium">Estado</TableHead>
              <TableHead className="text-xs font-medium">
                <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                  Total
                  <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
              <TableHead className="text-xs font-medium">
                <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                  Fecha
                  <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => {
              const status = statusConfig[order.status]
              return (
                <TableRow key={order.id} className="cursor-pointer group">
                  <TableCell className="text-sm font-medium text-foreground">
                    {order.client}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {order.vehicle}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {order.employee}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-medium ${status.className}`}
                    >
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-foreground">
                    {order.total}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {order.date}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between border-t border-border px-4 py-3 bg-muted/20">
          <span className="text-xs text-muted-foreground">
            {"0 de"} {filteredOrders.length} {"filas seleccionadas."}
          </span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{"Filas por pagina"}</span>
              <span className="text-xs font-medium text-foreground">10</span>
            </div>
            <span className="text-xs text-muted-foreground">{"Pagina 1 de 9"}</span>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="size-7" disabled>
                <span className="text-xs">{"<<"}</span>
              </Button>
              <Button variant="outline" size="icon" className="size-7" disabled>
                <span className="text-xs">{"<"}</span>
              </Button>
              <Button variant="outline" size="icon" className="size-7">
                <span className="text-xs">{">"}</span>
              </Button>
              <Button variant="outline" size="icon" className="size-7">
                <span className="text-xs">{">>"}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
