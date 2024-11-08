"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./Header.module.scss";
import cn from "classnames/bind";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoChevronBack } from "react-icons/io5";

const cx = cn.bind(styles);

type HeaderProps = {
  backgroundColor: string;
  title: string;
  color: string;
  canGoBack: boolean;
};

const HeaderWrap = (props: HeaderProps) => {
  const { backgroundColor, title, color, canGoBack } = props;
  const router = useRouter();

  const handleBack = () => {
    if (canGoBack) {
      router.back(); // 이전 페이지로 이동
    } else {
      router.push("/"); // 홈으로 이동
    }
  };

  return (
    <header className={cx("Header")} style={{ backgroundColor, color }}>
      <h1 className={cx("Title")}>{title}</h1>
      {canGoBack && (
        <button
          className={cx("Back", "bt")}
          onClick={handleBack}
          style={{ color }}
        >
          <IoChevronBack />
        </button>
      )}
      <Link href="/cart" className={cx("Cart", "bt")}>
        <MdOutlineShoppingBag />
      </Link>
    </header>
  );
};

export default HeaderWrap;
