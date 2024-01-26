import React, { useReducer, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { styled, css } from "styled-components";
import Home from "./Home.Dashboard.js";
import Settings from "./Settings.Dashboard.js";
import Transactions from "./Transactions.Dashboard.js";
import Wallet from "./Wallet.Dashboard.js";
import Profile from "./Profile.Dashboard.js";
import DashboardHeader from "./Header.Dashboard";
import Tracker from "./Tracker.Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faWallet,
  faGear,
  faReceipt,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

//Sidebar
const StyledContainer = styled.div`
  display: flex;
  height: 100vh;
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
  /* height: 100%; */
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

//Right
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

const SellerDashboard = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { page, initialLoad } = state;
  const { sellerId } = useParams();

  useEffect(() => {
    if (initialLoad) {
      dispatch({ type: "navigate", payload: "home" });
    }
  }, [initialLoad]);

  return (
    <>
      <DashboardHeader />
      <StyledContainer>
        <StyledSideBar>
          <StyledBtnContainer>
            <StyledBtn
              active={page === "home"}
              onClick={() => dispatch({ type: "navigate", payload: "home" })}
            >
              <FontAwesomeIcon
                icon={faHome}
                style={{ paddingRight: "0.5rem" }}
              />
              Home
            </StyledBtn>
            <StyledBtn
              active={page === "profile"}
              onClick={() => dispatch({ type: "navigate", payload: "profile" })}
            >
              <FontAwesomeIcon
                icon={faUser}
                style={{ paddingRight: "0.5rem" }}
              />
              Profile
            </StyledBtn>
            <StyledBtn
              active={page === "transactions"}
              onClick={() =>
                dispatch({ type: "navigate", payload: "transactions" })
              }
            >
              <FontAwesomeIcon
                icon={faReceipt}
                style={{ paddingRight: "0.5rem" }}
              />
              Transactions
            </StyledBtn>
            <StyledBtn
              active={page === "wallet"}
              onClick={() => dispatch({ type: "navigate", payload: "wallet" })}
            >
              <FontAwesomeIcon
                icon={faWallet}
                style={{ paddingRight: "0.5rem" }}
              />
              Wallet
            </StyledBtn>
            <StyledBtn
              active={page === "settings"}
              onClick={() =>
                dispatch({ type: "navigate", payload: "settings" })
              }
            >
              <FontAwesomeIcon
                icon={faGear}
                style={{ paddingRight: "0.5rem" }}
              />
              Settings
            </StyledBtn>
            <StyledBtn
              active={page === "tracker"}
              onClick={() => dispatch({ type: "navigate", payload: "tracker" })}
            >
              <FontAwesomeIcon
                icon={faTruck}
                style={{ paddingRight: "0.5rem" }}
              />
              Order Tracker
            </StyledBtn>
          </StyledBtnContainer>

          <SignoutLink to="/">Sign Out</SignoutLink>
          {/* create signout logic to remove user from local storage */}
        </StyledSideBar>

        <StyledRight>
          {page === "home" && <Home />}
          {page === "profile" && <Profile />}
          {page === "transactions" && <Transactions />}
          {page === "wallet" && <Wallet />}
          {page === "settings" && <Settings />}
          {page === "tracker" && <Tracker />}
        </StyledRight>
      </StyledContainer>
    </>
  );
};

export default SellerDashboard;
