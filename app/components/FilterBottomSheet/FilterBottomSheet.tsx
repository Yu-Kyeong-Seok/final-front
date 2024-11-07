import { useState } from "react";
import styles from "./FilterBottomSheet.module.scss";
import cn from "classnames/bind";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

const cx = cn.bind(styles);

type Filter = {
  id: string;
  label: string;
};

type FilterBottomSheetProps = {
  filters: Filter[];
  onFilterSelect?: (filterId: string) => void;
  title?: string;
  defaultFilter?: string;
};

const FilterBottomSheet = (props: FilterBottomSheetProps) => {
  const { filters, onFilterSelect, title, defaultFilter } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(defaultFilter);

  const handleFilterClick = (filterId: string) => {
    setSelectedFilter(filterId);
    setIsOpen(true);
    onFilterSelect?.(filterId);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={cx("FilterWrap")}>
      {/* 필터 맵 */}
      <div className={cx("FilterInner")}>
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => {
              handleFilterClick(filter.id);
            }}
            className={cx("FilterBtn")}
          >
            {filter.label}
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
          <h3>
            {filters.find((f) => f.id === selectedFilter)?.label || title}
          </h3>

          <button onClick={handleClose} className={cx("BottomSheetBtn")}>
            <IoCloseOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBottomSheet;
