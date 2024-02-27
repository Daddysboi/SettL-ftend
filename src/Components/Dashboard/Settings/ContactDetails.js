import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { toast } from "react-toastify";

import AppInput from "../../ReUseableComponent/AppInput";
import ErrorRed from "../../ReUseableComponent/ErrorRed";
import { fileToDataUri } from "./ProfileSettings";
import { useFetchUserData } from "../../../Guard";
import { useAppDispatch } from "../../../redux/hooks";
import { useState } from "react";
import { updateUserContactDetails } from "../../../features/userSlice";

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

const AddContact = ({
  user,
  PropsContainer,
  Button,
  StyledForm,
  Title,
  FileInputContainer,
  StyledLabel,
  UploadButton,
  FaCloudUploadAlt,
}) => {
  const initialValues = {
    homeAddress: user?.contactDetails?.homeAddress || "",
    landmark: user?.contactDetails?.nearestLandmark || "",
    officeAddress: user?.contactDetails?.officeAddress || "",
    proofOfAddress: "",
    postalCode: user?.contactDetails?.postalCode || "",
  };

  const [loading, setLoading] = useState(false);
  const [imgPlaceholder, setImgPlaceholder] = useState(true);

  const dispatch = useAppDispatch();
  const fetchUserData = useFetchUserData();

  const onSubmit = async (values, { resetForm }) => {
    if (values.proofOfAddress.size > 500 * 1024) {
      toast.error("File size exceeds the limit of 500KB");
      return;
    }

    setLoading(true);
    const uri = await fileToDataUri(values?.proofOfAddress);
    dispatch(
      updateUserContactDetails({
        userId: user?._id,
        homeAddress: values?.homeAddress,
        nearestLandmark: values?.landmark,
        officeAddress: values?.officeAddress,
        postalCode: values?.postalCode,
        proofOfAddress: uri,
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
    homeAddress: Yup.string().required("Home Address is required"),
    landmark: Yup.string().required("Nearest landmark is required"),
    postalCode: Yup.string().required("Nearest postalCode is required"),
    officeAddress: Yup.string().required("Office Address is required"),
    proofOfAddress: Yup.mixed().required("Image is required"),
  });

  return (
    <PropsContainer>
      <Title>Add Contact</Title>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, setFieldValue }) => (
          <StyledForm>
            <div>
              <Field
                label="Home Address"
                placeholder="Enter your host address"
                type="text"
                id="homeAddress"
                name="homeAddress"
                value={values.homeAddress}
                onChange={handleChange}
                component={AppInput}
                width="20rem"
                labelColor="gray"
                height="2rem"
              />
              <ErrorMessage name="homeAddress" component={ErrorRed} />
            </div>

            <div>
              <Field
                label="Nearest Landmark"
                placeholder="Enter landmark near your location"
                type="text"
                id="landmark"
                name="landmark"
                value={values.landmark}
                onChange={handleChange}
                component={AppInput}
                width="20rem"
                labelColor="gray"
                height="2rem"
              />
              <ErrorMessage name="landmark" component={ErrorRed} />
            </div>

            <div>
              <Field
                label="Office Address"
                placeholder="Enter Office Address"
                type="text"
                id="officeAddress"
                name="officeAddress"
                value={values.officeAddress}
                onChange={handleChange}
                component={AppInput}
                width="20rem"
                labelColor="gray"
                height="2rem"
              />
              <ErrorMessage name="officeAddress" component={ErrorRed} />
            </div>

            <div>
              <Field
                label="Postal Code"
                placeholder="Enter your postal code"
                type="text"
                id="postalCode"
                name="postalCode"
                value={values.postalCode}
                onChange={handleChange}
                component={AppInput}
                width="20rem"
                labelColor="gray"
                height="2rem"
              />
              <ErrorMessage name="postalCode" component={ErrorRed} />
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
                  <StyledLabel htmlFor="proofOfAddress">
                    Proof of Address (Max 2MB)
                  </StyledLabel>
                  <div>
                    <UploadButton htmlFor="proofOfAddress">
                      <FaCloudUploadAlt />
                    </UploadButton>
                    <div
                      style={{
                        display: "none",
                      }}
                    >
                      <Field
                        type="file"
                        id="proofOfAddress"
                        name="proofOfAddress"
                        onChange={(event) => {
                          setFieldValue(
                            "proofOfAddress",
                            event?.currentTarget?.files[0]
                          );
                        }}
                        component={AppInput}
                        labelColor="gray"
                        accept="image/*"
                        border="none"
                      />
                    </div>
                  </div>
                  <ErrorMessage name="proofOfAddress" component={ErrorRed} />
                  <span
                    style={{
                      opacity: "0.5",
                      fontSize: "0.6rem",
                    }}
                  >
                    {values?.proofOfAddress && values?.proofOfAddress.name}
                  </span>
                </FileInputContainer>
              </div>
              {user?.contactDetails?.proofOfAddress &&
                !values?.proofOfAddress &&
                imgPlaceholder && (
                  <StylesImgViewer>
                    <StylesImg
                      src={user?.contactDetails?.proofOfAddress}
                      alt="head-shot"
                    />
                  </StylesImgViewer>
                )}
            </section>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Contact"}
            </Button>
          </StyledForm>
        )}
      </Formik>
    </PropsContainer>
  );
};

export default AddContact;
