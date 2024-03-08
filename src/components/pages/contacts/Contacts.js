// import React, { useState } from "react";

// import {
//     Avatar,
//     Conversation,
//     ConversationHeader,
//     ConversationList,
//     InfoButton,
//     MainContainer,
//     MessageList,
//     Search,
//     Sidebar,
//     TypingIndicator,
//     VideoCallButton,
//     VoiceCallButton,
//     Message,
//     MessageInput,
//     ChatContainer,
//     MessageSeparator,
//     ExpansionPanel
// } from "@chatscope/chat-ui-kit-react";
// import IconButton from '@mui/material/IconButton';
// import AddIcon from '@mui/icons-material/Add';

// // import contacts to be displayed at the end of this list of contacts
// import { useSelector, useDispatch } from 'react-redux'

// import lillyIco from './logo192.png'
// import joeIco from './logo192.png'
// import emilyIco from './logo192.png'
// import kaiIco from './logo192.png'
// import akaneIco from './logo192.png'
// import eliotIco from './logo192.png'
// import zoeIco from './logo192.png'
// import patrikIco from './logo192.png'
// import { useNavigate, useParams } from "react-router-dom";
// // import for the creation of a new conversation
// import { createConversation } from '../../redux/slices/podsSlice'

// export default () => {
//     const [messageInputValue, setMessageInputValue] = useState("");
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const contacts = useSelector((state) => state.contacts.contacts);

//     // get the conversationId from the url if it is there with react-router-dom
//     const { conversationId } = useParams();

//     // handle the creation of a new conversation
//     const handleCreateConversation = () => {
//         dispatch(createConversation({
//             name: 'New Conversation',
//             messages: [],
//             id: Math.floor(Math.random() * 1000000)
//         }))
//     }

//     return (
//         <div style={{
//             height: "100vh",
//             position: "relative",
//             overflow: "none"
//         }}>
//                 <Search key={'search'} placeholder="Search..." style={{ margin: '10px' }}/>
//                 <ConversationList scrollable>
//                     {contacts.map((contact) => (
//                         <Conversation name={contact.name} lastSenderName={contact.name} info="Yes i can do it for you" onClick={() => navigate(`/contacts/${contact.id}`)} active={conversationId === contact.id}>
//                             <Avatar src={patrikIco} name={contact.name} status="available" />
//                         </Conversation>
//                     ))}

//                     <div style={{
//                         // position: "fixed",
//                         // bottom: "0",
//                         // left: "0",
//                         // right: "0",
//                         textAlign: "center",
//                         padding: "10px",
//                     }}>
//                         <IconButton style={{ background: '#2b6a9b', color: '#fff', zIndex: 1, }} aria-label="add" size="large" onClick={() => navigate('/contacts/add')}>
//                             <AddIcon />
//                         </IconButton>
//                         <IconButton style={{ background: '#2b6a9b', color: '#fff', zIndex: 1, }} aria-label="add" size="large" onClick={handleCreateConversation}>
//                             <AddIcon />
//                         </IconButton>
//                     </div>

//                 </ConversationList>
//         </div>
//     )
// }

import React, { useEffect, useState, useRef, useMemo } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeStyles, useTheme } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ListComponent from "../../atomic/molecules/list/List";
import PageContainer from "../../atomic/organism/page-container/PageContainer";
import usePeer from "../../p2p/usePeer.js";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import LinkIcon from "@mui/icons-material/Link";
import QRReader from "react-qr-scanner";
import { useNotification } from "../../notifications/notificationManager";
import Blockchain, { useBlockchain } from "../../blockchain/Blockchain";
import {
  compiler as profileCompiler,
  blockBuilders,
} from "../../blockchain/chains/profileChain";
import ConnectToPeer from "../../atomic/molecules/connect-to-peer/ConnectToPeer";
import { red } from "@mui/material/colors";
import { ColorModeContext } from "../../../App.tsx";
import { useTranslation } from "react-i18next";
import { logToNLevelAnalytics } from "../../../components/utils/analytics";
import { CoachMark } from "react-coach-mark";
import hipaintImage from "../../../../public/logo512.png";

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: theme.spacing(8),
  },
  title: {
    fontWeight: "bold",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    height: "100%",
    padding: `0 ${theme.spacing(3)}`,
  },
  chevron: {
    justifyContent: "right",
  },
  fab: {
    position: "absolute !important",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  hidden: {
    display: "none",
  },
  qrcodeReader: {
    height: "100vh",
    width: "100vw",
    top: 0,
    left: 0,
    position: "absolute",
    zIndex: 10000,
  },
  connect: {
    margin: `0 ${theme.spacing(2)}`,
  },
}));

export default function ContactsListPage({ headerOverride }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const sendNotification = useNotification();

  useEffect(() => {
    logToNLevelAnalytics("contactsPageLoaded");
  }, []);

  const navigate = useNavigate();
  const contacts = useSelector((state) => state.contacts) || [];
  // const storedConnectionId = useSelector((state) => state.userProfile.connectionId);
  const storedPods = useSelector((state) => state.pods);
  const { activeConnections } = usePeer([]);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState("No result");
  // const [deferredPrompt, setDeferredPrompt] = useState(null);

  // useEffect(() => {
  //     const handleBeforeInstallPromptEvent = (e) => {
  //         console.log('setting defferedPrompt')
  //         e.preventDefault();
  //         setDeferredPrompt(e);
  //     };
  //     window.addEventListener('beforeinstallprompt', handleBeforeInstallPromptEvent);

  //     const bipEvent = new Event('beforeinstallprompt');

  //     // Define the prompt method on the event object
  //     bipEvent.prompt = () => {
  //         return new Promise((resolve) => {
  //             // Simulate user accepting the prompt
  //             resolve({ outcome: 'accepted' });  // or 'dismissed' to simulate user dismissing the prompt
  //         });
  //     };

  //     // Dispatch the custom event to trigger your event handler
  //     window.dispatchEvent(bipEvent);
  //     return () => {
  //         window.removeEventListener('beforeinstallprompt', handleBeforeInstallPromptEvent);
  //     };
  // }, []);

  const contactsList = contacts.map((contact) => ({
    id: contact.id,
    name: contact.displayName,
    avatarUrl: contact.avatar,
    onClick: () => navigate(`/contact/${contact.connectionId}`),
    isOnline: activeConnections.includes(contact.connectionId),
  }));

  const handleScan = (data) => {
    if (!data?.text) return;
    data && setResult(data);
    data && navigate(data.text.replace(window.location.origin, ""));
  };
  const handleError = (err) => {
    console.error(err);
  };
  const previewStyle = {
    height: "100vh",
    width: "100vw",
    top: 0,
    left: 0,
    position: "absolute",
    zIndex: 10000,
  };

  const isInstalledPwa = useMemo(() => {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone ||
      document.referrer.includes("android-app://")
    );
  }, []);

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

  const coachList = [
    {
      activate: true,
      component: (
        <Typography
          style={{
            color: "black",
          }}
        >
          Share link or QR-code to connect to a peer and get started!
          <br />
          {NextButton}{" "}
        </Typography>
      ),
      reference: ref1,
      tooltip: { position: "top" },
    },
  ];

  const coach = coachList[activatedNumber];

  return (
    <PageContainer
      headerProps={{
        title: t("contactsPage.pageTitle"),
        backButton: storedPods.length > 0 ? "/pods" : false,
        backCount: storedPods.filter((pod) => pod.unreadCount > 0).length,
        // avatarProps: {
        //   src: "https://source.unsplash.com/random/400x200?login",
        //   alt: "random"
        // },
        // menuProps: {
        //   icon: 'account',
        //   items: [
        //     { text: 'Profile', icon: 'account', onClick: () => navigate('/profile') },
        //   ]
        // }
        customButtons: [
          {
            icon: "help",
            onClick: () => setActivateNumber(0),
          },
        ],
        menuProps: {
          icon: "more",
          items: [
            {
              text: t("components.menuItems.profile"),
              icon: "account",
              onClick: () => navigate("/profile"),
            },
            // { text: theme.palette.mode === 'dark' ? 'Light Mode' : 'Dark Mode', icon: theme.palette.mode === 'dark' ? 'lightMode' : 'darkMode', onClick: colorMode.toggleColorMode },
            // !isInstalledPwa ? { text: isFullScreen ? 'Exit Fullscreen' : 'Fullscreen', icon: isFullScreen ? 'fullscreenExit' : 'fullscreen', onClick: () => setIsFullScreen(!isFullScreen) } : null,
            // !isInstalledPwa ? {
            //     text: 'Install App', icon: 'install', onClick: () => {
            //         sendNotification?.('Requesting to install.', { variant: 'info' })

            //         if (deferredPrompt) {
            //             deferredPrompt.prompt()
            //                 .then((result) => {
            //                     if (result.outcome === 'accepted') {
            //                         console.log('Installation accepted');
            //                         sendNotification?.('👍 Install possible. Try from your browser settings.', { variant: 'success' })

            //                     } else {
            //                         console.log('Installation dismissed');
            //                         sendNotification?.('👎 Autoinstall dismissed. You can install through your browser.', { variant: 'warning' })

            //                     }
            //                 })
            //                 .catch((error) => {
            //                     console.error('Installation prompt error:', error);
            //                     sendNotification?.('👎 Autoinstall failed. You might be able to install through your browser.', { variant: 'warning' })

            //                 });
            //         } else {
            //             console.error('The beforeinstallprompt event has not been fired.');
            //             sendNotification?.('👎 Autoinstall failed. You might be able to install through your browser.', { variant: 'warning' })
            //         }
            //     }
            // } : null,
            // // { text: 'Language', icon: 'translate', onClick: () => navigate('/privacy'), subMenuItems: [
            // //     { text: 'English', onClick: () => navigate('/privacy') },
            // //     { text: 'Spanish', onClick: () => navigate('/privacy') },
            // //   ] },
            // { text: 'Terms', icon: 'document', onClick: () => navigate('/terms') },
            // { text: 'About', icon: 'info', onClick: () => window.location = 'https://positive-intentions.com' },
          ],
        },
        ...headerOverride,
      }}
      // speedDialProps={{
      //     actions: [
      //         { icon: <CameraAltIcon />, name: 'Camera', onClick: () => setScanning(true) },
      //         { icon: <QrCode2Icon />, name: 'QR code', onClick: () => navigate(`/profile/qr`) },
      //         { icon: <LinkIcon />, name: 'share link', onClick: () => navigator.clipboard.writeText(`${window.location.origin}/login/${storedConnectionId}`)},
      //     ],
      // }}
      //   fabProps={{
      //     icon: "add",
      //     onClick: () => {
      //       console.log("add clicked");
      //     }
      //   }}
    >
      {!scanning && (
        <ListComponent
          list={[
            ...contactsList,
            // { id: 1, name: "ally all 1", avatarUrl: 'https://source.unsplash.com/random/400x200?aaa', onClick: () => navigate(`/contact/1`) },
            // { id: 2, name: "bally ball 2", avatarUrl: 'https://source.unsplash.com/random/400x200?bbb', onClick: () => navigate(`/contact/2`) },
            // { id: 3, name: "cally call 3", avatarUrl: 'https://source.unsplash.com/random/400x200?ccc', onClick: () => navigate(`/contact/3`) },
            // { id: 4, name: "dally dall 4", avatarUrl: 'https://source.unsplash.com/random/400x200?ddd', onClick: () => navigate(`/contact/4`) },
            // { id: 5, name: "eally eall 5", avatarUrl: 'https://source.unsplash.com/random/400x200?eee', onClick: () => navigate(`/contact/5`) },
            // { id: 6, name: "fally fall 6", avatarUrl: 'https://source.unsplash.com/random/400x200?fff', onClick: () => navigate(`/contact/6`) },
            // { id: 7, name: "gally gall 7", avatarUrl: 'https://source.unsplash.com/random/400x200?ggg', onClick: () => navigate(`/contact/7`) },
            // { id: 8, name: "hally hall 8", avatarUrl: 'https://source.unsplash.com/random/400x200?hhh', onClick: () => navigate(`/contact/8`) },
            // { id: 9, name: "ially iall 9", avatarUrl: 'https://source.unsplash.com/random/400x200?iii', onClick: () => navigate(`/contact/9`) },
            // { id: 10, name: "jally jall 10", avatarUrl: 'https://source.unsplash.com/random/400x200?jjj', onClick: () => navigate(`/contact/10`) },
            // { id: 11, name: "kally kall", avatarUrl: 'https://source.unsplash.com/random/400x200?aaa', onClick: () => navigate(`/contact/11`) },
            // { id: 12, name: "lally lall", avatarUrl: 'https://source.unsplash.com/random/400x200?bbb', onClick: () => navigate(`/contact/12`) },
            // { id: 13, name: "mally mall", avatarUrl: 'https://source.unsplash.com/random/400x200?ccc', onClick: () => navigate(`/contact/13`) },
            // { id: 14, name: "nally nall", avatarUrl: 'https://source.unsplash.com/random/400x200?ddd', onClick: () => navigate(`/contact/14`) },
            // { id: 15, name: "oally oall", avatarUrl: 'https://source.unsplash.com/random/400x200?eee', onClick: () => navigate(`/contact/15`) },
            // { id: 16, name: "pally pall", avatarUrl: 'https://source.unsplash.com/random/400x200?fff', onClick: () => navigate(`/contact/16`) },
            // { id: 17, name: "qally qall", avatarUrl: 'https://source.unsplash.com/random/400x200?ggg', onClick: () => navigate(`/contact/17`) },
            // { id: 18, name: "rally rall", avatarUrl: 'https://source.unsplash.com/random/400x200?hhh', onClick: () => navigate(`/contact/18`) },
            // { id: 19, name: "sally sall", avatarUrl: 'https://source.unsplash.com/random/400x200?iii', onClick: () => navigate(`/contact/19`) },
            // { id: 20, name: "tally tall", avatarUrl: 'https://source.unsplash.com/random/400x200?jjj', onClick: () => navigate(`/contact/20`) },
            // { id: 21, name: "ually uall", avatarUrl: 'https://source.unsplash.com/random/400x200?aaa', onClick: () => navigate(`/contact/21`) },
            // { id: 22, name: "vally vall", avatarUrl: 'https://source.unsplash.com/random/400x200?bbb', onClick: () => navigate(`/contact/22`) },
            // { id: 23, name: "wally wall", avatarUrl: 'https://source.unsplash.com/random/400x200?ccc', onClick: () => navigate(`/contact/23`) },
            // { id: 24, name: "xally xall", avatarUrl: 'https://source.unsplash.com/random/400x200?ddd', onClick: () => navigate(`/contact/24`) },
            // { id: 25, name: "yally yall", avatarUrl: 'https://source.unsplash.com/random/400x200?eee', onClick: () => navigate(`/contact/25`) },
            // { id: 26, name: "zally zall", avatarUrl: 'https://source.unsplash.com/random/400x200?fff', onClick: () => navigate(`/contact/26`) },
            // { id: 27, name: "ally all 27", avatarUrl: 'https://source.unsplash.com/random/400x200?ggg', onClick: () => navigate(`/contact/27`) },
            // { id: 28, name: "bally ball 28", avatarUrl: 'https://source.unsplash.com/random/400x200?hhh', onClick: () => navigate(`/contact/28`) },
          ]}
        />
      )}
      <CoachMark {...coach} />
      <Avatar
          src={hipaintImage}
        style={{ minHeight: "300px", minWidth: "300px", margin: "auto" }}
      />

      <div ref={ref1} className={classes.connect}>
        <ConnectToPeer
          open={!contactsList.length}
          link={!contactsList.length}
        />
      </div>

      {scanning && (
        <QRReader
          delay={100}
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
    </PageContainer>
  );
}
