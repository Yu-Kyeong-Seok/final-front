import cn from "classnames/bind";
import styles from "./TopTab.module.scss";

const cx = cn.bind(styles);

type TopTapProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

const TopTab = (props: TopTapProps) => {
  const { label, isActive, onClick } = props;
  return (
    <div className={cx("TabItem", { active: isActive })} onClick={onClick}>
      {label}
    </div>
  );
};

export default TopTab;
