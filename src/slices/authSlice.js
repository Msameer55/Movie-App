import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createRequestToken = createAsyncThunk("auth/requestToken", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${import.meta.env.VITE_API_KEY}`);
        return data.request_token;
    } catch (err) {
        return rejectWithValue(err.response?.data || "Failed to create request token");
    }
});

export const createSession = createAsyncThunk("auth/createSession", async (requestToken, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${import.meta.env.VITE_API_KEY}`, { request_token: requestToken });
        
        return data.session_id;
    } catch (err) {
        return rejectWithValue(err.response?.data || "Failed to create session");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: { sessionId: null, requestToken: null, loading: false, error: null },
    reducers: {
        logout: (state) => { state.sessionId = null; localStorage.removeItem("session_id"); },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRequestToken.pending, (state) => state.loading = true)
            .addCase(createRequestToken.fulfilled, (state, action) => { state.loading = false, state.requestToken = action.payload })
            .addCase(createRequestToken.rejected, (state, action) => {state.loading = false, state.error = action.payload })
            .addCase(createSession.pending, (state) => state.loading = true)
            .addCase(createSession.fulfilled, (state, action) => {
                state.sessionId = action.payload;
                localStorage.setItem("session_id", action.payload);
            })
            .addCase(createSession.rejected, (state, action) => { state.loading = false, state.error = action.payload })
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
