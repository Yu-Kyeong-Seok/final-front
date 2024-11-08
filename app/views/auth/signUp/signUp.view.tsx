"use client";
import Input from "@/app/components/Input/Input";
import styles from "./signUp.view.module.scss";
import cn from "classnames/bind";
import { Controller, useForm } from "react-hook-form";
import Button from "@/app/components/Button/Button";

const cx = cn.bind(styles);

const SignUpView = () => {
    return (
        <div className={cx("Wrapper")}>
            <form className={cx("Form")}>
                <label className={cx("Label")}>아이디<span className={cx("Span")}>*</span></label>
                <Input placeholder="아이디를 입력해주세요"></Input>
                <Button text="중복확인"></Button>
                <label className={cx("Label")}>비밀번호<span className={cx("Span")}>*</span></label>
                <Input placeholder="비밀번호를 입력해주세요"></Input>
                <label className={cx("Label")}>비밀번호확인<span className={cx("Span")}>*</span></label>
                <Input placeholder="비밀번호를 한번 더 입력해주세요"></Input>
                <label className={cx("Label")}>이름<span className={cx("Span")}>*</span></label>
                <Input placeholder="이름을 입력해주세요"></Input>
                <label className={cx("Label")}>이메일<span className={cx("Span")}>*</span></label>
                <Input placeholder="예: marketkurly"></Input>
                <Button Variants="outline" text="중복확인"></Button>
                <label className={cx("Label")}>휴대폰<span className={cx("Span")}>*</span></label>
                <div className={cx("InputWrapper")}>
                    <Input placeholder="숫자만 입력해주세요."></Input>
                    <Button text="인증번호받기" disabled={true}></Button>
                </div>
                <Button text="가입하기"></Button>
                <Button Variants="outline" disabled={true} text="가입하기"></Button>
            </form>
        </div>
    );
};

export default SignUpView;