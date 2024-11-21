import ProductList from "@/src/views/product/product.view";


type ProductListPageProps = {
    params:Promise<{categories:string[]}>;
}

export default async function ProductListPage(props:ProductListPageProps){
    const {params} = props;

    const categories = await params;
    console.log(categories);

    const tabs = [
        "전체보기",
        "친환경",
        "고구마·감자·당근",
        "브로콜리·파프리카·양배추",
        "양파·대파·마늘·배추",
        "오이·호박·고추",
        "냉동·이색·간편채소",
        "콩나물·버섯"
    ];

    const labels = [
        "브랜드",
        "가격",
        "혜택",
        "유형"
    ]

    return (
        <ProductList tabs={tabs} products={[]} labels={labels}/>
    );
}