import React from "react";
import styles from "./Button.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

type ButtonProps = {
  text?: string;
  disabled?: boolean;
  variants?: "solid" | "outline";
  onClick?: any;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
};

const Button = (props: ButtonProps) => {
  const { text, disabled, variants, onClick, type, className } = props;
  return (
    <button
      className={cx("Button", className, { [`${variants}`]: variants })}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      <span className={cx("span")}>{text}</span>
    </button>
  );
};

export default Button;
