"use client"

import Link from "next/link"
import { Heart, LayoutDashboard, Users, Home, MessageSquare, LogOut, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdminSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const menuItems = [
  { id: "overview", label: "대시보드", icon: LayoutDashboard },
  { id: "dating", label: "소개팅 신청", icon: Users },
  { id: "pension", label: "펜션 예약", icon: Home },
  { id: "coupons", label: "쿠폰 발급", icon: Ticket },
  { id: "inquiries", label: "1:1 문의", icon: MessageSquare },
]

export function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  return (
    <aside className="w-64 min-h-screen bg-background border-r border-border hidden lg:block">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <Heart className="w-8 h-8 text-primary fill-primary" />
          <span className="text-xl font-bold text-foreground">Ocean-date</span>
        </Link>
        <p className="text-xs text-muted-foreground mt-1">관리자 페이지</p>
      </div>

      <nav className="px-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-border">
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start gap-3">
            <LogOut className="w-5 h-5" />
            메인으로 돌아가기
          </Button>
        </Link>
      </div>
    </aside>
  )
}
