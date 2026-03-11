import React, { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import BottomBar from "../layout/BottomBar";
import axios from "axios";
import { Backend_URL } from "../utils/Constant";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function Buy() {

    const navigate = useNavigate()

    const [products, setproducts] = useState([]);

    const [coupon, setCoupon] = ([]);

    const [ TotalMRP ,setTotalMRP ] = useState(0);
    const [ DiscountMRP , setDiscountMRP ] = useState(0);
    const [ CouponDiscount , setCouponDiscount ] = useState(0);

    const product = JSON.parse(localStorage.getItem('ProductData'))

    useEffect(() => {

        let ProductIds = []
        product.map((data) => {
            ProductIds.push(data.productId)
        })

        async function getproductData() {
            try {
                const response = await axios.post(`${Backend_URL}/api/Admin/cart/productbyids`, { ProductIds }, { withCredentials: true })
                let array = [];
                let TMRP = 0;
                let DMRP = 0;
                response.data.result.map((pro, key) => {
                    array.push({
                        "id": pro._id,
                        "name": pro.name,
                        "discountedPrice": pro.discountedPrice,
                        "sellingPrice": pro.sellingPrice,
                        "brand": pro.brand,
                        "images": pro.images[0].url,
                        "quantity": product.find(pdata => pdata.productId === pro._id)?.quantity || 1
                    })
                    
                    TMRP = TMRP + ( pro.sellingPrice * product.find(pdata => pdata.productId === pro._id)?.quantity || 1 )
                    DMRP = DMRP + ( pro.discountedPrice * product.find(pdata => pdata.productId === pro._id)?.quantity || 1 )
                })
                setTotalMRP(TMRP);
                setDiscountMRP(DMRP);
                setproducts(array);
            } catch (e) {
                if(e.response.data.error.name == "JsonWebTokenError"){
                    navigate("/signin")
                    toast.error("Please login to purchase")
                }
            }
        }

        getproductData();
    }, []);

    async function buy() {
        toast.custom((t) => (
  <div
    className={`${
      t.visible ? "animate-custom-enter" : "animate-custom-leave"
    } max-w-sm w-full bg-yellow-50 shadow-lg rounded-xl pointer-events-auto ring-1 ring-yellow-400 p-4`}
  >
    <div className="flex items-start gap-3">

      {/* Icon */}
      <div className="flex-shrink-0">
        <div className="h-9 w-9 rounded-full bg-yellow-400 flex items-center justify-center text-white text-sm font-bold">
          ✓
        </div>
      </div>

      {/* Text */}
      <div className="flex-1">
        <p className="text-sm font-semibold text-yellow-900">
          Order Successful 🎉
        </p>

        <p className="text-xs text-yellow-800 mt-1">
          Thanks for buying from <span className="font-semibold">Daily Delight</span>.
          Your product was purchased successfully.
        </p>

        <button
          onClick={() => toast.dismiss(t.id)}
          className="mt-2 text-xs text-yellow-700 font-semibold hover:text-yellow-900"
        >
          Close
        </button>
      </div>

    </div>
  </div>
));

    setTimeout(() => {
        navigate("/")
    }, 5000);
    }

    function updateQuantity(e,index){

        if(e.target.dataset.action == "increase"){
            let array = [];
            product.map( (pro) =>{
                if(pro.productId == e.target.dataset.id){
                    array.push({productId: pro.productId, quantity: pro.quantity + 1});
                }else{
                    array.push({productId: pro.productId, quantity: pro.quantity});
                }
            })

            localStorage.setItem("ProductData",JSON.stringify(array));

            setproducts(prev =>
                prev.map((item, i) =>
                i === index
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ));
            setTotalMRP(TotalMRP + products[index].sellingPrice );
            setDiscountMRP(DiscountMRP + products[index].discountedPrice);
        }else if(e.target.dataset.action == "decrease"){
            setproducts(prev =>
                prev.map((item, i) =>
                i === index
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ));
            setTotalMRP(TotalMRP - products[index].sellingPrice );
            setDiscountMRP(DiscountMRP - products[index].discountedPrice);
            let array = [];
            product.map( (pro) =>{
                if(pro.productId == e.target.dataset.id){
                    if((pro.quantity - 1) == 0){
                        setproducts( prevproducts => prevproducts.filter(item => item.id !== e.target.dataset.id ) )
                        return true
                    }
                    array.push({productId: pro.productId, quantity: pro.quantity - 1});
                }else{
                    array.push({productId: pro.productId, quantity: pro.quantity});
                }
            })

            localStorage.setItem("ProductData",JSON.stringify(array));
        }
        
    }


    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 pt-24">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-4">

                    {/* Products Section */}
                    <div className="md:col-span-2 space-y-5">
                        <h2 className="text-2xl font-bold">Your Products</h2>

                        {products.map((p, key) => {
                            return (
                                <div
                                    key={key}
                                    className="bg-white rounded-2xl shadow p-4 flex items-center gap-4"
                                >
                                    <img
                                        src={p.images}
                                        className="rounded-xl w-24 h-24 object-cover"
                                        alt={p.name}
                                    />

                                    <div className="flex-1">
                                        <h3 className="font-semibold font1">{p.name}</h3>

                                        <p>
                                            <span className="text-green-600 font-semibold font3">
                                                ₹{p.discountedPrice}
                                            </span>{" "}
                                            <span className="text-gray-400 font-semibold line-through">
                                                ₹{p.sellingPrice}
                                            </span>
                                        </p>
                                    </div>

                                    {/* Quantity */}
                                    <div className="flex items-center gap-3">
                                        <button onClick={(e) =>{updateQuantity(e,key)}} data-action="decrease" data-id={p.id} className="w-9 h-9 bg-gray-200 hover:bg-gray-300 rounded-lg"> − </button>
                                        <span className="font-semibold">{p.quantity}</span>
                                        <button onClick={(e) =>{updateQuantity(e,key)}} data-action="increase" data-id={p.id} className="w-9 h-9 bg-gray-200 hover:bg-gray-300 rounded-lg"> + </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-3xl shadow-lg p-6 space-y-6 h-fit  top-28">
                        <h2 className="text-xl font1 font-bold">Order Summary</h2>

                        <div className="flex gap-2">
                            <input
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                                placeholder="Enter coupon code"
                                className="flex-1 border rounded-xl px-3 py-2 focus:border-green-500 outline-none"
                            />
                            <button className="bg-green-600 text-white px-4 rounded-xl font3">
                                Apply
                            </button>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600 font1 font-bold">
                            <div className="flex justify-between">
                                <span>Total MRP</span>
                                <span>₹{TotalMRP}</span>
                            </div>

                            <div className="flex justify-between font1 font-bold text-green-600">
                                <span>Discount on MRP</span>
                                <span>₹{DiscountMRP}</span>
                            </div>

                            <div className="flex justify-between text-green-600 font1 font-bold">
                                <span>Coupon Discount</span>
                                <span>₹{CouponDiscount}</span>
                            </div>

                            <div className="border-t pt-2 flex justify-between font-semibold text-gray-900 text-base">
                                <span>Total Amount</span>
                                <span>₹{DiscountMRP}</span>
                            </div>
                        </div>

                        <p className="text-xs text-gray-400 leading-relaxed font1 font-medium">
                            By placing this order, you agree to our Terms of Service and Privacy Policy.
                        </p>

                        <button
                            onClick={buy}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-semibold text-lg transition font3">
                            Buy Now
                        </button>

                        <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-2 font3 text-gray-600">
                            <p>🔒 100% Secure Payments</p>
                            <p>📦 Easy Returns & Fast Delivery</p>
                            <p>📞 Need help? Contact support anytime</p>
                        </div>
                    </div>

                </div>
            </div>
            <Toaster />
            <BottomBar />
            <Footer />
        </>
    )
}
