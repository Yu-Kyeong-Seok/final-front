type Status = "Processing" | "completed";
type InquiryType = "Cancel" | "Refund" | "Exchange" | "etc";
// type InquiryType = "Cancel" | "Refund" | "Exchange";

export interface IInquiry {
  /** 1:1문의 ID */
  inquiryId: string;
  /** 1:1문의 문의유형 */
  inquiryType: InquiryType;
  /** 1:1문의 제목 */
  title: string;
  /** 1:1문의 내용 */
  content: string;
  /** 작성자 */
  author: IUser;
  /** 상태 */
  status: Status;
  /** 작성일 */
  createdAt: Date;
}

// interface IUser {
//   /** ID */
//   id: string;
//   userName?: string;
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
