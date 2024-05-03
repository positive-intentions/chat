import React, { useEffect, useState, useRef, useMemo, memo } from "react";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
// import AppBar from "@mui/material/AppBar";
// import Typography from "@mui/material/Typography";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
// import Avatar from "@mui/material/Avatar";
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ChevronRight from '@mui/icons-material/ChevronRight';
// import Fab from '@mui/material/Fab';
// import AddIcon from '@mui/icons-material/Add';
// import ListComponent from '../../atomic/molecules/list/List';
import PageContainer from "../../atomic/organism/page-container/PageContainer";

import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// import test from './get_started.ts'

const useStyles = makeStyles((theme) => ({
  padding: {
    padding: 10,
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function Map() {
  const classes = useStyles();
  const navigate = useNavigate();
  const contacts = useSelector((state) => state.contacts) || [];

  useEffect(() => {
    setTimeout(() => {
      // test();
    }, 5000);
  }, []);

  // const userProfileBlockchain = useSelector((state) => state.userProfile.blockchain);
  // const {
  //     compiledBlockchain: userProfile,
  //   } = useBlockchain({
  //     compiler: profileCompiler,
  //     blockchain: userProfileBlockchain,
  //   });
  //   const storedConnectionId = userProfile.connectionId;

  // // const storedConnectionId = useSelector((state) => state.userProfile.connectionId);
  // const storedPods = useSelector((state) => state.pods);
  // const { activeConnections } = usePeer([])
  // const [scanning, setScanning] = useState(false)
  // const [result, setResult] = useState('No result')
  // // getlatest TermsAndConditions
  // const LatestTermsAndConditions = TermsAndConditions[TermsAndConditions.length - 1]?.terms;

  // const initialPosition = [0, 0];
  // const [position, setPosition] = useState(initialPosition);

  // // get gps position from device
  // useEffect(() => {
  //     const setLocation = () => navigator.geolocation.getCurrentPosition((position) => {
  //         // alert(position.coords.longitude + " " + position.coords.latitude)
  //         setPosition([position.coords.latitude, position.coords.longitude])
  //     },
  //     (error) => alert(error.message),
  //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  //     );

  //     setLocation();

  //     // const interval = setInterval(() => {
  //     //     setLocation();
  //     // }, 5000);
  //     // return () => clearInterval(interval);
  // }, [])

  // mapp component with position update
  // const MapComponent = useMemo(() => {
  //     return () => (
  //         <MapContainer center={position || initialPosition} zoom={13} scrollWheelZoom={true} style={{ height: '100vh' }} >
  //             <TileLayer
  //                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //                 attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
  //             />
  //             {position && <Marker position={position} icon={L.icon({
  //                 iconUrl: icon,
  //                 iconSize: [25, 41],
  //                 iconAnchor: [12, 41],
  //                 popupAnchor: [1, -34],
  //                 shadowSize: [41, 41]
  //             })}>
  //                 <Popup>
  //                     You are here
  //                 </Popup>
  //             </Marker>}
  //         </MapContainer>
  //     )
  // }, [position[0], position[1]])

  return (
    <PageContainer
      headerProps={{
        title: "AI",
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
      {/* <MapComponent /> */}

      {/* <LatestTermsAndConditions padding={20}/> */}

      <Box
        sx={{
          width: "100%",
          // vertically center
          alignItems: "center",
          // horizontally center
          justifyContent: "center",
          padding: 5,
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
          Loading AI for offline...
        </Typography>
        <LinearProgressWithLabel value={25} />
      </Box>

      <Box
        sx={{
          width: "100%",
          // vertically center
          alignItems: "center",
          // horizontally center
          justifyContent: "center",
          padding: 5,
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
          Warming up...
        </Typography>
        <LinearProgressWithLabel value={25} />
      </Box>
    </PageContainer>
  );
}
