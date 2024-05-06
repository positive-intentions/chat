import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import ListItemIcon from "@mui/material/ListItemIcon";
import ChevronRight from "@mui/icons-material/ChevronRight";
import MailIcon from "@mui/icons-material/Mail";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import DownloadIcon from "@mui/icons-material/Download";
import CloudIcon from "@mui/icons-material/Cloud";
import StorageIcon from "@mui/icons-material/Storage";
import DevicesIcon from "@mui/icons-material/Devices";
import {
  SwipeableList,
  SwipeableListItem,
} from "@sandstreamdev/react-swipeable-list";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import CollectionsIcon from "@mui/icons-material/Collections";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import NavigationIcon from "@mui/icons-material/Navigation";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import BrushIcon from "@mui/icons-material/Brush";
import GroupsIcon from "@mui/icons-material/Groups";

import "@sandstreamdev/react-swipeable-list/dist/styles.css";

const useStyles = makeStyles((theme) => ({
  chevron: {
    justifyContent: "right",
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
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
  "&.green .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
  },
  "&.amber .MuiBadge-badge": {
    backgroundColor: "#FFA500",
    color: "#FFA500",
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

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export default function ListComponent({
  heading,
  list,
  chevronOverride,
  sections,
}) {
  const classes = useStyles();
  const [isSwiping, setIsSwiping] = React.useState(false);

  const handleClick = (itemOnClick) => {
    console.log({ isSwiping });
    if (!isSwiping) {
      itemOnClick();
    }
  };

  const handleStartSwiping = () => {
    // console.log({ isSwiping: true })
    // setIsSwiping(true);
  };

  const handleEndSwiping = () => {
    console.log({ isSwiping });
    if (isSwiping < 10) {
      console.log("click action");
    }
    setIsSwiping(false);
  };

  return (
    <Root>
      <List>
        {sections &&
          sections.length > 0 &&
          sections.map((section) => (
            <>
              {!!section.heading && (
                <Divider>
                  <Chip label={section.heading} />
                </Divider>
              )}

              {section.list.map((item) => {
                return (
                  <ListItem button key={item.id} onClick={item.onClick}>
                    <ListItemIcon>
                      <StyledBadge
                        className={item.isOnline ? "green" : "amber"}
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        variant="dot"
                        invisible={!item.isOnline && !item.isSomeOnline}
                      >
                        {!item.isCloud &&
                          !item.isGram &&
                          !item.isVerse &&
                          !item.isMap &&
                          !item.isAI &&
                          !item.isVinnC &&
                          !item.isContacts && (
                            <Avatar src={item.avatarUrl} alt={item.name}>
                              {item.name ? item.name[0] : "-"}
                            </Avatar>
                          )}
                        {!!item.isCloud && (
                          <Avatar>
                            <StorageIcon />
                          </Avatar>
                        )}
                        {!!item.isGram && (
                          <Avatar>
                            <CollectionsIcon />
                          </Avatar>
                        )}
                        {!!item.isVerse && (
                          <Avatar>
                            <ViewInArIcon />
                          </Avatar>
                        )}
                        {!!item.isMap && (
                          <Avatar>
                            <NavigationIcon />
                          </Avatar>
                        )}
                        {!!item.isAI && (
                          <Avatar>
                            <SmartToyIcon />
                          </Avatar>
                        )}
                        {!!item.isVinnC && (
                          <Avatar>
                            <BrushIcon />
                          </Avatar>
                        )}
                        {!!item.isContacts && (
                          <Avatar>
                            <GroupsIcon />
                          </Avatar>
                        )}
                      </StyledBadge>
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      primaryTypographyProps={{
                        style: {
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        },
                      }}
                    />
                    {!!item.isClone && (
                      <ListItemIcon className={classes.chevron}>
                        <Badge color="primary" badgeContent={0}>
                          <DevicesIcon />
                        </Badge>
                      </ListItemIcon>
                    )}
                    {!!item.isCloud && (
                      <ListItemIcon className={classes.chevron}>
                        <Badge color="primary" badgeContent={item.unreadCount}>
                          <CloudIcon />
                        </Badge>
                      </ListItemIcon>
                    )}
                    {!item.isCloud && item.unreadCount > 0 && (
                      <ListItemIcon className={classes.chevron}>
                        <Badge color="primary" badgeContent={item.unreadCount}>
                          <MailIcon />
                        </Badge>
                      </ListItemIcon>
                    )}
                    <ListItemIcon
                      className={classes.chevron}
                      button
                      onClick={item.onClick}
                    >
                      {chevronOverride ? chevronOverride : <ChevronRight />}
                    </ListItemIcon>
                  </ListItem>
                );
              })}
            </>
          ))}

        {(!sections || sections.length === 0) && (
          <>
            {!!heading && list.length > 0 && (
              <Divider>
                <Chip label={heading} />
              </Divider>
            )}
            {/* <SwipeableList> */}

            {list.map((item) => {
              const handleEndSwipingWithClick = () => {
                console.log({ isSwiping });
                if (isSwiping < 10) {
                  console.log("click action");
                  item.onClick();
                }
                setIsSwiping(false);
              };
              return (
                // <SwipeableListItem
                //     swipeLeft={{
                //         content: <DoubleArrowIcon style={{ height: '30px', marginRight: 20 }} />,
                //         action: () => handleClick(item.onClick)
                //     }}
                //     swipeRight={{
                //         content: <DownloadIcon style={{ height: '30px', marginLeft: 20 }} />,
                //         action: () => console.info('swipe action triggered')
                //     }}
                //     // onSwipeProgress={setIsSwiping}
                //     // onSwipeStart={handleStartSwiping}
                //     // onSwipeEnd={handleEndSwipingWithClick}
                // >
                <ListItem button key={item.id} onClick={item.onClick}>
                  <ListItemIcon>
                    <StyledBadge
                      className={item.isOnline ? "green" : "amber"}
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                      invisible={!item.isOnline && !item.isSomeOnline}
                    >
                      <Avatar src={item.avatarUrl} alt={item.name}>
                        {item.name ? item.name[0] : "-"}
                      </Avatar>
                    </StyledBadge>
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      style: {
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      },
                    }}
                  />
                  {!!item.isClone && (
                    <ListItemIcon className={classes.chevron}>
                      <Badge color="primary" badgeContent={0}>
                        <DevicesIcon />
                      </Badge>
                    </ListItemIcon>
                  )}
                  {item.unreadCount > 0 && (
                    <ListItemIcon className={classes.chevron}>
                      <Badge color="primary" badgeContent={item.unreadCount}>
                        <MailIcon />
                      </Badge>
                    </ListItemIcon>
                  )}
                  <ListItemIcon
                    className={classes.chevron}
                    button
                    onClick={item.onClick}
                  >
                    {chevronOverride ? chevronOverride : <ChevronRight />}
                  </ListItemIcon>
                </ListItem>
                // </SwipeableListItem>
              );
            })}
            {/* </SwipeableList> */}
            {!!false && !!heading && list.length > 0 && (
              <Divider>
                <Chip label={"Network"} />
              </Divider>
            )}
            {!!false && !!heading && list.length > 0 && (
              <Divider>
                <Chip label={"Cloud"} />
              </Divider>
            )}
          </>
        )}
      </List>
    </Root>
  );
}
