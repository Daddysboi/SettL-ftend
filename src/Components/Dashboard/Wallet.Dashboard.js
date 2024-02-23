import { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";

const StyledCardPair = styled.div`
  display: flex;
  gap: 1rem;
  padding-bottom: 2rem;

  @media only screen and (min-width: 320px) and (max-width: 480px) {
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
  }
`;

const StyledCard = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 2px 2px 2px 2px rgba(0.1, 0.1, 0.1, 0.1);
  width: 8.7rem;
  height: 6.5rem;
  background-color: #fff;
  padding: 0.2rem 1.2rem;
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    width: 5rem;
    padding-bottom: 0.5rem;
  }
`;

const StyledCardHead = styled.h1`
  font-size: 0.7rem;
  font-weight: 400;
`;

const StyledCardTxt = styled.p`
  font-size: 0.6rem;
  font-weight: 300;
  margin: 0;
  opacity: 0.7;
`;

const StyledBtn = styled.button.attrs((props) => ({
  disabled: props.disabled,
}))`
  background-color: ${(props) => (props.disabled ? "#d3d3d3" : "#f26600")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  color: ${(props) => (props.disabled ? "gray" : "white")};
  outline: none;
  border: none;
  border: solid 1px #f26600;
  border-radius: 0.8rem;
  padding: 0.3rem 0.2rem;
  margin-top: 0.3rem;

  &:hover {
    color: ${(props) => (props.disabled ? "gray" : "#f26600")};
    background-color: ${(props) => (props.disabled ? "#d3d3d3" : "#fff")};
    border: ${(props) => (props.disabled ? "none" : "1px solid #f26600")};
  }
`;

const StyledCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  width: 35rem;
`;

const StyledCardHeaderBtm = styled.h4`
  margin: 0;
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    display: none;
  }
`;

const FontAwesome = styled(FontAwesomeIcon)`
  color: #4db6ac;
  cursor: pointer;
  margin-right: 1.5rem;
  &:hover {
    color: #557e7e;
  }
`;

const StyledCardContainerBtm = styled.div`
  height: 28rem;
  width: 30rem;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 2px 2px rgba(0.1, 0.1, 0.1, 0.1);
  padding: 0 2rem 0 0;
  background-color: #fff;
  margin-top: 1rem;

  @media only screen and (min-width: 320px) and (max-width: 480px) {
    display: none;
  }
  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    height: 8rem;
  }

  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    height: 11rem;
  }
`;

const StyledTable = styled.table`
  width: 35rem;
`;

const StyledTd = styled.td`
  font-size: 0.9rem;
  font-weight: 400;
  padding-right: 2.2rem;
  padding-top: 01rem;
`;

const Wallet = ({ user, transactions }) => {
  const [withdrawal, setWithdrawal] = useState(false);
  const [currentTable, setCurrentTable] = useState(0);

  const itemsPerTable = 10;
  const startIndex = currentTable * itemsPerTable;
  const endIndex = Math.min(startIndex + itemsPerTable, transactions.length);

  const nextTable = () => {
    setCurrentTable((prevTable) => prevTable + 1);
  };

  const prevTable = () => {
    setCurrentTable((prevTable) => Math.max(prevTable - 1, 0));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

    return formattedDate;
  };

  const formatAmount = (amount) => {
    const numAmount = parseFloat(amount);
    if (numAmount >= 1000) {
      return numAmount.toLocaleString();
    } else {
      return amount;
    }
  };

  const handleWithdrawal = () => {
    if (user?.walletDetails?.toFixed(2) > 0) {
      setWithdrawal(true);
    } else {
      toast.error("You have no wallet balance to withdraw.");
    }
  };

  if (withdrawal) {
    console.log("thank you for withdrawing");
  }
  return (
    <div>
      {user?.role === "seller" ? (
        <StyledCardPair>
          <StyledCard>
            <StyledCardHead>Wallet Balance</StyledCardHead>
            <p>NGN {user?.walletDetails?.toFixed(2) || 0}</p>
          </StyledCard>
          <StyledCard>
            <StyledCardHead>Withdraw</StyledCardHead>
            <StyledCardTxt>
              Seamlessly withdraw funds for financial flexibility.
            </StyledCardTxt>

            <StyledBtn onClick={handleWithdrawal} disabled={withdrawal}>
              Withdraw Balance
            </StyledBtn>
          </StyledCard>
        </StyledCardPair>
      ) : (
        ""
      )}
      <div>
        <StyledCardContainer>
          <StyledCardHeaderBtm>Transactions History</StyledCardHeaderBtm>
          <div>
            <FontAwesome
              icon={faArrowCircleLeft}
              style={{
                marginRight: "0.5rem",
              }}
              onClick={prevTable}
            />
            <FontAwesome icon={faArrowCircleRight} onClick={nextTable} />
          </div>
        </StyledCardContainer>
        <StyledCardContainerBtm>
          <StyledTable style={{ borderCollapse: "collapse" }}>
            <tbody>
              {transactions.slice(startIndex, endIndex).map((transaction) => (
                <tr key={transaction._id}>
                  <StyledTd style={{ textAlign: "right" }}>
                    {formatDate(transaction.createAt)}
                  </StyledTd>
                  <StyledTd style={{ textAlign: "center", color: "green" }}>
                    {user?.role === "seller" ? (
                      <span style={{ color: "Red" }}>Withdrawn</span>
                    ) : (
                      <span style={{ color: "Red" }}>Paid</span>
                    )}
                  </StyledTd>
                  <StyledTd style={{ textAlign: "right" }}>
                    {`₦ ${formatAmount(transaction.formData.amount)}`}
                  </StyledTd>

                  <StyledTd>{transaction.formData.productName}</StyledTd>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </StyledCardContainerBtm>
      </div>
    </div>
  );
};

export default Wallet;
