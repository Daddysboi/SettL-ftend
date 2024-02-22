import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import AppInput from "../../ReUseableComponent/AppInput";
import ErrorRed from "../../ReUseableComponent/ErrorRed";
import AppSelectInput from "../../ReUseableComponent/AppSelectInput";

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

  const bankOptions = [
    { value: "access", label: "Access Bank" },
    { value: "zenith", label: "Zenith Bank" },
    { value: "gtb", label: "Guaranty Trust Bank (GTB)" },
    { value: "uba", label: "United Bank for Africa (UBA)" },
    { value: "firstbank", label: "First Bank of Nigeria" },
    { value: "fidelity", label: "Fidelity Bank" },
    { value: "union", label: "Union Bank of Nigeria" },
    { value: "stanbic", label: "Stanbic IBTC Bank" },
    { value: "ecobank", label: "Ecobank Nigeria" },
    { value: "fcmb", label: "First City Monument Bank (FCMB)" },
    { value: "keystone", label: "Keystone Bank" },
    { value: "wema", label: "Wema Bank" },
    { value: "heritage", label: "Heritage Bank" },
    { value: "sterling", label: "Sterling Bank" },
    { value: "jaiz", label: "Jaiz Bank" },
    { value: "standardchartered", label: "Standard Chartered Bank" },
    { value: "polaris", label: "Polaris Bank" },
    { value: "unity", label: "Unity Bank" },
    { value: "paystack", label: "Paystack" },
    { value: "flutterwave", label: "Flutterwave" },
    { value: "kuda", label: "Kuda Bank" },
    { value: "moniepoint", label: "Moniepoint" },
  ];

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

            <div>
              <Field
                label="Bank Name"
                name="bankName"
                component={AppSelectInput}
                width="100%"
                height="2rem"
                labelColor="gray"
                options={bankOptions}
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

            <div
              style={{
                display: "flex",
                flexDirection: "column",

                justifyContent: "space-between",
              }}
            >
              <Field
                label="Password"
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

            <Button type="submit">Validate & Save Changes</Button>
          </>
        </StyledForm>
      </Formik>
    </PropsContainer>
  );
};

export default AccountDetails;
