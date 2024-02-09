import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeCommit } from "@fortawesome/free-solid-svg-icons";

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

const StyledInput = styled.input`
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

const Line = styled.div`
  width: 1px;
  background-color: #4db6ac;
  position: absolute;
  top: ${({ top }) => top}px;
  bottom: ${({ bottom }) => bottom}px;
  left: 5px;
`;

const MilestoneText = styled.div`
  display: flex;
  align-items: flex-start;
`;

const LocationText = styled.div`
  font-size: 1rem;
  margin-right: 10px;
`;

const DateTimeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DateText = styled.div`
  color: #4db6ac;
  font-size: 0.55rem;
`;

const TimeText = styled.div`
  font-size: 0.55rem;
  color: #4db6ac;
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

const Tracker = () => {
  const [currentLocation, setCurrentLocation] = useState("");
  const [milestones, setMilestones] = useState([]);

  const handleSubmit = () => {
    if (currentLocation.trim() !== "") {
      const timestamp = new Date().toLocaleString().replace(/\//g, "-"); // Replace / with -
      setMilestones([...milestones, { location: currentLocation, timestamp }]);
      setCurrentLocation("");
    }
  };

  return (
    <TrackerContainer>
      <TrackerHeader>Order Tracking</TrackerHeader>
      <div>
        <StyledInput
          type="text"
          value={currentLocation}
          placeholder="Enter current location"
          onChange={(e) => setCurrentLocation(e.target.value)}
        />
        <SubmitButton onClick={handleSubmit}>Submit Location</SubmitButton>
      </div>
      <MilestoneList>
        <h2>Current Stop</h2>
        {milestones.map((milestone, index) => (
          <MilestoneItem key={index}>
            {index !== 0 && <Line top={(index - 1) * 26} bottom={26} />}
            <IconWrapper>
              <FontAwesomeIcon icon={faCodeCommit} size="lg" color="#4db6ac" />
            </IconWrapper>
            <MilestoneText>
              <LocationText>{milestone.location}</LocationText>
              <DateTimeWrapper>
                <DateText>{milestone.timestamp.split(" ")[0]}</DateText>
                <TimeText>{milestone.timestamp.split(" ")[1]}</TimeText>
              </DateTimeWrapper>
            </MilestoneText>
          </MilestoneItem>
        ))}
      </MilestoneList>
    </TrackerContainer>
  );
};

export default Tracker;
