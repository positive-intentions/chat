import React from "react";
import {
  SnackbarProvider as SnackbarProviderOriginal,
  closeSnackbar,
  useSnackbar,
} from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useSelector } from "react-redux";
import Blockchain, { useBlockchain } from "../blockchain/Blockchain";
import {
  compiler as profileCompiler,
  blockBuilders,
} from "../blockchain/chains/profileChain";

import { PushNotifications } from '@capacitor/push-notifications';

const addListeners = async () => {
  await PushNotifications.addListener('registration', token => {
    console.info('Registration token: ', token.value);
  });

  await PushNotifications.addListener('registrationError', err => {
    console.error('Registration error: ', err.error);
  });

  await PushNotifications.addListener('pushNotificationReceived', notification => {
    console.log('Push notification received: ', notification);
  });

  await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
    console.log('Push notification action performed', notification.actionId, notification.inputValue);
  });
}

const registerNotifications = async () => {
  let permStatus = await PushNotifications.checkPermissions();

  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions();
  }

  if (permStatus.receive !== 'granted') {
    throw new Error('User denied permissions!');
  }

  await PushNotifications.register();
}

const getDeliveredNotifications = async () => {
  const notificationList = await PushNotifications.getDeliveredNotifications();
  console.log('delivered notifications', notificationList);
}

// initialise
addListeners();
registerNotifications();
getDeliveredNotifications();


export const SnackbarProvider = ({ children }) => {
  return (
    <SnackbarProviderOriginal
      maxSnack={3}
      preventDuplicate
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      autoHideDuration={2000}
      action={(snackbarId) => (
        <IconButton
          aria-label="delete"
          onClick={() => closeSnackbar(snackbarId)}
        >
          <CloseIcon style={{ color: "#fff" }} />
        </IconButton>
      )}
    >
      {children}
    </SnackbarProviderOriginal>
  );
};

export const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();
  const storedBlockchain = useSelector((state) => state.userProfile.blockchain);
  const { compiledBlockchain: compiledProfile } = useBlockchain({
    compiler: profileCompiler,
    blockchain: storedBlockchain,
  });

  const storedInAppNotification = compiledProfile?.settings?.inAppNotification;
  const storedBrowserNotification =
    compiledProfile?.settings?.browserNotification;

  // const storedInAppNotification = useSelector(state => state.userProfile.inAppNotification);
  // const storedBrowserNotification = useSelector(state => state.userProfile.browserNotification);

  return (message, ...props) => {
    // Check if the browser supports notifications
    console.log({
      storedInAppNotification,
      storedBrowserNotification,
      Notification: window.Notification,
      hidden: document.hidden,
      message,
      props,
    });

    // return if the window has focus so no notification are
    // displayed while the app is open in focus
    if (!document.hidden) {
      return;
    }

    try {
      if (
        (storedBrowserNotification && !("Notification" in window)) ||
        typeof window.Notification === "undefined"
      ) {
        alert("This browser does not support desktop notification");
      }

      // Check if permission is already granted
      else if (window.Notification?.permission === "granted") {
        if (document.hidden) {
          // If it's okay, let's create a notification
          if (storedBrowserNotification) {
            let notification = new window.Notification(message);
          }
        }
      }

      // Check if permission is already granted
      else if (window.Notification?.permission === "denied") {
        // If it's okay, let's create a notification
        if (storedInAppNotification) {
          enqueueSnackbar(message, ...props);
        }
      }

      // Otherwise, we need to ask the user for permission
      else if (
        storedBrowserNotification &&
        (window.Notification?.permission !== "denied" ||
          window.Notification?.permission === "default")
      ) {
        window.Notification?.requestPermission(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            let notification = new window.Notification(message);
          }
        });
      }

      if (storedInAppNotification || props[0].insist) {
        enqueueSnackbar(message, ...props);
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export { useSnackbar };
