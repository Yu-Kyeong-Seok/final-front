import React from "react";
import HeaderWrap from "../components/Header/Header";

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderWrap
        backgroundColor="white"
        title="주문하기"
        color="black"
        canGoBack={true}
      />
      {children}
    </>
  );
}