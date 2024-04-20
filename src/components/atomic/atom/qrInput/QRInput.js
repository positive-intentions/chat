import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import QRCode from "react-qr-code";
import QRReader from "react-qr-scanner";
import { makeStyles } from "@mui/styles";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";

const useStyles = makeStyles((theme) => ({
  qrcodeReader: {
    display: 'block',
    // height: '100vh',
    width: "100%",
    // top: 0,
    // left: 0,
    // position: 'absolute',
    zIndex: 10000,
  },
}));

export default ({ value: controlledValue, defaultValue, qr, scan, back, next, onScan }) => {
    const classes = useStyles();
  const [isQRMode, setIsQRMode] = useState(qr);
  const [scanning, setScanning] = useState(scan);
  const [fileParts, setFileParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState(0);
  const [partDensity, setPartDensity] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [value, setValue] = useState(controlledValue || defaultValue || "");

  useEffect(() => {
    if (controlledValue) setValue(controlledValue);
  }, [controlledValue]);

  useEffect(() => {
    const partSize = partDensity;
    const numberOfParts = Math.ceil(value.length / partSize);
    const parts = [];
    for (let i = 0; i < value.length; i += partSize) {
      const part = value.substr(i, partSize);
      const partNumber = Math.ceil(i / partSize);
      const partData = {
        part: partNumber + 1,
        total: numberOfParts,
        data: part,
      };
      parts.push(partData);
    }
    setFileParts(parts);
  }, [value]);

  const handleScan = (data) => {
    const scannedData = JSON.parse(data);
    const hasPartBeenScanned = fileParts.some(
      (part) => part?.part === scannedData?.part
    );
    if (hasPartBeenScanned) return;
    const newFileParts = [...fileParts, scannedData];
    console.log("newFileParts", newFileParts.length);
    setFileParts(newFileParts);
  };

  useEffect(() => {
    const areAllPartsScanned = fileParts.length === fileParts[0]?.total;
    if (areAllPartsScanned && scanning) {
      const content = fileParts.reduce((acc, part) => acc + part.data, "");

      setValue(content);
      if (onScan) onScan(content);
      if (!scan) setScanning(false);
      setFileParts([]);
    }
  }, [fileParts]);

  const handleError = (err) => {
    console.error(err);
  };

  useEffect(() => {
    setTimeout(() => {
      if (isPlaying) {
        setSelectedPart(selectedPart + 1);
      }
    }, 1000);
  }, [isPlaying, selectedPart]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(
        value
    );
  };

  console.log({ value })

  return (
    <>
      {(!!true || !isQRMode) && (
        <Accordion
        expanded={isQRMode || scanning}
      >
        <AccordionSummary
        aria-controls="panel4bh-content"
        id="panel4bh-header"
      >
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label={"WebRTC offer"}
          name="webRTC"
          value={scanning ? 'Scanning...' : value}
          onChange={(e) => !scanning && setValue(e.target.value || "")}
          autoComplete="off"
          InputProps={{
            endAdornment: (
                <>
                {!!value && (
                  <>
                  <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={console.log}
                            edge="end"
                            >
                            <UploadIcon />
                            </IconButton>
                        </InputAdornment>
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={console.log}
                            edge="end"
                            >
                            <DownloadIcon />
                            </IconButton>
                        </InputAdornment>
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleCopyToClipboard()}
                      edge="end"
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </InputAdornment>
                  </>
              )}

              {!qr && !scan && (<InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    setIsQRMode(!isQRMode)
                    if (isQRMode) {
                      setScanning(false);
                    }
                }}
                  edge="end"
                >
                  <QrCode2Icon />
                </IconButton>
              </InputAdornment>)}
                </>
            ),
          }}
        />
      </AccordionSummary>
      <AccordionDetails>
      {!scanning && fileParts.length > 0 && (
            <div style={{ background: "white", padding: 20 }}>
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={JSON.stringify(fileParts?.[selectedPart]) || ""}
                viewBox={`0 0 256 256`}
              />
            </div>
          )}

          {scanning && (
            <QRReader
              id={`qrcode-reader-${fileParts?.length}`}
              key={`qrcode-reader-${fileParts?.length}`}
              className={classes.qrcodeReader}
              onError={handleError}
              onScan={(data) => {
                data && handleScan(data.text);
              }}
              constraints={{
                video: {
                  facingMode: "environment",
                },
              }}
            />
          )}
          {!qr && !scan && (<Button
            type="button"
            fullWidth
            variant="contained"
            onClick={() => {
                setFileParts([]);
                setScanning(!scanning)
            }}
            color={scanning ? "error" : "primary"}
          >
            {scanning ? ("Stop Scanning") : "Scan QR"}
          </Button>)}

          {!!back && (<Button
            type="button"
            fullWidth
            variant="contained"
            onClick={() => {
                back()
            }}
            color={scanning ? "error" : "primary"}
          >
            cancel
          </Button>)}

      {(!scanning && fileParts.length > 1) && (
              <>
                <Typography gutterBottom>Seek Part</Typography>
                <Slider
                  aria-label="select part"
                  defaultValue={0}
                  step={1}
                  marks
                  min={0}
                  max={fileParts.length - 1}
                  value={selectedPart}
                  valueLabelDisplay="auto"
                  onChange={(e, value) => {
                    setIsPlaying(false);
                    setSelectedPart(value);
                  }}
                />
      
                <IconButton
                  aria-label="delete"
                  size="large"
                  onClick={() => {
                    setIsPlaying(false);
                    setSelectedPart(selectedPart - 1);
                  }}
                >
                  <SkipPreviousIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  size="large"
                  // primary
                  color="primary"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <PauseIcon fontSize="inherit" />
                  ) : (
                    <PlayArrowIcon fontSize="inherit" />
                  )}
                </IconButton>
                <IconButton
                  aria-label="delete"
                  size="large"
                  onClick={() => {
                    setIsPlaying(false);
                    setSelectedPart(selectedPart + 1);
                  }}
                >
                  <SkipNextIcon fontSize="inherit" />
                </IconButton>

                {!!next && (<Button
                  type="button"
                  fullWidth
                  variant="contained"
                  onClick={() => {
                      next()
                  }}
                  color={scanning ? "error" : "primary"}
                >
                  next stage
                </Button>)}
              </>
            )}
      </AccordionDetails>
        </Accordion>
      )}

      
    </>
  );
};
