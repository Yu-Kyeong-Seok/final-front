"use client";
import React from "react";
import HeaderWrap from "@/src/components/Header/Header";
import { usePathname } from "next/navigation";

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 경로에 따라 타이틀 설정
  const title = (() => {
    if (pathname === "/order") return "주문하기";
    if (pathname === "/order/list") return "주문전체내역";
    if (pathname.startsWith("/order/") && pathname.split("/").length === 3)
      return "주문상세내역";
    return "주문"; // 기본값
  })();

  return (
    <>
      <HeaderWrap
        backgroundColor="white"
        title={title}
        color="black"
        canGoBack={true}
      />
      {children}
    </>
  );
}
