"use client";
import { useState } from "react";
import Script from "next/script";
import styles from "./delivery.module.scss";
import cn from "classnames/bind";
import Input from "@/src/components/Input/Input";
import Button from "@/src/components/Button/Button";
import CheckBox from "@/src/components/CheckBox/CheckBox";

const cx = cn.bind(styles);

const DeliveryView: React.FC = () => {
  const [address, setAddress] = useState({
    zonecode: "", // 우편번호
    fullAddress: "", // 전체 주소
  });

  const [isPostcodeOpen, setIsPostcodeOpen] = useState(true);

  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const handleComplete = (data: any) => {
    const fullAddress = data.address;
    const zonecode = data.zonecode;

    setAddress({ fullAddress, zonecode });
    setIsPostcodeOpen(false);
  };

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;

    setSelectedValues((prev) =>
      checked ? [...prev, id] : prev.filter((value) => value !== id)
    );
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

            <Input placeholder={"나머지 주소를 입력해주세요"} />

            <div className={cx("Check")}>
              <CheckBox
                onChange={handleChange}
                value={selectedValues}
                id="checkbox1"
                name="checkbox-group"
                label={"기본 배송지로 저장"}
              />
            </div>
          </div>
        )}

        <div className={cx("SaveButton")}>
          <Button disabled={false} variants={"solid"} type={"submit"}>
            <span>저장</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryView;
