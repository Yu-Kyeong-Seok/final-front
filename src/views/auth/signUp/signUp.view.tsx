"use client";
import Input from "@/src/components/Input/Input";
import styles from "./signUp.view.module.scss";
import cn from "classnames/bind";
import Button from "@/src/components/Button/Button";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import CheckBox from "@/src/components/CheckBox/CheckBox";
import { useRouter } from "next/navigation";
import ModalWrap from "@/src/components/Modal/Modal";

const cx = cn.bind(styles);

type SignUpFormType = {
    id: string;
    password: string;
    passwordConfirm: string;
    name: string;
    email: string;
    phoneNumber: string;
    terms: string[];
    verificationNumber?: string;
};

const SignUpView = () => {
    const router = useRouter();

    const [isCheckId, setIsCheckId] = useState(false); 
    const [isCheckEmail, setIsCheckEmail] = useState(false);

    const [showVerificationInput, setShowVerificationInput] = useState(false); // 인증번호 확인 입력 필드 표시 여부
    const [timer, setTimer] = useState(0); // 남은 시간 (초 단위)

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
                terms: yup
                .array()
                .of(yup.string().required("필수 약관을 선택해주세요"))
                .test(
                    "requird",
                    "필수 이용 약관에 동의해주세요.",
                    (value) => {
                    const requiredTerms = ["privacy", "using", "age"];

                    return requiredTerms.every((term) => value?.includes(term));
                    }
                )
                .required("약관 동의는 필수입니다."),
            })
        ),
    });
    
    const { watch } = form;

    // `id` 필드 값 변경 감지
    const watchedId = watch("id"); // watch로 `id` 필드 값 추적
    const watchedEmail = watch("email");

    // 가입하기
    const handleSubmit = form.handleSubmit(
        async (data) => {

            if(!isCheckId || !isCheckEmail)
            {
                setModalMessage("중복확인 해주세요");
                openModal();
                return;
            }

            try {
                const response = await fetch( process.env.NEXT_PUBLIC_SERVER_URL + "/api/users", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        loginId: data.id,
                        password: data.password,
                        email: data.email,
                        profile: {
                            phoneNum: data.phoneNumber,
                            firstName: data.name,
                        }
                    }),
                });

                if (response.status === 200) {
                    setModalMessage("회원가입 성공!");
                    router.push("/auth/login"); // 회원가입 성공 시 로그인으로 이동
                } else {
                    setModalMessage("회원가입에 실패했습니다.");
                }
            } catch (error: any) {
                if (error.response && error.response.data.message) {
                    setModalMessage(error.response.data.message); // 서버에서 보낸 에러 메시지
                } else {
                    setModalMessage("회원가입 중 문제가 발생했습니다.");
                }
            } finally {
                openModal();
    
            }
        },
        (error) => {
            const [key, { message }] = Object.entries(error)[0];
            console.log(message);
        }
    );

    // 인증번호 받기
    const handleSendPhoneNumber = async () => {
        try {

            setShowVerificationInput(true); // 클릭 시 인증번호 확인 필드 숨김

            setTimer(5); // 3분 타이머 시작
            // await new Promise((resolve) => setTimeout(resolve, 5000)); // 1분 = 60,000ms
        } catch (error) {
            console.error(error);
        } finally {

        }
    }
    // 중복확인
    const handleCheckDuplicate = async (type: "loginId" | "email", value: string) => {
        if (!value) {
            setModalMessage(`${type === "loginId" ? "아이디" : "이메일"}을 입력해주세요.`);
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
                    // alert(`${type === "loginId" ? "아이디" : "이메일"}이 이미 사용 중입니다.`);
                    setModalMessage(`이미 사용 중인 ${type === "loginId" ? "아이디" : "이메일"} 입니다.`);
                } else {
                    // alert(`사용 가능한 ${type === "loginId" ? "아이디" : "이메일"}입니다.`);
                    setModalMessage(`사용 가능한 ${type === "loginId" ? "아이디" : "이메일"}입니다.`);

                    switch (type) {
                        case 'loginId':
                            setIsCheckId(true);
                            break;
                        case 'email':
                            setIsCheckEmail(true);
                            break;
                    }
                }
            } else {
                setModalMessage("서버와 통신에 실패했습니다.");
            }

        } catch (error) {
            console.error(error);
            setModalMessage("중복 확인 중 오류가 발생했습니다.");
        } finally {
            openModal();
        }
    };

    // CheckBox
    const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태 추가

    const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id } = e.target;
        const currentValue = form.getValues("terms");
        const newValue = currentValue.includes(id)
        ? currentValue.filter((value) => value !== id)
        : [...currentValue, id];
        form.setValue("terms", newValue);
    };

    const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        if (isChecked) {
        // 전체 선택
        form.setValue("terms", ["privacy", "using", "marketing", "age"]);
        } else {
        // 전체 해제
        form.setValue("terms", []);
        }
    };

    useEffect(() => {
        const currentTerms = form.getValues("terms");
        const allTerms = ["privacy", "using", "marketing", "age"];

        const allChecked = allTerms.every((term) => currentTerms.includes(term));
        setSelectAll(allChecked);
    }, [form]);

    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(countdown); // 컴포넌트 언마운트 시 클리어
        }
        else {
            setShowVerificationInput(false);
        }

        }, [timer]);

    useEffect(() => {
        if(isCheckId) {
            setIsCheckId(false);
        }
    }, [watchedId]);

    useEffect(() => {
        if(isCheckEmail) {
            setIsCheckEmail(false);
        }
    }, [watchedEmail]);

    const formatTime = (seconds: number) => {
            const minutes = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
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
                                    onClick={() => handleCheckDuplicate("loginId", field.value)}
                                    disabled={isCheckId || !field.value} // 버튼 비활성화 
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
                {/* 비밀번호 확인 */}
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
                                        disabled={isCheckEmail || !field.value} // 버튼 비활성화 
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
                                    <Button type="button" disabled={!field.value} onClick={handleSendPhoneNumber}>
                                        <span>인증번호 받기</span>
                                    </Button>
                                    {/* {loading ? '전송 중...' : timer > 0 ? `${formatTime(timer)} 후 재시도` : '인증번호 받기'} */}
                                </div>
                            </React.Fragment>
                        )
                    }}
                />
                <br></br>
                {showVerificationInput && (
                    <Controller
                    control={form.control}
                    name={"verificationNumber"}
                    render={({ field }) => {
                        return (
                            <React.Fragment>
                                <div className={cx("InputContainer")}>
                                    <div className={cx("VerificationNumberWrapper")}>
                                        <Input 
                                            type="number"
                                            id={field.name}
                                            name={field.name}
                                            onChange={field.onChange}
                                            value={field.value}
                                        />
                                        {timer > 0 ? <span className={cx("VerificationNumber")}>{formatTime(timer)}</span> : ''}
                                    </div>
                                    <Button type="button" disabled={!field.value}>
                                        <span>인증번호 확인</span>
                                    </Button>
                                </div>
                            </React.Fragment>
                        )
                    }}
                    />
                )}
                {/* {timer > 0 ? `${formatTime(timer)} 후 재시도` : '인증번호 받기'} */}
                {/* 이용약관동의 */}
                <label className={cx("RequiredLabel")}>이용약관동의<span>*</span></label>
                <div className={cx("Padding")}>
                <fieldset>
                    <CheckBox
                        id="selectAll"
                        label="전체 동의합니다."
                        name="selectAll"
                        value={selectAll ? ["selectAll"] : []}
                        onChange={handleSelectAllChange}
                    />
                    <p>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>
                    <Controller
                        control={form.control}
                        name="terms"
                        render={({ field }) => (
                            <CheckBox
                                id="privacy"
                                label="이용약관 동의(필수)"
                                name={field.name}
                                value={field.value}
                                onChange={handleTermsChange}
                            />
                        )}
                    />
                    <Controller
                        control={form.control}
                        name="terms"
                        render={({ field }) => (
                            <CheckBox
                                id="using"
                                label="개인정보, 이용동의(필수)"
                                name={field.name}
                                value={field.value}
                                onChange={handleTermsChange}
                            />
                        )}
                    />
                    <Controller
                        control={form.control}
                        name="terms"
                        render={({ field }) => (
                            <CheckBox
                                id="marketing"
                                label="마케팅 정보 수신 동의(선택)"
                                name={field.name}
                                value={field.value}
                                onChange={handleTermsChange}
                            />
                        )}
                    />
                    <Controller
                        control={form.control}
                        name="terms"
                        render={({ field }) => (
                            <CheckBox
                                id="age"
                                label="본인은 만 14세 이상입니다.(필수)"
                                name={field.name}
                                value={field.value}
                                onChange={handleTermsChange}
                            />
                        )}
                    />
                </fieldset>
                </div>
                <div className={cx("Padding")}>
                    <Button 
                        type="submit" 
                        onClick={handleSubmit}
                    >
                        <span>가입하기</span>
                    </Button>
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

export default SignUpView;
