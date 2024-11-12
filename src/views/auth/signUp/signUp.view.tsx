"use client";
import Input from "@/src/components/Input/Input";
import styles from "./signUp.view.module.scss";
import cn from "classnames/bind";
import { Controller, useForm } from "react-hook-form";
import Button from "@/src/components/Button/Button";
import CheckBoxView from "@/src/components/CheckBox/CheckBox.view";
import { useState } from "react";

const cx = cn.bind(styles);

// type SignUpProps = {
//     id: string;
//     password: string;
//     passwordConfirm: string;
//     name: string;
//     email: string;
//     phoneNumber: number;
//     terms: string[];
// }

const SignUpView = () => {
    const [modalMessage, setModalMessage] = useState("");

    const { control, handleSubmit, watch, setError, clearErrors, formState: { errors, isValid } } = useForm({
        mode: "onChange",
        defaultValues: {
            username: "",
            password: "",
            passwordConfirm: "",
            name: "",
            email: "",
            phone: "",
            termsAccepted: false,
        },
    });

    const onSubmit = (data) => {
        console.log("회원가입 정보:", data);
        alert("회원가입 성공!");
    };

    const onError = (errorList) => {
        // 첫 번째 오류 메시지를 모달로 표시
        const firstErrorKey = Object.keys(errorList)[0];
        const message = errorList[firstErrorKey]?.message || "오류가 발생했습니다.";
        setModalMessage(message);
    };

    const checkDuplicate = (type) => {
        // Mock function to simulate server-side check
        const mockApiCheck = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (type === "username" && watch("username") === "existingUser") {
                    reject("이미 사용 중인 아이디입니다.");
                } else if (type === "email" && watch("email") === "existingEmail@test.com") {
                    reject("이미 사용 중인 이메일입니다.");
                } else {
                    resolve("사용 가능한 " + (type === "username" ? "아이디" : "이메일") + "입니다.");
                }

                console.log("watch" + watch("username")); // 현재 입력된 값
                console.log("isvalid" + isValid); // 폼의 유효성
            }, 1000);
        });

        mockApiCheck
            .then((message) => alert(message))
            .catch((error) => setError(type, { type: "manual", message: error }));
    };

    return (
        <div className={cx("Wrapper")}>
            <form className={cx("Form")} onSubmit={handleSubmit(onSubmit)}>
                {/* 아이디 */}
                <label className={cx("Label")}>아이디<span className={cx("Span")}>*</span></label>
                <div className={cx("InputContainer")}>
                    <Controller
                        name="username"
                        control={control}
                        rules={{ required: "아이디를 입력해주세요." }}
                        render={({ field }) => (
                            <Input {...field} placeholder="아이디를 입력해주세요" />
                        )}
                    />
                    {/* <Input placeholder="아이디를 입력해주세요"></Input> */}
                    <Button variants="solid" text="중복확인" onClick={() => checkDuplicate("username")}></Button>
                </div>
                {errors.username && <p className={cx("Error")}>{errors.username.message}</p>}

                {/* 비밀번호 */}
                <label className={cx("Label")}>비밀번호<span className={cx("Span")}>*</span></label>
                <Controller
                    name="password"
                    control={control}
                    rules={{ required: "비밀번호를 입력해주세요." }}
                    render={({ field }) => (
                        <Input {...field} type="password" placeholder="비밀번호를 입력해주세요" />
                    )}
                />
                {errors.password && <p className={cx("Error")}>{errors.password.message}</p>}

                {/* 비밀번호 확인 */}
                <label className={cx("Label")}>비밀번호확인<span className={cx("Span")}>*</span></label>
                <Controller
                    name="passwordConfirm"
                    control={control}
                    rules={{
                        required: "비밀번호를 확인해주세요.",
                        validate: (value) =>
                            value === watch("password") || "비밀번호가 일치하지 않습니다.",
                    }}
                    render={({ field }) => (
                        <Input {...field} type="password" placeholder="비밀번호를 한번 더 입력해주세요" />
                    )}
                />
                {errors.passwordConfirm && <p className={cx("Error")}>{errors.passwordConfirm.message}</p>}

                {/* 이름 */}
                <label className={cx("Label")}>이름<span className={cx("Span")}>*</span></label>
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: "이름을 입력해주세요." }}
                    render={({ field }) => (
                        <Input {...field} placeholder="이름을 입력해주세요" />
                    )}
                />
                {errors.name && <p className={cx("Error")}>{errors.name.message}</p>}

                {/* 이메일 */}
                <label className={cx("Label")}>이메일<span className={cx("Span")}>*</span></label>
                <div className={cx("InputContainer")}>
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: "이메일을 입력해주세요." }}
                        render={({ field }) => (
                            <Input {...field} placeholder="예: marketkurly" />
                        )}
                    />
                    <Button 
                        variants="solid" 
                        text="중복확인" 
                        onClick={() => checkDuplicate("email")} 
                    />
                </div>
                {errors.email && <p className={cx("Error")}>{errors.email.message}</p>}

                {/* 휴대폰 */}
                <label className={cx("Label")}>휴대폰<span className={cx("Span")}>*</span></label>
                <div className={cx("InputContainer")}>
                    <Controller
                        name="phone"
                        control={control}
                        rules={{ required: "휴대폰 번호를 입력해주세요." }}
                        render={({ field }) => (
                            <Input {...field} type="number" placeholder="숫자만 입력해주세요." />
                        )}
                    />
                    <Button 
                        text="인증번호받기" 
                        disabled={!watch("phone")} 
                    />
                </div>
                {errors.phone && <p className={cx("Error")}>{errors.phone.message}</p>}

                {/* 이용약관 동의 */}
                <label className={cx("Label")}>이용약관동의<span className={cx("Span")}>*</span></label>
                <div className={cx("Padding")}>
                    <Controller
                        name="termsAccepted"
                        control={control}
                        rules={{ required: "이용약관에 동의해주세요." }}
                        render={({ field }) => (
                            <CheckBoxView/>
                        )}
                    />
                </div>
                {errors.termsAccepted && <p className={cx("Error")}>{errors.termsAccepted.message}</p>}

                {/* 가입하기 버튼 */}
                <div className={cx("Padding")}>
                    <Button text="가입하기" type="submit" disabled={!isValid} />
                </div>
            </form>

            {/* 모달 표시 */}
            {modalMessage && (
                <Modal message={modalMessage} onClose={() => setModalMessage("")} />
            )}
        </div>
    );
};

export default SignUpView;