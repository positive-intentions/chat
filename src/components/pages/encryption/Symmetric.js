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
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';

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
        <Button
            variant="contained"
            color="primary"
            onClick={console.log}
            fullWidth
        >
            Generate Symmetric key
        </Button>
      <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="connectionId"
              label="Symmetric Key"
              name="Text"
              value={text}
              onChange={(e) => setText(e.target.value || "")}
              autoComplete="off"
              InputProps={{

                endAdornment: (
                    <>
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleCopyConnectionIdToClipboard}
                            edge="end"
                            >
                            <UploadIcon />
                            </IconButton>
                        </InputAdornment>
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleCopyConnectionIdToClipboard}
                            edge="end"
                            >
                            <DownloadIcon />
                            </IconButton>
                        </InputAdornment>
                    </>
                ),
              }}
        />

        <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="connectionId"
              label="Message to encrypt"
              name="Text"
              value={text}
              onChange={(e) => setText(e.target.value || "")}
              autoComplete="off"
              InputProps={{

                endAdornment: (
                    <>
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleCopyConnectionIdToClipboard}
                            edge="end"
                            >
                            <UploadIcon />
                            </IconButton>
                        </InputAdornment>
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleCopyConnectionIdToClipboard}
                            edge="end"
                            >
                            <DownloadIcon />
                            </IconButton>
                        </InputAdornment>
                    </>
                ),
              }}
        />

        <Button
            variant="contained"
            color="primary"
            onClick={console.log}
            fullWidth
        >
            Encrypt file
        </Button>

        <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="connectionId"
              label="Encrypted message"
              name="Text"
              value={text}
              onChange={(e) => setText(e.target.value || "")}
              autoComplete="off"
              InputProps={{

                endAdornment: (
                    <>
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleCopyConnectionIdToClipboard}
                            edge="end"
                            >
                            <UploadIcon />
                            </IconButton>
                        </InputAdornment>
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleCopyConnectionIdToClipboard}
                            edge="end"
                            >
                            <DownloadIcon />
                            </IconButton>
                        </InputAdornment>
                    </>
                ),
              }}
        />

        <Button
            variant="contained"
            color="primary"
            onClick={console.log}
            fullWidth
        >
            Decrypt file
        </Button>
    </div>
  );
}

export default QRText;