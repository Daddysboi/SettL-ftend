import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodeCommit,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

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
  align-items: center;
  justify-content: space-between;
`;

const LocationText = styled.div`
  font-size: 1rem;
  margin-right: 10px;
`;

const DeleteButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #4db6ac;
  margin-left: 5px;
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
  margin-bottom: 0.25rem;
`;
const TimeText = styled.div`
  font-size: 0.55rem;
  color: #4db6ac;
  margin-top: 0.25rem;
`;

const Timestamp = ({ timestamp }) => {
  const formattedDate = new Date(timestamp).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <DateTimeWrapper>
      <DateText>{formattedDate}</DateText>
      <TimeText>{formattedTime}</TimeText>
    </DateTimeWrapper>
  );
};

const Tracker = () => {
  const [currentLocation, setCurrentLocation] = useState("");
  const [milestones, setMilestones] = useState([]);

  const handleAddMilestone = () => {
    if (currentLocation.trim() !== "") {
      const timestamp = new Date().toISOString(); // Get current timestamp
      setMilestones([...milestones, { location: currentLocation, timestamp }]);
      setCurrentLocation("");
    }
  };

  const handleEditMilestone = (index, newLocation) => {
    const updatedMilestones = [...milestones];
    updatedMilestones[index].location = newLocation;
    setMilestones(updatedMilestones);
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
        <SubmitButton onClick={handleAddMilestone}>
          Submit Location
        </SubmitButton>
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
