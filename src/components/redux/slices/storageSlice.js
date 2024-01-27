import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const storageSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {
    addStorageItem(state, action) {
      const { podId, item } = action.payload;

      if (!state[podId]) {
        state[podId] = [];
      }

      const existingItem = state[podId].find(
        (existing) => existing?.sha === item.sha,
      );

      if (!existingItem) {
        state[podId].push(item);
      }
    },
    removeStorageItem(state, action) {
      const { podId, itemId } = action.payload;

      if (state[podId]) {
        state[podId] = state[podId].filter((item) => item.sha !== itemId);

        if (state[podId].length === 0) {
          delete state[podId];
        }
      }
    },
    updateStorageItem(state, action) {
      const { podId, updatedItem } = action.payload;

      if (state[podId]) {
        const index = state[podId].findIndex(
          (item) => item.sha === updatedItem.sha,
        );

        if (index !== -1) {
          state[podId][index] = updatedItem;
        }
      }
    },
    setStorageForPod(state, action) {
      const { podId, storage } = action.payload;
      state[podId] = storage;
    },
  },
});

export const {
  addStorageItem,
  removeStorageItem,
  updateStorageItem,
  setStorageForPod,
} = storageSlice.actions;

export default storageSlice.reducer;
