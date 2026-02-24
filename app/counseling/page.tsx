import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CounselingContent } from "@/components/counseling-content"

export default function CounselingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <CounselingContent />
      <Footer />
    </main>
  )
}
