import { Clock, Utensils, Heart, Camera, Music, Sunrise } from "lucide-react"

const schedule = [
  {
    time: "DAY 1",
    title: "첫날",
    items: [
      { icon: Clock, time: "14:00", activity: "체크인 & 자기소개" },
      { icon: Utensils, time: "17:00", activity: "바베큐 파티" },
      { icon: Heart, time: "20:00", activity: "레크레이션 & 미니게임" },
      { icon: Music, time: "22:00", activity: "해변 캠프파이어" },
    ],
  },
  {
    time: "DAY 2",
    title: "둘째날",
    items: [
      { icon: Sunrise, time: "07:00", activity: "일출 감상 (선택)" },
      { icon: Utensils, time: "09:00", activity: "조식" },
      { icon: Camera, time: "10:00", activity: "해변 산책 & 포토타임" },
      { icon: Clock, time: "12:00", activity: "체크아웃 & 연락처 교환" },
    ],
  },
]

export function ProgramSection() {
  return (
    <section id="program" className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">Program</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4 text-foreground text-balance">1박 2일 프로그램</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            자연스럽게 대화하고 즐길 수 있는 다양한 프로그램을 준비했습니다. 억지스럽지 않은 만남, 진정한 인연을
            찾아보세요.
          </p>
        </div>

        {/* Schedule */}
        <div className="grid md:grid-cols-2 gap-8">
          {schedule.map((day) => (
            <div key={day.time} className="bg-card rounded-2xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-full">
                  {day.time}
                </span>
                <h3 className="text-xl font-semibold text-card-foreground">{day.title}</h3>
              </div>

              <div className="space-y-4">
                {day.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                      <p className="font-medium text-card-foreground">{item.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-8 p-6 bg-accent/20 rounded-2xl border border-accent/30 text-center">
          <p className="text-sm text-foreground">
            ※ 프로그램은 날씨 및 상황에 따라 변경될 수 있습니다.
            <br />
            전문 진행자가 함께하여 어색함 없이 즐거운 시간을 보낼 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  )
}
