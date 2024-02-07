import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styled from "styled-components";

const StyledInputContainer = styled.div`
  position: relative;
  margin-bottom: 12px;
`;

const StyledLabel = styled.label`
  font-size: 0.65rem;
  letter-spacing: -0.01rem;
  position: relative;
`;

const StyledInput = styled.input`
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

const EyeIcon = styled.span`
  cursor: pointer;
  color: gray;
`;

const PasswordContainer = styled.div`
  position: relative;
`;

const StyledPasswordInput = styled.input`
  width: 100%;
  min-height: 42px;
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 0.3rem;
  border: 1px solid rgba(223, 140, 82, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
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
  line-height: 10px;
`;

const AppInput = ({
  type,
  name,
  value,
  placeholder,
  onChange,
  error,
  inputType,
  label,
  width,
  ...props
}) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevVisibility) => !prevVisibility);
  };

  if (inputType === "password") {
    return (
      <StyledInputContainer>
        <StyledLabel htmlFor="">{label}</StyledLabel>
        <PasswordContainer>
          <StyledPasswordInput
            type={passwordVisibility ? "text" : "password"}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
          />
          <EyeIcon
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              cursor: "pointer",
            }}
            onClick={togglePasswordVisibility}
          >
            {passwordVisibility ? <FaEye /> : <FaEyeSlash />}
          </EyeIcon>
        </PasswordContainer>
        {error && <ErrorContainer>{error}</ErrorContainer>}
      </StyledInputContainer>
    );
  }
  return (
    <StyledInputContainer>
      <StyledLabel htmlFor="">{label}</StyledLabel>
      <StyledInput
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        style={{ width }}
        {...props}
      />
      {error && <ErrorContainer>{error}</ErrorContainer>}
    </StyledInputContainer>
  );
};

export default AppInput;
