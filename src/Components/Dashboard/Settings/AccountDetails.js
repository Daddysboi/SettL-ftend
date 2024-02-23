import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import AppInput from "../../ReUseableComponent/AppInput";
import ErrorRed from "../../ReUseableComponent/ErrorRed";
import AppSelectInput from "../../ReUseableComponent/AppSelectInput";
import { useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { useFetchUserData } from "../../../Guard";
import { updateUserBankDetails } from "../../../features/userSlice";

const AccountDetails = ({
  user,
  PropsContainer,
  Button,
  StyledForm,
  Title,
}) => {
  const initialValues = {
    bankName: user?.accountDetails?.bankName || "",
    accountName: user?.accountDetails?.accountName || "",
    accountNumber: user?.accountDetails?.accountNumber || "",
    password: "",
  };

  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const fetchUserData = useFetchUserData();

  const onSubmit = (values, { resetForm }) => {
    setLoading(true);
    dispatch(
      updateUserBankDetails({
        userId: user?._id,
        accountName: values?.accountName,
        bankName: values?.bankName,
        accountNumber: values?.accountNumber,
        password: values?.password,
      })
    )
      .then((resp) => {
        if (resp?.payload?.status !== 200) {
          toast.error(resp?.payload?.message || "Something went wrong");
          setLoading(false);
          return;
        }
        toast.success(resp?.payload?.message || "Successfully logged in");
        resetForm({
          ...initialValues, // Reset other form fields if needed
          password: "", // Reset password field to empty string
        });
        fetchUserData();
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error?.message || "Something went wrong");
        setLoading(false);
      });
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
        {({ values, handleChange, setFieldValue }) => (
          <StyledForm>
            <>
              <div>
                <Field
                  label="Account Name"
                  type="text"
                  placeholder="Enter Account Name"
                  id="accountName"
                  name="accountName"
                  value={values.accountName}
                  onChange={handleChange}
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
                  value={values.bankName}
                  onChange={(e) => setFieldValue("bankName", e.target.value)}
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
                  placeholder="Enter Account Number"
                  type="accountNumber"
                  id="accountNumber"
                  name="accountNumber"
                  value={values.accountNumber}
                  onChange={handleChange}
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
                  id="password" // Added id attribute
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  component={AppInput}
                  width="20rem"
                  labelColor="gray"
                  height="2rem"
                  eyeTop="6px"
                />
                <ErrorMessage name="password" component={ErrorRed} />
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Updating" : "Validate & Save Changes"}
              </Button>
            </>
          </StyledForm>
        )}
      </Formik>
    </PropsContainer>
  );
};

export default AccountDetails;
