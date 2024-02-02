import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo/favicon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import Switch from "react-switch";

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
`;

const StyledImg = styled.img`
  height: 2rem;
`;

const StyledAccount = styled.div``;

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
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({ name: "", profilePicture: "" });

  // const [isSellerMode, setIsSellerMode] = useState(true);

  // const handleModeToggle = (checked) => {
  //   setIsSellerMode(checked);
  // };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url =
          "https://res.cloudinary.com/daj31htoa/image/upload/v1706072203/WhatsApp_Image_2022-12-22_at_4.29.04_AM_-_Copy_b0ui8d.jpg";
        const res = await axios.get(url, userData, {
          responseType: "arraybuffer",
        });
        console.log(res); // Log the entire response
        console.log("hi");

        if (res.status === 200) {
          const contentType = res.headers["content-type"];
          if (contentType.includes("image")) {
            console.log("Image data:", res.data);
            setUserData((prevUserData) => ({
              ...prevUserData,
              profilePicture: url,
            }));
          }
        } else {
          console.error("Failed to fetch user data");
          const jsonData = JSON.parse(new TextDecoder().decode(res.data));
          console.log("JSON data:", jsonData);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, []); // Empty dependency array to run the effect once on mount

  return (
    <StyledContainer>
      <StyledLogo to="/">
        <StyledImg src={logo} alt="logo" />
        Sett<span style={{ color: "#4db6ac" }}>L</span>
      </StyledLogo>
      <div>
        <NavLink to="signup">
          <StyledAccount>
            {isLoading ? (
              <StyledLoader />
            ) : (
              <>
                {userData.profilePicture ? (
                  <StyledProfilePix
                    src={userData.profilePicture}
                    alt={userData.name}
                    // onError={(e) => {
                    //   e.target.style.display = "none"; // Hide the image if an error occurs
                    // }}
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} />
                )}
                <span style={{ marginLeft: "0.5rem" }}>
                  {userData.name || "User"}
                </span>
              </>
            )}
          </StyledAccount>
        </NavLink>
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
