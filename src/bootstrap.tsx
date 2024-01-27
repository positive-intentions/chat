import React from "react";
import { createRoot } from "react-dom/client";
import Example from "./stories/components/Example.tsx";

const App = () => {
  return (
    <div>
      <Example>positive-intentions</Example>
    </div>
  );
};

const container = document.getElementById("app");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
