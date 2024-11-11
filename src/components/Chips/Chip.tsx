import styles from "./Chip.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

type ChipProps = {
  label: string;
  onClick: (label: string) => void;
};

const Chip = (props: ChipProps) => {
  const { label, onClick } = props;
  return (
    <div onClick={() => onClick(label)} className={cx("ChipText")}>
      {label}
    </div>
  );
};

export default Chip;
