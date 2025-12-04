"use client"

import { useState } from "react"
import { MessageCircle, Send, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const contactInfo = [
  {
    icon: Phone,
    label: "전화 문의",
    value: "010-1234-5678",
    href: "tel:01012345678",
  },
  {
    icon: Mail,
    label: "이메일",
    value: "hello@badalove.com",
    href: "mailto:hello@badalove.com",
  },
  {
    icon: MapPin,
    label: "위치",
    value: "강원도 삼척시 근덕면 용화해변길 123",
    href: "#",
  },
]

export function InquirySection() {
  const [message, setMessage] = useState("")

  return (
    <section id="inquiry" className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">Contact</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4 text-foreground text-balance">1:1 문의</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            궁금한 점이 있으시면 언제든지 문의해주세요. 친절하게 답변 드리겠습니다.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">연락처</h3>

              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium text-card-foreground">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Operating Hours */}
              <div className="p-4 bg-card rounded-xl border border-border">
                <h4 className="font-medium mb-2 text-card-foreground">운영 시간</h4>
                <p className="text-sm text-muted-foreground">
                  평일 10:00 - 18:00
                  <br />
                  주말 및 공휴일 휴무
                </p>
              </div>
            </div>

            {/* Chat Preview */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden flex flex-col">
              <div className="p-4 bg-primary text-primary-foreground flex items-center gap-3">
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">실시간 채팅 문의</span>
              </div>

              <div className="flex-1 p-4 space-y-4 min-h-[300px]">
                {/* Sample Messages */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-xs font-medium text-primary">CS</span>
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%]">
                    <p className="text-sm text-foreground">
                      안녕하세요! 바다愛입니다. 😊
                      <br />
                      무엇을 도와드릴까요?
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-none px-4 py-2 max-w-[80%]">
                    <p className="text-sm">예약 관련해서 문의드려요!</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-xs font-medium text-primary">CS</span>
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%]">
                    <p className="text-sm text-foreground">
                      네! 예약 관련 문의 환영합니다.
                      <br />
                      어떤 부분이 궁금하신가요?
                    </p>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    placeholder="메시지를 입력하세요..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="icon">
                    <Send className="w-4 h-4" />
                    <span className="sr-only">전송</span>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  로그인 후 실시간 채팅을 이용하실 수 있습니다
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
