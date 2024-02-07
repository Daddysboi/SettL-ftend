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

  const handleError = () => {
    navigate("/login");

    // To clear the current profile and its associated Redux store.
    window.location.reload();
  };

  const handleGetUser = async (userId) => {
    dispatch(getUserById(userId))
      .then((resp) => {
        const { data } = resp?.payload;
        dispatch(setUser(data));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const shouldGetProfile = ![
    "/login",
    "/",
    "/register",
    "/reset-password/*",
    "/forgot-password",
  ].includes(pathname);

  useEffect(() => {
    if (shouldGetProfile && localStorage?.USER_ID) {
      handleGetUser(userId);
    }
  }, [shouldGetProfile, localStorage?.USER_TOKEN]);

  useEffect(() => {
    if (!localStorage?.USER_ID && shouldGetProfile) {
      handleError();
    }
  }, [localStorage?.USER_ID, pathname]);

  return children;
};

export default AuthGuard;
