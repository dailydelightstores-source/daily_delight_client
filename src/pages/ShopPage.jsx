import Navbar from '../layout/Navbar.jsx';
import Footer from '../layout/Footer.jsx';
import BottomBar from '../layout/BottomBar.jsx';
import ShopCard from '../Components/ShopCard.jsx';
import { useSearchParams } from "react-router-dom"
import { Activity, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Backend_URL } from '../utils/Constant.js';

export default function ShopPage() {

  const [params] = useSearchParams()
  const query = params.get("query")
  const from = params.get("from")
  const to = params.get("to")

  const cacheRef = useRef({});

  const [Products , setProducts] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const key = `${query}_${from}_${to}`;

        // 🧠 1. Cache hit → instant load
        if (cacheRef.current[key]) {
          setProducts(cacheRef.current[key]);
          return;
        }

        // 🌐 2. API call
        const res = await axios.get(`${Backend_URL}/api/Admin/product/search`, {
          params: { query, from, to }
        });

        // 💾 3. Save to cache
        cacheRef.current[key] = res.data.result;
        setProducts(res.data.result);

      } catch (err) {
        console.error("Product fetch failed", err);
      }
    };

    fetchProducts();

  }, [query, from, to]);

  function moreProduct(e){

    const ProductQantityPerpage = 10;

    if(e.target.getAttribute('data-page') == "Previous"){
      navigate(`/searchpage?query=${encodeURIComponent(e.target.getAttribute('data-name'))}&from=${form - ProductQantityPerpage}&to=${to - ProductQantityPerpage}`)
      return true
    }
    
    if(e.target.getAttribute('data-page') == "Next"){
      navigate(`/searchpage?query=${encodeURIComponent(e.target.getAttribute('data-name'))}&from=${form + ProductQantityPerpage}&to=${to + ProductQantityPerpage}`)
      return true
    }
  }

  return (
    <div>
        <Navbar />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center pt-24 px-4">
        <Activity mode={!(Products == "") ? "visible" : "hidden"}>
            {
              Products.map( (product) =>{
                return (
                  <ShopCard key={product._id} name={product.name} brand={product.brand} discountedPrice={product.discountedPrice} sellingPrice={product.sellingPrice} id={product._id} quantity={false} ButtonName={"Buy"} img={product.images[0].url}/>
                )
              })
            }
        </Activity>     
        </div>
        {Products.length >= 10 && 
        <div className='flex justify-center gap-5 mt-7'>
            <button onClick={(e) =>{moreProduct(e)}}  data-page="Previous" className='text-xl font-light text-white bg-gray-800 border border-gray-800 py-2 px-6 '>Previous</button>
            <button onClick={(e) =>{moreProduct(e)}} data-page="Next" className='text-xl font-normal bg-white  border border-gray-800 py-2 px-6'>Next</button>
        </div> }
        <BottomBar />
        <Footer />
    </div>
  )
}
