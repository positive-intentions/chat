import React, { useEffect } from "react";
import "./index.css";
// import './components/utils/bigIntPolyfill';
// import App from './components/pages/app/App';
// import Login from './components/pages/login/Login';
// import reportWebVitals from './reportWebVitals';

// import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Router from "./components/router/Router";
import Redux from "./components/redux/Redux";
import ReduxConnectedPeerProvider from "./components/p2p/ReduxConnectedPeerProvider";
import ReduxConnectedCryptography from "./components/cryptography/ReduxConnectedCryptography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { StylesProvider, jssPreset } from "@mui/styles";
import { SnackbarProvider } from "./components/notifications/notificationManager";
import ErrorBoundary from "./components/atomic/atom/errorBoundary/ErrorBoundary";
import { I18nextProvider } from "react-i18next";
import i18n from "./components/translations/i18n";
import { create } from "jss";
import rtl from "jss-rtl";
import { useTranslation } from "react-i18next";
import { logToNLevelAnalytics } from "./components/utils/analytics";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// import * as Sentry from "@sentry/react";

// Sentry.init({
//   dsn: "https://2f7caacbd22c4f52a83ab1bcf0b5e3b2@o237943.ingest.sentry.io/4505097365159936",
//   integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
//   // Performance Monitoring
//   tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
//   // Session Replay
//   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//   replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// });

// i18n.then (() => console.log('translations loaded'))

// logToNLevelAnalytics();

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

const App = () => {
  const { i18n } = useTranslation();

  // const theme = createTheme({
  //   palette: {
  //     // mode: 'dark',
  //   },
  // });

  // useEffect(() => () => {
  //   function requestFullScreen(element) {
  //     // Supports most browsers and their versions.
  //     var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

  //     if (requestMethod) { // Native full screen.
  //         requestMethod.call(element);
  //     } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
  //         var wscript = new window.ActiveXObject("WScript.Shell");
  //         if (wscript !== null) {
  //             wscript.SendKeys("{F11}");
  //         }
  //     }
  // }

  // var elem = document.body; // Make the body go full screen.
  // requestFullScreen(elem);
  // }, []);

  const userPreferredTheme =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const [mode, setMode] = React.useState(userPreferredTheme);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [],
  );

  // const isRightToLeft = () => {
  //   return false; // i18n.dir() === 'rtl';
  // }

  // const [isRTL, setIsRTL] = React.useState(isRightToLeft());

  // useEffect(
  //   () => {
  //     const newTextDirection = isRightToLeft() ? 'rtl' : 'ltr';
  //     if (newTextDirection === 'ltr') {
  //       document.dir = 'ltr';
  //     } else {
  //       document.dir = 'rtl';
  //     }

  //     setIsRTL(newTextDirection);
  //   },
  //   [i18n.dir()],
  // ); // Only re-run the effect if props.language changes

  document.body.dir = i18n.dir();

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        // direction: isRTL ? 'rtl' : 'ltr',
        // typography: {
        //   fontFamily: isRightToLeft() ? 'Arial' : 'Roboto',
        // },
      }),
    [mode],
  );

  // return <div>hello world</div>;

  return (
    <React.StrictMode>
      <SnackbarProvider>
        <Redux>
          <I18nextProvider i18n={i18n}>
            <ReduxConnectedCryptography>
              <ReduxConnectedPeerProvider>
                <ColorModeContext.Provider value={colorMode}>
                  <ThemeProvider theme={theme}>
                    <StylesProvider jss={jss}>
                      <ErrorBoundary>
                        <Router />
                      </ErrorBoundary>
                    </StylesProvider>
                  </ThemeProvider>
                </ColorModeContext.Provider>
              </ReduxConnectedPeerProvider>
            </ReduxConnectedCryptography>
          </I18nextProvider>
        </Redux>
      </SnackbarProvider>
    </React.StrictMode>
  );
};

export default App;
