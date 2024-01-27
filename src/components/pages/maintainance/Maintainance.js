import React, { useEffect, useState, useRef, useMemo, memo } from "react";
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
import usePeer from "../../p2p/usePeer.js";
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
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// maps styles and market icon
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";

const useStyles = makeStyles((theme) => ({
  padding: {
    padding: 10,
  },
}));

export default function Maintainance() {
  const classes = useStyles();
  const navigate = useNavigate();
  const contacts = useSelector((state) => state.contacts) || [];

  return (
    <PageContainer
      headerProps={{
        title: "Temporaily Unavailable",
        backButton: true,
        menuProps: {
          icon: "more",
          items: [
            {
              text: "Profile",
              icon: "account",
              onClick: () => navigate("/profile"),
            },
          ],
        },
      }}
    >
      <div style={{ textAlign: "center", padding: 20 }}>
        <Typography variant="h5" gutterBottom>
          Temporaily Unavailable
        </Typography>
        <Typography variant="body1" gutterBottom>
          This app is temporaily unavailable. Apologies for any inconvienience.
        </Typography>
      </div>
    </PageContainer>
  );
}
