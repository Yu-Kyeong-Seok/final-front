import React from "react";
import HeaderWrap from "@/src/components/Header/Header";

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderWrap
        backgroundColor="var(--color-main)"
        title="검색"
        color="var(--color-white)"
        canGoBack={true}
      />
      {children}
    </>
  );
}
