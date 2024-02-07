import React from "react";
import OtpInput from "react-otp-input";

import { styled } from "styled-components";

const ErrorContainer = styled.div`
  width: 100%;
  position: absolute;
  color: #ff5959;
  font-size: 10px;
  font-weight: 400;
  line-height: 10px;
`;

const AppOtpInput = ({ value, onChange, name }) => {
  return (
    <>
      <OtpInput
        name={name}
        value={value}
        onChange={onChange}
        numInputs={4}
        separator={<span>-</span>}
        isInputNum={true}
        shouldAutoFocus={true}
        containerStyle={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
        }}
        inputStyle={{
          width: "4rem",
          height: "4rem",
          fontSize: "3rem",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
        isInputSecure={true}
        renderSeparator={(props) => <span {...props}> </span>}
        renderInput={(props) => <input {...props} />}
      />
    </>
  );
};

export default AppOtpInput;
