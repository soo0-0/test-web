import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "발주처 파인더 — 국내 굿즈 제작 업체 디렉토리",
  description: "디자인 항목을 입력하면 대한민국 제작 업체의 최소수량, 단가, 납품 래퍼런스를 한눈에 확인하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
