// src/views/category/category.tsx
'use client'
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from "./category.module.scss";
import cn from "classnames/bind";
import Link from 'next/link';

const cx = cn.bind(styles);

interface CategoryType {
    main: string;
    sub: string[];
}

// 카테고리 데이터
const categories: CategoryType[] = [
    {
        main: "채소",
        sub: ["전체보기", "친환경", "고구마·감자·당근", "시금치·쌈채소·나물", "브로콜리·파프리카·양배추", "오이·호박·고추", "냉동채소", "기타채소"]
    },
    {
        main: "과일·견과·쌀",
        sub: ["전체보기", "친환경", "제철과일", "국산과일", "수입과일", "견과류", "쌀·잡곡"]
    },
    {
        main: "수산·해산·건어물",
        sub: ["전체보기", "제철수산", "생선류", "굴비·반건류", "오징어·낙지·문어", "새우·게·랍스터", "해산물·조개류", "수산가공품", "김·미역·해조류"]
    },
    {
        main: "정육·계란",
        sub: ["전체보기", "국내산 소고기", "수입산 소고기", "돼지고기", "계란류", "닭·오리고기", "양념육·돈까스", "양고기"]
    },
    {
        main: "국·반찬·메인요리",
        sub: ["전체보기", "국·탕·찌개", "밑반찬", "김치·젓갈·장류", "두부·어묵·부침개", "메인요리"]
    },
    
    // 필요한 만큼 카테고리 추가
];

export default function CategoryMenu() {
    const [openCategory, setOpenCategory] = useState<string | null>(null);

    const handleCategoryClick = (category: string) => {
        if (openCategory === category) {
            setOpenCategory(null);
        } else {
            setOpenCategory(category);
        }
    };

    return (
        <div className={cx('categoryMenu')}>
            <div className={cx('categoryList')}>
                {categories.map((category) => (
                    <div key={category.main} className={cx('categoryItem')}>
                        <button
                            className={cx('mainCategory')}
                            onClick={() => handleCategoryClick(category.main)}
                        >
                            <span>{category.main}</span>
                            <ChevronDown 
                                className={cx('icon', { open: openCategory === category.main })} 
                                size={20}
                            />
                        </button>
                        <div className={cx('subCategories', { open: openCategory === category.main })}>
                            {category.sub.map((subCategory) => (
                                <Link
                                    key={subCategory}
                                    href={`/category/${encodeURIComponent(category.main)}/${encodeURIComponent(subCategory)}`}
                                    className={cx('subCategory')}
                                >
                                    {subCategory}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}