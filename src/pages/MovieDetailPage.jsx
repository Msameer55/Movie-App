import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, NavLink } from "react-router-dom";
import { getSingleMovie, movieRecommendations } from "../slices/movieSlice";
import ReactSpinner from "../Components/ReactSpinner";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieDetailPage = () => {
    const swiperRef = useRef(null);
    const castRef = useRef(null)
    const dispatch = useDispatch();
    const { id } = useParams();

    const { singleMovie, loading, recommendedMovies } = useSelector(
        (state) => state.movies
    );

    useEffect(() => {
        dispatch(getSingleMovie(id));
        dispatch(movieRecommendations(id));
        window.scrollTo(0, 0); // scroll to top on navigation
    }, [dispatch, id]);

    if (loading) {
        return <ReactSpinner />;
    }

    return (
        <div className="movie-detail-page min-h-screen text-white bg-black">
            {/* ===== HERO SECTION ===== */}
            <div
                className="relative w-full h-[60vh] md:h-[80vh] bg-cover bg-center brightness-[0.4] mb-10"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${singleMovie.backdrop_path})`,
                }}
            ></div>

            {/* ===== MAIN CONTENT ===== */}
            <div className="page-width px-6 md:px-20 -mt-40 relative z-10">
                <div className="flex flex-col md:flex-row gap-10">
                    {/* Poster */}
                    <div className="shrink-0 w-full md:w-1/3">
                        <img
                            className="rounded-lg shadow-lg w-full object-cover"
                            src={`https://image.tmdb.org/t/p/w500${singleMovie.poster_path}`}
                            alt={singleMovie.title}
                        />
                    </div>

                    {/* Movie Info */}
                    <div className="flex-1 space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl md:text-5xl font-bold poppins">
                                    {singleMovie.title}
                                </h1>
                                {singleMovie.tagline && (
                                    <p className="text-gray-400 italic text-sm md:text-base">
                                        {singleMovie.tagline}
                                    </p>
                                )}
                            </div>
                            <FaRegHeart className="text-white text-3xl cursor-pointer hover:text-red-600 transition" />
                        </div>

                        {/* Movie Details */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                            <span>{singleMovie.release_date?.slice(0, 4)}</span>
                            <span>•</span>
                            <span>{singleMovie.runtime} min</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <FaStar className="text-yellow-400" />{" "}
                                {singleMovie.vote_average?.toFixed(1)}
                            </span>
                        </div>

                        {/* Genres */}
                        <div className="flex flex-wrap gap-2 mt-3">
                            {singleMovie?.genres?.map((cat, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
                                >
                                    {cat.name}
                                </div>
                            ))}
                        </div>

                        {/* Overview */}
                        <div>
                            <h2 className="text-xl font-semibold mt-4 mb-2">Overview</h2>
                            <p className="text-gray-300 leading-relaxed">
                                {singleMovie.overview}
                            </p>
                        </div>

                        {/* Placeholder for cast (optional) */}
                       
                    </div>
                </div>

                 <div className="relative">
                            <h2 className="text-2xl font-semibold mt-6 mb-2 poppins">Cast</h2>
                            <button
                                onClick={() => castRef.current?.slidePrev()}
                                className="z-10 bg-white/20 hover:bg-white/60 absolute top-1/2 left-0 text-white p-2 rounded-md cursor-pointer"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={() => castRef.current?.slideNext()}
                                className="z-10 bg-white/20 hover:bg-white/60 absolute top-1/2 right-0 text-white p-2 rounded-md cursor-pointer"
                            >
                                <ChevronRight size={18} />
                            </button>
                            <Swiper
                                onSwiper={(swiper) => (castRef.current = swiper)}
                                spaceBetween={20}
                                slidesPerView={4}
                                breakpoints={{
                                    640: { slidesPerView: 4 },  
                                    1024: { slidesPerView: 5 }, 
                                    1440: { slidesPerView: 6 }, 
                                }}
                                navigation
                            >
                                {singleMovie.credits?.cast?.map((castMember, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="relative ">
                                            <img
                                                src={
                                                    castMember.profile_path
                                                        ? `https://image.tmdb.org/t/p/w500${castMember.profile_path}`
                                                        : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                                }
                                                alt={castMember.title}
                                                className=""
                                            />
                                            <div className="title my-3">
                                                <h4 className='text-gray-400 poppins text-sm  text-ellipsis whitespace-nowrap overflow-hidden'>Character: {castMember.character}</h4>
                                                <h4 className='text-gray-400  poppins text-sm  text-ellipsis whitespace-nowrap overflow-hidden'>Name: {castMember.name}</h4>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                {/* ===== RECOMMENDED MOVIES ===== */}
                <div className="mt-10">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold poppins">Recommended Movies</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => swiperRef.current?.slidePrev()}
                                className="bg-white/20 hover:bg-white/40 text-white p-2 rounded-md cursor-pointer"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={() => swiperRef.current?.slideNext()}
                                className="bg-white/20 hover:bg-white/40 text-white p-2 rounded-md cursor-pointer"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>

                    <Swiper
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        spaceBetween={20}
                        slidesPerView={2}
                        breakpoints={{
                            640: { slidesPerView: 4 },
                            1024: { slidesPerView: 6 },
                        }}
                        navigation
                    >
                        {recommendedMovies.map((movie, index) => (
                            <SwiperSlide key={index}>
                                <NavLink to={`/movie/${movie.id}`}>
                                    <div className="relative group cursor-pointer">
                                        <img
                                            src={
                                                movie.poster_path
                                                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                                    : "https://via.placeholder.com/500x750?text=No+Image"
                                            }
                                            alt={movie.title}
                                            className=""
                                        />
                                        <div className="title my-3">
                                            <h4 className='text-white poppins text-md  text-ellipsis whitespace-nowrap overflow-hidden'>{movie.title}</h4>
                                        </div>
                                    </div>
                                </NavLink>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
