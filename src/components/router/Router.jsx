import React, { lazy, Suspense, useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";
// import App from "../pages/app/App";
// import Chat from "../pages/chat/Chat";
// import Conversations from "../pages/conversations/Conversations";
// import ConversationDetails from "../pages/conversationDetails/ConversationDetails";
// import Profile from "../pages/addContact/AddContact";
import Encryption from "../pages/encryption/Encryption";
import Feed from "../pages/feed/Feed";
import File from "../pages/file/File";
import Files from "../pages/files/Files";
import Hands from "../pages/hands/Hands";
import Login from "../pages/login/Login";
import ShareQR from "../pages/shareQr/ShareQR";
// import Verse from '../pages/verse/Verse'
import TermsAndConditions from "../../components/atomic/atom/termsAndConditions";
import { useBlockchain } from "../blockchain/Blockchain";
import { compiler as profileCompiler } from "../blockchain/chains/profileChain";
import AI from "../pages/ai/AI";
import Computer from "../pages/computer/Computer";
import Layout from "../pages/layout/Layout";
import Map from "../pages/map/Map";
import Mastodon from "../pages/mastodon/Mastodon";
import Meshtastic from "../pages/meshtastic/Meshtastic";
import PrivacyPolicyComponent from "../pages/privacyPolicy/PrivacyPolicy";
import TermsAndConditionsComponent from "../pages/termsAndConditions/TermsAndConditions";
import WebRTC from "../pages/webrtc/WebRTC";

const Verse = lazy(() => import("../pages/verse/Verse"));

export default () => {
  const userProfileBlockchain = useSelector(
    (state) => state.userProfile.blockchain
  );
  const { compiledBlockchain: userProfile } = useBlockchain({
    compiler: profileCompiler,
    blockchain: userProfileBlockchain,
  });
  const storedUsername = userProfile.displayName;
  const agreedToTerms = userProfile.agreedToTerms;

  // const storedUsername = useSelector((state) => state.userProfile.displayName);
  // const agreedToTerms = useSelector((state) => state.userProfile.agreedToTerms);
  const [router, setRouter] = useState(null);
  const agreedToLatestTerms = (agreedToTerms ?? []).includes(
    TermsAndConditions[TermsAndConditions.length - 1]?.version
  );

  // useEffect(() => {
  //   setRouter(
  //     createBrowserRouter([
  //       {
  //         path: "*",
  //         element: <Maintainance />,
  //       },
  //     ]),
  //   );
  // }, [storedUsername]);

  useEffect(() => {
    if (!storedUsername || !agreedToLatestTerms) {
      setRouter(
        createHashRouter([
          {
            path: "*",
            element: <Navigate to="/login" />,
          },
          {
            path: "/terms",
            element: <TermsAndConditionsComponent />,
          },
          {
            path: "/terms/privacy",
            element: <PrivacyPolicyComponent />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/login/:contactId",
            element: <Login />,
          },
          {
            path: "/login/:contactId/:contactName",
            element: <Login />,
          },
          {
            path: "/feed",
            element: <Feed />,
          },
          {
            path: "/verse",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Verse />
              </Suspense>
            ),
          },
          {
            path: "/map",
            element: <Map />,
          },
          {
            path: "/ai",
            element: <AI />,
          },
          {
            path: "/qr",
            element: <ShareQR />,
          },
          {
            path: "/webrtc",
            element: <WebRTC />,
          },
          {
            path: "/layout",
            element: <Layout />,
          },
          {
            path: "/hands",
            element: <Hands />,
          },
          {
            path: "/encrypt",
            element: <Encryption />,
          },
          {
            path: "/meshtastic",
            element: <Meshtastic />,
          },
          {
            path: "/desk",
            element: <Computer />,
          },
          {
            path: "/mastodon",
            element: <Mastodon />,
          },
        ])
      );
    } else {
      setRouter(
        createHashRouter([
          {
            path: "*",
            element: <Navigate to="/pods" />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/login/:contactId",
            element: <Login />,
          },
          {
            path: "/terms",
            element: <TermsAndConditionsComponent />,
          },
          {
            path: "/terms/privacy",
            element: <PrivacyPolicyComponent />,
          },
          {
            path: "/login/:contactId/:contactName",
            element: <Login />,
          },
          {
            path: "/contacts",
            element: <Layout />,
          },
          {
            path: "/contact/:contactId",
            element: <Layout />,
          },
          {
            path: "/pods",
            element: <Layout />,
          },
          {
            path: "/pod/:podId",
            element: <Layout />,
          },
          {
            path: "/pod/:podId/details",
            element: <Layout />,
          },
          {
            path: "/pod/:podId/files",
            element: <Files />,
          },
          {
            path: "/pod/:podId/file/:fileId",
            element: <File />,
          },
          {
            path: "/pod/:podId/verse",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Verse />
              </Suspense>
            ),
          },
          {
            path: "/pod/:podId/desk",
            element: <Computer />,
          },
          {
            path: "/profile",
            element: <Layout />,
          },
          {
            path: "/profile/qr",
            element: <Layout />,
          },
          {
            path: "/feed",
            element: (
              // <SplitPane split="vertical" minSize={350}>
              //   <Pods />
              <Feed />
              // </SplitPane>
            ),
          },
          {
            path: "/verse",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Verse />
              </Suspense>
            ),
          },
          {
            path: "/map",
            element: <Map />,
          },
          {
            path: "/ai",
            element: <AI />,
          },
          {
            path: "/qr",
            element: <ShareQR />,
          },
          {
            path: "/webrtc",
            element: <WebRTC />,
          },
          {
            path: "/layout",
            element: <Layout />,
          },
          {
            path: "/hands",
            element: <Hands />,
          },
          {
            path: "/encrypt",
            element: <Encryption />,
          },
          {
            path: "/meshtastic",
            element: <Meshtastic />,
          },
          {
            path: "/desk",
            element: <Computer />,
          },
          {
            path: "/mastodon",
            element: <Mastodon />,
          },
        ])
      );
    }
  }, [storedUsername]);

  return router?.state && <RouterProvider router={router} />;
};
