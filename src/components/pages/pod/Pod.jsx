// import React, { useEffect, useState } from "react";
// // import {
// //     Avatar,
// //     Conversation,
// //     ConversationHeader,
// //     ConversationList,
// //     InfoButton,
// //     MainContainer,
// //     MessageList,
// //     Search,
// //     Sidebar,
// //     TypingIndicator,
// //     VideoCallButton,
// //     VoiceCallButton
// // } from "@chatscope/chat-ui-kit-react";
// // import { Message, MessageInput, ChatContainer, MessageSeparator, MessageSeparator } from "@chatscope/chat-ui-kit-react";

// //import all @chatscope/chat-ui-kit-react" dependencies in multiline
// import {
//   Avatar,
//   Conversation,
//   ConversationHeader,
//   ConversationList,
//   InfoButton,
//   MainContainer,
//   MessageList,
//   // Search,
//   Sidebar,
//   TypingIndicator,
//   VideoCallButton,
//   VoiceCallButton,
//   Message,
//   MessageInput,
//   ChatContainer,
//   MessageSeparator,
//   ExpansionPanel,
//   EllipsisButton
// } from "@chatscope/chat-ui-kit-react";

// import lillyIco from './logo192.png'
// import joeIco from './logo192.png'
// import emilyIco from './logo192.png'
// import kaiIco from './logo192.png'
// import akaneIco from './logo192.png'
// import eliotIco from './logo192.png'
// import zoeIco from './logo192.png'
// import patrikIco from './logo192.png'
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector } from 'react-redux'
// import usePeer from "../../p2p/usePeer";
// import { createConversation } from "../../redux/slices/podsSlice";
// import AppHeader from "../../atomic/molecules/app-header/AppHeader";
// import { styled, alpha } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import InputBase from '@mui/material/InputBase';
// import Badge from '@mui/material/Badge';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import MailIcon from '@mui/icons-material/Mail';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import MoreIcon from '@mui/icons-material/MoreVert';
// import Container from '@mui/material/Container';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

// export default () => {
//   const [messageInputValue, setMessageInputValue] = useState("");
//   const [toggleInfo, setToggleInfo] = useState(false);
//   const navigate = useNavigate();
//   const { conversationId } = useParams();
//   const conversation = useSelector((state) => state.conversations.find((c) => {
//     return c.id == conversationId
//   }));
//   const contact = useSelector((state) => state.contacts.contacts.find((c) => c.id === conversationId));

//   const { sendMessage } = usePeer({ peerId: conversationId });

//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
//     React.useState(null);

//   const isMenuOpen = Boolean(anchorEl);
//   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMobileMenuClose = () => {
//     setMobileMoreAnchorEl(null);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     handleMobileMenuClose();
//   };

//   const handleMobileMenuOpen = (event) => {
//     setMobileMoreAnchorEl(event.currentTarget);
//   };

//   const menuId = 'primary-search-account-menu';
//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     >
//       <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
//       <MenuItem onClick={handleMenuClose}>My account</MenuItem>
//     </Menu>
//   );

//   const mobileMenuId = 'primary-search-account-menu-mobile';
//   const renderMobileMenu = (
//     <Menu
//       anchorEl={mobileMoreAnchorEl}
//       anchorOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       id={mobileMenuId}
//       keepMounted
//       transformOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       open={isMobileMenuOpen}
//       onClose={handleMobileMenuClose}
//     >
//       <MenuItem>
//         <IconButton size="large" aria-label="show 4 new mails" color="inherit">
//           <Badge badgeContent={4} color="error">
//             <MailIcon />
//           </Badge>
//         </IconButton>
//         <p>Messages</p>
//       </MenuItem>
//       <MenuItem>
//         <IconButton
//           size="large"
//           aria-label="show 17 new notifications"
//           color="inherit"
//         >
//           <Badge badgeContent={17} color="error">
//             <NotificationsIcon />
//           </Badge>
//         </IconButton>
//         <p>Notifications</p>
//       </MenuItem>
//       <MenuItem onClick={handleProfileMenuOpen}>
//         <IconButton
//           size="large"
//           aria-label="account of current user"
//           aria-controls="primary-search-account-menu"
//           aria-haspopup="true"
//           color="inherit"
//         >
//           <AccountCircle />
//         </IconButton>
//         <p>Profile</p>
//       </MenuItem>
//     </Menu>
//   );

//   // useEffect(() => {
//   //     if (!conversation) {
//   //         createConversation({ id: conversationId, messages: [] });
//   //     }
//   // }, [conversation]);

//   // return (
//   //     <div style={{
//   //         height: "100vh",
//   //         position: "relative",
//   //         overflow: "none"
//   //     }}>

//   //         <MainContainer responsive>
//   //             {/* <Sidebar position="left" scrollable={true}> */}
//   //                 {/* <ConversationList scrollable>
//   //                 <Search placeholder="Search..." style={{ margin: '10px' }}/>
//   //                 <Conversation name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you">
//   //                     <Avatar src={lillyIco} name="Lilly" status="available" />
//   //                 </Conversation>

//   //                 <Conversation name="Joe" lastSenderName="Joe" info="Yes i can do it for you">
//   //                     <Avatar src={joeIco} name="Joe" status="dnd" />
//   //                 </Conversation>

//   //                 <Conversation name="Emily" lastSenderName="Emily" info="Yes i can do it for you" unreadCnt={3}>
//   //                     <Avatar src={emilyIco} name="Emily" status="available" />
//   //                 </Conversation>

//   //                 <Conversation name="Kai" lastSenderName="Kai" info="Yes i can do it for you" unreadDot>
//   //                     <Avatar src={kaiIco} name="Kai" status="unavailable" />
//   //                 </Conversation>

//   //                 <Conversation name="Akane" lastSenderName="Akane" info="Yes i can do it for you">
//   //                     <Avatar src={akaneIco} name="Akane" status="eager" />
//   //                 </Conversation>

//   //                 <Conversation name="Eliot" lastSenderName="Eliot" info="Yes i can do it for you">
//   //                     <Avatar src={eliotIco} name="Eliot" status="away" />
//   //                 </Conversation>

//   //                 <Conversation name="Zoe" lastSenderName="Zoe" info="Yes i can do it for you" active>
//   //                     <Avatar src={zoeIco} name="Zoe" status="dnd" />
//   //                 </Conversation>

//   //                 <Conversation name="Patrik" lastSenderName="Patrik" info="Yes i can do it for you">
//   //                     <Avatar src={patrikIco} name="Patrik" status="invisible" />
//   //                 </Conversation>

//   //             </ConversationList> */}
//   //                 {/* <Conversations />
//   //             </Sidebar> */}

//   //             <ChatContainer>
//   //                 <AppHeader
//   //                     title="Login"
//   //                 />
//   //                 {/* <ConversationHeader>
//   //                     <ConversationHeader.Back
//   //                         onClick={() => {
//   //                             // go back to the previous page
//   //                             navigate(-1);
//   //                         }}
//   //                     />
//   //                     <Avatar src={zoeIco} name="Zoe" />
//   //                     <ConversationHeader.Content userName={contact?.name || "some contact name here"} info="Active 10 mins ago" />
//   //                     <ConversationHeader.Actions>
//   //                         <VoiceCallButton />
//   //                         <VideoCallButton />
//   //                         <EllipsisButton onClick={() => setToggleInfo(!toggleInfo)} />
//   //                         <InfoButton />
//   //                     </ConversationHeader.Actions>
//   //                 </ConversationHeader> */}
//   //                 <MessageList typingIndicator={<TypingIndicator content="Zoe is typing" />}>

//   //                     <MessageSeparator content="Saturday, 30 November 2019" />

//   //                     <Message model={{
//   //                         message: "Hello my friend",
//   //                         sentTime: "15 mins ago",
//   //                         sender: "Zoe",
//   //                         direction: "incoming",
//   //                         position: "single"
//   //                     }}>
//   //                         <Avatar src={zoeIco} name="Zoe" />
//   //                     </Message>

//   //                     <Message model={{
//   //                         message: "Hello my friend",
//   //                         sentTime: "15 mins ago",
//   //                         sender: "Patrik",
//   //                         direction: "outgoing",
//   //                         position: "single"
//   //                     }} avatarSpacer />
//   //                     <Message model={{
//   //                         message: "Hello my friend",
//   //                         sentTime: "15 mins ago",
//   //                         sender: "Zoe",
//   //                         direction: "incoming",
//   //                         position: "first"
//   //                     }} avatarSpacer />
//   //                     <Message model={{
//   //                         message: "Hello my friend",
//   //                         sentTime: "15 mins ago",
//   //                         sender: "Zoe",
//   //                         direction: "incoming",
//   //                         position: "normal"
//   //                     }} avatarSpacer />
//   //                     <Message model={{
//   //                         message: "Hello my friend",
//   //                         sentTime: "15 mins ago",
//   //                         sender: "Zoe",
//   //                         direction: "incoming",
//   //                         position: "normal"
//   //                     }} avatarSpacer />
//   //                     <Message model={{
//   //                         message: "Hello my friend",
//   //                         sentTime: "15 mins ago",
//   //                         sender: "Zoe",
//   //                         direction: "incoming",
//   //                         position: "last"
//   //                     }}>
//   //                         <Avatar src={zoeIco} name="Zoe" />
//   //                     </Message>

//   //                     <Message model={{
//   //                         message: "Hello my friend",
//   //                         sentTime: "15 mins ago",
//   //                         sender: "Patrik",
//   //                         direction: "outgoing",
//   //                         position: "first"
//   //                     }} />
//   //                     <Message model={{
//   //                         message: "Hello my friend",
//   //                         sentTime: "15 mins ago",
//   //                         sender: "Patrik",
//   //                         direction: "outgoing",
//   //                         position: "normal"
//   //                     }} />
//   //                     <Message model={{
//   //                         message: "Hello my friend",
//   //                         sentTime: "15 mins ago",
//   //                         sender: "Patrik",
//   //                         direction: "outgoing",
//   //                         position: "normal"
//   //                     }} />
//   //                     <Message model={{
//   //                         message: "Hello my friend",
//   //                         sentTime: "15 mins ago",
//   //                         sender: "Patrik",
//   //                         direction: "outgoing",
//   //                         position: "last"
//   //                     }} />

//   //                     <Message model={{
//   //                         message: "Hello my friend",
//   //                         sentTime: "15 mins ago",
//   //                         sender: "Zoe",
//   //                         direction: "incoming",
//   //                         position: "first"
//   //                     }} avatarSpacer />
//   //                     <Message model={{
//   //                         message: "Hello my friend",
//   //                         sentTime: "15 mins ago",
//   //                         sender: "Zoe",
//   //                         direction: "incoming",
//   //                         position: "last"
//   //                     }}>
//   //                         <Avatar src={zoeIco} name="Zoe" />
//   //                     </Message>
//   //                 </MessageList>
//   //                 <MessageInput placeholder="Type message here" value={messageInputValue} onChange={val => setMessageInputValue(val)} onSend={() => {
//   //                     // generate random id
//   //                     const newConversationId = Math.floor(Math.random() * 1000000000)
//   //                     sendMessage('message', { id: newConversationId, message: messageInputValue })
//   //                     setMessageInputValue("")
//   //                     navigate(`/conversations/${newConversationId}`);
//   //                 }} />
//   //             </ChatContainer>

//   //             {toggleInfo && (
//   //                 <Sidebar position="right">
//   //                     <ExpansionPanel open title="INFO">
//   //                         <p>Lorem ipsum</p>
//   //                         <p>Lorem ipsum</p>
//   //                         <p>Lorem ipsum</p>
//   //                         <p>Lorem ipsum</p>
//   //                     </ExpansionPanel>
//   //                     <ExpansionPanel title="LOCALIZATION">
//   //                         <p>Lorem ipsum</p>
//   //                         <p>Lorem ipsum</p>
//   //                         <p>Lorem ipsum</p>
//   //                         <p>Lorem ipsum</p>
//   //                     </ExpansionPanel>
//   //                     <ExpansionPanel title="MEDIA">
//   //                         <p>Lorem ipsum</p>
//   //                         <p>Lorem ipsum</p>
//   //                         <p>Lorem ipsum</p>
//   //                         <p>Lorem ipsum</p>
//   //                     </ExpansionPanel>
//   //                     <ExpansionPanel title="SURVEY">
//   //                         <p>Lorem ipsum</p>
//   //                         <p>Lorem ipsum</p>
//   //                         <p>Lorem ipsum</p>
//   //                         <p>Lorem ipsum</p>
//   //                     </ExpansionPanel>
//   //                     <ExpansionPanel title="OPTIONS">
//   //                         <p>Lorem ipsum</p>
//   //                         <p>Lorem ipsum</p>
//   //                         <p>Lorem ipsum</p>
//   //                         <p>Lorem ipsum</p>
//   //                     </ExpansionPanel>
//   //                 </Sidebar>
//   //             )}
//   //         </MainContainer>
//   //     </div>
//   // )

//   return (
//     <>
//       <AppHeader
//         title="Chat"
//         backButton
//         rightIcon={
//           <IconButton
//             size="large"
//             edge="end"
//             aria-label="account of current user"
//             aria-controls={menuId}
//             aria-haspopup="true"
//             onClick={() => navigate(`/conversations/${conversationId}/details`)}
//             color="inherit"
//           >
//             <MoreIcon />
//           </IconButton>
//         }
//       // onMenuClick={() => setToggleMenu(!toggleMenu)}
//       // onInfoClick={() => setToggleInfo(!toggleInfo)}
//       />
//       <Container maxWidth={false} disableGutters>

//         <ChatContainer>
//           <AppHeader
//             title="Login"
//           />
//           {/* <ConversationHeader>
//                          <ConversationHeader.Back
//                              onClick={() => {
//                                  // go back to the previous page
//                                  navigate(-1);
//                              }}
//                          />
//                          <Avatar src={zoeIco} name="Zoe" />
//                          <ConversationHeader.Content userName={contact?.name || "some contact name here"} info="Active 10 mins ago" />
//                          <ConversationHeader.Actions>
//                              <VoiceCallButton />
//                              <VideoCallButton />
//                              <EllipsisButton onClick={() => setToggleInfo(!toggleInfo)} />
//                              <InfoButton />
//                          </ConversationHeader.Actions>
//                      </ConversationHeader> */}
//           <MessageList typingIndicator={<TypingIndicator content="Zoe is typing" />} style={{ marginBottom: '60px' }}>

//             <MessageSeparator content="Saturday, 30 November 2019" />
//             {/* <Message model={{
//               message: "Hello my friend",
//               sentTime: "15 mins ago",
//               sender: "Zoe",
//               direction: "incoming",
//               position: "single"
//             }}>
//               <Avatar src={zoeIco} name="Zoe" />
//             </Message>
//             <Message model={{
//               message: "Hello my friend",
//               sentTime: "15 mins ago",
//               sender: "Patrik",
//               direction: "outgoing",
//               position: "single"
//             }} avatarSpacer />
//             <Message model={{
//               message: "Hello my friend",
//               sentTime: "15 mins ago",
//               sender: "Zoe",
//               direction: "incoming",
//               position: "first"
//             }} avatarSpacer />
//             <Message model={{
//               message: "Hello my friend",
//               sentTime: "15 mins ago",
//               sender: "Zoe",
//               direction: "incoming",
//               position: "normal"
//             }} avatarSpacer />
//             <Message model={{
//               message: "Hello my friend",
//               sentTime: "15 mins ago",
//               sender: "Zoe",
//               direction: "incoming",
//               position: "normal"
//             }} avatarSpacer />
//             <Message model={{
//               message: "Hello my friend",
//               sentTime: "15 mins ago",
//               sender: "Zoe",
//               direction: "incoming",
//               position: "last"
//             }}>
//               <Avatar src={zoeIco} name="Zoe" />
//             </Message>
//             <Message model={{
//               message: "Hello my friend",
//               sentTime: "15 mins ago",
//               sender: "Patrik",
//               direction: "outgoing",
//               position: "first"
//             }} />
//             <Message model={{
//               message: "Hello my friend",
//               sentTime: "15 mins ago",
//               sender: "Patrik",
//               direction: "outgoing",
//               position: "normal"
//             }} />
//             <Message model={{
//               message: "Hello my friend",
//               sentTime: "15 mins ago",
//               sender: "Patrik",
//               direction: "outgoing",
//               position: "normal"
//             }} />
//             <Message model={{
//               message: "Hello my friend",
//               sentTime: "15 mins ago",
//               sender: "Patrik",
//               direction: "outgoing",
//               position: "last"
//             }} />
//             <Message model={{
//               message: "Hello my friend",
//               sentTime: "15 mins ago",
//               sender: "Zoe",
//               direction: "incoming",
//               position: "first"
//             }} avatarSpacer />
//             <Message model={{
//               message: "Hello my friend",
//               sentTime: "15 mins ago",
//               sender: "Zoe",
//               direction: "incoming",
//               position: "last"
//             }}>
//               <Avatar src={zoeIco} name="Zoe" />
//             </Message> */}

//             {conversation?.messages?.map((message, index) => {
//               const previousMessage = conversation.messages[index - 1]
//               const nextMessage = conversation.messages[index + 1]
//               // const position = calculateMessagePosition(message, previousMessage, nextMessage)
//               return (
//                 <Message
//                   key={message.id}
//                   model={{
//                     message: message.content,
//                     sentTime: message.timestamp,
//                     sender: message.from,
//                     direction: message.sender === "Zoe" ? "incoming" : "outgoing",
//                     position: "single"
//                   }}
//                 >
//                   {message.sender === "Zoe" && <Avatar src={zoeIco} name="Zoe" />}
//                 </Message>
//               )
//             })}
//           </MessageList>
//           {/* <MessageInput placeholder="Type message here" value={messageInputValue} onChange={val => setMessageInputValue(val)} onSend={() => {
//             // generate random id
//             const newConversationId = Math.floor(Math.random() * 1000000000)
//             sendMessage('message', { id: newConversationId, message: messageInputValue })
//             setMessageInputValue("")
//             navigate(`/conversations/${newConversationId}`);
//           }} /> */}
//         </ChatContainer>

//         <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
//           <Container maxWidth="lg">

//             <Toolbar>
//               {/*  add an input field and a send button and make it so that the input takes up the available space */}
//               {/* make it so that the send button is always on the right side
//                        */}

//               <TextField

//                 id="outlined-multiline-static"
//                 label="Message"

//                 // multiline
//                 // rows={4}
//                 defaultValue=""
//                 variant="filled"
//                 sx={{ width: '100%' }}
//               />
//               <Button variant="contained" sx={{ ml: 2 }}>Send</Button>

//             </Toolbar>
//           </Container>
//         </AppBar>
//       </Container>
//     </>
//   )
// }

import React, { useState, useEffect, useRef, useMemo } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { makeStyles, useTheme } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { updateUsername } from "../../redux/slices/userProfileSlice";
import { json, useNavigate, useParams } from "react-router-dom";
import PageContainer from "../../atomic/organism/page-container/PageContainer";
import Avatar from "@mui/material/Avatar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Conversation, {
  formatDate,
} from "../../atomic/molecules/conversation/Conversation";
import Message from "../../atomic/atom/message/Message";
import {
  addMessage,
  updatePodUnreadCount,
  setShouldHangup,
  addToBlockchain,
} from "../../redux/slices/podsSlice";
import ImageIcon from "@mui/icons-material/Image";
import PlaceIcon from "@mui/icons-material/Place";
import usePeer from "../../p2p/usePeer";
import calculateMD5 from "../../utils/calculateMd5";
import calculateSHA256 from "../../utils/calculateSha256";
import { addStorageItem } from "../../redux/slices/storageSlice";
import MicIcon from "@mui/icons-material/Mic";
import { Badge } from "@mui/material";
import AttachmentIcon from "@mui/icons-material/Attachment";
import Blockchain, { useBlockchain } from "../../blockchain/Blockchain";
import { compiler as profileCompiler } from "../../blockchain/chains/profileChain";
import {
  compiler as podCompiler,
  blockBuilders,
} from "../../blockchain/chains/podChain";
import { encodeEmojisToUnicode } from "../../blockchain/chains/podChain";
import { useTranslation } from "react-i18next";
import { logToNLevelAnalytics } from "../../utils/analytics";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import VoiceRecorderButton from "../../atomic/atom/voiceRecorder/VoiceRecorder";
import DocLink from "../../atomic/atom/docLink/DocLink";

const lightBackground = "/backgrounds/light-leaves.png";
const darkBackground = "/backgrounds/dark-leaves.png";

const calculateHash = calculateSHA256;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: theme.spacing(8),
  },
  appBar: {
    height: theme.spacing(8),
  },
  form: {
    padding: theme.spacing(3),
    position: "relative",
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
  conversation: {
    paddingBottom: theme.spacing(8),
  },
  messageInput: {
    backgroundColor: theme.palette.mode === "dark" ? "#303030" : "#f0f8ff",
  },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    minWidth: "300px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Pod() {
  const { podId } = useParams();
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const storedPods = useSelector((state) => state.pods);
  const storedContacts = useSelector((state) => state.contacts);
  const userProfileBlockchain = useSelector(
    (state) => state.userProfile.blockchain,
  );
  const addToBlockchainDispatch = ({ block, blocks, storage }) =>
    dispatch(addToBlockchain({ podId, block, blocks, storage }));
  const { compiledBlockchain: userProfile, addBlocks: addBlocksToProfile } =
    useBlockchain({
      compiler: profileCompiler,
      blockchain: userProfileBlockchain,
      dispatch: addToBlockchainDispatch,
    });
  const storedConnectionId = userProfile.connectionId;
  const storedUsername = userProfile.displayName;
  const storedAvatar = userProfile.avatar;

  // const storedConnectionId = useSelector((state) => state.userProfile.id);
  // const storedUsername = useSelector((state) => state.userProfile.displayName);
  // const storedAvatar = useSelector((state) => state.userProfile.avatar);
  const dispatch = useDispatch();
  const addMessageDispatch = (message) => dispatch(addMessage(message));
  const setShouldHangupDispatch = () =>
    dispatch(setShouldHangup({ podId, shouldHangUp: false }));
  const updatePodUnreadCountDispatch = (podId, unreadCount) =>
    dispatch(updatePodUnreadCount({ podId, unreadCount }));
  const [messageInputValue, setMessageInputValue] = useState("");
  const [mediaStream, setMediaStream] = useState(null);
  const [callActive, setCallActive] = useState(false);
  const [imageAttachment, setImageAttachment] = useState(null);
  const [videoAttachment, setVideoAttachment] = useState(null);
  const [fileAttachment, setFileAttachment] = useState(null);
  const [locationAttachment, setLocationAttachment] = useState(null);
  const [audioAttachment, setAudioAttachment] = useState(null);
  const [linkAttachment, setLinkAttachment] = useState(null);
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  // const filesForPod = []; // useSelector((state) => state.storage[podId]) || [];

  useEffect(() => {
    logToNLevelAnalytics("podPageLoaded");
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const addStorageItemDispatch = (item) =>
    dispatch(addStorageItem({ podId, item }));
  const conversation = storedPods.find((pod) => pod.id === podId);
  // const podBlockchain = useMemo(() => new Blockchain({
  //   chain: conversation?.blockchain?.chain || [],
  //   compiler: podCompiler,
  //   storage: conversation?.blockchain?.storage || [],
  // }), [conversation?.blockchain?.chain, conversation?.blockchain?.storage])

  // const compiedBlockchain = useMemo(() => podBlockchain.compile(), [podBlockchain]);

  const { compiledBlockchain: podBlockchain, addBlocks: addBlocksToPod } =
    useBlockchain({
      compiler: podCompiler,
      blockchain: conversation?.blockchain,
      dispatch: addToBlockchainDispatch,
    });

  const {
    sendMessage,
    makeCall,
    endCall,
    calls,
    callsHash,
    activeConnections,
  } = usePeer(podBlockchain?.users || []);

  const storedShouldHangup = conversation?.shouldHangup;
  const peerIsTyping = conversation?.peerIsTyping;
  // const filesForPod  = podBlockchain.meaa
  // const peersActivelyTyping = Object.keys(peerIsTyping ?? {}) || []
  // .filter(key => !!peerIsTyping[key])

  console.log({ peerIsTyping })

  const [peersActivelyTyping, setPeersActivelyTyping] = useState(
    Object.keys(peerIsTyping ?? {}) || [].filter((key) => !!peerIsTyping[key]),
  );

  useEffect(() => {
    setPeersActivelyTyping(
      Object.keys(peerIsTyping ?? {}).filter((k) => !!peerIsTyping[k]),
    );
  }, [peerIsTyping]);

  const handleEndCall = () => {
    console.log("ending call");
    endCall();

    sendMessage({
      type: "setShouldHangup",
      payload: {
        podId,
        shouldHangup: true,
      },
    }).then(setShouldHangupDispatch);
  };

  const activeCalls = useMemo(() => {
    if (callActive) {
      setCallActive(false);
      return [];
    }
    return [...calls];
  }, [callsHash, calls]);

  useEffect(() => {
    if (storedShouldHangup) {
      handleEndCall();
    }
  }, [storedShouldHangup]);

  const handleAttachFile = () => {
    setIsLoadingFile(true);
    fileInputRef.current.click();
  };

  const handleAttachImage = () => {
    // setIsLoadingFile(true);
    inputRef.current.click();
  };

  const handleAttachLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocationAttachment({
        latitude,
        longitude,
      });
    });
  };

  const handleAttachAudio = (base64AudioMessage) => {
    handleClose();
    setAudioAttachment({ data: base64AudioMessage });
  };

  const attachImage = ({ target: { files } }) => {
    const f = files[0];
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    img.onload = () => {
      const maxWidthHeight = 300;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidthHeight) {
          height *= maxWidthHeight / width;
          width = maxWidthHeight;
        }
      } else {
        if (height > maxWidthHeight) {
          width *= maxWidthHeight / height;
          height = maxWidthHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
      const base64String = canvas.toDataURL("image/jpeg", 1.0);

      const newAttachment = {
        name: f.name,
        type: "image",
        data: base64String,
        size: f.size,
        // md5: calculateMD5(base64String),
        // sha256: calculateSHA256(base64String),
        sha: calculateHash(base64String),
      };
      setImageAttachment(newAttachment);
    };
    img.onerror = function (event) {
      console.error("An error occurred while reading the file:", img.error);
      setIsLoadingFile(false);
    };

    img.onabort = function (event) {
      console.log("File reading was aborted.");
      setIsLoadingFile(false);
    };
    img.src = URL.createObjectURL(f);
  };

  const attachFile = ({ target: { files } }) => {
    const f = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target.result;
      console.log({ base64String });
      const newAttachment = {
        name: f.name,
        type: "file",
        data: base64String,
        size: f.size,
        // md5: calculateMD5(base64String),
        // sha256: calculateSHA256(base64String),
        sha: calculateHash(base64String),
      };
      setFileAttachment(newAttachment);

      // sendMessage({
      //   type: 'largeFile',
      //   payload: {
      //     ...newAttachment,
      //   }
      // }).then(() => {
      //   setIsLoadingFile(false);
      // })
      setIsLoadingFile(false);
    };
    reader.addEventListener("error", (err) => {
      console.error(err);
      setIsLoadingFile(false);
    });
    reader.addEventListener("abort", (err) => {
      console.error(err);
      setIsLoadingFile(false);
    });
    reader.readAsDataURL(f);
  };

  const handleUpvote = (messageId) => {
    const newBlocks = blockBuilders().upvoteMessage({
      messageId,
      from: storedConnectionId,
    });
    const pendingUpdate = addBlocksToPod(newBlocks);
    sendMessage({
      type: "addToBlockchain",
      payload: {
        id: podId,
        pendingBlocks: pendingUpdate.pendingBlocks,
        pendingStorage: pendingUpdate.pendingStorage,
      },
    });
  };

  useEffect(() => {
    if (
      imageAttachment !== null ||
      fileAttachment !== null ||
      locationAttachment !== null ||
      audioAttachment !== null
    ) {
      handleSendMessage();
    }
  }, [imageAttachment, fileAttachment, locationAttachment, audioAttachment]);

  useEffect(() => {
    if (conversation?.unreadCount) {
      updatePodUnreadCountDispatch(podId, 0);
    }
  }, [conversation?.unreadCount]);

  const [replyMessage, setReplyMessage] = useState(null);
  const handleOnReply = (message) => {
    setReplyMessage(message);
  };

  const handleSendMessage = () => {
    const messageObject = {
      from: storedConnectionId,
      content: messageInputValue
        ? encodeEmojisToUnicode(messageInputValue)
        : undefined,
      image: imageAttachment ?? undefined,
      video: videoAttachment ?? undefined,
      file: fileAttachment ?? undefined,
      location: locationAttachment ?? undefined,
      audio: audioAttachment ?? undefined,
      link: linkAttachment ?? undefined,
      reply: replyMessage ?? undefined,
      timestampSent: new Date().valueOf(),
      timestampRecieved: null,
    };

    const newMessageBlocks = blockBuilders().sendMessage(messageObject);
    const pendingUpdate = addBlocksToPod(newMessageBlocks);
    // const pendingUpdate = podBlockchain.getUpdate();
    // addToBlockchainDispatch({
    //   blocks: pendingUpdate.pendingBlocks,
    //   storage: pendingUpdate.pendingStorage
    // })
    setImageAttachment(null);
    setFileAttachment(null);
    setReplyMessage(null);
    setIsLoadingFile(false);
    setLocationAttachment(null);
    setAudioAttachment(null);

    setMessageInputValue("");
    if (imageAttachment) addStorageItemDispatch(imageAttachment);
    if (fileAttachment) addStorageItemDispatch(fileAttachment);
    if (locationAttachment) addStorageItemDispatch(locationAttachment);
    if (audioAttachment) addStorageItemDispatch(audioAttachment);
    if (replyMessage) addStorageItemDispatch(replyMessage);
    sendMessage({
      type: "setPeerIsTyping",
      payload: {
        podId,
        peerDisplayName: storedUsername,
        isTyping: false,
      },
    });
    // pendingUpdate.pendingBlocks.forEach(block => addToBlockchainDispatch(block))

    logToNLevelAnalytics("sendingMessageAttempt");
    sendMessage({
      type: "message",
      payload: {
        podId,
        message: messageObject,
        podDetails: {
          // ...conversation,
          id: podId,
          messages: [messageObject],
        },
        blocks: pendingUpdate.pendingBlocks,
        storage: pendingUpdate.pendingStorage,
      },
    }).then((response) => {
      logToNLevelAnalytics("sendingMessageSuccess");
      // addMessageDispatch({
      //   podId,
      //   message: { ...messageObject, attachment: imageAttachment?.md5 },
      // });
    });
  };

  const handleMessageChange = (event) => {
    setMessageInputValue(event.target.value);

    sendMessage({
      type: "setPeerIsTyping",
      payload: {
        podId,
        peerDisplayName: storedUsername,
        isTyping: !!event.target.value,
      },
    });
  };

  // useEffect(() => {
  //   const interval = setInterval(() => console.log({calls: getCalls(), callsLength}), 5000)
  //   return () => clearInterval(interval);
  // }, [])

  const remoteStreamCount = calls.filter((call) => call._remoteStream).length;

  useEffect(() => {
    if (callActive && remoteStreamCount) {
      setCallActive(false);
      handleEndCall();
    }

    activeCalls
      .filter((call) => call._remoteStream)
      .map((call) => ({ remote: call._remoteStream, local: call._localStream, metadata: call.metadata}))
      .forEach(async ({ remote, local, metadata }, index) => {
        const isCasting = metadata?.cast;
        if (isCasting || remote) {
          document.getElementById(`remote-video-${index}`).srcObject = isCasting ? local : remote;
          await document.getElementById(`remote-video-${index}`).play();
          setCallActive(true);
        }

        if (!isCasting && local) {
          document.getElementById(`local-video-${index}`).srcObject = local;
          await document.getElementById(`local-video-${index}`).play();
        }
      });
  }, [remoteStreamCount]);

  const handleAnswerCall = async (call) => {
    if (call?.metadata?.cast) {
      const hasVideo = call._remoteStream?.getVideoTracks().length > 0;
      const newMediaStream = await navigator.mediaDevices.getUserMedia({
        video: hasVideo ? true : true,
        audio: true,
      });
      call.answer(newMediaStream);
      setMediaStream(newMediaStream);
    } else {
      const hasVideo = call._remoteStream?.getVideoTracks().length > 0;
      const newMediaStream = await navigator.mediaDevices.getUserMedia({
        video: hasVideo ? true : true,
        audio: true,
      });
      call.answer(newMediaStream);
      setMediaStream(newMediaStream);
    }
  };

  const contactDetails = storedContacts.find((contact) => {
    return (
      contact.connectionId ===
      podBlockchain?.users?.filter((member) => member !== storedConnectionId)[0]
    );
  });
  const pageTitle =
    podBlockchain?.users?.length > 2
      ? podBlockchain?.name ?? "Pod"
      : contactDetails?.displayName ?? "Contact";

  const isOnline = (podBlockchain.users ?? [])
    .filter((c) => c !== storedConnectionId)
    .every((c) => activeConnections.includes(c));
  const isSomeOnline = (podBlockchain.users ?? [])
    .filter((c) => c !== storedConnectionId)
    .some((user) => activeConnections.includes(user));

  const headerActions = [
    {
      text: t("podPage.podDetails"),
      icon: "account",
      onClick: () => navigate(`/pod/${podId}/details`),
    },
  ];
  // if (filesForPod.length > 0) {
  headerActions.push({
    text: t("podPage.files"),
    icon: "folder",
    onClick: () => navigate(`/pod/${podId}/files`),
  });
  // }

  // get boolean if on  if any mobile browser by user agent. like an android ios browser on mobile
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  const isGroup = podBlockchain?.users?.length > 2;

  const handleItemDelete = (id) => {
    console.log({ id });
    const newMessageBlocks = blockBuilders().deleteMessage({ id });
    const pendingUpdate = addBlocksToPod(newMessageBlocks);
    sendMessage({
      type: "addToBlockchain",
      payload: {
        id,
        pendingBlocks: pendingUpdate.pendingBlocks,
        pendingStorage: pendingUpdate.pendingStorage,
      },
    });
  };

  const customButtons = isOnline
    ? [
        {
          text: t("podPage.call"),
          icon: "callContact",
          subMenuItems: [
            !isGroup &&
              !isMobile && {
                text: t("podPage.screenshare"),
                icon: "screen",
                onClick: () =>
                  makeCall({ screen: true, video: true, audio: true }),
              },
            !isGroup && {
              text: t("podPage.videoCall"),
              icon: "camera",
              onClick: () => makeCall({ video: true, audio: true }),
            },
            !isGroup && {
              text: t("podPage.call"),
              icon: "call",
              onClick: () => makeCall({ audio: true }),
            },
            !isGroup && {
              text: t("podPage.cast"),
              icon: "cast",
              onClick: () => makeCall({ audio: true, video: true, cast: true }),
            },
            {
              text: t("podsPage.verse"),
              icon: "verse",
              onClick: () => navigate(`/pod/${podId}/verse`),
            },
          ].filter((i) => !!i),
        },
      ].filter((i) => !!i)
    : [];

  headerActions.push(...customButtons);

  // log which redux state is being updated in a loop
  useEffect(
    () => () => {
      console.log({ storedPods });
    },
    [storedPods],
  );

  useEffect(
    () => () => {
      console.log({ storedContacts });
    },
    [storedContacts],
  );

  useEffect(
    () => () => {
      console.log({ storedConnectionId });
    },
    [storedConnectionId],
  );

  useEffect(
    () => () => {
      console.log({ storedUsername });
    },
    [storedUsername],
  );

  // list of the state variable that could be causing a render loop
  // storedPods
  // storedContacts
  // storedConnectionId
  // storedUsername
  // storedAvatar

  console.log("rendering pod page");

  return (
    <PageContainer
      backgroundImage={
        theme.palette.mode === "dark" ? darkBackground : lightBackground
      }
      headerProps={{
        // title: pageTitle,
        title: (
          <div>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {pageTitle}
            </Typography>
            <Typography
              variant="subtitle2"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              {peersActivelyTyping.length > 0 &&
                `${peersActivelyTyping.join(", ")} is typing...`}
            </Typography>
          </div>
        ),
        backButton: "/pods",
        backCount: storedPods.filter((pod) => pod.unreadCount > 0).length,
        avatarProps: {
          src: isGroup ? conversation?.avatarUrl : contactDetails?.avatar,
          alt: pageTitle[0],
          isOnline,
          isSomeOnline,
        },
        menuProps: {
          icon: "more",
          items: headerActions,
        },
        customButtons: (isOnline && !activeCalls.length) ? [
          // !isGroup && !isMobile && { icon: 'screen', onClick: () => makeCall({ screen: true, video: true, audio: true }) },
          !isGroup && { icon: 'camera', onClick: () => makeCall({ video: true, audio: true }) },
          !isGroup && { icon: 'call', onClick: () => makeCall({ audio: true }) },
        ].filter(i => !!i) : undefined
      }}
      className={classes.conversation}
    >
      {
        <Conversation
          className={classes.conversation}
          isGroup={isGroup}
          deleteItem={handleItemDelete}
          onReply={handleOnReply}
          onUpvote={handleUpvote}
          list={[
            ...(podBlockchain.messages ?? []).map((message) => ({
              ...message,
              name:
                message.from === storedConnectionId
                  ? storedUsername
                  : storedContacts.find((contact) => {
                      return contact.connectionId === message.from;
                    })?.displayName,
              avatar:
                message.from === storedConnectionId
                  ? storedAvatar
                  : storedContacts.find((contact) => {
                      return contact.id === message.from;
                    })?.avatar,
              isOnline: activeConnections.includes(message.from),
              attachmentSha: message.payload?.sha,
              type: message.from === storedConnectionId ? "sent" : "recieved",
            })),
            // ...conversation.messages.map(message => ({
            //   ...message,
            //   name: message.from === storedConnectionId
            //     ? storedUsername
            //     : storedContacts.find((contact) => {
            //       return contact.id === message.from
            //     })?.displayName,
            //   avatar: message.from === storedConnectionId
            //     ? storedAvatar
            //     : storedContacts.find((contact) => {
            //       return contact.id === message.from
            //     })?.avatar,
            //   isOnline: activeConnections.includes(message.from),

            //   type: message.from === storedConnectionId ? 'sent' : 'recieved',
            // }))
          ]}
          loading={isLoadingFile}
        />
      }

      <div style={{ marginBottom: 50 }}></div>

      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Container maxWidth="lg" disableGutters>
          {!!replyMessage && (
            <Container
              sx={{
                p: "10px 15px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                {t("podPage.replyingTo", { displayName: replyMessage.name })}
              </Typography>
              <Message
                style={{
                  transform: "scale(0.7)",
                  margin: "-15px",
                }}
                type={replyMessage.type}
                payload={replyMessage.payload}
                message={replyMessage.content}
                attachmentSha={replyMessage.attachmentSha}
                attachment={replyMessage.attachment}
                imageAttachment={replyMessage.image}
                username={replyMessage.name}
                isOnline={isGroup && replyMessage.isOnline}
                // parse date from something like `Date(item.timestampSent)` to `'10/23/2023 12:00:00 AM'`
                timestamp={formatDate(replyMessage.timestamp?.created)}
                avatar={replyMessage.avatar}
              />
              <Button onClick={() => setReplyMessage(null)}>
                {t("podPage.cancelReply")}
              </Button>
            </Container>
          )}
          <Toolbar disableGutters>
            {/*  add an input field and a send button and make it so that the input takes up the available space */}
            {/* make it so that the send button is always on the right side
             */}
            <OutlinedInput
              id="outlined-adornment-weight"
              endAdornment={
                <>
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="send location"
                      onClick={handleAttachLocation}
                      // icon is green when there is text in the input field
                      color={"primary"}
                      disabled={!isOnline}
                      edge="end"
                    >
                      <Badge badgeContent={null} color="info">
                        <PlaceIcon />
                      </Badge>
                    </IconButton>
                  </InputAdornment>
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="send message"
                      onClick={handleAttachFile}
                      // icon is green when there is text in the input field
                      color={"primary"}
                      disabled={!isOnline}
                      edge="end"
                    >
                      <Badge badgeContent={null} color="info">
                        <AttachFileIcon />
                      </Badge>
                    </IconButton>
                  </InputAdornment>
                  <input
                    type="file"
                    name="attachment"
                    accept=""
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={attachFile}
                  />
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="send message"
                      onClick={handleAttachImage}
                      // icon is green when there is text in the input field
                      color={"primary"}
                      disabled={!isOnline}
                      edge="end"
                    >
                      <Badge
                        badgeContent={imageAttachment ? "1" : null}
                        color="info"
                      >
                        <ImageIcon />
                      </Badge>
                    </IconButton>
                  </InputAdornment>
                  <input
                    type="file"
                    name="attachment"
                    accept="image/*"
                    ref={inputRef}
                    style={{ display: "none" }}
                    onChange={attachImage}
                  />
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="send voice memo"
                      onClick={handleClickOpen}
                      color={"primary"}
                      disabled={!isOnline}
                      edge="end"
                    >
                      <Badge badgeContent={null} color="info">
                        <MicIcon />
                      </Badge>
                    </IconButton>
                  </InputAdornment>
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="send message"
                      onClick={handleSendMessage}
                      // icon is green when there is text in the input field
                      color={
                        messageInputValue || imageAttachment
                          ? "primary"
                          : "disabled"
                      }
                      disabled={
                        (!messageInputValue && !imageAttachment) || !isOnline
                      }
                      edge="end"
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                </>
              }
              aria-describedby="outlined-weight-helper-text"
              onChange={handleMessageChange}
              // on Enter key press, send message
              // but on on shift Enter
              onKeyPress={(ev) => {
                if (ev.key === "Enter" && !ev.shiftKey) {
                  ev.preventDefault();
                  if (messageInputValue) handleSendMessage();
                }
              }}
              placeholder="Type message here"
              value={messageInputValue}
              classes={{ root: classes.messageInput }}
              sx={{ width: "100%" }}
              autoComplete="off"
              // lightblue background
              // style={{ backgroundColor: '#f0f8ff' }}
              multiline
              inputProps={{
                "aria-label": "weight",
              }}
            />
          </Toolbar>
        </Container>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open || activeCalls.length > 0}
          TransitionComponent={Transition}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Voice message
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            {activeCalls?.length < 1 && (
              <VoiceRecorderButton onVoiceRecording={handleAttachAudio} />
            )}

            {activeCalls.length > 0 &&
              [activeCalls[activeCalls.length - 1]]
                // .filter(call => call._remoteStream)
                .map((call, index) => {
                  const stream = call._remoteStream;
                  const localStream = call._localStream;
                  const isCasting = call.metadata?.cast;
                  console.log({ call, stream, localStream, isCasting })
                  // option to answer call
                  if (localStream && !callActive) handleAnswerCall(call);
                  // // autsswerCall(call)

                  // on stream disconnect, cklosethe local tracks
                  if (stream) {
                    stream.oninactive = (...rest) => {
                      [mediaStream, localStream, stream].map((stream) => {
                        const tracks = stream?.getTracks();
                        if (tracks) {
                          console.log({ tracks });
                          tracks.forEach((track) => track.stop());
                          setMediaStream(null);
                        }
                      });
                    };
                  }

                  return (
                    <div className={classes.form}>
                      {(stream) && (
                        <>
                          <video
                            id={`remote-video-${index}`}
                            playsInline
                            style={{ width: "100%" }}
                          ></video>
                          <br />
                          <br />
                        </>
                      )}
                      {localStream && stream?.getVideoTracks().length > 0 && (
                        <video
                          id={`local-video-${index}`}
                          muted
                          playsInline
                          style={{
                            width: "20vw",
                            position: "absolute",
                            top: 90,
                            left: 10,
                          }}
                        ></video>
                      )}

                      {!localStream && (
                        <>
                          <Button
                            type="button"
                            sx={{ mb: 2 }}
                            variant="contained"
                            fullWidth
                            color="success"
                            onClick={() => handleAnswerCall(call)}
                          >
                            answer call
                          </Button>
                          <br />
                        </>
                      )}
                      {!isCasting && localStream && stream && (
                        <>
                          <Button
                            type="button"
                            sx={{ mb: 2 }}
                            variant="contained"
                            fullWidth
                            color="info"
                            onClick={() => navigate(`/pod/${podId}/verse`)}
                          >
                            go to verse
                          </Button>
                          <br />
                        </>
                      )}
                      <Button
                        type="button"
                        variant="contained"
                        fullWidth
                        color="error"
                        onClick={handleEndCall}
                      >
                        hang up
                      </Button>
                    </div>
                  );
                })}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              close
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </AppBar>
    </PageContainer>
  );
}
