import React, { useState } from "react";
import ProductDetailView from "@/src/views/product/productDetail.view";
import ModalWrap from "@/src/components/Modal/Modal";

export default function Home({ params }: { params: { id: string } }) {
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;

  // s: 모달
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleConfirm = () => {
    // 확인 버튼 눌렀을 때 실행할 로직
    console.log("확인 버튼 클릭");
  };
  // e: 모달

  return (
    <React.Fragment>
      <ProductDetailView id={productId} />
      <button onClick={openModal}>버튼</button>
      <ModalWrap
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
      >
        <p>모달 내용을 여기에 작성하세요</p>
      </ModalWrap>
    </React.Fragment>
  );
}
