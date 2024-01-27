import { createSlice } from "@reduxjs/toolkit";

const encryptionSlice = createSlice({
  name: "encryption",
  initialState: {},
  reducers: {
    addEncryptionKeys: (state, action) => {
      const { userId, publicKey, privateKey, remotePublicKey, symmetricKey } =
        action.payload;
      state[userId] = { publicKey, privateKey, remotePublicKey, symmetricKey };
    },
    updateEncryptionKeys: (state, action) => {
      const { userId, publicKey, privateKey, remotePublicKey, established } =
        action.payload;
      if (state[userId]) {
        state[userId].publicKey = publicKey || state[userId].publicKey;
        state[userId].privateKey = privateKey || state[userId].privateKey;
        state[userId].remotePublicKey =
          remotePublicKey || state[userId].remotePublicKey;
        state[userId].established = established || state[userId].established;
      }
    },
    deleteEncryptionKeys: (state, action) => {
      const userId = action.payload;
      delete state[userId];
    },
    setEncryption: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const {
  addEncryptionKeys,
  updateEncryptionKeys,
  deleteEncryptionKeys,
  setEncryption,
} = encryptionSlice.actions;

export default encryptionSlice.reducer;
