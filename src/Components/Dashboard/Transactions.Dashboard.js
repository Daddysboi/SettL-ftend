import { useState } from "react";
import styled from "styled-components";
import img from "../../assets/images/photo.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import {
  faTelegram,
  faTelegramPlane,
} from "@fortawesome/free-brands-svg-icons";

import EventTimeline from "../ReUseableComponent/EventTimeLine";

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

const ChatBox = styled.div`
  margin-top: 1rem;
  height: 9rem;
  background-color: #f8f7f7;
  width: 20rem;
  box-shadow: 0 0 2px 2px rgba(0.1, 0.1, 0.1, 0.1);
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const ChatArea = styled.div`
  flex: 5;
`;
const MsgArea = styled.div`
  flex: 1;
  border: 1px solid rgba(0.1, 0.1, 0.1, 0.1);
  border-radius: 0 0 0.3rem 0.3rem;
`;

const StyledTranStatusCtn = styled.span`
  display: flex;
  gap: 3rem;
  margin-top: 1rem;
`;
const StyledTranStatus = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledBtnTop = styled.button`
  background-color: #f26600;
  color: #ffffff;
  border-radius: 0.4rem;
  padding: 0.5rem 1rem;
  border: none;
  border: 1px solid #f26600;
  width: 14rem;
  margin-bottom: 0.5rem;
  &:hover {
    border: 1px solid #f26600;
    color: #f26600;
    background-color: #fff;
  }
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    font-size: 0.8rem;
    width: 11rem;

    padding: 0.5rem 0.3rem;
  }
`;

const StyledBtn = styled.button`
  border: 1px solid #f26600;
  background-color: #fff;
  color: #f26600;
  border-radius: 0.4rem;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  width: 7rem;
  &:hover {
    background-color: #f26600;
    border: 1px solid #f26600;
    color: #ffffff;
  }
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    font-size: 0.8rem;
    width: 5rem;
    padding: 0.5rem 0.3rem;
  }
`;
const Transactions = ({ navigateTo }) => {
  const [state, setState] = useState("");
  const handleClick = (action) => {
    switch (action) {
      case "resolution":
        navigateTo("resolution");
        break;
      case "tracker":
        navigateTo("tracker");
        break;
      default:
        break;
    }
  };
  return (
    <div style={{ width: "100vw", height: "100vh", background: "f8f7f7" }}>
      <StyledContainer>
        <StyledLeft>
          <StyledLeftTop>
            <div>
              <StyledSpanCtn>
                <StyledHeader>Red Nike Shoes</StyledHeader>
              </StyledSpanCtn>
            </div>
            <div>
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
                    <span>Footwarefairy</span>
                    <span>08031574374</span>
                  </span>
                </StyledSpan>
                <StyledSpan>NGN5000</StyledSpan>
              </StyledSpanCtn>
            </div>
            <div>
              <StyledSpanCtn>
                <StyledSpanHead>Date Created</StyledSpanHead>
                <StyledSpanHead>Date Due</StyledSpanHead>
              </StyledSpanCtn>
              <StyledSpanCtn>
                <StyledSpan>23/1/2024</StyledSpan>
                <StyledSpan>28/1/2024</StyledSpan>
              </StyledSpanCtn>
            </div>
            <div>
              <StyledSpanCtn>
                <StyledSpanHead>Status</StyledSpanHead>
                <StyledSpanHead>Transaction Type</StyledSpanHead>
              </StyledSpanCtn>
              <StyledSpanCtn>
                <StyledSpan>Ongoing</StyledSpan>
                <StyledSpan>Product</StyledSpan>
              </StyledSpanCtn>
            </div>
          </StyledLeftTop>
          <StyledLeftBtm>
            <div>
              <StyledSpanCtn>
                <StyledHeader>
                  <span>Agreed Terms/Conditions</span>
                </StyledHeader>
                <span style={{ marginRight: "1rem" }}>
                  <FontAwesomeIcon icon={faChevronDown} />
                </span>
              </StyledSpanCtn>{" "}
              <StyledSpanCtn>
                <ChatBox>
                  <ChatArea></ChatArea>
                  <MsgArea>
                    <StyledSpanCtn style={{ padding: "0 1rem" }}>
                      <span style={{ opacity: "0.5" }}>Write Message</span>
                      <span>
                        <FontAwesomeIcon
                          style={{ marginRight: "0.5rem" }}
                          icon={faPlusCircle}
                        />
                        <FontAwesomeIcon icon={faTelegram} />
                      </span>
                    </StyledSpanCtn>
                  </MsgArea>
                </ChatBox>
              </StyledSpanCtn>
            </div>
          </StyledLeftBtm>
        </StyledLeft>
        <StyledRight>
          <StyledSpanCtn>
            <StyledHeader style={{ marginBottom: "1rem" }}>
              Transaction Progress
            </StyledHeader>
          </StyledSpanCtn>
          <StyledSpanHead>
            Update transaction progress to keep other party updates
          </StyledSpanHead>
          <StyledTranStatusCtn>
            <StyledTranStatus style={{ flex: "5" }}>
              <EventTimeline
                orderAccepted={true}
                orderDispatched={true}
                orderCompleted={true}
              />
            </StyledTranStatus>
          </StyledTranStatusCtn>
          <StyledSpanCtn style={{ display: "block" }}>
            <div>
              <StyledBtn
                onClick={() => handleClick("resolution")}
                style={{ marginRight: "1rem" }}
              >
                Dispute
              </StyledBtn>{" "}
              <StyledBtn onClick={() => handleClick("tracker")}>
                Track Order
              </StyledBtn>
            </div>
            <StyledBtnTop>Mark Transaction as Complete</StyledBtnTop>
          </StyledSpanCtn>
        </StyledRight>
      </StyledContainer>
    </div>
  );
};

export default Transactions;
