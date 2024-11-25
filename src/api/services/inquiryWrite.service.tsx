"use client";
import { useState } from "react";
import { InquiryType } from "@/src/api/@types/inquiry.type";
import InquiryWriteView from "@/src/views/inquiry/inquiryWrite.view";
// import { useRouter } from "next/navigation";

const InquiryWriteService = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter();

  const handleSubmit = async (data: {
    inquiryType: InquiryType;
    title: string;
    content: string;
  }) => {
    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      if (!apiUrl) throw new Error("API URL이 설정되지 않았습니다.");

      const accessToken = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("accessToken="))
        ?.split("=")[1];
      if (!accessToken) throw new Error("토큰이 없습니다.");

      const response = await fetch(`${apiUrl}/api/inquiries`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`문의 등록 실패. 상태 코드: ${response.status}`);
      }
    } catch (error) {
      console.error("문의 등록 중 오류 발생:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return <InquiryWriteView onSubmit={handleSubmit} isLoading={isLoading} />;
};

export default InquiryWriteService;
