'use client'
import React from "react";
import { usePathname } from "next/navigation";
import HeaderWrap from "@/src/components/Header/Header";

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const category = pathname?.split('/').pop();
  const decodedCategory = decodeURIComponent(category as string);
  
  return (
    <>
      <HeaderWrap
        backgroundColor="var(--color-white)"
        title={decodedCategory}
        color="var(--color-black)"
        canGoBack={true}
      />
      {children}
    </>
  );
}
