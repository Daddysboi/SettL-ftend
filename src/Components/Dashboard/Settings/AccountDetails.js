import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import AppInput from "../../ReUseableComponent/AppInput";
import ErrorRed from "../../ReUseableComponent/ErrorRed";

const AccountDetails = ({
  user,
  PropsContainer,
  Button,
  StyledForm,
  Title,
}) => {
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
    <PropsContainer>
      <Title>Set Up Your Account</Title>
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
                width="100%"
                component={AppInput}
                height="2rem"
                labelColor="gray"
              />
              <ErrorMessage name="bankName" component={ErrorRed} />
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
              <ErrorMessage name="accountNumber" component={ErrorRed} />
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
              <ErrorMessage name="accountName" component={ErrorRed} />
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
              <ErrorMessage name="password" component={ErrorRed} />
            </div>

            <Button type="submit">Save Changes</Button>
          </>
        </StyledForm>
      </Formik>
    </PropsContainer>
  );
};

export default AccountDetails;
