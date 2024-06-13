import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCryptography } from "cryptography/Cryptography";
import { useNotification } from "../../../notifications/notificationManager";
import { makeStyles } from "@mui/styles";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SendIcon from "@mui/icons-material/Send";
import CardContent from "@mui/material/CardContent";
import {
  Dropdown,
  DropdownMenuItem,
  DropdownNestedMenuItem,
} from "../dropdown/Dropdown";
import CustomAccordion from "../customAccordion/CustomAccordion";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  messageInputContainer: {
    backgroundColor: "#f0f8ff",
    padding: "0 10px",
    margin: "10px 0",
    width: "100%",
    height: 40,
    marginTop: "15px",
    borderRadius: "30px !important",
  },
  messageInput: {
    padding: 0,
    // height: "100%",
    width: "100%",
    backgroundColor: theme.palette.mode === "dark" ? "#303030" : "#f0f8ff",
  },
}));

const Post = ({ isDarkMode, imageId, postDetails }) => {
  const { chance } = useCryptography();
  const navigate = useNavigate();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  // pic a random number between  and including 1-9
  const num = Math.floor(Math.random() * 9) + 1;
  const randomNumber = useMemo(() => Math.floor(Math.random() * 9) + 1, []);
  const randomAnimalName = useMemo(() => chance.animal(), []);
  const randomDate = useMemo(
    () => chance.date({ year: 2023, string: true }),
    [],
  );
  const randomLongSentence = useMemo(() => chance.sentence({ words: 30 }), []);
  const randomShortSentence = useMemo(() => chance.sentence(), []);

  const classes = useStyles();

  const [expanded, setExpanded] = React.useState([]);
  const handleChange = (panel) => (event, isExpanded) => {
    console.log("handleChange", panel, isExpanded);
    if (isExpanded) {
      setExpanded((prevExpanded) => [...prevExpanded, panel]);
    } else {
      setExpanded((prevExpanded) =>
        prevExpanded.filter((item) => item !== panel),
      );
    }
  };
  const sendNotification = useNotification();

  const defaultMenuItems = [
    {
      text: "Go to message",
      icon: "navigate",
      onClick: () => navigate(`/pods`),
    },
    {
      text: "Go to file",
      icon: "navigate",
      onClick: () => navigate(`/pods`),
    },
    {
      text: "Delete Post",
      icon: "navigate",
      subMenuItems: [
        {
          text: "Confirm delete",
          onClick: () => sendNotification("Deleting post", { variant: "info" }),
        },
      ],
    },
  ];

  const InputComponent = () => (
    <OutlinedInput
      className={classes.messageInputContainer}
      id="outlined-adornment-weight"
      endAdornment={
        <>
          <InputAdornment position="end">
            <IconButton
              aria-label="send message"
              //   onClick={handleSendMessage}
              // icon is green when there is text in the input field
              //   color={messageInputValue || imageAttachment ? "primary" : "disabled"}
              //   disabled={(!messageInputValue && !imageAttachment) || !isOnline}
              edge="end"
            >
              <SendIcon />
            </IconButton>
          </InputAdornment>
        </>
      }
      aria-describedby="outlined-weight-helper-text"
      //   onChange={handleMessageChange}
      // on Enter key press, send message
      // but on on shift Enter
      //   onKeyPress={(ev) => {
      //     if (ev.key === 'Enter' && !ev.shiftKey) {
      //       ev.preventDefault();
      //       if (!!messageInputValue) handleSendMessage();
      //     }
      //   }}
      //   value={messageInputValue}
      classes={{ root: classes.messageInput }}
      sx={{ width: "100%" }}
      autoComplete="off"
      // lightblue background
      // style={{ backgroundColor: '#f0f8ff' }}
      multiline
      placeholder="Reply..."
      inputProps={{
        "aria-label": "weight",
      }}
    />
  );

  return (
    <Card style={{ margin: "20px 0" }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={`/avatars/${randomNumber}.jpg`}
          >
            R
          </Avatar>
        }
        action={
          <Dropdown
            keepOpen
            trigger={
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <MoreVertIcon />
              </IconButton>
            }
            menu={defaultMenuItems.map((item, index) => {
              return !(item?.subMenuItems?.length > 0) ? (
                <div>
                  <DropdownMenuItem onClick={item.onClick}>
                    <ListItemText>{item.text}</ListItemText>
                  </DropdownMenuItem>
                </div>
              ) : (
                <DropdownNestedMenuItem
                  label={item.text}
                  rightAnchored
                  menu={[
                    ...(item.subMenuItems ?? []).map((subItem, index) => {
                      return (
                        !!subItem && (
                          <DropdownMenuItem onClick={subItem.onClick}>
                            <ListItemText>{subItem.text}</ListItemText>
                          </DropdownMenuItem>
                        )
                      );
                    }),
                  ]}
                >
                  <ListItemText>{item.text}</ListItemText>
                </DropdownNestedMenuItem>
              );
            })}
          />
        }
        title={randomAnimalName}
        subheader={randomDate}
      />
      <CardMedia
        component="img"
        image={
          imageId
            ? `/feed/${isDarkMode ? "dark" : "light"}/${imageId}.jpg`
            : postDetails?.payload?.image?.data
        }
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {postDetails?.payload?.content}
        </Typography>
      </CardContent>
      {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" style={{ marginLeft: 'auto' }}>
          <FavoriteIcon />
        </IconButton>
      </CardActions> */}

      {/* <Accordion expanded={expanded.includes(postDetails?.id)} onChange={handleChange(postDetails?.id)}>
        <AccordionSummary
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <CommentIcon style={{ marginRight: 5 }} />
          <Typography variant="body2" color="text.secondary">
            Comments
          </Typography>
          <IconButton aria-label="add to favorites" style={{ marginLeft: 'auto', padding: 0 }} onClick={(e) => e.stopPropagation()}>
          <FavoriteIcon />
        </IconButton>
        </AccordionSummary>
        <AccordionDetails>
          <Accordion expanded={expanded.includes(imageId)} onChange={handleChange(imageId)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <CommentIcon style={{ marginRight: 5 }} />
              <Typography variant="body2" color="text.secondary">
                Comments
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>hello world</Typography>

              <OutlinedInput className={classes.messageInputContainer}
                id="outlined-adornment-weight"
                endAdornment={
                  <>
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="send message"
                        //   onClick={handleSendMessage}
                        // icon is green when there is text in the input field
                        //   color={messageInputValue || imageAttachment ? "primary" : "disabled"}
                        //   disabled={(!messageInputValue && !imageAttachment) || !isOnline}
                        edge="end"
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  </>
                }
                aria-describedby="outlined-weight-helper-text"
                //   onChange={handleMessageChange}
                // on Enter key press, send message
                // but on on shift Enter
                //   onKeyPress={(ev) => {
                //     if (ev.key === 'Enter' && !ev.shiftKey) {
                //       ev.preventDefault();
                //       if (!!messageInputValue) handleSendMessage();
                //     }
                //   }}
                //   value={messageInputValue}
                classes={{ root: classes.messageInput }}
                sx={{ width: '100%' }}
                autoComplete="off"
                // lightblue background
                // style={{ backgroundColor: '#f0f8ff' }}
                multiline
                inputProps={{
                  'aria-label': 'weight',
                }}
              />
            </AccordionDetails>
          </Accordion>

          <OutlinedInput className={classes.messageInputContainer}
            id="outlined-adornment-weight"
            endAdornment={
              <>
                <InputAdornment position="end">
                  <IconButton
                    aria-label="send message"
                    //   onClick={handleSendMessage}
                    // icon is green when there is text in the input field
                    //   color={messageInputValue || imageAttachment ? "primary" : "disabled"}
                    //   disabled={(!messageInputValue && !imageAttachment) || !isOnline}
                    edge="end"
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              </>
            }
            aria-describedby="outlined-weight-helper-text"
            //   onChange={handleMessageChange}
            // on Enter key press, send message
            // but on on shift Enter
            //   onKeyPress={(ev) => {
            //     if (ev.key === 'Enter' && !ev.shiftKey) {
            //       ev.preventDefault();
            //       if (!!messageInputValue) handleSendMessage();
            //     }
            //   }}
            //   value={messageInputValue}
            classes={{ root: classes.messageInput }}
            sx={{ width: '100%' }}
            autoComplete="off"
            // lightblue background
            // style={{ backgroundColor: '#f0f8ff' }}
            multiline
            inputProps={{
              'aria-label': 'weight',
            }}
          />
        </AccordionDetails>
      </Accordion> */}
      <CustomAccordion
        title={
          <Typography variant="body" color="text.primary">
            Comments
          </Typography>
        }
        customButtons={
          <IconButton
            aria-label="add to favorites"
            style={{ marginLeft: "auto", padding: 0 }}
            onClick={(e) => e.stopPropagation()}
            disableRipple
          >
            <FavoriteIcon />
          </IconButton>
        }
        showExpandIcon={false}
      >
        <CustomAccordion
          title={
            <>
              <Typography variant="body" color="text.primary">
                {randomAnimalName} - {randomDate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {randomShortSentence}
              </Typography>
            </>
          }
          avatar="R"
          customButtons={
            <IconButton
              aria-label="add to favorites"
              style={{ marginLeft: "auto", padding: 0 }}
              onClick={(e) => e.stopPropagation()}
              disableRipple
            >
              <FavoriteIcon />
            </IconButton>
          }
          showExpandIcon={false}
        >
          <Typography variant="body2" color="text.secondary">
            {randomLongSentence}
          </Typography>
          <InputComponent />
        </CustomAccordion>

        <InputComponent />
      </CustomAccordion>
    </Card>
  );
};

export default Post;
