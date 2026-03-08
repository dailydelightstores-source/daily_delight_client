import { BrowserRouter, Route , Routes} from 'react-router-dom';  
import HomePage from './pages/HomePage.jsx';
import SignIn from './pages/Auth/SignIn.jsx';
import SignUp from './pages/Auth/SignUp.jsx';
import WishList from './pages/WishList.jsx';
import AboutUs from './pages/AboutUs.jsx';
import ContactUs from './pages/ContactUs.jsx';
import Cart from './pages/Cart.jsx';
import './App.css'
import ShopPage from './pages/ShopPage.jsx';
import ProductdetailsPage from './pages/ProductdetailsPage.jsx';
import Buy from './pages/Buy.jsx';
import ServicePage from './pages/Service.jsx';


function App() {

  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/searchpage" element={<ShopPage />} />
        <Route path="/productdetailspage" element={<ProductdetailsPage />} />
        <Route path="/buy-product" element={<Buy />} />
        <Route path="/service" element={<ServicePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
