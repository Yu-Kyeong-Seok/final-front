"use client";
import Input from "@/src/components/Input/Input";
import styles from "./info.view.module.scss";
import cn from "classnames/bind";
import Button from "@/src/components/Button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import ModalWrap from "@/src/components/Modal/Modal";

const cx = cn.bind(styles);

type InfoFormType = {
    id: string;
    password: string;
};

const InfoView = () => {
    const router = useRouter();
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    
    const [isMove, setIsMove] = useState(false);

    const form = useForm<InfoFormType>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: {
            id: userId || "",
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

    // 사용자 정보를 가져오는 함수
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
                setUserId(res.data.loginId); // 유저 ID 설정
                form.setValue("id", res.data.loginId);
            } else {
                throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false); // 로딩 상태 종료
        }
    };

    useEffect(() => {
        fetchUserInfo(); // 컴포넌트가 마운트될 때 사용자 정보 가져오기
    }, []);


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
                    
                    setModalMessage("비밀번호 확인 성공!");
                    setIsMove(true);
                } else {
                    setModalMessage("비밀번호 확인에 실패했습니다.");
                }
            } catch (error: any) {
                console.error(error);
                setModalMessage("비밀번호 확인 중 문제가 발생했습니다.");
            } finally {
                openModal();
            }
        },
        (error) => {
            const [key, { message }] = Object.entries(error)[0];
            setModalMessage(message as string);
            openModal();
            // console.log(message);
        }
    );

    // 모달
    const [modalMessage, setModalMessage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const handleConfirm = () => {
        if(isMove) {
            router.push("/mypage/info/modify"); 
        }
    };

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
                                        value={userId ||field.value}
                                        readonly={true}
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

export default InfoView;