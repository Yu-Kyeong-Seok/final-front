"use client";
import Input from "@/src/components/Input/Input";
import styles from "./signUp.view.module.scss";
import cn from "classnames/bind";
import { Controller, useForm } from "react-hook-form";
import Button from "@/src/components/Button/Button";
import CheckBoxView from "@/src/components/CheckBox/CheckBox.view";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";

const cx = cn.bind(styles);

type SignUpFormType = {
    id: string;
    password: string;
    passwordConfirm: string;
    name: string;
    email: string;
    phoneNumber: string;
    terms: string[];
};

const SignUpView = () => {
    const [isChecking, setIsChecking] = useState(false); // For handling loading state
    const [checkResult, setCheckResult] = useState<{ id?: string; email?: string }>({}); // Store check results

    const form = useForm<SignUpFormType>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: {
            id: "",
            password : "",
            passwordConfirm : "",
            name : "",
            email : "",
            phoneNumber : "",
            terms : [],
        },
        resolver: yupResolver(
            yup.object().shape({
                id: yup
                .string()
                .min(4, "아이디는 최소 4자 이상이어야 합니다")
                .max(20, "아이디는 20자를 초과할 수 없습니다")
                .matches(/^[a-zA-Z0-9]+$/, "영문, 숫자만 사용 가능합니다")
                .required("아이디를 입력해주세요"),
                password: yup
                .string()
                .min(4, "비밀번호는 최소 4자리 이상입니다.")
                .required("비밀번호를 입력해주세요."),
                passwordConfirm: yup
                .string()
                .required("비밀번호를 한번 더 입력해주세요.")
                .oneOf(
                    [yup.ref("password", undefined)],
                    "비밀번호가 일치하지 않습니다."
                ),
                name: yup
                .string()
                .required("이름을 입력해주세요"),
                email: yup
                .string()
                .email("이메일 형식이 올바르지 않습니다.")
                .required("이메일을 입력해주세요."),
                phoneNumber: yup
                .string()
                .matches(/^[0-9]{10,11}$/, "올바른 휴대폰 번호를 입력해주세요")
                .required("휴대폰 번호를 입력해주세요"),
                // terms: yup
                // .array()
                // .of(yup.string())
                // .test(
                //     "requird",
                //     "개인정보 처리방침과 서비스 이용약관은 필수로 동의해야합니다.",
                //     (value) => {
                //     const requiredTerms = ["privacy", "using"];

                //     return requiredTerms.every((term) => value?.includes(term));
                //     }
                // )
                // .required(),
            })
        ),
    });

    const handleSubmit = form.handleSubmit(
        (data) => {
            const results = {
            privacy: data.terms.includes("privacy"),
            using: data.terms.includes("using"),
            marketing: data.terms.includes("marketing"),
            };
    
            console.log(data);
        },
        (error) => {
            const [key, { message }] = Object.entries(error)[0];

            alert(message);

            // Focus
            const firstErrorField = Object.keys(error)[0];
            form.setFocus(firstErrorField as keyof SignUpFormType);
        }
    );
    const handleCheckDuplicate = async (type: "id" | "email", value: string) => {
        if (!value) {
            alert(`${type === "id" ? "아이디" : "이메일"}을 입력해주세요.`);
            return;
        }

        setIsChecking(true);
        try {
            // 중복 체크
            // const response = await fetch(`/api/check-${type}`, {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ [type]: value }),
            // });

            // const data = await response.json();

            // if (data.exists) {
            //     alert(`${type === "id" ? "아이디" : "이메일"}이 이미 사용 중입니다.`);
            // } else {
            //     alert(`사용 가능한 ${type === "id" ? "아이디" : "이메일"}입니다.`);
            //     setCheckResult((prev) => ({ ...prev, [type]: value }));
            // }
            alert(`사용 가능한 ${type === "id" ? "아이디" : "이메일"}입니다.`);
        } catch (error) {
            console.error(error);
            alert("중복 확인 중 오류가 발생했습니다.");
        } finally {
            setIsChecking(false);
        }
    };

    return (
        <div className={cx("Wrapper")}>
            <form className={cx("Form")} onSubmit={handleSubmit}>
                {/* 아이디 */}
                <Controller
                    control={form.control}
                    name={"id"}
                    render={({ field }) => {
                        return (
                            <React.Fragment>
                                <label className={cx("RequiredLabel")} htmlFor={field.name}>아이디<span>*</span></label>
                                <div className={cx("InputContainer")}>
                                    <Input 
                                        placeholder="아이디를 입력해주세요"
                                        id={field.name}
                                        name={field.name}
                                        onChange={field.onChange}
                                        value={field.value}
                                    />
                                <Button 
                                    type="button" 
                                    variants="solid" 
                                    onClick={() => handleCheckDuplicate("id", field.value)}
                                    disabled={isChecking || !field.value || field.value === checkResult.id} // 버튼 비활성화 
                                >
                                    <span>중복확인</span>
                                </Button>
                                </div>
                            </React.Fragment>
                        )
                    }}
                />

                {/* 비밀번호 */}
                <Controller
                    control={form.control}
                    name={"password"}
                    render={({ field }) => {
                        return (
                            <React.Fragment>
                                <label className={cx("RequiredLabel")} htmlFor={field.name}>비밀번호<span>*</span></label>
                                <div className={cx("InputContainer")}>
                                    <Input 
                                        type="password"
                                        placeholder="비밀번호를 입력해주세요"
                                        id={field.name}
                                        name={field.name}
                                        onChange={field.onChange}
                                        value={field.value}
                                    />
                                </div>
                            </React.Fragment>
                        )
                    }}
                />
                <Controller
                    control={form.control}
                    name={"passwordConfirm"}
                    render={({ field }) => {
                        return (
                            <React.Fragment>
                                <label className={cx("RequiredLabel")} htmlFor={field.name}>비밀번호확인<span>*</span></label>
                                <div className={cx("InputContainer")}>
                                    <Input 
                                        type="password"
                                        placeholder="비밀번호를 입력해주세요"
                                        id={field.name}
                                        name={field.name}
                                        onChange={field.onChange}
                                        value={field.value}
                                    />
                                </div>
                            </React.Fragment>
                        )
                    }}
                />
                {/* 이름 */}
                <Controller
                    control={form.control}
                    name={"name"}
                    render={({ field }) => {
                        return (
                            <React.Fragment>
                                <label className={cx("RequiredLabel")} htmlFor={field.name}>이름<span>*</span></label>
                                <div className={cx("InputContainer")}>
                                    <Input 
                                        placeholder="이름을 입력해주세요"
                                        id={field.name}
                                        name={field.name}
                                        onChange={field.onChange}
                                        value={field.value}
                                    />
                                </div>
                            </React.Fragment>
                        )
                    }}
                />
                {/* 이메일 */}
                <Controller
                    control={form.control}
                    name={"email"}
                    render={({ field }) => {
                        return (
                            <React.Fragment>
                                <label className={cx("RequiredLabel")} htmlFor={field.name}>이메일<span>*</span></label>
                                <div className={cx("InputContainer")}>
                                    <Input 
                                        placeholder="예: marketkurly"
                                        id={field.name}
                                        name={field.name}
                                        onChange={field.onChange}
                                        value={field.value}
                                    />
                                    <Button 
                                        type="button" 
                                        variants="solid" 
                                        onClick={() => handleCheckDuplicate("email", field.value)}
                                        disabled={isChecking || !field.value || field.value === checkResult.email} // 버튼 비활성화 
                                    >
                                        <span>중복확인</span>
                                    </Button>
                                </div>
                            </React.Fragment>
                        )
                    }}
                />
                
                {/* 휴대폰 */}
                <Controller
                    control={form.control}
                    name={"phoneNumber"}
                    render={({ field }) => {
                        return (
                            <React.Fragment>
                                <label className={cx("RequiredLabel")} htmlFor={field.name}>휴대폰<span>*</span></label>
                                <div className={cx("InputContainer")}>
                                    <Input 
                                        type="tel"
                                        placeholder="숫자만 입력해주세요."
                                        id={field.name}
                                        name={field.name}
                                        onChange={field.onChange}
                                        value={field.value}
                                    />
                                <Button 
                                    type="button" 
                                    disabled={!field.value}
                                    >
                                    <span>인증번호받기</span>
                                </Button>
                                </div>
                            </React.Fragment>
                        )
                    }}
                />
                {/* 이용약관동의 */}
                <label className={cx("RequiredLabel")}>이용약관동의<span>*</span></label>
                <div className={cx("Padding")}>
                    <CheckBoxView></CheckBoxView>
                </div>
                <div className={cx("Padding")}>
                    <Button><span>가입하기</span></Button>
                </div>
            </form>
        </div>
    );
};

export default SignUpView;