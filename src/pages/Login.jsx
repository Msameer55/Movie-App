import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createRequestToken } from '../slices/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { requestToken } = useSelector(state => state.auth);
    console.log(requestToken, "token from login")

    useEffect(() => {
        if (requestToken) {
            window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${window.location.origin}/auth/callback`;
        }
    }, [requestToken]);

    return (
        <div className="text-center my-10">
            <button onClick={() => dispatch(createRequestToken())} className="bg-[#FB2C36] text-white px-4 py-2 rounded cursor-pointer poppins">
                Login with TMDB
            </button>
        </div>
    );
};


export default Login