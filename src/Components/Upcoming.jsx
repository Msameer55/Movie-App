import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { upcomingMovies } from '../slices/movieSlice';
import { toast } from 'react-toastify';
import MovieCarousel from './MovieCarousel';

const Upcoming = () => {
    const dispatch = useDispatch();
    const { upcomingMoviesList } = useSelector((state) => state.movies);
    const upComingSlice = upcomingMoviesList.slice(0, 6);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(upcomingMovies()).unwrap();
            } catch (error) {
                toast.error(error.message || "Something went wrong");
            }
        };

        fetchData();
    }, [dispatch]);


    return (
        <div className='upcoming-movies-container my-10'>
            <div className="page-width p-3">
                <h2 className="poppins text-white text-2xl font-bold mb-5 hidden md:block">
                    Upcoming Movies
                </h2>
                <MovieCarousel
                    data={upcomingMoviesList}
                    title="Upcoming Movies"
                />
                <div className="md:grid grid-cols-6 gap-2 hidden">
                    {
                        upComingSlice.map((item, index) => {
                            return (
                                <div className="card relative" key={index}>
                                    <div className="card-image">
                                        <img className='rounded-md' src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image}"} alt="" />
                                    </div>
                                    <div className="title">
                                        <h4 className='text-white poppins text-sm mt-2 text-ellipsis whitespace-nowrap overflow-hidden'>{item.title}</h4>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Upcoming