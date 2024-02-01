import React from "react";
import styled from "styled-components";
import MobileImg from "../../assets/images/mobile.png";

const MobileApp = () => {
  const StyledImg = styled.img`
    width: 100vw;
    height: 80vh;
    @media only screen and (min-width: 769px) and (max-width: 1024px) {
      height: 45vh;
    }

    // Desktops, large screens
    @media only screen and (min-width: 1025px) and (max-width: 1200px) {
      height: 60vh;
    }

    // Extra large screens, TV
    @media only screen and (min-width: 1201px) {
    }
  `;
  return (
    <div>
      <StyledImg src={MobileImg} alt="" />
    </div>
  );
};

export default MobileApp;
