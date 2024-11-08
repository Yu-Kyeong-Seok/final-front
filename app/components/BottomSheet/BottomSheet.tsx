import { useState } from "react";
import styles from "./BottomSheet.module.scss";
import cn from "classnames/bind";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

const cx = cn.bind(styles);

type Item = {
  id: string;
  label: string;
};

type BottomSheetProps = {
  items: Item[];
  onSelect?: (itemId: string) => void;
  title?: string;
  defaultSelectedItem?: string;
};

const BottomSheet = (props: BottomSheetProps) => {
  const { items, onSelect, title, defaultSelectedItem } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(defaultSelectedItem);

  const handleItemClick = (itemId: string) => {
    setSelectedItem(itemId);
    setIsOpen(true);
    onSelect?.(itemId);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={cx("Wrapper")}>
      <div className={cx("Inner")}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              handleItemClick(item.id);
            }}
            className={cx("FilterBtn")}
          >
            {item.label}
            <span>
              <MdKeyboardArrowDown />
            </span>
          </button>
        ))}
      </div>

      {/* 배경 dimmed  */}
      {isOpen && <div className={cx("Dimmed")} onClick={handleClose}></div>}
      {/* 바텀 시트부분 */}
      <div className={cx("BottomSheet", { opened: isOpen })}>
        {/* isOpen이 true면 opened 클래스 붙여줌 */}

        <div className={cx("BottomSheetInner")}>
          <h3>{items.find((f) => f.id === selectedItem)?.label || title}</h3>

          <button onClick={handleClose} className={cx("BottomSheetBtn")}>
            <IoCloseOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
