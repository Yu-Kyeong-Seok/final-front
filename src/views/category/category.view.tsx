'use client';
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from "./category.module.scss";
import cn from "classnames/bind";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { fetchProducts, TransformedProduct } from '@/src/api/product.api';

const cx = cn.bind(styles);

interface CategoryType {
    main: string;
    sub: string[];
}

export default function CategoryMenu() {
    const pathname = usePathname();
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const [categories, setCategories] = useState<CategoryType[]>([]);

    useEffect(() => {
        // 데이터 패치 로직
        const fetchCategories = async () => {
            try {
                const data = await fetchProducts();
                const extractedCategories = extractCategories(data);
                setCategories(extractedCategories);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
    }, []);

    const extractCategories = (products: TransformedProduct[]): CategoryType[] => {
        const categoryMap: { [key: string]: Set<string> } = {};

        products.forEach((product) => {
            const { category, subCategory } = product;

            if (!categoryMap[category]) {
                categoryMap[category] = new Set();
            }

            categoryMap[category].add(subCategory);
        });

        return Object.entries(categoryMap).map(([main, sub]) => ({
            main,
            sub: Array.from(sub),
        }));
    };

    const handleCategoryClick = (category: string) => {
        setOpenCategory(prevCategory => prevCategory === category ? null : category);
    };

    const createCategoryUrl = (main: string, sub: string) => {
        return `/categories/${encodeURIComponent(main)}/${encodeURIComponent(sub)}`;
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
                                    key={`${category.main}-${subCategory}`}
                                    href={createCategoryUrl(category.main, subCategory)}
                                    className={cx('subCategory', { active: pathname === createCategoryUrl(category.main, subCategory) })}
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