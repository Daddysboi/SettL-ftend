import { useContext } from "react";
import styled from "styled-components";
import EventTimeline from "./EventTimeLine";

import { userContext } from "../../../App";

const StyledSpanHead = styled.span`
  font-size: 0.7rem;
  opacity: 0.5;
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
const StyledBtnCtn = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 15rem;
`;

const StyleCtnTop = styled.div`
  display: flex;
`;

const StyledBtnTop = styled.button`
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

const StyledDetailsBtn = styled.button.attrs((props) => ({
  disabled: props.disabled,
}))`
  background-color: ${(props) => (props.disabled ? "#d3d3d3" : "#f26600")};
  border: none;
  outline: none;
  color: ${(props) => (props.disabled ? "gray" : "white")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  padding: 0.5rem 1rem;
  border-radius: 0.4rem;
  width: 100%;
  margin-bottom: 0.5rem;

  &:hover {
    color: ${(props) => (props.disabled ? "gray" : "#f26600")};
    background-color: ${(props) => (props.disabled ? "#d3d3d3" : "#fff")};
    border: ${(props) => (props.disabled ? "none" : "1px solid #f26600")};
  }
`;

const TransactionProgress = ({
  transactions,
  currentTransaction,
  user,
  StyledHeader,
  StyledSpanCtn,
  disabledButton,
  handleProcessTransaction,
  navigateTo,
  currentIndex,
}) => {
  // const [setTransactionData] = useState(currentTransaction);
  const { setcurrentTransactionId } = useContext(userContext);

  const handleClick = (action) => {
    setcurrentTransactionId(currentTransaction?._id);
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
  // useEffect(() => {
  //   setTransactionData(currentTransaction);
  // }, [currentTransaction]);
  return (
    <div>
      <StyledSpanCtn>
        <StyledHeader style={{ marginBottom: "1rem" }}>
          Transaction Progress
        </StyledHeader>
      </StyledSpanCtn>
      <StyledSpanHead>
        Update transaction progress to keep other party updates
      </StyledSpanHead>
      {transactions?.length ? (
        <div>
          <StyledTranStatusCtn>
            <StyledTranStatus style={{ flex: "5" }}>
              <EventTimeline
                orderAccepted={currentTransaction?.status === "VERIFIED"}
                orderDispatched={currentTransaction?.status === "DISPATCHED"}
                orderCompleted={currentTransaction?.status === "COMPLETED"}
              />
            </StyledTranStatus>
          </StyledTranStatusCtn>
          <StyledBtnCtn style={{ display: "block" }}>
            <StyleCtnTop>
              <StyledBtnTop
                onClick={() => handleClick("resolution")}
                style={{ marginRight: "1rem" }}
              >
                Dispute
              </StyledBtnTop>{" "}
              <StyledBtnTop onClick={() => handleClick("tracker")}>
                Track Order
              </StyledBtnTop>
            </StyleCtnTop>
            <StyledDetailsBtn
              disabled={!disabledButton?.includes(currentTransaction?.status)}
              onClick={handleProcessTransaction}
              type="button"
            >
              {user?.role === "buyer"
                ? "Mark Transaction as Received"
                : "Mark Transaction as Completed"}
            </StyledDetailsBtn>
          </StyledBtnCtn>
        </div>
      ) : (
        <div> No Transaction Found</div>
      )}
    </div>
  );
};

export default TransactionProgress;
