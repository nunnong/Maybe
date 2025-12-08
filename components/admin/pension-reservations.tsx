"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, Home, CreditCard, Phone, User } from "lucide-react"

interface Reservation {
  id: number
  name: string
  phone: string
  room: string
  checkIn: string
  checkOut: string
  nights: number
  guests: number
  totalPrice: number
  status: "confirmed" | "checked_in" | "checked_out" | "cancelled"
  paidAt: string
}

const mockReservations: Reservation[] = [
  {
    id: 1,
    name: "정하늘",
    phone: "010-1111-2222",
    room: "스탠다드 A",
    checkIn: "2025.06.15",
    checkOut: "2025.06.17",
    nights: 2,
    guests: 2,
    totalPrice: 200000,
    status: "confirmed",
    paidAt: "2025.06.08 10:30",
  },
  {
    id: 2,
    name: "한소희",
    phone: "010-2222-3333",
    room: "디럭스 B",
    checkIn: "2025.06.20",
    checkOut: "2025.06.21",
    nights: 1,
    guests: 4,
    totalPrice: 150000,
    status: "confirmed",
    paidAt: "2025.06.07 14:20",
  },
  {
    id: 3,
    name: "윤도현",
    phone: "010-3333-4444",
    room: "스위트",
    checkIn: "2025.06.22",
    checkOut: "2025.06.25",
    nights: 3,
    guests: 6,
    totalPrice: 600000,
    status: "confirmed",
    paidAt: "2025.06.06 09:00",
  },
  {
    id: 4,
    name: "강민호",
    phone: "010-4444-5555",
    room: "스탠다드 B",
    checkIn: "2025.06.10",
    checkOut: "2025.06.12",
    nights: 2,
    guests: 2,
    totalPrice: 200000,
    status: "checked_in",
    paidAt: "2025.06.05 11:15",
  },
  {
    id: 5,
    name: "임수정",
    phone: "010-5555-6666",
    room: "디럭스 A",
    checkIn: "2025.06.01",
    checkOut: "2025.06.03",
    nights: 2,
    guests: 3,
    totalPrice: 300000,
    status: "checked_out",
    paidAt: "2025.05.28 16:40",
  },
]

const statusConfig = {
  confirmed: { label: "예약확정", color: "bg-green-100 text-green-700" },
  checked_in: { label: "체크인", color: "bg-blue-100 text-blue-700" },
  checked_out: { label: "체크아웃", color: "bg-gray-100 text-gray-700" },
  cancelled: { label: "취소", color: "bg-red-100 text-red-700" },
}

export function PensionReservations() {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredReservations = reservations.filter((res) => {
    const matchesSearch = res.name.includes(searchTerm) || res.phone.includes(searchTerm)
    const matchesFilter = filterStatus === "all" || res.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalRevenue = reservations.filter((r) => r.status !== "cancelled").reduce((sum, r) => sum + r.totalPrice, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">펜션 예약 관리</h1>
        <p className="text-muted-foreground">일반 펜션 예약 현황을 관리하세요.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-100">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">총 매출</p>
                <p className="text-lg font-bold">₩{totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">예약 확정</p>
                <p className="text-lg font-bold">{reservations.filter((r) => r.status === "confirmed").length}건</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Home className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">현재 투숙</p>
                <p className="text-lg font-bold">{reservations.filter((r) => r.status === "checked_in").length}건</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gray-100">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">총 예약</p>
                <p className="text-lg font-bold">{reservations.length}건</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="이름 또는 연락처로 검색..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {[
            { value: "all", label: "전체" },
            { value: "confirmed", label: "예약확정" },
            { value: "checked_in", label: "체크인" },
            { value: "checked_out", label: "체크아웃" },
          ].map((filter) => (
            <Button
              key={filter.value}
              variant={filterStatus === filter.value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus(filter.value)}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Reservations Table */}
      <Card>
        <CardHeader>
          <CardTitle>예약 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">예약자</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">객실</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">체크인/아웃</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">인원</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">결제금액</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">상태</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">액션</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.map((res) => (
                  <tr key={res.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{res.name}</p>
                        <p className="text-xs text-muted-foreground">{res.phone}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{res.room}</td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <p>{res.checkIn}</p>
                        <p className="text-muted-foreground">~ {res.checkOut}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{res.guests}명</td>
                    <td className="py-3 px-4 font-medium">₩{res.totalPrice.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${statusConfig[res.status].color}`}>
                        {statusConfig[res.status].label}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {res.status === "confirmed" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              setReservations((prev) =>
                                prev.map((r) => (r.id === res.id ? { ...r, status: "checked_in" } : r)),
                              )
                            }
                          >
                            체크인
                          </Button>
                        )}
                        {res.status === "checked_in" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              setReservations((prev) =>
                                prev.map((r) => (r.id === res.id ? { ...r, status: "checked_out" } : r)),
                              )
                            }
                          >
                            체크아웃
                          </Button>
                        )}
                        <Button size="sm" variant="ghost">
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
