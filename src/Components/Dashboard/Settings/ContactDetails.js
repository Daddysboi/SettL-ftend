import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

import AppInput from "../../ReUseableComponent/AppInput";
import ErrorRed from "../../ReUseableComponent/ErrorRed";

const AddContact = ({
  user,
  PropsContainer,
  Button,
  Txt,
  StyledForm,
  Title,
  FileInputContainer,
  StyledLabel,
  StyledInput,
  UploadButton,
  FaCloudUploadAlt,
}) => {
  const initialValues = {
    homeAddress: "",
    landmark: "",
    phoneNumber: "",
    officeAddress: "",
    proofOfAddress: "",
    postalCode: "",
  };
  const onSubmit = (values) => {
    console.log("Form submitted with values:", values);
  };
  const validationSchema = Yup.object().shape({
    homeAddress: Yup.string().required("Home Address is required"),
    landmark: Yup.string().required("Nearest landmark is required"),
    email: Yup.string().email("Invalid email address"),
    phoneNumber: Yup.string(),
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
        <StyledForm>
          <div>
            <Field
              label="Home Address"
              placeholder={user?.homeAddress || ""}
              type="text"
              id="homeAddress"
              name="homeAddress"
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
              placeholder={user?.landmark || ""}
              type="text"
              id="landmark"
              name="landmark"
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
              placeholder={user?.officeAddress || ""}
              type="text"
              id="officeAddress"
              name="officeAddress"
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
              placeholder={user?.postalCode || ""}
              type="text"
              id="postalCode"
              name="postalCode"
              component={AppInput}
              width="20rem"
              labelColor="gray"
              height="2rem"
            />
            <ErrorMessage name="postalCode" component={ErrorRed} />
          </div>

          <div>
            <Field name="uploadPicture">
              {({ form, field }) => (
                <FileInputContainer>
                  <StyledLabel htmlFor="uploadPicture">
                    Proof of Address (Max 2MB)
                  </StyledLabel>
                  <div>
                    <UploadButton htmlFor="proofOfAddress">
                      <FaCloudUploadAlt />
                    </UploadButton>
                    <StyledInput
                      id="proofOfAddress"
                      name="proofOfAddress"
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        form.setFieldValue(
                          "proofOfAddress",
                          event.currentTarget.files[0]
                        );
                      }}
                    />
                  </div>{" "}
                  <Txt>Utility bill must not be more that 3 months old</Txt>
                  <ErrorMessage name="proofOfAddress" component={ErrorRed} />
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

          <Button type="submit">Add Contact</Button>
        </StyledForm>
      </Formik>
    </PropsContainer>
  );
};

export default AddContact;
