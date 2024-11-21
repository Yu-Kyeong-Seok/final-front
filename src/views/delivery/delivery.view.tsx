"use client";
import { useState } from "react";
import Script from "next/script";
import styles from "./delivery.module.scss";
import cn from "classnames/bind";
import Input from "@/src/components/Input/Input";
import Button from "@/src/components/Button/Button";
import CheckBox from "@/src/components/CheckBox/CheckBox";
import { useRouter } from "next/navigation";

const cx = cn.bind(styles);

const DeliveryView: React.FC = () => {
  const [address, setAddress] = useState({
    zonecode: "", // 우편번호
    fullAddress: "", // 전체 주소
    detailAddress: "", // 상세 주소
  });

  const [isPostcodeOpen, setIsPostcodeOpen] = useState(true);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  /** 페이지 이동 */
  const router = useRouter();
  // const handleClick = (path: string) => {
  //   router.push(path);
  // };

  const handleComplete = (data: any) => {
    const fullAddress = data.address;
    const zonecode = data.zonecode;

    setAddress({ ...address, fullAddress, zonecode });
    setIsPostcodeOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;

    setSelectedValues((prev) =>
      checked ? [...prev, id] : prev.filter((value) => value !== id)
    );
  };

  const handleSubmit = async () => {
    const { zonecode, fullAddress, detailAddress } = address;
    const isDefault = selectedValues.includes("checkbox1");

    const requestData = {
      postalCode: zonecode,
      defaultAddress: fullAddress,
      detailAddress,
      number: phone,
      isDefault,
      name,
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      if (!apiUrl) throw new Error("API URL이 설정되지 않았습니다.");

      const accessToken = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("accessToken="))
        ?.split("=")[1];
      if (!accessToken) throw new Error("토큰이 없습니다");

      const response = await fetch("http://localhost:4000/api/deliveries", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        // 성공적으로 데이터가 저장됨
        alert("배송지가 저장되었습니다.");
        router.push("/deliveryAddress");
      } else {
        alert("배송지 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("배송지 생성 실패:", error);
      alert("서버와의 연결에 문제가 발생했습니다.");
    }
  };

  return (
    <div className={cx("AddressContainer")}>
      {/* Daum Postcode Script */}
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="lazyOnload" // 페이지 로드 후 script 로드
        onLoad={() => setIsScriptLoaded(true)}
      />

      {isPostcodeOpen && isScriptLoaded && (
        <div className={cx("AddressSearch")}>
          {typeof window !== "undefined" && (
            <div
              ref={(el) => {
                if (el) {
                  new (window as any).daum.Postcode({
                    oncomplete: handleComplete,
                    width: "100%",
                    height: "100%",
                  }).embed(el);
                }
              }}
              className={cx("Address")}
            />
          )}
        </div>
      )}

      <div className={cx("AddressContent")}>
        <div className={cx("AddressInfoText")}>
          <h3>
            <a>하루배송</a> 지역입니다.
          </h3>
          <span>오늘 주문하면 다음 날 바로 도착해요.</span>
          <b>지역별 배송 휴무 정책은 배송안내를 참고해주세요.</b>
        </div>
        {address.fullAddress && (
          <div className={cx("AddressResult")}>
            <dl>
              <dt>({address.zonecode})</dt>
              <dd>{address.fullAddress}</dd>
            </dl>

            <Input
              placeholder={"나머지 주소를 입력해주세요"}
              value={address.detailAddress}
              onChange={(e) =>
                setAddress({ ...address, detailAddress: e.target.value })
              }
            />

            <div className={cx("Check")}>
              <CheckBox
                onChange={handleChange}
                value={selectedValues}
                id="checkbox1"
                name="checkbox-group"
                label={"기본 배송지로 저장"}
              />
            </div>

            <div className={cx("CustomerInput")}>
              <span>받으실 분</span>
              <Input
                placeholder={"이름을 입력해주세요"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={cx("NameInput")}
              />

              <span>휴대폰</span>
              <Input
                placeholder={"전화번호를 입력해주세요"}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className={cx("SaveButton")}>
          <Button
            disabled={false}
            variants={"solid"}
            type={"submit"}
            onClick={handleSubmit}
          >
            <span>저장</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryView;
