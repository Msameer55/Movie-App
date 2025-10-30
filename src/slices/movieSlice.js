import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const BASE_URL = "https://api.themoviedb.org/3/movie/upcoming?api_key=1f4a1d4b22385c8241cf498d38372ee1"


export const upcomingMovies = createAsyncThunk("movies/upcoming", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}upcoming?api_key=${import.meta.env.VITE_API_KEY}`);
        console.log(response.data.results, "upcoming slice")
        return response.data.results;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.response?.data?.error || "Failed to fetched the upcoming movies")
    }
})

export const dayTrendingMovies = createAsyncThunk("movies/dayTrending", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_TRENDING_BASE_URL}day?api_key=${import.meta.env.VITE_API_KEY}`);
        console.log(response.data.results, "day movies slice")
        return response.data.results;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.response?.data?.error || "Failed to fetched the upcoming movies")
    }
})

export const getSingleMovie = createAsyncThunk("movies/getSingleMovie", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}${id}?api_key=${import.meta.env.VITE_API_KEY}&append_to_response=credits`)
        console.log(response.data, "single movie")
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.response?.data?.error || "Failed to fetched the upcoming movies");
    }
})


export const movieRecommendations = createAsyncThunk("movies/recommendedMovies", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}${id}/recommendations?api_key=${import.meta.env.VITE_API_KEY}`)
        console.log(response.data.results, "recommended movies")
        return response.data.results;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.response?.data?.error || "Failed to fetch Recommended movies")
    }
})

export const searchMovies = createAsyncThunk("movies/search", async (title, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SEARCH_BASE_URL}?api_key=${import.meta.env.VITE_API_KEY}&query=${title}`)
        console.log(response.data.results, "searchresults");
        return response.data.results;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.response?.data?.error || "Failed to fetched searched movies")
    }

})

const initialState = {
    loading: false,
    error: null,
    singleMovie: {},
    upcomingMoviesList: [],
    dayTrendingMoviesList: [],
    recommendedMovies: [],
    searchMoviesList: []
}

const movieSlice = createSlice({
    name: "movie",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(upcomingMovies.pending, (state) => {
                state.loading = true
            })
            .addCase(upcomingMovies.fulfilled, (state, action) => {
                state.loading = false,
                    state.upcomingMoviesList = action.payload
            })
            .addCase(upcomingMovies.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
            .addCase(dayTrendingMovies.pending, (state) => {
                state.loading = true
            })
            .addCase(dayTrendingMovies.fulfilled, (state, action) => {
                state.loading = false,
                    state.dayTrendingMoviesList = action.payload
            })
            .addCase(dayTrendingMovies.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
            .addCase(getSingleMovie.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSingleMovie.fulfilled, (state, action) => {
                state.loading = false;
                state.singleMovie = action.payload;
            })
            .addCase(getSingleMovie.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(movieRecommendations.pending, (state) => {
                state.loading = true;
            })
            .addCase(movieRecommendations.fulfilled, (state, action) => {
                state.loading = false;
                state.recommendedMovies = action.payload;
            })
            .addCase(movieRecommendations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(searchMovies.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.searchMoviesList = action.payload;
            })
            .addCase(searchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default movieSlice.reducer;