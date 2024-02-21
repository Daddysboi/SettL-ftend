import Webcam from "react-webcam";
import styled from "styled-components";

const InputContainer = styled.div`
  margin-bottom: 1rem;
`;

const WebcamContainer = styled.div`
  width: 7rem;
  height: 7rem;
  border: 1px solid #ccc;
  border-radius: 7rem;
  overflow: hidden;
  display: inline-flex;
  margin-right: 1rem;
`;

const CapturedImageContainer = styled.div`
  width: 7rem;
  height: 7rem;
  border: 1px solid #ccc;
  border-radius: 7rem;
  display: inline-flex;
  margin-right: 1rem;
  overflow: hidden;
`;

const Button = styled.button`
  margin-top: 2rem;
  background: #3bb75e;
  border: none;
  border-radius: 0.2rem;
  padding: 0.5rem;
  color: #fff;
  width: 8rem;
  &:hover {
    background: green;
  }
`;
const WebcamCapture = ({
  webcamRef,
  imageSrc,
  webcamActive,
  capture,
  recapture,
  startWebcam,
}) => (
  <section>
    <div style={{ color: "gray", fontSize: "0.7rem" }}>Take a Headshot</div>
    <InputContainer>
      {webcamActive && (
        <WebcamContainer>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
          />
        </WebcamContainer>
      )}
      {imageSrc ? (
        <div>
          <CapturedImageContainer>
            <img src={imageSrc} alt="Captured" style={{ width: "100%" }} />
          </CapturedImageContainer>
          <Button onClick={recapture}>Recapture</Button>
        </div>
      ) : (
        <Button onClick={webcamActive ? capture : startWebcam}>
          {webcamActive ? "Capture Photo" : "Start Webcam"}
        </Button>
      )}
    </InputContainer>
  </section>
);

export default WebcamCapture;
