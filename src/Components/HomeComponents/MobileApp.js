import React from "react";
import styled from "styled-components";
import MobileImg from "../../assets/images/mobile.png";

const MobileApp = () => {
  const StyledImg = styled.img`
    width: 100vw;
    height: 80vh;
  `;
  return (
    <div>
      <StyledImg src={MobileImg} alt="" />
    </div>
  );
};

export default MobileApp;
