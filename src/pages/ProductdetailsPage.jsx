import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import BottomBar from '../layout/BottomBar'
import ProductImage from '../assets/ProductImage/ProductImage.avif'
import ShopcardScroll from '../Components/ShopcardScroll'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { Backend_URL } from '../utils/Constant.js'

export default function ProductdetailsPage() {

    const navigate = useNavigate();

    const [params] = useSearchParams()
    const id = params.get("id")

    const cacheRef = useRef({});

    const [Products , setProducts] = useState({});
    const [ProductImg , setProductImg] = useState("")
    const [cartButton , setcartButton] = useState("Add to Cart")

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const key = `${id}`;

                // 🧠 1. Cache hit → instant load
                if (cacheRef.current[key]) {
                    setProducts(cacheRef.current[key]);
                    return;
                }

                // 🌐 2. API call
                const res = await axios.get(`${Backend_URL}/api/Admin/product/getProductbyId/${id}`
                );

                // 💾 3. Save to cache
                cacheRef.current[key] = res.data.product;
                setProducts(res.data.product);
                setProductImg(res.data.product.images[0].url);

            } catch (err) {
                console.error("Product fetch failed", err);
            }
        };

        const checkCart = async() =>{
            await axios.post(`${Backend_URL}/api/Admin/cart/checkcart` , {
            productId: id,
        } , {withCredentials: true})
        .then(function (response) {
            if (response.data.message == "Product present in cart") {
                setcartButton("Go to cart");
            }
        })
        .catch(function (error) {
            console.log(error)
            if(error.response.data == "Product not in cart"){
                return true
            }

            // if(error.response.data == "Product already in cart"){
            //     toast.error('Product already in cart');
            // }
        })
        }

        fetchProducts();
        checkCart();

    }, [id]);

    async function CartItem(){

        if(cartButton == "Go to cart"){
            navigate("/cart")
            return true
        }

        await axios.post(`${Backend_URL}/api/Admin/cart/addcart` , {
            productId: Products._id,
        } , {withCredentials: true})
        .then(function (response) {
            if (response.data.message == "Added to cart") {
                setcartButton("Go to cart");
                toast.success("Added to cart");
            }
        })
        .catch(function (error) {
            console.log(error)
            if(error.response.data == "Product not found"){
                toast.error('Product not found');
            }

            if(error.response.data == "Product already in cart"){
                toast.error('Product already in cart');
            }
        })
    }

    async function buy(){

        let cartDataStore = [{ productId: Products._id, quantity: 1  }]
        localStorage.setItem('ProductData', JSON.stringify(cartDataStore));
        navigate("/buy-product")
    }

    return (
        <>
            <Navbar />
            <div className='blobk sm:flex w-full pt-24'>
                <div className='block w-full sm:w-3/6 justify-items-center py-3 border-0 sm:border-r border-gray-400 '>
                    { ProductImg && <img src={ProductImg} className='h-[32vh] sm:h[55vh] md:h-[50vh]' /> }
                    <div className='flex gap-5 mt-8'>
                        {
                        Products?.images?.length > 0 && (
                            Products.images.map((productImages) => (
                            <img
                                key={productImages._id}
                                src={productImages.url}
                                className="w-12"
                                alt={productImages.alt || ""}
                                onClick={ () => { setProductImg(productImages.url) } }
                            />
                            ))
                        )
                        }
                    </div>
                </div>
                <div className='w-ful sm:w-3/6 pl-8'>
                    <h3 className='text-2xl font-medium pt-4 font3 leading-none'>{Products.name}</h3>
                    <p className='pt-2 font-normal font3'>{Products.brand}</p>
                    <p className='flex gap-3 font3'><span className='text-green-700 font-medium'>₹{Products.discountedPrice} </span><span className='line-through'>₹{Products.sellingPrice}</span></p>
                    <p className='text-sm pt-1 font1' >(Inclusive of all taxes)</p>

                    <p className='mt-6 text-xl font3'>About Product</p>
                    <p className='text-sm text-gray-700 pr-6 font1'>
                        {Products.description}
                    </p>

                    <div className=' block sm:flex justify-baseline gap-5 mt-8 px-6 space-y-2 sm:space-y-0'>
                        <button onClick={buy} className='bg-yellow-400 border py-2 w-full font3 click-effect'>Buy Now</button>
                        <button onClick={CartItem} className='border py-2 w-full font3 click-effect'>{cartButton}</button>
                        <button className='hidden border py-2 text-white bg-red-500 w-full border-red-500 font3'>Add to Wishlist</button>
                    </div>

                </div>
            </div>
            <div className='pl-8'>
                <section className="mx-auto py-10">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4 font3">
                        About Our Store
                    </h2>

                    <p className="text-gray-600 leading-relaxed mb-4 font1">
                        Welcome to our online shopping platform, designed to provide a smooth,
                        secure, and reliable e-commerce experience. Our website offers a wide range
                        of quality products across multiple categories, making everyday shopping
                        simple and convenient.
                    </p>

                    <p className="text-gray-600 leading-relaxed mb-6 font1">
                        We focus on performance, security, and usability by using modern web
                        technologies to ensure fast loading, safe transactions, and an intuitive
                        user interface. From product discovery to checkout, every step is optimized
                        for ease of use.
                    </p>

                    <h3 className="text-xl font-medium text-gray-800 mb-3 font3">
                        Why Shop With Us?
                    </h3>

                    <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6 font1">
                        <li>Wide selection of products with detailed descriptions and images</li>
                        <li>Advanced search and filtering for quick product discovery</li>
                        <li>Secure authentication and protected user data</li>
                        <li>Easy cart, wishlist, and checkout experience</li>
                        <li>Fast and reliable order tracking and delivery updates</li>
                        <li>Customer support with issue tracking and ticket system</li>
                    </ul>

                    <p className="text-gray-600 leading-relaxed font1">
                        Our goal is to build a trusted shopping destination where customers can
                        shop with confidence, discover great deals, and enjoy a hassle-free online
                        shopping experience.
                    </p>
                </section>
            </div>
            <hr className='mx-12 border-gray-500 mt-12' />
            <section className=" mx-auto px-4 py-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6 font3">
                    Customer Reviews
                </h3>
                <div className="space-y-6">
                    {/* Review Card */}
                    <div className="border rounded-lg p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-800 font3">Aman Sahni</h4>

                            {/* Stars */}
                            <div className="flex items-center">
                                <span className="text-yellow-400">★★★★★</span>
                            </div>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed font1">
                            The product quality is really good. Delivery was fast and packaging
                            was neat. Totally satisfied with the purchase.
                        </p>
                    </div>

                    {/* Review Card */}
                    <div className="border rounded-lg p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-800 font3">Rahul Verma</h4>

                            <div className="flex items-center">
                                <span className="text-yellow-400">★★★★☆</span>
                            </div>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed font1">
                            Good product overall. Value for money. I would recommend it to others.
                        </p>
                    </div>
                    <Toaster />
                </div>
            </section>
            <BottomBar />
            <Footer />
        </>
    )
}
