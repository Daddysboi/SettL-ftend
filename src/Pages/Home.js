import React from "react";
import About from "../Components/HomeComponents/About";
import Contact from "../Components/HomeComponents/Contact";
import Faqs from "../Components/HomeComponents/Faqs";
import Hero from "../Components/HomeComponents/Hero";
import WhyChooseUs from "../Components/HomeComponents/WhyChooseUs";
import styled from "styled-components";
import HowToGetStarted from "../Components/HomeComponents/HowToGetStarted";
import MobileApp from "../Components/HomeComponents/MobileApp";

const StyledContainer = styled.div`
  margin: 2rem 5rem;
  overflow-x: hidden;

  @media only screen and (min-width: 481px) and (max-width: 768px) {
    margin: 2rem 0;
  }
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    margin: 2rem 0;
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
    margin: 2rem 0rem;
  }
`;
const Home = () => {
  return (
    <>
      <StyledContainer>
        <Hero />
        <About />
        <WhyChooseUs />
        <HowToGetStarted />
        <Faqs />
        <MobileApp />
      </StyledContainer>
      <Contact />
    </>
  );
};

export default Home;
