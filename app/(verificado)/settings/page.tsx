import { Card } from "@/components/ui/card"
import { Settings } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Configure your car wash business settings</p>
      </div>
      <Card className="p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted mb-4">
          <Settings className="size-6 text-muted-foreground" />
        </div>
        <h2 className="text-base font-semibold text-foreground mb-1">Settings</h2>
        <p className="text-sm text-muted-foreground max-w-md">
          Business profile, tax configuration, branch management, payment methods, and notification preferences will be available here.
        </p>
      </Card>
    </div>
  )
}
