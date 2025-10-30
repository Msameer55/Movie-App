import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dayTrendingMovies } from '../slices/movieSlice';
import MovieCarousel from './MovieCarousel';
import { NavLink } from 'react-router-dom';

const DayTrendingMovies = () => {
  const dispatch = useDispatch();
  const { dayTrendingMoviesList } = useSelector((state) => state.movies);
  const dayMovieSlice = dayTrendingMoviesList.slice(0, 6);
  useEffect(() => {

    const fetchData = async () => {
      try {
        await dispatch(dayTrendingMovies()).unwrap();
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      }
    };

    fetchData();
  }, [dispatch])

  return (
    <div className='upcoming-movies-container my-10'>
      <div className="page-width p-3">
        <h2 className="poppins text-white text-2xl font-bold mb-5 hidden md:block">
          Movies Trending Today
        </h2>

        <MovieCarousel
          data={dayMovieSlice}
          title="Movies Trending Today"
        />
        <div className="md:grid grid-cols-6 gap-2 hidden">
          {
            dayMovieSlice.map((item, index) => {
              return (
                <NavLink to={`movie/${item.id}` } key={index}>
                  <div className="card relative" >
                    <div className="card-image">
                      <img className='rounded-md' src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image}"} alt="" />
                    </div>
                    <div className="title">
                      <h4 className='text-white poppins text-sm mt-2 text-ellipsis whitespace-nowrap overflow-hidden'>{item.title}</h4>
                    </div>
                  </div>
                </NavLink>

              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default DayTrendingMovies