"use client";
import Input from "@/src/components/Input/Input";
import styles from "./info.view.module.scss";
import cn from "classnames/bind";
import Button from "@/src/components/Button/Button";

const cx = cn.bind(styles);

const InfoView = () => {
    return ( 
        <div className={cx("Wrapper")}>
            <form className={cx("Form")}>
                <h4>비밀번호 재확인</h4>
                <p>회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인해주세요.</p>
                <br></br>
                <label>아이디</label>
                {/* readonly */}
                {/* myid */}
                <Input placeholder="아이디를 입력해주세요"></Input>
                <label className={cx("RequiredLabel")}>비밀번호<span>*</span></label>
                <Input type="password" placeholder="비밀번호를 입력해주세요"></Input>
                <div className={cx("ButtonWrapper")}>
                <Button type="submit">확인<span></span></Button>
                </div>
            </form>
        </div>
    );
};

export default InfoView;