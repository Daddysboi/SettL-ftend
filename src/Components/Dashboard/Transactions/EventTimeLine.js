import React from "react";

const EventTimeline = ({ orderAccepted, orderDispatched, orderCompleted }) => {
  const circleRadius = 15;

  return (
    <svg height="220" width="100%">
      {/* Line and Circle for "Accepted" */}
      <line
        x1="10%"
        y1="65"
        x2="10%"
        y2="95"
        stroke={orderAccepted ? "black" : "gray"}
        strokeWidth="1"
      />
      <circle
        cx="10%"
        cy="50"
        r={circleRadius}
        fill={orderAccepted ? "green" : "none"}
        stroke={orderAccepted ? "none" : "gray"}
        strokeWidth="1"
      />{" "}
      {/* Text for "Accepted" */}
      <text
        x="20%"
        y={50}
        fontSize="13"
        fill={orderAccepted ? "black" : "gray"}
      >
        Transaction Accepted
      </text>
      {orderAccepted && (
        <>
          <text
            x="20%"
            y={63}
            fontSize="8"
            fill={orderAccepted ? "black" : "gray"}
          >
            Jan 1, 2024
          </text>
          {/* Tick mark for "Accepted" */}
          <text
            x={"10%"}
            y={"25%"}
            fontSize="16"
            fontWeight="bold"
            fill={orderAccepted ? "white" : "none"}
            textAnchor="middle"
          >
            &#10003;
          </text>
        </>
      )}
      {/* Line and Circle for "Dispatched" */}
      <line
        x1="10%"
        y1="125"
        x2="10%"
        y2="155"
        stroke={orderDispatched ? "black" : "gray"}
        strokeWidth="1"
      />
      <circle
        cx="10%"
        cy="110"
        r={circleRadius}
        fill={orderDispatched ? "green" : "none"}
        stroke={orderDispatched ? "none" : "gray"}
        strokeWidth="1"
      />{" "}
      {/* Text for "Dispatched" */}
      <text
        x="20%"
        y={110}
        fontSize="13"
        fill={orderDispatched ? "black" : "gray"}
      >
        Sent for delivery
      </text>
      {orderDispatched && (
        <>
          <text
            x="20%"
            y={123}
            fontSize="8"
            fill={orderDispatched ? "black" : "gray"}
          >
            Jan 15, 2024
          </text>
          {/* Tick mark for "Dispatched" */}
          <text
            x={"10%"}
            y={"53%"}
            fontSize="16"
            fontWeight="bold"
            fill={orderDispatched ? "white" : "none"}
            textAnchor="middle"
          >
            &#10003;
          </text>
        </>
      )}
      <circle
        cx="10%"
        cy="170"
        r={circleRadius}
        fill={orderCompleted ? "green" : "none"}
        stroke={orderCompleted ? "none" : "gray"}
        strokeWidth="1"
      />{" "}
      {/* Text for "Completed" */}
      <text
        x="20%"
        y={170}
        fontSize="13"
        fill={orderCompleted ? "black" : "gray"}
      >
        Transaction Completed
      </text>
      {orderCompleted && (
        <>
          <text
            x="20%"
            y={185}
            fontSize="8"
            fill={orderCompleted ? "black" : "gray"}
          >
            Jan 20, 2024
          </text>
          {/* Tick mark for "Completed" */}
          <text
            x={"10%"}
            y={"80%"}
            fontSize="16"
            fontWeight="bold"
            fill={orderCompleted ? "white" : "none"}
            textAnchor="middle"
          >
            &#10003;
          </text>
        </>
      )}
    </svg>
  );
};

export default EventTimeline;
