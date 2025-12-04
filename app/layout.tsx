import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "바다愛 | 용화해변 펜션 & 소개팅 프로그램",
  description: "강원도 삼척 용화해변에서 펜션 숙박과 4:4 소개팅을 동시에! 1박2일 특별한 연애 프로그램",
  keywords: ["펜션", "소개팅", "삼척", "용화해변", "여름휴가", "미팅"],
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#3b82f6",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
