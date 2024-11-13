"use client";
import Input from "@/src/components/Input/Input";
import styles from "./login.view.module.scss";
import cn from "classnames/bind";
import { Controller, useForm } from "react-hook-form";
import Button from "@/src/components/Button/Button";
import CheckBoxView from "@/src/components/CheckBox/CheckBox.view";

const cx = cn.bind(styles);

const LoginView = () => {
    return (
        <div className={cx("Wrapper")}>
            <form className={cx("Form")}>
                <div className={cx("InnerContainer")}>
                    <Input placeholder="아이디를 입력해주세요"></Input>
                    <Input type="password" placeholder="비밀번호를 입력해주세요"></Input>
                </div>
                <div className={cx("InnerContainer")}>
                    <Button variants="solid"><span>로그인</span></Button>
                    <Button variants="outline"><span>회원가입</span></Button>
                </div>
                <div className={cx("SearchContainer")}>
                    <a>아이디 찾기</a>
                    <span></span>
                    <a >비밀번호 찾기</a>
                </div>
            </form>
        </div>
    );
};

export default LoginView;