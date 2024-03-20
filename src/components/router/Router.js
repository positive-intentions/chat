import React, { useCallback, useEffect, useState, Suspense, lazy } from "react";

import { useSelector } from "react-redux";

import {
  createHashRouter,
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
// import App from "../pages/app/App";
// import Chat from "../pages/chat/Chat";
// import Conversations from "../pages/conversations/Conversations";
// import ConversationDetails from "../pages/conversationDetails/ConversationDetails";
// import Profile from "../pages/addContact/AddContact";
import Login from "../pages/login/Login";
import Pods from "../pages/pods/Pods";
import Pod from "../pages/pod/Pod";
import PodDetails from "../pages/podDetails/PodDetails";
import Contacts from "../pages/contacts/Contacts";
import ContactDetails from "../pages/contactDetails/ContactDetails";
import Profile from "../pages/profile/Profile";
import Files from "../pages/files/Files";
import File from "../pages/file/File";
import Feed from "../pages/feed/Feed";
import Maintainance from "../pages/maintainance/Maintainance";
import Hands from "../pages/hands/Hands";
import ShareQR from "../pages/shareQr/ShareQR";
// import Verse from '../pages/verse/Verse'
import Blockchain, { useBlockchain } from "../blockchain/Blockchain";
import {
  compiler as profileCompiler,
  blockBuilders,
} from "../blockchain/chains/profileChain";
import TermsAndConditions from "../../components/atomic/atom/termsAndConditions";
import TermsAndConditionsComponent from "../pages/termsAndConditions/TermsAndConditions";
import PrivacyPolicyComponent from "../pages/privacyPolicy/PrivacyPolicy";
import Map from "../pages/map/Map";
import AI from "../pages/ai/AI";
import WebRTC from "../pages/webrtc/WebRTC";
import Layout from "../pages/layout/Layout";

const Verse = lazy(() => import("../pages/verse/Verse"));

export default () => {
  const userProfileBlockchain = useSelector(
    (state) => state.userProfile.blockchain,
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
    TermsAndConditions[TermsAndConditions.length - 1]?.version,
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
          }
        ]),
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
            exact: true,
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
          }
        ]),
      );
    }
  }, [storedUsername]);

  return router?.state && <RouterProvider router={router} />;
};
