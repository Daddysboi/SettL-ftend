import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";

const StyledCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
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
  height: 8rem;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 2px 2px rgba(0.1, 0.1, 0.1, 0.1);
  padding: 1rem 2rem 0 2rem;
  background-color: #fff;
  margin-top: 1rem;
  /* width: 50vw; */

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
  width: 40rem;
`;

const StyledTh = styled.th`
  font-size: 0.7rem;
  text-align: left;
  font-weight: 400;
  padding-right: 2.2rem;
  padding-bottom: 0.5rem;
  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    padding-right: 0.5rem;
  }

  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    padding-right: 0.5rem;
  }
`;
const StyledTd = styled.td`
  font-size: 0.7rem;
  letter-spacing: -0.04rem;
  font-weight: 400;
  padding-right: 2.2rem;
  padding-bottom: 0.5rem;
`;

const RecentTransactions = ({ user, transactions }) => {
  const [currentTable, setCurrentTable] = useState(0);

  const itemsPerTable = 4;
  const startIndex = currentTable * itemsPerTable;
  const endIndex = Math.min(startIndex + itemsPerTable, transactions?.length);

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

  return (
    <div>
      <StyledCardContainer>
        <StyledCardHeaderBtm>Recent Transactions</StyledCardHeaderBtm>
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
          <thead>
            <tr style={{ backgroundColor: "#4db6ac", borderRadius: "0.5rem" }}>
              <StyledTh>Transaction ID</StyledTh>
              <StyledTh>Title</StyledTh>
              <StyledTh>Date Created</StyledTh>
              <StyledTh>Date Due</StyledTh>
              <StyledTh>Amount</StyledTh>
              <StyledTh>Status</StyledTh>
            </tr>
          </thead>
          <tbody>
            {transactions?.slice(startIndex, endIndex).map((transaction) => (
              <tr key={transaction._id}>
                <StyledTd style={{ textAlign: "center" }}>
                  {transaction._id}
                </StyledTd>
                <StyledTd>{transaction.formData.productName}</StyledTd>
                <StyledTd style={{ textAlign: "right" }}>
                  {formatDate(transaction.createAt)}
                </StyledTd>
                <StyledTd style={{ textAlign: "right" }}>
                  {formatDate(transaction.dateDue)}
                </StyledTd>
                <StyledTd style={{ textAlign: "right" }}>
                  {`₦ ${formatAmount(transaction.formData.amount)}`}
                </StyledTd>
                <StyledTd>{transaction.status}</StyledTd>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </StyledCardContainerBtm>
    </div>
  );
};

export default RecentTransactions;
