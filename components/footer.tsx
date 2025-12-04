import Link from "next/link"
import { Heart, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-accent fill-accent" />
              <span className="text-xl font-bold">바다愛</span>
            </Link>
            <p className="text-background/70 text-sm mb-4 max-w-md">
              강원도 삼척 용화해변에서 펜션 숙박과 4:4 소개팅을 동시에! 1박 2일 특별한 연애 프로그램으로 인연을
              만나보세요.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">바로가기</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link href="#about" className="hover:text-background transition-colors">
                  소개
                </Link>
              </li>
              <li>
                <Link href="#program" className="hover:text-background transition-colors">
                  프로그램
                </Link>
              </li>
              <li>
                <Link href="#pension" className="hover:text-background transition-colors">
                  펜션
                </Link>
              </li>
              <li>
                <Link href="#reservation" className="hover:text-background transition-colors">
                  예약
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-background transition-colors">
                  요금
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">고객 지원</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link href="#inquiry" className="hover:text-background transition-colors">
                  1:1 문의
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition-colors">
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition-colors">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition-colors">
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/10 text-center text-sm text-background/50">
          <p>© 2025 바다愛. All rights reserved.</p>
          <p className="mt-2">
            사업자등록번호: 123-45-67890 | 대표: 홍길동 | 주소: 강원도 삼척시 근덕면 용화해변길 123
          </p>
        </div>
      </div>
    </footer>
  )
}
