import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Switch from "react-switch";
import styled from "styled-components";

import AppInput from "../../ReUseableComponent/AppInput";
import ErrorRed from "../../ReUseableComponent/ErrorRed";

const ProfileSettings = ({
  user,
  PropsContainer,
  Button,
  StyledForm,
  Title,
  FileInputContainer,
  StyledLabel,
  StyledInput,
  UploadButton,
  FaCloudUploadAlt,
}) => {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const initialValues = {
    firstname: user?.firstName || "",
    lastname: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
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
    uploadPicture: Yup.mixed().test(
      "fileSize",
      "Picture must not be more than 2MB",
      function (value) {
        if (!value || !value.size) return true;
        return value.size <= 2 * 1024 * 1024;
      }
    ),
  });

  return (
    <PropsContainer>
      <Title>Your Profile</Title>
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
              <ErrorMessage name="firstname" component={ErrorRed} />

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
              <ErrorMessage name="firstname" component={ErrorRed} />
            </div>
            <div>
              <Field
                label="SettL Id"
                value={user?._id}
                type="text"
                id="id"
                name="id"
                component={AppInput}
                width="20rem"
                labelColor="gray"
                height="2rem"
                background="#DBDBDB"
                border="1px solid #DBDBDB"
                color="gray"
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
              <ErrorMessage name="email" component={ErrorRed} />
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
              <ErrorMessage name="phoneNumber" component={ErrorRed} />
            </div>

            <div>
              <Field name="uploadPicture">
                {({ form, field }) => (
                  <FileInputContainer>
                    <StyledLabel htmlFor="uploadPicture">
                      Upload Picture (Max 2MB)
                    </StyledLabel>
                    <div>
                      <UploadButton htmlFor="uploadPicture">
                        <FaCloudUploadAlt />
                      </UploadButton>
                      <StyledInput
                        id="uploadPicture"
                        name="uploadPicture"
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          form.setFieldValue(
                            "uploadPicture",
                            event.currentTarget.files[0]
                          );
                        }}
                      />
                    </div>
                    <ErrorMessage name="uploadPicture" component={ErrorRed} />
                    <span
                      style={{
                        opacity: "0.5",
                        fontSize: "0.6rem",
                      }}
                    >
                      {field.value && field.value.name}
                    </span>
                  </FileInputContainer>
                )}
              </Field>
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
    </PropsContainer>
  );
};

export default ProfileSettings;
