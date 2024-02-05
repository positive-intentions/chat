// import React, { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { useSelector, useDispatch } from 'react-redux'
// import { updateUsername } from '../../redux/slices/userProfileSlice';
// import { useNavigate } from "react-router-dom";
// import AppHeader from '../../atomic/molecules/app-header/AppHeader';
// import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';

// export default function LoginForm() {
//   // const classes = useStyles();
//   const [username, setUsername] = useState('');
//   const navigate = useNavigate();

//   const storedUsername = useSelector((state) => state.userProfile.username)
//   const dispatch = useDispatch();
//   const updateUsernameDispatch = (username) => dispatch(updateUsername(username));

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const isSubmitDisabled = !username;

//   // make the form submit button dispatch the update action for username
//   return (
//     <Container maxWidth={false} disableGutters>
//       <AppHeader
//         title="Login"
//       />

//       {/* <box>

//       </box>

//       <Box>
//         <form noValidate autoComplete="off" style={{ padding: '20px' }}
//           onSubmit={(event) => {
//             event.preventDefault();
//             updateUsernameDispatch(username);
//           }}
//         >
//           <TextField
//             id="username"
//             label="Username"
//             value={username}
//             onChange={handleUsernameChange}
//           />
//           <br />
//           <br />
//           <Button
//             variant="contained"
//             color="primary"
//             disabled={isSubmitDisabled}
//             onClick={() => {
//               // update user name in redux and navigate to the chat page
//               updateUsernameDispatch(username);
//               navigate('/conversations');
//             }}
//           >
//             Submit
//           </Button>
//           <div>Username: {storedUsername || 'not set'}</div>
//         </form>
//       </Box>

//     </Container> */}

//     <Container maxWidth={false} disableGutters>
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           height: '100vh',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         {/* random image related to "login" */}
//         <img  src="https://source.unsplash.com/random/400x200?login" alt="random" />

//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//             width: '400px',
//           }}
//         >
//           <form noValidate autoComplete="off" style={{ padding: '20px' }}
//             onSubmit={(event) => {
//               event.preventDefault();
//               updateUsernameDispatch(username);
//             }}
//           >
//             <TextField
//               id="username"
//               label="Username"
//               value={username}
//               onChange={handleUsernameChange}
//               fullWidth
//             />
//             <br />
//             <br />
//             <Button
//               variant="contained"
//               color="primary"
//               disabled={isSubmitDisabled}
//               fullWidth
//               onClick={() => {
//                 // update user name in redux and navigate to the chat page
//                 updateUsernameDispatch(username);
//                 navigate('/conversations');
//               }}
//             >
//               Login
//             </Button>
//             {/* <div>Username: {storedUsername
//               || 'not set'}</div> */}
//           </form>
//               </Box>
//       </Box>
//     </Container>

//     </Container>
//   );

//   // return ("hello world")
// }

import React, { useState, useRef, useMemo, useEffect, Component } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { makeStyles, useTheme } from "@mui/styles";
import { useSelector, useDispatch, useStore } from "react-redux";
import {
  updateUsername,
  updateAgreedToTerms,
  setUserProfile,
  updateAvatar,
  setInAppNotification,
  setBrowserNotification,
  addToBlockchain,
} from "../../redux/slices/userProfileSlice";
import { setPods } from "../../redux/slices/podsSlice";
import { setContacts } from "../../redux/slices/contactsSlice";
import { setEncryption } from "../../redux/slices/encryptionSlice";
import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "../../atomic/organism/page-container/PageContainer";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import AllTermsAndConditions from "../../atomic/atom/termsAndConditions";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import RefreshIcon from "@mui/icons-material/Refresh";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  // useSnackbar,
  useNotification,
} from "../../notifications/notificationManager";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Blockchain, { useBlockchain } from "../../blockchain/Blockchain";
import {
  compiler as profileCompiler,
  blockBuilders,
} from "../../blockchain/chains/profileChain";
import SignatureCanvas from "../../atomic/atom/signatureCanvas/SignatureCanvas";
import { ColorModeContext } from "../../../App.tsx";
// import {Adsense} from '@ctrl/react-adsense';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import JSZip from "jszip";
import { useTranslation } from "react-i18next";
import { useCryptography } from "../../cryptography/Cryptography";
import { CoachMark } from "react-coach-mark";

const avatars = [
  {
    src: "/avatars/1.jpg",
  },
  {
    src: "/avatars/2.jpg",
  },
  {
    src: "/avatars/3.jpg",
  },
  {
    src: "/avatars/4.jpg",
  },
  {
    src: "/avatars/5.jpg",
  },
  {
    src: "/avatars/6.jpg",
  },
  {
    src: "/avatars/7.jpg",
  },
  {
    src: "/avatars/8.jpg",
  },
  {
    src: "/avatars/9.jpg",
  },
];

const SimpleSlider = ({ onSelect }) => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "30px",
    slidesToShow: 2,
    speed: 500,
  };
  // heading with artist link dark mode adjusted color based on the default from material ui for text
  return (
    <div style={{ margin: "0 25px 20px" }}>
      <Slider {...settings}>
        {avatars.map((avatar, index) => (
          <div key={index}>
            <Button onClick={() => onSelect(avatar.src)}>
              <Avatar
                src={avatar.src}
                style={{
                  minHeight: "100px",
                  minWidth: "100px",
                  margin: "auto",
                }}
              />
            </Button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    height: theme.spacing(8),
  },
  form: {
    padding: `0 ${theme.spacing(3)}`,
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
  hidden: {
    display: "none",
    visibility: "hidden",
  },
}));

export default function LoginPage() {
  const { chance, randomString } = useCryptography();
  const { contactId, contactName } = useParams();
  const {
    version: latestTermsAndConditionsVersion,
    terms: TermsAndConditions,
  } = AllTermsAndConditions[AllTermsAndConditions.length - 1];
  const classes = useStyles();
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const store = useStore();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const updateUsernameDispatch = (username) =>
    dispatch(updateUsername(username));
  const updateAgreedToTermsDispatch = (agreedToTerms) =>
    dispatch(updateAgreedToTerms(agreedToTerms));
  const setUserProfileDispatch = (userProfile) =>
    dispatch(setUserProfile(userProfile));
  const updateAvatarDispatch = (avatar) => dispatch(updateAvatar(avatar));
  const setPodsDispatch = (pods) => dispatch(setPods(pods));
  const setContactsDispatch = (contacts) => dispatch(setContacts(contacts));
  const setEncryptionDispatch = (encryption) =>
    dispatch(setEncryption(encryption));
  const setInAppNotificationDispatch = (inAppNotification) =>
    dispatch(setInAppNotification(inAppNotification));
  const setBrowserNotificationDispatch = (browserNotification) =>
    dispatch(setBrowserNotification(browserNotification));
  // const { enqueueSnackbar } = useSnackbar();
  // const sendNotification = useNotification();

  const fileRef = useRef(null);
  const setAvatarRef = useRef(null);
  // make it so the form submits and updates the username in redux and navigates to the conversations page
  const [username, setUsername] = useState(contactName ?? `${chance.animal()}`);
  const [avatarBase64, setAvatarBase64] = useState(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  // const storeInAppNotication = useSelector((state) => state?.userProfile?.inAppNotification)
  // const storeBrowserNotication = useSelector((state) => state?.userProfile?.browserNotification)
  const addToBlockchainDispatch = ({ block, blocks, storage }) =>
    dispatch(addToBlockchain({ block, blocks, storage }));
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const storedBlockchain = useSelector((state) => state.userProfile.blockchain);
  const { compiledBlockchain: compiledProfile, addBlocks: addBlocksToProfile } =
    useBlockchain({
      compiler: profileCompiler,
      blockchain: storedBlockchain,
      dispatch: addToBlockchainDispatch,
    });

  // const profileBlockchain = useMemo(() => new Blockchain({
  //   compiler: profileCompiler,
  //   chain: storedBlockchain.chain.filter(b => !!b) || [],
  //   storage: storedBlockchain.storage || {},
  // }), [storedBlockchain.chain, storedBlockchain.storage]);

  // const compiledProfile = useMemo(() => profileBlockchain.compile(), [profileBlockchain]);
  const storedUsername = compiledProfile.displayName;
  const storedId = compiledProfile.id;
  const storedConnectionId = compiledProfile.connectionId;
  const storedInAppNotification = compiledProfile.settings?.inAppNotification;
  const storedBrowserNotification =
    compiledProfile.settings?.browserNotification;

  const [peerjsServer, setPeerjsServer] = useState("");
  const handlePeerjsServerChange = (event) => {
    setPeerjsServer(event.target.value);
  };
  const [encryptionSignature, setEncryptionSignature] = useState("");
  const handleEncryptionSignatureChange = (signature) => {
    setEncryptionSignature(signature);
  };

  const setAvatar = (avatar) => {
    fetch(avatar)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
          setAvatarBase64(reader.result);
        };
      });
  };

  useEffect(() => {
    //get random avatar
    const randomAvatar =
      avatars[Math.floor(Math.random() * avatars.length)].src;
    setAvatar(randomAvatar);
  }, []);

  const isInstalledPwa = useMemo(() => {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone ||
      document.referrer.includes("android-app://")
    );
  }, []);

  useEffect(() => {
    if (!isFullScreen && document?.exitFullscreen) {
      document?.exitFullscreen?.().catch(console.log);
    } else if (isFullScreen && document?.documentElement?.requestFullscreen) {
      document &&
        document?.documentElement?.requestFullscreen?.().catch(console.log);
    }
  }, [isFullScreen]);

  const fromUser = storedId || randomString();

  // const storedUsername = compiledProfile.displayName;
  // const storedConnectionId = compiledProfile.connectionId;
  // const storedInAppNotification = compiledProfile.settings?.inAppNotification;
  // const storedBrowserNotification = compiledProfile.settings?.browserNotification;

  // useEffect(() => {
  //   console.log({ storedBlockchain, compiledProfile, profileBlockchain })
  //   if (storedBlockchain.chain.length === 0) {

  //     const newProfileBlocks = [
  //       ...blockBuilders().updateId({ from: fromUser, id: 'username123' }),
  //       ...blockBuilders().updateConnectionId({ from: fromUser, connectionId: fromUser }),
  //       ...blockBuilders().updateDisplayName({ from: fromUser, displayName: 'username123' }),
  //       ...blockBuilders().updateAvatar({ from: fromUser, avatar: '' }),
  //       ...blockBuilders().updateAgreedToTerms({ from: fromUser, agreedToTerms: 'latestTermsAndConditionsVersion' }),
  //       ...blockBuilders().updateInAppNotification({ from: fromUser, inAppNotification: true }),
  //       ...blockBuilders().updateBrowserNotification({ from: fromUser, browserNotification: false }),
  //     ];
  //     profileBlockchain.addBlocks(newProfileBlocks);
  //     const pendingUpdate = profileBlockchain.getUpdate();
  //     console.log({pendingUpdate})

  //     addToBlockchainDispatch({
  //       blocks: pendingUpdate.pendingBlocks,
  //       storage: pendingUpdate.pendingStorage,
  //     });

  //     console.log({
  //       compiledProfile,
  //       pendingUpdate,
  //       newProfileBlocks,
  //       storedBlockchain,
  //     });
  //   }
  // }, []);

  const [appNotifications, setAppNotifications] = useState(
    storedInAppNotification ?? true,
  );
  const [browserNotifications, setBrowserNotifications] = useState(
    storedBrowserNotification ?? false,
  );

  const handleAppNotificationChange = (event) => {
    setAppNotifications(event.target.checked);
  };

  const handleBrowserNotificationChange = (event) => {
    setBrowserNotifications(event.target.checked);
  };

  const inAppNotifications = {
    fullWidth: true,
    inputProps: { "aria-label": "Allow in-app notification" },
    defaultChecked: appNotifications,
    label: "In-app notifications",
    onChange: handleAppNotificationChange,
  };
  const browserNotification = {
    fullWidth: true,
    inputProps: { "aria-label": "Allow browser notification" },
    defaultChecked: browserNotifications,
    label: "Browser notifications",
    onChange: handleBrowserNotificationChange,
  };

  useEffect(() => {
    if (contactId && storedUsername && storedConnectionId !== contactId) {
      navigate(`/pods`);
      navigate(`/contacts`);
      navigate(`/contact/${contactId}`);
    }

    if (!contactId && storedUsername) {
      navigate(`/pods`);
    }
  }, [contactId, storedUsername]);

  const { t, i18n } = useTranslation();
  const pageTitle = t("loginPage.pageTitle");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = () => {
    // // update user name in redux and navigate to the chat page
    // updateUsernameDispatch(username);
    // updateAvatarDispatch(avatarBase64);
    // //get last item from TermsAndConditions
    // updateAgreedToTermsDispatch(latestTermsAndConditionsVersion);

    const newProfileBlocks = [
      ...blockBuilders().updateId({ from: fromUser, id: fromUser }),
      ...blockBuilders().updateConnectionId({
        from: fromUser,
        connectionId: fromUser,
      }),
      ...blockBuilders().updateDisplayName({
        from: fromUser,
        displayName: username,
      }),
      ...blockBuilders().updateAvatar({ from: fromUser, avatar: avatarBase64 }),
      ...blockBuilders().updateAgreedToTerms({
        from: fromUser,
        agreedToTerms: latestTermsAndConditionsVersion,
      }),
      ...blockBuilders().updateInAppNotification({
        from: fromUser,
        inAppNotification: appNotifications,
      }),
      ...blockBuilders().updateBrowserNotification({
        from: fromUser,
        browserNotification: browserNotifications,
      }),
      ...blockBuilders().updatePeerjsServer({ from: fromUser, peerjsServer }),
      ...blockBuilders().updateEncryptionSignature({
        from: fromUser,
        encryptionSignature,
      }),
    ];

    addBlocksToProfile(newProfileBlocks);
    // const pendingUpdate = profileBlockchain.getUpdate();

    // addToBlockchainDispatch({
    //   blocks: pendingUpdate.pendingBlocks,
    //   storage: pendingUpdate.pendingStorage,
    // });
  };

  const tacCheckbox = {
    inputProps: {
      "aria-label": "terms and conditions",
      onClick: (e) => {
        e.stopPropagation();
        console.log("checked", e.target.checked);
        setAgreedToTerms(e.target.checked);
      },
    },
    checked: agreedToTerms,
  };

  async function handleFile({ target: { files } }) {
    const f = files[0];

    try {
      const zip = await JSZip.loadAsync(f); // Use await here

      zip.forEach(async (relativePath, zipEntry) => {
        const content = await zip.file(zipEntry.name).async("string");
        const { pods, contacts, encryption, userProfile } = JSON.parse(content);
        setPodsDispatch(pods);
        setContactsDispatch(contacts);
        setEncryptionDispatch(encryption);
        setUserProfileDispatch(userProfile);
      });
    } catch (e) {
      console.error(e);
    }
  }

  const handleAvatar = ({ target: { files } }) => {
    const f = files[0];
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    img.onload = () => {
      const maxWidthHeight = 500;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidthHeight) {
          height *= maxWidthHeight / width;
          width = maxWidthHeight;
        }
      } else {
        if (height > maxWidthHeight) {
          width *= maxWidthHeight / height;
          height = maxWidthHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
      const base64String = canvas.toDataURL("image/jpeg", 1.0);
      setAvatarBase64(base64String);
    };
    img.src = URL.createObjectURL(f);
  };

  //   const [deferredPrompt, setDeferredPrompt] = useState(null);
  //   useEffect(() => {
  //     const handleBeforeInstallPromptEvent = (e) => {
  //         console.log('setting defferedPrompt')
  //         e.preventDefault();
  //         setDeferredPrompt(e);
  //     };
  //     if (!deferredPrompt) window.addEventListener('beforeinstallprompt', handleBeforeInstallPromptEvent);

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
  //         console.log('removing defferedPrompt')
  //         window.removeEventListener('beforeinstallprompt', handleBeforeInstallPromptEvent);
  //     };
  // }, []);

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
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);

  const coachList = [
    // {
    //   activate: activatedNumber === 0,
    //   component:
    //     <Typography style={{
    //     color: 'black',
    //   }}>Info and app settings <br />{NextButton} </Typography>,
    //   reference: ref1,
    //   tooltip: { position: 'top' }
    // },
    {
      activate: activatedNumber === 0,
      component: (
        <Typography
          style={{
            color: "black",
          }}
        >
          (Optional) Set profile details like display name and avatar <br />
          {NextButton}{" "}
        </Typography>
      ),
      reference: ref2,
      tooltip: { position: "top" },
    },
    {
      activate: activatedNumber === 1,
      component: (
        <Typography
          style={{
            color: "black",
          }}
        >
          (Optional) Some extra app settings if you want to change the default
          values <br />
          {PrevButton}
          {NextButton}
        </Typography>
      ),
      reference: ref3,
      tooltip: { position: "top" },
    },
    {
      activate: activatedNumber === 2,
      component: (
        <Typography
          style={{
            color: "black",
          }}
        >
          Must accept terms and conditions before using the app
          <br />
          {PrevButton}
          {NextButton}
        </Typography>
      ),
      reference: ref4,
      tooltip: { position: "top" },
    },
    {
      activate: activatedNumber === 3,
      component: (
        <Typography
          style={{
            color: "black",
          }}
        >
          Get started in using the app <br />
          {PrevButton}
          {NextButton}
        </Typography>
      ),
      reference: ref5,
      tooltip: { position: "top" },
    },
    {
      activate: activatedNumber === 4,
      component: (
        <Typography
          style={{
            color: "black",
          }}
        >
          (Optional) Load a profile from a previous backup <br />
          {PrevButton}
          {NextButton}
        </Typography>
      ),
      reference: ref6,
      tooltip: { position: "top" },
    },
  ];

  const coach = coachList[activatedNumber];

  const isSubmitDisabled = !username || !agreedToTerms;

  const handleCopyConnectionIdToClipboard = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/login/${storedConnectionId}`,
    );
  };

  if (contactId && storedUsername && storedConnectionId === contactId) {
    return (
      <PageContainer
        headerProps={{
          title: "Share this URL with a peer",
        }}
        className={classes.form}
      >
        <form noValidate className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="connectionId"
            label="Share to connect"
            name="connectionId"
            defaultValue={`${window.location.origin}/login/${storedConnectionId}`}
            readOnly
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleCopyConnectionIdToClipboard}
                    edge="end"
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </PageContainer>
    );
  }

  // the hipain image to use as the default file
  const hipaintImage = "/logo-large.png";

  return (
    <PageContainer
      headerProps={{
        title: pageTitle,
        customButtons: [
          // {
          //   icon: 'help',
          //   onClick: () => setActivateNumber(0)
          // }
        ],
        menuProps: {
          icon: "more",
          ref: ref1,
          items: [
            {
              text: t("components.menuItems.labs"),
              icon: "labs",
              subMenuItems: [
                {
                  text: t("podsPage.gram"),
                  icon: "gram",
                  onClick: () => navigate("/feed"),
                },
                {
                  text: t("podsPage.verse"),
                  icon: "verse",
                  onClick: () => navigate("/verse"),
                },
              ],
            },
            // { text: t('components.menuItems.about'), icon: 'info', onClick: () => window.location = 'https://positive-intentions.com' },
            // {
            //   text: t('components.menuItems.options'),
            //   icon: 'settings',
            //   subMenuItems: [
            //     { text: theme.palette.mode === 'dark' ? t('components.menuItems.lightMode') : t('components.menuItems.darkMode'), icon: theme.palette.mode === 'dark' ? 'lightMode' : 'darkMode', onClick: colorMode.toggleColorMode },
            //     !isInstalledPwa ? { text: isFullScreen ? t('components.menuItems.exitFullscreen') : t('components.menuItems.fullscreen') , icon: isFullScreen ? 'fullscreenExit' : 'fullscreen', onClick: () => setIsFullScreen(!isFullScreen) } : null,
            //     !isInstalledPwa ? {
            //       text: t('components.menuItems.install'), icon: 'install', onClick: () => {
            //           sendNotification?.(t('components.menuItems.requestingToInstall'), { variant: 'info' })

            //           if (deferredPrompt) {
            //               deferredPrompt.prompt()
            //                   .then((result) => {
            //                       if (result.outcome === 'accepted') {
            //                           console.log('Installation accepted');
            //                           sendNotification?.(t('components.menuItems.installPossible'), { variant: 'success' })

            //                       } else {
            //                           console.log('Installation dismissed');
            //                           sendNotification?.(t('components.menuItems.installDismissed'), { variant: 'warning' })

            //                       }
            //                   })
            //                   .catch((error) => {
            //                       console.error('Installation prompt error:', error);
            //                       sendNotification?.(t('components.menuItems.installFailed'), { variant: 'warning' })

            //                   });
            //           } else {
            //               console.error('The beforeinstallprompt event has not been fired.');
            //               sendNotification?.(t('components.menuItems.installNotSupported'), { variant: 'warning' })
            //           }
            //       }
            //   } : null,
            //   ]
            // },

            // { text: t('components.menuItems.language'), icon: 'translate', onClick: () => navigate('/privacy'), subMenuItems: [
            //   { text: 'English', onClick: () => i18n.changeLanguage('en') },
            //   { text: 'Spanish', onClick: () => i18n.changeLanguage('es') },
            //   { text: 'Mandarin', onClick: () => i18n.changeLanguage('zh') },
            //   { text: 'Gujrati', onClick: () => i18n.changeLanguage('gu') },
            // ] },
          ],
        },
      }}
    >
      <CoachMark {...coach} />

      {/* add an imagae at the top */}
      {/* {avatarBase64 && (<img className={classes.img} src={avatarBase64} alt="random" />)} */}
      <form noValidate className={classes.form}>
        <Avatar
          src={hipaintImage}
          style={{ minHeight: "300px", minWidth: "300px", margin: "auto" }}
        />
        {/* i want a typography sentence with some text followed by bulletpoints */}
        <Typography variant="p" gutterBottom>
          {t("Temporarily unavailable. Apologies for the inconvenience.")}
        </Typography>
        {!false && (
          <>
            <br />
            <Typography variant="p" gutterBottom>
              {t("loginPage.welcome")}
              <br />
              <br />
              <Typography variant="body1" gutterBottom>
                {t("loginPage.featuresInclude")}
                <ul>
                  <li>{t("loginPage.noCookies")}</li>
                  <li>{t("loginPage.noRegistration")}</li>
                  <li>{t("loginPage.noInstalling")}</li>
                  <li>{t("loginPage.groupMessaging")}</li>
                  <li>{t("loginPage.textMessaging")}</li>
                  <li>{t("loginPage.multimediaMessaging")}</li>
                  <li>{t("loginPage.videoCalls")}</li>
                  <li>{t("loginPage.dataOwnership")}</li>
                  <li>{t("loginPage.screensharing")}</li>
                  <li>{t("loginPage.fileTransfer")}</li>
                </ul>
                {t("loginPage.getStarted")}
              </Typography>
            </Typography>
            {/* some spacing */}
            <br />

            <Accordion
              ref={ref2}
              expanded={expanded === "profile"}
              onChange={handleChange("profile")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography sx={{ flexShrink: 0 }}>
                  {t("loginPage.setProfile")}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <SimpleSlider onSelect={setAvatar} />
                {
                  <>
                    <Avatar
                      src={avatarBase64 ?? hipaintImage}
                      style={{
                        minHeight: "300px",
                        minWidth: "300px",
                        margin: "auto",
                      }}
                    />
                    <br />
                  </>
                }
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => setAvatarRef?.current?.click()}
                >
                  {t("loginPage.setAvatar")}
                </Button>
                <input
                  type="file"
                  name="picture"
                  ref={setAvatarRef}
                  className={classes.hidden}
                  accept="image/*"
                  onChange={handleAvatar}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label={t("loginPage.displayName")}
                  name="username"
                  onChange={handleUsernameChange}
                  autoFocus
                  value={username}
                  autoComplete="off"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setUsername(`${chance.animal()}`)}
                          edge="end"
                        >
                          <RefreshIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <SignatureCanvas
                  heading={t("loginPage.cryptoSignature")}
                  onChange={handleEncryptionSignatureChange}
                />
              </AccordionDetails>
            </Accordion>

            <Accordion
              ref={ref3}
              expanded={expanded === "notifications"}
              onChange={handleChange("notifications")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography sx={{ flexShrink: 0 }}>
                  {t("loginPage.setPreference")}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  <FormControlLabel
                    control={<Switch {...inAppNotifications} />}
                    label={t("loginPage.inAppNotification")}
                  />
                  <FormControlLabel
                    control={<Switch {...browserNotification} />}
                    label={t("loginPage.browserNotification")}
                  />
                </FormGroup>

                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="peerjs-server"
                  label="PeerJS server"
                  name="peerjs-server"
                  onChange={handlePeerjsServerChange}
                  value={peerjsServer}
                  placeholder="https: 0.peerjs.com"
                  autoComplete="off"
                />
              </AccordionDetails>
            </Accordion>

            <Accordion
              ref={ref4}
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography sx={{ width: "90%", flexShrink: 0 }}>
                  <Checkbox {...tacCheckbox} />
                  <span style={{ color: "red" }}>*</span>
                  {t("loginPage.termsAgreement")}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {/* <TermsAndConditions /> */}
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/terms")}
                  >
                    {t("loginPage.goToTermsAndConditions")}
                  </Button>
                </Typography>
                {/* <Checkbox {...tacCheckbox} /><span style={{ color: 'red'}}>*</span>{t('loginPage.termsAgreement')} */}
              </AccordionDetails>
            </Accordion>
            <br />

            <Button
              ref={ref5}
              type="button"
              fullWidth
              variant="contained"
              color="success"
              disabled={isSubmitDisabled}
              onClick={handleSubmit}
            >
              {t("loginPage.connect")}
            </Button>
            <br />
            <br />

            <Button
              ref={ref6}
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              disabled={!agreedToTerms}
              onClick={() => fileRef?.current?.click()}
            >
              {t("loginPage.loadProfileFromFile")}
            </Button>
            <input
              type="file"
              accept=".zip"
              className={classes.hidden}
              ref={fileRef}
              onChange={handleFile}
            />
            <br />
            <br />
          </>
        )}
      </form>

      {/* <Adsense
        client="ca-pub-3858565369567456"
        slot="1326833654"
      /> */}
    </PageContainer>
  );
}
