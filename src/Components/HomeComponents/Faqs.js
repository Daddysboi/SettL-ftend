import { useState } from "react";
import Faqs_data from "../../Data/Faqs_data.json";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const StyledContainer = styled.div`
  display: flex;
  gap: 3rem;
  justify-content: center;
  align-items: center;
  padding: 20px;
  @media (min-width: 710px) {
    padding: 0 4rem 4rem;
  }

  @media (min-width: 920px) {
    gap: 3rem;
    padding: 0 7rem;
  }
`;

const StyledWrapper = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: -1px 5px 5px rgba(0, 0, 0, 0.1);
  background-color: #f1f4fa;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  @media (min-width: 710px) {
    gap: 30px;
    flex-direction: row;
    padding: 2rem;
  }

  @media (min-width: 920px) {
    gap: 60px;
    padding: 4rem;
  }
`;

const StyledHeader = styled.h1`
  margin-top: 2rem;
  font-size: 1.3rem;
  @media (min-width: 490px) {
    font-size: 3rem;
  }
`;
const StyledSubHeader = styled.p`
  color: #f26600;
  margin-top: 2rem;
  font-size: 0.7rem;
  @media (min-width: 490px) {
    font-size: 1.5rem;
  }
`;
const StyledQuestion = styled.h1`
  text-align: justify;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.05);
  padding: 0.5rem 0.9rem;
  font-size: 0.7rem;
  @media (min-width: 490px) {
    font-size: 1.3rem;
  }
`;
const StyledAnswer = styled.p`
  text-align: justify;
  font-weight: 400;
  padding-left: 2rem;
  font-size: 0.5rem;
  @media (min-width: 490px) {
    font-size: 1rem;
  }
`;

const Faqs = () => {
  const [accordion, setAccordion] = useState(-1);

  const toggleAccordion = (index) => {
    setAccordion((prev) => (prev === index ? -1 : index));
  };

  return (
    <StyledContainer id="faq">
      <StyledWrapper>
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
                {item.question}
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
      </StyledWrapper>
    </StyledContainer>
  );
};

export default Faqs;
