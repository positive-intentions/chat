// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { createRoot } from "react-dom/client";
import MainApp from "./App.tsx";

import * as OfflinePluginRuntime from '@lcdp/offline-plugin/runtime';
OfflinePluginRuntime.install();

export const App = () => {
  return (
    <div>
      <MainApp />
    </div>
  );
};

const container = document.getElementById("app");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("/service-worker.js")
//       .then((registration) => {
//         console.log("SW registered: ", registration);
//       })
//       .catch((registrationError) => {
//         console.log("SW registration failed: ", registrationError);
//       });
//   });
// }
