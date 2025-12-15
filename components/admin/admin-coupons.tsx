"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Ticket, Plus, Search, Copy, Trash2, Calendar, Percent, DollarSign, User, Gift } from "lucide-react"

interface Coupon {
  id: number
  code: string
  name: string
  type: "percentage" | "fixed"
  value: number
  minAmount?: number
  maxDiscount?: number
  validFrom: string
  validUntil: string
  usageLimit?: number
  usedCount: number
  status: "active" | "inactive" | "expired"
  createdAt: string
}

const mockCoupons: Coupon[] = [
  {
    id: 1,
    code: "WELCOME10",
    name: "신규 회원 10% 할인",
    type: "percentage",
    value: 10,
    minAmount: 50000,
    maxDiscount: 20000,
    validFrom: "2025-01-01",
    validUntil: "2025-12-31",
    usageLimit: 100,
    usedCount: 45,
    status: "active",
    createdAt: "2025-01-01",
  },
  {
    id: 2,
    code: "SUMMER5000",
    name: "여름 시즌 5,000원 할인",
    type: "fixed",
    value: 5000,
    minAmount: 100000,
    validFrom: "2025-06-01",
    validUntil: "2025-08-31",
    usageLimit: 50,
    usedCount: 12,
    status: "active",
    createdAt: "2025-05-15",
  },
  {
    id: 3,
    code: "FIRST30000",
    name: "첫 예약 30,000원 할인",
    type: "fixed",
    value: 30000,
    minAmount: 150000,
    validFrom: "2025-01-01",
    validUntil: "2025-03-31",
    usageLimit: 30,
    usedCount: 30,
    status: "expired",
    createdAt: "2024-12-20",
  },
]

export function AdminCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons)
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showIssueForm, setShowIssueForm] = useState(false)
  const [issueUserId, setIssueUserId] = useState("")
  const [selectedCouponId, setSelectedCouponId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    type: "percentage" as "percentage" | "fixed",
    value: "",
    minAmount: "",
    maxDiscount: "",
    validFrom: "",
    validUntil: "",
    usageLimit: "",
  })

  const handleCreateCoupon = () => {
    const newCoupon: Coupon = {
      id: coupons.length + 1,
      code: formData.code.toUpperCase(),
      name: formData.name,
      type: formData.type,
      value: Number(formData.value),
      minAmount: formData.minAmount ? Number(formData.minAmount) : undefined,
      maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : undefined,
      validFrom: formData.validFrom,
      validUntil: formData.validUntil,
      usageLimit: formData.usageLimit ? Number(formData.usageLimit) : undefined,
      usedCount: 0,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    }

    setCoupons([...coupons, newCoupon])
    setShowCreateForm(false)
    setFormData({
      name: "",
      code: "",
      type: "percentage",
      value: "",
      minAmount: "",
      maxDiscount: "",
      validFrom: "",
      validUntil: "",
      usageLimit: "",
    })
  }

  const handleDeleteCoupon = (id: number) => {
    if (confirm("쿠폰을 삭제하시겠습니까?")) {
      setCoupons(coupons.filter((c) => c.id !== id))
    }
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    alert(`쿠폰 코드 "${code}"가 클립보드에 복사되었습니다.`)
  }

  const filteredCoupons = coupons.filter(
    (coupon) =>
      coupon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const generateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let code = ""
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setFormData({ ...formData, code })
  }

  const issueCouponToUser = (couponId: number, userId: string) => {
    const coupon = coupons.find((c) => c.id === couponId)
    if (!coupon) {
      alert("선택한 쿠폰을 찾을 수 없습니다.")
      return
    }

    if (coupon.status !== "active") {
      alert("활성화된 쿠폰만 발급할 수 있습니다.")
      return
    }

    // 실제로는 API 호출로 사용자의 쿠폰함에 쿠폰 추가
    if (confirm(`사용자 ID "${userId}"에게 쿠폰 "${coupon.name}" (${coupon.code})을(를) 발급하시겠습니까?`)) {
      // API 호출 시뮬레이션
      alert(`쿠폰이 성공적으로 발급되었습니다!\n사용자 ID: ${userId}\n쿠폰: ${coupon.name} (${coupon.code})`)
      
      // 발급 후 폼 초기화
      setIssueUserId("")
      setSelectedCouponId(null)
      setShowIssueForm(false)
      
      // 쿠폰 사용 횟수 증가 (실제로는 서버에서 처리)
      setCoupons(
        coupons.map((c) =>
          c.id === couponId ? { ...c, usedCount: c.usedCount + 1 } : c
        )
      )
    }
  }

  const handleIssueCoupon = () => {
    const userId = issueUserId.trim()
    if (!userId) {
      alert("사용자 ID를 입력해주세요.")
      return
    }
    if (!selectedCouponId) {
      alert("발급할 쿠폰을 선택해주세요.")
      return
    }
    issueCouponToUser(selectedCouponId, userId)
  }

  const handleQuickIssue = (couponId: number) => {
    const userId = prompt("사용자 ID를 입력하세요:")
    if (userId) {
      issueCouponToUser(couponId, userId)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">쿠폰 발급 관리</h1>
          <p className="text-muted-foreground">쿠폰을 생성하고 발급 내역을 관리하세요.</p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="w-4 h-4 mr-2" />
          쿠폰 생성
        </Button>
      </div>

      {/* 쿠폰 사용자에게 발급 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5" />
            쿠폰 사용자 발급
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">사용자 ID</label>
              <Input
                placeholder="사용자 ID를 입력하세요"
                value={issueUserId}
                onChange={(e) => setIssueUserId(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">발급할 쿠폰 선택</label>
              <select
                value={selectedCouponId || ""}
                onChange={(e) => setSelectedCouponId(e.target.value ? Number(e.target.value) : null)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">쿠폰을 선택하세요</option>
                {coupons
                  .filter((c) => c.status === "active")
                  .map((coupon) => (
                    <option key={coupon.id} value={coupon.id}>
                      {coupon.name} ({coupon.code})
                    </option>
                  ))}
              </select>
            </div>
            <Button onClick={() => handleIssueCoupon()} className="w-full">
              <Gift className="w-4 h-4 mr-2" />
              쿠폰 발급
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Create Coupon Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>새 쿠폰 생성</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">쿠폰 이름</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="예: 신규 회원 할인"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">쿠폰 코드</label>
                <div className="flex gap-2">
                  <Input
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="WELCOME10"
                    className="uppercase"
                  />
                  <Button variant="outline" onClick={generateCode}>
                    생성
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">할인 유형</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as "percentage" | "fixed" })}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="percentage">퍼센트 할인</option>
                  <option value="fixed">정액 할인</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  할인 금액 {formData.type === "percentage" ? "(%)" : "(원)"}
                </label>
                <Input
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder={formData.type === "percentage" ? "10" : "5000"}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">최소 사용 금액 (원)</label>
                <Input
                  type="number"
                  value={formData.minAmount}
                  onChange={(e) => setFormData({ ...formData, minAmount: e.target.value })}
                  placeholder="50000"
                />
              </div>
              {formData.type === "percentage" && (
                <div>
                  <label className="block text-sm font-medium mb-2">최대 할인 금액 (원)</label>
                  <Input
                    type="number"
                    value={formData.maxDiscount}
                    onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                    placeholder="20000"
                  />
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">유효 시작일</label>
                <Input
                  type="date"
                  value={formData.validFrom}
                  onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">유효 종료일</label>
                <Input
                  type="date"
                  value={formData.validUntil}
                  onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">사용 제한 횟수 (선택)</label>
              <Input
                type="number"
                value={formData.usageLimit}
                onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                placeholder="100 (비워두면 무제한)"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreateCoupon} className="flex-1">
                쿠폰 생성
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                취소
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="쿠폰 이름 또는 코드로 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Coupons List */}
      <div className="grid gap-4">
        {filteredCoupons.map((coupon) => (
          <Card key={coupon.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Ticket className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-foreground">{coupon.name}</h3>
                    <Badge
                      className={
                        coupon.status === "active"
                          ? "bg-green-100 text-green-700"
                          : coupon.status === "expired"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-red-100 text-red-700"
                      }
                    >
                      {coupon.status === "active" ? "활성" : coupon.status === "expired" ? "만료" : "비활성"}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <code className="px-3 py-1 bg-muted rounded-md font-mono text-sm font-bold">
                        {coupon.code}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyCode(coupon.code)}
                        className="h-7"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {coupon.type === "percentage" ? (
                        <>
                          <Percent className="w-4 h-4" />
                          <span>{coupon.value}% 할인</span>
                        </>
                      ) : (
                        <>
                          <DollarSign className="w-4 h-4" />
                          <span>{coupon.value.toLocaleString()}원 할인</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {coupon.validFrom} ~ {coupon.validUntil}
                      </span>
                    </div>
                    <div className="text-muted-foreground">
                      최소 금액: {coupon.minAmount?.toLocaleString() || "없음"}원
                    </div>
                    <div className="text-muted-foreground">
                      사용: {coupon.usedCount} / {coupon.usageLimit || "∞"}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteCoupon(coupon.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCoupons.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Ticket className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">쿠폰이 없습니다.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
