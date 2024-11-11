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
  className?: string;
  children?: React.ReactNode;
  // 바텀시트 내부 내용 동적으로 받기위해 추가함
};

const BottomSheet = (props: BottomSheetProps) => {
  const { items, isOpen, onClose, title, selectedItem, className, children } =
    props;

  return (
    <div className={cx("Container")}>
      {/* 배경 dimmed  */}
      {isOpen && <div className={cx("Dimmed")} onClick={onClose}></div>}

      {/* 바텀 시트부분 */}
      <div className={cx("BottomSheet", { opened: isOpen }, className)}>
        {/* isOpen이 true면 opened 클래스 붙여줌 */}

        <div className={cx("BottomSheetInner", className)}>
          <div className={cx("BottomSheetHeader")}>
            <h3>{items.find((f) => f.id === selectedItem)?.label || title}</h3>

            <button onClick={onClose} className={cx("BottomSheetBtn")}>
              <IoCloseOutline />
            </button>
          </div>

          <div className={cx("BottomSheetContent")}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
