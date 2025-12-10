import { Wifi, Car, Utensils, Wind, Tv, Bath } from "lucide-react"

const rooms = [
  {
    name: "오션뷰 스탠다드",
    capacity: "2인 기준 / 최대 4인",
    price: "150,000원~",
    image: "/images/image.jpeg",
    features: ["오션뷰", "더블베드", "에어컨", "와이파이"],
  },
  {
    name: "오션뷰 디럭스",
    capacity: "4인 기준 / 최대 6인",
    price: "250,000원~",
    image: "/images/image.jpeg",
    features: ["발코니", "퀸베드 2개", "바베큐장", "주방"],
  },
  {
    name: "프리미엄 스위트",
    capacity: "4인 기준 / 최대 8인",
    price: "350,000원~",
    image: "/images/image.jpeg",
    features: ["스파", "테라스", "복층", "파티룸"],
  },
]

const amenities = [
  { icon: Wifi, name: "무료 와이파이" },
  { icon: Car, name: "주차장" },
  { icon: Utensils, name: "바베큐장" },
  { icon: Wind, name: "에어컨" },
  { icon: Tv, name: "스마트TV" },
  { icon: Bath, name: "욕조" },
]

export function PensionSection() {
  return (
    <section id="pension" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">Pension</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4 text-foreground text-balance">펜션 소개</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            바다가 한눈에 보이는 오션뷰 펜션에서 편안하고 로맨틱한 시간을 보내세요.
          </p>
        </div>

        {/* Rooms */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {rooms.map((room) => (
            <div
              key={room.name}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-shadow"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={room.image || "/placeholder.svg"}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-1 text-card-foreground">{room.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{room.capacity}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.features.map((feature) => (
                    <span key={feature} className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-md">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Amenities */}
        <div className="bg-muted/50 rounded-2xl p-8">
          <h3 className="text-lg font-semibold mb-6 text-center text-foreground">편의 시설</h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-6">
            {amenities.map((amenity) => (
              <div key={amenity.name} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center">
                  <amenity.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground text-center">{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
