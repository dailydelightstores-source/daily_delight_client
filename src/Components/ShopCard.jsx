import { Link, useNavigate } from 'react-router-dom'
import ProductImage from '../assets/ProductImage/ProductImage.avif'
import toast, { Toaster } from 'react-hot-toast'
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, increaseQuantity, setQuantity } from '../features/ui/uiQuantitySlice';
import axios from 'axios';
import { Backend_URL } from '../utils/Constant';
import useDebounce from '../utils/Debounce';

export default function ShopCard({ name, brand, discountedPrice, sellingPrice, id, img, ButtonName, quantity , removeCard , index , getCartData }) {
    
  let debouncedSearch;
  let isFirstRender = useRef(true);
  const isUserAction = useRef(false);
  const dispatch = useDispatch();

  let item;

  if(quantity){

    const items = useSelector(state => state.cart.items);
    item = items.find(item => item.productId === id);

    debouncedSearch = useDebounce(item.quantity, 500);

  }

    

    useEffect(() => {

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!isUserAction.current) return;

    async function update() {
      try {
        await axios.post(
          `${Backend_URL}/api/Admin/cart/quantityUpdate`,{ productId: id, value: debouncedSearch },{ withCredentials: true }
        );
        getCartData();
      } catch (error) {
        console.log(error);
      }
    }

    update();

    isUserAction.current = false;

  }, [debouncedSearch]);

  async function updateQuantity(e){

    isUserAction.current = true;
      
    if(e.target.dataset.action == "increase"){
      dispatch(increaseQuantity(id));     
      }else if(e.target.dataset.action == "decrease"){
        dispatch(decreaseQuantity(id));
        if(!(item.quantity - 1)){
          try{
              await axios.post(`${Backend_URL}/api/Admin/cart/removeItem`,{productId: id},{withCredentials: true});
              removeCard(index);
          }catch(error){
            console.log(error)
          }
        }
      }
    }
  

  

  const navigate = useNavigate();

  async function BuyItem(e) {
    if(e.target.dataset.action == "Buy Now"){
      let cartDataStore = [{ productId: id, quantity: 1  }]
        localStorage.setItem('ProductData', JSON.stringify(cartDataStore));
        navigate("/buy-product")
    }
  }


  
  return (
    <div className="border border-blak w-70">
      <Link to={`/productdetailspage?id=${encodeURIComponent(id)}`}>
        <img className='h-70' src={img} alt="" />
      </Link>
      <p className='text-gray-600 text-md font-semibold pt-3 pl-2 font3 leading-none'>{name}</p>
      <p className='text-gray-400 font-medium text-sm pl-2 mt-1 font3'>{brand}</p>
      <div className='flex justify-between px-2 pb-2 items-center w-66'>
        <p><span className='text-green-600 font-semibold font3'>₹{discountedPrice}</span> <span className='text-gray-400 font-semibold line-through'>₹{sellingPrice}</span></p>
        { quantity && <div className="flex items-center border rounded-md w-fit overflow-hidden">
              <button onClick={updateQuantity} data-action="decrease" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-lg font-semibold">
                −
              </button>

              <input
                type="number"
                className="w-12 text-center outline-none border-x"
                value={item ? item.quantity : 1}
                onChange={(e) =>{
                  dispatch(setQuantity({ productId: id, quantity: Number(e.target.value) }))}
                }
              />

              <button data-action="increase" onClick={updateQuantity} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-lg font-semibold">
                +
              </button>
            </div> }
        {
          !quantity &&
            
            <button onClick={BuyItem} data-action={ButtonName} className='bg-amber-300 px-4 py-1 font-semibold font3'>{ButtonName ? ButtonName : "Buy Now"}</button>
        }
      </div>
      <Toaster />
    </div>
  )
}
