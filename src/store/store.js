import { configureStore } from "@reduxjs/toolkit";
import movieReducer  from "../slices/movieSlice";
import authReducer  from "../slices/authSlice";


export const store = configureStore({
    reducer : {
        movies : movieReducer,
        auth: authReducer 
    }
})