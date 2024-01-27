import React, { useState, useEffect } from "react";
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
  removePod,
  addToBlockchain,
} from "../../redux/slices/podsSlice";
import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "../../atomic/organism/page-container/PageContainer";
import Avatar from "@mui/material/Avatar";
import ListComponent from "../../atomic/molecules/list/List";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Accordion from "@mui/material/Accordion";
import ConnectToPeer from "../../atomic/molecules/connect-to-peer/ConnectToPeer";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Blockchain, { useBlockchain } from "../../blockchain/Blockchain";
import { compiler as profileCompiler } from "../../blockchain/chains/profileChain";
import {
  compiler as podCompiler,
  blockBuilders,
} from "../../blockchain/chains/podChain";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";

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

export default function Profile() {
  const classes = useStyles();
  const [t] = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { podId } = useParams();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const podDetails = useSelector((state) =>
    state.pods.find((pod) => pod.id === podId),
  );
  const contacts = useSelector((state) => state.contacts);
  const podBlockchain = useSelector(
    (state) => state.pods.find((pod) => pod.id === podId).blockchain,
  );
  const updatePodNameDispatch = (podName) => dispatch(updatePodName(podName));
  const addUserToPodDispatch = (userId) =>
    dispatch(addUserToPod({ podId, userId }));
  const removePodDispatch = (podId) => dispatch(removePod(podId));

  const userProfileBlockchain = useSelector(
    (state) => state.userProfile.blockchain,
  );
  const addToBlockchainDispatch = ({ blocks, block, storage }) =>
    dispatch(addToBlockchain({ podId, blocks, block, storage, append: true }));
  const { compiledBlockchain: userProfile } = useBlockchain({
    compiler: profileCompiler,
    blockchain: userProfileBlockchain,
  });
  const storedConnectionId = userProfile.connectionId;
  // const storedConnectionId = useSelector((state) => state.userProfile.id);

  // create pod blockchain with dispatch
  const { compiledBlockchain: compiledPodBlockchain, addBlocks: addPodBlocks } =
    useBlockchain({
      compiler: podCompiler,
      blockchain: podBlockchain,
      storage: podBlockchain.storage,
      dispatch: addToBlockchainDispatch,
    });

  const { sendMessage, connectToPeer, activeConnections } = usePeer(
    podDetails?.members || [],
  );

  useEffect(() => {
    console.log({ compiledPodBlockchain });
    // memebers not connected to
    const membersNotConnectedTo = compiledPodBlockchain.users.filter(
      (userId) =>
        !contacts.map((contact) => contact.connectionId).includes(userId),
    );
    // connect to members not connected to
    membersNotConnectedTo.forEach((member) => {
      connectToPeer(member);
    });
  }, [compiledPodBlockchain?.users]);

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

  const membersList = compiledPodBlockchain?.users
    .filter((member) => member !== storedConnectionId)
    .map((member) =>
      contacts.find((contact) => contact.connectionId === member),
    )
    .filter((contact) => contact)
    .map((contact) => ({
      id: contact.id,
      name: contact.displayName,
      avatarUrl: contact.avatar,
      onClick: () => navigate(`/contact/${contact.connectionId}`),
      isOnline: activeConnections.includes(contact.connectionId),
    }));

  const contactsThatCanBeAdded = contacts
    .filter(
      (contact) => !compiledPodBlockchain.users.includes(contact.connectionId),
    )
    .filter((contact) => activeConnections.includes(contact.connectionId))
    .map((contact) => {
      return {
        id: contact.id,
        name: contact.displayName,
        avatarUrl: contact.avatar,
        isOnline: activeConnections.includes(contact.connectionId),
        onClick: () => {
          handleAddPeerToGroup(contact);
          // console.log('adding user to pod')
          // sendMessage({
          //     type: 'addNewPod',
          //     recipients: [contact.id],
          //     payload: {
          //         ...podDetails,
          //         members: [...podDetails.members, contact.id],
          //     }
          // }).then(() => {
          //     addUserToPodDispatch(contact.id)
          // });

          // sendMessage({
          //     type: 'addUserToPod',
          //     recipients: podDetails.members,
          //     payload: {
          //         podId,
          //         userId: contact.id,
          //     }
          // })
        },
      };
    });

  const handleAddPeerToGroup = (contact) => {
    const addNewUserBlocks = blockBuilders().addMember({
      userId: contact.connectionId,
    });

    const pendingUpdate = addPodBlocks(addNewUserBlocks);
    const newPod = {
      ...pendingUpdate,
      ...compiledPodBlockchain,
    };

    sendMessage({ type: "addToBlockchain", payload: newPod });
    sendMessage({
      type: "addNewPod",
      payload: {
        id: podId,
        pendingBlocks: [...podBlockchain.chain, ...pendingUpdate.pendingBlocks],
        pendingStorage: {
          ...podBlockchain.storage,
          ...pendingUpdate.pendingStorage,
        },
      },
      recipients: [contact.connectionId],
    });
    // .then(() => {
    //     navigate(`/pod/${newPod.id}`);
    // });
  };

  return (
    <PageContainer
      headerProps={{
        title: podDetails.name,
        backButton: `/pod/${podId}`,
        avatarProps: {
          src: "https://source.unsplash.com/random/400x200?login",
          alt: "random",
        },
      }}
    >
      {/* add an imagae at the top */}
      <Avatar
        alt={"Remy Sharp"}
        src={"https://source.unsplash.com/random/400x200?login"}
        sx={{ height: "70vw", width: "70vw", margin: "auto" }}
      />

      <form noValidate className={classes.form}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="podName"
          label={t("podDetailsPage.podName")}
          name="podName"
          defaultValue={podDetails.name}
          onChange={handlePodNameChange}
        />
        <ListComponent list={[...membersList]} />

        {/* <Button
                    type="button"
                    fullWidth
                    sx={{ mb: 2 }}
                    variant="contained"
                    color="primary"
                    onClick={handleMenu}
                >
                    add peer to group
                </Button>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {contactsThatCanBeAdded.map((contact) => {
                        return (
                            <MenuItem onClick={contact.onClick}>{contact.name}</MenuItem>
                        )
                    })}
                </Menu> */}

        {contactsThatCanBeAdded.length > 0 && (
          <Accordion
            expanded={expanded === "addpeer"}
            onChange={handleChange("addpeer")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              sx={{
                "& .MuiAccordionSummary-content": {
                  overflow: "hidden",
                },
              }}
            >
              <Typography
                component="div"
                style={{
                  flexGrow: 1,
                  flexShrink: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  marginRight: "8px", // Providing space between the text and the icon
                }}
              >
                {t("podDetailsPage.addExistingPeerToPod")}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <ListComponent
                chevronOverride={<AddIcon />}
                list={[...contactsThatCanBeAdded]}
              />
            </AccordionDetails>
          </Accordion>
        )}

        <ConnectToPeer collapse />

        <Accordion
          expanded={expanded === "advanced"}
          onChange={handleChange("advanced")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ flexShrink: 0 }}>{t("common.more")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="podID"
              label={t("podDetailsPage.podId")}
              name="podID"
              value={podDetails.id}
              InputProps={{
                readOnly: true,
              }}
            />

            {!!false && (
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="error"
                onClick={() => {
                  console.log("leaving and deleting pod");
                  navigate(-2);
                  removePodDispatch({ podId });
                  // updateUsernameDispatch("");
                }}
              >
                Leave Pod
              </Button>
            )}
          </AccordionDetails>
        </Accordion>
      </form>
    </PageContainer>
  );
}
