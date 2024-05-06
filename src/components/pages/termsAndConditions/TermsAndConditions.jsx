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

import React, { useEffect, useState, useRef } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ListComponent from "../../atomic/molecules/list/List";
import PageContainer from "../../atomic/organism/page-container/PageContainer";
import usePeer from "../../p2p/usePeer";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import LinkIcon from "@mui/icons-material/Link";
import QRReader from "react-qr-scanner";
import ConnectToPeer from "../../atomic/molecules/connect-to-peer/ConnectToPeer";
import { red } from "@mui/material/colors";
import Blockchain, { useBlockchain } from "../../blockchain/Blockchain";
import {
  compiler as profileCompiler,
  blockBuilders,
} from "../../blockchain/chains/profileChain";
import TermsAndConditions from "../../atomic/atom/termsAndConditions";

const useStyles = makeStyles((theme) => ({
  padding: {
    padding: 10,
  },
}));

export default function ContactsListPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const contacts = useSelector((state) => state.contacts) || [];

  const userProfileBlockchain = useSelector(
    (state) => state.userProfile.blockchain,
  );
  const { compiledBlockchain: userProfile } = useBlockchain({
    compiler: profileCompiler,
    blockchain: userProfileBlockchain,
  });
  const storedConnectionId = userProfile.connectionId;

  // const storedConnectionId = useSelector((state) => state.userProfile.connectionId);
  const storedPods = useSelector((state) => state.pods);
  const { activeConnections } = usePeer([]);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState("No result");
  // getlatest TermsAndConditions
  const LatestTermsAndConditions =
    TermsAndConditions[TermsAndConditions.length - 1]?.terms;

  return (
    <PageContainer
      headerProps={{
        title: "Terms and Conditions",
        backButton: true,
        menuProps: {
          icon: "more",
          items: [
            {
              text: "Profile",
              icon: "account",
              onClick: () => navigate("/profile"),
            },
            {
              text: "About",
              icon: "info",
              onClick: () =>
                (window.location = "https://positive-intentions.com"),
            },
          ],
        },
      }}
    >
      <LatestTermsAndConditions padding={20} />
    </PageContainer>
  );
}
