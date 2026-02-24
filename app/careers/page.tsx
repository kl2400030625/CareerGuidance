import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CareersContent } from "@/components/careers-content"

export default function CareersPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <CareersContent />
      <Footer />
    </main>
  )
}
