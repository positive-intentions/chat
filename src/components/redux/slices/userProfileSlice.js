import { createSlice, current } from "@reduxjs/toolkit";

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    displayName: "",
    id: null,
    connectionId: null,
    pastConnectionIds: [],
    avatar: "https://source.unsplash.com/random/400x200?avatar",
    agreedToTerms: [],
    inAppNotification: true,
    browserNotification: false,
    blockchain: {
      chain: [],
      storage: {},
    },
  },
  reducers: {
    addToBlockchain(state, action) {
      const {
        blocks = [],
        block,
        storage = {},
        append = false,
      } = action.payload;
      let profile = current(state);

      profile = {
        ...profile,
        blockchain: {
          ...(profile?.blockchain || {}),
          chain: [
            ...(profile?.blockchain?.chain || []),
            ...blocks,
            block,
          ].filter((b) => !!b),
          storage: {
            ...storage,
            ...profile?.blockchain?.storage,
          },
        },
      };

      return profile;
    },
    updateUsername: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.displayName = action.payload;
    },
    updateAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    updatePeerId: (state, action) => {
      state.pastConnectionIds?.push(state.id);
      state.id = action.payload;
      state.connectionId = action.payload;
    },
    updateAgreedToTerms: (state, action) => {
      const newState = current(state);
      state.agreedToTerms = [...newState.agreedToTerms, action.payload];
    },
    setUserProfile: (state, action) => {
      state.displayName = action.payload.displayName;
      state.id = action.payload.id;
      state.connectionId = action.payload.connectionId;
      state.pastConnectionIds = action.payload.pastConnectionIds;
      state.avatar = action.payload.avatar;
      state.agreedToTerms = action.payload.agreedToTerms;
    },
    setInAppNotification: (state, action) => {
      state.inAppNotification = action.payload;
    },
    setBrowserNotification: (state, action) => {
      state.browserNotification = action.payload;
    },
    setEncryptionSignature: (state, action) => {
      state.encryptionSignature = action.payload;
    },
    logout: () => {}, // placeholder needed to generate dispatch function
  },
});

// Action creators are generated for each case reducer function
export const {
  updateUsername,
  updatePeerId,
  updateAgreedToTerms,
  setUserProfile,
  updateAvatar,
  logout,
  setInAppNotification,
  setBrowserNotification,
  addToBlockchain,
  setEncryptionSignature,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
