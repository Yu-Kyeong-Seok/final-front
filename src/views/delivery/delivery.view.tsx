"use client";
import { useState } from "react";
import Script from "next/script";
import styles from "./delivery.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

const DeliveryView: React.FC = () => {
  const [address, setAddress] = useState({
    zonecode: "", // 우편번호
    fullAddress: "", // 전체 주소
  });

  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  const handleComplete = (data: any) => {
    const fullAddress = data.address;
    const zonecode = data.zonecode;

    setAddress({ fullAddress, zonecode });
    setIsPostcodeOpen(false);
  };

  return (
    <div>
      {/* Daum Postcode Script */}
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="lazyOnload" // 페이지 로드 후 script 로드
      />

      <h1>배송지 입력</h1>
      <div>
        <button type="button" onClick={() => setIsPostcodeOpen(true)}>
          주소 검색
        </button>
      </div>
      {isPostcodeOpen && (
        <div className={cx("Address")}>
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
              style={{ width: "100vw", height: "100vh" }}
            />
          )}
        </div>
      )}

      {address.fullAddress && (
        <div>
          <p>
            <span>우편번호:</span> {address.zonecode}
          </p>
          <p>
            <span>주소:</span> {address.fullAddress}
          </p>
        </div>
      )}
    </div>
  );
};

export default DeliveryView;
