import React from "react";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Attachment from "./Attachment";
import Payload from "./Payload";
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const useStyles = makeStyles((theme) => {
  return {
    sentMessage: {
      // backgroundColor: theme.palette.primary.light,
      backgroundColor:
        theme.palette.type === "dark"
          ? "#004D00 !important"
          : "#0080ff !important",
      color:
        theme.palette.mode === "dark"
          ? theme.palette.primary.contrastText
          : theme.palette.primary.main,
      // marginBottom: theme.spacing(2),
      width: "fit-content",
      alignSelf: "flex-end",
      // backgroundColor: "#e6ffe6",
    },
    messageContent: {
      padding: theme.spacing(2),
      // color: theme.palette.primary.contrastText,
    },
    messageHeader: {
      padding: theme.spacing(1),
      // color: theme.palette.primary.contrastText,
    },
    greenBackground: {
      backgroundColor:
        theme.palette.mode === "dark"
          ? "#004D00 !important"
          : "#e6ffe6 !important",
      textAlign: "left",
    },
    blueBackground: {
      backgroundColor:
        theme.palette.mode === "dark"
          ? "#00005A !important"
          : "#e6f7ff !important",
      textAlign: "left",
    },
    // lightGreen: {
    //     backgroundColor: '#e6ffe6 !important',
    //     textAlign: "left",
    // },
    // lightBlue: {
    //     backgroundColor: '#e6f7ff !important',
    //     textAlign: "left",
    // },
    // darkGreen: {
    //     backgroundColor: '#b3ffb3 !important',
    //     textAlign: "left",
    // },
    // darkBlue: {
    //     backgroundColor: '#b3e6ff !important',
    //     textAlign: "left",
    // },
    // veryDarkGreen: {
    //     backgroundColor: '#00b300 !important',
    //     textAlign: "left",
    // },
    // veryDarkBlue: {
    //     backgroundColor: '#0080ff !important',
    //     textAlign: "left",
    // },
  };
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  const month = ("0" + (date.getMonth() + 1)).slice(-2); // months are zero indexed
  const day = ("0" + date.getDate()).slice(-2);
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);
  const ampm = hours >= 12 ? "PM" : "AM";

  // convert from 24-hour to 12-hour format
  hours = hours % 12;
  // the hour '0' should be '12'
  hours = hours ? hours : 12;

  const formattedTime =
    month +
    "/" +
    day +
    "/" +
    year +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds +
    " " +
    ampm;

  return formattedTime;
};

export default function Message({
  message,
  username,
  timestamp,
  type,
  avatar,
  isOnline,
  attachment,
  imageAttachment,
  payload,
  attachmentSha,
  id,
  votes,
  style,
}) {
  const classes = useStyles();

  const cardClass =
    type === "sent" ? classes.greenBackground : classes.blueBackground;

  const upvotes = votes ? votes.upvotes.length : 0;
  return (
    <Badge
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      badgeContent={`❤️ ${upvotes}`}
      invisible={upvotes > 0 ? false : true}
      style={{ width: "fit-content" }}
    >
      <Card id={id} className={[classes.sentMessage, cardClass]} style={style}>
        <CardHeader
          className={classes.messageHeader}
          title={username}
          subheader={timestamp}
          avatar={
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
              invisible={type === "sent" || !isOnline}
            >
              <Avatar src={avatar} alt={username}>
                {username ? username[0] : "-"}
              </Avatar>
            </StyledBadge>
          }
        />
        <CardContent className={classes.messageContent}>
          {!!imageAttachment && (
            <Attachment sha={imageAttachment.sha} data={imageAttachment.data} />
          )}
          {payload && (
            <Payload payload={payload} attachmentSha={attachmentSha} />
          )}

          <Typography variant="body1">{message}</Typography>

          <DoneAllIcon
            style={{
              fontSize: 16,
              right: 16,
              bottom: 16,
              position: 'absolute'
            }}
          />
        </CardContent>
      </Card>
    </Badge>
  );
}
