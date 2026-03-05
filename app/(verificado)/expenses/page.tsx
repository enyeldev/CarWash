"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, MoreHorizontal, Users, TrendingUp, Car } from "lucide-react"

const employees = [
  {
    id: 1,
    name: "Javier Ugalde",
    initials: "JU",
    role: "Admin / Washer",
    shift: "Morning",
    carsWashed: 28,
    salesProcessed: "$652.40",
    productivity: 92,
    status: "active",
  },
  {
    id: 2,
    name: "Francisco Ugalde",
    initials: "FU",
    role: "Cashier / Washer",
    shift: "Morning",
    carsWashed: 22,
    salesProcessed: "$485.20",
    productivity: 85,
    status: "active",
  },
  {
    id: 3,
    name: "Fernando Ugalde",
    initials: "FU",
    role: "Washer",
    shift: "Afternoon",
    carsWashed: 18,
    salesProcessed: "$320.10",
    productivity: 78,
    status: "active",
  },
  {
    id: 4,
    name: "Carlos Martinez",
    initials: "CM",
    role: "Washer",
    shift: "Morning",
    carsWashed: 15,
    salesProcessed: "$265.00",
    productivity: 72,
    status: "inactive",
  },
]

function getProductivityColor(score: number): string {
  if (score >= 85) return "bg-chart-2/10 text-chart-2 border-chart-2/20"
  if (score >= 70) return "bg-chart-4/10 text-chart-4 border-chart-4/20"
  return "bg-destructive/10 text-destructive border-destructive/20"
}

export default function EmployeesPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Employees</h1>
          <p className="text-sm text-muted-foreground">Manage your team and track performance</p>
        </div>
        <Button size="sm" className="h-9 gap-2">
          <Plus className="size-3.5" />
          Add Employee
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <Users className="size-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Total Employees</span>
          </div>
          <span className="text-2xl font-semibold tracking-tight text-foreground">{employees.length}</span>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <Users className="size-4 text-chart-2" />
            <span className="text-xs font-medium text-muted-foreground">Active</span>
          </div>
          <span className="text-2xl font-semibold tracking-tight text-foreground">
            {employees.filter((e) => e.status === "active").length}
          </span>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <Car className="size-4 text-chart-1" />
            <span className="text-xs font-medium text-muted-foreground">Cars Washed (Total)</span>
          </div>
          <span className="text-2xl font-semibold tracking-tight text-foreground">
            {employees.reduce((sum, e) => sum + e.carsWashed, 0)}
          </span>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="size-4 text-chart-4" />
            <span className="text-xs font-medium text-muted-foreground">Avg Productivity</span>
          </div>
          <span className="text-2xl font-semibold tracking-tight text-foreground">
            {Math.round(employees.reduce((sum, e) => sum + e.productivity, 0) / employees.length)}%
          </span>
        </Card>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent bg-muted/30">
              <TableHead className="text-xs font-medium">Employee</TableHead>
              <TableHead className="text-xs font-medium">Role</TableHead>
              <TableHead className="text-xs font-medium">Shift</TableHead>
              <TableHead className="text-xs font-medium text-center">Cars Washed</TableHead>
              <TableHead className="text-xs font-medium text-right">Sales Processed</TableHead>
              <TableHead className="text-xs font-medium text-center">Productivity</TableHead>
              <TableHead className="text-xs font-medium">Status</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.id} className="cursor-pointer group">
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-medium text-foreground">{emp.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{emp.role}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{emp.shift}</TableCell>
                <TableCell className="text-sm text-muted-foreground text-center">{emp.carsWashed}</TableCell>
                <TableCell className="text-sm font-medium text-foreground text-right">{emp.salesProcessed}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-medium ${getProductivityColor(emp.productivity)}`}
                  >
                    {emp.productivity}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-medium ${
                      emp.status === "active"
                        ? "bg-chart-2/10 text-chart-2 border-chart-2/20"
                        : "bg-muted text-muted-foreground border-border"
                    }`}
                  >
                    {emp.status === "active" ? "Active" : "Inactive"}
                  </Badge>
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
