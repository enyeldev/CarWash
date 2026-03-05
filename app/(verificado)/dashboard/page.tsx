import { DashboardCharts } from "@/components/dashboard/charts"
import {DashboardKPIs } from "@/components/dashboard/kpi-cards"
import { DashboardOrders } from "@/components/dashboard/orders-table"


const DashBoardPage = () => {
  return (
     <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Resumen de las operaciones de tu autolavado</p>
      </div>
      <DashboardKPIs />
      <DashboardCharts />
      <DashboardOrders />
    </div>
  )
}

export default DashBoardPage