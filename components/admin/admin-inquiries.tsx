"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Send, Clock } from "lucide-react"

interface Inquiry {
  id: number
  name: string
  message: string
  createdAt: string
  replied: boolean
  reply?: string
  repliedAt?: string
}

const mockInquiries: Inquiry[] = [
  {
    id: 1,
    name: "홍길동",
    message: "소개팅 프로그램 참여 조건이 궁금합니다. 나이 제한이 있나요?",
    createdAt: "2025.06.08 15:30",
    replied: false,
  },
  {
    id: 2,
    name: "김영희",
    message: "펜션 예약 취소 시 환불 규정이 어떻게 되나요?",
    createdAt: "2025.06.07 11:20",
    replied: true,
    reply:
      "안녕하세요! 체크인 7일 전까지 100% 환불, 3일 전까지 50% 환불, 이후에는 환불이 어렵습니다. 추가 문의사항 있으시면 말씀해 주세요!",
    repliedAt: "2025.06.07 14:00",
  },
  {
    id: 3,
    name: "박철수",
    message: "주차 공간이 있나요? 차량 몇 대까지 가능한가요?",
    createdAt: "2025.06.06 09:45",
    replied: false,
  },
]

export function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(mockInquiries)
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [replyText, setReplyText] = useState("")

  const handleReply = () => {
    if (!selectedInquiry || !replyText.trim()) return

    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === selectedInquiry.id
          ? { ...inq, replied: true, reply: replyText, repliedAt: new Date().toLocaleString("ko-KR") }
          : inq,
      ),
    )
    setSelectedInquiry({ ...selectedInquiry, replied: true, reply: replyText })
    setReplyText("")
  }

  const unrepliedCount = inquiries.filter((i) => !i.replied).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">1:1 문의 관리</h1>
        <p className="text-muted-foreground">
          고객 문의에 답변하세요. 미답변 문의: <span className="text-primary font-bold">{unrepliedCount}건</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inquiry List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              문의 목록
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {inquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  onClick={() => setSelectedInquiry(inquiry)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedInquiry?.id === inquiry.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{inquiry.name}</p>
                        {!inquiry.replied && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600">미답변</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{inquiry.message}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {inquiry.createdAt}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reply Section */}
        <Card className="sticky top-6">
          <CardHeader>
            <CardTitle>문의 상세 및 답변</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedInquiry ? (
              <div className="space-y-4">
                {/* Original Message */}
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{selectedInquiry.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedInquiry.createdAt}</p>
                  </div>
                  <p className="text-sm">{selectedInquiry.message}</p>
                </div>

                {/* Reply */}
                {selectedInquiry.replied ? (
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-primary">관리자 답변</p>
                      <p className="text-xs text-muted-foreground">{selectedInquiry.repliedAt}</p>
                    </div>
                    <p className="text-sm">{selectedInquiry.reply}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Textarea
                      placeholder="답변을 입력하세요..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={4}
                    />
                    <Button onClick={handleReply} className="w-full" disabled={!replyText.trim()}>
                      <Send className="w-4 h-4 mr-2" />
                      답변 보내기
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>문의를 선택하면</p>
                <p>상세 내용을 확인할 수 있습니다.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
