import React, { useEffect, useState, useRef } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
import Blockchain, { useBlockchain } from "../../blockchain/Blockchain";
import {
  compiler as profileCompiler,
  blockBuilders,
} from "../../blockchain/chains/profileChain";
import ConnectToPeer from "../../atomic/molecules/connect-to-peer/ConnectToPeer";
import { red } from "@mui/material/colors";
import TranslateIcon from "@mui/icons-material/Translate";
import {
  SwipeableList,
  SwipeableListItem,
} from "@sandstreamdev/react-swipeable-list";
import "@sandstreamdev/react-swipeable-list/dist/styles.css";

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

export default function ContactsListPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { podId } = useParams();
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

  const filesForPod = storedPods.find((pod) => pod.id === podId).blockchain
    ?.storage;
  console.log({ filesForPod });

  const fileList = Object.keys(filesForPod)
    .filter((fileKey) => typeof filesForPod[fileKey] === "object")
    .map((fileKey) => {
      const file = filesForPod[fileKey];
      return {
        id: file.fileKey,
        name: file.name,
        avatarUrl: file.type === "image" ? file.data : "",
        onClick: () => navigate(`/pod/${podId}/file/${fileKey}`),
      };
    });

  return (
    <PageContainer
      headerProps={{
        title: "Files",
        backButton: true,
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
        // menuProps: {
        //     icon: 'more',
        //     items: [
        //       { text: 'Profile', icon: 'account', onClick: () => navigate('/profile') },
        //       { text: 'About', icon: 'info', onClick: () => window.location = 'https://positive-intentions.com' },
        //     ]
        //   }
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
      {<ListComponent list={fileList} />}
    </PageContainer>
  );
}
