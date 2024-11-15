"use client";
import Input from "@/src/components/Input/Input";
import styles from "./modify.view.module.scss";
import cn from "classnames/bind";
import Button from "@/src/components/Button/Button";

const cx = cn.bind(styles);

const ModifyView = () => {
    return ( 
        <div className={cx("Wrapper")}>
            <form className={cx("Form")}>
                <label>아이디</label>
                <Input placeholder="아이디를 입력해주세요"></Input>
                <label>현재 비밀번호</label>
                <Input type="password" placeholder="비밀번호를 입력해주세요"></Input>
                <label>새 비밀번호</label>
                <Input type="password" placeholder="새 비밀번호를 입력해주세요"></Input>
                <label>새 비밀번호 확인</label>
                <Input type="password" placeholder="새 비밀번호를 다시 입력해주세요"></Input>
                <label>이름</label>
                <Input placeholder="이름을 입력해주세요"></Input>
                <label className={cx("RequiredLabel")}>이메일<span>*</span></label>
                <div className={cx("InputContainer")}>
                    <Input placeholder="이메일을 입력해주세요"></Input>
                    <Button type="button" variants="solid"><span>중복확인</span></Button>
                </div>
                <label className={cx("RequiredLabel")}>휴대폰<span>*</span></label>
                <div className={cx("InputContainer")}>
                    <Input placeholder="휴대폰번호를 입력해주세요"></Input>
                    <Button type="button" variants="outline"><span>다른번호 인증</span></Button>
                </div>
                <div className={cx("ButtonWrapper")}>
                    <Button type="submit" ><span>수정하기</span></Button>
                </div>
            </form>
        </div>
    );
};

export default ModifyView;