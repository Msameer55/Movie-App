import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom';
import { getAllMovies } from '../slices/movieSlice';
import ReactSpinner from '../Components/ReactSpinner';
import InfiniteScroll from 'react-infinite-scroll-component';

const MoviesList = () => {
    const { category } = useParams();
    const dispatch = useDispatch();
    const { allMovies, page, loading } = useSelector((state) => state.movies);
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
        dispatch(getAllMovies({ category, page: 1 }))
        window.scrollTo(0, 0);
    }, [dispatch, category])
    console.log(allMovies, "all movies");

    const fetchMoreMovies = () => {
        dispatch(getAllMovies({ category, page: page + 1 }))
            .unwrap()
            .then((data) => {
                if (!data.results.length) setHasMore(false);
            });
    };


    if (loading && page === 1) return <ReactSpinner />;

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
                <h2 className="text-white font-bold text-3xl poppins capitalize mb-5">
                    {category.replace("_", " ")} Movies
                </h2>
                <InfiniteScroll
                    dataLength={allMovies.length}
                    next={fetchMoreMovies}
                    hasMore={hasMore}
                    loader={<p className="text-white text-center">Loading more...</p>}
                    scrollThreshold={0.8}
                >
                    <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                        {allMovies.map((movie, index) => (
                            <NavLink to={`/movie/${movie.id}`} key={`${movie.id}-${index}`}>
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
                </InfiniteScroll>
            </div>

        </div>
    )
}

export default MoviesList