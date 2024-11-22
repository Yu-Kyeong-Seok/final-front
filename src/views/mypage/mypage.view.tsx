"use client";
// import { useState } from "react";
import styles from "./mypage.module.scss";
import cn from "classnames/bind";
import { LuChevronRight, LuUserCircle2 } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ModalYesorNoWrap from "@/src/components/Modal/ModalYesorNo";
import ModalWrap from "@/src/components/Modal/Modal";

const cx = cn.bind(styles);

/** 주문자 정보 */
type UserInfo = {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
};

export default function MypageView() {
  /** 버튼 클릭 시 페이지 이동 */
  const router = useRouter();
  const handleClick = (path: string) => {
    router.push(path);
  };

  const [id, setId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

    // 사용자 정보를 가져오는 함수
    const fetchUserInfo = async () => {
      try {
          const accessToken = document.cookie.split("; ").find((cookie) => cookie.startsWith("accessToken="))?.split("=")[1];

          const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${accessToken}`,
              },
          });

          if (response.ok) {
              const res = await response.json();
              console.log(res.data);

              setId(res.data.userId);
              setName(res.data.profile.firstName);
              setPhone(res.data.profile.phoneNum);
              setEmail(res.data.email);
              setAddress(res.data.profile.delivery.defaultAddress);
          } 
          else if( response.status === 401) {
            handleClick("/auth/login")
          }
          else {
              throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
          }
      } catch (err) {
          console.log(err);
      } finally {
          setLoading(false); // 로딩 상태 종료
      }
  };

  useEffect(() => {
      fetchUserInfo(); // 컴포넌트가 마운트될 때 사용자 정보 가져오기
  }, []);

  /** 모달 */
  const [isYesorNoModalOpen, setIsYesorNoModalOpen] = useState(false);
    const [yesorNoModalMessage, setYesorNoModalMessage] = useState<string | null>(null);
    const [onConfirmAction, setOnConfirmAction] = useState<(() => void) | null>(null);
  
    const openYesorNoModal = (message: string, confirmAction: () => void) => {
      setYesorNoModalMessage(message);
      setOnConfirmAction(() => confirmAction); // 모달의 "확인" 버튼 동작 설정
      setIsYesorNoModalOpen(true);
    };

    const closeYesorNoModal = () => {
      setYesorNoModalMessage(null);
      setOnConfirmAction(null);
      setIsYesorNoModalOpen(false);
    };

    /** 모달로 로그아웃 요청 */
    const requestLogout = () => {
      openYesorNoModal("정말 로그아웃 하시겠습니까?", handleLogout);
    };

    /** 모달로 회원탈퇴 요청 */
    const requestLeave = () => {
      openYesorNoModal("정말 탈퇴 하시겠어요?", handleLeave);
    };
  
    const [modalMessage, setModalMessage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const handleConfirm = () => {
    };

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
              
              // console.log(response);
              
              document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
              setModalMessage("로그아웃 되었습니다!"); 
              handleClick("/")
          } else {
            setModalMessage("로그아웃에 실패"); 
          }
    }
    catch (err) {
        console.log(err);
    } finally {
      openModal();
    }
  };
  /** 회원탈퇴 */
  const handleLeave = async () => {
      try {
        const accessToken = document.cookie.split("; ").find((cookie) => cookie.startsWith("accessToken="))?.split("=")[1];

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
        });

    if (response.ok) {
          const res = await response;
          
          console.log(response);
          
          setModalMessage("회원탈퇴 되었습니다!");
          handleClick("/")
      } else {
        setModalMessage("회원탈퇴 실패");
      }
  }
  catch (err) {
    console.log(err);
  } finally {
    openModal();
  }
  };

  return (
    <div className={cx("MypageContainer")}>
      <section className={cx("MypageSection")}>
        <div className={cx("MypageTitle")}>
          <a>
            <LuUserCircle2 />
          </a>
          <h3>{name}님의 마이페이지</h3>
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
          <li onClick={requestLogout}>
            로그아웃
            <span>
              <LuChevronRight />
            </span>
          </li>
          <li onClick={requestLeave}>
            회원탈퇴
            <span>
              <LuChevronRight />
            </span>
          </li>
        </ul>
      </section>
      {/* 모달 */}
      <ModalYesorNoWrap 
          isOpen={isYesorNoModalOpen} 
          onClose={closeYesorNoModal} 
          onConfirm={onConfirmAction}
      >
          <p className={cx("ModalMessage")}>{yesorNoModalMessage}</p>
      </ModalYesorNoWrap>
      
      <ModalWrap 
            isOpen={isModalOpen} 
            onClose={closeModal} 
            onConfirm={handleConfirm}
        >
            <p>{modalMessage}</p>
        </ModalWrap>


    </div>
  );
}
