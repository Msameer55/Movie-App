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

export const createSession = createAsyncThunk(
    "auth/createSession",
    async (requestToken, { rejectWithValue }) => {
        try {
            // 1️⃣ Create a new session
            const { data } = await axios.post(
                `https://api.themoviedb.org/3/authentication/session/new?api_key=${import.meta.env.VITE_API_KEY}`,
                { request_token: requestToken }
            );
            const sessionId = data.session_id;

            // 2️⃣ Fetch user account details
            const accountResponse = await axios.get(
                `https://api.themoviedb.org/3/account?api_key=${import.meta.env.VITE_API_KEY}&session_id=${sessionId}`
            );

            const accountId = accountResponse.data.id;

            // 3️⃣ Save both to localStorage
            localStorage.setItem("session_id", sessionId);
            localStorage.setItem("account_id", accountId);

            // 4️⃣ Return both
            return { sessionId, accountId };
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to create session");
        }
    }
);

export const getAccountDetails = createAsyncThunk(
    "auth/getAccountDetails",
    async (sessionId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/account?api_key=${import.meta.env.VITE_API_KEY}&session_id=${sessionId}`
            );
            return data; // includes account id, name, username
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch account details");
        }
    }
);



const initialSession = localStorage.getItem("session_id");
const initialAccount = localStorage.getItem("account_id");

const authSlice = createSlice({
    name: "auth",
    initialState: {
        sessionId: initialSession ? initialSession : null,
        accountId: initialAccount ? initialAccount : null,
        requestToken: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.sessionId = null;
            state.accountId = null;
            localStorage.removeItem("session_id");
            localStorage.removeItem("account_id");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRequestToken.pending, (state) => { state.loading = true })
            .addCase(createRequestToken.fulfilled, (state, action) => {
                state.loading = false;
                state.requestToken = action.payload;
            })
            .addCase(createRequestToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createSession.pending, (state) => { state.loading = true })
            .addCase(createSession.fulfilled, (state, action) => {
                state.sessionId = action.payload.sessionId;
                state.accountId = action.payload.accountId;
                localStorage.setItem("session_id", action.payload.sessionId);
                localStorage.setItem("account_id", action.payload.accountId);
            })
            .addCase(createSession.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAccountDetails.fulfilled, (state, action) => {
                state.accountId = action.payload.id; // save TMDB account ID
            })
    },
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;
