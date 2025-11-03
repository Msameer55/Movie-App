import { useSelector } from "react-redux"
import { NavLink, useLocation } from "react-router-dom";
import ReactSpinner from "../Components/ReactSpinner";

const SearchPage = () => {
    const { searchMoviesList, loading } = useSelector((state) => state.movies)
    console.log(searchMoviesList);
    // const location = useLocation();

    // const matchedResults = searchMoviesList.filter((x) =>
    //     x.title.toLowerCase().includes(location?.state?.searchVal?.toLowerCase() || "")
    // );
    // console.log(matchedResults, "matched")

    if (loading) {
        return <ReactSpinner />
    }

    return (
        <div className="search-page w-full min-h-screen">
            <div className="page-width p-4">
                <div className="grid grid-cols-4 gap-2">
                    {
                        searchMoviesList ? (
                            searchMoviesList.map((item, index) => {
                                return (
                                    <>
                                        {
                                            item.poster_path && (
                                                <NavLink to={`/movie/${item.id}`} key={index}>
                                                    <div className="card relative my-4">
                                                        <div className="card-image">
                                                            <img className='rounded-md' src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt="" />
                                                        </div>
                                                        <div className="title">
                                                            <h4 className='capitalize text-white poppins text-sm mt-2 text-ellipsis whitespace-nowrap overflow-hidden'>{item.title}</h4>
                                                        </div>
                                                    </div>
                                                </NavLink>
                                            )
                                        }
                                    </>
                                )
                            })
                        ) : (
                            <p className="text-4xl poppins text-white">No Result Found</p>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default SearchPage