import React, { useState } from 'react';


import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useTranslation } from "react-i18next";
import QRCode from "react-qr-code";
import QRReader from "react-qr-scanner";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    qrcodeReader: {
      // height: '100vh',
      width: "100%",
      // top: 0,
      // left: 0,
      // position: 'absolute',
      zIndex: 10000,
    },
  }));

const QRText = () => {
    const { t } = useTranslation();

  const classes = useStyles();
    const [text, setText] = useState("");
    const [contactNamePreset, setContactNamePreset] = useState("");
    const storedConnectionId = useState("");
    const [scanning, setScanning] = useState(false);

    const handleCopyConnectionIdToClipboard = () => {
        navigator.clipboard.writeText(
          `${window.location.origin}/#/login/${storedConnectionId}${contactNamePreset ? `/${contactNamePreset}` : ""}`,
        );
      };



  const handleScan = (data) => {
    if (!data?.text) return;
    setText(data?.text);
  };
  const handleError = (err) => {
    console.error(err);
  };
    
  return (
    <div>
      <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="connectionId"
              label="Text/Link"
              name="Text"
              value={text}
              onChange={(e) => setText(e.target.value || "")}
              autoComplete="off"
              InputProps={{

                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleCopyConnectionIdToClipboard}
                      edge="end"
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <br />

{!scanning && (
                <div style={{ background: 'white', padding: 20 }}>
                    <QRCode
                      size={256}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                      value={text}
                      viewBox={`0 0 256 256`}
                    />
                    </div>
            )}

            {scanning && (
              <QRReader
              id={`qrcode-reader-${text}`}
              key={`qrcode-reader-${text}`}
                delay={300}
                className={classes.qrcodeReader}
                onError={handleError}
                onScan={handleScan}
                constraints={{
                  video: {
                    facingMode: "environment",
                  },
                }}
              />
            )}

<Button
              type="button"
              fullWidth
              variant="contained"
              onClick={() => setScanning(!scanning)}
              color={scanning ? "error" : "primary"}
            >
              {scanning
                ? t("components.connectToPeer.stopScanning")
                : 'Scan QR'
              }
            </Button>
    </div>
  );
}

export default QRText;