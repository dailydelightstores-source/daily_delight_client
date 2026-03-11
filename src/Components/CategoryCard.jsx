import CategorycardImage from '../assets/CategoryImage/9_1693202755712.avif'
export default function CategoryCard() {
  return (
    <div className='justify-items-center font3'>
      <img className='w-21 h-21 sm:w-32 sm:h-26 pb-0 border-2 border-gray-300 rounded-2xl' src={CategorycardImage} alt="" />
      <p className='text-gray-600 font3 whitespace-nowrap pt-2 text-sm md:text-base'>Washing powder</p>
    </div>
  )
}