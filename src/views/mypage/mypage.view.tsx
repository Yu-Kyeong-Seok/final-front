"use client";
// import { useState } from "react";
import styles from "./mypage.module.scss";
import cn from "classnames/bind";
import { LuChevronRight, LuUserCircle2 } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ModalWrap from "@/src/components/Modal/Modal";

const cx = cn.bind(styles);

/** 주문자 정보 */
type UserInfo = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
};

type OrderViewProps = {
  // orderItems: OrderItem[];
  userInfos: UserInfo[];
};

export default function MypageView(props: OrderViewProps) {
  const { userInfos } = props;

  /** 버튼 클릭 시 페이지 이동 */
  const router = useRouter();
  const handleClick = (path: string) => {
    router.push(path);
  };

  const [isModalOpen, setModalOpen] = useState(false);
  /** 로그아웃 */
  const handleLogout = async () => {
    try {
            const accessToken = document.cookie.split("; ").find((cookie) => cookie.startsWith("accessToken="))?.split("=")[1];

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
            });

        if (response.ok) {
              const res = await response;
              
              console.log(response);
              
              document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
              alert("로그아웃 되었습니다!"); // 로그아웃 실행 로직 추가
              setModalOpen(false);

          } else {
              throw new Error("로그아웃에 실패");
          }
    }
    catch (err) {
        console.log(err);
    } finally {
    }
  };
  /** 회원탈퇴 */
  const handle = () => {

  };

  return (
    <div className={cx("MypageContainer")}>
      <section className={cx("MypageSection")}>
        <div className={cx("MypageTitle")}>
          <a>
            <LuUserCircle2 />
          </a>
          <h3> {userInfos[0].name}님의 마이페이지 </h3>
        </div>

        <ul>
          <li onClick={() => handleClick("/order/list")}>
            주문내역
            <span>
              <LuChevronRight />
            </span>
          </li>
          <li onClick={() => handleClick("/deliveryAddress")}>
            배송지 관리
            <span>
              <LuChevronRight />
            </span>
          </li>
          <li onClick={() => handleClick("/mypage/info")}>
            개인 정보 수정
            <span>
              <LuChevronRight />
            </span>
          </li>
          <li onClick={handleLogout}>
            로그아웃
            <span>
              <LuChevronRight />
            </span>
          </li>
          <li>
            회원탈퇴
            <span>
              <LuChevronRight />
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
