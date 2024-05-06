// import React, { useEffect, useState } from "react";
// import { makeStyles } from "@mui/styles";
// import AppBar from "@mui/material/AppBar";
// import Typography from "@mui/material/Typography";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import { useSelector, useDispatch } from "react-redux";
// import { Navigate, useNavigate, useParams } from "react-router-dom";
// import IconButton from "@mui/material/IconButton";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import AppHeader from "../../atomic/molecules/app-header/AppHeader";

// const useStyles = makeStyles((theme) => ({
//     appBar: {
//         height: theme.spacing(8),
//     },
//     menuButton: {
//         marginRight: theme.spacing(2),
//     },
//     title: {
//         fontWeight: "bold",
//         textAlign: "left",
//         display: "flex",
//         alignItems: "center",
//         height: "100%",
//         padding: `0 ${theme.spacing(3)}`,
//     },
//     avatar: {
//         width: `${theme.spacing(20)} !important`,
//         height: `${theme.spacing(20)} !important`,
//         margin: theme.spacing(3),
//     },
//     backButton: {
//         marginRight: theme.spacing(2),
//     },
//     details: {
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         padding: theme.spacing(3),
//     },
//     deleteButton: {
//         marginTop: theme.spacing(2),
//     },
// }));

// export default function ContactDetailsPage() {
//     const classes = useStyles();
//     const { contactId } = useParams();
//     const [contact, setContact] = useState({});
//     const navigate = useNavigate();

//     useEffect(() => {
//         // here you can make a call to your api to fetch the contact data
//         // setContact()
//         setContact({
//             id: contactId,
//             avatarUrl: "https://via.placeholder.com/150",
//             username: "Contact Username",
//             connectionId: "conn_12345",
//         });
//     }, [contactId]);

//     const handleDelete = () => {
//         console.log("Deleting contact: ", contactId);
//     };

//     const handleBackButtonClick = () => {
//         navigate(-1);
//     };

//     return (
//         <>
//             <AppHeader
//                 title="Contact Details"
//                 backButton
//             />
//             <div className={classes.details}>
//                 <Avatar className={classes.avatar} src={contact.avatarUrl} />
//                 <Typography variant="subtitle1">Username: {contact.username}</Typography>
//                 <Typography variant="subtitle1">Connection ID: {contact.connectionId}</Typography>
//                 <Button className={classes.deleteButton} variant="contained" color="secondary" onClick={() => {
//                     console.log("deleting contact", contact.id);
//                     //dispatch the delete action here
//                 }}>
//                     Delete Contact
//                 </Button>
//             </div>
//         </>
//     );
// }

import React, { useEffect, useState, useMemo, useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { updateUsername } from "../../redux/slices/userProfileSlice";
import {
  createNewPod,
  removeUserFromConversationFromAllPods,
  addToBlockchain,
} from "../../redux/slices/podsSlice";

import Blockchain, { useBlockchain } from "../../blockchain/Blockchain";
import { compiler as profileCompiler } from "../../blockchain/chains/profileChain";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../atomic/organism/page-container/PageContainer";
import Avatar from "@mui/material/Avatar";
import { useParams } from "react-router-dom";
import {
  removeContact,
  updateContactDisplayName,
} from "../../redux/slices/contactsSlice";
import usePeer from "../../p2p/usePeer";
import ConnectToPeer from "../../atomic/molecules/connect-to-peer/ConnectToPeer";
import ListComponent from "../../atomic/molecules/list/List";
import {
  compiler as podCompiler,
  blockBuilders,
} from "../../blockchain/chains/podChain";
// import Blockchain from "../../blockchain/Blockchain";
import { useTranslation } from "react-i18next";
import { useCryptography } from "cryptography/Cryptography";
import { CoachMark } from "react-coach-mark";

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
  button: {
    marginTop: `${theme.spacing(2)} !important`,
  },
}));

export default function Profile() {
  const { chance } = useCryptography();
  const classes = useStyles();
  const { t } = useTranslation();
  const { contactId } = useParams();
  const userProfileBlockchain = useSelector(
    (state) => state.userProfile.blockchain,
  );
  const addToBlockchainDispatch = (update) => dispatch(addToBlockchain(update));
  const { compiledBlockchain: userProfile, addBlocks: addBlocksToProfile } =
    useBlockchain({
      compiler: profileCompiler,
      blockchain: userProfileBlockchain,
      dispatch: addToBlockchainDispatch,
    });
  const userProfileId = userProfile.connectionId;
  // const userProfileId = useSelector((state) => state.userProfile.connectionId);
  const contacts = useSelector((state) => state.contacts);
  const contact = contacts.find(
    (contact) => contact.connectionId === contactId,
  );
  const { connectToPeer, sendMessage, activeConnections } = usePeer([
    contactId,
  ]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const removeContactDispatch = (contactId) =>
    dispatch(removeContact({ id: contactId }));
  const updateContactDisplayNameDispatch = (newDisplayName) =>
    dispatch(
      updateContactDisplayName({ id: contactId, displayName: newDisplayName }),
    );
  const createNewPodDispatch = (newPod) => dispatch(createNewPod(newPod));
  const removeUserFromConversationFromAllPodsDispatch = (userId) =>
    dispatch(removeUserFromConversationFromAllPods({ userId }));
  const [chatName, setChatName] = useState(chance.country({ full: true }));
  const isOnline = activeConnections.includes(contact?.connectionId);

  const podWithPeer = useSelector((state) =>
    state.pods.find((pod) => {
      const podBlockchain = new Blockchain({
        chain: pod?.blockchain?.chain ?? [],
        compiler: podCompiler,
        storage: pod?.blockchain?.storage ?? {},
      });

      const compiledBlockchain = podBlockchain.compile();

      return (
        compiledBlockchain?.users?.length === 2 &&
        compiledBlockchain.users.includes(contactId)
      );
    }),
  );

  const storedPods = useSelector((state) => state.pods);

  const { compiledBlockchains: compiledPods } = useBlockchain({
    compiler: podCompiler,
    blockchains: storedPods.map((pod) => pod.blockchain),
    dispatch: addToBlockchainDispatch,
  });

  const anyPodWithPeer = useSelector(
    (state) =>
      !!state.pods.find((pod) => {
        const podBlockchain = new Blockchain({
          chain: pod?.blockchain?.chain ?? [],
          compiler: podCompiler,
          storage: pod?.blockchain?.storage ?? {},
        });

        const compiledBlockchain = podBlockchain.compile();

        return compiledBlockchain.users.includes(contactId);
      }),
  );

  const handleAddPeerToGroup = (contact, pod) => {
    console.log({ contact, pod });
    const addNewUserBlocks = blockBuilders().addMember({
      userId: contact.connectionId,
    });

    const pendingUpdate = pod.addBlocks(addNewUserBlocks);
    const newPod = {
      ...pendingUpdate,
      ...pod,
    };

    const podBlockchain =
      storedPods.find((storedPod) => storedPod.id === pod.id)?.blockchain ?? [];

    sendMessage({ type: "addToBlockchain", payload: newPod });
    sendMessage({
      type: "addNewPod",
      payload: {
        id: pod.id,
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

  const numberOfPod = useSelector((state) => state.pods.length);

  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleConnectToPeer = () => {
    connectToPeer(contactId);
  };

  const handleCreateNewPod = () => {
    const podBlockchain = new Blockchain({
      chain: [],
      compiler: podCompiler,
      storage: {},
    });

    const newPodDetails = {
      id: Math.random().toString(36).slice(2),
      members: [contactId, userProfileId],
      name: chatName,
      avatar: "",
      from: userProfileId,
    };
    const newPodBlocks = blockBuilders().createPod(newPodDetails);
    podBlockchain.addBlocks(newPodBlocks);
    const pendingUpdate = podBlockchain.getUpdate();
    const newPod = { ...pendingUpdate, ...newPodDetails };
    createNewPodDispatch(newPod);

    sendMessage({ type: "addNewPod", payload: newPod }).then(() => {
      navigate(`/pod/${newPod.id}`);
    });
  };

  const handleRegisterNewDevice = () => {
    if (anyPodWithPeer) {
      compiledPods.forEach((pod) => {
        console.log({ pod });
        handleAddPeerToGroup(contact, pod);
      });
    } else {
      const podBlockchain = new Blockchain({
        chain: [],
        compiler: podCompiler,
        storage: {},
      });

      const newPodDetails = {
        id: Math.random().toString(36).slice(2),
        members: [contactId, userProfileId],
        name: chatName,
        avatar: "",
        from: userProfileId,
        clone: true,
      };
      const newPodBlocks = blockBuilders().createPod(newPodDetails);
      podBlockchain.addBlocks(newPodBlocks);
      const pendingUpdate = podBlockchain.getUpdate();
      const newPod = { ...pendingUpdate, ...newPodDetails };

      console.log({ compiledPods });

      // compiledPods.forEach((pod) => {
      //     console.log({ pod })
      //     handleAddPeerToGroup(contact, pod);
      // });

      sendMessage({ type: "addNewPod", payload: newPod }).then(
        ({ canCreateClone }) => {
          if (!canCreateClone) return;
          console.log({ canCreateClone });
          if (!anyPodWithPeer) createNewPodDispatch(newPod);
          return navigate(`/pod/${newPod.id}`);
        },
      );
    }
  };

  useEffect(() => {
    if (!contact) {
      handleConnectToPeer();
    }

    if (userProfileId === contactId) {
      navigate(-1);
      navigate("/profile");
    }
  }, [contact]);

  const handleUpdateContactDisplayName = (e) => {
    e.preventDefault();
    updateContactDisplayNameDispatch(e.target.value);
  };

  const [activatedNumber, setActivateNumber] = useState(null);
  const NextButton = (
    <Button
      variant="contained"
      color="primary"
      onClick={() => setActivateNumber(activatedNumber + 1)}
    >
      Next
    </Button>
  );
  const PrevButton = (
    <Button
      variant="contained"
      color="primary"
      onClick={() => setActivateNumber(activatedNumber - 1)}
    >
      Prev
    </Button>
  );

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const coachList = [
    {
      activate: true,
      component: (
        <Typography
          style={{
            color: "black",
          }}
        >
          Change the display name of the peers. it will be updated throughout
          the app. <br />
          {NextButton}{" "}
        </Typography>
      ),
      reference: ref1,
      tooltip: { position: "top" },
    },
    {
      activate: true,
      component: (
        <Typography
          style={{
            color: "black",
          }}
        >
          Create a new Pod with the peer
          <br />
          {PrevButton}
          {NextButton}{" "}
        </Typography>
      ),
      reference: ref2,
      tooltip: { position: "top" },
    },
    {
      activate: true,
      component: (
        <Typography
          style={{
            color: "black",
          }}
        >
          More technical details and configuration for the peer.
          <br />
          {PrevButton}
          {NextButton}{" "}
        </Typography>
      ),
      reference: ref3,
      tooltip: { position: "top" },
    },
  ];

  const coach = coachList[activatedNumber];

  return (
    <PageContainer
      headerProps={{
        title: contact ? contact.displayName : "New Peer",
        backButton: "/contacts",
        avatarProps: {
          src: contact ? contact.avatar : "",
          alt: "",
          isOnline,
        },
        customButtons: [
          {
            icon: "help",
            onClick: () => setActivateNumber(0),
          },
        ],
      }}
    >
      <CoachMark {...coach} />
      {/* add an imagae at the top */}
      <Avatar
        alt={contact ? contact.displayName : "requesting..."}
        src={contact ? contact.avatar : ""}
        style={{ minHeight: "300px", minWidth: "300px", margin: "auto" }}
      />

      <form noValidate className={classes.form}>
        {!contact && <ConnectToPeer link />}

        {!!contact && (
          <>
            <TextField
              ref={ref1}
              variant="outlined"
              margin="normal"
              fullWidth
              id="contactDisplayName"
              label={t("contactDetailsPage.contactDisplayName")}
              name="contactDisplayName"
              defaultValue={contact ? contact.displayName : ""}
              onChange={handleUpdateContactDisplayName}
            />

            {podWithPeer && (
              <ListComponent
                list={[
                  {
                    id: contact.id,
                    // name: `Go to pod with ${contact ? contact.displayName : ''}`,
                    name: t("contactDetailsPage.goToPodWith", {
                      displayName: contact ? contact.displayName : "",
                    }),
                    avatarUrl: contact ? contact.avatar : "",
                    onClick: () => navigate(`/pod/${podWithPeer.id}`),
                    isOnline,
                    unreadCount: podWithPeer?.unreadCount || 0,
                  },
                ]}
              />
            )}

            {!podWithPeer && (
              <Accordion
                ref={ref2}
                expanded={expanded === "panel4"}
                onChange={handleChange("panel4")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <Typography sx={{ flexShrink: 0 }}>
                    {t("contactDetailsPage.createNewPodWith", {
                      displayName: contact ? contact.displayName : "",
                    })}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="chatName"
                    label={t("contactDetailsPage.podName")}
                    name="chatName"
                    value={chatName}
                    onChange={(e) => setChatName(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              setChatName(`${chance.country({ full: true })}`)
                            }
                            edge="end"
                          >
                            <RefreshIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    type="button"
                    className={classes.button}
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={!chatName}
                    onClick={() => {
                      // removeContactDispatch(contact.id);
                      // createNewPodDispatch();
                      // navigate(-2);
                      handleCreateNewPod();
                    }}
                  >
                    {t("contactDetailsPage.createPod")}
                  </Button>
                </AccordionDetails>
              </Accordion>
            )}

            <Accordion
              ref={ref3}
              expanded={expanded === "advanced"}
              onChange={handleChange("advanced")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography sx={{ flexShrink: 0 }}>
                  {t("common.more")}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {!anyPodWithPeer && (
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    onClick={handleRegisterNewDevice}
                  >
                    {t("contactDetailsPage.registerNewDevice")}
                  </Button>
                )}

                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="peerId"
                  label={t("contactDetailsPage.peerId")}
                  name="peerId"
                  value={contact ? contact.id : ""}
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="connectionId"
                  label={t("contactDetailsPage.connectionId")}
                  name="connectionId"
                  value={contact ? contact.connectionId : ""}
                  InputProps={{
                    readOnly: true,
                  }}
                />

                {!!false && contact && (
                  <Button
                    type="button"
                    className={classes.button}
                    fullWidth
                    variant="contained"
                    color="error"
                    onClick={() => {
                      console.log("Deleting contact");
                      navigate("/contacts");
                      removeContactDispatch(contact.id);
                      removeUserFromConversationFromAllPodsDispatch(contact.id);
                    }}
                  >
                    {t("contactDetailsPage.blockContact")}
                  </Button>
                )}
              </AccordionDetails>
            </Accordion>
          </>
        )}
      </form>
    </PageContainer>
  );
}
