import React from "react";
import styled from "styled-components";
import MobileImg from "../../assets/images/mobile.png";

const MobileApp = () => {
  const StyledImg = styled.img`
    padding: 0;
    margin: 0;
    width: 100vw;
    background-size: contain;
    height: 80vh;
    // Mobile devices
    @media only screen and (min-width: 320px) and (max-width: 480px) {
    }

    // iPads, Tablets
    @media only screen and (min-width: 481px) and (max-width: 768px) {
      height: 45vh;
    }
    @media only screen and (min-width: 769px) and (max-width: 1024px) {
      height: 70vh;
    }

    // Desktops, large screens
    @media only screen and (min-width: 1025px) and (max-width: 1200px) {
      height: 70vh;
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
