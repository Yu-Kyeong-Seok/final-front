"use client";

import FilterBottomSheet from "@/app/components/FilterBottomSheet/FilterBottomSheet";

export default function Home() {
  const filters = [
    { id: "category", label: "카테고리" },
    { id: "price", label: "가격대" },
    { id: "brand", label: "브랜드" },
  ];

  const handleFilterSelect = (filterId: string) => {
    console.log(filterId);
  };

  return (
    <div>
      <FilterBottomSheet
        filters={filters}
        onFilterSelect={handleFilterSelect}
      />
    </div>
  );
}
