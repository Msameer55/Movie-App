import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteMovies } from "../slices/movieSlice";
import { NavLink } from "react-router-dom";

const AddtoFavorites = () => {
    const dispatch = useDispatch();
    const { favoriteMovies, loading } = useSelector((state) => state.movies);
    console.log(favoriteMovies, "movies from page ");

    const { accountId, sessionId } = useSelector((state) => state.auth);

    useEffect(() => {
        if (accountId && sessionId) {
            dispatch(getFavoriteMovies({ accountId, sessionId }));
        }
    }, [accountId, sessionId, dispatch]);

    if (loading) return <p className="text-white text-center">Loading...</p>;

    return (
        <div className="favorite-page w-full min-h-screen my-10">
            <div className="page-width p-4">
                <h2 className="text-4xl text-white poppins font-bold mb-4">Your Favorites</h2>
                <div className="grid grid-cols-4 gap-2">
                    {favoriteMovies && favoriteMovies.length > 0 ? (
                        favoriteMovies.map((item, index) => (
                            <NavLink to={`/movie/${item.id}`} key={index}>
                                <div className="card relative my-4">
                                    <div className="card-image">
                                        <img
                                            className="rounded-md"
                                            src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                                            alt={item.title}
                                        />
                                    </div>
                                    <div className="title">
                                        <h4 className="capitalize text-white poppins text-sm mt-2 text-ellipsis whitespace-nowrap overflow-hidden">
                                            {item.title}
                                        </h4>
                                    </div>
                                </div>
                            </NavLink>
                        ))
                    ) : (
                        <p className="text-4xl poppins text-white">No favorites found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddtoFavorites;
