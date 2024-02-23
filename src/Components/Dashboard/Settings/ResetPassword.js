import { Formik, Field, ErrorMessage } from "formik";

import { useAppDispatch } from "../../../redux/hooks";

import AppInput from "../../ReUseableComponent/AppInput";
import ErrorRed from "../../ReUseableComponent/ErrorRed";
import { resetPasswordValidationSchema } from "../../../Pages/ResetPassword";

const ResetPassword = ({ user, PropsContainer, Button, StyledForm, Title }) => {
  const dispatch = useAppDispatch();

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const onSubmit = (values) => {
    console.log("Form submitted with values:", values);
    setLoading(true);
    let request = {
      userId: user?._id,
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };

    dispatch(updatePassword(request))
      .then((resp) => {
        if (resp?.payload?.status !== 201) {
          toast.error(resp?.payload?.message || "Something went wrong");
          setLoading(false);
          return;
        }
        toast.success(
          resp?.payload?.message || "Password  updated Successfully"
        );
        resetForm();
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error?.message || "Something went wrong");
        setLoading(false);
      });
  };

  return (
    <PropsContainer>
      <Title>Change Password</Title>
      <Formik
        initialValues={initialValues}
        validationSchema={resetPasswordValidationSchema}
        onSubmit={onSubmit}
      >
        <StyledForm>
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <Field
                label="Enter Old Password"
                inputType="password"
                placeholder="Enter Old Password"
                id="password"
                name="oldPassword"
                component={AppInput}
                width="20rem"
                labelColor="gray"
                height="2rem"
                eyeTop="6px"
              />
              <ErrorMessage name="oldPassword" component={ErrorRed} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Field
                label="Enter New Password"
                inputType="password"
                placeholder="Enter New Password"
                id="password"
                name="newPassword"
                component={AppInput}
                width="20rem"
                labelColor="gray"
                height="2rem"
                eyeTop="6px"
              />
              <ErrorMessage name="newPassword" component={ErrorRed} />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Field
                label="Confirm New Password"
                inputType="password"
                placeholder="Confirm New Password"
                id="password"
                name="confirmPassword"
                component={AppInput}
                width="20rem"
                labelColor="gray"
                height="2rem"
                eyeTop="6px"
              />
              <ErrorMessage name="confirmPassword" component={ErrorRed} />
            </div>

            <Button type="submit">Save Changes</Button>
          </>
        </StyledForm>
      </Formik>
    </PropsContainer>
  );
};

export default ResetPassword;
