import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import { NavLink } from "react-router-dom";

const MovieCarousel = ({title , data = [], slidesPerViewMobile = 2 }) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const renderCard = (item, index) => (
        <div className="card relative mt-6" key={index}>
            <div className="card-image">
                <img
                    className="rounded-md w-full h-auto"
                    src={
                        item.poster_path
                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                            : "https://via.placeholder.com/500x750?text=No+Image"
                    }
                    alt={item.title}
                />
            </div>
            <div className="title">
                <h4 className="text-white poppins text-md mt-2 text-ellipsis whitespace-nowrap overflow-hidden">
                    {item.title}
                </h4>
            </div>
        </div>
    );

    return (
        <div className="relative block md:hidden">
            <div className="flex justify-between items-center ">
                <h2 className="poppins text-white font-bold text-lg">{title}</h2>
                <div className="flex gap-2">
                    <button ref={prevRef} className="bg-white/20 hover:bg-white/40 text-white p-2 rounded-md cursor-pointer">
                        <ChevronLeft size={18} />
                    </button>
                    <button ref={nextRef} className="bg-white/20 hover:bg-white/40 text-white p-2 rounded-md cursor-pointer">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* ✅ Swiper */}
            <Swiper
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView={slidesPerViewMobile}
                loop={true}
                onInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
            >
                {data.map((item, index) => (
                    <SwiperSlide key={index}><NavLink to={`movie/${item.id}` } key={index}>{renderCard(item, index)}</NavLink></SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MovieCarousel;
