import React, { useEffect, useRef, useMemo } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ChevronRight from "@mui/icons-material/ChevronRight";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import Message from "../../atom/message/Message";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import { useLongPress } from "use-long-press";
import Typography from "@mui/material/Typography";
import {
  SwipeableList,
  SwipeableListItem,
} from "@sandstreamdev/react-swipeable-list";
import "@sandstreamdev/react-swipeable-list/dist/styles.css";
import "./style.css";
import { ConstructionOutlined } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

import { styled, useTheme } from "@mui/material/styles";
import { Container } from "@mui/material";

import Post from "../../atom/post/Post";

const useStyles = makeStyles((theme) => ({
  sentMessage: {
    justifyContent: "flex-end !important",
  },
  list: {
    paddingBottom: `${theme.spacing(8)} !important`,
  },
  swipeableListItem: {
    background: "transparent !important",
  },
  fab: {
    position: "fixed !important",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  messageInputContainer: {
    marginTop: "15px",
    borderRadius: "30px !important",
  },
  messageInput: {
    backgroundColor: theme.palette.mode === "dark" ? "#303030" : "#f0f8ff",
  },
}));

export const formatDate = (timestamp) => {
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

export default function Thread({
  list,
  isGroup,
  deleteItem,
  loading,
  onReply,
  onUpvote,
}) {
  const scrollRef = useRef(null);
  const theme = useTheme();
  const classes = useStyles();
  useEffect(() => {
    // if (scrollRef.current) {
    //     scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    // }

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // calculate if the scroll is near the bottom of the scroll
  // and it should update the value as the users changes the scroll position

  const [isNearTop, setIsNearTop] = React.useState(true);

  const handleScroll = () => {
    const distantFromTop = document.documentElement.scrollTop;
    setIsNearTop(distantFromTop < 400);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = (id) => {
    deleteItem(id);
  };

  const handleReply = (message) => {
    onReply(message);
  };

  const handleUpvote = (e) => {
    const messageId = e.target.parentNode.parentNode.parentNode.id;
    console.log("handleUpvote", messageId);
    onUpvote(messageId);
  };

  const bind = useLongPress(handleUpvote, {
    threshold: 500,
    cancelOnMovement: true,
    captureEvent: true,
  });

  const isDarkMode = theme.palette.mode === "dark";

  // create array with number 1 to 24. the numbers are in a randomised order
  const randomNumbers = useMemo(
    () =>
      [...Array(24).keys()].map((i) => i + 1).sort(() => Math.random() - 0.5),
    [],
  );
  //   const randomNumbers = [...Array(24).keys()].map(i => (i+1)).sort(() => Math.random() - 0.5);

  return (
    <List className={classes.list}>
      <li ref={scrollRef} />
      <Container>
        {list.map((item) => (
          <Post isDarkMode={isDarkMode} postDetails={item} />
        ))}
      </Container>

      <Divider>
        <Chip label={"Test data:"} />
      </Divider>

      <Container>
        {randomNumbers.map((number) => (
          <Post isDarkMode={isDarkMode} imageId={number} />
        ))}
      </Container>

      {!isNearTop && (
        <Fab
          color="primary"
          aria-label="scroll to bottom"
          className={classes.fab}
          onClick={handleScrollToTop}
        >
          <KeyboardDoubleArrowUpIcon />
        </Fab>
      )}
    </List>
  );
}
