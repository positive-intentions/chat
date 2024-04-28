import React, { useState, useEffect, useMemo, useRef, forwardRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { makeStyles, useTheme } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { updateUsername } from "../../redux/slices/podsSlice";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../atomic/organism/page-container/PageContainer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListComponent from "../../atomic/molecules/list/List";
import usePeer from "../../p2p/usePeer";
import Blockchain, { useBlockchain } from "../../blockchain/Blockchain";
import { compiler as profileCompiler } from "../../blockchain/chains/profileChain";
import { compiler as podCompiler } from "../../blockchain/chains/podChain";
import { useNotification } from "../../notifications/notificationManager";
import { useTranslation } from "react-i18next";
import { ColorModeContext } from "../../../App.tsx";
import { t } from "i18next";
import { logToNLevelAnalytics } from "../../utils/analytics";
import { CoachMark } from "react-coach-mark";
import DocLink from "../../atomic/atom/docLink/DocLink";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
}));

function GroupsListPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const storedPods = useSelector((state) => state.pods);
  const storedContacts = useSelector((state) => state.contacts);
  const sendNotification = useNotification();

  const userProfileBlockchain = useSelector(
    (state) => state.userProfile.blockchain,
  );
  const { compiledBlockchain: userProfile } = useBlockchain({
    compiler: profileCompiler,
    blockchain: userProfileBlockchain,
  });
  const storedPersonalId = userProfile.connectionId;
  // const storedPersonalId = useSelector((state) => state.userProfile.id);
  const { activeConnections } = usePeer();

  const { compiledBlockchains: compiledPods } = useBlockchain({
    compiler: podCompiler,
    blockchains: storedPods.map((pod) => pod.blockchain),
  });

  const podsList = compiledPods
    .filter((pod) => pod && pod.id)
    .map((pod) => {
      // get unreadCount from redux
      const unreadCount =
        storedPods.find((p) => p.id === pod.id)?.unreadCount || 0;

      return {
        ...pod,
        onClick: () => navigate(`/pod/${pod.id}`),
        name:
          pod.users?.length > 2 ?? false
            ? pod.name
            : storedContacts.find(
                (contact) =>
                  contact.connectionId ===
                  pod.users?.filter(
                    (memberId) => memberId !== storedPersonalId,
                  )[0],
              )?.displayName ?? "Please wait",
        avatarUrl:
          pod.users?.length > 2 ?? false
            ? pod.avatar
            : storedContacts.find(
                (contact) =>
                  contact.connectionId ===
                  pod.users?.filter(
                    (memberId) => memberId !== storedPersonalId,
                  )[0],
              )?.avatar ?? "-",
        isOnline: pod.users
          .filter((c) => c !== storedPersonalId)
          .every((c) => activeConnections.includes(c)),
        isSomeOnline: pod.users
          .filter((c) => c !== storedPersonalId)
          .some((c) => activeConnections.includes(c)),
        unreadCount,
        isClone: pod.clone,
      };
    });

  const sections = [
    {
      heading: t("podsPage.social"),
      list: podsList.filter((pod) => !pod.isClone),
    },
    {
      heading: t("podsPage.devices"),
      list: podsList.filter((pod) => pod.isClone),
    },
    {
      heading: t("podsPage.cloud"),
      list: [
        {
          onClick: () => navigate("/contacts"),
          name: t("contactsPage.pageTitle"),
          avatarUrl: "-",
          // isOnline: pod.users
          //   .filter(c => c !== storedPersonalId)
          //   .every(c => activeConnections.includes(c)),
          // isSomeOnline: pod.users
          //   .filter(c => c !== storedPersonalId)
          //   .some(c => activeConnections.includes(c)),
          // unreadCount,
          // unreadCount: podsList.filter(pod => pod.isClone)
          //   .filter(pod => pod.isSomeOnline).length,
          isContacts: true,
        },
        // {
        //   onClick: () => navigate("/feed"),
        //   name: t("podsPage.gram"),
        //   avatarUrl: "-",
        //   // isOnline: pod.users
        //   //   .filter(c => c !== storedPersonalId)
        //   //   .every(c => activeConnections.includes(c)),
        //   // isSomeOnline: pod.users
        //   //   .filter(c => c !== storedPersonalId)
        //   //   .some(c => activeConnections.includes(c)),
        //   // unreadCount,
        //   // unreadCount: podsList.filter(pod => pod.isClone)
        //   //   .filter(pod => pod.isSomeOnline).length,
        //   isGram: true,
        // },
        // {
        //   onClick: () => navigate("/verse"), // sendNotification(t('podsPage.commingSoon'), { variant: 'info' }),
        //   name: t("podsPage.verse"),
        //   avatarUrl: "-",
        //   // isOnline: pod.users
        //   //   .filter(c => c !== storedPersonalId)
        //   //   .every(c => activeConnections.includes(c)),
        //   // isSomeOnline: pod.users
        //   //   .filter(c => c !== storedPersonalId)
        //   //   .some(c => activeConnections.includes(c)),
        //   // unreadCount,
        //   unreadCount: podsList
        //     .filter((pod) => pod.isClone)
        //     .filter((pod) => pod.isSomeOnline).length,
        //   isVerse: true,
        // },
        // {
        //   onClick: () => navigate('/map'), // sendNotification(t('podsPage.commingSoon'), { variant: 'info' }),
        //   name: t('podsPage.map'),
        //   avatarUrl: "-",
        //   // isOnline: pod.users
        //   //   .filter(c => c !== storedPersonalId)
        //   //   .every(c => activeConnections.includes(c)),
        //   // isSomeOnline: pod.users
        //   //   .filter(c => c !== storedPersonalId)
        //   //   .some(c => activeConnections.includes(c)),
        //   // unreadCount,
        //   unreadCount: podsList.filter(pod => pod.isClone)
        //     .filter(pod => pod.isSomeOnline).length,
        //   isMap: true,
        // },
        // {
        //   onClick: () => sendNotification(t('podsPage.commingSoon'), { variant: 'info' }),
        //   name: t('podsPage.ai'),
        //   avatarUrl: "-",
        //   // isOnline: pod.users
        //   //   .filter(c => c !== storedPersonalId)
        //   //   .every(c => activeConnections.includes(c)),
        //   // isSomeOnline: pod.users
        //   //   .filter(c => c !== storedPersonalId)
        //   //   .some(c => activeConnections.includes(c)),
        //   // unreadCount,
        //   unreadCount: podsList.filter(pod => pod.isClone)
        //     .filter(pod => pod.isSomeOnline).length,
        //   isAI: true,
        // },
        // {
        //   onClick: () => sendNotification(t('podsPage.commingSoon'), { variant: 'info' }),
        //   name: t('podsPage.vinnc'),
        //   avatarUrl: "-",
        //   // isOnline: pod.users
        //   //   .filter(c => c !== storedPersonalId)
        //   //   .every(c => activeConnections.includes(c)),
        //   // isSomeOnline: pod.users
        //   //   .filter(c => c !== storedPersonalId)
        //   //   .some(c => activeConnections.includes(c)),
        //   // unreadCount,
        //   unreadCount: podsList.filter(pod => pod.isClone)
        //     .filter(pod => pod.isSomeOnline).length,
        //   isVinnC: true,
        // },
        // {
        //   onClick: () => sendNotification(t('podsPage.commingSoon'), { variant: 'info' }),
        //   name: t('podsPage.storage'),
        //   avatarUrl: "-",
        //   // isOnline: pod.users
        //   //   .filter(c => c !== storedPersonalId)
        //   //   .every(c => activeConnections.includes(c)),
        //   // isSomeOnline: pod.users
        //   //   .filter(c => c !== storedPersonalId)
        //   //   .some(c => activeConnections.includes(c)),
        //   // unreadCount,
        //   unreadCount: podsList.filter(pod => pod.isClone)
        //     .filter(pod => pod.isSomeOnline).length,
        //   isCloud: true,
        // }
      ],
    },
  ].filter((s) => s.list.length > 0);

  return (
    <ListComponent heading={"Social"} list={podsList} sections={sections} />
  );
}

export default function Pods() {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const colorMode = React.useContext(ColorModeContext);

  const [activatedNumber, setActivateNumber] = useState(null);
  const NextButton = (
    <Button
      variant="contained"
      color="primary"
      onClick={() => setActivateNumber(activatedNumber + 1)}
    >
      Next
    </Button>
  );
  const PrevButton = (
    <Button
      variant="contained"
      color="primary"
      onClick={() => setActivateNumber(activatedNumber - 1)}
    >
      Prev
    </Button>
  );

  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const coachList = [
    // {
    //   activate: true,
    //   component:
    //     <Typography style={{
    //     color: 'black',
    //   }}>Info and app settings <br />{NextButton} </Typography>,
    //   reference: ref1,
    //   tooltip: { position: 'bottom' }
    // },
    {
      activate: true,
      component: (
        <Typography
          style={{
            color: "black",
          }}
        >
          Add a new contact to get started <br />
          {NextButton}{" "}
        </Typography>
      ),
      reference: ref2,
      tooltip: { position: "bottom" },
    },
  ];

  const coach = coachList[activatedNumber];

  useEffect(() => {
    logToNLevelAnalytics("podsPageLoaded");
  }, []);

  // make it so the form submits and updates the username in redux and navigates to the conversations page
  // const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const sendNotification = useNotification();

  // const storedInAppNotification = useSelector(state => state.userProfile.inAppNotification);
  // const storedBrowserNotification = useSelector(state => state.userProfile.browserNotification);

  const storedPods = useSelector((state) => state.pods);
  const storedBlockchain = useSelector((state) => state.userProfile.blockchain);
  const profileBlockchain = useMemo(
    () =>
      new Blockchain({
        compiler: profileCompiler,
        chain: storedBlockchain.chain.filter((b) => !!b) || [],
        storage: storedBlockchain.storage || {},
      }),
    [storedBlockchain.chain, storedBlockchain.storage],
  );

  const compiledProfile = useMemo(
    () => profileBlockchain.compile(),
    [profileBlockchain],
  );
  // const storedInAppNotification = compiledProfile.settings.inAppNotification;
  const storedBrowserNotification =
    compiledProfile.settings?.browserNotification;

  // const dispatch = useDispatch();
  // const updateUsernameDispatch = (username) => dispatch(updateUsername(username));

  // const handleUsernameChange = (event) => {
  //   setUsername(event.target.value);
  // };

  // const isSubmitDisabled = !username;

  useEffect(() => {
    if (storedBrowserNotification) {
      if (Notification.permission === "granted") return;

      if (
        Notification.permission !== "denied" ||
        Notification.permission === "default"
      ) {
        Notification.requestPermission(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            sendNotification("👍 Notification permission granted ", {
              variant: "success",
            });
          }
        });
      }
    }
  }, []);

  useEffect(() => {
    if (storedPods.length === 0) {
      navigate("/contacts");
    }
  }, [storedPods.length]);

  const isInstalledPwa = useMemo(() => {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone ||
      document.referrer.includes("android-app://")
    );
  }, []);

  //   const [deferredPrompt, setDeferredPrompt] = useState(null);
  //   useEffect(() => {
  //     const handleBeforeInstallPromptEvent = (e) => {
  //         console.log('setting defferedPrompt')
  //         e.preventDefault();
  //         setDeferredPrompt(e);
  //     };
  //     window.addEventListener('beforeinstallprompt', handleBeforeInstallPromptEvent);

  //     const bipEvent = new Event('beforeinstallprompt');

  //     // Define the prompt method on the event object
  //     bipEvent.prompt = () => {
  //         return new Promise((resolve) => {
  //             // Simulate user accepting the prompt
  //             resolve({ outcome: 'accepted' });  // or 'dismissed' to simulate user dismissing the prompt
  //         });
  //     };

  //     // Dispatch the custom event to trigger your event handler
  //     window.dispatchEvent(bipEvent);
  //     return () => {
  //         window.removeEventListener('beforeinstallprompt', handleBeforeInstallPromptEvent);
  //     };
  // }, []);

  return (
    <PageContainer
      headerProps={{
        title: t("podsPage.pageTitle"),
        // backButton: true,
        // avatarProps: {
        //   src: "https://source.unsplash.com/random/400x200?login",
        //   alt: "random"
        // },
        customButtons: [
          // {
          //   icon: "help",
          //   onClick: () => setActivateNumber(0),
          // },
          <DocLink key="docs" docLink="https://positive-intentions.com/docs/basics/pods" />,
        ],
        menuProps: {
          icon: "more",
          ref: ref1,
          items: [
            {
              text: t("components.menuItems.profile"),
              icon: "account",
              onClick: () => navigate("/profile"),
            },
            //   { text: theme.palette.mode === 'dark' ? 'Light Mode' : 'Dark Mode', icon: theme.palette.mode === 'dark' ? 'lightMode' : 'darkMode', onClick: colorMode.toggleColorMode },
            //   !isInstalledPwa ? {
            //     text: 'Install App', icon: 'install', onClick: () => {
            //         sendNotification?.('Requesting to install.', { variant: 'info' })

            //         if (deferredPrompt) {
            //             deferredPrompt.prompt()
            //                 .then((result) => {
            //                     if (result.outcome === 'accepted') {
            //                         console.log('Installation accepted');
            //                         sendNotification?.('👍 Install possible. Try from your browser settings.', { variant: 'success' })

            //                     } else {
            //                         console.log('Installation dismissed');
            //                         sendNotification?.('👎 Autoinstall dismissed. You can install through your browser.', { variant: 'warning' })

            //                     }
            //                 })
            //                 .catch((error) => {
            //                     console.error('Installation prompt error:', error);
            //                     sendNotification?.('👎 Autoinstall failed. You might be able to install through your browser.', { variant: 'warning' })

            //                 });
            //         } else {
            //             console.error('The beforeinstallprompt event has not been fired.');
            //             sendNotification?.('👎 Autoinstall failed. You might be able to install through your browser.', { variant: 'warning' })
            //         }
            //     }
            // } : null,
            //   // { text: 'Language', icon: 'translate', onClick: () => navigate('/privacy'), subMenuItems: [
            //   //   { text: 'English', onClick: () => navigate('/privacy') },
            //   //   { text: 'Spanish', onClick: () => navigate('/privacy') },
            //   // ] },
            //   { text: 'Terms', icon: 'document', onClick: () => navigate('/terms') },
            //   { text: 'About', icon: 'info', onClick: () => window.location = 'https://positive-intentions.com' },
            //   // { text: 'throw', icon: 'info', onClick: () => {
            //   //   const myArrowFunction = () => {
            //   //     throw new Error('This is an error message');
            //   //   };

            //   //   myArrowFunction();
            //   // }},
          ].filter((i) => !!i),
        },
      }}
      // fabProps={{
      //   icon: "add",
      //   onClick: () => {
      //     navigate('/contacts');
      //   }
      // }}
    >
      <CoachMark {...coach} />
      <div ref={ref2}>
        <GroupsListPage />
      </div>
    </PageContainer>
  );
}
