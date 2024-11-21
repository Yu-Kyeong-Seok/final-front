"use client";
import Input from "@/src/components/Input/Input";
import styles from "./modify.view.module.scss";
import cn from "classnames/bind";
import Button from "@/src/components/Button/Button";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
    const router = useRouter();
    
    const [userId, setUserId] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isCheckEmail, setIsCheckEmail] = useState(false);

    const [myEmail, setMyEmail] = useState<string | null>(null);

    const form = useForm<ModifyFormType>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: {
            id: "",
            currentPassword : "",
            newPassword : "",
            newPasswordConfirm : "",
            name : "",
            email : "",
            phoneNumber : "",
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
                    [yup.ref("newPassword", undefined)],
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

    const { watch } = form;

    const watchedEmail = watch("email");

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

                setName(res.data.profile.firstName); 
                form.setValue("name", res.data.profile.firstName);

                setEmail(res.data.email);
                form.setValue("email", res.data.email);
                setMyEmail(res.data.email);
                setPhoneNumber(res.data.profile.phoneNum); 
                form.setValue("phoneNumber", res.data.profile.phoneNum);

            } else {
                throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsCheckEmail(true);
            setLoading(false); // 로딩 상태 종료
        }
    };

    useEffect(() => {
        fetchUserInfo(); // 컴포넌트가 마운트될 때 사용자 정보 가져오기
    }, []);

    useEffect(() => {

        if(isCheckEmail) {
            setIsCheckEmail(false);
        }
    }, [watchedEmail]);

    const handleSubmit = form.handleSubmit(
        async (data) => {
            try {
                const accessToken = document.cookie.split("; ").find((cookie) => cookie.startsWith("accessToken="))?.split("=")[1];
                
                const response = await fetch( process.env.NEXT_PUBLIC_SERVER_URL + "/api/users/" + userId , {
                    method: "PUT",
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        loginId: data.id,
                        password: data.newPassword,
                        email: data.email,
                        profile: {
                            phoneNum: data.phoneNumber,
                            firstName: data.name,
                        }
                    }),
                });

                if (response.status === 200) {
                    alert("회원가입 성공!");
                    router.push("/"); // 회원가입 성공 시 로그인으로 이동
                } else {
                    alert("회원가입에 실패했습니다.");
                }
            } catch (error: any) {
                if (error.response && error.response.data.message) {
                    alert(error.response.data.message); // 서버에서 보낸 에러 메시지
                } else {
                    alert("회원가입 중 문제가 발생했습니다.");
                }
            }
        },
        (error) => {
            const [key, { message }] = Object.entries(error)[0];
            alert(message);
        }
    );
    // 중복확인
    const handleCheckDuplicate = async (type: "loginId" | "email", value: string) => {
        if (!value) {
            alert(`${type === "loginId" ? "아이디" : "이메일"}을 입력해주세요.`);
            return;
        }

        if(value === myEmail){
            setIsCheckEmail(true);
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${type}?${type}=${value}`, {   
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                const res = await response.json();

                if (res.exists) {
                    alert(`${type === "loginId" ? "아이디" : "이메일"}이 이미 사용 중입니다.`);
                } else {
                    alert(`사용 가능한 ${type === "loginId" ? "아이디" : "이메일"}입니다.`);

                    switch (type) {
                        case 'email':
                            setIsCheckEmail(true);
                            break;
                    }
                }

            } else {
                alert("서버와 통신에 실패했습니다.");
            }

        } catch (error) {
            console.error(error);
            alert("중복 확인 중 오류가 발생했습니다.");
        } finally {

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
                                <label>아이디</label>
                                <Input 
                                    placeholder="아이디를 입력해주세요"
                                    id={field.name}
                                    name={field.name}
                                    onChange={field.onChange}
                                    value={field.value}
                                    readonly={true}
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
                                    <Button type="button" variants="solid" onClick={() => handleCheckDuplicate("email", field.value)} disabled={isCheckEmail || !field.value}><span>중복확인</span></Button>
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