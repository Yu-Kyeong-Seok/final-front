import styles from "./Chip.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

type ChipProps = {
  label: string;
  onClick: (label: string) => void;
  className?: string;
};

const Chip = (props: ChipProps) => {
  const { label, onClick, className } = props;
  return (
    <div onClick={() => onClick(label)} className={cx("ChipText", className)}>
      {label}
    </div>
  );
};

export default Chip;
