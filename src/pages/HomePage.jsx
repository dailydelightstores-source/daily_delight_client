import Navbar from '../layout/Navbar.jsx';
import Footer from '../layout/Footer.jsx';
import BottomBar from '../layout/BottomBar.jsx';
import Poster from '.././assets/Poster/mainposter.jfif'
import Category from '../Components/Category.jsx';
import ShopcardScroll from '../Components/ShopcardScroll.jsx';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="w-full h-[40vh] sm:h-[55vh] pb-6 pt-16 sm:pt-20"><img className="h-full w-full" src={Poster} alt="" /></div>
      <Category />
      <ShopcardScroll />
      <BottomBar />
      <Footer />
    </>
  )
}
