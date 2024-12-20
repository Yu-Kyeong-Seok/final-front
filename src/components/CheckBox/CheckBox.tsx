import React from "react";
import styles from "./CheckBox.module.scss";
import cn from "classnames/bind";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const cx = cn.bind(styles);

type CheckBoxProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string[];
  id: string;
  name?: string;
  // label?: string;
  label?: React.ReactNode;
};

const CheckBox = (props: CheckBoxProps) => {
  const { onChange, value, id, name, label } = props;

  const checked = React.useMemo(() => value.includes(id), [value, id]);

  return (
    <label htmlFor={id} className={cx("CheckBox")}>
      <input
        type={"checkbox"}
        id={id}
        name={name}
        hidden
        onChange={onChange}
        className={cx("Input")}
        checked={checked}
      />
      <p
        className={cx("CheckBoxWrapper", {
          checked,
        })}
      >
        {checked ? (
          <IoMdCheckmarkCircleOutline className={cx("CheckedIcon")} />
        ) : (
          <IoMdCheckmarkCircleOutline className={cx("UncheckedIcon")} />
        )}
      </p>
      <span className={cx("CheckBoxText")}>{label}</span>
    </label>
  );
};

export default CheckBox;
