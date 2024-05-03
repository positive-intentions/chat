import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";

const VoiceRecorderButton = ({ onVoiceRecording }) => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef();

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      recorder.start();

      recorder.ondataavailable = (e) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64AudioMessage = reader.result;
          setAudioUrl(base64AudioMessage);
        };
        reader.readAsDataURL(e.data);
      };

      setRecording(true);
    });
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const playRecording = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div>
      {audioUrl && (
        <div>
          <audio
            ref={audioRef}
            src={audioUrl}
            controls
            style={{ width: "100%" }}
          />
          {/* <Button variant="contained" color="secondary" onClick={playRecording}>
                        Play Recording
                    </Button> */}
        </div>
      )}
      <Button
        variant="contained"
        color={recording ? "error" : "primary"}
        onClick={recording ? stopRecording : startRecording}
        fullWidth
      >
        {recording ? "Stop Recording" : "New Recording"}
      </Button>
      {audioUrl && (
        <>
          <br />
          <br />
          <Button
            variant="contained"
            color="success"
            onClick={() => onVoiceRecording(audioUrl) && setAudioUrl(null)}
            fullWidth
          >
            send
          </Button>
        </>
      )}
    </div>
  );
};

export default VoiceRecorderButton;
