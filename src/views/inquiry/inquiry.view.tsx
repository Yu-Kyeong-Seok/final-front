"use client";
import styles from "@/src/views/inquiry/inquiry.module.scss";
import cn from "classnames/bind";
import { IInquiry } from "@/src/api/@types/inquiry.type";
import { useRouter } from "next/navigation";
import { LuChevronLeft } from "react-icons/lu";

const cx = cn.bind(styles);

type InquiryViewProps = {
  inquiry: IInquiry;
};

/** 문의 유형 맵핑 */
const inquiryTypeMap: Record<IInquiry["inquiryType"], string> = {
  Cancel: "주문취소",
  Refund: "환불문의",
  Exchange: "교환문의",
  etc: "기타문의",
};

/** 상태  맵핑 */
const statusMap: Record<IInquiry["status"], string> = {
  Processing: "처리 중",
  completed: "완료",
};

export default function InquiryView(props: InquiryViewProps) {
  const { inquiry } = props;

  const router = useRouter();

  /** 뒤로가기 router */
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
        <div className={cx("InquiryList")}>
          <div className={cx("InquiryItemWrap")}>
            <dd className={cx("InquiryStatus")}>{statusMap[inquiry.status]}</dd>
            <dl className={cx("InquiryItem")}>
              <dt>
                [{inquiryTypeMap[inquiry.inquiryType]}]&nbsp;{inquiry.title}
              </dt>
              {/* <dd className={cx("InquiryTitle")}></dd> */}
              {/* <dd className={cx("InquiryAuthor")}>
                작성자: {inquiry.author.userName}
              </dd> */}
            </dl>
            <dl className={cx("InquiryDateStatus")}>
              <dt>{new Date(inquiry.createdAt).toLocaleString()}</dt>
            </dl>
          </div>

          <p>{inquiry.content}</p>
        </div>
      </section>
    </div>
  );
}
