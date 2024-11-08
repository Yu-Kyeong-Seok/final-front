import type { Metadata } from "next";
import React from "react";
import styles from "./layout.module.scss";
import cn from "classnames/bind";
import "../styles/global.css";
import HeaderWrap from "./components/Header/Header";
import BottomTab from "./components/BottomTab/BottomTab";

import Home from "./components/TopTab/page";
import localFont from "next/font/local";

const cx = cn.bind(styles);

export const metadata: Metadata = {
  title: "컬리즘",
  description: "Generated by create next app",
};

// PretendardVariable 폰트 설정
const pretendard = localFont({
  src: [
    {
      path: "../public/fonts/PretendardVariable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <HeaderWrap
          backgroundColor={"var(--color-main)"}
          title="Market"
          color={"var(--color-white)"}
          canGoBack={true}
        />
        <div className={cx("Wrap")}>
          <Home />
          <div className={cx("Content")}>{children}</div>
        </div>
        <BottomTab />
      </body>
    </html>
  );
}
