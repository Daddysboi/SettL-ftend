import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeCommit } from "@fortawesome/free-solid-svg-icons";

const TrackerContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const TrackerHeader = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 20px;
`;

const MilestoneList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MilestoneItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const IconWrapper = styled.div`
  margin-right: 10px;
  transform: rotate(90deg); /* Rotate the icon 180 degrees */
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
  font-size: 1.2rem;
`;

const SubmitButton = styled.button`
  background-color: #4db6ac;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a99e;
  }
`;

const Tracker = () => {
  const [currentLocation, setCurrentLocation] = useState("");
  const [milestones, setMilestones] = useState([]);

  const handleSubmit = () => {
    if (currentLocation.trim() !== "") {
      const timestamp = new Date().toLocaleString();
      setMilestones([...milestones, { location: currentLocation, timestamp }]);
      setCurrentLocation("");
    }
  };

  return (
    <TrackerContainer>
      <TrackerHeader>Order Tracking</TrackerHeader>
      <div>
        <input
          type="text"
          value={currentLocation}
          placeholder="Enter current location"
          onChange={(e) => setCurrentLocation(e.target.value)}
        />
        <SubmitButton onClick={handleSubmit}>Submit Location</SubmitButton>
      </div>
      <MilestoneList>
        {milestones.map((milestone, index) => (
          <MilestoneItem key={index}>
            {index !== 0 && <Line top={(index - 1) * 26} bottom={26} />}
            <IconWrapper>
              <FontAwesomeIcon icon={faCodeCommit} size="lg" color="#4db6ac" />
            </IconWrapper>
            <MilestoneText>
              {milestone.location} - {milestone.timestamp}
            </MilestoneText>
          </MilestoneItem>
        ))}
      </MilestoneList>
    </TrackerContainer>
  );
};

export default Tracker;
