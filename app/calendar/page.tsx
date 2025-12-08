import { CalendarEntity } from "@/components/calendar-entity"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CalendarPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-20">
        <CalendarEntity />
      </div>
      <Footer />
    </main>
  )
}
