"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Clock, AlertCircle, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"]

type RoomType = {
  id: string
  name: string
  capacity: string
  price: {
    weekday: number
    weekend: number
    peak: number
  }
  amenities: string[]
  image: string
}

type DayStatus = "available" | "booked" | "soldout" | "past"

// Mock data for room availability
const roomTypes: RoomType[] = [
  {
    id: "standard",
    name: "오션뷰 스탠다드",
    capacity: "기준 2인 / 최대 3인",
    price: { weekday: 120000, weekend: 150000, peak: 180000 },
    amenities: ["에어컨", "TV", "와이파이", "바베큐", "주차"],
    image: "/images/image.jpeg",
  },
  {
    id: "deluxe",
    name: "오션뷰 디럭스",
    capacity: "기준 3인 / 최대 4인",
    price: { weekday: 180000, weekend: 220000, peak: 260000 },
    amenities: ["에어컨", "TV", "와이파이", "바베큐", "주차", "테라스"],
    image: "/images/image.jpeg",
  },
  {
    id: "premium",
    name: "프리미엄 스위트",
    capacity: "기준 4인 / 최대 5인",
    price: { weekday: 250000, weekend: 300000, peak: 350000 },
    amenities: ["에어컨", "TV", "와이파이", "바베큐", "주차", "테라스", "오션뷰", "개별BBQ"],
    image: "/images/image.jpeg",
  },
]

// Mock booking data - which dates are available/booked for each room
const mockBookingData: Record<string, Record<string, DayStatus>> = {
  standard: {
    "2025-1-10": "booked",
    "2025-1-11": "booked",
    "2025-1-17": "soldout",
    "2025-1-18": "soldout",
    "2025-1-24": "booked",
    "2025-1-25": "booked",
  },
  deluxe: {
    "2025-1-10": "booked",
    "2025-1-11": "soldout",
    "2025-1-17": "booked",
    "2025-1-18": "booked",
  },
  premium: {
    "2025-1-17": "booked",
    "2025-1-18": "booked",
    "2025-1-24": "soldout",
    "2025-1-25": "soldout",
    "2025-1-31": "booked",
  },
}

export function CalendarEntity() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedRoom, setSelectedRoom] = useState<string>("standard")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showReservationForm, setShowReservationForm] = useState(false)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const startingDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
    setSelectedDate(null)
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
    setSelectedDate(null)
  }

  const getDayStatus = (day: number): DayStatus => {
    const date = new Date(year, month, day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (date < today) return "past"

    const dateKey = `${year}-${month + 1}-${day}`
    return mockBookingData[selectedRoom]?.[dateKey] || "available"
  }

  const isWeekend = (day: number): boolean => {
    const date = new Date(year, month, day)
    const dayOfWeek = date.getDay()
    return dayOfWeek === 0 || dayOfWeek === 6
  }

  const getPrice = (day: number): number => {
    const room = roomTypes.find((r) => r.id === selectedRoom)
    if (!room) return 0

    // Peak season: July, August
    if (month === 6 || month === 7) {
      return room.price.peak
    }
    return isWeekend(day) ? room.price.weekend : room.price.weekday
  }

  const handleDateClick = (day: number) => {
    const status = getDayStatus(day)
    if (status === "available") {
      setSelectedDate(new Date(year, month, day))
      setShowReservationForm(true)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price)
  }

  const selectedRoomData = roomTypes.find((r) => r.id === selectedRoom)

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">Reservation Calendar</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4 text-foreground text-balance">실시간 예약 현황</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            원하시는 객실과 날짜를 선택하여 예약하세요. 실시간으로 예약 가능 여부를 확인하실 수 있습니다.
          </p>
        </div>

        {/* Room Type Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {roomTypes.map((room) => (
            <button
              key={room.id}
              onClick={() => {
                setSelectedRoom(room.id)
                setSelectedDate(null)
                setShowReservationForm(false)
              }}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                selectedRoom === room.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {room.name}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              {/* Calendar Header */}
              <div className="flex items-center justify-between p-6 border-b border-border bg-muted/30">
                <button
                  onClick={prevMonth}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  aria-label="이전 달"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="text-xl font-bold text-card-foreground">
                  {year}년 {month + 1}월
                </h3>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  aria-label="다음 달"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {/* Days of Week */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {daysOfWeek.map((day, i) => (
                    <div
                      key={day}
                      className={`text-center text-sm font-bold py-2 ${
                        i === 0 ? "text-red-500" : i === 6 ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square" />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1
                    const status = getDayStatus(day)
                    const price = getPrice(day)
                    const date = new Date(year, month, day)
                    const dayOfWeek = date.getDay()
                    const isSelected =
                      selectedDate &&
                      selectedDate.getFullYear() === year &&
                      selectedDate.getMonth() === month &&
                      selectedDate.getDate() === day

                    return (
                      <button
                        key={day}
                        onClick={() => handleDateClick(day)}
                        disabled={status !== "available"}
                        className={`aspect-square rounded-lg p-1 flex flex-col items-center justify-center transition-all relative group
                          ${isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}
                          ${status === "available" ? "bg-emerald-50 hover:bg-emerald-100 cursor-pointer" : ""}
                          ${status === "booked" ? "bg-amber-50 cursor-not-allowed" : ""}
                          ${status === "soldout" ? "bg-red-50 cursor-not-allowed" : ""}
                          ${status === "past" ? "bg-muted/30 cursor-not-allowed opacity-50" : ""}
                        `}
                      >
                        <span
                          className={`text-sm font-semibold
                            ${dayOfWeek === 0 ? "text-red-500" : ""}
                            ${dayOfWeek === 6 ? "text-primary" : ""}
                            ${status === "past" ? "text-muted-foreground" : ""}
                            ${status === "available" && dayOfWeek !== 0 && dayOfWeek !== 6 ? "text-emerald-700" : ""}
                            ${status === "booked" ? "text-amber-700" : ""}
                            ${status === "soldout" ? "text-red-700" : ""}
                          `}
                        >
                          {day}
                        </span>
                        {status !== "past" && (
                          <span
                            className={`text-[10px] mt-0.5 hidden sm:block
                              ${status === "available" ? "text-emerald-600" : ""}
                              ${status === "booked" ? "text-amber-600" : ""}
                              ${status === "soldout" ? "text-red-600" : ""}
                            `}
                          >
                            {status === "available" && `${formatPrice(price / 10000)}만`}
                            {status === "booked" && "예약중"}
                            {status === "soldout" && "마감"}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-emerald-50 border border-emerald-200" />
                    <span className="text-xs text-muted-foreground">예약가능</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-amber-50 border border-amber-200" />
                    <span className="text-xs text-muted-foreground">예약중</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-red-50 border border-red-200" />
                    <span className="text-xs text-muted-foreground">마감</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-muted/30 border border-border" />
                    <span className="text-xs text-muted-foreground">지난날짜</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reservation Info */}
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="bg-card rounded-xl border border-border p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-card-foreground">입/퇴실 안내</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">체크인</span>
                    <span className="font-medium text-card-foreground">15:00 ~ 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">체크아웃</span>
                    <span className="font-medium text-card-foreground">오전 11:00</span>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                  </div>
                  <h4 className="font-semibold text-card-foreground">예약 안내</h4>
                </div>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    매월 20일 11:00 익월 예약 오픈
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    20분 내 결제 미완료 시 자동 취소
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Room Info & Reservation Form */}
          <div className="lg:col-span-1">
            {selectedRoomData && (
              <div className="bg-card rounded-2xl border border-border overflow-hidden sticky top-24">
                {/* Room Image */}
                <div className="aspect-video relative">
                  <img
                    src={selectedRoomData.image || "/placeholder.svg"}
                    alt={selectedRoomData.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{selectedRoomData.name}</h3>
                    <p className="text-white/80 text-sm">{selectedRoomData.capacity}</p>
                  </div>
                </div>

                <div className="p-5">
                  {/* Price Info */}
                  <div className="mb-5 p-4 bg-muted/50 rounded-xl">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">객실 요금</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">주중</span>
                        <span className="font-semibold text-card-foreground">
                          {formatPrice(selectedRoomData.price.weekday)}원
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">주말</span>
                        <span className="font-semibold text-card-foreground">
                          {formatPrice(selectedRoomData.price.weekend)}원
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">성수기</span>
                        <span className="font-semibold text-primary">{formatPrice(selectedRoomData.price.peak)}원</span>
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-5">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">편의시설</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedRoomData.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Selected Date & Booking */}
                  {showReservationForm && selectedDate ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                        <p className="text-xs text-muted-foreground mb-1">선택한 날짜</p>
                        <p className="font-bold text-primary">
                          {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일 (
                          {daysOfWeek[selectedDate.getDay()]})
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          1박 요금:{" "}
                          <span className="font-semibold text-card-foreground">
                            {formatPrice(getPrice(selectedDate.getDate()))}원
                          </span>
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-card-foreground">숙박 인원</label>
                        <select className="w-full p-3 rounded-lg border border-border bg-background text-foreground">
                          <option>2명</option>
                          <option>3명</option>
                          <option>4명</option>
                          <option>5명 이상 (추가요금)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-card-foreground">숙박 일수</label>
                        <select className="w-full p-3 rounded-lg border border-border bg-background text-foreground">
                          <option>1박</option>
                          <option>2박</option>
                          <option>3박</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        결제 완료 시 예약이 확정됩니다.
                      </div>

                      <Button className="w-full" size="lg">
                        {formatPrice(getPrice(selectedDate.getDate()))}원 결제하기
                      </Button>

                      <button
                        onClick={() => {
                          setSelectedDate(null)
                          setShowReservationForm(false)
                        }}
                        className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        다른 날짜 선택
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <div className="w-12 h-12 rounded-full bg-muted mx-auto mb-3 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground text-sm">캘린더에서 원하시는 날짜를 선택해주세요</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
