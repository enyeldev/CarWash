"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { set } from "zod";

const statusConfig: Record<string, { label: string; className: string }> = {
  proceso: {
    label: "En Proceso",
    className: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  },
  entregada: {
    label: "Entregada",
    className: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  },
  pagada: {
    label: "pagada",
    className: "bg-chart-1/10 text-chart-1 border-chart-1/20",
  },
  finalizada: {
    label: "Finalizada",
    className: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  },
  pendiente: {
    label: "Pendientes",
    className: "bg-chart-5/10 text-chart-5 border-chart-5/20",
  },
};

const orders = [
  {
    id: 1,
    client: "Pedro Palote",
    vehicle: "Hyundai - i10 (AF1145)",
    employee: "Javier Ugalde",
    status: "proceso",
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
    date: "Hoy",
  },
  {
    id: 3,
    client: "David Perez",
    vehicle: "-",
    employee: "Francisco Ugalde",
    status: "pagada",
    total: "$19.80",
    date: "Hoy",
  },
  {
    id: 4,
    client: "Juanito Pepinona",
    vehicle: "Honda - CRV (EN0012)",
    employee: "Francisco Ugalde",
    status: "pagada",
    total: "$18.46",
    date: "Hoy",
  },
  {
    id: 5,
    client: "Fernando Asier Ugalde",
    vehicle: "Honda - CRV (AN2354)",
    employee: "Javier Ugalde",
    status: "finalizada",
    total: "$24.82",
    date: "Hoy",
  },
  {
    id: 6,
    client: "Maria Monacos",
    vehicle: "Chevrolet Camaro (EH1728)",
    employee: "Francisco Ugalde",
    status: "pendiente",
    total: "$28.36",
    date: "Hoy",
  },
];

const tabs = ["todas", "pendiente", "proceso", "finalizada", "pagada"];

export function DashboardOrders() {
  const [activeTab, setActiveTab] = useState("todas");
  const [busqueda, setBusqueda] = useState("");

  const respuesta = orders.filter((order) => {
  const matchStatus = activeTab === "todas" || order.status === activeTab;

  const matchSearch =
    !busqueda ||
    order.client.toLowerCase().includes(busqueda.toLowerCase()) ||
    order.employee.toLowerCase().includes(busqueda.toLowerCase());

  return matchStatus && matchSearch;
});

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setBusqueda(e.target.value);
  };

  return (
    <Card className="p-0">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-medium text-foreground">
          {"Ordenes del Dia"}
        </h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <form>
              <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por cliente o empleado..."
                className="h-8 w-60 pl-8 text-xs"
                value={busqueda}
                onChange={handleSubmit}
              />
            </form>
          </div>
          <div className="flex items-center gap-1 rounded-lg bg-muted p-0.5">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-xs">Cliente</TableHead>
            <TableHead className="text-xs">{"Vehiculo"}</TableHead>
            <TableHead className="text-xs">Empleado</TableHead>
            <TableHead className="text-xs">Estado</TableHead>
            <TableHead className="text-xs ">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {respuesta.map((order) => {
            const color = statusConfig[order.status];
            return (
              <TableRow key={order.id} className="cursor-pointer">
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
                    className={`text-[10px] font-medium ${color.className}`}
                  >
                    {color.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm font-medium text-foreground ">
                  {order.total}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between border-t border-border px-5 py-3">
        <span className="text-xs text-muted-foreground">
          0 de {orders.length} filas seleccionadas.
        </span>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground">
            Filas por pagina: 10
          </span>
          <span className="text-xs text-muted-foreground">
            {"Pagina 1 de 1"}
          </span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="size-7" disabled>
              <span className="text-xs">{"<<"}</span>
            </Button>
            <Button variant="outline" size="icon" className="size-7" disabled>
              <span className="text-xs">{"<"}</span>
            </Button>
            <Button variant="outline" size="icon" className="size-7" disabled>
              <span className="text-xs">{">"}</span>
            </Button>
            <Button variant="outline" size="icon" className="size-7" disabled>
              <span className="text-xs">{">>"}</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
