import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCheckCircle,
  faTruck,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const getIconForStatus = (status) => {
  switch (status) {
    case "PENDING":
      return <FontAwesomeIcon icon={faClock} style={{ color: "gray" }} />;
    case "VERIFIED":
      return (
        <FontAwesomeIcon icon={faCheckCircle} style={{ color: "green" }} />
      );
    case "APPROVED":
      return (
        <FontAwesomeIcon icon={faCheckCircle} style={{ color: "green" }} />
      );
    case "DISPATCHED":
      return <FontAwesomeIcon icon={faTruck} style={{ color: "blue" }} />;
    case "COMPLETED":
      return <FontAwesomeIcon icon={faCheck} style={{ color: "purple" }} />;
    default:
      return null;
  }
};

const StatusIcon = ({ status }) => {
  return <div>{getIconForStatus(status)}</div>;
};

export default StatusIcon;
