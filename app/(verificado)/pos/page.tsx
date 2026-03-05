"use client"
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Search, Minus, ShoppingCart, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'service' | 'product';
}

const services: Service[] = [
  { id: 's1', name: 'Lavado Básico', price: 150, duration: 20 },
  { id: 's2', name: 'Lavado Completo', price: 300, duration: 35 },
  { id: 's3', name: 'Lavado Premium', price: 400, duration: 45 },
  { id: 's4', name: 'Encerado', price: 300, duration: 30 },
  { id: 's5', name: 'Pulido', price: 300, duration: 40 },
  { id: 's6', name: 'Limpieza Interior', price: 200, duration: 25 },
];

const products: Product[] = [
  { id: 'p1', name: 'Ambientador', price: 50, stock: 45 },
  { id: 'p2', name: 'Shampoo para Auto', price: 350, stock: 12 },
  { id: 'p3', name: 'Cera Líquida', price: 580, stock: 8 },
  { id: 'p4', name: 'Toalla de Microfibra', price: 45, stock: 120 },
  { id: 'p5', name: 'Protector UV', price: 280, stock: 15 },
  { id: 'p6', name: 'Limpiador de Vidrios', price: 120, stock: 25 },
];

export default function POSSystem() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [employeeAssigned, setEmployeeAssigned] = useState('');

  const employees = ['Carlos Méndez', 'María González', 'Juan Rodríguez', 'Ana Martínez'];

  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (item: Service | Product, type: 'service' | 'product') => {
    const existingItem = cart.find((i) => i.id === item.id);
    if (existingItem && type === 'product') {
      setCart(
        cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else if (!existingItem) {
      setCart([
        ...cart,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          type,
        },
      ]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, change: number) => {
    setCart(
      cart.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.18; // 18% ITBIS
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (!vehiclePlate || cart.length === 0) {
      alert('Por favor ingresa la placa del vehículo y agrega al menos un servicio o producto');
      return;
    }

    const hasService = cart.some(item => item.type === 'service');
    if (hasService && !employeeAssigned) {
      alert('Por favor asigna un empleado para los servicios');
      return;
    }

    alert(`Venta procesada exitosamente!\nTotal: $${total.toFixed(2)}\nPlaca: ${vehiclePlate}`);
    
    // Reset form
    setCart([]);
    setVehiclePlate('');
    setVehicleModel('');
    setEmployeeAssigned('');
  };

  return (
    <div className="space-y-8 m-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Punto de Venta (POS)</h1>
        <p className="text-muted-foreground">Sistema de ventas y servicios</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products & Services Section */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar servicios o productos..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Tabs */}
          <Tabs defaultValue="services">
            <TabsList className="w-full">
              <TabsTrigger value="services" className="flex-1">
                Servicios
              </TabsTrigger>
              <TabsTrigger value="products" className="flex-1">
                Productos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="services" className="space-y-3 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredServices.map((service) => (
                  <Card
                    key={service.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => addToCart(service, 'service')}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{service.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {service.duration} minutos
                          </p>
                          <p className="text-lg font-bold text-primary mt-2">
                            ${service.price}
                          </p>
                        </div>
                        <Plus className="h-5 w-5 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="products" className="space-y-3 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => addToCart(product, 'product')}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Stock: {product.stock}
                          </p>
                          <p className="text-lg font-bold text-primary mt-2">
                            ${product.price}
                          </p>
                        </div>
                        <Plus className="h-5 w-5 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Cart Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Carrito
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Vehicle Info */}
              <div className="space-y-2">
                <Label htmlFor="plate">Placa del Vehículo *</Label>
                <Input
                  id="plate"
                  placeholder="ABC-123"
                  value={vehiclePlate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVehiclePlate(e.target.value.toUpperCase())}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Modelo (Opcional)</Label>
                <Input
                  id="model"
                  placeholder="Toyota Camry 2020"
                  value={vehicleModel}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>) => setVehicleModel(e.target.value)}
                />
              </div>

              {/* Employee Assignment */}
              {cart.some(item => item.type === 'service') && (
                <div className="space-y-2">
                  <Label htmlFor="employee">Empleado Asignado *</Label>
                  <Select value={employeeAssigned} onValueChange={setEmployeeAssigned}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar empleado" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((emp) => (
                        <SelectItem key={emp} value={emp}>
                          {emp}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <Separator />

              {/* Cart Items */}
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Carrito vacío
                  </p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2 border rounded"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {item.type === 'service' ? 'Servicio' : 'Producto'}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            ${item.price}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.type === 'product' && (
                          <>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium w-6 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-3 w-3 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>ITBIS (18%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <Label>Método de Pago</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Efectivo</SelectItem>
                    <SelectItem value="card">Tarjeta</SelectItem>
                    <SelectItem value="transfer">Transferencia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Checkout Button */}
              <Button
                className="w-full"
                size="lg"
                onClick={handleCheckout}
                disabled={cart.length === 0 || !vehiclePlate}
              >
                Procesar Venta
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
