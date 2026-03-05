"use client"

import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { useState } from 'react';
import Tablaempleados from './Tablaempleados';

export type EmployeeData = {
  name: string;
  phone: string | null;
  document: string | null;
  isActive: boolean;
  id: string;
  companyId: string;
};

type TablaEmpleadosProps = {
  employees: EmployeeData[];
};

const FiltroBusqueda = ({employees}: TablaEmpleadosProps) => {
    const [searchTerm, setSearchTerm] = useState("")

    const employeesFilters = employees.filter(emp => emp.name.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
      <>
        <div className="flex items-center gap-2 my-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar empleados..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Tablaempleados employees={employeesFilters} />
      </>
    );
}

export default FiltroBusqueda;
