"use client";

import { useDrag, useDrop } from "react-dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  color: string;
  service: string;
  employee?: string;
  startTime: string;
  status: "waiting" | "in-progress" | "completed";
}

interface VehicleCardProps {
  vehicle: Vehicle;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Vehicle["status"]) => void;
}

const ItemType = "VEHICLE";

export default function VehicleCard({
  vehicle,
  onEdit,
  onDelete,
  onStatusChange,
}: VehicleCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
  type: ItemType,
  item: vehicle
    ? { id: vehicle.id, currentStatus: vehicle.status }
    : null,
  collect: (monitor) => ({
    isDragging: monitor.isDragging(),
  }),
}))

  const statusColors = {
    waiting: "bg-yellow-100 text-yellow-800 border-yellow-300",
    "in-progress": "bg-blue-100 text-blue-800 border-blue-300",
    completed: "bg-green-100 text-green-800 border-green-300",
  };

  return (
    <div
      ref={(node) => {
        if (node) drag(node);
      }}
      className={`${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      <Card
        className={`cursor-move hover:shadow-md transition-shadow ${statusColors[vehicle.status]}`}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">{vehicle.plate}</h3>
                <Badge variant="outline">{vehicle.service}</Badge>
              </div>
              <p className="text-sm mt-1">{vehicle.model}</p>
              <p className="text-xs text-muted-foreground">
                Color: {vehicle.color}
              </p>
              {vehicle.employee && (
                <p className="text-xs mt-1">
                  <strong>Empleado:</strong> {vehicle.employee}
                </p>
              )}
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                <Clock className="h-3 w-3" />
                {vehicle.startTime}
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(vehicle)}>
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(vehicle.id)}>
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface DropZoneProps {
  status: Vehicle["status"];
  title: string;
  vehicles: Vehicle[];
  onDrop: (id: string, newStatus: Vehicle["status"]) => void;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Vehicle["status"]) => void;
}

export function DropZone({
  status,
  title,
  vehicles,
  onDrop,
  onEdit,
  onDelete,
  onStatusChange,
}: DropZoneProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item: { id: string; currentStatus: Vehicle["status"] }) => {
      if (item.currentStatus !== status) {
        onDrop(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={(node) => {
        if (node) drop(node);
      }}
      className={`flex-1 min-h-[500px] p-4 border-2 border-dashed rounded-lg ${
        isOver ? "border-primary bg-accent" : "border-border"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Badge variant="secondary">{vehicles.length}</Badge>
      </div>
      <div className="space-y-3">
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </div>
  );
}
