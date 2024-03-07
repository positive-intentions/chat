import React, { useState, useRef, useEffect } from "react";
import {
  updateUsername,
  updatePeerId,
  updateAvatar,
  logout,
  setInAppNotification,
  setBrowserNotification,
} from "../../../redux/slices/userProfileSlice";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QRCode from "react-qr-code";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useSelector, useDispatch, useStore } from "react-redux";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import { useNavigate, useParams } from "react-router-dom";
import Blockchain, { useBlockchain } from "../../../blockchain/Blockchain";
import {
  compiler as profileCompiler,
  blockBuilders,
} from "../../../blockchain/chains/profileChain";
import { useTranslation } from "react-i18next";

import QRReader from "react-qr-scanner";

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

const ConnectToPeer = ({ qr, open, link, collapse }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contactId } = useParams();
  const [result, setResult] = useState("No result");
  const [scanning, setScanning] = useState(false);

  const qrcodeRef = useRef(null);
  const [expanded, setExpanded] = React.useState([]);
  const handleChange = (panel) => (event, isExpanded) => {
    if (isExpanded) {
      setExpanded((prevExpanded) => [...prevExpanded, panel]);
    } else {
      setExpanded((prevExpanded) =>
        prevExpanded.filter((item) => item !== panel),
      );
    }
  };
  const [contactNamePreset, setContactNamePreset] = useState("");
  const [peerLink, setPeerLink] = useState("");

  const storedBlockchain = useSelector((state) => state.userProfile.blockchain);
  const { compiledBlockchain: compiledProfile } = useBlockchain({
    compiler: profileCompiler,
    blockchain: storedBlockchain,
  });
  // const storedConnectionId = useSelector((state) => state.userProfile.id);
  const storedConnectionId = compiledProfile.connectionId;
  const updateConnectionIdDispatch = (connectionId) =>
    dispatch(updatePeerId(connectionId));

  const handleConnectionIdChange = (e) => {
    updateConnectionIdDispatch(e.target.value);
  };

  const handlePeerLinkChange = (e) => {
    const value = e.target.value;
    const previousValue = extractIDFromLink(peerLink) || "";

    // Check if more than 2 characters have changed
    const isPasted =
      Math.abs(extractIDFromLink(value)?.length - previousValue.length) > 2;

    if (isPasted) {
      // Call a different function for paste event
      setPeerLink(value);
      handlePeerLinkConnect(value);
    } else {
      // Call the regular function for other change events
      setPeerLink(value);
    }
  };

  function extractIDFromLink(link) {
    // Regular expression pattern to extract the ID
    const pattern = /(login|contact)\/(\w+)/;

    // Extracting the ID using the pattern
    const match = link.match(pattern);

    // If a match is found, return the ID
    if (match && match.length > 2) {
      return match[2];
    }

    // If no match is found, return null or handle the error as desired
    return null;
  }

  const handlePeerLinkConnect = (link) => {
    const peerLink = link || peerLink || "";
    if (
      !extractIDFromLink(peerLink) ||
      extractIDFromLink(peerLink) === storedConnectionId
    ) {
      return;
    }
    if (collapse) {
      setExpanded([]);
    } else {
      navigate(`/login/${extractIDFromLink(peerLink)}`);
    }
  };

  const handleCopyConnectionIdToClipboard = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/#/login/${storedConnectionId}${contactNamePreset ? `/${contactNamePreset}` : ""}`,
    );
  };

  const handleScan = (data) => {
    if (!data?.text) return;
    data && setResult(data);
    const peerLink = new URL(data.text)?.hash?.split?.('/')[2];
    peerLink && navigate(`/login/${peerLink}`);

    if (collapse) {
      setExpanded([]);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  return (
    <Accordion
      expanded={expanded.includes("share-panel") || qr || open || link}
      onChange={qr || open || link ? undefined : handleChange("share-panel")}
    >
      <AccordionSummary
        expandIcon={!!qr || open || link ? undefined : <ExpandMoreIcon />}
        aria-controls="panel4bh-content"
        id="panel4bh-header"
      >
        <Typography sx={{ flexShrink: 0 }}>
          {t("components.connectToPeer.connectToPeer")}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Accordion
          expanded={expanded.includes("share-link") || link}
          onChange={handleChange("share-link")}
        >
          <AccordionSummary
            expandIcon={link ? undefined : <ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography noWrap sx={{ flexShrink: 0 }}>
              {t("components.connectToPeer.shareLink")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="contactNamePreset"
                  label="Set contact name"
                  name="contactNamePreset"
                  defaultValue={contactNamePreset}
                  onChange={handleContactNamePresetChange}
                /> */}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="connectionId"
              label={t("components.connectToPeer.shareToConnect")}
              name="connectionId"
              value={`${window.location.origin}/#/login/${storedConnectionId}${contactNamePreset ? `/${contactNamePreset}` : ""}`}
              onChange={handleConnectionIdChange}
              InputProps={{
                readOnly: true,
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

            {!contactId && (
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                color={
                  extractIDFromLink(peerLink) &&
                  extractIDFromLink(peerLink) !== storedConnectionId
                    ? "primary"
                    : "error"
                }
                id="connectionId"
                label={t("components.connectToPeer.enterLink")}
                name="connectionId"
                value={peerLink}
                autoComplete="off"
                onChange={handlePeerLinkChange}
                onKeyPress={(ev) => {
                  if (ev.key === "Enter" && !ev.shiftKey) {
                    ev.preventDefault();
                    handlePeerLinkConnect();
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handlePeerLinkConnect}
                        edge="end"
                        disabled={
                          !peerLink ||
                          extractIDFromLink(peerLink) === storedConnectionId
                        }
                        color={
                          peerLink
                            ? extractIDFromLink(peerLink) &&
                              extractIDFromLink(peerLink) !== storedConnectionId
                              ? "primary"
                              : "error"
                            : "default"
                        }
                      >
                        <ConnectWithoutContactIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded.includes("panel4") || qr}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={qr ? undefined : <ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ flexShrink: 0 }}>
              {t("components.connectToPeer.shareQr")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ background: "white" }}>
            {!scanning && (
              <QRCode
                ref={qrcodeRef}
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={`${window.location.origin}/#/login/${storedConnectionId}`}
                viewBox={`0 0 256 256`}
              />
            )}

            {scanning && (
              <QRReader
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
                : t("components.connectToPeer.scanQr")}
            </Button>
          </AccordionDetails>
        </Accordion>
      </AccordionDetails>
    </Accordion>
  );
};

export default ConnectToPeer;
