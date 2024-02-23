import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import TransactionProgress from "./TransactionProgress";
import TransactionCard from "./TransactionCard";
import TransactionChatBox from "./TransactionChatBox";

const StyledCardOngoingTop = styled.div`
  display: flex;
  justify-content: space-between;
  width: 3rem;
  margin-bottom: 1rem;
`;

const StyledCardOngoingTopTxt = styled.h4`
  margin: 0 2rem 0 0;
`;
const FontAwesome = styled(FontAwesomeIcon)`
  color: #4db6ac;
  cursor: pointer;
  &:hover {
    color: #557e7e;
  }
`;
const StyledContainer = styled.div`
  display: flex;
  gap: 2rem;
  height: 30rem;
  width: 50rem;
  font-size: 0.7rem;
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    display: block;
    width: 15rem;
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    width: 30rem;
  }

  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    width: 50vw;
  }
`;

const StyledLeft = styled.div`
  display: flex;
  flex: 1.5;
  flex-direction: column;
  gap: 2rem;
`;

const StyledLeftTop = styled.div`
  flex: 1;
  background-color: #fff;
  box-shadow: 0 0 2px 2px rgba(0.1, 0.1, 0.1, 0.05);
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media only screen and (min-width: 320px) and (max-width: 480px) {
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    width: 15rem;
  }

  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    width: 18rem;
  }
`;
const StyledSpanCtn = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledHeader = styled.span`
  font-size: 1rem;
  display: flex;
  align-items: space-between;
`;

const StyledLeftBtm = styled.div`
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 0 2px 2px rgba(0.1, 0.1, 0.1, 0.05);
  padding: 1rem;
  flex: 1;
  @media only screen and (min-width: 320px) and (max-width: 480px) {
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    width: 15rem;
  }

  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    width: 18rem;
  }
`;

const StyledRight = styled.div`
  border-radius: 0.5rem;
  flex: 1;
  box-shadow: 0 0 2px 2px rgba(0.1, 0.1, 0.1, 0.05);
  padding: 1rem;
  background-color: #fff;
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    margin-top: 2rem;
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    width: 15rem;
  }

  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    width: 15rem;
  }
`;

const Transactions = ({
  navigateTo,
  user,
  transactions,
  ongoingTransactions,
}) => {
  const [state, setState] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === ongoingTransactions.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? ongoingTransactions.length - 1 : prevIndex - 1
    );
  };

  const currentTransaction = ongoingTransactions[currentIndex];

  const disabledButton = ["VERIFIED", "RECEIVED"];

  const handleProcessTransaction = () => {
    if (user?.role === "seller") {
      if (currentTransaction?.status !== "RECEIVED") {
        return toast.error("Transaction has not been received by the customer");
      }
      alert("Call update transaction status to approved here seller");
      return;
    }
    alert("Call update transaction status to approved here buyer");
  };

  return (
    <div style={{ width: "100vw", height: "100vh", background: "f8f7f7" }}>
      <div>
        <StyledCardOngoingTop>
          <StyledCardOngoingTopTxt>
            Transactions
            <span
              style={{
                color: "#f26600",
                fontSize: "1rem",
                marginLeft: "1rem",
              }}
            ></span>
          </StyledCardOngoingTopTxt>
          <div style={{ display: "flex" }}>
            <FontAwesome
              icon={faArrowCircleLeft}
              style={{
                marginRight: "0.5rem",
              }}
              onClick={handlePrevious}
            />
            <FontAwesome icon={faArrowCircleRight} onClick={handleNext} />
          </div>
        </StyledCardOngoingTop>
      </div>
      <StyledContainer>
        <StyledLeft>
          <StyledLeftTop>
            <TransactionCard
              user={user}
              transactions={transactions}
              currentTransaction={currentTransaction}
              StyledSpanCtn={StyledSpanCtn}
              StyledHeader={StyledHeader}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
              currentIndex={currentIndex}
              ongoingTransactions={ongoingTransactions}
            />
          </StyledLeftTop>
          <StyledLeftBtm>
            <TransactionChatBox
              user={user}
              transactions={transactions}
              currentTransaction={currentTransaction}
              StyledSpanCtn={StyledSpanCtn}
              StyledHeader={StyledHeader}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
              currentIndex={currentIndex}
            />
          </StyledLeftBtm>
        </StyledLeft>
        <StyledRight>
          <TransactionProgress
            user={user}
            transactions={transactions}
            currentTransaction={currentTransaction}
            StyledSpanCtn={StyledSpanCtn}
            StyledHeader={StyledHeader}
            disabledButton={disabledButton}
            handleProcessTransaction={handleProcessTransaction}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            navigateTo={navigateTo}
            currentIndex={currentIndex}
          />
        </StyledRight>
      </StyledContainer>
    </div>
  );
};

export default Transactions;
