import styled from "styled-components";

const Div = styled.div`
  color: red;
  font-size: 0.5rem;
  padding: 0;
  margin-top: -0.7rem;
  display: block;
`;
const ErrorRed = (props) => {
  return <Div>{props.children}</Div>;
};

export default ErrorRed;
