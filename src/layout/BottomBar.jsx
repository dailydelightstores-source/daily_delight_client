import React from 'react'
import searchIcon from '../assets/icons/search-interface-symbol.png'
import cart from '../assets/icons/shopping-cart.png'
import heart from '../assets/icons/heart.png'
import contactUs from '../assets/icons/customer-service.png'
import deals from "../assets/icons/deal.png"
import { useDispatch } from 'react-redux'
import { openSearch } from '../features/ui/uiSlice.js'
import { Link } from 'react-router-dom'

export default function BottomBar() {

  const dispatch = useDispatch()

  return (
    <div
    className="
      sm:hidden fixed bottom-6 justify-self-center
      w-6/7
      flex justify-evenly items-center
      rounded-4xl
      bottomBarbg
      border-3 border-gray-300
      py-3
      shadow-md
      transition-all duration-300
    "
  >
    <img className="w-6 cursor-pointer active:scale-90 transition-transform" src={heart} alt="" />
    <Link to="/cart" ><img className="w-6 cursor-pointer active:scale-90 transition-transform" src={cart} alt="" /></Link>
    <img
      className="w-6 cursor-pointer active:scale-90 transition-transform"
      onClick={() => { dispatch(openSearch()) }}
      src={searchIcon}
      alt=""
    />
    <img className="w-6 cursor-pointer active:scale-90 transition-transform" src={deals} alt="" />
    <Link to="/service" ><img className="w-6 cursor-pointer active:scale-90 transition-transform" src={contactUs} alt="" /></Link>
  </div>
  )
}
