import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import PageContainer from "../../atomic/organism/page-container/PageContainer";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import Button from "@mui/material/Button";

const useStyles = makeStyles((theme) => ({
  padding: {
    padding: 10,
  },
}));

export default function Maintainance() {
  const classes = useStyles();
  const navigate = useNavigate();
  const contacts = useSelector((state) => state.contacts) || [];

  const [rtc, setRtc] = useState(new RTCPeerConnection());
  const [dc, setDc] = useState(null);
  const [rtcIceCandidate, setRtcIceCandidate] = useState(null);
  const [rtcRemoteIceCandidate, setRtcRemoteIceCandidate] = useState(null);
  const [rtcOffer, setRtcOffer] = useState(null);
  const [rtcRemoteOffer, setRtcRemoteOffer] = useState(null);
  const [rtcAnswer, setRtcAnswer] = useState(null);
  const [rtcRemoteAnswer, setRtcRemoteAnswer] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (rtc) {
      rtc.onicecandidate = function (event) {
        if (event.candidate) {
          const serialisedIceCandidate = JSON.stringify(event.candidate);
          setRtcIceCandidate(serialisedIceCandidate);
        }
      };

      rtc.ondatachannel = function (event) {
        event.channel.onopen = function () {
          event.channel.send("hello from rtc1"); // Sending message from dc1
        };
        event.channel.onmessage = function (event) {
          console.info("rtc1: received message:", event.data);
        };
      };

      const dc = rtc.createDataChannel("channel1");
      dc.onopen = function () {
        dc.send("hello from rtc2"); // Sending message from dc2
      };
      dc.onmessage = function (event) {
        console.info("rtc2: received message:", event.data);
      };
      setDc(dc);
    }
  }, [rtc]);

  const handleCreateOffer = async () => {
    const offer = await rtc.createOffer();
    await rtc.setLocalDescription(offer);
    setRtcOffer(JSON.stringify(offer));
  };

  const handleRemoteOffer = async (rtcRemoteOffer) => {
    const offer = JSON.parse((rtcRemoteOffer.replace(/(\r\n|\n|\r)/gm, "")));
    // RTCSessionDescriptionInit
    const offerDescption = new RTCSessionDescription(offer);
    await rtc.setRemoteDescription(offerDescption)
      .catch((e) => {
        console.error("rtc1: setRemoteDescription", e);
      });

    await handleAnswer();
  };

  useEffect(() => {
    if (rtcRemoteOffer) {
      handleRemoteOffer(rtcRemoteOffer);
    }
  }, [rtcRemoteOffer]);

  const handleAnswer = async () => {
    const answer = await rtc.createAnswer();
    await rtc.setLocalDescription(answer);
    setRtcAnswer(JSON.stringify(answer));
  };

  const handleRemoteAnswer = async (rtcRemoteAnswer) => {
    const answer = JSON.parse((rtcRemoteAnswer.replace(/(\r\n|\n|\r)/gm, "")));
    // RTCSessionDescriptionInit
    const answerDescption = new RTCSessionDescription(answer);
    await rtc.setRemoteDescription(answerDescption);

    // // send message from dc2
    // dc.send("hello from rtc2");
  };

  useEffect(() => {
    if (rtcRemoteAnswer) {
      handleRemoteAnswer(rtcRemoteAnswer);
    }
  }, [rtcRemoteAnswer]);

  const handleIceCandidate = async (rtcIceCandidate) => {
    const iceCandidate = JSON.parse((rtcIceCandidate.replace(/(\r\n|\n|\r)/gm, "")));
    await rtc.addIceCandidate(iceCandidate);
  }

  useEffect(() => {
    if (rtcRemoteIceCandidate) {
      handleIceCandidate(rtcRemoteIceCandidate);
    }
  }, [rtcRemoteIceCandidate]);

  return (
    <PageContainer
      headerProps={{
        title: "WebRTC",
        backButton: true,
        menuProps: {
          icon: "more",
          items: [
            {
              text: "Profile",
              icon: "account",
              onClick: () => navigate("/profile"),
            },
          ],
        },
      }}
    >
      <div style={{ textAlign: "center", padding: 20 }}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="connectionId"
          label={"WebRTC offer"}
          name="webRTC"
          value={rtcOffer}
          onChange={(e) => setRtcOffer(e.target.value || "")}
          autoComplete="off"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleCreateOffer}
                  edge="end"
                >
                  <RefreshIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="connectionId"
          label={"WebRTC remote offer"}
          name="webRTC"
          value={rtcRemoteOffer}
          onChange={(e) => setRtcRemoteOffer(e.target.value || "")}
          autoComplete="off"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleCreateOffer}
                  edge="end"
                >
                  <RefreshIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="connectionId"
          label={"WebRTC answer"}
          name="webRTC"
          value={rtcAnswer}
          onChange={(e) => setRtcAnswer(e.target.value || "")}
          autoComplete="off"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleAnswer}
                  edge="end"
                >
                  <RefreshIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="connectionId"
          label={"WebRTC remote answer"}
          name="webRTC"
          value={rtcRemoteAnswer}
          onChange={(e) => setRtcRemoteAnswer(e.target.value || "")}
          autoComplete="off"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleRemoteAnswer}
                  edge="end"
                >
                  <RefreshIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="connectionId"
            label={"WebRTC ice candidate"}
            name="webRTC"
            value={rtcIceCandidate}
            onChange={(e) => setRtcIceCandidate(e.target.value || "")}
            autoComplete="off"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleCreateOffer}
                    edge="end"
                  >
                    <RefreshIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="connectionId"
            label={"WebRTC remote ice candidate"}
            name="webRTC"
            value={rtcRemoteIceCandidate}
            onChange={(e) => setRtcRemoteIceCandidate(e.target.value || "")}
            autoComplete="off"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleCreateOffer}
                    edge="end"
                  >
                    <RefreshIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="connectionId"
            label={"message"}
            name="webRTC"
            value={message}
            onChange={(e) => setMessage(e.target.value || "")}
            autoComplete="off"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleCreateOffer}
                    edge="end"
                  >
                    <RefreshIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        <Button
          variant="contained"
          component="label"
          fullWidth
          onClick={() => {
            dc.send(message);
          }}
        >
send        
</Button>
      </div>
    </PageContainer>
  );
}
