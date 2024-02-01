import { useState } from "react";
import Faqs_data from "../../Data/Faqs_data.json";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const StyledContainer = styled.div`
  display: flex;
  gap: 3rem;
  justify-content: center;
  box-shadow: -1px 5px 5px rgba(0, 0, 0, 0.1);
  padding: 4rem;
  background-color: #f1f4fa;
  margin: 4rem 0;
`;
const StyledHeader = styled.h1`
  margin: 0;
  font-size: 3rem;
  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    font-size: 2.5rem;
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
    font-size: 2.8rem;
  }
`;
const StyledSubHeader = styled.p`
  color: #f26600;
  font-size: 1.5rem;
  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    font-size: 1.2rem;
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
    font-size: 1.4rem;
  }
`;
const StyledQuestion = styled.h1`
  font-size: 1.3rem;
  text-align: justify;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.05);
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.1); */
  padding: 0.5rem 0.9rem;
  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    font-size: 1rem;
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
    font-size: 1.2rem;
  }
`;
const StyledAnswer = styled.p`
  font-size: 1rem;
  text-align: justify;
  font-weight: 400;
  padding-left: 2rem;
  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    font-size: 0.8rem;
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
    font-size: 0.9rem;
  }
`;

const Faqs = () => {
  const [accordion, setAccordion] = useState(-1);

  const toggleAccordion = (index) => {
    setAccordion((prev) => (prev === index ? -1 : index));
  };

  return (
    <StyledContainer id="faq">
      <div style={{ flex: "1.2" }}>
        <StyledHeader>
          Frequently Asked Questions <br />
          <StyledSubHeader>
            Here are answers to questions you might have about SettL.
          </StyledSubHeader>
        </StyledHeader>
      </div>
      <div style={{ flex: "4" }}>
        {Faqs_data.map((item, index) => (
          <div
            key={index}
            open={accordion === index}
            onClick={() => toggleAccordion(index)}
          >
            <StyledQuestion>
              {item.question}{" "}
              <FontAwesomeIcon
                style={{ fontSize: "0.8rem" }}
                icon={accordion === index ? faChevronUp : faChevronDown}
              />
            </StyledQuestion>
            <StyledAnswer>
              {accordion === index && <p>{item.answer}</p>}
            </StyledAnswer>
          </div>
        ))}
      </div>
    </StyledContainer>
  );
};

export default Faqs;
