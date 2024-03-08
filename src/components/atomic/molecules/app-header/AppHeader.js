import React, { useState, useEffect, useMemo } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VideocamIcon from "@mui/icons-material/Videocam";
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { useNavigate } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import InfoIcon from "@mui/icons-material/Info";
import ContentCut from "@mui/icons-material/ContentCut";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import TranslateIcon from "@mui/icons-material/Translate";
import CallIcon from "@mui/icons-material/Call";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import InstallMobileIcon from "@mui/icons-material/InstallMobile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import SupportIcon from '@mui/icons-material/Support';
import DescriptionIcon from "@mui/icons-material/Description";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ScienceIcon from "@mui/icons-material/Science";
import GitHubIcon from "@mui/icons-material/GitHub";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RedditIcon from "@mui/icons-material/Reddit";
import CollectionsIcon from "@mui/icons-material/Collections";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import Download from "@mui/icons-material/DownloadForOffline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import { useTranslation } from "react-i18next";
import { ColorModeContext } from "../../../../App.tsx";
import { useTheme } from "@mui/material/styles";
import { useNotification } from "../../../notifications/notificationManager";
import { languages } from "../../../translations/i18n";

import Slide from "@mui/material/Slide";

import {
  Dropdown,
  DropdownMenuItem,
  DropdownNestedMenuItem,
} from "../../../atomic/atom/dropdown/Dropdown";

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

const presetIcons = {
  account: <AccountCircle />,
  arrowBack: <ArrowBackIcon />,
  camera: <VideocamIcon />,
  settings: <SettingsIcon />,
  more: <MoreVertIcon />,
  logout: <LogoutIcon />,
  info: <InfoIcon />,
  folder: <PermMediaIcon />,
  document: <DescriptionIcon />,
  screen: <ScreenShareIcon />,
  call: <CallIcon />,
  fullscreen: <FullscreenIcon />,
  fullscreenExit: <FullscreenExitIcon />,
  lightMode: <LightModeIcon />,
  darkMode: <DarkModeIcon />,
  translate: <TranslateIcon />,
  install: <InstallMobileIcon />,
  docs: <MenuBookIcon />,
  github: <GitHubIcon />,
  reddit: <RedditIcon />,
  youtube: <YouTubeIcon />,
  navigate: <AssistantDirectionIcon />,
  delete: <DeleteIcon />,
  labs: <ScienceIcon />,
  gram: <CollectionsIcon />,
  verse: <ViewInArIcon />,
  callContact: <ContactPhoneIcon />,
  help: <QuestionMarkIcon />,
  privacy: <PrivacyTipIcon />,
  support: <SupportIcon />,
  download: <Download />,
  cast: <LiveTvIcon />,
  qr: <QrCode2Icon />,
  connect: <ConnectWithoutContactIcon />,
};

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const CustomDropdown = ({ menuItems }) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const colorMode = React.useContext(ColorModeContext);
  const sendNotification = useNotification();
  const navigate = useNavigate();

  const isInstalledPwa = useMemo(() => {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone ||
      document.referrer.includes("android-app://")
    );
  }, []);

  useEffect(() => {
    const handleFullscreenChange = async () => {
      const isInFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement;
      
      if (!isInFullscreen && isFullScreen && document.documentElement.requestFullscreen) {
        // Attempt to enter fullscreen
        try {
          await document.documentElement.requestFullscreen();
        } catch (error) {
          console.log(error);
        }
      } else if (isInFullscreen && !isFullScreen && document.exitFullscreen) {
        // Attempt to exit fullscreen
        try {
          await document.exitFullscreen();
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    handleFullscreenChange();
  }, [isFullScreen]);
  

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  useEffect(() => {
    const handleBeforeInstallPromptEvent = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPromptEvent,
    );

    const bipEvent = new Event("beforeinstallprompt");

    // Define the prompt method on the event object
    bipEvent.prompt = () => {
      return new Promise((resolve) => {
        // Simulate user accepting the prompt
        resolve({ outcome: "accepted" }); // or 'dismissed' to simulate user dismissing the prompt
      });
    };

    // Dispatch the custom event to trigger your event handler
    window.dispatchEvent(bipEvent);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPromptEvent,
      );
    };
  }, []);

  const defaultMenuItems = [
    {
      text: t("components.menuItems.about"),
      icon: "info",
      subMenuItems: [
        {
          text: t("components.menuItems.terms"),
          icon: "document",
          onClick: () => navigate("/terms"),
        },
        {
          text: t("components.menuItems.privacy"),
          icon: "privacy",
          onClick: () => navigate("/terms/privacy"),
        },
        {
          text: t("components.menuItems.docs"),
          icon: "docs",
          onClick: () =>
            window.open("https://positive-intentions.com/docs/intro"),
        },
        {
          text: t("components.menuItems.github"),
          icon: "github",
          onClick: () => window.open("https://github.com/positive-intentions"),
        },
        {
          text: t("components.menuItems.reddit"),
          icon: "reddit",
          onClick: () =>
            window.open("https://www.reddit.com/r/positive_intentions/"),
        },
        {
          text: t("components.menuItems.youtube"),
          icon: "youtube",
          onClick: () =>
            window.open("https://www.youtube.com/@positive_intentions"),
        },
        {
          text: t("components.menuItems.contact"),
          icon: "support",
          onClick: () =>
            window.open("https://www.reddit.com/user/Accurate-Screen8774"),
        },
      ],
    },
    {
      text: t("components.menuItems.options"),
      icon: "settings",
      subMenuItems: [
        {
          text:
            theme.palette.mode === "dark"
              ? t("components.menuItems.lightMode")
              : t("components.menuItems.darkMode"),
          icon: theme.palette.mode === "dark" ? "lightMode" : "darkMode",
          onClick: colorMode.toggleColorMode,
        },
        !isInstalledPwa
          ? {
              text: isFullScreen
                ? t("components.menuItems.exitFullscreen")
                : t("components.menuItems.fullscreen"),
              icon: isFullScreen ? "fullscreenExit" : "fullscreen",
              onClick: () => setIsFullScreen(!isFullScreen),
            }
          : null,
        !isInstalledPwa
          ? {
              text: t("components.menuItems.install"),
              icon: "install",
              onClick: () => {
                sendNotification?.(
                  t("components.menuItems.requestingToInstall"),
                  { variant: "info" },
                );

                if (deferredPrompt) {
                  deferredPrompt
                    ?.prompt()
                    .then((result) => {
                      if (result.outcome === "accepted") {
                        console.log("Installation accepted");
                        sendNotification?.(
                          t("components.menuItems.installPossible"),
                          { variant: "success" },
                        );
                      } else {
                        console.log("Installation dismissed");
                        sendNotification?.(
                          t("components.menuItems.installDismissed"),
                          { variant: "warning" },
                        );
                      }
                    })
                    .catch((error) => {
                      console.error("Installation prompt error:", error);
                      sendNotification?.(
                        t("components.menuItems.installFailed"),
                        { variant: "warning" },
                      );
                    });
                } else {
                  console.error(
                    "The beforeinstallprompt event has not been fired.",
                  );
                  sendNotification?.(
                    t("components.menuItems.installNotSupported"),
                    { variant: "warning" },
                  );
                }
              },
            }
          : null,
        {
          text: t("components.menuItems.downloadZip"),
          icon: "download",
          onClick: () => window.open("/positive-intentions.zip"),
        },
      ],
    },
    {
      text: t("components.menuItems.language"),
      icon: "translate",
      subMenuItems: [
        // { text: 'English', onClick: () => i18n.changeLanguage('en') },
        // { text: 'Spanish', onClick: () => i18n.changeLanguage('es') },
        // { text: 'Mandarin', onClick: () => i18n.changeLanguage('zh') },
        // { text: 'Gujrati', onClick: () => i18n.changeLanguage('gu') },
        ...languages.map((language) => {
          return {
            text: language.name,
            onClick: () => i18n.changeLanguage(language.id),
          };
        }),
      ],
    },
  ];

  return (
    <Dropdown
      keepOpen
      trigger={
        <IconButton
          ref={menuItems.ref}
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
        >
          {presetIcons[menuItems.icon ?? "more"]}
        </IconButton>
      }
      menu={[
        ...(menuItems?.items ?? [])
          .concat(defaultMenuItems)
          .filter((i) => !!i)
          .map((item, index) => {
            return !(item?.subMenuItems?.length > 0) ? (
              <div>
                <DropdownMenuItem onClick={item.onClick}>
                  <ListItemIcon>
                    {/* <ContentCut fontSize="small" /> */}
                    {presetIcons[item.icon]}
                  </ListItemIcon>
                  <ListItemText>{item.text}</ListItemText>
                </DropdownMenuItem>
              </div>
            ) : (
              <DropdownNestedMenuItem
                label={item.text}
                leftIcon={
                  <ListItemIcon>
                    {/* <ContentCut fontSize="small" /> */}
                    {presetIcons[item.icon]}
                  </ListItemIcon>
                }
                rightAnchored
                menu={[
                  ...(item.subMenuItems ?? []).map((subItem, index) => {
                    return (
                      !!subItem && (
                        <DropdownMenuItem onClick={subItem.onClick}>
                          {subItem.icon && (
                            <ListItemIcon>
                              {/* <ContentCut fontSize="small" /> */}
                              {presetIcons[subItem.icon]}
                            </ListItemIcon>
                          )}
                          <ListItemText>{subItem.text}</ListItemText>
                        </DropdownMenuItem>
                      )
                    );
                  }),
                ]}
              >
                <ListItemIcon>
                  {/* <ContentCut fontSize="small" /> */}
                  {presetIcons[item.icon]}
                </ListItemIcon>
                <ListItemText>{item.text}</ListItemText>
              </DropdownNestedMenuItem>
            );
          }),
      ]}
    />
  );
};

export default function AppHeader(
  {
    disabled,
    title,
    leftIcon,
    rightIcon,
    backButton,
    backCount,
    avatarProps = {},
    menuProps = {},
    customButtons = [],
    hideOnScroll,
  },
  ...props
) {
  if (disabled) return null;
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [subMenuAnchorEl, setSubMenuAnchorEl] = React.useState(null);
  const menuRef = React.useRef(null);
  const subMenuRef = React.useRef(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(menuRef);
  };

  const handleSubMenuMenu = (event) => {
    setSubMenuAnchorEl(subMenuRef);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubMenuClose = () => {
    setSubMenuAnchorEl(null);
  };

  const [subMenuOpen, setSubMenuOpen] = React.useState(false);

  const AppBarRender = () => (
    <AppBar>
      <Toolbar>
        {backButton && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            // sx={{ mr: 2 }}
            onClick={() => {
              if (typeof backButton === 'function') backButton();
              navigate(typeof backButton === "string" ? backButton : -1)
            }}
          >
            <Badge color="info" badgeContent={backCount}>
              {presetIcons.arrowBack}
            </Badge>
          </IconButton>
        )}

        {Object.keys(avatarProps).length > 0 && (
          <StyledBadge
            className={avatarProps?.isOnline ? "green" : "amber"}
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
            invisible={!avatarProps?.isOnline && !avatarProps?.isSomeOnline}
            sx={{ mr: 2 }}
          >
            <Avatar
              src={avatarProps?.src ?? ""}
              alt={avatarProps?.alt ?? "-"}
            />
          </StyledBadge>
        )}

        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Typography>

        {customButtons.map((button, index) => {
          return (
            <IconButton
              key={index}
              ref={menuRef}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={button.onClick}
              color="inherit"
            >
              {presetIcons[button.icon]}
            </IconButton>
          );
        })}

        <CustomDropdown menuItems={menuProps} />
      </Toolbar>
    </AppBar>
  );

  return (
    <>
      <CssBaseline />
      {hideOnScroll ? (
        <HideOnScroll {...props}>
          <AppBarRender />
        </HideOnScroll>
      ) : (
        <AppBarRender />
      )}
    </>
  );
}
