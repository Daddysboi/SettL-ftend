import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

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
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 4;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, transactions.length);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const formatDate = (dateString) => {
    // Create a new Date object from the dateString
    const date = new Date(dateString);

    // Format the date as desired
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

    return formattedDate;
  };

  const formatAmount = (amount) => {
    // Convert amount to number
    const numAmount = parseFloat(amount);
    // Check if the amount has more than 3 digits
    if (numAmount >= 1000) {
      // Format with comma for thousands
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
            onClick={prevPage}
          />
          <FontAwesome icon={faArrowCircleRight} onClick={nextPage} />
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
            {transactions.slice(startIndex, endIndex).map((transaction) => (
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
        </StyledTable>{" "}
      </StyledCardContainerBtm>
    </div>
  );
};

export default RecentTransactions;
