'use client';
import { usePathname } from 'next/navigation';
import { TransformedProduct } from '@/src/api/product.api';
import styles from './categories.module.scss';
import cn from 'classnames/bind';
import ProductItem from '@/src/components/ProductItem/ProductItem';

const cx = cn.bind(styles); 

interface CategoriesViewProps {
    category: string;
    subcategory: string;
    products: TransformedProduct[];
}

export default function CategoriesView(props: CategoriesViewProps) {
    const {category, subcategory, products} = props;
    const pathname = usePathname();
    const decodedCategory = decodeURIComponent(category);
    const decodedSubcategory = decodeURIComponent(subcategory);

    if (!products) {
        return <p>Loading...</p>;
    }
    
    const productDefaultImage = products.map((product) => ({
        ...product,
        img:product.img || 'assets/images/sample.jpg'
    }));

    return (
        <div>
            <div className={cx("list-wrap")}>
                {productDefaultImage.map((product, index) => {
                    return(
                        <div key={product.id || `${product.name}-${index}`} className={cx("list-item")}>
                            <ProductItem product={product}/>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}