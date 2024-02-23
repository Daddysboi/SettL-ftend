import { useState, useMemo } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";

import TransactionFormPopup from "./TransactionPopup.Home";
import OngoingTransactions from "./OngoingTransactions";
import RecentTransactions from "./RecentTransactions";

const StyledCardContainerTop = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const StyledCardPair = styled.div`
  display: flex;
  gap: 1rem;

  @media only screen and (min-width: 320px) and (max-width: 480px) {
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
  }
`;

const StyledCard = styled.div`
  border-radius: 5px;
  box-shadow: 2px 2px 2px 2px rgba(0.1, 0.1, 0.1, 0.1);
  width: 8.7rem;
  height: 5rem;
  background-color: #fff;
  padding: 0.2rem 1.2rem;
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    width: 5rem;
    padding-bottom: 0.5rem;
  }
`;

const StyledCardTxt = styled.p`
  font-size: 0.7rem;
  font-weight: 400;
`;
const StyledCardContainerMid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
`;

const StyledWalletCard = styled.div`
  height: 14rem;
  background-color: #4db6ac;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 400;
  width: 14rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledWalletCardTxt = styled.p`
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: -0.05rem;
  color: #ffffff;
`;

const StyledBtnCreate = styled.button`
  border: none;
  background-color: #ffffff;
  border-radius: 0.2rem;
  width: 5rem;
  color: #4db6ac;
  margin: 0.5rem;
  border: 1px solid #4db6ac;
  padding: 0.2rem;
  &:hover {
    background-color: #4db6ac;
    border: 1px solid #fff;
    color: #fff;
    box-shadow: 2px 2px 2px 2px rgba(0.1, 0.1, 0.1, 0.1);
  }
`;

const Home = ({ user, transactions, handleNext, handlePrevious }) => {
  const [withdrawalCount, setWithdrawalCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [isTransactionFormOpen, setTransactionFormOpen] = useState(false);

  const filterTransactions = (trnx) => {
    const excludedStatuses = ["DECLINED", "REFUNDED", "APPROVED"];
    const filteredTransactions = trnx.filter((transaction) => {
      return !excludedStatuses.includes(transaction.status);
    });

    return filteredTransactions;
  };

  const ongoingTransactions = useMemo(
    () => filterTransactions(transactions),
    [transactions]
  );

  const handleCreateTransaction = () => {
    setTransactionFormOpen(false);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <StyledCardContainerTop>
            <StyledCardPair>
              <StyledCard>
                <StyledCardTxt>Total Transactions</StyledCardTxt>
                <p>{transactions?.length || 0}</p>
              </StyledCard>
              {user?.role === "seller" ? (
                <StyledCard>
                  <StyledCardTxt>Wallet Balance</StyledCardTxt>
                  <p>NGN {user?.walletDetails?.toFixed(2) || 0}</p>
                </StyledCard>
              ) : (
                ""
              )}
            </StyledCardPair>

            {user?.role === "seller" ? (
              <StyledCardPair>
                <StyledCard>
                  <StyledCardTxt>No of Withdrawals</StyledCardTxt>
                  <p>{withdrawalCount}</p>
                </StyledCard>
                <StyledCard>
                  <StyledCardTxt>Revenue</StyledCardTxt>
                  <p>NGN {user?.walletDetails?.toFixed(2) || 0}</p>
                </StyledCard>
              </StyledCardPair>
            ) : (
              ""
            )}
          </StyledCardContainerTop>
          <StyledCardContainerMid>
            <StyledWalletCard>
              <StyledWalletCardTxt>Create New Transaction</StyledWalletCardTxt>
              <FontAwesomeIcon
                icon={faWallet}
                style={{ color: "white", fontSize: "8rem" }}
              />
              <StyledBtnCreate onClick={(e) => setTransactionFormOpen(true)}>
                Create
              </StyledBtnCreate>
            </StyledWalletCard>
            <OngoingTransactions
              user={user}
              ongoingTransactions={ongoingTransactions}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
            />
          </StyledCardContainerMid>

          <RecentTransactions user={user} transactions={transactions} />
        </div>
        <div>
          {isTransactionFormOpen && (
            <TransactionFormPopup
              isOpen={isTransactionFormOpen}
              onRequestClose={() => setTransactionFormOpen(false)}
              onCreateTransaction={handleCreateTransaction}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
