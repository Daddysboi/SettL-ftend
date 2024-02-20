import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

import AppInput from "../../ReUseableComponent/AppInput";

const Container = styled.div`
  width: 30rem;
  margin-left: 4rem;
`;

const StyledForm = styled(Form)`
  width: 20rem;
`;

const Button = styled.button`
  margin-top: 2rem;
  background: #3bb75e;
  border: none;
  border-radius: 0.2rem;
  padding: 0.5rem;
  color: #fff;
`;
const AccountDetails = ({ user }) => {
  const initialValues = {
    bankName: "",
    accountName: "",
    accountNumber: "",
    password: "",
  };

  const onSubmit = (values) => {
    console.log("Form submitted with values:", values);
  };

  const validationSchema = Yup.object().shape({
    bankName: Yup.string().required("Bank name is required"),
    accountName: Yup.string().required("Account name is required"),
    accountNumber: Yup.string().required("Account number is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <Container>
      <div
        style={{
          color: "gray",
          marginBottom: "1.5rem",
        }}
      >
        Set Up Your Account
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <StyledForm>
          <>
            <div>
              <Field
                label="Bank Name"
                placeholder={user?.bankName || "Enter Bank Name"}
                type="bankName"
                id="bankName"
                name="bankName"
                width="95%"
                component={AppInput}
                height="2rem"
                labelColor="gray"
              />
              <ErrorMessage name="firstname" />
            </div>

            <div>
              <Field
                label="Account Number"
                placeholder={user?.accountNumber || "Enter Account Number"}
                type="accouuntNumber"
                id="accouuntNumber"
                name="accouuntNumber"
                component={AppInput}
                width="20rem"
                labelColor="gray"
                height="2rem"
              />
              <ErrorMessage name="email" />
            </div>

            <div>
              <Field
                label="Account Name"
                type="text"
                placeholder={user?.accountName || "Enter Account Name"}
                id="accountName"
                name="accountName"
                component={AppInput}
                width="20rem"
                labelColor="gray"
                height="2rem"
              />
              <ErrorMessage name="accountName" />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Field
                label="password"
                inputType="password"
                placeholder="Enter password"
                id="password"
                name="password"
                component={AppInput}
                width="20rem"
                labelColor="gray"
                height="2rem"
                eyeTop="6px"
              />
              <ErrorMessage name="password" />
            </div>

            <Button type="submit">Save Changes</Button>
          </>
        </StyledForm>
      </Formik>
    </Container>
  );
};

export default AccountDetails;
