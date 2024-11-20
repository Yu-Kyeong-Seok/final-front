"use client";
import Input from "@/src/components/Input/Input";
import styles from "./login.view.module.scss";
import cn from "classnames/bind";
import { Controller, useForm } from "react-hook-form";
import Button from "@/src/components/Button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import { useRouter } from "next/navigation";

const cx = cn.bind(styles);

type LoginFormType = {
    id: string;
    password: string;
};

const LoginView = () => {
    const router = useRouter();
    const handleClick = (path: string) => {
        router.push(path);
    };

    const form = useForm<LoginFormType>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: {
            id: "",
            password : "",
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
        async (data) => {
            try {
                const response = await fetch( process.env.NEXT_PUBLIC_SERVER_URL + "/api/auth/login", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        loginId: data.id,
                        password: data.password,
                    }),
                });

                if (response.status === 200) {
                    const res = await response.json();
                    document.cookie = `accessToken=${res.data}; path=/`;
                    
                    alert("로그인 성공!");
                    router.push("/"); // 로그인 성공 시 대시보드로 이동
                } else {
                    alert("로그인에 실패했습니다.");
                }
            } catch (error: any) {
                if (error.response && error.response.data.message) {
                    alert(error.response.data.message); // 서버에서 보낸 에러 메시지
                } else {
                    alert("로그인 중 문제가 발생했습니다.");
                    // alert(error)
                }
            }
            // 로그아웃시 토큰 제거 예시 
            // function logout() {
            //     localStorage.removeItem("accessToken");
            //     window.location.href = "/login"; // 로그인 페이지로 이동
            // }
        },
        (error) => {
            const [key, { message }] = Object.entries(error)[0];
            alert(message);
        }
    );

    return (
        <div className={cx("Wrapper")}>
            <form className={cx("Form")}>
                <Controller
                    control={form.control}
                    name={"id"}
                    render={({ field }) => {
                        return (
                            <React.Fragment>
                                <div className={cx("InnerContainer")}>
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
                <div className={cx("InnerContainer")}>
                    <Button 
                        type="submit" 
                        variants="solid"
                        onClick={handleSubmit}
                    >
                        <span>로그인</span>
                    </Button>
                    <Button 
                        type="button" 
                        variants="outline"
                        onClick={() => handleClick("/auth/signup")}
                    ><span>회원가입</span></Button>
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
