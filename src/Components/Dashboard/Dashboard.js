import React, { useReducer, useEffect, useContext, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  faHome,
  faUser,
  faWallet,
  faGear,
  faReceipt,
  faTruck,
  faHandshake,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../redux/hooks";
import { googleLogout } from "@react-oauth/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { userContext } from "../../App";
import Home from "./Home/Home.Dashboard";
import Settings from "./Settings/Settings.Dashboard";
import Transactions from "./Transactions/Transactions.Dashboard";
import Wallet from "./Wallet.Dashboard";
import DashboardHeader from "./Header.Dashboard";
import Tracker from "./Tracker.Dashboard";
import Resolution from "./Resolution.Dashboard";
import { USER_ID, USER_TOKEN } from "../../services/CONSTANTS";

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
  width: 12rem;

  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    width: 5rem;
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    width: 9rem;
    padding-left: 0.1rem;
  }

  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
  }

  // Extra large screens, TV
  @media only screen and (min-width: 1201px) {
  }
`;

const StyledBtnContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

const StyledBtn = styled.button`
  border: none;
  background: none;
  text-align: left;
  color: #ffffff;
  font-weight: 200;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;

  ${({ active }) =>
    active &&
    css`
      color: #4db6ac;
      background-color: #ffffff;
    `}

  &:hover {
    background-color: #4db6ac;
    color: #ffffff;
  }
`;

const StyledBtnName = styled.span`
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    display: none;
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  padding-right: 0.5rem;
`;

const SignoutLink = styled(Link)`
  border: none;
  background: none;
  text-align: left;
  color: #ffffff;
  font-weight: 200;
  padding: 0.5rem;
  font-size: 0.6rem;
  text-decoration: none;
  border-radius: 0.5rem;

  transition: background-color 0.2s ease;
  ${({ active }) =>
    active &&
    css`
      color: #4db6ac;
      background-color: #ffffff;
    `}

  &:hover {
    background-color: #4db6ac;
    color: #ffffff;
  }
`;

const StyledRight = styled.div`
  flex: 7;
  margin-left: 12rem;
  margin-top: 4.5rem;
  ${SharedSideStyles}
  &::-webkit-scrollbar {
    width: 0;
  }
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    margin-left: 5rem;
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    margin-left: 8rem;
  }
`;

const StyledFontAwesomeIconSignOut = styled(FontAwesomeIcon)`
  padding-right: 0.5rem;
`;

const StyledSignOutTxt = styled.span`
  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    display: none;
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
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

  const { transactions } = useAppSelector((state) => state.transaction);
  const { user } = useAppSelector((state) => state.user);

  const logOut = () => {
    googleLogout();
    localStorage.removeItem(USER_TOKEN);
    localStorage.removeItem(USER_ID);
  };

  const filterTransactions = (trnx) => {
    // List of statuses to exclude
    const excludedStatuses = ["DECLINED", "REFUNDED", "APPROVED"];

    // Filter transactions based on excluded statuses
    const filteredTransactions = trnx?.filter((transaction) => {
      // Check if the transaction status is not in the excluded statuses list
      return !excludedStatuses?.includes(transaction?.status);
    });

    return filteredTransactions;
  };

  const ongoingTransactions = useMemo(
    () => filterTransactions(transactions),
    [transactions]
  );

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
              <StyledFontAwesomeIcon icon={faHome} />
              <StyledBtnName>Home</StyledBtnName>
            </StyledBtn>
            <StyledBtn
              active={page === "transactions"}
              onClick={() => navigateTo("transactions")}
            >
              <StyledFontAwesomeIcon icon={faReceipt} />
              <StyledBtnName>Transactions</StyledBtnName>
            </StyledBtn>
            <StyledBtn
              active={page === "wallet"}
              onClick={() => navigateTo("wallet")}
            >
              <StyledFontAwesomeIcon icon={faWallet} />
              <StyledBtnName>Wallet</StyledBtnName>
            </StyledBtn>
            <StyledBtn
              active={page === "settings"}
              onClick={() => navigateTo("settings")}
            >
              <StyledFontAwesomeIcon icon={faGear} />
              <StyledBtnName>Settings</StyledBtnName>
            </StyledBtn>
            <StyledBtn
              active={page === "resolution"}
              onClick={() => navigateTo("resolution")}
            >
              <StyledFontAwesomeIcon icon={faHandshake} />
              <StyledBtnName> Resolution</StyledBtnName>
            </StyledBtn>{" "}
            <StyledBtn
              style={{ display: "none" }}
              active={page === "tracker"}
              onClick={() => navigateTo("tracker")}
            >
              <StyledFontAwesomeIcon icon={faTruck} />
              <StyledBtnName> Tracking</StyledBtnName>
            </StyledBtn>
          </StyledBtnContainer>

          <SignoutLink to="/" onClick={logOut}>
            <StyledFontAwesomeIconSignOut icon={faSignOut} />
            <StyledSignOutTxt>Sign Out</StyledSignOutTxt>
          </SignoutLink>
        </StyledSideBar>

        <StyledRight>
          {page === "home" && <Home user={user} transactions={transactions} />}
          {page === "transactions" && (
            <Transactions
              navigateTo={navigateTo}
              user={user}
              transactions={transactions}
              ongoingTransactions={ongoingTransactions}
            />
          )}
          {page === "wallet" && (
            <Wallet user={user} transactions={transactions} />
          )}
          {page === "settings" && <Settings user={user} />}
          {page === "tracker" && (
            <Tracker navigateTo={navigateTo} user={user} />
          )}
          {page === "resolution" && <Resolution />}
        </StyledRight>
      </StyledContainer>
    </>
  );
};

export default Dashboard;
