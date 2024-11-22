import React from "react";
import ProductDetailView from "@/src/views/product/productDetail.view";

export default function Home({ params }: { params: { id: string } }) {

    const productId = Array.isArray(params.id) ? params.id[0] : params.id;

    return (
    <React.Fragment>
        <ProductDetailView id={productId}/>
    </React.Fragment>
    );
}

