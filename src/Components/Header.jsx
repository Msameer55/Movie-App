import React, { useEffect, useState } from 'react'
import { FaHeart, FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { searchMovies } from '../slices/movieSlice';
import { LogIn, LogOut, X } from 'lucide-react';
import { logout } from '../slices/authSlice';

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [searchOpen, setSearchOpen] = useState(false);
    const { sessionId, accountId } = useSelector((state) => state.auth);
    const [searchVal, setSearchVal] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!searchVal.trim()) return;
        dispatch(searchMovies(searchVal));
        navigate("/search", { state: { searchVal } })
        setSearchVal("");
        setSearchOpen(false)
    }

    const handleSearch = () => {
        setSearchOpen(true)
    }

    const handleLogOut = () => {
        dispatch(logout());
        navigate("/login")
    }

    const handleAddFavorite = () => {
        navigate("/favorites");
    }

    useEffect(() => {
        if (searchOpen) {
            document.body.style.overflow = "hidden";  
        } else {
            document.body.style.overflow = "auto";    
        }

        // cleanup just in case
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [searchOpen]);

    return (
        <div className="header-main-component  px-2 py-6">
            <div className="header-inner page-width ">
                <div className="flex justify-between items-center">
                    <div className="logo">
                        <h1 className='montserrat text-xl md:text-3xl text-red-500'><NavLink to="/">CineScope </NavLink></h1>
                    </div>
                    {
                        accountId && (
                            <div className="search-container hidden md:block">
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
                        )
                    }

                    <div className="icon-container flex gap-2 justify-start">
                        {
                            accountId ? (
                                <>
                                    <div className="search-icon-mobile relative">
                                        <FaSearch className="text-white text-2xl cursor-pointer" onClick={handleSearch} />

                                        {searchOpen && (
                                            <div className="fixed inset-0 bg-black flex items-center justify-center z-99">
                                                <div className="absolute top-5 right-5">
                                                    <X className='text-white text-2xl' onClick={() => setSearchOpen(false)} />
                                                </div>

                                                {/* Search Box */}
                                                <div className="relative z-100 w-[90%] md:w-[600px]">
                                                    <form
                                                        onSubmit={handleSubmit}
                                                        className="flex items-center bg-[#1c1c1c] rounded-full overflow-hidden shadow-lg border border-gray-700"
                                                    >
                                                        <input
                                                            type="text"
                                                            className="flex-1 bg-transparent text-gray-200 outline-none px-5 py-3 text-sm md:text-base poppins"
                                                            placeholder="Search for any movie..."
                                                            value={searchVal}
                                                            onChange={(e) => setSearchVal(e.target.value)}
                                                            autoFocus
                                                        />
                                                        <button
                                                            type="submit"
                                                            className="bg-red-600 hover:bg-red-700 transition px-5 py-3 flex items-center justify-center"
                                                        >
                                                            <FaSearch className="text-white text-lg" />
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        )}
                                    </div>


                                    <div className="wishlist-icon relative group inline-block">
                                        <FaHeart onClick={handleAddFavorite} className="text-white text-2xl cursor-pointer hover:text-red-500 transition-colors duration-300" />

                                        {/* Tooltip */}
                                        <div className="absolute bottom-full -left-[120px] top-[30px] mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap shadow-lg">
                                            <p className='poppins text-[12px]'>Check your favorites</p>
                                        </div>
                                    </div>
                                    <div className="logout-container relative group inline-block">
                                        <LogOut className='text-white cursor-pointer' onClick={handleLogOut} />
                                        <div className="absolute bottom-full right-0 top-[30px] mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap shadow-lg">
                                            <p className='poppins text-[12px]'>Logout</p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="relative group inline-block">
                                    <button className='min-w-[90px] px-2 py-1 text-white bg-[#FB2C36] cursor-pointer rounded-sm poppins'
                                        onClick={() => navigate("/login")}
                                    >
                                        Login
                                    </button>

                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header