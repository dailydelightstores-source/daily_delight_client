import Logo from '../assets/20251208_194458_0000.png';
import searchIcon from '../assets/icons/search-interface-symbol.png';
import User from '../assets/icons/user.png';
import Cart from '../assets/icons/shopping-cart.png';
import contactUs from '../assets/icons/customer-service.png';
import { Link } from 'react-router-dom';
import SearchBox from '../Components/SearchBox.jsx';
import { useDispatch, useSelector } from "react-redux";
import { openSearch } from '../features/ui/uiSlice.js';

export default function Navbar() {

    const dispatch = useDispatch();
    const isSearchOpen = useSelector((state) => state.ui.isSearchOpen);

  return (
    <div className=' fixed w-screen'>
        <div className="flex justify-between bg-yellow-300 items-center px-6 sm:px-18 py-1 sm:py-3">
            <img className=' w-14' src={Logo} alt="Daily Delight logo" />
            <ul className={` hidden ${isSearchOpen ? 'hidden' : 'sm:flex'} gap-16 text-md font3`}>
                <li className='transition'>Best Deal</li>
                <li className='transition'>Recent Product</li>
                <li className='transition'>Grocery</li>
                <li className='transition'>Ration</li>
                <li className='transition'>Chocolate</li>
            </ul>
            <SearchBox />
            <div className={` ${ isSearchOpen ? 'hidden sm:flex' : 'flex'}  gap-8 `}>
                <img className='w-7 sm:block hidden' onClick={ () => { dispatch(openSearch()) } } src={searchIcon} alt="" />
                <Link className='flex gap-2 font-normal' to="/signin"><img className= "sm:block w-7" src={User} alt="" /> <span  className="block sm:hidden font3"> Login</span></Link>
                <Link to="/cart" className='sm:block hidden' ><img className='w-7' src={Cart} alt="" /></Link>
                <Link to="/service" className='sm:block hidden'><img className='w-7' src={contactUs} alt="" /></Link>
            </div>
        </div>
    </div>
  )
}

