import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Switch from "react-switch";
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
const ProfileSettings = ({ user }) => {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const initialValues = {
    firstname: user?.firstName || "",
    lastname: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    password: user?.password || "",
    twoFactorAuth: false,
  };

  const onSubmit = (values) => {
    console.log("Form submitted with values:", values);
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string(),
    lastname: Yup.string(),
    email: Yup.string().email("Invalid email address"),
    phoneNumber: Yup.string().required("Phone number is required"),
    password: Yup.string(),
  });

  return (
    <Container>
      <div
        style={{
          color: "gray",
          marginBottom: "1.5rem",
        }}
      >
        Your Profile
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <StyledForm>
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Field
                label="First Name"
                placeholder={user?.firstName}
                type="text"
                id="firstname"
                name="firstname"
                width="95%"
                component={AppInput}
                height="2rem"
                labelColor="gray"
              />
              <ErrorMessage name="firstname" />

              <Field
                label="Last Name"
                type="text"
                placeholder={user?.lastName}
                id="lastname"
                name="lastname"
                component={AppInput}
                width="100%"
                labelColor="gray"
                height="2rem"
              />
              <ErrorMessage name="firstname" />
            </div>

            <div>
              <Field
                label="SettL Id"
                value={user?._Id}
                type="text"
                id="id"
                name="id"
                component={AppInput}
                width="20rem"
                labelColor="gray"
                height="2rem"
                backgroundColor="#f2f2f2"
                border="none"
              />
            </div>

            <div>
              <Field
                label="E-Mail"
                placeholder={user?.email}
                type="email"
                id="email"
                name="email"
                component={AppInput}
                width="20rem"
                labelColor="gray"
                height="2rem"
              />
              <ErrorMessage name="email" />
            </div>

            <div>
              <Field
                label="Phone Number"
                type="text"
                placeholder={user?.phoneNumber || "Enter Phone Number"}
                id="phoneNumber"
                name="phoneNumber"
                component={AppInput}
                width="20rem"
                labelColor="gray"
                height="2rem"
              />
              <ErrorMessage name="phoneNumber" />
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
                placeholder="••••••••••"
                id="password"
                name="password"
                component={AppInput}
                width="20rem"
                labelColor="gray"
                height="2rem"
                eyeTop="6px"
                showEyeIcon={false}
              />
              <ErrorMessage name="password" />
            </div>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                color: "gray",
                alignItems: "flex-end",
              }}
            >
              <label
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "-0.01rem",
                  display: "block",
                  marginTop: "1rem",
                }}
                htmlFor="twoFactorAuth"
              >
                Two-factor Auth
              </label>
              <Switch
                id="twoFactorAuth"
                className="toggle-switch"
                checked={twoFactorAuth}
                onChange={(checked) => setTwoFactorAuth(checked)}
                onColor="#3BB75E"
                offColor="#ccc"
                uncheckedIcon={false}
                checkedIcon={false}
                height={20}
                width={35}
                // handleDiameter={10}
              />
              {twoFactorAuth && <span> Enabled</span>}
            </div>

            <Button type="submit">Save Changes</Button>
          </>
        </StyledForm>
      </Formik>
    </Container>
  );
};

export default ProfileSettings;
