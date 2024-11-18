"use client";
// import { useState } from "react";
import styles from "./mypage.module.scss";
import cn from "classnames/bind";
import { LuChevronRight, LuUserCircle2 } from "react-icons/lu";
import { useRouter } from "next/navigation";

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
          <li onClick={() => handleClick("delivery/deliveryAddress")}>
            배송지 관리
            <span>
              <LuChevronRight />
            </span>
          </li>
          <li>
            개인 정보 수정
            <span>
              <LuChevronRight />
            </span>
          </li>
          <li>
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
