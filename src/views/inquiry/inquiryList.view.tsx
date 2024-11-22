"use client";
import styles from "@/src/views/inquiry/inquiryList.module.scss";
import cn from "classnames/bind";
import { IInquiry } from "@/src/api/@types/inquiry.type";
import { useRouter } from "next/navigation";
import { LuChevronLeft } from "react-icons/lu";

const cx = cn.bind(styles);

type InquiryListViewProps = {
  inquiries: IInquiry[];
};

/** 문의 유형 매핑 */
const inquiryTypeMap: Record<IInquiry["inquiryType"], string> = {
  Cancel: "취소",
  Refund: "환불",
  Exchange: "교환",
};

/** 상태 매핑 */
const statusMap: Record<IInquiry["status"], string> = {
  Processing: "처리 중",
  completed: "완료",
};

export default function InquiryListView(props: InquiryListViewProps) {
  const { inquiries } = props;

  /** 뒤로가기 router */
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <div className={cx("PageContainer")}>
      <div className={cx("PageHeader")}>
        <a onClick={handleBack}>
          <LuChevronLeft />
        </a>
        <h3>1:1 문의</h3>
      </div>

      <section>
        {inquiries.length > 0 ? (
          inquiries.map((inquiry) => (
            <div key={inquiry.inquiryId} className={cx("AddressList")}>
              <ul>
                <li>문의유형: {inquiryTypeMap[inquiry.inquiryType]}</li>
                <li>제목: {inquiry.title}</li>
                <li>진행결과: {statusMap[inquiry.status]}</li>
                <li>작성일: {new Date(inquiry.createdAt).toLocaleString()}</li>
                <li>작성자: {inquiry.author.name}</li>
              </ul>
            </div>
          ))
        ) : (
          <p>등록된 1:1 문의가 없습니다.</p>
        )}
      </section>
    </div>
  );
}
