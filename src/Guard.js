import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { getUserById, setUser } from "./features/userSlice";
import { useAppDispatch } from "./redux/hooks";
import { USER_ID } from "./services/CONSTANTS";
import { setTransactions } from "./features/transactionSlice";

export const useFetchUserData = () => {
  const userId = localStorage.getItem(USER_ID);
  const dispatch = useAppDispatch();

  const handleGetUser = async () => {
    try {
      const resp = await dispatch(getUserById(userId));
      const { data } = resp.payload;
      dispatch(setUser(data?.user));
      dispatch(setTransactions(data?.transactions));
    } catch (error) {
      console.log(error.message);
    }
  };

  return handleGetUser;
};

const Guard = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const fetchUserData = useFetchUserData();

  const handleError = () => {
    navigate("/login");
    window.location.reload();
  };

  const getProfile = ![
    "/login",
    "/signup",
    "/otp",
    "/",
    "/reset-password/*",
    "/forgot-password",
  ].includes(pathname);

  useEffect(() => {
    if (getProfile && localStorage?.USER_ID) {
      fetchUserData();
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
