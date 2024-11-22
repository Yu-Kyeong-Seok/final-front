import React, { useState } from "react";
import ProductDetailView from "@/src/views/product/productDetail.view";

type PageProps = {
    params: { id: string };
};

export default function Home({ params }: PageProps) {
    const { id } =  params;
    // const productId = Array.isArray(params.id) ? params.id[0] : params.id;
    
    return (
    <React.Fragment>
        <ProductDetailView id={id}/>
    </React.Fragment>
    );
}

