"use client";
import Input from "@/src/components/Input/Input";
import styles from "./modify.view.module.scss";
import cn from "classnames/bind";
import Button from "@/src/components/Button/Button";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";

const cx = cn.bind(styles);

type ModifyFormType = {
    id: string;
    currentPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
    name: string;
    email: string;
    phoneNumber: string;
};

const ModifyView = () => {

    
    const form = useForm<ModifyFormType>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: {
            id: "TestId",
            currentPassword : "12345678",
            newPassword : "12341234",
            newPasswordConfirm : "12341234",
            name : "TestName",
            email : "Test@naver.com",
            phoneNumber : "01012341234",
        },
        resolver: yupResolver(
            yup.object().shape({
                id: yup
                .string()
                .min(4, "아이디는 최소 4자 이상이어야 합니다")
                .max(20, "아이디는 20자를 초과할 수 없습니다")
                .matches(/^[a-zA-Z0-9]+$/, "영문, 숫자만 사용 가능합니다")
                .required("아이디를 입력해주세요"),
                currentPassword: yup
                .string()
                .min(4, "비밀번호는 최소 4자리 이상입니다.")
                .required("비밀번호를 입력해주세요."),
                newPassword: yup
                .string()
                .min(4, "비밀번호는 최소 4자리 이상입니다.")
                .required("비밀번호를 입력해주세요."),
                newPasswordConfirm: yup
                .string()
                .required("비밀번호를 한번 더 입력해주세요.")
                .oneOf(
                    [yup.ref("newPasswordConfirm", undefined)],
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
            })
        ),
    });

    const handleSubmit = form.handleSubmit(
        (data) => {
            console.log(data);
        },
        (error) => {
            const [key, { message }] = Object.entries(error)[0];

            alert(message);
        }
    );

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
                                <label>아이디</label>
                                <Input 
                                    placeholder="아이디를 입력해주세요"
                                    id={field.name}
                                    name={field.name}
                                    onChange={field.onChange}
                                    value={field.value}
                                ></Input>
                            </React.Fragment>
                        )
                    }}
                />

                {/* 현재 비밀번호 */}
                <Controller
                    control={form.control}
                    name={"currentPassword"}
                    render={({ field }) => {
                        return (
                            <React.Fragment>
                                <label>현재 비밀번호</label>
                                <Input 
                                    type="password"
                                    placeholder="비밀번호를 입력해주세요"
                                    id={field.name}
                                    name={field.name}
                                    onChange={field.onChange}
                                    value={field.value}
                                ></Input>
                            </React.Fragment>
                        )
                    }}
                />

                {/* 새 비밀번호 */}
                <Controller
                    control={form.control}
                    name={"newPassword"}
                    render={({ field }) => {
                        return (
                            <React.Fragment>
                                <label>새 비밀번호</label>
                                <Input 
                                    type="password"
                                    placeholder="새 비밀번호를 입력해주세요"
                                    id={field.name}
                                    name={field.name}
                                    onChange={field.onChange}
                                    value={field.value}
                                ></Input>
                            </React.Fragment>
                        )
                    }}
                />

                {/* 새 비밀번호 확인 */}
                <Controller
                    control={form.control}
                    name={"newPasswordConfirm"}
                    render={({ field }) => {
                        return (
                            <React.Fragment>
                                <label>새 비밀번호 확인</label>
                                <Input 
                                    type="password"
                                    placeholder="새 비밀번호를 다시 입력해주세요"
                                    id={field.name}
                                    name={field.name}
                                    onChange={field.onChange}
                                    value={field.value}
                                ></Input>
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
                                <label>이름</label>
                                <Input 
                                    placeholder="이름을 입력해주세요"
                                    id={field.name}
                                    name={field.name}
                                    onChange={field.onChange}
                                    value={field.value}
                                ></Input>
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
                                <label className={cx("RequiredLabel")}>이메일<span>*</span></label>
                                <div className={cx("InputContainer")}>
                                    <Input 
                                        placeholder="이메일을 입력해주세요"
                                        id={field.name}
                                        name={field.name}
                                        onChange={field.onChange}
                                        value={field.value}
                                    ></Input>
                                    <Button type="button" variants="solid"><span>중복확인</span></Button>
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
                                <label className={cx("RequiredLabel")}>휴대폰<span>*</span></label>
                                <div className={cx("InputContainer")}>
                                    <Input 
                                        type="tel"
                                        placeholder="휴대폰번호를 입력해주세요"
                                        id={field.name}
                                        name={field.name}
                                        onChange={field.onChange}
                                        value={field.value}
                                    ></Input>
                                    <Button type="button" variants="outline"><span>다른번호 인증</span></Button>
                                </div>
                                
                            </React.Fragment>
                        )
                    }}
                />

                {/* 수정하기 */}
                <div className={cx("ButtonWrapper")}>
                    <Button type="submit" ><span>수정하기</span></Button>
                </div>
            </form>
        </div>
    );
};

export default ModifyView;