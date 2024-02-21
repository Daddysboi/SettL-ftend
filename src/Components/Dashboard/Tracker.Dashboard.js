import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeCommit } from "@fortawesome/free-solid-svg-icons";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

import { addLocation } from "../../features/utilitySlice";
import { useAppDispatch } from "../../redux/hooks";

const TrackerContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

const TrackerHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const MilestoneList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 4rem;
`;

const StyledField = styled(Field)`
  width: 20rem;
  min-height: 42px;
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 0.3rem;
  border: 1px solid rgba(223, 140, 82, 0.3);
  outline: none;
  &::placeholder {
    opacity: 0.5;
  }
  &:focus {
    border: 1px solid rgb(194, 194, 194);
  }
`;

const SubmitButton = styled.button`
  background-color: #4db6ac;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 3rem;
  min-height: 42px;

  &:hover {
    background-color: #45a99e;
  }
`;

const MilestoneItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
`;

const IconWrapper = styled.div`
  margin-right: 10px;
  transform: rotate(90deg);
`;

const MilestoneText = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LocationText = styled.div`
  font-size: 1rem;
  margin-right: 10px;
`;

const DateText = styled.div`
  color: #4db6ac;
  font-size: 0.55rem;
  margin-bottom: 0.25rem;
`;

const TimeText = styled.div`
  font-size: 0.55rem;
  color: #4db6ac;
  margin-top: 0.25rem;
`;

const Tracker = () => {
  const [loading, setLoading] = useState(false);
  const [milestones, setMilestones] = useState([]);
  const dispatch = useAppDispatch();

  const initialValues = {
    currentLocation: "",
  };

  const validationSchema = Yup.object({
    currentLocation: Yup.string().required("Current location is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(addLocation({ location: values.currentLocation }));
      dispatch(addLocation(request)).then((resp) => {
        if (resp?.payload?.status !== 201) {
          toast.error(resp?.payload?.message || "Something went wrong");
          setLoading(false);
          return;
        }
        toast.success(resp?.payload?.message || "Successfully subscribed");
        resetForm();
        setLoading(false);
      });
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <TrackerContainer>
      <TrackerHeader>Order Tracking</TrackerHeader>
      <Formik
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Form>
          <StyledField
            id="location"
            name="currentLocation"
            type="text"
            placeholder="Enter current location"
          />
          <ErrorMessage name="currentLocation" component="div" />
          <SubmitButton type="submit">Submit Location</SubmitButton>
        </Form>
      </Formik>
      <MilestoneList>
        <h2>Current Stop</h2>
        {milestones.map((milestone, index) => (
          <MilestoneItem key={index}>
            {index !== 0}
            <IconWrapper>
              <FontAwesomeIcon icon={faCodeCommit} size="lg" color="#4db6ac" />
            </IconWrapper>
            <MilestoneText>
              <div>
                <LocationText>{milestone.location}</LocationText>
                <DateText>{milestone.timestamp.split("T")[0]}</DateText>
                <TimeText>{milestone.timestamp.split("T")[1]}</TimeText>
              </div>
            </MilestoneText>
          </MilestoneItem>
        ))}
      </MilestoneList>
    </TrackerContainer>
  );
};

export default Tracker;
