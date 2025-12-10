"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  Heart,
  Calendar,
  CreditCard,
  User,
  Settings,
  LogOut,
  ChevronRight,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react"
import Link from "next/link"

// 소개팅 신청 목데이터
const datingApplications = [
  {
    id: 1,
    month: "2025년 7월",
    status: "결제완료",
    appliedAt: "2025-06-01",
    paidAt: "2025-06-10",
    amount: 150000,
    matchInfo: {
      name: "김**",
      age: 28,
      matchDate: "2025-07-15",
    },
  },
  {
    id: 2,
    month: "2025년 8월",
    status: "승인완료",
    appliedAt: "2025-06-15",
    paidAt: null,
    amount: 150000,
    matchInfo: null,
  },
  {
    id: 3,
    month: "2025년 9월",
    status: "검토중",
    appliedAt: "2025-06-20",
    paidAt: null,
    amount: null,
    matchInfo: null,
  },
]

// 펜션 예약 목데이터
const pensionReservations = [
  {
    id: 1,
    roomType: "스위트룸",
    checkIn: "2025-07-20",
    checkOut: "2025-07-22",
    guests: 4,
    status: "결제완료",
    amount: 380000,
    paidAt: "2025-06-10",
  },
  {
    id: 2,
    roomType: "디럭스룸",
    checkIn: "2025-08-10",
    checkOut: "2025-08-11",
    guests: 2,
    status: "결제완료",
    amount: 150000,
    paidAt: "2025-06-18",
  },
]

// 결제 내역 목데이터
const paymentHistory = [
  {
    id: 1,
    type: "펜션예약",
    description: "스위트룸 2박",
    amount: 380000,
    date: "2025-06-10",
    method: "카카오페이",
  },
  {
    id: 2,
    type: "펜션예약",
    description: "디럭스룸 1박",
    amount: 150000,
    date: "2025-06-18",
    method: "신용카드",
  },
  {
    id: 3,
    type: "소개팅",
    description: "2025년 7월 프로그램",
    amount: 150000,
    date: "2025-06-10",
    method: "카카오페이",
  },
]

const statusStyles: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  신청접수: { bg: "bg-muted", text: "text-muted-foreground", icon: <Clock className="w-3 h-3" /> },
  검토중: { bg: "bg-amber-100", text: "text-amber-700", icon: <Loader2 className="w-3 h-3 animate-spin" /> },
  승인완료: { bg: "bg-blue-100", text: "text-blue-700", icon: <CheckCircle2 className="w-3 h-3" /> },
  결제대기: { bg: "bg-orange-100", text: "text-orange-700", icon: <AlertCircle className="w-3 h-3" /> },
  결제완료: { bg: "bg-green-100", text: "text-green-700", icon: <CheckCircle2 className="w-3 h-3" /> },
}

export function MyPageDashboard() {
  const [activeTab, setActiveTab] = useState("dating")

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-primary fill-primary" />
              <span className="text-xl font-bold text-foreground">바다愛</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  홈으로
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src="/abstract-profile.png" />
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary">홍</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold text-foreground">홍길동</h2>
                  <p className="text-sm text-muted-foreground">hong@example.com</p>
                  <Badge className="mt-2 bg-primary/10 text-primary border-0">일반 회원</Badge>
                </div>

                <div className="mt-6 pt-6 border-t border-border space-y-2">

                  <button
                    onClick={() => setActiveTab("dating")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === "dating" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    <Heart className="w-4 h-4" />
                    소개팅 신청 내역
                  </button>
                  <button
                    onClick={() => setActiveTab("pension")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === "pension" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    펜션 예약 내역
                  </button>
                  <button
                    onClick={() => setActiveTab("payments")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === "payments" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    결제 내역
                  </button>
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === "profile" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    프로필 수정
                  </button>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === "settings" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    설정
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            
                {/* Recent Dating Applications */}
                {/* <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">최근 소개팅 신청</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("dating")}>
                      전체보기
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {datingApplications.slice(0, 2).map((app) => (
                        <div key={app.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Heart className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{app.month} 프로그램</p>
                              <p className="text-sm text-muted-foreground">신청일: {app.appliedAt}</p>
                            </div>
                          </div>
                          <Badge
                            className={`${statusStyles[app.status]?.bg} ${statusStyles[app.status]?.text} border-0`}
                          >
                            {statusStyles[app.status]?.icon}
                            <span className="ml-1">{app.status}</span>
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card> */}

                {/* Recent Pension Reservations */}
                {/* <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">최근 펜션 예약</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("pension")}>
                      전체보기
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pensionReservations.slice(0, 2).map((res) => (
                        <div key={res.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <MapPin className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{res.roomType}</p>
                              <p className="text-sm text-muted-foreground">
                                {res.checkIn} ~ {res.checkOut} ({res.guests}인)
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-foreground">{res.amount.toLocaleString()}원</p>
                            <Badge className="bg-green-100 text-green-700 border-0">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              {res.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card> */}

            {/* Dating Applications Tab */}
            {activeTab === "dating" && (
              <Card>
                <CardHeader>
                  <CardTitle>소개팅 신청 내역</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {datingApplications.map((app) => (
                      <div key={app.id} className="border border-border rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-foreground">{app.month} 프로그램</h3>
                            <p className="text-sm text-muted-foreground">신청일: {app.appliedAt}</p>
                          </div>
                          <Badge
                            className={`${statusStyles[app.status]?.bg} ${statusStyles[app.status]?.text} border-0`}
                          >
                            {statusStyles[app.status]?.icon}
                            <span className="ml-1">{app.status}</span>
                          </Badge>
                        </div>

                        {/* Progress */}
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-muted-foreground mb-2">
                            <span>신청접수</span>
                            <span>검토중</span>
                            <span>승인완료</span>
                            <span>결제</span>
                            <span>매칭</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{
                                width:
                                  app.status === "신청접수"
                                    ? "10%"
                                    : app.status === "검토중"
                                      ? "30%"
                                      : app.status === "승인완료"
                                        ? "50%"
                                        : app.status === "결제대기"
                                          ? "70%"
                                          : "100%",
                              }}
                            />
                          </div>
                        </div>

                        {/* Match Info (if available) */}
                        {app.matchInfo && (
                          <div className="bg-primary/5 rounded-lg p-4 mb-4">
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">소개팅 날짜</p>
                                <p className="font-medium">{app.matchInfo.matchDate}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">장소</p>
                                <p className="font-medium">바다愛 펜션</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Payment Info */}
                        <div className="flex items-center justify-between">
                          <div>
                            {app.paidAt ? (
                              <p className="text-sm text-muted-foreground">결제일: {app.paidAt}</p>
                            ) : app.status === "승인완료" ? (
                              <p className="text-sm text-orange-600">결제가 필요합니다</p>
                            ) : (
                              <p className="text-sm text-muted-foreground">승인 후 결제 진행</p>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            {app.amount && (
                              <span className="font-bold text-foreground">{app.amount.toLocaleString()}원</span>
                            )}
                            {app.status === "승인완료" && <Button size="sm">결제하기</Button>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Pension Reservations Tab */}
            {activeTab === "pension" && (
              <Card>
                <CardHeader>
                  <CardTitle>펜션 예약 내역</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pensionReservations.map((res) => (
                      <div key={res.id} className="border border-border rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-foreground">{res.roomType}</h3>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {res.checkIn} ~ {res.checkOut}
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                {res.guests}인
                              </span>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-700 border-0">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            {res.status}
                          </Badge>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-4 mb-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">체크인</p>
                              <p className="font-medium">{res.checkIn} 15:00</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">체크아웃</p>
                              <p className="font-medium">{res.checkOut} 11:00</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">인원</p>
                              <p className="font-medium">기준 {res.guests}인</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">결제일</p>
                              <p className="font-medium">{res.paidAt}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 inline mr-1" />
                            강원도 삼척시 근덕면 용화해변길
                          </p>
                          <span className="text-lg font-bold text-foreground">{res.amount.toLocaleString()}원</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payments Tab */}
            {activeTab === "payments" && (
              <Card>
                <CardHeader>
                  <CardTitle>결제 내역</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">날짜</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">유형</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">내용</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">결제수단</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">금액</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paymentHistory.map((payment) => (
                          <tr key={payment.id} className="border-b border-border hover:bg-muted/50">
                            <td className="py-4 px-4 text-sm">{payment.date}</td>
                            <td className="py-4 px-4">
                              <Badge
                                variant="outline"
                                className={
                                  payment.type === "소개팅"
                                    ? "border-pink-300 text-pink-600"
                                    : "border-blue-300 text-blue-600"
                                }
                              >
                                {payment.type}
                              </Badge>
                            </td>
                            <td className="py-4 px-4 text-sm font-medium">{payment.description}</td>
                            <td className="py-4 px-4 text-sm text-muted-foreground">{payment.method}</td>
                            <td className="py-4 px-4 text-sm font-bold text-right">
                              {payment.amount.toLocaleString()}원
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-muted/50">
                          <td colSpan={4} className="py-4 px-4 text-sm font-bold">
                            총 결제금액
                          </td>
                          <td className="py-4 px-4 text-lg font-bold text-right text-primary">
                            {paymentHistory.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}원
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle>프로필 수정</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="flex items-center gap-6">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src="/abstract-profile.png" />
                        <AvatarFallback className="text-2xl bg-primary/10 text-primary">홍</AvatarFallback>
                      </Avatar>
                      <Button variant="outline">프로필 사진 변경</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">이름</label>
                        <input
                          type="text"
                          defaultValue="홍길동"
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">연락처</label>
                        <input
                          type="tel"
                          defaultValue="010-1234-5678"
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">이메일</label>
                        <input
                          type="email"
                          defaultValue="hong@example.com"
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">생년월일</label>
                        <input
                          type="date"
                          defaultValue="1995-01-15"
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button variant="outline">취소</Button>
                      <Button>저장하기</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <Card>
                <CardHeader>
                  <CardTitle>설정</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">알림 설정</h4>
                      <p className="text-sm text-muted-foreground">이메일 및 SMS 알림을 받습니다</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">마케팅 수신 동의</h4>
                      <p className="text-sm text-muted-foreground">이벤트 및 프로모션 정보를 받습니다</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <h4 className="font-medium text-foreground mb-4">계정 관리</h4>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        비밀번호 변경
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-destructive hover:text-destructive bg-transparent"
                      >
                        회원 탈퇴
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
