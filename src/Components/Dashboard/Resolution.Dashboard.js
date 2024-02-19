import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import styled from "styled-components";

import AppInput from "../ReUseableComponent/AppInput";
import { USER_ID } from "../../services/CONSTANTS";
import { useAppDispatch } from "../../redux/hooks";

import { disputeTransaction } from "../../features/utilitySlice";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StyledForm = styled.form``;

const StyledWrapper = styled.div`
  margin: 0 auto;
  @media (min-width: 480px) {
    max-width: 400px;
  }
`;

const StyledHeader = styled.h1`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #4db6ac;
`;

const StyledBtn = styled.button`
  background-color: #4db6ac;
  border: none;
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  color: #fff;
  margin-top: 0.8rem;
  cursor: pointer;
  &:hover {
    border: 1px solid #4db6ac;
    color: #4db6ac;
    background: transparent;
  }
`;

const disputeValidationSchema = Yup.object().shape({
  transactionId: Yup.string().required("Transaction ID is required"),
  reason: Yup.string().required("Reason for dispute is required"),
  description: Yup.string().required("Description is required"),
});

const Resolution = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const userId = localStorage.getItem(USER_ID);
  const disputeFormik = useFormik({
    initialValues: {
      transactionId: "",
      reason: "",
      description: "",
    },
    validationSchema: disputeValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      let request = {
        transactionId: values?.transactionId,
        reason: values?.reason,
        description: values?.description,
        userId: userId,
      };
      dispatch(disputeTransaction(request))
        .then((resp) => {
          if (resp?.payload?.status !== 201) {
            toast.error(resp?.payload?.message || "Something went wrong");
            setLoading(false);
            return;
          }
          toast.success(
            resp?.payload?.message || "Dispute submitted successfully"
          );
          resetForm();
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error?.message || "Something went wrong");
          setLoading(false);
        });
    },
  });

  return (
    <StyledContainer>
      <StyledHeader>Dispute Transaction</StyledHeader>
      <StyledForm onSubmit={disputeFormik.handleSubmit}>
        <StyledWrapper>
          <AppInput
            label="Transaction ID"
            type="text"
            name="transactionId"
            value={disputeFormik.values.transactionId}
            placeholder="Enter Transaction ID"
            onChange={disputeFormik.handleChange}
            error={
              disputeFormik.submitCount > 0 &&
              disputeFormik.errors.transactionId
            }
          />
          <AppInput
            label="Reason for Dispute"
            type="text"
            name="reason"
            value={disputeFormik.values.reason}
            placeholder="Enter Reason for Dispute"
            onChange={disputeFormik.handleChange}
            error={disputeFormik.submitCount > 0 && disputeFormik.errors.reason}
          />
          <AppInput
            label="Description"
            type="textarea"
            name="description"
            value={disputeFormik.values.description}
            placeholder="Enter Description"
            onChange={disputeFormik.handleChange}
            error={
              disputeFormik.submitCount > 0 && disputeFormik.errors.description
            }
          />
          <StyledBtn type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Dispute"}
          </StyledBtn>
        </StyledWrapper>
      </StyledForm>
    </StyledContainer>
  );
};

export default Resolution;
