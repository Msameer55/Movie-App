import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dayTrendingMovies, upcomingMovies } from '../slices/movieSlice';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Autoplay } from 'swiper/modules';
import { NavLink } from 'react-router-dom';

const HeroBanner = () => {
    const dispatch = useDispatch();
    const { upcomingMoviesList, dayTrendingMoviesList } = useSelector((state) => state.movies)

    const bannerMovies = [
        ...upcomingMoviesList.slice(0, 3),
        ...dayTrendingMoviesList.slice(0, 3)
    ];

    console.log(bannerMovies, "banner")

    useEffect(() => {
        dispatch(upcomingMovies());
        dispatch(dayTrendingMovies());
    }, [dispatch])

    return (
        <div className='hero-banner-section w-full min-h-screen'>
            <div className="banner">
                <Swiper
                    modules={[ Autoplay]}
                    spaceBetween={10}
                    slidesPerView={1}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
           
                >
                    {bannerMovies.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative w-full h-[90vh] overflow-hidden">
                                <img src={item.backdrop_path
                                    ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
                                    : "https://via.placeholder.com/1280x720?text=No+Image"} alt="" className="w-full h-full object-cover object-center brightness-75" />

                                <div className="absolute inset-0 flex flex-col justify-center px-10 text-white">
                                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                    <p className="max-w-xl text-sm md:text-lg opacity-80 mb-6 line-clamp-3 leading-6">
                                        {item.overview}
                                    </p>
                                    <button className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md w-fit">
                                        <NavLink to={`/movie/${item.id}`}>Watch Now</NavLink> 
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

                </Swiper>
            </div>
        </div>
    )
}

export default HeroBanner