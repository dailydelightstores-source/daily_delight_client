import CategoryCard from '../Components/CategoryCard.jsx'
export default function Category() {
  return (
    <>
      <div className="w-fit">
        <h3 className="text-md md:text-xl font-bold pb-3 pl-5 tracking-wide font3">
          Categories
        </h3>

        <hr className="border border-gray-500 ml-5 mb-4 w-2/3 rounded-full" />
      </div>

      <div className="
        px-4 pb-4 
        flex gap-5 sm:gap-12 
        overflow-x-auto scroll-smooth
        scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent
      ">
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </div>
    </>
  )
}
