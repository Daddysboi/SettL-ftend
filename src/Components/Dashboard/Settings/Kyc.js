import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styled from "styled-components";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { faListSquares } from "@fortawesome/free-solid-svg-icons";

import AppInput from "../../ReUseableComponent/AppInput";
import ErrorRed from "../../ReUseableComponent/ErrorRed";
import WebcamCapture from "./WebcamCapture";
import { fileToDataUri } from "./ProfileSettings";
import { useAppDispatch } from "../../../redux/hooks";
import { useFetchUserData } from "../../../Guard";
import { updateUserKycDetails } from "../../../features/userSlice";

const KYCContainer = styled.div`
  width: 30rem;
  margin: 0 auto;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

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

const KYC = ({
  user,
  Button,
  Title,
  FileInputContainer,
  StyledLabel,
  StyledInput,
  UploadButton,
  FaCloudUploadAlt,
}) => {
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const fetchUserData = useFetchUserData();
  const [imgPlaceholder, setImgPlaceholder] = useState(true);
  const [idPlaceholder, setIdPlaceholder] = useState(true);

  const initialValues = {
    idType: user?.identificationDetails?.idType || "",
    idNumber: user?.identificationDetails?.idNumber || "",
    fullName: user?.nextOfKin?.fullName || "",
    relationship: user?.nextOfKin?.relationship || "",
    contactNumber: user?.nextOfKin?.contactNumber || "",
    bvn: user?.bvn || "",
    uploadPicture: user?.idCard || null,
  };

  const validationSchema = Yup.object().shape({
    idType: Yup.string().required("ID Type is required"),
    idNumber: Yup.string().required("ID Number is required"),
    fullName: Yup.string().required("Next of Kin is required"),
    relationship: Yup.string().required("Relationship is required"),
    contactNumber: Yup.string().required(
      "Contact Number of Next of Kin is required"
    ),
    bvn: Yup.string().required("BVN is required"),
    uploadPicture: Yup.mixed().required("Please upload a picture."),
  });

  const onSubmit = async (values, { resetForm }) => {
    if (!imageSrc) {
      toast.error("Please upload a picture");
      return;
    }
    const formData = { ...values, takePicture: imageSrc };

    if (formData.uploadPicture.size > 500 * 1024) {
      toast.error("File size exceeds the limit of 500KB");
      return;
    }

    setLoading(true);
    const uri = await fileToDataUri(formData.uploadPicture);
    dispatch(
      updateUserKycDetails({
        headShot: formData?.takePicture,
        idType: formData?.idType,
        idNumber: formData?.idNumber,
        idCard: uri,
        nextOfKinFullName: formData?.fullName,
        nextOfKinRelationship: formData?.relationship,
        nextOfKinContactNumber: formData?.contactNumber,
        bvn: formData?.bvn,
        userId: user?._id,
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
        setImageSrc("");
        setImgPlaceholder(true);
        setIdPlaceholder(true);
        fetchUserData();
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error?.message || "Something went wrong");
        setLoading(false);
      });
  };

  return (
    <KYCContainer>
      <Title>Know Your Customer</Title>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <section
              style={{
                display: "flex",
                alignItems: "center",
                gap: "30px",
              }}
            >
              <span onClick={() => setImgPlaceholder(false)}>
                <WebcamCapture imageSrc={imageSrc} setImageSrc={setImageSrc} />
              </span>
              {user?.headShot && !imageSrc && imgPlaceholder && (
                <StylesImgViewer>
                  <StylesImg src={user?.headShot} alt="head-shot" />
                </StylesImgViewer>
              )}
            </section>
            <Title>Identification</Title>
            <Section>
              <div>
                <Field
                  name="idType"
                  value={values.idType}
                  onChange={handleChange}
                  component={AppInput}
                  labelColor="gray"
                  label="Select Id"
                  type="select"
                  height="2rem"
                  width="20rem"
                  id="idType"
                >
                  <option value="">Select...</option>
                  <option value="passport">International Passport</option>
                  <option value="nationalID">National ID</option>
                  <option value="driversLicense">Driver's License</option>
                  <option value="votersCard">Voter's Card</option>
                </Field>
                <ErrorMessage name="idType" component={ErrorRed} />
              </div>{" "}
              <div>
                <Field
                  label="ID Number"
                  placeholder="Please enter a valid ID"
                  type="text"
                  id="idNumber"
                  name="idNumber"
                  value={values.idNumber}
                  onChange={handleChange}
                  component={AppInput}
                  width="20rem"
                  labelColor="gray"
                  height="2rem"
                />
                <ErrorMessage name="idNumber" component={ErrorRed} />
              </div>{" "}
              <section
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "30px",
                }}
              >
                <div onClick={() => setIdPlaceholder(false)}>
                  <FileInputContainer>
                    <StyledLabel htmlFor="uploadPicture">
                      Upload Valid ID (Max 2MB)
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
                {user?.identificationDetails?.idCard &&
                  !values?.uploadPicture &&
                  idPlaceholder && (
                    <StylesImgViewer>
                      <StylesImg
                        src={user?.identificationDetails?.idCard}
                        alt="id-card"
                      />
                    </StylesImgViewer>
                  )}
              </section>
            </Section>
            <Section>
              <Title>Next of Kin</Title>
              <div>
                <Field
                  label="Full Name"
                  placeholder="Please enter Next of kin"
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                  component={AppInput}
                  width="20rem"
                  labelColor="gray"
                  height="2rem"
                />
                <ErrorMessage name="fullName" component={ErrorRed} />
              </div>{" "}
              <div>
                <Field
                  label="Relationship"
                  placeholder="Please enter relationship"
                  type="text"
                  id="relationship"
                  name="relationship"
                  value={values.relationship}
                  onChange={handleChange}
                  component={AppInput}
                  width="20rem"
                  labelColor="gray"
                  height="2rem"
                />
                <ErrorMessage name="relationship" component={ErrorRed} />
              </div>{" "}
              <div>
                <Field
                  label="Contact Number"
                  placeholder="Please enter contact number"
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  value={values.contactNumber}
                  onChange={handleChange}
                  component={AppInput}
                  width="20rem"
                  labelColor="gray"
                  height="2rem"
                />
                <ErrorMessage name="contactNumber" component={ErrorRed} />
              </div>{" "}
            </Section>
            <Section>
              <Title>Bank Verification Number (BVN)</Title>
              <div>
                <Field
                  label="BVN"
                  placeholder="Please enter BVN"
                  type="text"
                  id="bvn"
                  name="bvn"
                  value={values.bvn}
                  onChange={handleChange}
                  component={AppInput}
                  width="20rem"
                  labelColor="gray"
                  height="2rem"
                />
                <ErrorMessage name="bvn" component={ErrorRed} />
              </div>{" "}
            </Section>
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit KYC"}
            </Button>
          </Form>
        )}
      </Formik>
    </KYCContainer>
  );
};

export default KYC;
