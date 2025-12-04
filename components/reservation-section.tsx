"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Check, Users, Heart, User, Briefcase, MapPin, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"]

type ReservationType = "pension" | "dating"

const months = [
  { value: 1, label: "1월" },
  { value: 2, label: "2월" },
  { value: 3, label: "3월" },
  { value: 4, label: "4월" },
  { value: 5, label: "5월" },
  { value: 6, label: "6월" },
  { value: 7, label: "7월" },
  { value: 8, label: "8월" },
  { value: 9, label: "9월" },
  { value: 10, label: "10월" },
  { value: 11, label: "11월" },
  { value: 12, label: "12월" },
]

export function ReservationSection() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [reservationType, setReservationType] = useState<ReservationType>("dating")

  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const startingDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const isAvailable = (day: number) => {
    const date = new Date(year, month, day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (date < today) return false

    // Pension only: available every day
    return true
  }

  const isSelected = (day: number) => {
    if (!selectedDate) return false
    return selectedDate.getFullYear() === year && selectedDate.getMonth() === month && selectedDate.getDate() === day
  }

  const handleDateClick = (day: number) => {
    if (isAvailable(day)) {
      setSelectedDate(new Date(year, month, day))
    }
  }

  const handleTypeChange = (type: ReservationType) => {
    setReservationType(type)
    setSelectedDate(null)
  }

  const currentYear = new Date().getFullYear()
  const availableYears = [currentYear, currentYear + 1]

  return (
    <section id="reservation" className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">Reservation</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4 text-foreground text-balance">예약하기</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            소개팅 프로그램 또는 일반 펜션 숙박을 예약하실 수 있습니다.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-10">
          <div className="flex p-1 bg-muted rounded-xl">
            <button
              onClick={() => handleTypeChange("dating")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
                reservationType === "dating"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Heart className="w-4 h-4" />
              소개팅 프로그램
            </button>
            <button
              onClick={() => handleTypeChange("pension")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
                reservationType === "pension"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="w-4 h-4" />
              일반 펜션 예약
            </button>
          </div>
        </div>

        {reservationType === "dating" ? (
          // Dating Program Application Form
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-card-foreground mb-2">소개팅 프로그램 신청서</h3>
                <p className="text-muted-foreground text-sm">
                  신청서 작성 후 운영자 검증을 거쳐 프로그램에 참여하실 수 있습니다.
                </p>
              </div>

              {/* Application Process Steps */}
              <div className="flex items-center justify-center gap-4 mb-8 p-4 bg-muted/50 rounded-xl">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <span className="text-xs mt-1 text-muted-foreground">신청서 작성</span>
                </div>
                <div className="w-8 h-px bg-border" />
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <span className="text-xs mt-1 text-muted-foreground">운영자 연락</span>
                </div>
                <div className="w-8 h-px bg-border" />
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <span className="text-xs mt-1 text-muted-foreground">본인 검증</span>
                </div>
                <div className="w-8 h-px bg-border" />
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <span className="text-xs mt-1 text-muted-foreground">매칭 & 참여</span>
                </div>
              </div>

              <form className="space-y-6">
                {/* Month Selection */}
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                  <label className="block text-sm font-medium mb-3 text-card-foreground">참여 희망 월 선택</label>
                  <div className="flex gap-3">
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(Number(e.target.value))}
                      className="flex-1 p-3 rounded-lg border border-border bg-background text-foreground"
                    >
                      {availableYears.map((y) => (
                        <option key={y} value={y}>
                          {y}년
                        </option>
                      ))}
                    </select>
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(Number(e.target.value))}
                      className="flex-1 p-3 rounded-lg border border-border bg-background text-foreground"
                    >
                      {months.map((m) => (
                        <option key={m.value} value={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2 text-card-foreground">
                      <User className="w-4 h-4" />
                      이름
                    </label>
                    <input
                      type="text"
                      placeholder="실명을 입력해주세요"
                      className="w-full p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2 text-card-foreground">
                      <User className="w-4 h-4" />
                      성별
                    </label>
                    <select className="w-full p-3 rounded-lg border border-border bg-background text-foreground">
                      <option value="">성별 선택</option>
                      <option value="male">남성</option>
                      <option value="female">여성</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-card-foreground">출생년도</label>
                    <select className="w-full p-3 rounded-lg border border-border bg-background text-foreground">
                      <option value="">출생년도 선택</option>
                      {Array.from({ length: 15 }, (_, i) => currentYear - 20 - i).map((y) => (
                        <option key={y} value={y}>
                          {y}년
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-card-foreground">연락처</label>
                    <input
                      type="tel"
                      placeholder="010-0000-0000"
                      className="w-full p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2 text-card-foreground">
                      <MapPin className="w-4 h-4" />
                      거주 지역
                    </label>
                    <input
                      type="text"
                      placeholder="예: 서울 강남구"
                      className="w-full p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2 text-card-foreground">
                      <Briefcase className="w-4 h-4" />
                      직업
                    </label>
                    <input
                      type="text"
                      placeholder="직업을 입력해주세요"
                      className="w-full p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2 text-card-foreground">
                    <GraduationCap className="w-4 h-4" />
                    최종 학력
                  </label>
                  <select className="w-full p-3 rounded-lg border border-border bg-background text-foreground">
                    <option value="">학력 선택</option>
                    <option value="high">고졸</option>
                    <option value="college">전문대졸</option>
                    <option value="university">대졸</option>
                    <option value="master">석사</option>
                    <option value="phd">박사</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-card-foreground">자기소개 및 이상형</label>
                  <textarea
                    rows={4}
                    placeholder="간단한 자기소개와 원하시는 이상형에 대해 적어주세요"
                    className="w-full p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-card-foreground">패키지 선택</label>
                  <select className="w-full p-3 rounded-lg border border-border bg-background text-foreground">
                    <option>기본 패키지 (매칭 시 99,000원)</option>
                    <option>프리미엄 패키지 (매칭 시 149,000원)</option>
                    <option>VIP 패키지 (매칭 시 249,000원)</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground mb-4">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>신청서 제출 후 운영자가 연락드립니다. 검증 완료 후 매칭 시에만 결제가 진행됩니다.</span>
                  </div>
                  <Button className="w-full" size="lg">
                    <Heart className="w-4 h-4 mr-2" />
                    신청서 제출하기
                  </Button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          // Pension Reservation with Calendar (original logic)
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Calendar */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={prevMonth}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    aria-label="이전 달"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h3 className="text-lg font-semibold text-card-foreground">
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

                {/* Days of Week */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {daysOfWeek.map((day, i) => (
                    <div
                      key={day}
                      className={`text-center text-sm font-medium py-2 ${
                        i === 0 ? "text-red-500" : i === 6 ? "text-blue-500" : "text-muted-foreground"
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square" />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1
                    const available = isAvailable(day)
                    const selected = isSelected(day)
                    const date = new Date(year, month, day)
                    const dayOfWeek = date.getDay()

                    return (
                      <button
                        key={day}
                        onClick={() => handleDateClick(day)}
                        disabled={!available}
                        className={`aspect-square rounded-lg text-sm font-medium transition-all
                          ${selected ? "bg-primary text-primary-foreground" : ""}
                          ${available && !selected ? "bg-primary/10 text-primary hover:bg-primary/20" : ""}
                          ${!available ? "text-muted-foreground/50 cursor-not-allowed" : ""}
                          ${dayOfWeek === 0 && !selected && !available ? "text-red-500/50" : ""}
                          ${dayOfWeek === 0 && !selected && available ? "text-red-500" : ""}
                          ${dayOfWeek === 6 && !selected && available ? "text-primary" : ""}
                        `}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-primary/10" />
                    <span className="text-xs text-muted-foreground">예약 가능</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-primary" />
                    <span className="text-xs text-muted-foreground">선택됨</span>
                  </div>
                </div>
              </div>

              {/* Pension Reservation Form */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-lg font-semibold mb-6 text-card-foreground">펜션 숙박 예약</h3>

                {selectedDate ? (
                  <div className="space-y-6">
                    <div className="p-4 bg-primary/10 rounded-xl">
                      <p className="text-sm text-muted-foreground mb-1">선택한 날짜</p>
                      <p className="text-lg font-semibold text-primary">
                        {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일 (
                        {daysOfWeek[selectedDate.getDay()]})
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-card-foreground">숙박 인원</label>
                        <select className="w-full p-3 rounded-lg border border-border bg-background text-foreground">
                          <option>2명</option>
                          <option>3명</option>
                          <option>4명</option>
                          <option>5명 이상</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-card-foreground">숙박 일수</label>
                        <select className="w-full p-3 rounded-lg border border-border bg-background text-foreground">
                          <option>1박</option>
                          <option>2박</option>
                          <option>3박</option>
                          <option>4박 이상</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-card-foreground">객실 선택</label>
                        <select className="w-full p-3 rounded-lg border border-border bg-background text-foreground">
                          <option>오션뷰 스탠다드 (1박 120,000원~)</option>
                          <option>오션뷰 디럭스 (1박 180,000원~)</option>
                          <option>프리미엄 스위트 (1박 250,000원~)</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>예약 확정 후 결제가 진행됩니다</span>
                      </div>
                      <Button className="w-full" size="lg">
                        펜션 예약하기
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    <p className="text-center">
                      왼쪽 달력에서
                      <br />
                      원하시는 날짜를 선택해주세요
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
