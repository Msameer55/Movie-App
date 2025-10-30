import React, { useState } from 'react'
import { FaHeart, FaSearch } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { searchMovies } from '../slices/movieSlice';

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [searchVal, setSearchVal] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!searchVal.trim()) return;
        dispatch(searchMovies(searchVal));
        navigate("/search", { state: { searchVal } })
        setSearchVal("");
    }


    return (
        <div className="header-main-component  px-2 py-6">
            <div className="header-inner page-width ">
                <div className="flex justify-between items-center">
                    <div className="logo">
                        <h1 className='montserrat text-xl md:text-3xl text-red-500'><NavLink to="/">CineScope </NavLink></h1>
                    </div>
                    <div className="search-container ">
                        <form className='relative' onSubmit={handleSubmit}>
                            <input
                                type="text"
                                className='text-gray-200 outline-0 border px-3 py-2 md:min-w-[500px] poppins'
                                placeholder='Search for any Movies....'
                                value={searchVal}
                                onChange={(e) => setSearchVal(e.target.value)}
                            />
                            <div className="search-btn absolute top-0 right-0 bottom-0 ">
                                <button className='bg-red-500 h-full px-3 overflow-hidden cursor-pointer'><FaSearch className='text-white' /></button>
                            </div>
                        </form>
                    </div>
                    <div className="icon-container">
                        <div className="wishlist-icon relative group inline-block">
                            <FaHeart className="text-white text-2xl cursor-pointer hover:text-red-500 transition-colors duration-300" />

                            {/* Tooltip */}
                            <div className="absolute bottom-full -left-[120px] top-[30px] mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap shadow-lg">
                                <p className='poppins text-[12px]'>Check your favorites</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header