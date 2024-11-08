import React from "react";
import styles from "./Input.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

type InputProps = {
  placeholder: string;
};

const Input = (props: InputProps) => {
  const { placeholder } = props;
  return <input className={cx("Input")} placeholder={placeholder}></input>;
};

export default Input;
