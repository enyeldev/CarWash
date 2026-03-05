import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FiltroBusqueda from "@/components/employees/FiltroBusqueda";
import Formulario from "@/components/employees/Formulario";
import { getEmployeesAction } from "@/src/actions/employees";
import { userHasCompanyAction } from "@/src/actions/auth";
import { getSessionService } from "@/src/services/auth";
import { UnauthorizedError } from "@/src/lib/errors";

const EmployeeManagement = async () => {
  const session = await getSessionService();

  if (!session?.user) {
    throw new UnauthorizedError();
  }

  const companies = await userHasCompanyAction({ userId: session.user.id });

  const companyId = companies?.memberships[0].company.id;

  if (!companyId) {
    throw new UnauthorizedError();
  }

  const employees = await getEmployeesAction(companyId);

  if (!employees.ok) {
    throw new UnauthorizedError();
  }

  const dataEmployees = employees.data;

  return (
    <div className="space-y-6n m-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Gestión de Empleados
          </h1>
          <p className="text-muted-foreground">
            Administra tu equipo de trabajo
          </p>
        </div>
        <Formulario/>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 my-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Empleados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dataEmployees?.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {dataEmployees?.filter(emp => emp.isActive===true).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactivos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {dataEmployees?.filter(emp => emp.isActive===false).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <FiltroBusqueda employees={dataEmployees}/>
      
    </div>
  );
};

export default EmployeeManagement;
