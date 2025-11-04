import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom';
import { getAllMovies } from '../slices/movieSlice';

const MoviesList = () => {
    const params = useParams();
    console.log(params, "params cat");
    const dispatch = useDispatch();
    const { allMovies } = useSelector((state) => state.movies);
    
    useEffect(() => {
        dispatch(getAllMovies(params.category))
    }, [dispatch])
    console.log(allMovies, "all movies");

    const categoryTitles = {
        top_rated: "Top Rated",
        popular: "Popular",
        upcoming: "Upcoming",
        now_playing: "Now Playing",
        trending_day: "Trending Today",
        trending_week: "Trending This Week",
    };

    return (
        <div className="movies-list-container">
            <div className="page-width p-3">
                <h2 className="text-4xl text-white poppins font-bold mb-4">
                    {categoryTitles[params.category] || "Movies"}
                </h2>
                <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {allMovies.map((movie) => (
                        <NavLink to={`/movie/${movie.id}`} key={movie.id}>
                            <div className=" text-white rounded-lg overflow-hidden">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-[300px] object-cover"
                                />
                                <p className="capitalize text-white poppins text-sm mt-2 text-ellipsis whitespace-nowrap overflow-hidden">{movie.title}</p>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default MoviesList