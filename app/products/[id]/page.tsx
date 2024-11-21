import React, { useEffect } from "react";
import ProductDetailView from "@/src/views/product/productDetail.view";

export default function Home({ params }: { params: { id: string } }) {

    const productId = Array.isArray(params.id) ? params.id[0] : params.id;
    
    // const params  = useParams();
    // const id = params?.id;

    // const productId = Array.isArray(id) ? id[0] : id;

    return (
    <React.Fragment>
        <ProductDetailView id={productId}/>
    </React.Fragment>
    );
}

