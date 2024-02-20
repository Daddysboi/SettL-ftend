import { useReducer } from "react";
import styled from "styled-components";

import AccountDetails from "./AccountDetails";
import ProfileSettings from "./ProfileSettings";
import Kyc from "./Kyc";
import ContactDetails from "./ContactDetails";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40rem;
  flex-direction: column;
`;
const HeaderContainer = styled.div`
  border-bottom: 0.1rem solid #dbdbdb;
  display: flex;
  width: 100vw;
  padding-left: 5rem;
  margin-left: -1rem;
  gap: 5rem;
  margin-bottom: 2rem;
  height: 2.5rem;
`;

const TabBtn = styled.button`
  border: none;
  background: none;
  font-size: 0.8rem;
  font-weight: 400;
  border-bottom: ${(props) => (props.isActive ? "1px solid #4db6ac" : "")};
  color: ${(props) => (props.isActive ? "#4db6ac" : "gray")};
  &:hover {
    border-bottom: 1px solid #4db6ac;
    color: #4db6ac;
  }
`;

const initialState = {
  activeSection: "profileSettings",
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "PROFILE_SETTINGS":
      return { ...state, activeSection: "profileSettings" };
    case "ACCOUNT_DETAILS":
      return { ...state, activeSection: "accountDetails" };
    case "KYC":
      return { ...state, activeSection: "kyc" };
    case "CONTACT_DETAILS":
      return { ...state, activeSection: "contactDetails" };

    default:
      return state;
  }
};
const Settings = ({ user }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSectionClick = (section) => {
    dispatch({ type: section });
  };

  return (
    <Container>
      <HeaderContainer>
        <TabBtn
          onClick={() => handleSectionClick("PROFILE_SETTINGS")}
          isActive={state.activeSection === "profileSettings"}
        >
          Profile Settings
        </TabBtn>
        <TabBtn
          onClick={() => handleSectionClick("ACCOUNT_DETAILS")}
          isActive={state.activeSection === "accountDetails"}
        >
          Account Details
        </TabBtn>
        <TabBtn
          onClick={() => handleSectionClick("KYC")}
          isActive={state.activeSection === "kyc"}
        >
          KYC
        </TabBtn>
        <TabBtn
          onClick={() => handleSectionClick("CONTACT_DETAILS")}
          isActive={state.activeSection === "contactDetails"}
        >
          Contact
        </TabBtn>
      </HeaderContainer>
      <div>
        {state.activeSection === "profileSettings" && (
          <ProfileSettings user={user} />
        )}
        {state.activeSection === "accountDetails" && (
          <AccountDetails user={user} />
        )}
        {state.activeSection === "kyc" && <Kyc user={user} />}
        {state.activeSection === "contactDetails" && (
          <ContactDetails user={user} />
        )}
      </div>
    </Container>
  );
};

export default Settings;
