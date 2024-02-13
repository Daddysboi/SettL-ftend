import React from "react";

const EventTimeline = ({ orderAccepted, orderDispatched, orderCompleted }) => {
  const circleRadius = 15;
  const textXOffset = 5; // Offset for text from circle
  const dummyDateXOffset = 5; // Offset for date from text

  return (
    <svg height="220" width="100%">
      <circle
        cx="10%"
        cy="50"
        r={circleRadius}
        fill={orderAccepted ? "green" : "none"}
      />
      {orderAccepted && (
        <>
          <text x="20%" y={50} fontSize="15" fill="black">
            Transaction Accepted
          </text>
          <text x="25%" y={58} fontSize="8" fill="black">
            Jan 1, 2024
          </text>
          <text x="7%" y={54 + 4} fontSize="20" fontWeight="bold" fill="white">
            &#10003;
          </text>
        </>
      )}

      <line
        x1="10%"
        y1="65"
        x2="10%"
        y2="95"
        stroke={orderDispatched || orderCompleted ? "gray" : "black"}
        strokeWidth="1"
      />
      <circle
        cx="10%"
        cy="110"
        r={circleRadius}
        fill="none"
        stroke={orderDispatched ? "gray" : "black"}
        strokeWidth="1"
      />
      {orderDispatched && (
        <>
          <text x="20%" y={110} fontSize="15" fill="black">
            Sent for delivery
          </text>
          <text x="25%" y={118} fontSize="8" fill="black">
            Jan 15, 2024
          </text>
        </>
      )}
      <line
        x1="10%"
        y1="125"
        x2="10%"
        y2="155"
        stroke={orderCompleted ? "gray" : "black"}
        strokeWidth="1"
      />
      <circle
        cx="10%"
        cy="170"
        r={circleRadius}
        fill="none"
        stroke={orderCompleted ? "gray" : "black"}
        strokeWidth="1"
      />
      {orderCompleted && (
        <>
          <text x="20%" y={170} fontSize="15" fill="black">
            Transaction Completed
          </text>
          <text x="25%" y={178} fontSize="8" fill="black">
            Jan 20, 2024
          </text>
          <text x="10%" y={170 + 4} fontSize="16" fill="white">
            &#10003;
          </text>
        </>
      )}
    </svg>
  );
};

export default EventTimeline;
