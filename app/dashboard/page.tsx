import { Navbar } from "@/components/navbar"
import { DashboardContent } from "@/components/dashboard-content"

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-accent/30">
      <Navbar />
      <DashboardContent />
    </main>
  )
}
