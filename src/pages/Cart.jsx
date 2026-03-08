import { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import BottomBar from "../layout/BottomBar";
import ShopCard from "../Components/ShopCard";
import axios from "axios";
import { Backend_URL } from "../utils/Constant.js";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCart } from "../features/ui/uiQuantitySlice.js";

export default function Cart() {

  const navigate = useNavigate()

  const [cartData, setcartData] = useState([]);

  const [ TotalAmount , setTotalAmount ] = useState(0)

  
  const dispatch = useDispatch()


  useEffect(() => {
    getCartData();
  }, [])

  const getCartData = async () => {
    try{
      const response = await axios.get(`${Backend_URL}/api/Admin/cart/getItemfromCart`,{withCredentials: true}) ;
      setTotalAmount(response.data.result.totalAmount)
      setcartData(response.data.result.items)
      let cartDataStore = []
      response.data.result.items.map( (data) =>{
        cartDataStore.push({"productId":data.product._id,"quantity":data.quantity})
      })
      dispatch(setCart(cartDataStore))
    }catch(error){
      console.log(error)
      if(error.response.data.error.message == "jwt must be provided"){
        toast.error("Please login to see cart");
      }
    }
  }

  async function Proceed(){

    let cartDataStore = []
      cartData.map( (data) =>{
      cartDataStore.push({"productId":data.product._id,"quantity":data.quantity})
      })
    localStorage.setItem('ProductData', JSON.stringify(cartDataStore));
    navigate("/buy-product");
  }

  function removeCard(index) {
    setcartData(prev => prev.filter((_, i) => i !== index));
    getCartData();
};

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6 pt-24">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <h1 className="text-3xl font-semibold text-gray-600 mb-8">
            Cart
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:justify-self-auto justify-self-center">
              {
                cartData.map( (productData,key) =>{
                  return (
                    <ShopCard key={productData.product._id} name={productData.product.name} brand={productData.product.brand} discountedPrice={productData.product.discountedPrice} sellingPrice={productData.product.sellingPrice} id={productData.product._id} img={productData.product.images[0].url} ButtonName="" index={key} quantity={true} removeCard={removeCard} getCartData={getCartData}/>
                  )
                })
              }
          </div>

          <div className="mt-10 bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Subtotal</h3>
              <p className="text-2xl font-bold text-green-600">
                ₹{TotalAmount}
              </p>
            </div>

            <button onClick={Proceed} className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-xl font-semibold transition">
              Proceed to Checkout
            </button>
          </div>
          <Toaster />
        </div>
      </div>
      <BottomBar />
      <Footer />
    </>
  )
}
