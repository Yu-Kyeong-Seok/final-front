import React from "react";
import styles from "./Button.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

type ButtonProps = React.PropsWithChildren<{
  disabled?: boolean;
  variants?: "solid" | "outline";
  onClick?: any;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
}>;

const Button = (props: ButtonProps) => {
  const { disabled, variants, onClick, type, className, children } = props;
  return (
    <button
      className={cx("Button", className, variants)}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
