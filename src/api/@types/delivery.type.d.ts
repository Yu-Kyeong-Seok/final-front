// 배송지 타입 정의
export interface DeliveryAddress {
  _id: string; // 배송지 ID
  userId: string; // 유저 ID
  name?: string; // 배송지와 연결된 유저명
  postalCode: number; // 우편번호
  defaultAddress: string; // 기본 주소
  detailAddress: string; // 상세 주소
  number: string; // 폰번호
  isDefault: boolean; // 기본 배송지 여부
}

// interface IDelivery {
//   id: string; // 배송지 ID
//   userId: IUser; // 유저 ID (추가 필드)
//   name: string; //배송지와 연결된 유저명
//   postalCode: number; //우편번호
//   defaultAddress: string; // 기본 주소
//   detailAddress: string; // 상세 주소
//   number: string; //폰번호
//   isDefault?: boolean; //기본 배송지 여부
// }

// interface IUser {
//   /** ID */
//   id: string;
//   name?: string;
//   /** 아이디 */
//   loginId: string;
//   /** 비밀번호 */
//   password?: string;
//   /** 이메일  (unique) */
//   email: string;
//   /** 역할 */
//   role: RoleType;
//   /** salt */
//   salt?: string;
//   /** 프로필 */
//   profile: IProfile;
//   /** 카트 */
//   cart: ICart;
//   /** 주문 목록 */
//   orders?: IOrder[];
//   /** 1:1 문의 목록 */
//   inquiries?: IInquiry[];
// }
