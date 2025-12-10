import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Home, CreditCard, MessageSquare, Calendar } from "lucide-react"

const stats = [
  { label: "소개팅 신청", value: "24", change: "+12%", icon: Users, color: "text-primary" },
  { label: "펜션 예약", value: "18", change: "+8%", icon: Home, color: "text-accent" },
  { label: "이번 달 매출", value: "₩4,250,000", change: "+15%", icon: CreditCard, color: "text-green-500" },
  { label: "미답변 문의", value: "3", change: "-2", icon: MessageSquare, color: "text-orange-500" },
]

const recentApplications = [
  { id: 1, name: "김**", age: 28, gender: "여", month: "7월", status: "검토중", date: "2025.06.08" },
  { id: 2, name: "이**", age: 31, gender: "남", month: "7월", status: "검토중", date: "2025.06.07" },
  { id: 3, name: "박**", age: 26, gender: "여", month: "8월", status: "승인완료", date: "2025.06.06" },
  { id: 4, name: "최**", age: 29, gender: "남", month: "7월", status: "결제대기", date: "2025.06.05" },
]

const recentReservations = [
  { id: 1, name: "정**", room: "스탠다드", checkIn: "2025.06.15", nights: 2, status: "결제완료" },
  { id: 2, name: "한**", room: "디럭스", checkIn: "2025.06.20", nights: 1, status: "결제완료" },
  { id: 3, name: "윤**", room: "스위트", checkIn: "2025.06.22", nights: 3, status: "결제완료" },
]

export function AdminOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">대시보드</h1>
        <p className="text-muted-foreground">Ocean-date 운영 현황을 한눈에 확인하세요.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <p className="text-xs text-green-500 mt-1">{stat.change} 지난 주 대비</p>
                  </div>
                  <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Dating Applications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              최근 소개팅 신청
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentApplications.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">{app.gender}</span>
                    </div>
                    <div>
                      <p className="font-medium">
                        {app.name} ({app.age}세)
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {app.month} 참여 희망 · {app.date}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      app.status === "검토중"
                        ? "bg-yellow-100 text-yellow-700"
                        : app.status === "승인완료"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Pension Reservations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent" />
              최근 펜션 예약
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentReservations.map((res) => (
                <div key={res.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Home className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {res.name} · {res.room}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {res.checkIn} · {res.nights}박
                      </p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">{res.status}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
