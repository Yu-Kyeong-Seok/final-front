"use client";

import BottomSheet from "@/app/components/BottomSheet/BottomSheet";

export default function Home() {
  const items = [
    { id: "category", label: "카테고리" },
    { id: "price", label: "가격대" },
    { id: "brand", label: "브랜드" },
  ];

  const handleItemSelect = (filterId: string) => {
    console.log(filterId);
  };

  return (
    <div>
      <BottomSheet items={items} onSelect={handleItemSelect} />
    </div>
  );
}
