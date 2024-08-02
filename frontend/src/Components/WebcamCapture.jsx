import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const WebcamCapture = ({ setEmotion }) => {
  const webcamRef = useRef(null);

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const formData = new FormData();
    formData.append("image", imageSrc);

    try {
      const response = await axios.post("http://localhost:5173/api/kairos-api", formData, {
        headers: {
          "Content-Type": "application/json",
          app_id: "03e83f67",
          app_key: "36df46e4767b7e807549af17247ae3cc",
        },
      });

      if (
        response.data &&
        response.data.frames &&
        response.data.frames.length > 0
      ) {
        const emotions = response.data.frames[0].people[0].emotions;
        const dominantEmotion = Object.keys(emotions).reduce((a, b) =>
          emotions[a] > emotions[b] ? a : b
        );
        setEmotion(dominantEmotion);
      }
    } catch (error) {
      console.error("Error capturing emotion:", error);
    }
  }, [webcamRef, setEmotion]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
      />
      <button onClick={capture}>Capture Emotion</button>
    </div>
  );
};

export default WebcamCapture;
