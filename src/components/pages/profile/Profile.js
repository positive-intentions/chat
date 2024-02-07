import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch, useStore } from "react-redux";
import {
  updateUsername,
  updatePeerId,
  updateAvatar,
  logout,
  setInAppNotification,
  setBrowserNotification,
  setEncryptionSignature,
  addToBlockchain,
} from "../../redux/slices/userProfileSlice";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../atomic/organism/page-container/PageContainer";
import Avatar from "@mui/material/Avatar";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
import JSZip from "jszip";
import FileSaver from "file-saver";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import SyncIcon from "@mui/icons-material/Sync";
import { useTranslation } from "react-i18next";

import Blockchain, { useBlockchain } from "../../blockchain/Blockchain";
import {
  compiler as profileCompiler,
  blockBuilders,
} from "../../blockchain/chains/profileChain";
import ConectToPeer from "../../atomic/molecules/connect-to-peer/ConnectToPeer";
import SignatureCanvas from "../../atomic/atom/signatureCanvas/SignatureCanvas";
import { useCryptography } from "../../cryptography/Cryptography";
import { logToNLevelAnalytics } from "../../utils/analytics";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    height: theme.spacing(8),
  },
  form: {
    padding: theme.spacing(3),
  },
  title: {
    fontWeight: "bold",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    height: "100%",
    padding: `0 ${theme.spacing(3)}`,
  },
  img: {
    width: "100%",
  },
  hidden: {
    display: "none",
  },
}));

export default function Profile({ qr }) {
  const dispatch = useDispatch();
  const { randomString } = useCryptography();
  const classes = useStyles();
  const { t } = useTranslation();
  const qrcodeRef = useRef(null);
  const inputRef = useRef(null);
  const store = useStore();
  // make it so the form submits and updates the username in redux and navigates to the conversations page
  // const [username, setUsername] = useState("");
  const [contactNamePreset, setContactNamePreset] = useState("");
  const navigate = useNavigate();
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
  useEffect(() => {
    logToNLevelAnalytics("profilePageLoaded");
  }, []);
  const userProfileBlockchain = useSelector(
    (state) => state.userProfile.blockchain,
  );
  const addToBlockchainDispatch = ({ block, blocks, storage }) =>
    dispatch(addToBlockchain({ block, blocks, storage }));
  const { compiledBlockchain: userProfile, addBlocks: addProfileBlocks } =
    useBlockchain({
      compiler: profileCompiler,
      blockchain: userProfileBlockchain,
      dispatch: addToBlockchainDispatch,
    });

  const storedConnectionId = userProfile.connectionId;
  const storedUsername = userProfile.displayName;
  const storeInAppNotication = userProfile?.settings?.inAppNotification;
  const storeBrowserNotication = userProfile?.settings?.browserNotification;
  const storedEncryptionSignature = userProfile.encryptionSignature;
  const storedAvatar = userProfile.avatar;

  // const storedUsername = useSelector((state) => state.userProfile.displayName);
  // const storedConnectionId = useSelector((state) => state.userProfile.id);
  // const storeInAppNotication = useSelector((state) => state.userProfile.inAppNotification)
  // const storeBrowserNotication = useSelector((state) => state.userProfile.browserNotification)
  // const storedAvatar = useSelector((state) => state.userProfile.avatar);
  const updateUsernameDispatch = (username) =>
    dispatch(updateUsername(username));
  const updateConnectionIdDispatch = (connectionId) =>
    dispatch(updatePeerId(connectionId));
  const updateAvatarDispatch = (avatar) => dispatch(updateAvatar(avatar));
  // const setInAppNotificationDispatch = (inAppNotification) => dispatch(setInAppNotification(inAppNotification));
  // const setBrowserNotificationDispatch = (browserNotification) => dispatch(setBrowserNotification(browserNotification));
  // const setEncryptionSignatureDispatch = (encryptionSignature) => dispatch(setEncryptionSignature(encryptionSignature));

  const addInappNotificationBlock = (e) => {
    const block = blockBuilders().updateInAppNotification({
      inAppNotification: e.target.checked,
    });
    console.log({ block });
    addProfileBlocks(block);
  };

  const addBrowserNotificationBlock = (e) => {
    const block = blockBuilders().updateBrowserNotification({
      browserNotification: e.target.checked,
    });
    addProfileBlocks(block);
  };

  const addEncryptionSignatureBlock = (newSignature) => {
    const block = blockBuilders().updateEncryptionSignature({
      encryptionSignature: newSignature,
    });
    addProfileBlocks(block);
  };

  const logoutDispatch = () => dispatch(logout());

  // const handleUsernameChange = (event) => {
  //   setUsername(event.target.value);
  // };

  useEffect(() => {
    if (qr && qrcodeRef.current) {
      qrcodeRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [qr]);

  const handleUsernameChange = (e) => {
    updateUsernameDispatch(e.target.value);
  };

  const handleContactNamePresetChange = (e) => {
    setContactNamePreset(e.target.value);
  };

  const handleConnectionIdChange = (e) => {
    updateConnectionIdDispatch(e.target.value);
  };

  const handleLogout = () => {
    logoutDispatch();
  };

  const handleAvatar = ({ target: { files } }) => {
    const f = files[0];
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > 300) {
          height *= 300 / width;
          width = 300;
        }
      } else {
        if (height > 300) {
          width *= 300 / height;
          height = 300;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
      const base64String = canvas.toDataURL("image/jpeg", 1.0);
      updateAvatarDispatch(base64String);
    };
    img.src = URL.createObjectURL(f);
  };

  const handleCopyConnectionIdToClipboard = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/#/login/${storedConnectionId}${contactNamePreset ? `/${contactNamePreset}` : ""}`,
    );
    // navigate(`/contacts/${storedConnectionId}`)
  };

  const inAppNotificationLocale = t("common.inAppNotification");
  const browserNotificationLocale = t("common.browserNotification");

  // const isSubmitDisabled = !username;
  const inAppNotifications = {
    fullWidth: true,
    inputProps: { "aria-label": "Allow in-app notification" },
    defaultChecked: storeInAppNotication,
    label: inAppNotificationLocale,
    onChange: addInappNotificationBlock,
  };
  const browserNotification = {
    fullWidth: true,
    inputProps: { "aria-label": "Allow browser notification" },
    defaultChecked: storeBrowserNotication,
    label: browserNotificationLocale,
    onChange: addBrowserNotificationBlock,
  };

  return (
    <PageContainer
      headerProps={{
        title: t("profilePage.pageTitle"),
        backButton: "/pods",
        // avatarProps: {
        //   src: storedAvatar,
        //   alt: "random"
        // },
        menuProps: {
          icon: "more",
          items: [
            {
              text: t("profilePage.logout"),
              icon: "logout",
              onClick: handleLogout,
            },
          ],
        },
      }}
    >
      {/* add an imagae at the top */}
      <Avatar
        src={storedAvatar}
        style={{ minHeight: "300px", minWidth: "300px", margin: "auto" }}
      />

      <form noValidate className={classes.form}>
        <Button
          type="button"
          fullWidth
          variant="contained"
          onClick={() => inputRef?.current?.click()}
        >
          {t("profilePage.changeAvatar")}
        </Button>
        <input
          type="file"
          ref={inputRef}
          className={classes.hidden}
          name="picture"
          accept="image/*"
          onChange={handleAvatar}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="displayName"
          label={t("profilePage.displayName")}
          name="displayName"
          defaultValue={storedUsername}
          onChange={handleUsernameChange}
        />

        <ConectToPeer qr={qr} />

        <Accordion
          expanded={expanded.includes("admin")}
          onChange={handleChange("admin")}
        >
          <AccordionSummary
            expandIcon={qr ? undefined : <ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ flexShrink: 0 }}>
              {t("profilePage.more")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="regenerateConnectionId"
              label={t("profilePage.regenerateConnectionId")}
              name="regenerateConnectionId"
              value={storedConnectionId}
              onChange={handleConnectionIdChange}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        handleConnectionIdChange({
                          target: { value: randomString() },
                        })
                      }
                      edge="end"
                    >
                      <SyncIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Accordion
              expanded={expanded.includes("notifications")}
              onChange={handleChange("notifications")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography sx={{ flexShrink: 0 }}>
                  {t("profilePage.preferences")}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  <FormControlLabel
                    control={<Switch {...inAppNotifications} />}
                    label={t("common.inAppNotification")}
                  />
                  <FormControlLabel
                    control={<Switch {...browserNotification} />}
                    label={t("common.browserNotification")}
                  />
                </FormGroup>
              </AccordionDetails>
            </Accordion>

            <br />

            <SignatureCanvas
              heading={t("components.cryptoSignature")}
              defaultValue={storedEncryptionSignature}
              onChange={addEncryptionSignatureBlock}
            />

            <br />

            <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={() => {
                const zip = new JSZip();
                zip.file("data.json", JSON.stringify(store.getState()));
                zip.generateAsync({ type: "blob" }).then(function (content) {
                  FileSaver.saveAs(content, "download.zip");
                });
              }}
            >
              {t("profilePage.backupProfile")}
            </Button>
          </AccordionDetails>
        </Accordion>
      </form>
    </PageContainer>
  );
}
