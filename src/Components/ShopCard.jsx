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
    <div className="w-full max-w-[220px] bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-200">

  <Link to={`/productdetailspage?id=${encodeURIComponent(id)}`} className="block">
    <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
      <img 
        className="h-full w-full"
        src={img} 
        alt={name}
      />
    </div>
  </Link>

  <div className="p-3 flex flex-col gap-1">

    <p className="text-gray-800 text-sm font-semibold line-clamp-2">
      {name}
    </p>

    <p className="text-gray-500 text-xs">
      {brand}
    </p>



    <div className="flex justify-between items-center mt-2">
      <div className="flex items-center gap-2 mt-1">
        <span className="text-green-600 font-semibold text-sm">
          ₹{discountedPrice}
        </span>
        <span className="text-gray-400 line-through text-xs">
          ₹{sellingPrice}
        </span>
      </div>
      {quantity && (
        <div className="flex items-center border rounded-md overflow-hidden">
          <button
            onClick={updateQuantity}
            data-action="decrease"
            className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
          >
            −
          </button>

          <input
            type="number"
            className="w-10 text-center outline-none border-x"
            value={item ? item.quantity : 1}
            onChange={(e) =>
              dispatch(
                setQuantity({
                  productId: id,
                  quantity: Number(e.target.value),
                })
              )
            }
          />

          <button
            data-action="increase"
            onClick={updateQuantity}
            className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
          >
            +
          </button>
        </div>
      )}

      {!quantity && (
        <button
          onClick={BuyItem}
          data-action={ButtonName}
          className="bg-amber-400 hover:bg-amber-500 text-xs px-3 py-1 rounded-md font-semibold transition"
        >
          {ButtonName ? ButtonName : "Buy"}
        </button>
      )}

    </div>

  </div>

  <Toaster />
</div>
  )
}
