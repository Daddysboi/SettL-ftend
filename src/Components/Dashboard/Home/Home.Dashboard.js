import { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import TransactionFormPopup from "./TransactionPopup.Home";

const StyledCardContainerTop = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    width: 5rem;
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
  }
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
  padding: 0.2rem 1.2rem;
  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    width: 5rem;
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
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
  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    margin-bottom: 2rem;
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
  }
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
  padding: 0.2rem;
`;

const StyledCardOngoing = styled.div`
  height: 14rem;
  font-size: 1rem;
  font-weight: 400;
  width: 30rem;
  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    width: 15rem;
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    width: 17rem;
  }
`;

const StyledCardOngoingTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledCardOngoingTopTxt = styled.h4`
  margin: 0 2rem 0 0;
`;

const StyledCardOngoingBtm = styled.div`
  height: 10rem;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 2px 2px rgba(0.1, 0.1, 0.1, 0.1);
  padding: 1rem 2rem 0 2rem;
  margin-top: 1rem;
`;

const StyledLine = styled.div`
  width: 25rem;
  height: 2px;
  background: #000000;
  opacity: 0.2;
  margin-bottom: 1rem;
  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    width: 12rem;
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    width: 14rem;
  }
`;

const StyledDetailsBtn = styled.button`
  background-color: #4db6ac;
  color: #ffffff;
  border-radius: 0.4rem;
  padding: 0.3rem 1rem;
  border: none;
`;

const StyledHeaderBtm = styled.h4`
  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    display: none;
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
  color: #4db6ac;

  &:hover {
    color: #02041d;
  }
  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    display: none;
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
  }
`;

const StyledCardContainerBtm = styled.div`
  height: 8rem;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 2px 2px rgba(0.1, 0.1, 0.1, 0.1);
  padding: 1rem 2rem 0 2rem;
  margin-top: 1rem;
  /* width: 50vw; */

  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    display: none;
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    height: 13rem;
  }
  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    height: 13rem;
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
  }

  // Extra large screens, TV
  @media only screen and (min-width: 1201px) {
    width: 43rem;
  }
`;

const StyledTh = styled.th`
  font-size: 0.7rem;
  text-align: left;
  font-weight: 400;
  padding-right: 2.2rem;
  padding-bottom: 0.5rem;
  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    padding-right: 2.2rem;
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    padding-right: 1rem;
  }
  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
  }

  // Extra large screens, TV
  @media only screen and (min-width: 1201px) {
  }
`;
const StyledTd = styled.td`
  font-size: 0.7rem;
  letter-spacing: -0.04rem;
  font-weight: 400;
  padding-right: 2.2rem;
  padding-bottom: 0.5rem;
`;

const Home = () => {
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [withdrawalCount, setWithdrawalCount] = useState(0);
  const [depositCount, setDepositCount] = useState(0);
  const [isTransactionFormOpen, setTransactionFormOpen] = useState(false);

  const handleCreateTransaction = () => {
    setTransactionFormOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        url = "";
        const { data } = await axios.get(url);

        setTotalTransactions(data.totalTransactions || 0);
        setWalletBalance(data.walletBalance || 0);
        setWithdrawalCount(data.withdrawalCount || 0);
        setDepositCount(data.depositCount || 0);
        setOngoingTransactions(data.ongoingTransactions || []);
        setRecentTransactions(data.recentTransactions || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <StyledCardContainerTop>
            <StyledCardPair>
              <StyledCard>
                <StyledCardTxt>Total Transactions</StyledCardTxt>
                <p>{totalTransactions}</p>
              </StyledCard>
              <StyledCard>
                <StyledCardTxt>Wallet Balance</StyledCardTxt>
                <p>NGN {walletBalance.toFixed(2)}</p>
              </StyledCard>
            </StyledCardPair>
            <StyledCardPair>
              <StyledCard>
                <StyledCardTxt>Withdrawal</StyledCardTxt>
                <p>{withdrawalCount}</p>
              </StyledCard>
              <StyledCard>
                <StyledCardTxt>Deposit</StyledCardTxt>
                <p>NGN {depositCount.toFixed(2)}</p>
              </StyledCard>
            </StyledCardPair>
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
            <StyledCardOngoing>
              <StyledCardOngoingTop>
                <StyledCardOngoingTopTxt>
                  Ongoing Transactions:{" "}
                  <span style={{ color: "#4db6ac", fontSize: "0.8rem" }}>
                    3
                  </span>
                </StyledCardOngoingTopTxt>
                <div>
                  <StyledFontAwesomeIcon
                    icon={faArrowCircleLeft}
                    onClick={() => {}}
                  />
                  <StyledFontAwesomeIcon
                    icon={faArrowCircleRight}
                    onClick={() => {}}
                  />
                </div>
              </StyledCardOngoingTop>
              <StyledCardOngoingBtm>
                <StyledCardTxt
                  style={{
                    opacity: "0.5",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span> ID: 2341</span>
                  <button
                    style={{
                      background: "#1ab21a",
                      border: "none",
                      color: "#ffffff",
                      borderRadius: "0.2rem",
                      fontSize: "0.6rem",
                    }}
                  >
                    Pending
                  </button>
                </StyledCardTxt>
                <StyledCardTxt>New pair of shoes</StyledCardTxt>
                <StyledCardTxt>Counterparty: Footwarefairy</StyledCardTxt>
                <StyledLine></StyledLine>
                <StyledDetailsBtn>View Details</StyledDetailsBtn>
              </StyledCardOngoingBtm>
            </StyledCardOngoing>
          </StyledCardContainerMid>
          <StyledHeaderBtm>Recent Transactions</StyledHeaderBtm>
          <StyledCardContainerBtm>
            <table style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{ backgroundColor: "#4db6ac", borderRadius: "0.5rem" }}
                >
                  <StyledTh>Transaction ID</StyledTh>
                  <StyledTh>Title</StyledTh>
                  <StyledTh>Date Created</StyledTh>
                  <StyledTh>Date Due</StyledTh>
                  <StyledTh>Amount</StyledTh>
                  <StyledTh>Status</StyledTh>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <StyledTd style={{ textAlign: "center" }}>2341</StyledTd>
                  <StyledTd>New pair of shoes</StyledTd>
                  <StyledTd style={{ textAlign: "right" }}>23/1/2024</StyledTd>
                  <StyledTd style={{ textAlign: "right" }}>8/2/2024</StyledTd>
                  <StyledTd style={{ textAlign: "right" }}>N40,000</StyledTd>
                  <StyledTd>pending</StyledTd>
                </tr>
                <tr>
                  <StyledTd style={{ textAlign: "center" }}>2342</StyledTd>
                  <StyledTd>LV Shirt</StyledTd>
                  <StyledTd style={{ textAlign: "right" }}>20/1/2024</StyledTd>
                  <StyledTd style={{ textAlign: "right" }}>6/1/2024</StyledTd>
                  <StyledTd style={{ textAlign: "right" }}>N16,000</StyledTd>
                  <StyledTd>pending</StyledTd>
                </tr>
                <tr>
                  <StyledTd style={{ textAlign: "center" }}>2343</StyledTd>
                  <StyledTd>Man. Utd track suit</StyledTd>
                  <StyledTd style={{ textAlign: "right" }}>10/1/2024</StyledTd>
                  <StyledTd style={{ textAlign: "right" }}>23/1/2024</StyledTd>
                  <StyledTd style={{ textAlign: "right" }}>N25,000</StyledTd>
                  <StyledTd>complete</StyledTd>
                </tr>
                <tr>
                  <StyledTd style={{ textAlign: "center" }}>2344</StyledTd>
                  <StyledTd>Torbo P cap</StyledTd>
                  <StyledTd style={{ textAlign: "right" }}>10/1/2024</StyledTd>
                  <StyledTd style={{ textAlign: "right" }}>8/1/2024</StyledTd>
                  <StyledTd style={{ textAlign: "right" }}>N2,500</StyledTd>
                  <StyledTd>complete</StyledTd>
                </tr>
              </tbody>
            </table>
          </StyledCardContainerBtm>{" "}
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
