"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clock, Utensils, Heart, Camera, Music, Sunrise, Plus, Trash2, Save, GripVertical } from "lucide-react"

const iconOptions = [
  { value: "Clock", label: "시계", icon: Clock },
  { value: "Utensils", label: "식사", icon: Utensils },
  { value: "Heart", label: "하트", icon: Heart },
  { value: "Camera", label: "카메라", icon: Camera },
  { value: "Music", label: "음악", icon: Music },
  { value: "Sunrise", label: "일출", icon: Sunrise },
]

interface ScheduleItem {
  id: string
  icon: string
  time: string
  activity: string
}

interface DaySchedule {
  id: string
  day: string
  title: string
  items: ScheduleItem[]
}

const initialSchedule: DaySchedule[] = [
  {
    id: "day1",
    day: "DAY 1",
    title: "첫날",
    items: [
      { id: "1", icon: "Clock", time: "14:00", activity: "체크인 & 자기소개" },
      { id: "2", icon: "Utensils", time: "17:00", activity: "바베큐 파티" },
      { id: "3", icon: "Heart", time: "20:00", activity: "레크레이션 & 미니게임" },
      { id: "4", icon: "Music", time: "22:00", activity: "해변 캠프파이어" },
    ],
  },
  {
    id: "day2",
    day: "DAY 2",
    title: "둘째날",
    items: [
      { id: "5", icon: "Sunrise", time: "07:00", activity: "일출 감상 (선택)" },
      { id: "6", icon: "Utensils", time: "09:00", activity: "조식" },
      { id: "7", icon: "Camera", time: "10:00", activity: "해변 산책 & 포토타임" },
      { id: "8", icon: "Clock", time: "12:00", activity: "체크아웃 & 연락처 교환" },
    ],
  },
]

export function ProgramManagement() {
  const [schedule, setSchedule] = useState<DaySchedule[]>(initialSchedule)
  const [hasChanges, setHasChanges] = useState(false)

  const getIconComponent = (iconName: string) => {
    const found = iconOptions.find((opt) => opt.value === iconName)
    return found ? found.icon : Clock
  }

  const updateItem = (dayId: string, itemId: string, field: keyof ScheduleItem, value: string) => {
    setSchedule((prev) =>
      prev.map((day) =>
        day.id === dayId
          ? {
              ...day,
              items: day.items.map((item) => (item.id === itemId ? { ...item, [field]: value } : item)),
            }
          : day,
      ),
    )
    setHasChanges(true)
  }

  const addItem = (dayId: string) => {
    setSchedule((prev) =>
      prev.map((day) =>
        day.id === dayId
          ? {
              ...day,
              items: [...day.items, { id: Date.now().toString(), icon: "Clock", time: "00:00", activity: "새 일정" }],
            }
          : day,
      ),
    )
    setHasChanges(true)
  }

  const removeItem = (dayId: string, itemId: string) => {
    setSchedule((prev) =>
      prev.map((day) =>
        day.id === dayId
          ? {
              ...day,
              items: day.items.filter((item) => item.id !== itemId),
            }
          : day,
      ),
    )
    setHasChanges(true)
  }

  const handleSave = () => {
    alert("프로그램이 저장되었습니다!")
    setHasChanges(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">프로그램 관리</h1>
          <p className="text-muted-foreground">1박 2일 프로그램 일정을 수정하세요.</p>
        </div>
        <Button onClick={handleSave} disabled={!hasChanges}>
          <Save className="w-4 h-4 mr-2" />
          저장하기
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {schedule.map((day) => (
          <Card key={day.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-full">
                  {day.day}
                </span>
                <Input
                  value={day.title}
                  onChange={(e) => {
                    setSchedule((prev) => prev.map((d) => (d.id === day.id ? { ...d, title: e.target.value } : d)))
                    setHasChanges(true)
                  }}
                  className="w-32 h-8"
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {day.items.map((item) => {
                const IconComponent = getIconComponent(item.icon)
                return (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <GripVertical className="w-4 h-4 text-muted-foreground" />

                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-primary" />
                      </div>
                      <select
                        value={item.icon}
                        onChange={(e) => updateItem(day.id, item.id, "icon", e.target.value)}
                        className="w-20 h-9 rounded-md border border-input bg-background text-foreground px-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      >
                        {iconOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <Input
                      type="time"
                      value={item.time}
                      onChange={(e) => updateItem(day.id, item.id, "time", e.target.value)}
                      className="w-32 h-9"
                    />

                    <Input
                      value={item.activity}
                      onChange={(e) => updateItem(day.id, item.id, "activity", e.target.value)}
                      className="flex-1 h-9"
                      placeholder="활동 내용"
                    />

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-destructive hover:text-destructive"
                      onClick={() => removeItem(day.id, item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )
              })}

              <Button variant="outline" className="w-full bg-transparent" onClick={() => addItem(day.id)}>
                <Plus className="w-4 h-4 mr-2" />
                일정 추가
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>미리보기</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {schedule.map((day) => (
              <div key={day.id} className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-full">
                    {day.day}
                  </span>
                  <h3 className="text-lg font-semibold">{day.title}</h3>
                </div>
                <div className="space-y-3">
                  {day.items.map((item) => {
                    const IconComponent = getIconComponent(item.icon)
                    return (
                      <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">{item.time}</span>
                          <p className="font-medium text-sm">{item.activity}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

