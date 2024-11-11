import TopTab from "./TopTab";
// import { useState } from "react";
import cn from "classnames/bind";
import styles from "./TopTabList.module.scss";

const cx = cn.bind(styles);

type TopTabListProps = {
  tabs: string[];
  selectedTab: string;
  onTabClick: (selectedTab: string) => void;
};

const TopTabList = (props: TopTabListProps) => {
  const { tabs, selectedTab, onTabClick } = props;

  return (
    <div className={cx("TabList")}>
      {tabs.map((tab) => (
        <TopTab
          key={tab}
          label={tab}
          isActive={selectedTab === tab}
          onClick={() => onTabClick(tab)}
        />
      ))}
    </div>
  );
};

export default TopTabList;
