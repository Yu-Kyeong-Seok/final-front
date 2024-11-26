"use client";

import { FiHome, FiUser } from "react-icons/fi";
import { IoIosMenu } from "react-icons/io";
import { LuSearch } from "react-icons/lu";
import styles from "./BottomTab.module.scss";
import cn from "classnames/bind";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const cx = cn.bind(styles);

interface TabItem {
  icon: JSX.Element;
  label: string;
  path: string;
  requiresAuth?: boolean; // 추가: 로그인 여부 확인 플래그
}

const BottomTab = () => {
  const pathname = usePathname();
  const router = useRouter();

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const tabs: TabItem[] = [
    {
      icon: <FiHome size={24} />,
      label: "Home",
      path: "/",
    },
    {
      icon: <IoIosMenu size={24} />,
      label: "Menu",
      path: "/category",
    },
    {
      icon: <LuSearch size={24} />,
      label: "Search",
      path: "/search",
    },
    {
      icon: <FiUser size={24} />,
      label: "Mypage",
      path: "/mypage",
      requiresAuth: true, // 로그인 체크
    },
  ];
  
    // 컴포넌트 마운트 및 쿠키 변경시 로그인 상태 체크
    // useEffect(() => {
    //   const checkLoginStatus = () => {
    //     const token = document.cookie
    //     .split("; ")
    //     .find((cookie) => cookie.startsWith("accessToken="))
    //     ?.split("=")[1];
    //     setIsLoggedIn(!!token);
    //   };
  
    // }, []);

  const handleTabClick = (tab: TabItem) => {

    let isLogged = false;
    
    const token = document.cookie.split("; ").find((cookie) => cookie.startsWith("accessToken="))?.split("=")[1];

    // setIsLoggedIn(!!token);
    isLogged = !!token

    if (tab.requiresAuth && !isLogged) {
      router.push("/auth/login");
    } else {
      router.push(tab.path);
    }
  };

  return (
    <nav className={cx("bottomTab")}>
      {tabs.map((tab) => (
        <button
          // href={tab.path}
          key={tab.path}
          onClick={() => handleTabClick(tab)}
          className={`${cx("tabItem")} ${pathname === tab.path ? cx("active") : ""}`}
        >
          {tab.icon}
        </button>
      ))}
    </nav>
  );
};

export default BottomTab;
