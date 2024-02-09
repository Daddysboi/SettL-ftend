import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { TailSpin as Loader } from "react-loader-spinner";
import styled from "styled-components";
import { toast } from "react-toastify";

import { useAppDispatch } from "../redux/hooks";
import { verifyTransaction } from "../features/transactionSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
`;

const StyledBtn = styled.button`
  padding: 0.6rem 1rem;
  box-sizing: border-box;
  display: block;
  max-width: 400px;
  border: none;
  border-radius: 0.2rem;
  background: linear-gradient(to right, #ff4500, #ff8c00, #f26600);
  color: #ffff;
  margin: 1rem 0 0 0;
  &:hover {
    background: #f26600;
  }
`;

const ConfirmTransaction = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const action = params.get("action");
  const transactionId = params.get("transactionId");
  const dispatch = useAppDispatch();
  const [processingTransaction, setProcessingTransaction] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleAcceptOrDeclineTransaction = async () => {
    // Perform decision based on the action parameter
    let request = {
      transactionId: transactionId,
      action: action,
    };

    try {
      const resp = await dispatch(verifyTransaction(request));

      if (resp?.payload?.status !== 200) {
        toast.error(resp?.payload?.message || "Something went wrong here");
      } else {
        toast.success(
          resp?.payload?.message || "Transaction handled Successfully"
        );

        if (action === "decline") {
          navigate("/");
        } else {
          navigate("/login");
        }
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong holla");
    } finally {
      setLoading(false);
    }
  };

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      handleAcceptOrDeclineTransaction();
    }
  }, []);

  return (
    <Container>
      <h4>Processing your decision </h4>
      {loading ? (
        <Loader
          type="TailSpin"
          color="#ff4500"
          height={60}
          width={60}
          style={{ margin: "auto" }}
        />
      ) : (
        <h4>Thank You For Choosing SettL</h4>
      )}
    </Container>
  );
};

export default ConfirmTransaction;
