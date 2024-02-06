import React from "react";
import { styled } from "styled-components";

const StyledSelectContainer = styled.div`
  position: relative;
  margin-bottom: 12px;
`;

const StyledLabel = styled.label`
  font-size: 0.65rem;
  letter-spacing: -0.01rem;
`;

const StyledSelect = styled.select`
  width: 100%;
  min-height: 42px;
  padding: 0.5rem;
  box-sizing: border-box;
  display: block;
  border-radius: 0.3rem;
  border: 1px solid rgba(223, 140, 82, 0.3);
  outline: none;
  &:focus {
    border: 1px solid rgb(194, 194, 194);
  }
`;

const ErrorContainer = styled.div`
  width: 100%;
  position: absolute;
  color: #ff5959;
  font-size: 10px;
  font-weight: 400;
`;

const AppSelectInput = ({ label, value, onChange, error, options }) => {
  return (
    <StyledSelectContainer>
      <StyledLabel htmlFor="role">{label}</StyledLabel>
      <StyledSelect name="role" value={value} onChange={onChange}>
        <option value="select" disabled>
          Select...
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
      {error && <ErrorContainer>{error}</ErrorContainer>}
    </StyledSelectContainer>
  );
};

export default AppSelectInput;
