import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { deleteEmployeesAction, patchEmployeesAction } from "@/src/actions/employees";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
const Tablaempleados = ({ employees }: TablaEmpleadosProps) => {
    const router = useRouter();

  const handleDeleteEmployee = async (id: string) => {
    const response = await deleteEmployeesAction(id)
    
    if (!response.ok) {
      if (response?.error?.code === "VALIDATION_ERROR") {
        response.error.issues.forEach((issue) => {
          toast.error(issue.message);
        });
        return;
      }

      toast.error(response?.error?.message);
      return;
    }
    toast.success("Empleado eliminado correctamente");
    router.refresh();
  }

  const handleEditEmployee = async (employee: EmployeeData) =>{
    const response = await patchEmployeesAction(employee)
    console.log(response)
  }


  return (
    <Card>
      <CardContent className="px-4">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Id</TableHead>
                <TableHead className="min-w-[120px]">Nombre</TableHead>
                <TableHead className="min-w-[120px]">Document</TableHead>
                <TableHead className="min-w-[80px]">Telefono</TableHead>
                <TableHead className="min-w-[100px]">Estado</TableHead>
                <TableHead className="text-right min-w-[100px]">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">{employee.id}</div>
                  </TableCell>

                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.document}</TableCell>
                  <TableCell>{employee.phone}</TableCell>

                  <TableCell>
                    <Badge>{employee.isActive}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditEmployee(employee)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteEmployee(employee.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default Tablaempleados;
