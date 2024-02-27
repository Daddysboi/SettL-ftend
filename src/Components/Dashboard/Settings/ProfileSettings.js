import { useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import styled from "styled-components";
import * as Yup from "yup";
import { toast } from "react-toastify";
import AppInput from "../../ReUseableComponent/AppInput";
import ErrorRed from "../../ReUseableComponent/ErrorRed";
import { updateUserProfile } from "../../../features/userSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { useFetchUserData } from "../../../Guard";

const StylesImgViewer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid black;
`;

const StylesImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

export const fileToDataUri = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
};

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
  const initialValues = {
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phoneNumber: user.phoneNumber || "",
    uploadPicture: "",
  };
  const [loading, setLoading] = useState(false);
  const [imgPlaceholder, setImgPlaceholder] = useState(true);

  const dispatch = useAppDispatch();
  const fetchUserData = useFetchUserData();

  const onSubmit = async (values, { resetForm }) => {
    if (values.uploadPicture.size > 500 * 1024) {
      toast.error("File size exceeds the limit of 500KB");
      return;
    }

    const profilePictureUri = await fileToDataUri(values.uploadPicture);

    setLoading(true);
    dispatch(
      updateUserProfile({
        userId: user?._id,
        firstName: values?.firstName,
        lastName: values?.lastName,
        phoneNumber: values?.phoneNumber,
        profilePicture: profilePictureUri,
      })
    )
      .then((resp) => {
        if (resp?.payload?.status !== 200) {
          toast.error(resp?.payload?.message || "Something went wrong");
          setLoading(false);
          return;
        }
        toast.success(resp?.payload?.message || "Successfully logged in");
        resetForm();
        fetchUserData();
        setImgPlaceholder(true);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error?.message || "Something went wrong");
        setLoading(false);
      });
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^\d{11}$/, "Phone number must be exactly 11 digits"),
    uploadPicture: Yup.mixed().required("Required"), // Allow any file type
  });

  return (
    <PropsContainer>
      <Title>Your Profile</Title>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, setFieldValue }) => (
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
                  placeholder="Enter your first name"
                  type="text"
                  id="firstName"
                  name="firstName"
                  width="95%"
                  value={values.firstName}
                  onChange={handleChange}
                  component={AppInput}
                  height="2rem"
                  labelColor="gray"
                />
                <ErrorMessage name="firstName" component={ErrorRed} />

                <Field
                  label="Last Name"
                  type="text"
                  placeholder="Enter your last name"
                  id="lastName"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  component={AppInput}
                  width="100%"
                  labelColor="gray"
                  height="2rem"
                />
                <ErrorMessage name="lastName" component={ErrorRed} />
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
                  disabled
                />
              </div>

              <div>
                <Field
                  label="E-Mail"
                  placeholder=""
                  value={user?.email}
                  type="email"
                  id="email"
                  name="email"
                  component={AppInput}
                  width="20rem"
                  labelColor="gray"
                  height="2rem"
                  disabled
                  color="gray"
                  background="#DBDBDB"
                  border="1px solid #DBDBDB"
                />
                <ErrorMessage name="email" component={ErrorRed} />
              </div>

              <div>
                <Field
                  label="Phone Number"
                  placeholder="Enter Phone Number"
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber" // Ensure this matches the key in initialValues
                  value={values.phoneNumber} // Set the value directly
                  onChange={handleChange}
                  component={AppInput}
                  width="20rem"
                  labelColor="gray"
                  height="2rem"
                />
                <ErrorMessage name="phoneNumber" component={ErrorRed} />
              </div>

              <section
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "30px",
                }}
              >
                <div onClick={() => setImgPlaceholder(false)}>
                  <FileInputContainer>
                    <StyledLabel htmlFor="uploadPicture">
                      Upload Picture
                    </StyledLabel>
                    <div>
                      <UploadButton htmlFor="uploadPicture">
                        <FaCloudUploadAlt />
                      </UploadButton>
                      <div
                        style={{
                          display: "none",
                        }}
                      >
                        <Field
                          type="file"
                          id="uploadPicture"
                          name="uploadPicture"
                          onChange={(event) => {
                            setFieldValue(
                              "uploadPicture",
                              event.currentTarget.files[0]
                            );
                          }}
                          component={AppInput}
                          labelColor="gray"
                          accept="image/*"
                          border="none"
                        />
                      </div>
                    </div>
                    <ErrorMessage name="uploadPicture" component={ErrorRed} />
                    <span
                      style={{
                        opacity: "0.5",
                        fontSize: "0.6rem",
                      }}
                    >
                      {values?.uploadPicture && values?.uploadPicture.name}
                    </span>
                  </FileInputContainer>
                </div>

                {user?.profilePicture &&
                  !values?.uploadPicture &&
                  imgPlaceholder && (
                    <StylesImgViewer>
                      <StylesImg src={user?.profilePicture} alt="head-shot" />
                    </StylesImgViewer>
                  )}
              </section>
              <Button disabled={loading} type="submit">
                {loading ? "Updating..." : "Save Changes"}
              </Button>
            </>
          </StyledForm>
        )}
      </Formik>
    </PropsContainer>
  );
};

export default ProfileSettings;
