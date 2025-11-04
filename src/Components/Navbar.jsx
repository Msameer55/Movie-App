import { X } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const Navbar = ({ handleMenuClick, drawerOpen, setIsDrawerOpen }) => {

    return (
        <div
            className={`fixed top-0 left-0 w-full h-screen bg-[#111] shadow-2xl transition-transform duration-300 z-999
    ${drawerOpen ? "translate-y-0" : "-translate-y-full"}
  `}
        >
            <div className=" text-white">
                <button
                    onClick={handleMenuClick}
                    className="absolute top-5 right-5 text-white"
                >
                    <X className='text-xl cursor-pointer' size={24} />
                </button>

                <nav className="flex flex-col gap-6 mt-12">
                    <NavLink onClick={() => setIsDrawerOpen(false)} to="/" className="hover:text-red-500 text-center inline-block border-b border-gray-400 pb-2 font-semibold ">Home</NavLink>
                    <NavLink onClick={() => setIsDrawerOpen(false)} to="/movies/popular" className="hover:text-red-500 text-center inline-block border-b border-gray-400 pb-2 font-semibold ">Popular</NavLink>
                    <NavLink onClick={() => setIsDrawerOpen(false)} to="/movies/top_rated" className="hover:text-red-500 text-center inline-block border-b border-gray-400 pb-2 font-semibold ">Top Rated</NavLink>
                    <NavLink onClick={() => setIsDrawerOpen(false)} to="/movies/upcoming" className="hover:text-red-500 text-center inline-block border-b border-gray-400 pb-2 font-semibold ">Upcoming</NavLink>
                </nav>
            </div>
        </div>

    )
}

export default Navbar