import React from "react";
import styles from "./Button.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

type ButtonProps = {
    text?: string;
    disabled?: boolean;
    Variants?: "solid" | "outline"; 
}

const Button = (props: ButtonProps) => {
    const { text, disabled, Variants } = props;
    return (
        <button className={cx("Button", {[`${Variants}`]: Variants})} disabled={disabled}>
            <span className={cx("span")}>{text}</span>
        </button>

    );
};

export default Button;