import styled from "styled-components";

const StyledContainer = styled.div`
  padding: 3rem;
`;

const StyledSubHead = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

const PrivacyPolicy = () => {
  return (
    <StyledContainer>
      <article>
        <header>
          <h1>Privacy Policy</h1>
        </header>

        <section>
          <StyledSubHead>Introduction</StyledSubHead>
          <p>
            Welcome to Settl's Privacy Policy. This Privacy Policy describes how
            Settl ("we," "us," or "our") collects, uses, and shares information
            about you and explains the choices you have concerning the
            information. We respect your privacy and are committed to protecting
            it through our compliance with this policy.
          </p>
        </section>

        <section>
          <StyledSubHead>Information We Collect</StyledSubHead>
          <p>
            We collect several types of information from and about users of our
            Services, including:
          </p>
          <ul>
            <li>Information you provide to us.</li>
            <li>
              Information we collect as you navigate through the Services.
            </li>
            <li>
              Information we receive from third parties, such as business
              partners and service providers.
            </li>
          </ul>
        </section>

        <section>
          <StyledSubHead>How We Use Your Information</StyledSubHead>
          <p>
            We use information that we collect about you or that you provide to
            us, including any personal information, for various purposes
          </p>
        </section>

        <section>
          <StyledSubHead>Sharing of Your Information</StyledSubHead>
          <p>We may share your personal information with:</p>
          <ul>
            <li>Our subsidiaries and affiliates.</li>
            <li>Service providers.</li>
          </ul>
        </section>

        <section>
          <StyledSubHead>Security</StyledSubHead>
          <p>
            We have implemented measures designed to secure your personal
            information from accidental loss and from unauthorized access, use,
            alteration, and disclosure.
          </p>
        </section>

        <section>
          <StyledSubHead>Changes to Our Privacy Policy</StyledSubHead>
          <p>
            We may update our Privacy Policy from time to time. If we make
            changes, we will notify you by revising the date at the top of the
            policy and, in some cases, provide you with additional notice.
          </p>
        </section>

        <section>
          <StyledSubHead>Contact Information</StyledSubHead>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at support@settl.com
          </p>
        </section>
      </article>
    </StyledContainer>
  );
};

export default PrivacyPolicy;
