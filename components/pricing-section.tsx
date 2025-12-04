import { Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const datingPlans = [
  {
    name: "기본 패키지",
    description: "처음 참여하시는 분께 추천",
    price: "0",
    priceNote: "매칭 시 결제",
    matchPrice: "99,000원",
    popular: false,
    features: ["1박 2일 프로그램 참여", "4:4 소개팅 매칭", "바베큐 파티 포함", "조식 제공", "레크레이션 진행"],
  },
  {
    name: "프리미엄 패키지",
    description: "가장 인기있는 패키지",
    price: "0",
    priceNote: "매칭 시 결제",
    matchPrice: "149,000원",
    popular: true,
    features: [
      "기본 패키지 모든 혜택",
      "디럭스 객실 배정",
      "우선 매칭권",
      "프로필 사진 촬영",
      "1:1 프로필 컨설팅",
      "매칭 실패 시 재매칭 1회",
    ],
  },
  {
    name: "VIP 패키지",
    description: "특별한 만남을 원하시는 분",
    price: "0",
    priceNote: "매칭 시 결제",
    matchPrice: "249,000원",
    popular: false,
    features: [
      "프리미엄 패키지 모든 혜택",
      "스위트 객실 배정",
      "VIP 전용 라운지",
      "스파 이용권",
      "전담 매니저 배정",
      "무제한 재매칭",
    ],
  },
]

const pensionPlans = [
  {
    name: "오션뷰 스탠다드",
    description: "아늑한 바다 전망 객실",
    price: "120,000",
    priceNote: "1박 기준",
    popular: false,
    features: ["더블베드 1개", "오션뷰 발코니", "2인 기준 (최대 3인)", "무료 Wi-Fi", "무료 주차"],
  },
  {
    name: "오션뷰 디럭스",
    description: "넓은 공간의 프리미엄 객실",
    price: "180,000",
    priceNote: "1박 기준",
    popular: true,
    features: ["퀸베드 1개", "넓은 오션뷰 발코니", "4인 기준 (최대 5인)", "미니 주방", "바베큐 시설 이용"],
  },
  {
    name: "프리미엄 스위트",
    description: "최고급 스위트 객실",
    price: "250,000",
    priceNote: "1박 기준",
    popular: false,
    features: [
      "킹베드 + 싱글베드",
      "프라이빗 테라스",
      "6인 기준 (최대 8인)",
      "풀 키친",
      "프라이빗 바베큐",
      "스파 욕조",
    ],
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">Pricing</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4 text-foreground text-balance">요금 안내</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            소개팅 프로그램과 일반 펜션 숙박 요금을 확인하세요.
          </p>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-3 text-foreground">소개팅 프로그램</h3>
          <p className="text-center text-muted-foreground mb-10">신청은 무료! 매칭이 성사되면 결제가 진행됩니다.</p>

          <div className="grid md:grid-cols-3 gap-8">
            {datingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 border ${
                  plan.popular ? "border-primary bg-primary/5 scale-105 shadow-xl" : "border-border bg-card"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    인기
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-1 text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="text-center mb-6 pb-6 border-b border-border">
                  <div className="flex items-end justify-center gap-1">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-lg text-muted-foreground">원</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{plan.priceNote}</p>
                  <p className="text-primary font-semibold mt-2">매칭 시 {plan.matchPrice}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className="w-full" variant={plan.popular ? "default" : "outline"} size="lg">
                  신청하기
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-center mb-3 text-foreground">일반 펜션 숙박</h3>
          <p className="text-center text-muted-foreground mb-10">소개팅 프로그램 없이 펜션만 이용하실 수 있습니다.</p>

          <div className="grid md:grid-cols-3 gap-8">
            {pensionPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 border ${
                  plan.popular ? "border-primary bg-primary/5 scale-105 shadow-xl" : "border-border bg-card"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    인기
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-1 text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="text-center mb-6 pb-6 border-b border-border">
                  <div className="flex items-end justify-center gap-1">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-lg text-muted-foreground">원~</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{plan.priceNote}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className="w-full" variant={plan.popular ? "default" : "outline"} size="lg">
                  예약하기
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            ※ 성수기(7~8월) 및 주말/공휴일에는 요금이 상이할 수 있습니다.
            <br />※ 소개팅 프로그램 참가 시 객실 비용은 프로그램 요금에 포함되어 있습니다.
          </p>
        </div>
      </div>
    </section>
  )
}
