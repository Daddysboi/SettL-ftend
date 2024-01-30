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
