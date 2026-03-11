import { useSelector ,useDispatch } from "react-redux";
import { closeSearch } from "../features/ui/uiSlice.js";
import crossIcon from '../assets/icons/close.png'
import SearchIcon from '../assets/icons/search-interface-symbol.png'
import { useNavigate } from "react-router-dom";
import { Activity, useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Backend_URL } from "../utils/Constant.js";
export default function SearchBox() {
  const dispatch = useDispatch()
  const isSearchOpen = useSelector((state) => state.ui.isSearchOpen);

  const navigate = useNavigate();

  const [search , setsearch] = useState("")
  const [Suggestion, setSuggestion] = useState([]);
  const inputRef = useRef(null);

   useEffect(() => {
    const timer = setTimeout(() => {
      getSuggestion();
    }, 500); 

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  async function getSuggestion(){
    if(search == ""){
      return false
    }
    await axios.get(`${Backend_URL}/api/Admin/product/getproductsuggestion?query=${search}`)
      .then(function (response) {
        if (response.data.message == "Suggestion Found") {
          setSuggestion(response.data.result);
        }
      })
      .catch(function (error) {
          if(error.response.data == "query not found"){
            toast.error('query not found !!!');
          }

          if(error.response.data == "Product not found"){
            toast.error('Product not found !!!');
          }
      })
  }

  function getproduct(e){
    e.preventDefault();

    if(e.target.getAttribute('data-name')){
      navigate(`/searchpage?query=${encodeURIComponent(e.target.getAttribute('data-name'))}&from=0&to=10`)
      return true
    }

    if(!(search=="")){
      navigate(`/searchpage?query=${encodeURIComponent(search)}&from=0&to=10`)
      return true
    }

    return true
  }

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [isSearchOpen]);

  return (
    <div className="block">
      <form onSubmit={ (e) =>{getproduct(e)}} className={`${isSearchOpen ? 'flex' : 'hidden'} mr-5`}>
          <input type="text" name='searchBox' ref={inputRef} enterKeyHint="search" className="border-b focus:outline-none w-54  md:w-xl sm:w-2xl" onChange={ (e) =>{ setsearch(e.target.value)} } value={search} placeholder='Search' />
          <img className='w-4 h-4 -ml-8' alt="" src={crossIcon} onClick={ () => { dispatch(closeSearch()) } } />
      </form>
      <Activity mode={Suggestion.length ? "visible" : "hidden"}>
        <div className="absolute mt-2 w-54 sm:w-2xl bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden max-h-72 overflow-y-auto z-50">
          {Suggestion.map((suggestion) => (
            <div
              key={suggestion._id}
              className="flex items-center justify-between px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 transition">
              <p data-name={suggestion.name} onClick={(e) =>{ getproduct(e) }} className="text-gray-700 truncate max-w-[85%]">
                {suggestion.name}
              </p>
              <img src={SearchIcon} className="w-3 h-3 opacity-60 shrink-0" alt="" />
            </div>
          ))}

        </div>
      </Activity>
      

    </div>
  )
}
