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
  Cancel: "주문취소",
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

  const router = useRouter();
  /** 버튼 클릭 시 페이지 이동 */
  const handleClick = (path: string) => {
    router.push(path);
  };
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
        {inquiries.length > 0 ? (
          inquiries.map((inquiry) => (
            <div key={inquiry.inquiryId} className={cx("InquiryList")}>
              <div className={cx("InquiryItemWrap")}>
                <dl className={cx("InquiryItem")}>
                  <dt>[{inquiryTypeMap[inquiry.inquiryType]}]</dt>
                  <dd
                    className={cx("InquiryTitle")}
                    onClick={() => handleClick(`/inquiry/${inquiry.inquiryId}`)}
                  >
                    {inquiry.title}
                  </dd>
                  <dd className={cx("InquiryStatus")}>
                    {statusMap[inquiry.status]}
                  </dd>
                </dl>

                <dl className={cx("InquiryAuthor")}>
                  <dt>{new Date(inquiry.createdAt).toLocaleString()}</dt>
                  <dd>작성자: {inquiry.author.userName}</dd>
                </dl>
              </div>
            </div>
          ))
        ) : (
          <p>등록된 1:1 문의가 없습니다.</p>
        )}
      </section>
    </div>
  );
}
