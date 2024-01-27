import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
// import storage from 'redux-persist/lib/storage';
import storage from "redux-persist-indexeddb-storage";

import userProfileReducer from "./slices/userProfileSlice";
import contactsReducer from "./slices/contactsSlice";
import podsReducer from "./slices/podsSlice";
import encryptionReducer from "./slices/encryptionSlice";
import storageReducer from "./slices/storageSlice";

const persistConfig = {
  key: "root",
  storage: storage("positive-intentions"),
};

const appReducer = combineReducers({
  userProfile: userProfileReducer,
  contacts: contactsReducer,
  pods: podsReducer,
  encryption: encryptionReducer,
  storage: storageReducer,
});

const rootReducer = (state, action) => {
  // When a user logs out, reset the state of all reducers
  if (action.type === "userProfile/logout") {
    state = undefined;
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = configureStore({
    reducer: persistedReducer,
  });
  let persistor = persistStore(store);
  return { store, persistor };
};

// export default configureStore({
//   reducer: {
//     userProfile: userProfileReducer,
//     contacts: contactsReducer,
//     conversations: conversationsReducer,
//   },
// })
