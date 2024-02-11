import styled from "styled-components";

const StyledContainer = styled.div`
  padding: 3rem;
`;

const StyledSubHead = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;
const TermsAndConditions = () => {
  return (
    <StyledContainer>
      <article>
        <header>
          <h1>Terms and Conditions</h1>
        </header>

        <section>
          <StyledSubHead>1. Acceptance of Terms</StyledSubHead>
          <p>
            By using Settl's services, you agree to comply with and be bound by
            these Terms and Conditions.
          </p>
        </section>

        <section>
          <StyledSubHead>2. User Responsibilities</StyledSubHead>
          <p>
            You are responsible for maintaining the confidentiality of your
            account and password and for restricting access to your account.
          </p>
        </section>

        <section>
          <StyledSubHead>3. Prohibited Conduct</StyledSubHead>
          <p>
            You shall not engage in any conduct that, in our sole discretion,
            restricts or inhibits any other user from using or enjoying the
            services.
          </p>
        </section>

        <section>
          <StyledSubHead>4. Limitation of Liability</StyledSubHead>
          <p>
            We shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages, or any loss of profits or
            revenues.
          </p>
        </section>

        <section>
          <StyledSubHead>5. Governing Law</StyledSubHead>
          <p>
            These Terms and Conditions are governed by and construed in
            accordance with the laws of Nigeria.
          </p>
        </section>

        <section>
          <StyledSubHead>6. Changes to Terms</StyledSubHead>
          <p>
            We reserve the right to change these Terms and Conditions at any
            time. Updated terms will be effective upon posting.
          </p>
        </section>

        <section>
          <StyledSubHead>Contact Information</StyledSubHead>
          <p>
            If you have any questions about these Terms and Conditions, please
            contact us at support@settl.com
          </p>
        </section>
      </article>
    </StyledContainer>
  );
};

export default TermsAndConditions;
