import { useState, useEffect } from "react";
import styled from "styled-components";

import img from "../../../assets/images/photo.jpeg";
import StatusIcon from "./StatusIcon";

const DivCtn = styled.div`
  height: 3rem;
`;
const StyledSpanHead = styled.span`
  font-size: 0.7rem;
  opacity: 0.5;
`;

const StyledSpan = styled.span``;

const StyledImg = styled.img`
  height: 1.5rem;
  margin-right: 1rem;
  border-radius: 1.5rem;
`;

const TransactionCard = ({
  transactions,
  currentTransaction,
  StyledSpanCtn,
  StyledHeader,
  currentIndex,
  ongoingTransactions,
}) => {
  // const [transactionData, setTransactionData] = useState(currentTransaction);

  const formatAmount = (amount) => {
    const numAmount = parseFloat(amount);
    if (numAmount >= 1000) {
      return numAmount.toLocaleString();
    } else {
      return amount;
    }
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

  // useEffect(() => {
  //   setTransactionData(ongoingTransactions[currentIndex]);
  // }, [currentIndex, ongoingTransactions]);
  return (
    <div>
      {transactions?.length ? (
        <>
          <DivCtn>
            <StyledSpanCtn>
              <StyledHeader>
                {currentTransaction?.formData?.productName}
              </StyledHeader>
            </StyledSpanCtn>
          </DivCtn>
          <DivCtn style={{ paddingBottom: "1rem" }}>
            <StyledSpanCtn>
              <StyledSpanHead>Seller</StyledSpanHead>
              <StyledSpanHead>Amount</StyledSpanHead>
            </StyledSpanCtn>
            <StyledSpanCtn>
              <StyledSpan style={{ display: "flex", flexDirection: "row" }}>
                <span>
                  <StyledImg src={img} alt="" />
                </span>
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <span>{currentTransaction?.formData?.counterpartyName}</span>
                  <span>{currentTransaction?.formData?.counterpartyPhone}</span>
                </span>
              </StyledSpan>
              <StyledSpan>
                {`₦ ${formatAmount(currentTransaction?.formData?.amount)}`}
              </StyledSpan>
            </StyledSpanCtn>
          </DivCtn>
          <DivCtn>
            <StyledSpanCtn>
              <StyledSpanHead>Date Created</StyledSpanHead>
              <StyledSpanHead>Date Due</StyledSpanHead>
            </StyledSpanCtn>
            <StyledSpanCtn>
              <StyledSpan>
                {formatDate(currentTransaction?.createAt)}
              </StyledSpan>
              <StyledSpan>{formatDate(currentTransaction?.dateDue)}</StyledSpan>
            </StyledSpanCtn>
          </DivCtn>
          <DivCtn>
            <StyledSpanCtn>
              <StyledSpanHead>Status</StyledSpanHead>
              <StyledSpanHead>Transaction Type</StyledSpanHead>
            </StyledSpanCtn>
            <StyledSpanCtn>
              <StyledSpan>
                <span style={{ display: "flex", gap: "0.5rem" }}>
                  {currentTransaction?.status}:
                  <StatusIcon status={currentTransaction?.status} />
                </span>
              </StyledSpan>
              <StyledSpan>
                {currentTransaction?.formData?.transactionType}
              </StyledSpan>
            </StyledSpanCtn>
          </DivCtn>
        </>
      ) : (
        <div> No Transaction Found</div>
      )}{" "}
    </div>
  );
};

export default TransactionCard;
