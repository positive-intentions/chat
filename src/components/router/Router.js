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
// import Login from "../pages/login/Login";
// import Pods from "../pages/pods/Pods";
// import Pod from "../pages/pod/Pod";
// import PodDetails from "../pages/podDetails/PodDetails";
// import Contacts from "../pages/contacts/Contacts";
// import ContactDetails from "../pages/contactDetails/ContactDetails";
// import Profile from "../pages/profile/Profile";
// import Files from "../pages/files/Files";
// import File from "../pages/file/File";
// import Feed from "../pages/feed/Feed";
import Maintainance from "../pages/maintainance/Maintainance";
// import Verse from '../pages/verse/Verse'
import Blockchain, { useBlockchain } from "../blockchain/Blockchain";
import {
  compiler as profileCompiler,
  blockBuilders,
} from "../blockchain/chains/profileChain";
import TermsAndConditions from "../../components/atomic/atom/termsAndConditions";
// import TermsAndConditionsComponent from "../pages/termsAndConditions/TermsAndConditions";
// import Map from "../pages/map/Map";
// import AI from "../pages/ai/AI";
// import SplitPane from "react-split-pane";

// const Verse = lazy(() => import("../pages/verse/Verse"));

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

  useEffect(() => {
    setRouter(
      createBrowserRouter([
        {
          path: "*",
          element: <Maintainance />,
        },
      ]),
    );
  }, [storedUsername]);

  // useEffect(() => {
  //   if (!!true || !storedUsername || !agreedToLatestTerms) {
  //     setRouter(
  //       createBrowserRouter([
  //         {
  //           path: "*",
  //           element: <Navigate to="/login" />,
  //         },
  //         {
  //           path: "/terms",
  //           element: <TermsAndConditionsComponent />,
  //         },
  //         {
  //           path: "/login",
  //           element: <Login />,
  //         },
  //         {
  //           path: "/login/:contactId",
  //           element: <Login />,
  //         },
  //         {
  //           path: "/login/:contactId/:contactName",
  //           element: <Login />,
  //         },
  //         {
  //           path: "/feed",
  //           element: <Feed />,
  //         },
  //         {
  //           path: "/verse",
  //           element: (
  //             <Suspense fallback={<div>Loading...</div>}>
  //               <Verse />
  //             </Suspense>
  //           ),
  //         },
  //         {
  //           path: "/map",
  //           element: <Map />,
  //         },
  //         {
  //           path: "/ai",
  //           element: <AI />,
  //         },
  //       ]),
  //     );
  //   } else {
  //     setRouter(
  //       createBrowserRouter([
  //         {
  //           path: "*",
  //           element: <Navigate to="/pods" />,
  //         },
  //         {
  //           path: "/login/:contactId",
  //           element: <Login />,
  //         },
  //         {
  //           path: "/terms",
  //           element: <TermsAndConditionsComponent />,
  //         },
  //         {
  //           path: "/login/:contactId/:contactName",
  //           element: <Login />,
  //         },
  //         {
  //           path: "/contacts",
  //           element: <Contacts />,
  //         },
  //         {
  //           path: "/contact/:contactId",
  //           element: <ContactDetails />,
  //         },
  //         {
  //           path: "/pods",
  //           element: <Pods />,
  //         },
  //         {
  //           path: "/pod/:podId",
  //           element: <Pod />,
  //         },
  //         {
  //           path: "/pod/:podId/details",
  //           element: <PodDetails />,
  //         },
  //         {
  //           path: "/pod/:podId/files",
  //           element: <Files />,
  //         },
  //         {
  //           path: "/pod/:podId/file/:fileId",
  //           element: <File />,
  //         },
  //         {
  //           path: "/pod/:podId/verse",
  //           element: (
  //             <Suspense fallback={<div>Loading...</div>}>
  //               <Verse />
  //             </Suspense>
  //           ),
  //         },
  //         {
  //           path: "/profile",
  //           element: <Profile />,
  //         },
  //         {
  //           path: "/profile/qr",
  //           element: <Profile qr />,
  //         },
  //         {
  //           path: "/feed",
  //           element: (
  //             // <SplitPane split="vertical" minSize={350}>
  //             //   <Pods />
  //             <Feed />
  //             // </SplitPane>
  //           ),
  //         },
  //         {
  //           path: "/verse",
  //           element: (
  //             <Suspense fallback={<div>Loading...</div>}>
  //               <Verse />
  //             </Suspense>
  //           ),
  //         },
  //         {
  //           path: "/map",
  //           element: <Map />,
  //         },
  //         {
  //           path: "/ai",
  //           element: <AI />,
  //         },
  //       ]),
  //     );
  //   }
  // }, [storedUsername]);

  return router?.state && <RouterProvider router={router} />;
};
