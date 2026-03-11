import Logo from '../assets/20251208_194458_0000.png';
import searchIcon from '../assets/icons/search-interface-symbol.png';
import User from '../assets/icons/user.png';
import Cart from '../assets/icons/shopping-cart.png';
import contactUs from '../assets/icons/customer-service.png';
import { Link } from 'react-router-dom';
import SearchBox from '../Components/SearchBox.jsx';
import { useDispatch, useSelector } from "react-redux";
import { closeSearch, openSearch } from '../features/ui/uiSlice.js';
import { Activity, useRef } from 'react';

export default function Navbar() {

    const dispatch = useDispatch();
    const isSearchOpen = useSelector((state) => state.ui.isSearchOpen);


    function SearchBar(){
        if (!isSearchOpen) {
            dispatch(openSearch());
        }else{
            dispatch(closeSearch());
        }
    }

  return (
    <div className=' fixed w-screen'>
        <div className="flex justify-between bg-yellow-300 items-center px-6 sm:px-18 py-1 sm:py-3">
            <img className=' w-14' src={Logo} alt="Daily Delight logo" />
            <ul className={` hidden ${isSearchOpen ? 'hidden lg:hidden' : 'md:flex lg:flex'} md:hidden   gap-12 text-md font3`}>
                <li className='transition'>Best Deal</li>
                <li className='transition'>Recent Product</li>
                <li className='transition'>Grocery</li>
                <li className='transition '>Ration</li>
                <li className='transition '>Chocolate</li>
            </ul>
            <SearchBox />
            <div className={` ${ isSearchOpen ? 'hidden sm:flex' : 'flex'}  gap-8 `}>
                <Activity className="flex items-center gap-4">
    
    {/* Search Icon */}
    <img
        className={`w-7 ${isSearchOpen ? "lg:block hidden" : "sm:block hidden"}`}
        onClick={SearchBar}
        src={searchIcon}
        alt=""
    />

    {/* User */}
    <Link className="flex gap-2 font-normal" to="/signin">
        <img
            className={`w-7 ${isSearchOpen ? "hidden lg:block" : "sm:block"}`}
            src={User}
            alt=""
        />
        {!isSearchOpen && (
            <span className="block sm:hidden font3">Login</span>
        )}
    </Link>

    {/* Cart */}
    <Link
        to="/cart"
        className={`${isSearchOpen ? "hidden lg:block" : "sm:block hidden"}`}
    >
        <img className="w-7" src={Cart} alt="" />
    </Link>

    {/* Service */}
    <Link
        to="/service"
        className={`${isSearchOpen ? "hidden lg:block" : "sm:block hidden"}`}
    >
        <img className="w-7" src={contactUs} alt="" />
    </Link>

</Activity>
            </div>
        </div>
    </div>
  )
}

