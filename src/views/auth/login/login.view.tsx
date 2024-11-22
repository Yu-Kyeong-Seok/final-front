"use client";
import Input from "@/src/components/Input/Input";
import styles from "./login.view.module.scss";
import cn from "classnames/bind";
import { Controller, useForm } from "react-hook-form";
import Button from "@/src/components/Button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ModalWrap from "@/src/components/Modal/Modal";

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
                    
                    setModalMessage("로그인 성공!");

                    fetchUserInfo();

                    router.push("/"); // 로그인 성공 시 대시보드로 이동
                } else {
                    setModalMessage("로그인에 실패했습니다.");
                }
            } catch (error: any) {
                console.error(error);
                setModalMessage("로그인 중 문제가 발생했습니다.");
            } finally {
                openModal();
            }
        },
        (error) => {
            const [key, { message }] = Object.entries(error)[0];
            console.log(message);
        }
    );
    
    const fetchUserInfo = async () => {
        try {
            const accessToken = document.cookie.split("; ").find((cookie) => cookie.startsWith("accessToken="))?.split("=")[1];

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                const res = await response.json();

                document.cookie = `cartId=${res.data.cart.id}; path=/`;

            } else {
                throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
            }
        } catch (err) {
            console.log(err);
        } finally {
        }
    };

    // 모달
    const [modalMessage, setModalMessage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const handleConfirm = () => {
    };
    
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
        
        <ModalWrap 
            isOpen={isModalOpen} 
            onClose={closeModal} 
            onConfirm={handleConfirm}
        >
            <p>{modalMessage}</p>
        </ModalWrap>
        </div>
    );
};

export default LoginView;
