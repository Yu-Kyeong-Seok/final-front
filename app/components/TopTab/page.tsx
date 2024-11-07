"use client";
import React, { useState } from "react";
import TopTabList from "./TopTabList";

export default function Home() {
  const tabs = [
    "추천",
    "베스트",
    "컬리세일",
    "신상품",
    // "알뜰쇼핑",
    // "특가/혜택",
    // "특가/혜택2",
    // "특가/혜택3",
    // "특가/혜택4",
    // "특가/혜택5",
    // "특가/혜택6",
    // "특가/혜택7",
    // "특가/혜택8",
    // "특가/혜택9",
  ];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <div
        style={{
          // maxWidth: "400px",
          maxWidth: "500px",
          width: "100%",
          overflowX: "auto",
        }}
      >
        <TopTabList
          tabs={tabs}
          selectedTab={selectedTab}
          onTabClick={handleTabChange}
        />
      </div>
    </div>
  );
}
