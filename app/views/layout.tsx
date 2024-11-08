import React from "react";
import HeaderWrap from "../components/Header/Header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderWrap
        backgroundColor={"var(--color-main)"}
        title="Market"
        color={"var(--color-white)"}
        canGoBack={true}
      />
      {children}
    </>
  );
}