"use client";
import Input from "@/src/components/Input/Input";
import styles from "./info.view.module.scss";
import cn from "classnames/bind";
import Button from "@/src/components/Button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const cx = cn.bind(styles);

type InfoType = {
    id: string;
    password: string;
};

const InfoView = () => {
    
    const form = useForm<InfoType>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: {
            id: "TestId",
            password : "12341234",
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
                <h4>비밀번호 재확인</h4>
                <p>회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인해주세요.</p>
                <br></br>
                <Controller
                    control={form.control}
                    name={"id"}
                    render={({ field }) => {
                        return (
                            <React.Fragment>
                                <div className={cx("InnerContainer")}>
                                <label>아이디</label>
                                    <Input 
                                        placeholder="아이디를 입력해주세요"
                                        id={field.name}
                                        name={field.name}
                                        onChange={field.onChange}
                                        value={field.value}
                                    ></Input>
                                </div>
                            </React.Fragment>
                        )
                    }}
                />
                
                <Controller
                    control={form.control}
                    name={"password"}
                    render={({ field }) => {
                        return (
                            <React.Fragment>
                                <div className={cx("InnerContainer")}>
                                    <label className={cx("RequiredLabel")}>비밀번호<span>*</span></label>
                                    <Input 
                                        type="password"
                                        placeholder="비밀번호를 입력해주세요"
                                        id={field.name}
                                        name={field.name}
                                        onChange={field.onChange}
                                        value={field.value}
                                    ></Input>
                                </div>
                            </React.Fragment>
                        )
                    }}
                />
                <div className={cx("ButtonWrapper")}>
                <Button type="submit">확인<span></span></Button>
                </div>
            </form>
        </div>
    );
};

export default InfoView;