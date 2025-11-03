import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { sessionId } = useSelector((state) => state.auth);
    console.log(sessionId, "session id from protected route");

    if (!sessionId) {
        return <Navigate to="/login" replace />;
    }

    return children;
};


export default ProtectedRoute