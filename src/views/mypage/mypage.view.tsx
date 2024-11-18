"use client";
// import { useState } from "react";
import styles from "./mypage.module.scss";
import cn from "classnames/bind";
import { LuChevronRight, LuClub } from "react-icons/lu";
// import { useRouter } from "next/navigation";

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

  return (
    <div className={cx("MypageContainer")}>
      <div className={cx("Inner")}>
        <h3>
          <a>
            <LuClub />
          </a>{" "}
          {userInfos[0].name}님의 마이페이지
        </h3>
        <section className={cx("MypageSection")}>
          <ul>
            <li>
              주문내역
              <span>
                <LuChevronRight />
              </span>
            </li>
            <li>
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
    </div>
  );
}
