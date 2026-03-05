"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Search, MoreHorizontal, Package, Wrench } from "lucide-react"

const items = [
  {
    id: 1,
    name: "Upholstery Vacuum",
    type: "service",
    category: "Cleaning",
    price: "$6.50",
    cost: "$2.00",
    stock: null,
    status: "active",
  },
  {
    id: 2,
    name: "Basic Auto Wash",
    type: "service",
    category: "Washing",
    price: "$11.00",
    cost: "$3.50",
    stock: null,
    status: "active",
  },
  {
    id: 3,
    name: "Premium Auto Wash",
    type: "service",
    category: "Washing",
    price: "$18.00",
    cost: "$6.00",
    stock: null,
    status: "active",
  },
  {
    id: 4,
    name: "Interior Detail",
    type: "service",
    category: "Detailing",
    price: "$25.00",
    cost: "$8.00",
    stock: null,
    status: "active",
  },
  {
    id: 5,
    name: "Coca Cola Zero",
    type: "product",
    category: "Beverages",
    price: "$3.50",
    cost: "$1.20",
    stock: 24,
    status: "active",
  },
  {
    id: 6,
    name: "Acidic Gummies",
    type: "product",
    category: "Snacks",
    price: "$1.25",
    cost: "$0.50",
    stock: 48,
    status: "active",
  },
  {
    id: 7,
    name: "Chips",
    type: "product",
    category: "Snacks",
    price: "$1.15",
    cost: "$0.45",
    stock: 36,
    status: "active",
  },
  {
    id: 8,
    name: "Water Bottle",
    type: "product",
    category: "Beverages",
    price: "$1.00",
    cost: "$0.30",
    stock: 60,
    status: "active",
  },
  {
    id: 9,
    name: "Car Air Freshener",
    type: "product",
    category: "Accessories",
    price: "$4.50",
    cost: "$1.50",
    stock: 3,
    status: "low-stock",
  },
]

export default function ItemsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const filtered = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || item.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Services & Items</h1>
          <p className="text-sm text-muted-foreground">Manage your service catalog and inventory</p>
        </div>
        <Button size="sm" className="h-9 gap-2">
          <Plus className="size-3.5" />
          Add Item
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <Package className="size-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Total Items</span>
          </div>
          <span className="text-2xl font-semibold tracking-tight text-foreground">{items.length}</span>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <Wrench className="size-4 text-chart-1" />
            <span className="text-xs font-medium text-muted-foreground">Services</span>
          </div>
          <span className="text-2xl font-semibold tracking-tight text-foreground">
            {items.filter((i) => i.type === "service").length}
          </span>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <Package className="size-4 text-chart-2" />
            <span className="text-xs font-medium text-muted-foreground">Products</span>
          </div>
          <span className="text-2xl font-semibold tracking-tight text-foreground">
            {items.filter((i) => i.type === "product").length}
          </span>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <Package className="size-4 text-destructive" />
            <span className="text-xs font-medium text-muted-foreground">Low Stock</span>
          </div>
          <span className="text-2xl font-semibold tracking-tight text-foreground">
            {items.filter((i) => i.status === "low-stock").length}
          </span>
        </Card>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            className="h-9 pl-8 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="h-9 w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="service">Services</SelectItem>
            <SelectItem value="product">Products</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent bg-muted/30">
              <TableHead className="text-xs font-medium">Name</TableHead>
              <TableHead className="text-xs font-medium">Type</TableHead>
              <TableHead className="text-xs font-medium">Category</TableHead>
              <TableHead className="text-xs font-medium text-right">Price</TableHead>
              <TableHead className="text-xs font-medium text-right">Cost</TableHead>
              <TableHead className="text-xs font-medium text-center">Stock</TableHead>
              <TableHead className="text-xs font-medium">Status</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((item) => (
              <TableRow key={item.id} className="cursor-pointer group">
                <TableCell className="text-sm font-medium text-foreground">{item.name}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-medium ${
                      item.type === "service"
                        ? "bg-foreground text-background border-foreground"
                        : "bg-muted text-muted-foreground border-border"
                    }`}
                  >
                    {item.type === "service" ? "Service" : "Product"}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{item.category}</TableCell>
                <TableCell className="text-sm font-medium text-foreground text-right">{item.price}</TableCell>
                <TableCell className="text-sm text-muted-foreground text-right">{item.cost}</TableCell>
                <TableCell className="text-sm text-muted-foreground text-center">
                  {item.stock !== null ? item.stock : "-"}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-medium ${
                      item.status === "active"
                        ? "bg-chart-2/10 text-chart-2 border-chart-2/20"
                        : "bg-destructive/10 text-destructive border-destructive/20"
                    }`}
                  >
                    {item.status === "active" ? "Active" : "Low Stock"}
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
