import styles from "./BottomSheet.module.scss";
import cn from "classnames/bind";
import { IoCloseOutline } from "react-icons/io5";

const cx = cn.bind(styles);

type Item = {
  id: string;
  label: string;
};

type BottomSheetProps = {
  items: Item[];
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  selectedItem?: string;
};

const BottomSheet = (props: BottomSheetProps) => {
  const { items, isOpen, onClose, title, selectedItem } = props;

  return (
    <div className={cx("Wrapper")}>
      {/* 배경 dimmed  */}
      {isOpen && <div className={cx("Dimmed")} onClick={onClose}></div>}

      {/* 바텀 시트부분 */}
      <div className={cx("BottomSheet", { opened: isOpen })}>
        {/* isOpen이 true면 opened 클래스 붙여줌 */}

        <div className={cx("BottomSheetInner")}>
          <h3>{items.find((f) => f.id === selectedItem)?.label || title}</h3>

          <button onClick={onClose} className={cx("BottomSheetBtn")}>
            <IoCloseOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
