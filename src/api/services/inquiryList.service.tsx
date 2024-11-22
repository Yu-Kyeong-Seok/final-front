"use client";
import { useState, useEffect } from "react";
import { IInquiry } from "@/src/api/@types/inquiry.type";
import InquiryListView from "@/src/views/inquiry/inquiryList.view";

const InquiryListService = () => {
  const [inquiryListData, setInquiryListData] = useState<IInquiry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInquiryListData = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      if (!apiUrl) throw new Error("API URL이 설정되지 않았습니다.");

      const accessToken = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("accessToken="))
        ?.split("=")[1];
      if (!accessToken) throw new Error("토큰이 없습니다");

      // console.log(`${apiUrl}/api/inquiries`);

      const response = await fetch(`${apiUrl}/api/inquiries`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok)
        throw new Error(
          `1:1 문의내역 로드 실패. 상태 코드: ${response.status}`
        );

      const data = await response.json();

      console.log("fetched inquiry data:: 문의내역", data);

      setInquiryListData(data.results);
    } catch (error) {
      console.error("1:1 문의내역 가져오기 중 오류 발생:", error);
      setError(
        error instanceof Error
          ? error.message
          : "알 수 없는 에러가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiryListData();
  }, []);

  if (isLoading) return <h2>로딩 중...</h2>;

  if (error) {
    return (
      <div>
        <h2>1:1문의 데이터를 불러오는데 실패했습니다</h2>
        <p>{error}</p>
        <button
          onClick={() => {
            setError(null);
            setIsLoading(true);
            fetchInquiryListData();
          }}
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (inquiryListData.length === 0) return <h2>등록된 1:1문의가 없습니다.</h2>;

  return <InquiryListView inquiries={inquiryListData} />;
};

export default InquiryListService;
