import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
// import { updateUsername } from "../../redux/slices/userProfileSlice";
import {
  updatePodName,
  addUserToPod,
  removeFileFromPod,
} from "../../redux/slices/podsSlice";
import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "../../atomic/organism/page-container/PageContainer";
import Avatar from "@mui/material/Avatar";
import ListComponent from "../../atomic/molecules/list/List";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Blockchain, { useBlockchain } from "../../blockchain/Blockchain";
import {
  compiler as profileCompiler,
  blockBuilders,
} from "../../blockchain/chains/profileChain";
import usePeer from "../../p2p/usePeer";

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
}));

export default function File() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { podId, fileId } = useParams();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const podDetails = useSelector((state) =>
    state.pods.find((pod) => pod.id === podId),
  );
  const contacts = useSelector((state) => state.contacts);
  const updatePodNameDispatch = (podName) => dispatch(updatePodName(podName));
  const addUserToPodDispatch = (userId) =>
    dispatch(addUserToPod({ podId, userId }));
  const removeFileFromPodDispatch = () =>
    dispatch(removeFileFromPod({ podId, fileId }));

  const userProfileBlockchain = useSelector(
    (state) => state.userProfile.blockchain,
  );
  const { compiledBlockchain: userProfile } = useBlockchain({
    compiler: profileCompiler,
    blockchain: userProfileBlockchain,
  });
  const storedConnectionId = userProfile.connectionId;
  // const storedConnectionId = useSelector((state) => state.userProfile.id);
  const { sendMessage, connectToPeer, activeConnections } = usePeer(
    podDetails?.members || [],
  );

  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handlePodNameChange = (e) => {
    updatePodNameDispatch({ podId, name: e.target.value });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const membersList = podDetails.members
    // filter out my connection id
    .filter((member) => member !== storedConnectionId)
    .map((member) => {
      const contact = contacts.find((contact) => contact.id === member);
      if (!contact) connectToPeer(member);
      return contact
        ? {
            id: contact.id,
            name: contact.displayName,
            avatarUrl: contact.avatar,
            onClick: () => navigate(`/contact/${contact.connectionId}`),
            isOnline: activeConnections.includes(member),
          }
        : {
            id: member,
            name: "connecting...",
            avatarUrl: "https://source.unsplash.com/random/400x200?login",
            onClick: () => navigate(`/contact/${member}`),
          };
    });

  const contactsThatCanBeAdded = contacts
    .filter((contact) => !podDetails.members.includes(contact.id))
    .map((contact) => {
      return {
        id: contact.id,
        name: contact.displayName,
        avatarUrl: contact.avatar,
        onClick: () => {
          console.log("adding user to pod");
          sendMessage({
            type: "addNewPod",
            recipients: [contact.id],
            payload: {
              ...podDetails,
              members: [...podDetails.members, contact.id],
            },
          }).then(() => {
            addUserToPodDispatch(contact.id);
          });

          sendMessage({
            type: "addUserToPod",
            recipients: podDetails.members,
            payload: {
              podId,
              userId: contact.id,
            },
          });
        },
      };
    });

  function calculateSize(sizeInBytes) {
    const suffixes = ["B", "KB", "MB", "GB"];
    let size = sizeInBytes;
    let suffixIndex = 0;

    while (size >= 1024 && suffixIndex < suffixes.length - 1) {
      size /= 1024;
      suffixIndex++;
    }

    return `${size.toFixed(2)} ${suffixes[suffixIndex]}`;
  }

  function calculateSizeFromBase64(base64String = "") {
    const paddingFactor = base64String.endsWith("==")
      ? 2
      : base64String.endsWith("=")
        ? 1
        : 0;
    const decodedSize = (base64String.length / 4) * 3 - paddingFactor;

    const suffixes = ["B", "KB", "MB", "GB"];
    let size = decodedSize;
    let suffixIndex = 0;

    while (size >= 1024 && suffixIndex < suffixes.length - 1) {
      size /= 1024;
      suffixIndex++;
    }

    return `${size.toFixed(2)} ${suffixes[suffixIndex]}`;
  }

  const attachment = useSelector(
    (state) =>
      state.pods.find((pod) => pod.id === podId)?.blockchain?.storage[fileId],
  );

  if (!attachment) return "no file found";

  const santizedAttachmentSrc = (attachment) => {
    const urlRegex = new RegExp(
      "^(http|https)://[a-zA-Z0-9-.]+.[a-zA-Z]{2,3}(/S*)?$",
    );
    const base64Regex = new RegExp(
      "data:image/([a-zA-Z]*);base64,([a-zA-Z0-9+/=]*)",
    );

    if (urlRegex.test(attachment)) {
      return attachment;
    } else if (base64Regex.test(attachment)) {
      return attachment;
    } else {
      return "";
    }
  }


  return (
    <PageContainer
      headerProps={{
        title: attachment?.name,
        backButton: `/pod/${podId}`,
        avatarProps: {
          src: attachment?.type === "image" ? attachment?.data : "",
          alt: "random",
        },
      }}
    >
      {/* add an imagae at the top */}
      {attachment?.type === "image" && (
        <img
          alt={"Remy Sharp"}
          src={santizedAttachmentSrc(attachment?.data)}
          style={{ width: "100vw" }}
        />
      )}

      <form noValidate className={classes.form}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="fileName"
          label="Filename"
          name="fileName"
          value={attachment?.name}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="filseSize"
          label="File size"
          name="fileSize"
          value={calculateSizeFromBase64(attachment?.data)}
          InputProps={{
            readOnly: true,
          }}
        />

        <Accordion
          expanded={expanded === "advanced"}
          onChange={handleChange("advanced")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ flexShrink: 0 }}>Advanced</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="sha"
              label="File SHA"
              name="sha"
              value={attachment?.sha}
              InputProps={{
                readOnly: true,
              }}
            />

            <Button
              type="button"
              fullWidth
              variant="contained"
              color="error"
              onClick={() => {
                navigate(`/pod/${podId}/files`);
                console.log("deleting file");
                removeFileFromPodDispatch();
                // updateUsernameDispatch("");
              }}
            >
              Delete file
            </Button>
          </AccordionDetails>
        </Accordion>

        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => {
            console.log("downloading file");
            const element = document.createElement("a");

            const isBase64 = attachment?.data.startsWith("data:");
            element.href = isBase64 && attachment?.data; // URL.createObjectURL(file);
            element.download = attachment?.name;
            document.body.appendChild(element);
            element.click();
          }}
        >
          Download
        </Button>
      </form>
    </PageContainer>
  );
}
