import React from "react";
import styles from "./Input.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

type InputProps = {
    placeholder?: string;
    type?: string;
    id?: string;
    name?: string;
    onChange?: any;
    value?: any;
    className?: string;
}

const Input = (props: InputProps) => {
    const { placeholder, type, id, name, onChange, value, className } = props;
    return (
        <input className={cx("Input", className)} 
            placeholder={placeholder}
            type={type}
            id={id}
            name={name}
            onChange={onChange}
            value={value}
        />
    );
};

export default Input;
