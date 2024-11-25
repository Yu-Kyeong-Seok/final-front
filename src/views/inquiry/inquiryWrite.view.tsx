"use client";
import styles from "@/src/views/inquiry/inquiryWrite.module.scss";
import cn from "classnames/bind";
import { useState } from "react";
import Button from "@/src/components/Button/Button";
import { InquiryType } from "@/src/api/@types/inquiry.type";
import { useRouter } from "next/navigation";
import { LuChevronLeft } from "react-icons/lu";
import Input from "@/src/components/Input/Input";
import ModalWrap from "@/src/components/Modal/Modal";

const cx = cn.bind(styles);

type InquiryWriteViewProps = {
  onSubmit: (data: {
    inquiryType: InquiryType;
    title: string;
    content: string;
  }) => Promise<void>;
  isLoading: boolean;
};

export default function InquiryWriteView({
  onSubmit,
  isLoading,
}: InquiryWriteViewProps) {
  const [inquiryType, setInquiryType] = useState<InquiryType | "">("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  // 모달
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    router.push("/inquiry");
  };

  // 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inquiryType || title.trim() === "" || content.trim().length < 10) {
      setModalMessage(
        "문의 유형, 제목, 내용은 필수 입력 항목이며, 내용은 최소 10자 이상이어야 합니다."
      );
      openModal();
      return;
    }

    setError(null);

    try {
      await onSubmit({ inquiryType, title, content });
      setInquiryType("");
      setTitle("");
      setContent("");
      setModalMessage(
        "문의가 성공적으로 등록되었습니다.<br>답변은 유선이나 이메일로 전달드리겠습니다."
      );
      openModal();
    } catch (error) {
      setModalMessage("문의 등록에 실패했습니다. 다시 시도해주세요.");
      openModal();
    }
  };

  return (
    <div className={cx("PageContainer")}>
      <div className={cx("PageHeader")}>
        <a onClick={handleBack}>
          <LuChevronLeft />
        </a>
        <h3>1:1 문의 작성</h3>
      </div>

      <form onSubmit={handleSubmit} className={cx("Form")}>
        <div className={cx("FormField")}>
          <div>
            <label htmlFor="inquiryType">
              문의 유형<a className={cx("Require")}>*</a>
            </label>
          </div>

          <select
            id="inquiryType"
            value={inquiryType}
            onChange={(e) => setInquiryType(e.target.value as InquiryType)}
            required
          >
            <option value="">유형을 선택해주세요</option>
            <option value="Cancel">주문</option>
            <option value="Refund">환불</option>
            <option value="Exchange">교환</option>
            <option value="etc">기타</option>
          </select>
        </div>

        <div className={cx("FormField")}>
          <div>
            <label htmlFor="title">
              문의 제목<a className={cx("Require")}>*</a>
            </label>
          </div>

          <Input
            id="title"
            type="text"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            // required
          />
        </div>

        <div className={cx("FormField")}>
          <div>
            <label htmlFor="content">
              문의 내용<a className={cx("Require")}>*</a>
            </label>
          </div>

          <textarea
            id="content"
            placeholder="문의하실 내용을 입력해주세요 (최소 10자)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        {error && <p className={cx("Error")}>{error}</p>}

        <div className={cx("Buttons")}>
          <Button disabled={isLoading} variants={"solid"} type="submit">
            {isLoading ? "등록 중..." : "등록하기"}
          </Button>
        </div>
      </form>

      {/* 모달 컴포넌트 */}
      <ModalWrap
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={closeModal}
      >
        <p style={{ fontSize: "15px" }}>{modalMessage}</p>
      </ModalWrap>
    </div>
  );
}
