import { Heart, Sun, Users, Sparkles } from "lucide-react"

const features = [
  {
    icon: Heart,
    title: "로맨틱한 만남",
    description: "자연스러운 분위기에서 진정한 인연을 만나보세요",
  },
  {
    icon: Sun,
    title: "힐링 휴가",
    description: "아름다운 용화해변에서 여름 휴가와 소개팅을 동시에",
  },
  {
    icon: Users,
    title: "4:4 매칭",
    description: "신중하게 선별된 4명의 이성과 함께하는 특별한 시간",
  },
  {
    icon: Sparkles,
    title: "프리미엄 펜션",
    description: "오션뷰 펜션에서 잊지 못할 추억을 만들어보세요",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">About Us</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4 text-foreground text-balance">Ocean-date를 소개합니다</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Ocean-date는 20-30대를 위한 프리미엄 소개팅 프로그램입니다. 아름다운 강원도 삼척 용화해변의 펜션에서 1박 2일
            동안 특별한 인연을 만나보세요.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Image Gallery */}
        <div className="mt-16 grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 rounded-2xl overflow-hidden aspect-video">
            <img
              src="/korean-beach-pension-ocean-view-summer.jpg"
              alt="용화해변 펜션 전경"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="grid grid-rows-2 gap-4">
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/young-korean-couples-having-fun-beach-bbq.jpg"
                alt="바베큐 파티"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/korean-beach-sunset-romantic.jpg"
                alt="일몰 풍경"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
