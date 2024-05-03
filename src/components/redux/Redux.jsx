import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import React from "react";
import reduxPersistConfig from "./store";

const { store, persistor } = reduxPersistConfig();

export default ({ children }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);
