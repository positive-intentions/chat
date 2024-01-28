import React from "react";
import { createRoot } from "react-dom/client";
import Example from "./stories/components/Example.tsx";
import MainApp from "./App.tsx";

const App = () => {
  return (
    <div>
      <Example>positive-intentions</Example>
      <MainApp />
    </div>
  );
};

const container = document.getElementById("app");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}