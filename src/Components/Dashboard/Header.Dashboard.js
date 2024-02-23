import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { MdVerified } from "react-icons/md";
import { TailSpin as Loader } from "react-loader-spinner";

import { userContext } from "../../App";
import { useAppSelector } from "../../redux/hooks";

import logo from "../../assets/logo/favicon.png";

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  background: #ffffff;
  z-index: 1;
`;

const StyledLogo = styled(NavLink)`
  color: #f26600;
  font-size: 2rem;
  text-decoration: none;
  font-weight: 600;
`;

const StyledImg = styled.img`
  height: 2rem;
  padding-right: 0.5rem;
`;

const StyledAccount = styled.div``;

const StyledNavLink = styled(NavLink)`
  color: black;
  text-decoration: none;
`;

const StyledProfilePix = styled.img`
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 1.8rem;
  object-fit: cover;
`;

const StyledAccountIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  color: gray;
`;

const StyledLoader = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid #f26600;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Header = () => {
  const [loading, setLoading] = useState(true);
  const { profile } = useContext(userContext);
  // const [isSellerMode, setIsSellerMode] = useState(true);
  const verified = true;

  const { user } = useAppSelector((state) => state.user);

  // don't set state inside use Effect like this @temi
  useEffect(() => {
    setLoading(false);
  }, [profile]);

  // const handleModeToggle = (checked) => {
  //   setIsSellerMode(checked);
  // };

  const displayName =
    user?.lastName === undefined || user?.firstName === undefined ? (
      <Loader
        type="TailSpin"
        color="#ff4500"
        height={20}
        width={20}
        style={{ margin: "auto" }}
      />
    ) : (
      `${user?.lastName} ${user?.firstName}`
    );

  // const displayName = `${user?.lastName} ${user?.firstName}`;

  return (
    <StyledContainer>
      <StyledLogo to="/">
        <StyledImg src={logo} alt="logo" />
        Sett<span style={{ color: "#4db6ac" }}>L</span>
      </StyledLogo>
      <div>
        <StyledNavLink to="signup">
          <StyledAccount>
            {loading ? (
              <Loader
                type="TailSpin"
                color="#ff4500"
                height={20}
                width={20}
                style={{ margin: "auto" }}
              />
            ) : (
              <>
                {profile?.picture ? (
                  <StyledProfilePix
                    src={profile?.picture}
                    alt={profile?.name}
                  />
                ) : (
                  <StyledAccountIcon icon={faUser} />
                )}
                {verified ? (
                  <MdVerified style={{ color: "green" }} />
                ) : (
                  <MdVerified style={{ color: "gray" }} />
                )}
                <span style={{ marginLeft: "0.5rem", textDecoration: "none" }}>
                  {profile?.name || displayName || "User"}
                </span>
              </>
            )}
          </StyledAccount>
        </StyledNavLink>
      </div>
    </StyledContainer>
  );
};

export default Header;

<div>
  <div>
    <div>
      {/* <label>
      Toggle Mode:
      <Switch
        onChange={handleModeToggle}
        checked={isSellerMode}
        checkedIcon={false}
        uncheckedIcon={false}
        onColor="#86d3ff"
        offColor="#f26600"
      />
    </label> */}
      {/* <p>Current Mode: {isSellerMode ? "Seller" : "Buyer"}</p> */}

      {/* {isSellerMode ? <p>Seller Content</p> : <p>Buyer Content</p>} */}
    </div>
  </div>
</div>;
