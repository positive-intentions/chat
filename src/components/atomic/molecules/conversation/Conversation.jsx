import React, { useEffect, useRef } from "react";
import { findDOMNode } from 'react-dom';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ChevronRight from "@mui/icons-material/ChevronRight";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
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
    bottom: theme.spacing(9),
    right: theme.spacing(2),
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

export default function Conversation({
  list,
  isGroup,
  deleteItem,
  loading,
  onReply,
  onUpvote,
}) {
  const scrollRef = useRef(null);
  const classes = useStyles();
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }

    document.addEventListener("scroll", handleScroll);
    // findDOMNode(this).addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // calculate if the scroll is near the bottom of the scroll
  // and it should update the value as the users changes the scroll position

  const [isNearBottom, setIsNearBottom] = React.useState(true);

  const handleScroll = () => {
    const distantFromBottom =
      document.documentElement.scrollHeight -
      document.documentElement.scrollTop -
      document.documentElement.clientHeight;
    console.log("distantFromBottom", distantFromBottom);
    setIsNearBottom(distantFromBottom > 400);
  };

  const handleScrollToBottom = () => {
    // scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    window.scrollTo({
      top: document.documentElement.scrollHeight,
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

  return (
    <List className={classes.list} onSc>
      {list.map((item) => (
        <SwipeableListItem
          className="swipeableListItem"
          swipeLeft={{
            content: (
              <DeleteIcon
                color="error"
                style={{ height: "30px", marginRight: 20, color: "" }}
              />
            ),
            action: () => handleDelete(item.id),
          }}
          swipeRight={{
            content: (
              <ReplyIcon
                color="primary"
                style={{ height: "30px", marginLeft: 20 }}
              />
            ),
            action: () => handleReply(item),
          }}
          // onSwipeProgress={setIsSwiping}
          // onSwipeStart={handleStartSwiping}
          // onSwipeEnd={handleEndSwipingWithClick}
        >
          <ListItem
            key={item.id}
            onClick={item.onClick}
            className={item.type === "sent" ? classes.sentMessage : ""}
          >
            <Button id={item.id} style={{ textTransform: "none" }} {...bind()}>
              <Message
                type={item.type}
                payload={item.payload}
                message={item.content}
                attachmentSha={item.attachmentSha}
                attachment={item.attachment}
                imageAttachment={item.image}
                username={item.name}
                isOnline={isGroup && item.isOnline}
                // parse date from something like `Date(item.timestampSent)` to `'10/23/2023 12:00:00 AM'`
                timestamp={formatDate(item.timestamp?.created)}
                avatar={item.avatar}
                votes={item.votes}
              />
            </Button>
          </ListItem>
        </SwipeableListItem>
      ))}
      {loading && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="div" gutterBottom>
              Loading file into browser. Please wait.
            </Typography>
            <CircularProgress />
          </Box>
        </>
      )}
      <li ref={scrollRef} />
      {!!false && list.length > 10 && isNearBottom && (
        <Fab
          color="primary"
          aria-label="scroll to bottom"
          className={classes.fab}
          onClick={handleScrollToBottom}
        >
          <KeyboardDoubleArrowDownIcon />
        </Fab>
      )}
    </List>
  );
}
