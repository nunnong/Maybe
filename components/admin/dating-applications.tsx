"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye, CheckCircle, XCircle, CreditCard, Phone, Mail } from "lucide-react"

type ApplicationStatus = "pending" | "reviewing" | "approved" | "payment_pending" | "completed" | "rejected"

interface Application {
  id: number
  name: string
  age: number
  gender: string
  phone: string
  email: string
  region: string
  job: string
  education: string
  month: string
  intro: string
  status: ApplicationStatus
  appliedAt: string
}

const mockApplications: Application[] = [
  {
    id: 1,
    name: "김민지",
    age: 28,
    gender: "여",
    phone: "010-1234-5678",
    email: "minji@email.com",
    region: "서울",
    job: "마케터",
    education: "대졸",
    month: "2025년 7월",
    intro: "새로운 인연을 찾고 있어요. 바다를 좋아하고 여행을 즐깁니다.",
    status: "pending",
    appliedAt: "2025.06.08 14:30",
  },
  {
    id: 2,
    name: "이준호",
    age: 31,
    gender: "남",
    phone: "010-2345-6789",
    email: "junho@email.com",
    region: "경기",
    job: "개발자",
    education: "대졸",
    month: "2025년 7월",
    intro: "진지한 만남을 원합니다. 취미는 등산과 요리입니다.",
    status: "reviewing",
    appliedAt: "2025.06.07 11:20",
  },
  {
    id: 3,
    name: "박서연",
    age: 26,
    gender: "여",
    phone: "010-3456-7890",
    email: "seoyeon@email.com",
    region: "인천",
    job: "디자이너",
    education: "대졸",
    month: "2025년 8월",
    intro: "재미있고 유쾌한 분을 만나고 싶어요!",
    status: "approved",
    appliedAt: "2025.06.06 09:15",
  },
  {
    id: 4,
    name: "최현우",
    age: 29,
    gender: "남",
    phone: "010-4567-8901",
    email: "hyunwoo@email.com",
    region: "서울",
    job: "회계사",
    education: "대졸",
    month: "2025년 7월",
    intro: "성실하고 책임감 있는 만남을 원합니다.",
    status: "payment_pending",
    appliedAt: "2025.06.05 16:45",
  },
  {
    id: 5,
    name: "정수아",
    age: 27,
    gender: "여",
    phone: "010-5678-9012",
    email: "sua@email.com",
    region: "부산",
    job: "간호사",
    education: "대졸",
    month: "2025년 7월",
    intro: "따뜻한 마음을 가진 분과 만나고 싶어요.",
    status: "completed",
    appliedAt: "2025.06.01 10:00",
  },
]

const statusConfig: Record<ApplicationStatus, { label: string; color: string }> = {
  pending: { label: "신청접수", color: "bg-gray-100 text-gray-700" },
  reviewing: { label: "검토중", color: "bg-yellow-100 text-yellow-700" },
  approved: { label: "승인완료", color: "bg-green-100 text-green-700" },
  payment_pending: { label: "결제대기", color: "bg-blue-100 text-blue-700" },
  completed: { label: "결제완료", color: "bg-primary/10 text-primary" },
  rejected: { label: "반려", color: "bg-red-100 text-red-700" },
}

export function DatingApplications() {
  const [applications, setApplications] = useState<Application[]>(mockApplications)
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredApps = applications.filter((app) => {
    const matchesSearch = app.name.includes(searchTerm) || app.phone.includes(searchTerm)
    const matchesFilter = filterStatus === "all" || app.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleStatusChange = (id: number, newStatus: ApplicationStatus) => {
    setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app)))
    if (selectedApp?.id === id) {
      setSelectedApp({ ...selectedApp, status: newStatus })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">소개팅 신청 관리</h1>
        <p className="text-muted-foreground">신청서를 검토하고 승인 여부를 결정하세요.</p>
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
        <div className="flex gap-2 flex-wrap">
          {[
            { value: "all", label: "전체" },
            { value: "pending", label: "신청접수" },
            { value: "reviewing", label: "검토중" },
            { value: "approved", label: "승인완료" },
            { value: "payment_pending", label: "결제대기" },
            { value: "completed", label: "결제완료" },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applications List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>신청 목록 ({filteredApps.length}건)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredApps.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedApp?.id === app.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-lg font-bold text-primary">{app.gender}</span>
                        </div>
                        <div>
                          <p className="font-medium">
                            {app.name} ({app.age}세)
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {app.region} · {app.job} · {app.month} 희망
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded-full ${statusConfig[app.status].color}`}>
                          {statusConfig[app.status].label}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">{app.appliedAt}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Application Detail */}
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>신청서 상세</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedApp ? (
                <div className="space-y-4">
                  <div className="text-center pb-4 border-b border-border">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-primary">{selectedApp.gender}</span>
                    </div>
                    <h3 className="text-lg font-bold">{selectedApp.name}</h3>
                    <p className="text-muted-foreground">
                      {selectedApp.age}세 · {selectedApp.region}
                    </p>
                    <span
                      className={`inline-block text-xs px-2 py-1 rounded-full mt-2 ${
                        statusConfig[selectedApp.status].color
                      }`}
                    >
                      {statusConfig[selectedApp.status].label}
                    </span>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedApp.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedApp.email}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <div className="p-2 bg-muted rounded">
                        <p className="text-xs text-muted-foreground">직업</p>
                        <p className="font-medium">{selectedApp.job}</p>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <p className="text-xs text-muted-foreground">학력</p>
                        <p className="font-medium">{selectedApp.education}</p>
                      </div>
                      <div className="p-2 bg-muted rounded col-span-2">
                        <p className="text-xs text-muted-foreground">희망 참여 월</p>
                        <p className="font-medium">{selectedApp.month}</p>
                      </div>
                    </div>
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground mb-1">자기소개</p>
                      <p className="p-3 bg-muted rounded text-sm">{selectedApp.intro}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-border space-y-2">
                    {selectedApp.status === "pending" && (
                      <Button className="w-full" onClick={() => handleStatusChange(selectedApp.id, "reviewing")}>
                        <Eye className="w-4 h-4 mr-2" />
                        검토 시작
                      </Button>
                    )}
                    {selectedApp.status === "reviewing" && (
                      <>
                        <Button className="w-full" onClick={() => handleStatusChange(selectedApp.id, "approved")}>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          승인하기
                        </Button>
                        <Button
                          variant="destructive"
                          className="w-full"
                          onClick={() => handleStatusChange(selectedApp.id, "rejected")}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          반려하기
                        </Button>
                      </>
                    )}
                    {selectedApp.status === "approved" && (
                      <Button className="w-full" onClick={() => handleStatusChange(selectedApp.id, "payment_pending")}>
                        <CreditCard className="w-4 h-4 mr-2" />
                        결제 요청 보내기
                      </Button>
                    )}
                    {selectedApp.status === "payment_pending" && (
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => handleStatusChange(selectedApp.id, "completed")}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        결제 확인 완료
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>신청서를 선택하면</p>
                  <p>상세 내용을 확인할 수 있습니다.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
