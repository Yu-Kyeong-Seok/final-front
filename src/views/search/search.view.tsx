"use client";
import React, { useEffect, useState } from "react";
import styles from "./search.view.module.scss";
import cn from "classnames/bind";
import { LuSearch } from "react-icons/lu";
import { IoIosCloseCircle } from "react-icons/io";
import { Product, TransformedProduct, fetchProducts, searchProducts } from "@/src/api/product.api"
import ProductItem from "@/src/components/ProductItem/ProductItem";
import Button from "@/src/components/Button/Button";
import Chip from "@/src/components/Chips/Chip";

const cx = cn.bind(styles);

const SearchView: React.FC = () => {
    let index=1; //리스트 인덱스
    const [keyword, setKeyword] = useState('');
    const [products, setProducts] = useState<TransformedProduct[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [list,setList]=useState<TransformedProduct[]>([]);
    const [dropdown,setDropDown]=useState(false);
    const [isSearching,setIsSearching]=useState(false);
    
    //검색 제출
    const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!keyword.trim()) return;
        setDropDown(false)
        setIsSearching(false)
        await startSearch();

    }
    const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const value=e.target.value
        setKeyword(value);
        
   
        if(!value.trim()){ //검색어 비어있을때
            setDropDown(false)
            setIsSearching(false)
            setProducts([])
        }else{
            setDropDown(true)
            setIsSearching(true) //검색 중일때
        }
    }
    const handleClear=()=>{
        setKeyword('');
        setProducts([])
        setError(null)
        setDropDown(false)
        setIsSearching(false)
    }
    //검색 실행
    const startSearch=async()=>{
        if(!keyword.trim()){
            setProducts([]);
            setError(null)
            setIsSearching(false)
            return;
        }
        setIsLoading(true);
        setError(null)


        try{
            const productsData = await searchProducts(keyword);
            setProducts(productsData);
        }catch (err) {
            setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    }
    //검색어가 변경될때마다
    useEffect(()=>{
        const debounceTimer=setTimeout(()=>{
            if(keyword.trim()){
                startSearch();
            }
        },200);
        return ()=> clearTimeout(debounceTimer)
    },[keyword])
  
    useEffect(() => {
        const getProducts = async () => {
            try {
                const productsData = await fetchProducts();
                //10개만 불러오기
                const shuffledProducts=productsData
                  .sort(()=>Math.random()- 0.5)
                  .slice(0,10);
                setList(shuffledProducts);
            } catch (err) {
                setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        getProducts();
    }, []);

   return (
    <>
    {isSearching && <div className={cx("overlay")}/>}
        
        
       <div className={cx("Wrapper")}>
           <div className={cx("searchBox")}>
               <form className={cx("searchForm")} onSubmit={handleSubmit}>
                   <div className={cx("inputWrapper")}>
                       <LuSearch className={cx("searchIcon")} />
                       <input
                           className={cx("Input")}
                           placeholder="검색어를 입력해주세요"
                           value={keyword}
                           onChange={handleSearch}
                       />
                       {keyword && (
                           <IoIosCloseCircle
                               className={cx("closeBtn")}
                               onClick={handleClear}
                           />
                       )}
                   </div>
                  
               
               </form>
              {/*드롭다운*/}
              {dropdown && keyword &&(
                    <div className={cx("dropdown")}>
                        {isLoading ? (
                            <div>검색중 ..</div>
                        ): products.length > 0 ?(
                            <div className={cx("list-wrap")}>
                                {products.map((product, index) => {
                                    return(
                                        <div key={product.id || `${product.name}-${index}`} className={cx("list-item")}>
                                            <ProductItem product={product}/>
                                        </div>
                                    )
                                })}
                            </div>
                        ):(
                            <div>검색 결과 없습니다.</div>
                        )}
                        </div>
                    )}
                
           </div>
                  {/* 검색 결과 표시 */}
           {!isSearching && (
 <div className={cx("searchResults")}>
 {isLoading ? (
     <div>검색 중...
     
     </div>

 ) : error ? (
     <div className={cx("error")}>{error}</div>
 ) : products.length > 0 ? (
     <div className={cx("productList")}>
         {products.map((product) => (
            <ProductItem key={product.id} product={product} />
         ))}
     </div>
 ) :  (
  <div className={cx("searchWrapper")}>
       <p className={cx("searchTitle")}>추천 검색어</p>
      <section  className={cx("searchContainer")}>
          <Chip label={"기저귀"} onClick={function (label: string): void {} }/>
          <Chip label={"아침식사"} onClick={function (label: string): void {} }/>
          <Chip label={"낫또"} onClick={function (label: string): void {} }/>
          <Chip label={"식빵"} onClick={function (label: string): void {} }/>
          <Chip label={"오리고기"} onClick={function (label: string): void {}}/>
          <Chip label={"곤약밥"} onClick={function (label: string): void {}}/>
          <Chip label={"핫도그"} onClick={function (label: string): void {}}/>
          <Chip label={"수박"} onClick={function (label: string): void {}}/>
          <Chip label={"기저귀"} onClick={function (label: string): void {} }/>
          <Chip label={"아침식사"} onClick={function (label: string): void {} }/>
          <Chip label={"낫또"} onClick={function (label: string): void {} }/>
          <Chip label={"식빵"} onClick={function (label: string): void {} }/>
          <Chip label={"오리고기"} onClick={function (label: string): void {}}/>
          <Chip label={"곤약밥"} onClick={function (label: string): void {}}/>
          <Chip label={"핫도그"} onClick={function (label: string): void {}}/>
          <Chip label={"수박"} onClick={function (label: string): void {}}/>
      </section >
      <section className={cx("upSearchContainer")}>
          <p className={cx("searchTitle")}>급상승 검색어</p>
          <p className={cx(("detail"))}>최근 1시간 동안 검색 횟수가 급상승했어요!</p>
          <div className={cx("list")}>
          {list.map((product) => {
             
              return(
                 
                  <ul key={product.id}>
                      <li className={cx("items")}>
                          <p className={cx("index")}>{index++}</p>
                          <p className={cx("listItem")}>{product.name}</p>
                      </li>
                  </ul>
              
              )
          })}
</div>
          </section>
 </div>
 )}
</div>
           )}
    
          
           {/* 추천 검색어*/}

       </div>
       </>
   );
};

export default SearchView;