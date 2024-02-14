import React, { useReducer, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import styled, { css } from "styled-components";
import Home from "./Home/Home.Dashboard";
import Settings from "./Settings.Dashboard";
import Transactions from "./Transactions.Dashboard";
import Wallet from "./Wallet.Dashboard";
import Profile from "./Profile.Dashboard";
import DashboardHeader from "./Header.Dashboard";
import Tracker from "./Tracker.Dashboard";
import Resolution from "./Resolution.Dashboard";
import { USER_ID, USER_TOKEN } from "../../services/CONSTANTS";
import { googleLogout } from "@react-oauth/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faWallet,
  faGear,
  faReceipt,
  faTruck,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../redux/hooks";

const StyledContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f8f7f7;
  overflow: hidden;
`;

const SharedSideStyles = css`
  overflow: auto;
  padding: 2rem;
  box-sizing: border-box;
`;

const StyledSideBar = styled.div`
  ${SharedSideStyles}
  flex: 1;
  background-color: #f26600;
  background-image: linear-gradient(#f8701c 0.6px, transparent 0.6px),
    linear-gradient(90deg, #f8701c 0.6px, transparent 0.6px);
  background-size: 130px 130px;
  background-position: 0 0, 0 0;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  bottom: 0;
  left: 0;
  top: 5rem;
  color: #ffffff;
`;

const StyledBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledBtn = styled.button`
  border: none;
  background: none;
  margin-bottom: 0.5rem;
  text-align: left;
  color: #ffffff;
  font-weight: 200;
`;

const SignoutLink = styled(Link)`
  border: none;
  background: none;
  margin-bottom: 0.5rem;
  text-align: left;
  color: #ffffff;
  font-size: 0.6rem;
  text-decoration: none;
`;

const StyledRight = styled.div`
  flex: 7;
  margin-left: 12rem;
  margin-top: 4.5rem;
  ${SharedSideStyles}
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const initialState = {
  page: "home",
  initialLoad: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "navigate":
      return {
        page: action.payload,
        initialLoad: false,
      };
    default:
      return state;
  }
};

const Dashboard = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { page, initialLoad } = state;
  const { userId } = useParams();

  const { transactions } = useAppSelector((state) => state.transaction);
  const { user } = useAppSelector((state) => state.user);
  // transaction is an array, loop through it and use it, you can pass it as prop @ temi
  console.log("User Transactions", transactions);
  // user is an object, you can pass it as props @ temi
  console.log("User Details", user);

  const logOut = () => {
    googleLogout();
    // setUser({}); // Clear user state
    // setProfile({}); // Clear profile state
    // localStorage.removeItem("token");
    localStorage.removeItem(USER_TOKEN);
    localStorage.removeItem(USER_ID);
  };

  useEffect(() => {
    if (initialLoad) {
      dispatch({ type: "navigate", payload: "home" });
    }
  }, [initialLoad]);

  const navigateTo = (destination) => {
    dispatch({ type: "navigate", payload: destination });
  };

  return (
    <>
      <DashboardHeader />
      <StyledContainer>
        <StyledSideBar>
          <StyledBtnContainer>
            <StyledBtn
              active={page === "home"}
              onClick={() => navigateTo("home")}
            >
              <FontAwesomeIcon
                icon={faHome}
                style={{ paddingRight: "0.5rem" }}
              />
              Home
            </StyledBtn>
            <StyledBtn
              active={page === "profile"}
              onClick={() => navigateTo("profile")}
            >
              <FontAwesomeIcon
                icon={faUser}
                style={{ paddingRight: "0.5rem" }}
              />
              Profile
            </StyledBtn>
            <StyledBtn
              active={page === "transactions"}
              onClick={() => navigateTo("transactions")}
            >
              <FontAwesomeIcon
                icon={faReceipt}
                style={{ paddingRight: "0.5rem" }}
              />
              Transactions
            </StyledBtn>
            <StyledBtn
              active={page === "wallet"}
              onClick={() => navigateTo("wallet")}
            >
              <FontAwesomeIcon
                icon={faWallet}
                style={{ paddingRight: "0.5rem" }}
              />
              Wallet
            </StyledBtn>
            <StyledBtn
              active={page === "settings"}
              onClick={() => navigateTo("settings")}
            >
              <FontAwesomeIcon
                icon={faGear}
                style={{ paddingRight: "0.5rem" }}
              />
              Settings
            </StyledBtn>
            <StyledBtn
              active={page === "tracker"}
              onClick={() => navigateTo("tracker")}
            >
              <FontAwesomeIcon
                icon={faTruck}
                style={{ paddingRight: "0.5rem" }}
              />
              Order Tracker
            </StyledBtn>
            <StyledBtn
              active={page === "resolution"}
              onClick={() => navigateTo("resolution")}
            >
              <FontAwesomeIcon
                icon={faHandshake}
                style={{ paddingRight: "0.5rem" }}
              />
              Resolution
            </StyledBtn>
          </StyledBtnContainer>

          <SignoutLink to="/" onClick={logOut}>
            Sign Out
          </SignoutLink>
        </StyledSideBar>

        <StyledRight>
          {page === "home" && <Home user={user} transactions={transactions} />}
          {page === "profile" && <Profile />}
          {page === "transactions" && <Transactions navigateTo={navigateTo} />}
          {page === "wallet" && <Wallet />}
          {page === "settings" && <Settings />}
          {page === "tracker" && <Tracker navigateTo={navigateTo} />}
          {page === "resolution" && <Resolution />}
        </StyledRight>
      </StyledContainer>
    </>
  );
};

export default Dashboard;
