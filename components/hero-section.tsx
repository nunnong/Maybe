import { Button } from "@/components/ui/button"
import { ArrowRight, Waves } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/beautiful-korean-ocean-beach-sunset-romantic-summe.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-foreground/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-primary-foreground">
        <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
          <Waves className="w-4 h-4" />
          <span className="text-sm font-medium">강원도 삼척 용화해변</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
          바다에서 시작되는
          <br />
          <span className="text-accent">특별한 인연</span>
        </h1>

        <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-pretty">
          펜션 숙박과 4:4 소개팅을 동시에!
          <br />
          1박 2일 동안 바다와 함께하는 로맨틱한 여름 휴가
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="text-base px-8">
            지금 신청하기
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-base px-8 bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20"
          >
            프로그램 알아보기
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-primary-foreground/20">
          <div>
            <div className="text-3xl sm:text-4xl font-bold">500+</div>
            <div className="text-sm text-primary-foreground/70">성공 커플</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold">98%</div>
            <div className="text-sm text-primary-foreground/70">만족도</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold">3년</div>
            <div className="text-sm text-primary-foreground/70">운영 경력</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2" />
        </div>
      </div>
    </section>
  )
}
