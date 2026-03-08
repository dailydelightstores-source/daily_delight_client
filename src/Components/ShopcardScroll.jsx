import { useEffect, useState } from 'react'
import ShopCard from '../Components/ShopCard.jsx'
import axios from 'axios';
import { Backend_URL } from '../utils/Constant.js';


export default function ShopcardScroll() {

  const [ProductData, setProductData] = useState([]);

  useEffect(() => {

    async function getCategoryList() {
      try {
        const response = await axios.get(`${Backend_URL}/api/Admin/CategorywithProduct/getCategorywithProduct`);
        setProductData(response.data.getcategoryList);
      } catch (error) {
        console.log(error);
      }
    }

    getCategoryList();
  }, [])

  function getAdapt() {
    console.log(ProductData);
  }

  return (
    <>
      {
        ProductData.map((category) => {
          return (<div key={category.categories._id} >
            <div className="w-fit">
              <h3 className="text-xl sm:text-2xl font-bold pt-4 pb-3 pl-5 tracking-wide font3">
                {category.categories.name}
              </h3>
              <hr className="border border-gray-500 ml-5 mb-4 w-2/3 rounded-full" />
            </div>

            <div
              className="
                  px-4 pb-5
                  flex gap-6 sm:gap-12
                  overflow-x-auto scroll-smooth
                  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
            >
              {
                category.products.map( (product) =>{
                  return(
                    <ShopCard key={product._id} name={product.name} brand={product.brand} discountedPrice={product.discountedPrice} sellingPrice={product.sellingPrice} id={product._id} img={product.images[0].url} quantity={false} ButtonName="Buy Now" />
                  )
                })
              }

            </div>
          </div>
          )
        })
      }
    </>
  )
}
