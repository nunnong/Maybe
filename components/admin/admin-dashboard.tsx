"use client"

import { useState } from "react"
import { AdminSidebar } from "./admin-sidebar"
import { DatingApplications } from "./dating-applications"
import { PensionReservations } from "./pension-reservations"
import { AdminOverview } from "./admin-overview"
import { AdminInquiries } from "./admin-inquiries"
import { ProgramManagement } from "./program-section"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6 lg:p-8">
          {activeTab === "overview" && <AdminOverview />}
          {activeTab === "dating" && <DatingApplications />}
          {activeTab === "pension" && <PensionReservations />}
          {activeTab === "program" && <ProgramManagement />}
          {activeTab === "inquiries" && <AdminInquiries />}
        </main>
      </div>
    </div>
  )
}
