"use client";
import styles from "@/src/views/inquiry/inquiryList.module.scss";
import cn from "classnames/bind";
import { IInquiry } from "@/src/api/@types/inquiry.type";
import { useRouter } from "next/navigation";
import { LuChevronLeft } from "react-icons/lu";
import Button from "@/src/components/Button/Button";

const cx = cn.bind(styles);

type InquiryListViewProps = {
  inquiries: IInquiry[];
};

/** 문의 유형 매핑 */
const inquiryTypeMap: Record<IInquiry["inquiryType"], string> = {
  Cancel: "주문",
  Refund: "환불",
  Exchange: "교환",
  "etc.": "기타",
};

/** 상태 매핑 */
const statusMap: Record<IInquiry["status"], string> = {
  Processing: "처리 중",
  completed: "완료",
};

/** 시간 매핑 */
const formatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

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

  const ActionButtons = () => (
    <div className={cx("Buttons")}>
      <Button disabled={false} variants={"outline"}>
        <a
          href="https://open.kakao.com/o/sSr9PS1g"
          target="_blank"
          rel="noopener noreferrer"
        >
          카카오톡 문의
        </a>
      </Button>
      <Button
        disabled={false}
        variants={"solid"}
        className={cx("InquiryBtn")}
        onClick={() => handleClick("/inquiry/write")}
      >
        1:1 문의
      </Button>
    </div>
  );

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
          <>
            {inquiries.map((inquiry) => (
              <div key={inquiry.inquiryId} className={cx("InquiryList")}>
                <div className={cx("InquiryItemWrap")}>
                  <dl className={cx("InquiryItem")}>
                    <dt>[{inquiryTypeMap[inquiry.inquiryType]}]</dt>
                    <dd
                      className={cx("InquiryTitle")}
                      onClick={() =>
                        handleClick(`/inquiry/${inquiry.inquiryId}`)
                      }
                    >
                      {inquiry.title}
                    </dd>
                  </dl>

                  <dl className={cx("InquiryDateStatus")}>
                    <dt>{formatter.format(new Date(inquiry.createdAt))}</dt>
                    <dd className={cx("InquiryStatus")}>
                      {statusMap[inquiry.status]}
                    </dd>
                  </dl>
                </div>
              </div>
            ))}
            <ActionButtons />
          </>
        ) : (
          <div className={cx("NoData")}>
            <p>등록된 1:1 문의가 없습니다.</p>
            <ActionButtons />
          </div>
        )}
      </section>
    </div>
  );
}
