import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { updateTransactionStatus } from "../../../features/utilitySlice";
import { useAppDispatch } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";

const StyledCardOngoing = styled.div`
  height: 14rem;
  font-size: 1rem;
  font-weight: 400;
  width: 30rem;
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    width: 15rem;
    padding-bottom: 1rem;
  }
`;

const StyledCardOngoingTop = styled.div`
  display: flex;
  justify-content: space-between;
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

const StyledCardOngoingBtm = styled.div`
  height: 10rem;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 2px 2px rgba(0.1, 0.1, 0.1, 0.1);
  padding: 1rem 2rem 0 2rem;
  background-color: #fff;
  margin-top: 1rem;
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    padding-bottom: 1rem;
  }
`;

const StyledLine = styled.div`
  width: 25rem;
  height: 2px;
  background: #000000;
  opacity: 0.2;
  margin-bottom: 1rem;
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    width: 10rem;
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

  &:hover {
    color: ${(props) => (props.disabled ? "gray" : "#f26600")};
    background-color: ${(props) => (props.disabled ? "#d3d3d3" : "#fff")};
    border: ${(props) => (props.disabled ? "none" : "1px solid #f26600")};
  }
`;

const StyledCardTxt = styled.p`
  font-size: 0.7rem;
  font-weight: 400;
`;

const OngoingTransactions = ({ user, ongoingTransactions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const disabledButton = ["VERIFIED", "DISPATCHED", "RECEIVED"];

  // PENDING, DECLINED, REFUNDED, VERIFIED, DISPATCHED,  RECEIVED, COMPLETED transaction status

  const handleProcessTransaction = async () => {
    let newStatus;
    let errorMessage;

    if (user?.role === "seller") {
      if (currentTransaction?.status === "VERIFIED") {
        newStatus = "DISPATCHED";
      } else if (currentTransaction?.status !== "RECEIVED") {
        errorMessage = "Transaction has not been received by the customer";
      } else {
        newStatus = "COMPLETED";
      }
    }

    if (user?.role === "buyer") {
      if (currentTransaction?.status === "RECEIVED") {
        errorMessage = "Product has already been received by the seller.";
      } else if (currentTransaction?.status !== "DISPATCHED") {
        errorMessage = "Product has not been dispatched by the seller.";
      } else {
        newStatus = "RECEIVED";
      }
    }

    if (errorMessage) {
      return toast.error(errorMessage);
    }

    setLoading(true);

    try {
      const resp = await dispatch(
        updateTransactionStatus({
          transactionId: currentTransaction?._id,
          newStatus: newStatus,
        })
      );

      if (resp?.payload?.status === 200) {
        toast.success(resp?.payload?.message || "Successfully logged in");
        navigate("/dashboard");
      } else {
        toast.error(resp?.payload?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  const handleGetButtonTitle = () => {
    let title = "Mark Transaction as Received";

    if (user?.role === "seller") {
      title = "Mark Transaction as Dispatched";
    }

    if (
      user?.role === "seller" &&
      ["DISPATCHED", "RECEIVED", "COMPLETED"].includes(
        currentTransaction?.status
      )
    ) {
      title = "Mark Transaction as Completed";
    }

    return title;
  };

  return (
    <div
      style={{
        display: "flex",
        width: "468px",
        height: "245px",
        gap: "30px",
      }}
    >
      <StyledCardOngoing>
        <StyledCardOngoingTop>
          <StyledCardOngoingTopTxt>
            Ongoing Transactions:{" "}
            <span
              style={{
                color: "#f26600",
                fontSize: "1rem",
                marginLeft: "1rem",
              }}
            >
              {currentTransaction ? currentIndex + 1 : 0}
            </span>
          </StyledCardOngoingTopTxt>
          <div>
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
        {ongoingTransactions?.length || currentTransaction ? (
          <StyledCardOngoingBtm>
            <StyledCardTxt
              style={{
                opacity: "0.5",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span> ID: {currentTransaction?._id}</span>
              <button
                style={{
                  background: "#1ab21a",
                  border: "none",
                  color: "#ffffff",
                  borderRadius: "0.2rem",
                  fontSize: "0.6rem",
                }}
              >
                {currentTransaction?.status}
              </button>
            </StyledCardTxt>
            <StyledCardTxt>
              {currentTransaction?.formData?.productName}
            </StyledCardTxt>
            <StyledCardTxt>
              Counterparty: {currentTransaction?.formData?.counterpartyName}
            </StyledCardTxt>
            <StyledLine></StyledLine>
            <StyledDetailsBtn
              disabled={!disabledButton?.includes(currentTransaction?.status)}
              onClick={handleProcessTransaction}
              type="button"
            >
              {loading ? "Processing" : handleGetButtonTitle()}
            </StyledDetailsBtn>
          </StyledCardOngoingBtm>
        ) : (
          <div> No Transaction Found</div>
        )}
      </StyledCardOngoing>
    </div>
  );
};

export default OngoingTransactions;
