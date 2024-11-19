'use client';

import { FiHome, FiUser } from "react-icons/fi";
import { IoIosMenu } from "react-icons/io";
import { LuSearch } from "react-icons/lu";
import styles from './BottomTab.module.scss';
import cn from 'classnames/bind';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const cx = cn.bind(styles);

interface TabItem {
    icon: JSX.Element;
    label: string;
    path: string;
}

const BottomTab = () => {
    const pathname = usePathname();

    const tabs: TabItem[] = [
        {
            icon: <FiHome size={24} />,
            label: 'Home',
            path: '/'
        },
        {
            icon: <IoIosMenu size={24} />,
            label: 'Menu',
            path: '/order'
        },
        {
            icon: <LuSearch size={24} />,
            label: 'Search',
            path: '/search'
        },
        {
            icon: <FiUser  size={24} />,
            label: 'Profile',
            path: '/auth/login'
        }
    ];

    return (
        <nav className={cx('bottomTab')}>
        {tabs.map((tab) => (
            <Link
            href={tab.path}
            key={tab.path}
            className={`${cx('tabItem')} ${pathname === tab.path ? cx('active') : ''}`}
            >
            {tab.icon}
            </Link>
        ))}
        </nav>
    );
};

export default BottomTab;