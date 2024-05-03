import React, { useState, useEffect, useRef, useMemo } from "react";
import TextField from "@mui/material/TextField";
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
import Thread, { formatDate } from "../../atomic/molecules/thread/Thread";
import Message from "../../atomic/atom/message/Message";
import {
  addMessage,
  updatePodUnreadCount,
  setShouldHangup,
  addToBlockchain,
} from "../../redux/slices/podsSlice";
import ImageIcon from "@mui/icons-material/Image";
import usePeer from "../../p2p/usePeer";
import calculateMD5 from "../../utils/calculateMd5";
import calculateSHA256 from "../../utils/calculateSha256";
import { addStorageItem } from "../../redux/slices/storageSlice";
import { Badge } from "@mui/material";
import AttachmentIcon from "@mui/icons-material/Attachment";
import Blockchain, { useBlockchain } from "../../blockchain/Blockchain";
import { compiler as profileCompiler } from "../../blockchain/chains/profileChain";
import {
  compiler as podCompiler,
  blockBuilders,
  encodeEmojisToUnicode,
} from "../../blockchain/chains/podChain";
import { useTranslation } from "react-i18next";
import { logToNLevelAnalytics } from "../../utils/analytics";

import SplitPane from "react-split-pane";
import "./splitpanestyle.css";
import Pods from "../pods/Pods";

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

export default function Feed() {
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
  const addToPodsBlockchainDispatch = (update) =>
    dispatch(addToBlockchain(update));
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
  const [linkAttachment, setLinkAttachment] = useState(null);
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  // const filesForPod = []; // useSelector((state) => state.storage[podId]) || [];

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

  const [peersActivelyTyping, setPeersActivelyTyping] = useState(
    Object.keys(peerIsTyping ?? {}) || [].filter((key) => !!peerIsTyping[key]),
  );

  useEffect(() => {
    setPeersActivelyTyping(
      Object.keys(peerIsTyping ?? {}).filter((k) => !!peerIsTyping[k]),
    );
  }, [peerIsTyping]);

  const handleEndCall = () => {
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
        md5: calculateMD5(base64String),
        sha256: calculateSHA256(base64String),
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
        md5: calculateMD5(base64String),
        sha256: calculateSHA256(base64String),
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
    if (imageAttachment !== null || fileAttachment !== null) {
      handleSendMessage();
    }
  }, [imageAttachment, fileAttachment]);

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

    setMessageInputValue("");
    if (imageAttachment) addStorageItemDispatch(imageAttachment);
    if (fileAttachment) addStorageItemDispatch(fileAttachment);
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
      .map((call) => ({ remote: call._remoteStream, local: call._localStream }))
      .forEach(async ({ remote, local }, index) => {
        if (remote) {
          document.getElementById(`remote-video-${index}`).srcObject = remote;
          await document.getElementById(`remote-video-${index}`).play();
          setCallActive(true);
        }

        if (local) {
          document.getElementById(`local-video-${index}`).srcObject = local;
          await document.getElementById(`local-video-${index}`).play();
        }
      });
  }, [remoteStreamCount]);

  const handleAnswerCall = async (call) => {
    const hasVideo = call._remoteStream?.getVideoTracks().length > 0;
    const newMediaStream = await navigator.mediaDevices.getUserMedia({
      video: hasVideo ? true : true,
      audio: true,
    });
    call.answer(newMediaStream);
    setMediaStream(newMediaStream);
  };

  const contactDetails = storedContacts.find((contact) => {
    return (
      contact.connectionId ===
      podBlockchain?.users?.filter((member) => member !== storedConnectionId)[0]
    );
  });
  const pageTitle = "Gram"; // podBlockchain?.users.length > 2 ? (podBlockchain?.name ?? 'Pod') : (contactDetails?.displayName ?? 'Contact');

  const isOnline = false; // podBlockchain.users
  // .filter(c => c !== storedConnectionId)
  // .every(c => activeConnections.includes(c));
  const isSomeOnline = false; // podBlockchain.users.filter(c => c !== storedConnectionId).some(user => activeConnections.includes(user));

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

  const customButtons =
    isOnline && !activeCalls.length
      ? [
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
        ].filter((i) => !!i)
      : [];

  headerActions.push(...customButtons);

  // ============================================================

  useEffect(() => {
    logToNLevelAnalytics("FeedPageLoaded");
  }, []);

  const { compiledBlockchains: compiledPods } = useBlockchain({
    compiler: podCompiler,
    blockchains: storedPods.map((pod) => pod.blockchain),
    dispatch: addToPodsBlockchainDispatch,
  });

  const posts = compiledPods
    .map((pod) => pod.messages.filter((m) => m.payload.image.data))
    .flat();
  const allReplies = compiledPods
    .map((pod) => pod.messages.filter((m) => m.payload.reply?.id))
    .flat();

  const fetchComments = (message) => {
    const comments = allReplies.filter(
      (reply) => reply.payload.reply?.id === message.id,
    );
    const newComments = resolveComments(comments);
    return { ...message, comments: newComments };
  };
  const resolveComments = (posts) => {
    return posts.map((post) => fetchComments(post));
  };
  const postWithComments = resolveComments(posts);
  console.log({ compiledPods, posts, postWithComments });

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
        backButton: "/login",
        backCount: storedPods.filter((pod) => pod.unreadCount > 0).length,
        // avatarProps: {
        //   src: isGroup ? conversation?.avatarUrl : contactDetails?.avatar,
        //   alt: pageTitle[0],
        //   isOnline,
        //   isSomeOnline
        // },
        menuProps: {
          icon: "more",
          // items: headerActions
        },
        // customButtons: (isOnline && !activeCalls.length) ? [
        //   !isGroup && !isMobile && { icon: 'screen', onClick: () => makeCall({ screen: true, video: true, audio: true }) },
        //   !isGroup && { icon: 'camera', onClick: () => makeCall({ video: true, audio: true }) },
        //   !isGroup && { icon: 'call', onClick: () => makeCall({ audio: true }) },
        // ].filter(i => !!i) : undefined
      }}
      className={classes.conversation}
    >
      {activeCalls.length === 0 && (
        <Thread
          className={classes.conversation}
          isGroup={isGroup}
          deleteItem={handleItemDelete}
          onReply={handleOnReply}
          onUpvote={handleUpvote}
          list={posts}
          loading={isLoadingFile}
        />
      )}

      {activeCalls.length > 0 &&
        [activeCalls[activeCalls.length - 1]]
          // .filter(call => call._remoteStream)
          .map((call, index) => {
            const stream = call._remoteStream;
            const localStream = call._localStream;
            if (localStream && !callActive) handleAnswerCall(call);

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
                {stream && (
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
      <div style={{ marginBottom: 50 }}></div>

      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Container maxWidth="lg" disableGutters>
          {!!replyMessage && (
            <Container sx={{ p: "10px 15px" }}>
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                {t("podPage.replyingTo", { displayName: replyMessage.name })}
              </Typography>
              <Message
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
        </Container>
      </AppBar>
    </PageContainer>
  );
}
