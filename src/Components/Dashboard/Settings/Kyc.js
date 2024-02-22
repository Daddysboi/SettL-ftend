import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styled from "styled-components";
import * as Yup from "yup";

import AppInput from "../../ReUseableComponent/AppInput";
import ErrorRed from "../../ReUseableComponent/ErrorRed";
import WebcamCapture from "./WebcamCapture";

const KYCContainer = styled.div`
  width: 30rem;
  margin: 0 auto;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
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

  const initialValues = {
    idType: "",
    idNumber: user?.idNumber || "",
    fullName: "",
    relationship: "",
    contactNumber: "",
    bvn: "",
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

    takePicture: Yup.mixed().required("Please take a picture."),
    uploadPicture: Yup.mixed().required("Please upload a picture."),
  });

  const onSubmit = (values) => {
    if (imageSrc) {
      const formData = { ...values, takePicture: imageSrc };
      console.log("Form submitted with values:", formData);
    }
  };

  return (
    <KYCContainer>
      <Title>Know Your Customer</Title>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <section>
            <WebcamCapture imageSrc={imageSrc} setImageSrc={setImageSrc} />
            <ErrorMessage name="uploadPicture" component={ErrorRed} />
          </section>
          <Title>Identification</Title>
          <Section>
            <div>
              <Field
                name="idType"
                component={AppInput}
                labelColor="gray"
                label="Select Id"
                type="select"
                height="2rem"
                width="20rem"
                id="idType"
              >
                <option value="passport">International Passport</option>
                <option value="nationalID">National ID</option>
                <option value="driversLicense">Driver's License</option>
                <option value="votersCard">Voter's Card</option>
              </Field>
            </div>{" "}
            <div>
              <Field
                label="ID Number"
                placeholder={user?.idNumber || "Please enter a valid ID"}
                type="text"
                id="idNumber"
                name="idNumber"
                component={AppInput}
                width="20rem"
                labelColor="gray"
                height="2rem"
              />
              <ErrorMessage name="idNumber" component={ErrorRed} />
            </div>{" "}
            <div>
              <Field name="uploadPicture">
                {({ form, field }) => (
                  <FileInputContainer>
                    <StyledLabel htmlFor="uploadPicture">
                      Upload Valid ID (Max 2MB)
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
                component={AppInput}
                width="20rem"
                labelColor="gray"
                height="2rem"
              />
              <ErrorMessage name="bvn" component={ErrorRed} />
            </div>{" "}
          </Section>
          <Button>Submit KYC</Button>
        </Form>
      </Formik>
    </KYCContainer>
  );
};

export default KYC;
