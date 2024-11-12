import React from "react";
import styles from "./Input.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

type InputProps = {
    placeholder?: string;
    type?: string;
}

const Input = (props: InputProps) => {
    const { placeholder, type } = props;
    return (
        <input className={cx("Input")} placeholder={placeholder} type={type}>

        </input>
    );
};

export default Input