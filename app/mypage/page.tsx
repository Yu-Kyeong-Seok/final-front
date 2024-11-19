import MypageView from "@/src/views/mypage/mypage.view";

/** 주문자 정보 */
const userInfos = [
  {
    id: "random1",
    name: "황다영",
    phone: "010-0000-0000",
    email: "1234@gmail.com",
    address: "서울특별시 강남구 테헤란로 133 한국타이어빌딩 18층 (역삼동)",
  },
];

export default function Mypage() {
  return <MypageView userInfos={userInfos} />;
}
