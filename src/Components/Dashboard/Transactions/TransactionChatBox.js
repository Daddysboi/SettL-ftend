import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
import {
  faChevronUp,
  faChevronDown,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

const ChatArea = styled.div`
  flex: 5;
`;
const MsgArea = styled.div`
  flex: 1;
  border: 1px solid rgba(0.1, 0.1, 0.1, 0.1);
  border-radius: 0 0 0.3rem 0.3rem;
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

const TermsTxt = styled.p`
  opacity: 0.6;
  margin: 1rem 0 0 0;
`;

const FontAwesome = styled(FontAwesomeIcon)`
  color: #4db6ac;
  &:hover {
    border: 1px solid #4db6ac;
    background: #4db6ac;
    color: white;
    border-radius: 0.5rem;
    padding: 0.1rem;
  }
`;
const TransactionChatBox = ({
  transactions,
  currentTransaction,
  user,
  StyledSpanCtn,
  StyledHeader,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [transactionData, setTransactionData] = useState(currentTransaction);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setTransactionData(currentTransaction);
  }, [currentTransaction]);
  return (
    <div>
      {transactions?.length ? (
        <div>
          <StyledSpanCtn>
            <StyledHeader>
              <span>Agreed Terms and Conditions</span>
            </StyledHeader>
            <span style={{ marginRight: "1rem" }}>
              <FontAwesome
                icon={isOpen ? faChevronUp : faChevronDown}
                onClick={toggleAccordion}
              />
            </span>
          </StyledSpanCtn>
          {isOpen && (
            <TermsTxt>
              {" "}
              {currentTransaction?.formData?.termsAndConditions}
            </TermsTxt>
          )}
          <StyledSpanCtn>
            {isOpen ? (
              ""
            ) : (
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
            )}
          </StyledSpanCtn>
        </div>
      ) : (
        <div> No Transaction Found</div>
      )}
    </div>
  );
};

export default TransactionChatBox;
