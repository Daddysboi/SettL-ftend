import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserById, setUser } from "./features/userSlice";
import { useAppDispatch } from "./redux/hooks";
import { USER_ID } from "./services/CONSTANTS";

const AuthGuard = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userId = localStorage.getItem(USER_ID);

  const handleGetUser = async (userId) => {
    try {
      const resp = await dispatch(getUserById(userId));
      const { data } = resp?.payload;
      dispatch(setUser(data));
    } catch (error) {
      console.log(error.message);
      handleError();
    }
  };

  const handleError = () => {
    navigate("/login");
  };

  const shouldGetProfile = ![
    "/login",
    "/",
    "/register",
    "/reset-password/*",
    "/forgot-password",
  ].includes(pathname);

  useEffect(() => {
    if (shouldGetProfile && userId) {
      handleGetUser(userId);
    }
  }, [shouldGetProfile, userId]);

  useEffect(() => {
    if (!userId && shouldGetProfile) {
      handleError();
    }
  }, [userId, shouldGetProfile]);

  return children;
};

export default AuthGuard;
