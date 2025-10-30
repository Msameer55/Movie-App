import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createSession } from '../slices/authSlice';

const AuthRedirect = () => {
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("request_token");
    if (token) {
      dispatch(createSession(token)).then(() => navigate("/"));
    }
  }, []);

  return <p className="text-white text-center mt-10">Authenticating...</p>;
};

export default AuthRedirect;
