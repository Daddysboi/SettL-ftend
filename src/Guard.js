import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { getUserById, setUser } from "./features/userSlice";
import { useAppDispatch } from "./redux/hooks";
import { USER_ID } from "./services/CONSTANTS";
import { setTransactions } from "./features/transactionSlice";

const Guard = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userId = localStorage.getItem(USER_ID);

  const handleError = () => {
    navigate("/login");
    window.location.reload();
  };

  const handleGetUser = async (userId) => {
    dispatch(getUserById(userId))
      .then((resp) => {
        const { data } = resp?.payload;
        dispatch(setUser(data?.user));
        dispatch(setTransactions(data?.transactions));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getProfile = ![
    "/login",
    "/signup",
    "/",
    "/register",
    "/reset-password/*",
    "/forgot-password",
  ].includes(pathname);

  const initialized = useRef(false);

  useEffect(() => {
    if (getProfile && localStorage?.USER_ID) {
      handleGetUser(userId);
    }
  }, [getProfile, localStorage?.USER_TOKEN]);

  useEffect(() => {
    if (!localStorage?.USER_ID && getProfile) {
      handleError();
    }
  }, [localStorage?.USER_ID, pathname]);

  return children;
};

export default Guard;
